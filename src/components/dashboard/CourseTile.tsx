"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getIcon } from "@/lib/icons";
import type { Course } from "@/lib/types";
import { tileVariants } from "./BentoGrid";

const gradients = [
  "gradient-mesh-1",
  "gradient-mesh-2",
  "gradient-mesh-3",
  "gradient-mesh-4",
];

const accentColors = [
  { bar: "from-accent-blue to-accent-purple", text: "text-accent-blue", bg: "bg-accent-blue/10" },
  { bar: "from-accent-purple to-accent-rose", text: "text-accent-purple", bg: "bg-accent-purple/10" },
  { bar: "from-accent-emerald to-accent-cyan", text: "text-accent-emerald", bg: "bg-accent-emerald/10" },
  { bar: "from-accent-amber to-accent-rose", text: "text-accent-amber", bg: "bg-accent-amber/10" },
];

interface CourseTileProps {
  course: Course;
  index: number;
}

/**
 * CourseTile — Animated course card with dynamic icon, progress bar, and hover effects.
 * Uses semantic <article> element. Progress bar animates from 0% on mount.
 */
export function CourseTile({ course, index }: CourseTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = getIcon(course.icon_name);
  const gradient = gradients[index % gradients.length];
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.article
      ref={ref}
      variants={tileVariants}
      whileHover={{
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      className={`
        relative overflow-hidden
        col-span-1
        rounded-2xl p-5
        bg-card border border-border-subtle
        ${gradient}
        card-glow
        cursor-pointer
        will-change-transform
      `}
      aria-label={`Course: ${course.title}, ${course.progress}% complete`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 ${accent.text}`} />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-text-primary mb-1">
        {course.title}
      </h3>

      {/* Progress Label */}
      <p className="text-xs text-text-muted mb-3">
        {course.progress}% complete
      </p>

      {/* Animated Progress Bar */}
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${accent.bar} relative`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: course.progress / 100 } : { scaleX: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3 + index * 0.1,
          }}
          style={{ transformOrigin: "left" }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 progress-shimmer" />
        </motion.div>
      </div>

      {/* Created date */}
      <p className="text-[11px] text-text-muted mt-3">
        Started {new Date(course.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
    </motion.article>
  );
}
