"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const tileVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 24,
    },
  },
};

interface BentoGridProps {
  children: ReactNode;
}

/**
 * BentoGrid orchestrates staggered entrance animations for its tile children.
 * Uses CSS Grid with responsive breakpoints for the bento layout.
 */
export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        grid gap-4 p-4 md:p-6 lg:p-8
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        auto-rows-min
      "
    >
      {children}
    </motion.div>
  );
}
