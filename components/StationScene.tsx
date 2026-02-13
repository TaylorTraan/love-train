"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MemoryYear, MemoryPhoto } from "@/app/data/memories";
import MemoryTimeline from "./MemoryTimeline";
import ImageLightbox from "./ImageLightbox";

interface StationSceneProps {
  yearData: MemoryYear;
  onImageClose: (photoIndex: number) => void;
  onNextStation: () => void;
  showNextButton: boolean;
  isExiting?: boolean;
  onExitComplete?: () => void;
}

export default function StationScene({
  yearData,
  onImageClose,
  onNextStation,
  showNextButton,
  isExiting = false,
  onExitComplete,
}: StationSceneProps) {
  const [openPhoto, setOpenPhoto] = useState<{ photo: MemoryPhoto; index: number } | null>(null);

  const handleCloseLightbox = (index: number) => {
    onImageClose(index);
    setOpenPhoto(null);
  };

  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col items-center justify-center pt-20 pb-24 px-4"
      initial={false}
      animate={{
        opacity: isExiting ? 0 : 1,
      }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      onAnimationComplete={(definition) => {
        if (isExiting && definition?.opacity === 0 && onExitComplete) {
          onExitComplete();
        }
      }}
    >
      <motion.h2
        className="text-3xl md:text-5xl font-medium text-stone-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {yearData.year}
      </motion.h2>
      <p className="text-stone-500 mb-8">Your memories along the way</p>

      <MemoryTimeline
        photos={yearData.photos}
        onSelectPhoto={(photo, index) => setOpenPhoto({ photo, index })}
      />

      <AnimatePresence>
        {openPhoto && (
          <ImageLightbox
            key={openPhoto.photo.src}
            photo={openPhoto.photo}
            onClose={() => handleCloseLightbox(openPhoto.index)}
          />
        )}
      </AnimatePresence>

      {showNextButton && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={onNextStation}
            className="px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all border-2 border-rose-400/80"
          >
            Next station
          </button>
        </motion.div>
      )}

      {/* Temporary test button - skip to next station without opening all photos */}
      <button
        type="button"
        onClick={onNextStation}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-500 bg-white/80 border border-stone-300 hover:bg-stone-50 transition-colors"
      >
        Next (test)
      </button>
    </motion.section>
  );
}
