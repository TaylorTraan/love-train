import { NextResponse } from "next/server";

export type PlaylistTrack = {
  name: string;
  artists: string;
  url: string;
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

  try {
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;
    const res = await fetch(embedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch embed page", status: res.status },
        { status: 502 }
      );
    }

    const html = await res.text();

    const scriptMatch = html.match(
      /<script\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
    );

    if (!scriptMatch) {
      return NextResponse.json(
        { error: "Could not parse embed data" },
        { status: 502 }
      );
    }

    const nextData = JSON.parse(scriptMatch[1]);
    const entity = nextData?.props?.pageProps?.state?.data?.entity;

    if (!entity) {
      return NextResponse.json(
        { error: "No entity data in embed response" },
        { status: 502 }
      );
    }

    const playlist = {
      name: entity.name ?? "Playlist",
      url: `https://open.spotify.com/playlist/${playlistId}`,
      image: entity.coverArt?.sources?.[0]?.url ?? null,
    };

    const trackList = entity.trackList ?? [];
    const tracks: PlaylistTrack[] = trackList.map(
      (t: { title?: string; subtitle?: string; uri?: string }) => {
        const trackId = t.uri?.split(":").pop();
        return {
          name: t.title ?? "",
          artists: (t.subtitle ?? "").replace(/\u00a0/g, " "),
          url: trackId
            ? `https://open.spotify.com/track/${trackId}`
            : `https://open.spotify.com/playlist/${playlistId}`,
        };
      }
    );

    return NextResponse.json({ playlist, tracks } satisfies PlaylistResponse);
  } catch (e) {
    return NextResponse.json(
      { error: "Spotify fetch error", details: String(e) },
      { status: 502 }
    );
  }
}
