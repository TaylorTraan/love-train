"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { MemoryPhoto } from "@/app/data/memories";

interface MemoryCardProps {
  photo: MemoryPhoto;
  index: number;
  onOpen?: () => void;
}

export default function MemoryCard({ photo, index, onOpen }: MemoryCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className={`rounded-lg overflow-hidden shadow-md bg-white/80 ${onOpen ? "cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-shadow transition-transform" : ""}`}
      onClick={onOpen}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={onOpen ? (e) => e.key === "Enter" && onOpen() : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="relative aspect-[4/3] w-full bg-stone-100">
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className={`object-cover ${photo.rotate180 ? "rotate-180" : ""}`}
          loading="lazy"
          priority={false}
          unoptimized={photo.src.endsWith(".svg")}
        />
      </div>
      <div className="p-3">
        <p className="text-sm text-stone-600">{photo.caption}</p>
        {photo.date && (
          <p className="text-xs text-stone-400 mt-0.5">{photo.date}</p>
        )}
      </div>
    </motion.article>
  );
}
