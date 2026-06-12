"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { tileVariants } from "./BentoGrid";
import { useMemo } from "react";

/**
 * Generates a pseudo-random activity value for the contribution graph.
 * Uses a deterministic seed based on position for consistent renders.
 */
function generateActivityData(): number[][] {
  const weeks = 20;
  const days = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // Create a natural-looking distribution
      const seed = Math.sin(w * 7 + d * 13 + 42) * 10000;
      const random = seed - Math.floor(seed);
      let level = 0;
      if (random > 0.35) level = 1;
      if (random > 0.55) level = 2;
      if (random > 0.75) level = 3;
      if (random > 0.9) level = 4;
      week.push(level);
    }
    data.push(week);
  }

  return data;
}

const intensityColors = [
  "bg-white/[0.03]",    // Level 0 — empty
  "bg-accent-emerald/20", // Level 1 — low
  "bg-accent-emerald/40", // Level 2 — medium
  "bg-accent-emerald/60", // Level 3 — high
  "bg-accent-emerald/80", // Level 4 — very high
];

const dayLabels = ["Mon", "", "Wed", "", "Fri", "", ""];

/**
 * ActivityTile — Mock contribution graph similar to GitHub's activity heatmap.
 * Cells stagger in with a very fast delay for a wave effect.
 */
export function ActivityTile() {
  const activityData = useMemo(() => generateActivityData(), []);

  // Calculate some mock stats
  const totalContributions = useMemo(() => {
    return activityData.reduce((sum, week) =>
      sum + week.reduce((wSum, val) => wSum + val, 0), 0
    );
  }, [activityData]);

  return (
    <motion.section
      variants={tileVariants}
      className="
        relative overflow-hidden
        col-span-1 md:col-span-2 lg:col-span-2
        rounded-2xl p-5 md:p-6
        bg-card border border-border-subtle
        gradient-mesh-3
      "
      aria-label="Learning activity graph"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-accent-emerald" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              Activity
            </h2>
            <p className="text-xs text-text-muted">
              {totalContributions} contributions this period
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden md:flex items-center gap-1 text-[10px] text-text-muted">
          <span>Less</span>
          {intensityColors.map((color, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-[3px] ${color}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {/* Day Labels */}
        <div className="flex flex-col gap-[3px] mr-1 flex-shrink-0">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="w-6 h-[14px] flex items-center text-[9px] text-text-muted"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {activityData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((level, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4 + weekIndex * 0.02 + dayIndex * 0.005,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className={`
                  w-[14px] h-[14px] rounded-[3px]
                  ${intensityColors[level]}
                  transition-colors duration-200
                  hover:ring-1 hover:ring-text-muted/30
                `}
                title={`Activity level: ${level}`}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
