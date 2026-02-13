"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MemoryPhoto } from "@/app/data/memories";

interface MemoryTimelineProps {
  photos: MemoryPhoto[];
  onSelectPhoto: (photo: MemoryPhoto, index: number) => void;
}

const PATH_LENGTH = 5;

function getPointAtLength(index: number): { x: number; y: number } {
  const t = index / (PATH_LENGTH - 1);
  const x = 0.12 + t * 0.76;
  const y = 0.5 - 0.15 * Math.sin(t * Math.PI);
  return { x: x * 100, y: y * 100 };
}

export default function MemoryTimeline({ photos, onSelectPhoto }: MemoryTimelineProps) {
  return (
    <div className="relative w-full max-w-5xl h-[55vh] mx-auto px-4">
      {/* Curved path (road/timeline) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 12 50 Q 30 38, 50 50 T 88 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          className="text-stone-400/60"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      {/* Photo nodes along the path */}
      {photos.map((photo, index) => {
        const pos = getPointAtLength(index);
        return (
          <motion.button
            key={photo.src}
            type="button"
            className="absolute w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-lg border-2 border-white/80 hover:scale-105 hover:shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => onSelectPhoto(photo, index)}
          >
            <span className="relative block w-full h-full">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className={`object-cover ${photo.rotate180 ? "rotate-180" : ""}`}
                unoptimized={photo.src.endsWith(".svg")}
                sizes="112px"
              />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
