-- ============================================================
-- Zentro Cloud Task Tracker - Supabase Database Setup
-- Run this SQL in the Supabase SQL Editor to create the 
-- tasks table and enable Row-Level Security (RLS)
-- ============================================================

-- 1. Create the tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Enable Row-Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policy: Users can only SELECT their own tasks
CREATE POLICY "Users can view their own tasks"
  ON public.tasks
  FOR SELECT
  USING (auth.uid() = user_id);

-- 4. RLS Policy: Users can only INSERT their own tasks
CREATE POLICY "Users can create their own tasks"
  ON public.tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. RLS Policy: Users can only UPDATE their own tasks
CREATE POLICY "Users can update their own tasks"
  ON public.tasks
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. RLS Policy: Users can only DELETE their own tasks
CREATE POLICY "Users can delete their own tasks"
  ON public.tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- 7. Enable Realtime for the tasks table
-- Go to Supabase Dashboard → Database → Replication
-- and enable the "tasks" table for realtime updates.
-- Or use the following command:
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;

-- 8. Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);

-- 9. Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at DESC);
