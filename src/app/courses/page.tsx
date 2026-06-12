import { BookOpen } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <section className="rounded-2xl p-8 bg-card border border-border-subtle min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6">
          <BookOpen className="w-8 h-8 text-accent-blue" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">All Courses</h1>
        <p className="text-text-secondary max-w-md">
          This is a placeholder page for the full course catalog and search functionality.
        </p>
      </section>
    </div>
  );
}
