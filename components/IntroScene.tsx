"use client";

import { motion } from "framer-motion";

interface IntroSceneProps {
  onStart: () => void;
}

export default function IntroScene({ onStart }: IntroSceneProps) {
  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.h1
        className="text-center text-3xl md:text-5xl font-semibold text-stone-800 tracking-tight px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The Taylor & Jamie Love Adventure
      </motion.h1>
      <motion.p
        className="mt-4 text-lg md:text-xl text-stone-600 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        6 Years. 30 Memories. One Journey.
      </motion.p>
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          type="button"
          onClick={onStart}
          className="px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all border-2 border-rose-400/80"
        >
          Start the journey
        </button>
      </motion.div>
    </motion.section>
  );
}
