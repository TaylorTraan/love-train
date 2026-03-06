"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type PlaylistTrack = {
  name: string;
  artists: string;
  albumArt: string | null;
  url: string;
  previewUrl: string | null;
};

type PlaylistData = {
  playlist: { name: string; url: string; image: string | null };
  tracks: PlaylistTrack[];
};

interface MusicViewProps {
  onBack: () => void;
  playlistId?: string | null;
}

export default function MusicView({ onBack, playlistId: playlistIdProp }: MusicViewProps) {
  const playlistId =
    playlistIdProp ??
    ((typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID) || null);

  const [data, setData] = useState<PlaylistData | null>(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/spotify/playlist")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((json: PlaylistData) => {
        if (!cancelled) {
          setData(json);
          setApiError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setApiError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col overflow-hidden px-4 pt-6 pb-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-2xl bg-stone-600 hover:bg-stone-500 text-stone-100 font-medium shadow-lg hover:shadow-xl transition-all border border-stone-500/50"
        >
          Back
        </button>
      </div>

      <motion.h2
        className="text-center text-2xl md:text-3xl font-medium text-stone-700 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our playlist
      </motion.h2>

      {playlistId ? (
        <motion.p
          className="text-center text-stone-600 text-sm mb-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Use the player at the bottom of the page to play. It keeps playing as you explore the site—click the arrow on the left of the bar to expand or collapse it.
        </motion.p>
      ) : (
        <p className="text-center text-stone-500 mb-4">
          Set NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID or pass playlistId to show the player.
        </p>
      )}

      {data?.tracks && data.tracks.length > 0 && (
        <motion.div
          className="mt-6 flex-1 min-h-0 overflow-auto max-w-2xl mx-auto w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium text-stone-600 mb-3">Track list</h3>
          <ul className="space-y-2">
            {data.tracks.map((track, i) => (
              <li key={`${track.url}-${i}`}>
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg bg-stone-200/80 dark:bg-stone-700/60 hover:bg-stone-300/80 dark:hover:bg-stone-600/60 transition-colors border border-stone-300/60"
                >
                  {track.albumArt && (
                    <img
                      src={track.albumArt}
                      alt=""
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-stone-800 dark:text-stone-100 truncate block">
                      {track.name}
                    </span>
                    {track.artists && (
                      <span className="text-sm text-stone-500 dark:text-stone-400 truncate block">
                        {track.artists}
                      </span>
                    )}
                  </div>
                  <span className="text-stone-400 text-sm flex-shrink-0">Open in Spotify</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {apiError && !data && playlistId && (
        <p className="text-center text-stone-500 text-sm mt-4">
          Track list unavailable. Configure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and
          SPOTIFY_PLAYLIST_ID for a custom list.
        </p>
      )}
    </motion.section>
  );
}
