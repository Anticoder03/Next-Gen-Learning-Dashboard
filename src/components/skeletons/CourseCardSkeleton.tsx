"use client";

import { motion } from "framer-motion";

/**
 * CourseCardSkeleton — Pulsing skeleton loader for course tiles.
 * Shown inside Suspense boundary while CourseGrid fetches data from Supabase.
 * Uses Framer Motion for a smooth pulsing animation.
 */
export function CourseCardSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0.3,
          }}
          className="
            col-span-1
            rounded-2xl p-5
            bg-card border border-border-subtle
            overflow-hidden
          "
          role="status"
          aria-label="Loading course"
        >
          {/* Icon skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-xl bg-white/[0.05] mb-4"
          />

          {/* Title skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="h-5 w-3/4 rounded-lg bg-white/[0.05] mb-2"
          />

          {/* Subtitle skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="h-3 w-1/3 rounded-lg bg-white/[0.05] mb-4"
          />

          {/* Progress bar skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="h-2 w-full rounded-full bg-white/[0.05]"
          />

          {/* Date skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="h-3 w-1/4 rounded-lg bg-white/[0.05] mt-3"
          />
        </motion.div>
      ))}
    </>
  );
}
