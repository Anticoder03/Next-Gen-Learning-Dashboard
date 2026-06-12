"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  User,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-xl border-t border-border-subtle"
    >
      <ul className="flex items-center justify-around h-16 px-2" role="list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                id={`mobile-nav-${item.id}`}
                onClick={() => setActiveId(item.id)}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-accent-blue" : "text-text-muted"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-text-primary" : "text-text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
