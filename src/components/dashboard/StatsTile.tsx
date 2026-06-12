"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Trophy, Target, TrendingUp } from "lucide-react";
import { tileVariants } from "./BentoGrid";

interface StatItem {
  label: string;
  value: string;
  icon: typeof Clock;
  color: string;
  bgColor: string;
}

const stats: StatItem[] = [
  {
    label: "Hours Learned",
    value: "127",
    icon: Clock,
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
  },
  {
    label: "Completed",
    value: "8",
    icon: Trophy,
    color: "text-accent-amber",
    bgColor: "bg-accent-amber/10",
  },
  {
    label: "Avg. Score",
    value: "94%",
    icon: Target,
    color: "text-accent-emerald",
    bgColor: "bg-accent-emerald/10",
  },
  {
    label: "Ranking",
    value: "#12",
    icon: TrendingUp,
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
  },
];

/**
 * StatsTile — Quick statistics overview with animated value counters.
 * Spans 2 columns on large screens.
 */
export function StatsTile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      variants={tileVariants}
      className="
        relative overflow-hidden
        col-span-1 md:col-span-2
        rounded-2xl p-5 md:p-6
        bg-card border border-border-subtle
        gradient-mesh-4
      "
      aria-label="Learning statistics"
    >
      <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-accent-purple" />
        Quick Stats
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
            >
              <div className={`w-9 h-9 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-[10px] text-text-muted text-center">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
