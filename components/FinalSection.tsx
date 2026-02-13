"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="min-w-[100vw] w-[100vw] h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 relative overflow-hidden snap-start snap-always"
    >
      {/* Warm sunset gradient - stronger than earlier sections */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-amber-100/95 via-orange-200/90 to-rose-300/85 -z-10"
        aria-hidden
      />
      <motion.p
        className="text-xl sm:text-2xl md:text-4xl font-medium text-stone-800 text-center drop-shadow-sm max-w-2xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        And this is only the beginning.
      </motion.p>
    </section>
  );
}
