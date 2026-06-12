import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";
import { CourseTile } from "./CourseTile";
import { ErrorState } from "./ErrorState";

/**
 * CourseGrid — Server Component that fetches courses from Supabase.
 * Renders CourseTile client components with the fetched data.
 * This component is wrapped in a Suspense boundary by the parent page.
 */
export async function CourseGrid() {
  let courses: Course[] | null = null;
  let fetchError: Error | null = null;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase query error:", error);
      fetchError = error;
    } else {
      courses = data as Course[];
    }
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    fetchError = err instanceof Error ? err : new Error("Failed to connect to database. Please check your Supabase configuration.");
  }

  if (fetchError) {
    return <ErrorState message={fetchError.message} />;
  }

  if (!courses || courses.length === 0) {
    return (
      <section className="col-span-1 md:col-span-2 lg:col-span-4 rounded-2xl p-8 bg-card border border-border-subtle text-center">
        <p className="text-text-secondary">No courses found. Add some courses to your Supabase database!</p>
      </section>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index} />
      ))}
    </>
  );
}
