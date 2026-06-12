import { Suspense } from "react";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { StatsTile } from "@/components/dashboard/StatsTile";
import { CourseCardSkeleton } from "@/components/skeletons/CourseCardSkeleton";

export const dynamic = "force-dynamic";

/**
 * Dashboard Page — Server Component
 *
 * Orchestrates the Bento Grid layout with:
 * - HeroTile (greeting + streak)
 * - CourseGrid (Supabase data via RSC, wrapped in Suspense)
 * - ActivityTile (contribution graph)
 * - StatsTile (quick stats)
 */
export default function DashboardPage() {
  return (
    <BentoGrid>
      {/* Hero Tile — spans 2 columns */}
      <HeroTile />

      {/* Stats Tile — spans 2 columns */}
      <StatsTile />

      {/* Course Tiles — fetched from Supabase via Server Components */}
      <Suspense fallback={<CourseCardSkeleton />}>
        <CourseGrid />
      </Suspense>

      {/* Activity Tile — spans 2 columns */}
      <ActivityTile />
    </BentoGrid>
  );
}
