import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

type TokenCache = { token: string; expiresAt: number } | null;
let tokenCache: TokenCache = null;

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token: string; expires_in: number };
  const expiresInMs = (data.expires_in ?? 3600) * 1000;
  tokenCache = { token: data.access_token, expiresAt: Date.now() + expiresInMs };
  return data.access_token;
}

export type PlaylistTrack = {
  name: string;
  artists: string;
  albumArt: string | null;
  url: string;
  previewUrl: string | null;
};

export type PlaylistResponse = {
  playlist: { name: string; url: string; image: string | null };
  tracks: PlaylistTrack[];
};

export async function GET() {
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
  if (!playlistId) {
    return NextResponse.json(
      { error: "SPOTIFY_PLAYLIST_ID not configured" },
      { status: 503 }
    );
  }

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: "Spotify credentials not configured or token failed" },
      { status: 503 }
    );
  }

  const headers = { Authorization: `Bearer ${token}` };

  try {
    const [playlistRes, tracksRes] = await Promise.all([
      fetch(`${SPOTIFY_API_BASE}/playlists/${playlistId}`, { headers }),
      fetch(`${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks?limit=50`, { headers }),
    ]);

    if (!playlistRes.ok) {
      const err = await playlistRes.text();
      return NextResponse.json(
        { error: "Playlist fetch failed", details: err },
        { status: playlistRes.status === 404 ? 404 : 502 }
      );
    }

    const playlistData = (await playlistRes.json()) as {
      name: string;
      external_urls: { spotify: string };
      images: Array<{ url: string }>;
    };

    const playlist = {
      name: playlistData.name,
      url: playlistData.external_urls?.spotify ?? `https://open.spotify.com/playlist/${playlistId}`,
      image: playlistData.images?.[0]?.url ?? null,
    };

    let tracks: PlaylistTrack[] = [];
    if (tracksRes.ok) {
      const tracksData = (await tracksRes.json()) as {
        items: Array<{
          track: {
            name: string;
            artists: Array<{ name: string }>;
            album: { images: Array<{ url: string }> };
            external_urls: { spotify: string };
            preview_url: string | null;
          } | null;
        }>;
      };
      tracks = (tracksData.items ?? [])
        .filter((item): item is { track: NonNullable<typeof item.track> } => item.track != null)
        .map(({ track }) => ({
          name: track.name,
          artists: track.artists?.map((a) => a.name).join(", ") ?? "",
          albumArt: track.album?.images?.[0]?.url ?? null,
          url: track.external_urls?.spotify ?? "",
          previewUrl: track.preview_url ?? null,
        }));
    }

    return NextResponse.json({ playlist, tracks } satisfies PlaylistResponse);
  } catch (e) {
    return NextResponse.json(
      { error: "Spotify API error", details: String(e) },
      { status: 502 }
    );
  }
}
