"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { tileVariants } from "./BentoGrid";
import { motion } from "framer-motion";

interface ErrorStateProps {
  message?: string;
}

/**
 * ErrorState — Graceful error display when Supabase connection fails.
 * Spans the full grid width with a retry option.
 */
export function ErrorState({ message }: ErrorStateProps) {
  return (
    <motion.section
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      className="
        col-span-1 md:col-span-2 lg:col-span-4
        rounded-2xl p-8
        bg-card border border-accent-rose/20
        flex flex-col items-center justify-center text-center gap-4
      "
      role="alert"
      aria-label="Error loading courses"
    >
      <div className="w-12 h-12 rounded-xl bg-accent-rose/10 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-accent-rose" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Failed to load courses
        </h3>
        <p className="text-sm text-text-secondary max-w-md">
          {message || "Could not connect to the database. Please check your Supabase configuration and try again."}
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="
          flex items-center gap-2 px-4 py-2 rounded-xl
          bg-accent-rose/10 border border-accent-rose/20
          text-accent-rose text-sm font-medium
          hover:bg-accent-rose/20 transition-colors
        "
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </motion.section>
  );
}
