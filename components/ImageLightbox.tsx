"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MemoryPhoto } from "@/app/data/memories";

interface ImageLightboxProps {
  photo: MemoryPhoto;
  onClose: () => void;
}

export default function ImageLightbox({ photo, onClose }: ImageLightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-stone-600 hover:text-stone-800 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative flex-1 min-h-0 aspect-[4/3] md:aspect-video">
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            className="object-contain"
            unoptimized={photo.src.endsWith(".svg")}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
        <div className="p-4 border-t border-stone-200 bg-stone-50">
          <p className="text-stone-800 font-medium">{photo.caption}</p>
          {photo.date && (
            <p className="text-sm text-stone-500 mt-0.5">{photo.date}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
