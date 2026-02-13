"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface IntroSceneProps {
  onBoardComplete: () => void;
  showStartButton?: boolean;
  onStart?: () => void;
}

export default function IntroScene({
  onBoardComplete,
  showStartButton = false,
  onStart,
}: IntroSceneProps) {
  const coupleControls = useAnimationControls();

  useEffect(() => {
    if (showStartButton) return;
    const seq = async () => {
      await coupleControls.start({
        x: "45%",
        transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] },
      });
      await coupleControls.start({
        y: "-80%",
        transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
      });
      onBoardComplete();
    };
    seq();
  }, [coupleControls, onBoardComplete, showStartButton]);

  return (
    <section className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Title */}
      <motion.h1
        className="absolute top-12 left-0 right-0 text-center text-2xl md:text-4xl font-semibold text-stone-800 tracking-tight px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The Taylor & Jamie Love Train
      </motion.h1>

      {/* Static train on the right */}
      <div className="absolute bottom-[14%] right-[15%] w-32 md:w-40 pointer-events-none">
        <div className="relative rounded-2xl rounded-b-xl bg-gradient-to-b from-amber-50 to-amber-100/95 shadow-lg border-2 border-amber-200/80">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-t-xl bg-gradient-to-b from-rose-400 to-rose-600 border-2 border-rose-300/90 shadow-inner" />
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-5 h-4 rounded-t-md bg-gradient-to-b from-stone-400 to-stone-600 border-2 border-stone-500/80" />
          <div className="absolute -top-8 right-1/4 w-3 h-3 rounded-full bg-amber-300 border-2 border-amber-500/80 shadow-inner" />
          <div className="flex items-center justify-center pt-3 pb-1 px-2">
            <div className="w-9 h-7 rounded-full bg-amber-100/90 border-2 border-amber-300/70 flex flex-col items-center justify-center gap-0.5">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-700" />
                <span className="w-2 h-2 rounded-full bg-stone-700" />
              </div>
              <svg className="w-4 h-2" viewBox="0 0 16 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M2 5 Q8 7 14 5" className="text-stone-600" />
              </svg>
            </div>
          </div>
          <div className="flex items-end justify-center gap-3 pb-1.5 px-2">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-stone-700 bg-gradient-to-br from-stone-500 to-stone-700 flex-shrink-0 shadow-md" />
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-stone-700 bg-gradient-to-br from-stone-500 to-stone-700 flex-shrink-0 shadow-md" />
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-stone-700 bg-gradient-to-br from-stone-500 to-stone-700 flex-shrink-0 shadow-md" />
          </div>
        </div>
      </div>

      {/* Couple - two simple figures that walk then board */}
      <motion.div
        className="absolute bottom-[18%] left-[12%] flex items-end gap-2"
        initial={{ x: 0 }}
        animate={coupleControls}
      >
        <motion.div
          className="w-8 h-12 rounded-t-full bg-gradient-to-b from-rose-300 to-rose-500 border-2 border-rose-400/80 shadow-md"
          aria-hidden
        />
        <motion.div
          className="w-8 h-11 rounded-t-full bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-400/80 shadow-md"
          aria-hidden
        />
      </motion.div>

      {/* Start button - only after boarding */}
      {showStartButton && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            type="button"
            onClick={onStart}
            className="px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all border-2 border-rose-400/80"
          >
            Start the journey
          </button>
        </motion.div>
      )}
    </section>
  );
}
