"use client";

import { motion } from "framer-motion";

export type PageThemeIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const SKY_BY_PAGE: Record<PageThemeIndex, string> = {
  0: "from-rose-100/90 via-amber-50/85 to-orange-100/80",
  1: "from-sky-200/90 via-sky-100/85 to-cyan-50/80",
  2: "from-cyan-100/90 via-teal-50/85 to-emerald-100/80",
  3: "from-violet-100/90 via-purple-50/85 to-fuchsia-100/80",
  4: "from-orange-200/90 via-orange-300/85 to-amber-600/80",
  5: "from-orange-100/90 via-rose-100/85 to-pink-200/80",
  6: "from-indigo-200/90 via-violet-200/85 to-slate-400/90",
  7: "from-indigo-950 via-slate-950 to-slate-950",
};

// Mountains match each page's sky / time of day so silhouettes read in the same palette (not black)
const MOUNTAINS_BY_PAGE: Record<PageThemeIndex, string> = {
  0: "text-rose-300/35",
  1: "text-sky-400/40",
  2: "text-teal-400/40",
  3: "text-violet-400/40",
  4: "text-orange-300/35",
  5: "text-rose-500/40",
  6: "text-indigo-400/45",
  7: "text-slate-400/40",
};

const SUN_BY_PAGE: Record<
  PageThemeIndex,
  { left: string; top: string; opacity: number; scale: number }
> = {
  0: { left: "18%", top: "72%", opacity: 0.9, scale: 1 },
  1: { left: "35%", top: "45%", opacity: 1, scale: 1.05 },
  2: { left: "50%", top: "28%", opacity: 1, scale: 1.1 },
  3: { left: "65%", top: "38%", opacity: 0.95, scale: 1 },
  4: { left: "78%", top: "55%", opacity: 0.95, scale: 1 },
  5: { left: "88%", top: "68%", opacity: 0.85, scale: 0.95 },
  6: { left: "94%", top: "82%", opacity: 0.2, scale: 0.85 },
  7: { left: "50%", top: "50%", opacity: 0, scale: 0 },
};

interface ParallaxBackgroundProps {
  pageThemeIndex: PageThemeIndex;
}

export default function ParallaxBackground({ pageThemeIndex }: ParallaxBackgroundProps) {
  const sun = SUN_BY_PAGE[pageThemeIndex];

  return (
    <>
      <motion.div
        className={`fixed inset-0 z-0 pointer-events-none bg-gradient-to-b ${SKY_BY_PAGE[pageThemeIndex]}`}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden
      />
      <motion.div
        className="fixed z-[1] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: sun.left, top: sun.top }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-[0_0_40px_20px_rgba(251,191,36,0.25)]"
          animate={{ opacity: sun.opacity, scale: sun.scale }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>
      <div className="fixed inset-0 z-[1] pointer-events-none flex items-end overflow-hidden">
        <motion.svg
          className={`w-full min-w-full h-[50vh] ${MOUNTAINS_BY_PAGE[pageThemeIndex]}`}
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <path d="M0,400 L0,280 Q100,220 200,260 T400,240 T600,280 T800,250 T1000,270 L1200,260 L1200,400 Z" />
          <path
            d="M0,400 L0,320 Q150,280 300,320 T500,300 T700,330 T900,310 T1100,340 L1200,320 L1200,400 Z"
            opacity="0.85"
          />
          <path
            d="M0,400 L0,370 Q80,340 200,360 T400,330 T600,350 T800,320 T1000,355 L1200,330 L1200,400 Z"
            opacity="0.7"
          />
        </motion.svg>
      </div>
    </>
  );
}
