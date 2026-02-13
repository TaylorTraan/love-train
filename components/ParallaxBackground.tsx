"use client";

import { motion } from "framer-motion";

export default function ParallaxBackground() {
  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-sky-200/95 via-rose-100/85 to-amber-50/90"
        aria-hidden
      />
      {/* Simple track strip along bottom - horizontal journey */}
      <div className="fixed bottom-[8%] left-0 right-0 h-4 z-[1] pointer-events-none flex items-center">
        <div className="absolute inset-x-0 h-1.5 bg-stone-500/50 rounded-full" />
        <div className="absolute inset-x-0 h-0.5 top-0 bg-stone-400/40 rounded-full" />
      </div>
    </>
  );
}
