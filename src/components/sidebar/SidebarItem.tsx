"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  id: string;
  label: string;
  Icon: LucideIcon;
  href: string;
  isActive: boolean;
  collapsed: boolean;
}

export function SidebarItem({
  id,
  label,
  Icon,
  href,
  isActive,
  collapsed,
}: SidebarItemProps) {
  return (
    <li>
      <Link
        id={`nav-${id}`}
        href={href}
        className={`
          relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
          text-sm font-medium transition-colors duration-200
          ${isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}
        `}
        aria-current={isActive ? "page" : undefined}
      >
        {/* Animated Active Background — layoutId for smooth transitions */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue/15 to-accent-purple/10 border border-accent-blue/20"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        )}

        <Icon className="w-5 h-5 relative z-10 flex-shrink-0" />

        {!collapsed && (
          <span className="relative z-10 whitespace-nowrap hidden lg:inline">
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}
