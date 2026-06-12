"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Calendar } from "lucide-react";
import { tileVariants } from "./BentoGrid";

/**
 * HeroTile — Large greeting tile with daily learning streak.
 * Spans full width on mobile, 2 columns on larger screens.
 */
export function HeroTile() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock streak data
  const streak = 12;

  return (
    <motion.section
      variants={tileVariants}
      className="
        relative overflow-hidden
        col-span-1 md:col-span-2 lg:col-span-2
        rounded-2xl p-6 md:p-8
        bg-card border border-border-subtle
        gradient-mesh-1
        min-h-[200px] flex flex-col justify-between
      "
      aria-label="Welcome greeting"
    >
      {/* Animated gradient orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-accent-purple/8 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-text-secondary mb-2">
          <Calendar className="w-4 h-4" />
          <time className="text-sm" dateTime={today.toISOString()} suppressHydrationWarning>
            {formattedDate}
          </time>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-2">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            Ashish
          </span>
        </h1>

        <p className="text-text-secondary text-sm md:text-base max-w-md">
          Continue your journey. You&apos;re making incredible progress this week!
        </p>
      </div>

      {/* Streak Indicator */}
      <div className="relative z-10 mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-accent-amber/10 border border-accent-amber/20 rounded-xl px-4 py-2.5">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Flame className="w-5 h-5 text-accent-amber" />
          </motion.div>
          <div>
            <p className="text-lg font-bold text-accent-amber">{streak}</p>
            <p className="text-xs text-text-muted">Day Streak</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-accent-purple/10 border border-accent-purple/20 rounded-xl px-4 py-2.5">
          <Sparkles className="w-5 h-5 text-accent-purple" />
          <div>
            <p className="text-lg font-bold text-accent-purple">4.8h</p>
            <p className="text-xs text-text-muted">Today</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
