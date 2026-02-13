"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { memories } from "@/app/data/memories";
import IntroScene from "./IntroScene";
import TravelScene from "./TravelScene";
import StationScene from "./StationScene";
import ParallaxBackground, { type PageThemeIndex } from "./ParallaxBackground";

export type JourneyPhase = "intro" | "ready" | "travel" | "station" | "final";

const STATION_COUNT = memories.length;

export default function JourneyController() {
  const [phase, setPhase] = useState<JourneyPhase>("intro");
  const [stationIndex, setStationIndex] = useState(0);
  const [closedPerStation, setClosedPerStation] = useState<Set<number>[]>(
    () => Array.from({ length: STATION_COUNT }, () => new Set())
  );

  const showNextButton = closedPerStation[stationIndex]?.size === 5;

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
    setPhase("intro");
    setStationIndex(0);
    setClosedPerStation(Array.from({ length: STATION_COUNT }, () => new Set()));
    setIsRestarting(false);
  }, []);

  const pageThemeIndex: PageThemeIndex =
    phase === "final"
      ? 7
      : phase === "intro" || phase === "ready"
        ? 0
        : ((stationIndex + 1) as PageThemeIndex);

  return (
    <>
      <ParallaxBackground pageThemeIndex={pageThemeIndex} />
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
