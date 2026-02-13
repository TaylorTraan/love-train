"use client";

import { useEffect } from "react";

interface TravelSceneProps {
  stationIndex: number;
  onArrive: () => void;
}

const TRAVEL_DURATION = 0.5;

export default function TravelScene({ stationIndex, onArrive }: TravelSceneProps) {
  useEffect(() => {
    const t = setTimeout(onArrive, TRAVEL_DURATION * 1000);
    return () => clearTimeout(t);
  }, [stationIndex, onArrive]);

  return <section className="fixed inset-0 z-10" aria-hidden />;
}
