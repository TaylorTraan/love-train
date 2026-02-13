"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { MemoryYear, MemoryPhoto } from "@/app/data/memories";
import MemoryCard from "./MemoryCard";
import ImageLightbox from "./ImageLightbox";

interface StationProps {
  yearData: MemoryYear;
}

export default function Station({ yearData }: StationProps) {
  const [openPhoto, setOpenPhoto] = useState<MemoryPhoto | null>(null);

  return (
    <section className="min-w-[100vw] w-[100vw] h-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-8 md:py-12 snap-start snap-always">
      <h2 className="text-2xl md:text-4xl font-medium text-stone-700 mb-6 md:mb-8">
        {yearData.year}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-6xl">
        {yearData.photos.map((photo, index) => (
          <MemoryCard
            key={photo.src}
            photo={photo}
            index={index}
            onOpen={() => setOpenPhoto(photo)}
          />
        ))}
      </div>
      <AnimatePresence>
        {openPhoto && (
          <ImageLightbox
            key={openPhoto.src}
            photo={openPhoto}
            onClose={() => setOpenPhoto(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
