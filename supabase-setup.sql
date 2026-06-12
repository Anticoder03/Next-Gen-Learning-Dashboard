-- =============================================
-- Supabase Setup Script for Student Dashboard
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow public read access (using anon key)
CREATE POLICY "Allow public read access on courses"
  ON courses
  FOR SELECT
  TO anon
  USING (true);

-- 4. Seed the table with mock course data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Atom'),
  ('System Design Masterclass', 42, 'Network'),
  ('TypeScript Deep Dive', 90, 'FileCode'),
  ('Next.js & Server Components', 28, 'Globe');
