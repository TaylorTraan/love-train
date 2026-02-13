"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface TrainProps {
  progress: MotionValue<number>;
}

export default function Train({ progress }: TrainProps) {
  const trainX = useTransform(progress, [0, 1], ["12%", "82%"]);
  const wheelRotate = useTransform(progress, [0, 1], [0, 360 * 6]);

  return (
    <motion.div
      className="fixed bottom-[14%] left-0 z-20 pointer-events-none"
      style={{ x: trainX }}
    >
      <div className="relative w-32 md:w-40" style={{ transform: "translateX(-50%)" }}>
        <div className="relative rounded-2xl rounded-b-xl bg-gradient-to-b from-amber-50 to-amber-100/95 shadow-lg border-2 border-amber-200/80">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-t-xl bg-gradient-to-b from-rose-400 to-rose-600 border-2 border-rose-300/90 shadow-inner" />
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-5 h-4 rounded-t-md bg-gradient-to-b from-stone-400 to-stone-600 border-2 border-stone-500/80" />
          <div className="absolute -top-8 right-1/4 w-3 h-3 rounded-full bg-amber-300 border-2 border-amber-500/80 shadow-inner" />
          <motion.div
            className="absolute -top-9 left-1/2 -translate-x-1/2 w-4 h-3 rounded-full bg-stone-300/50"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
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
            <motion.div
              className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-stone-700 bg-gradient-to-br from-stone-500 to-stone-700 flex-shrink-0 shadow-md"
              style={{ rotate: wheelRotate }}
            />
            <motion.div
              className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-stone-700 bg-gradient-to-br from-stone-500 to-stone-700 flex-shrink-0 shadow-md"
              style={{ rotate: wheelRotate }}
            />
            <motion.div
              className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-stone-700 bg-gradient-to-br from-stone-500 to-stone-700 flex-shrink-0 shadow-md"
              style={{ rotate: wheelRotate }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
