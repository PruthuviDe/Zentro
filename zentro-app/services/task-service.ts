// ============================================================
// Task Service
// Handles all task CRUD operations via Supabase
// ============================================================

import { createClient } from "@/lib/supabase/client";
import type { Task, CreateTaskPayload, UpdateTaskPayload } from "@/types";

/**
 * Fetch all tasks for the currently authenticated user.
 * Tasks are ordered by creation date (newest first).
 */
export async function getTasks(): Promise<Task[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.message);
  }

  return data as Task[];
}

/**
 * Create a new task for the current user.
 */
export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: payload.title,
      description: payload.description || null,
      user_id: user.id,
      completed: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error.message);
    throw new Error(error.message);
  }

  return data as Task;
}

/**
 * Update an existing task (toggle completion, edit title, etc.)
 */
export async function updateTask(
  taskId: string,
  payload: UpdateTaskPayload
): Promise<Task> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    console.error("Error updating task:", error.message);
    throw new Error(error.message);
  }

  return data as Task;
}

/**
 * Delete a task by its ID.
 */
export async function deleteTask(taskId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error.message);
    throw new Error(error.message);
  }
}
