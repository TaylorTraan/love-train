"use client";

import { motion } from "framer-motion";

const EMBED_BASE = "https://open.spotify.com/embed/playlist";
const COLLAPSED_HEIGHT = 100;
const EXPANDED_HEIGHT = 352;

interface PersistentSpotifyPlayerProps {
  playlistId: string | null;
  expanded: boolean;
  onToggleExpand: () => void;
}

export default function PersistentSpotifyPlayer({
  playlistId,
  expanded,
  onToggleExpand,
}: PersistentSpotifyPlayerProps) {
  if (!playlistId) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-row bg-stone-800/95 backdrop-blur border-t border-stone-600/50 shadow-2xl"
      initial={false}
      animate={{ height: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT }}
      transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
    >
      <div className="flex flex-shrink-0 items-center justify-center w-12 min-h-0 border-r border-stone-600/50">
        <button
          type="button"
          onClick={onToggleExpand}
          className="p-2 rounded-lg text-stone-300 hover:text-stone-100 hover:bg-stone-700/80 transition-colors"
          aria-label={expanded ? "Collapse player" : "Expand player"}
          title={expanded ? "Collapse player" : "Expand player"}
        >
          {expanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1 min-w-0 min-h-0 px-2 py-2">
        <iframe
          title="Spotify playlist"
          src={`${EMBED_BASE}/${playlistId}`}
          width="100%"
          height={expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg border-0 w-full block"
          style={{ height: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT }}
        />
      </div>
    </motion.div>
  );
}
