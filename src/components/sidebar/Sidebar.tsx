"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      aria-label="Main navigation"
      className={`
        hidden md:flex flex-col
        bg-sidebar border-r border-border-subtle
        h-screen sticky top-0
        transition-[width] duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-[260px]"}
        lg:${collapsed ? "w-[72px]" : "w-[260px]"}
        md:w-[72px] lg:w-auto
        z-40
      `}
    >
      {/* Logo Area */}
      <header className="flex items-center gap-3 px-4 h-16 border-b border-border-subtle">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-lg text-text-primary whitespace-nowrap overflow-hidden hidden lg:block"
            >
              NexusLearn
            </motion.span>
          )}
        </AnimatePresence>
      </header>

      {/* Navigation Items */}
      <ul className="flex-1 flex flex-col gap-1 px-3 py-4" role="list">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            Icon={item.icon}
            href={item.href}
            isActive={activeId === item.id}
            collapsed={collapsed}
            onClick={() => setActiveId(item.id)}
          />
        ))}
      </ul>

      {/* User Section */}
      <footer className="border-t border-border-subtle px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-emerald flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap hidden lg:block"
              >
                <p className="text-sm font-medium text-text-primary">Ashish</p>
                <p className="text-xs text-text-muted">Student</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>

      {/* Collapse Toggle — Desktop Only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border-subtle items-center justify-center hover:bg-card-hover transition-colors z-50"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-text-secondary" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-text-secondary" />
        )}
      </button>
    </nav>
  );
}
