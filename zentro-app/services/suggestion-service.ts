// ============================================================
// Suggestion Service
// Fetches productivity suggestions from the Railway backend API
// ============================================================

import type { ProductivitySuggestion } from "@/types";

/**
 * The base URL for the Railway backend API.
 * In production, this points to the Railway-hosted service.
 * In development, it defaults to localhost:3001.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch a productivity suggestion from the Railway backend.
 * The backend analyzes task patterns and returns a motivational
 * or optimization message.
 */
export async function getSuggestion(
  totalTasks: number,
  completedTasks: number
): Promise<ProductivitySuggestion> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/suggestion?total=${totalTasks}&completed=${completedTasks}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggestion");
    }

    const data: ProductivitySuggestion = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestion:", error);
    // Return a fallback suggestion if the API is unavailable
    return {
      message: "Stay focused and keep making progress! Every task completed is a step forward. 🚀",
      type: "motivation",
    };
  }
}
