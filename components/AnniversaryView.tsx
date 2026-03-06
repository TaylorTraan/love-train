"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ANNIVERSARY_MONTH = 9; // October (0-indexed)
const ANNIVERSARY_DAY = 3;

function getNextAnniversary(now: Date): Date {
  const thisYear = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY);
  if (now < thisYear) return thisYear;
  return new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH, ANNIVERSARY_DAY);
}

function getCountdown(target: Date, now: Date) {
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);

  // Calendar-accurate months and days
  let months = 0;
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  while (d < t && months < 24) {
    d.setMonth(d.getMonth() + 1);
    months++;
  }
  if (d > t) {
    d.setMonth(d.getMonth() - 1);
    months--;
  }
  const days = Math.max(0, Math.floor((t.getTime() - d.getTime()) / 86400000));

  return { months, days, hours, minutes, seconds };
}

function CountdownScreen({ onBack }: { onBack: () => void }) {
  const [now, setNow] = useState(() => new Date());
  const target = getNextAnniversary(now);
  const [countdown, setCountdown] = useState(() => getCountdown(target, now));

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setNow(n);
      setCountdown(getCountdown(getNextAnniversary(n), n));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Months", value: countdown.months },
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.h2
        className="text-center text-2xl md:text-3xl font-medium text-stone-700 mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Until October 3rd
      </motion.h2>
      <p className="text-center text-sm text-stone-500 mb-6" suppressHydrationWarning>
        {now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })}
      </p>
      <motion.div
        className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-2xl bg-stone-200/80 dark:bg-stone-700/60 px-6 py-4 min-w-[80px] md:min-w-[100px] border border-stone-300/60"
          >
            <span className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 tabular-nums">
              {value}
            </span>
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400 mt-1">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-4 rounded-2xl bg-stone-600 hover:bg-stone-500 text-stone-100 font-medium text-lg shadow-lg hover:shadow-xl transition-all border border-stone-500/50"
        >
          Back
        </button>
      </motion.div>
    </motion.section>
  );
}

const HEART_COLORS = ["#f43f5e", "#ec4899", "#f472b6", "#fb7185"];
const PARTICLE_COUNT = 40;

function CelebrationScreen({ onBack }: { onBack: () => void }) {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 8 + Math.random() * 6,
    color: HEART_COLORS[i % HEART_COLORS.length],
    size: 16 + Math.random() * 24,
  }));

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    color: ["#f43f5e", "#ec4899", "#fbbf24", "#f59e0b", "#a78bfa"][i % 5],
    size: 4 + Math.random() * 6,
  }));

  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{
            left: h.left,
            top: "110%",
            width: h.size,
            height: h.size,
          }}
          initial={{ y: 0, opacity: 0.8, rotate: 0 }}
          animate={{
            y: "-120vh",
            opacity: [0.8, 0.6, 0.3],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            fill={h.color}
            className="drop-shadow-lg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Falling particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: "-10%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: 0, x: 0, opacity: 1 }}
          animate={{
            y: "120vh",
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden
        />
      ))}

      <motion.h2
        className="text-center text-4xl md:text-6xl font-bold text-stone-800 dark:text-stone-100 mb-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 2, repeat: Infinity, repeatDelay: 1 },
        }}
      >
        Happy Anniversary!
      </motion.h2>
      <motion.p
        className="text-center text-xl md:text-2xl text-stone-600 dark:text-stone-400 mb-10 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        October 3rd
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10"
      >
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all border-2 border-rose-400/80"
        >
          Back
        </button>
      </motion.div>
    </motion.section>
  );
}

interface AnniversaryViewProps {
  onBack: () => void;
}

export default function AnniversaryView({ onBack }: AnniversaryViewProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Wait for client mount so we use the user's local timezone, not server's
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
        <div className="animate-pulse text-stone-500">Loading...</div>
      </div>
    );
  }

  const isAnniversaryDay =
    now.getMonth() === ANNIVERSARY_MONTH && now.getDate() === ANNIVERSARY_DAY;

  return isAnniversaryDay ? (
    <CelebrationScreen onBack={onBack} />
  ) : (
    <CountdownScreen onBack={onBack} />
  );
}
