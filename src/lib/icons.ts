import {
  Atom,
  Network,
  FileCode,
  Globe,
  BookOpen,
  Code2,
  Database,
  Layers,
  Cpu,
  Palette,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps icon name strings from the database to Lucide React components.
 * This allows dynamic icon rendering based on the `icon_name` field in Supabase.
 */
const iconMap: Record<string, LucideIcon> = {
  Atom,
  Network,
  FileCode,
  Globe,
  BookOpen,
  Code2,
  Database,
  Layers,
  Cpu,
  Palette,
  Rocket,
  Zap,
};

/**
 * Resolves an icon name string to a Lucide React component.
 * Falls back to BookOpen if the name is not found.
 */
export function getIcon(name: string): LucideIcon {
  return iconMap[name] || BookOpen;
}
