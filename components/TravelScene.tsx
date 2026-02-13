"use client";

import { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Train from "./Train";

interface TravelSceneProps {
  stationIndex: number;
  onArrive: () => void;
}

const TRAVEL_DURATION = 2.5;

export default function TravelScene({ stationIndex, onArrive }: TravelSceneProps) {
  const progress = useMotionValue(0);

  useEffect(() => {
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: TRAVEL_DURATION,
      ease: [0.25, 0.46, 0.45, 0.94],
      onComplete: onArrive,
    });
    return () => controls.stop();
  }, [stationIndex, onArrive, progress]);

  return (
    <section className="fixed inset-0 z-10">
      <Train progress={progress} />
    </section>
  );
}
