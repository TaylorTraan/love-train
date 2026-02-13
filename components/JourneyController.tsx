"use client";

import { useState, useCallback } from "react";
import { memories } from "@/app/data/memories";
import IntroScene from "./IntroScene";
import TravelScene from "./TravelScene";
import StationScene from "./StationScene";
import ParallaxBackground from "./ParallaxBackground";

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

  const handleNextStation = useCallback(() => {
    if (stationIndex >= STATION_COUNT - 1) {
      setPhase("final");
      return;
    }
    setStationIndex((i) => i + 1);
    setPhase("travel");
  }, [stationIndex]);

  return (
    <>
      <ParallaxBackground />
      {(phase === "intro" || phase === "ready") && (
        <IntroScene
          onBoardComplete={() => setPhase("ready")}
          showStartButton={phase === "ready"}
          onStart={handleStart}
        />
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
        />
      )}
      {phase === "final" && <FinalScene />}
    </>
  );
}

function FinalScene() {
  return (
    <section className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 bg-gradient-to-b from-amber-100/95 via-orange-200/90 to-rose-300/85">
      <p className="text-2xl md:text-4xl font-medium text-stone-800 text-center max-w-2xl">
        And this is only the beginning.
      </p>
    </section>
  );
}
