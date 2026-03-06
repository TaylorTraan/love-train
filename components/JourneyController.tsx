"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { memories } from "@/app/data/memories";
import MainMenuScene from "./MainMenuScene";
import AnniversaryView from "./AnniversaryView";
import MusicView from "./MusicView";
import PersistentSpotifyPlayer from "./PersistentSpotifyPlayer";
import IntroScene from "./IntroScene";
import TravelScene from "./TravelScene";
import StationScene from "./StationScene";
import ParallaxBackground, { type PageThemeIndex } from "./ParallaxBackground";

export type JourneyPhase = "mainMenu" | "anniversary" | "music" | "intro" | "ready" | "travel" | "station" | "final";

const STATION_COUNT = memories.length;

const playlistId =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID) || null;

export default function JourneyController() {
  const [phase, setPhase] = useState<JourneyPhase>("mainMenu");
  const [playerVisible, setPlayerVisible] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);
  const [closedPerStation, setClosedPerStation] = useState<Set<number>[]>(
    () => Array.from({ length: STATION_COUNT }, () => new Set())
  );

  const showNextButton = true;

  const handleStart = useCallback(() => {
    setPhase("travel");
  }, []);

  const handleArrive = useCallback(() => {
    setPhase("station");
  }, []);

  const handleImageClose = useCallback((photoIndex: number) => {
    setClosedPerStation((prev) => {
      const next = prev.map((set, i) =>
        i === stationIndex ? new Set(Array.from(set).concat(photoIndex)) : set
      );
      return next;
    });
  }, [stationIndex]);

  const [transitioningToFinal, setTransitioningToFinal] = useState(false);

  const handleNextStation = useCallback(() => {
    if (stationIndex >= STATION_COUNT - 1) {
      setTransitioningToFinal(true);
      return;
    }
    setStationIndex((i) => i + 1);
    setPhase("travel");
  }, [stationIndex]);

  const handleStationExitComplete = useCallback(() => {
    setPhase("final");
    setTransitioningToFinal(false);
  }, []);

  const [isRestarting, setIsRestarting] = useState(false);

  const handleRestartClick = useCallback(() => {
    setIsRestarting(true);
  }, []);

  const handleRestartComplete = useCallback(() => {
    setPhase("mainMenu");
    setStationIndex(0);
    setClosedPerStation(Array.from({ length: STATION_COUNT }, () => new Set()));
    setIsRestarting(false);
  }, []);

  const pageThemeIndex: PageThemeIndex =
    phase === "final"
      ? 7
      : phase === "mainMenu" || phase === "anniversary" || phase === "music" || phase === "intro" || phase === "ready"
        ? 0
        : ((stationIndex + 1) as PageThemeIndex);

  const handleStartJourney = useCallback(() => {
    setPhase("intro");
  }, []);

  const handleOpenAnniversary = useCallback(() => {
    setPhase("anniversary");
  }, []);

  const handleBackFromAnniversary = useCallback(() => {
    setPhase("mainMenu");
  }, []);

  const handleOpenMusic = useCallback(() => {
    setPhase("music");
  }, []);

  const handleBackFromMusic = useCallback(() => {
    setPhase("mainMenu");
  }, []);

  const handleMinimizePlayer = useCallback(() => {
    setPlayerVisible(false);
  }, []);

  return (
    <>
      <ParallaxBackground pageThemeIndex={pageThemeIndex} />
      {playlistId && !playerVisible && (
        <button
          type="button"
          onClick={() => setPlayerVisible(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-stone-700/95 hover:bg-stone-600 text-stone-100 shadow-lg hover:shadow-xl transition-all duration-200 border border-stone-600/50"
          aria-label="Show music player"
          title="Show music player"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span className="font-medium">Music</span>
        </button>
      )}
      {playlistId && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={false}
          animate={playerVisible ? { y: 0 } : { y: "100%" }}
          transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ pointerEvents: playerVisible ? "auto" : "none" }}
        >
          <PersistentSpotifyPlayer
            playlistId={playlistId}
            onMinimize={handleMinimizePlayer}
          />
        </motion.div>
      )}
      {phase === "mainMenu" && (
        <MainMenuScene
          onStartJourney={handleStartJourney}
          onOpenAnniversary={handleOpenAnniversary}
          onOpenMusic={handleOpenMusic}
        />
      )}
      {phase === "anniversary" && (
        <AnniversaryView onBack={handleBackFromAnniversary} />
      )}
      {phase === "music" && (
        <MusicView onBack={handleBackFromMusic} />
      )}
      {(phase === "intro" || phase === "ready") && (
        <IntroScene onStart={handleStart} />
      )}
      {phase === "travel" && (
        <TravelScene
          stationIndex={stationIndex}
          onArrive={handleArrive}
        />
      )}
      {phase === "station" && (
        <StationScene
          yearData={memories[stationIndex]}
          onImageClose={handleImageClose}
          onNextStation={handleNextStation}
          showNextButton={showNextButton}
          isExiting={transitioningToFinal}
          onExitComplete={handleStationExitComplete}
        />
      )}
      {phase === "final" && (
        <FinalScene
          onRestart={handleRestartClick}
          isExiting={isRestarting}
          onExitComplete={handleRestartComplete}
        />
      )}
    </>
  );
}

function FinalScene({
  onRestart,
  isExiting,
  onExitComplete,
}: {
  onRestart: () => void;
  isExiting: boolean;
  onExitComplete: () => void;
}) {
  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.98 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onAnimationComplete={(definition) => {
        if (isExiting && typeof definition === "object" && definition !== null && "opacity" in definition && definition.opacity === 0) {
          onExitComplete();
        }
      }}
    >
      {/* Moon with soft shine */}
      <div
        className="absolute top-[18%] right-[20%] w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #f5f5f4, #e7e5e4 40%, #a8a29e 70%, transparent)",
          boxShadow: "0 0 60px 30px rgba(245,245,244,0.15), 0 0 100px 50px rgba(245,245,244,0.08)",
        }}
        aria-hidden
      />
      <p className="text-2xl md:text-4xl font-medium text-stone-200 text-center max-w-2xl drop-shadow-md relative z-10">
        And this is only the beginning.
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-8 px-8 py-4 rounded-2xl bg-stone-600 hover:bg-stone-500 text-stone-100 font-medium text-lg shadow-lg hover:shadow-xl transition-all border border-stone-500/50 relative z-10"
      >
        Travel again
      </button>
    </motion.section>
  );
}
