/**
 * loading.tsx — Full-page skeleton shown during route transitions.
 * Uses a layout that mirrors the actual dashboard Bento Grid.
 */
export default function Loading() {
  return (
    <div className="grid gap-4 p-4 md:p-6 lg:p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-min animate-pulse">
      {/* Hero skeleton */}
      <div className="col-span-1 md:col-span-2 rounded-2xl p-8 bg-card border border-border-subtle min-h-[200px]">
        <div className="h-4 w-32 rounded-lg bg-white/[0.05] mb-4" />
        <div className="h-8 w-64 rounded-lg bg-white/[0.05] mb-2" />
        <div className="h-4 w-48 rounded-lg bg-white/[0.05] mb-6" />
        <div className="flex gap-3">
          <div className="h-16 w-28 rounded-xl bg-white/[0.05]" />
          <div className="h-16 w-28 rounded-xl bg-white/[0.05]" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="col-span-1 md:col-span-2 rounded-2xl p-6 bg-card border border-border-subtle">
        <div className="h-4 w-24 rounded-lg bg-white/[0.05] mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="h-9 w-9 rounded-lg bg-white/[0.05] mx-auto mb-2" />
              <div className="h-6 w-12 rounded-lg bg-white/[0.05] mx-auto mb-1" />
              <div className="h-3 w-16 rounded-lg bg-white/[0.05] mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Course card skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="col-span-1 rounded-2xl p-5 bg-card border border-border-subtle">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] mb-4" />
          <div className="h-5 w-3/4 rounded-lg bg-white/[0.05] mb-2" />
          <div className="h-3 w-1/3 rounded-lg bg-white/[0.05] mb-4" />
          <div className="h-2 w-full rounded-full bg-white/[0.05]" />
        </div>
      ))}

      {/* Activity skeleton */}
      <div className="col-span-1 md:col-span-2 rounded-2xl p-6 bg-card border border-border-subtle min-h-[180px]">
        <div className="h-4 w-20 rounded-lg bg-white/[0.05] mb-4" />
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 70 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-sm bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
