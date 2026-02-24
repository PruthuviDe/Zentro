// ============================================================
// Zentro Cloud Task Tracker - TypeScript Type Definitions
// ============================================================

/**
 * Task status type
 */
export type TaskStatus = "pending" | "completed";

/**
 * Task entity from the database
 */
export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

/**
 * Payload for creating a new task
 */
export interface CreateTaskPayload {
  title: string;
  description?: string;
}

/**
 * Payload for updating a task
 */
export interface UpdateTaskPayload {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  total: number;
  completed: number;
  pending: number;
}

/**
 * Productivity suggestion from the Railway API
 */
export interface ProductivitySuggestion {
  message: string;
  type: "motivation" | "optimization" | "reminder";
}

/**
 * User profile info
 */
export interface UserProfile {
  id: string;
  email: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
