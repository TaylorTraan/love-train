"use client";

const EMBED_BASE = "https://open.spotify.com/embed/playlist";
const PLAYER_HEIGHT = 400;

interface PersistentSpotifyPlayerProps {
  playlistId: string | null;
  onMinimize: () => void;
}

export default function PersistentSpotifyPlayer({
  playlistId,
  onMinimize,
}: PersistentSpotifyPlayerProps) {
  if (!playlistId) return null;

  return (
    <div
      className="flex flex-row rounded-t-2xl bg-stone-800/95 backdrop-blur border border-b-0 border-stone-600/40 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] overflow-hidden"
      style={{ height: PLAYER_HEIGHT }}
    >
      <div className="flex flex-shrink-0 items-center justify-center w-14 min-h-0 py-2 pl-3 pr-2 border-r border-stone-600/40">
        <button
          type="button"
          onClick={onMinimize}
          className="p-2.5 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-700/60 transition-colors duration-200"
          aria-label="Hide player"
          title="Hide player"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div className="flex-1 min-w-0 min-h-0 px-3 py-3">
        <iframe
          title="Spotify playlist"
          src={`${EMBED_BASE}/${playlistId}`}
          width="100%"
          height={PLAYER_HEIGHT - 24}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl border-0 w-full block shadow-inner"
          style={{ height: PLAYER_HEIGHT - 24 }}
        />
      </div>
    </div>
  );
}
