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
}

export default function StationScene({
  yearData,
  onImageClose,
  onNextStation,
  showNextButton,
}: StationSceneProps) {
  const [openPhoto, setOpenPhoto] = useState<{ photo: MemoryPhoto; index: number } | null>(null);

  const handleCloseLightbox = (index: number) => {
    onImageClose(index);
    setOpenPhoto(null);
  };

  return (
    <section className="fixed inset-0 z-10 flex flex-col items-center justify-center pt-20 pb-24 px-4">
      <motion.h2
        className="text-3xl md:text-5xl font-medium text-stone-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {yearData.year}
      </motion.h2>
      <p className="text-stone-500 mb-8">Your memories along the way</p>

      {/* Couple off the train - small figures */}
      <motion.div
        className="absolute bottom-[22%] left-[8%] flex items-end gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="w-6 h-9 rounded-t-full bg-gradient-to-b from-rose-300 to-rose-500 border-2 border-rose-400/80 shadow" />
        <div className="w-6 h-8 rounded-t-full bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-400/80 shadow" />
      </motion.div>

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
    </section>
  );
}
