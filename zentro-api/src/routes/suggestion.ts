// ============================================================
// Suggestion Route
// GET /api/suggestion - Returns productivity suggestions
// Based on the user's current task statistics
// ============================================================

import { Router, Request, Response } from "express";

export const suggestionRouter = Router();

// ---- Suggestion Messages ----

interface SuggestionMessage {
  message: string;
  type: "motivation" | "optimization" | "reminder";
}

/** Motivational messages for users with no tasks */
const noTaskMessages: SuggestionMessage[] = [
  {
    message:
      "Start your productivity journey! Create your first task and build momentum. 🚀",
    type: "motivation",
  },
  {
    message:
      "Every great achievement begins with a single step. Add your first task today! ✨",
    type: "motivation",
  },
  {
    message:
      "Your task list is empty — the perfect canvas for productivity. What will you accomplish today? 🎯",
    type: "motivation",
  },
];

/** Messages for when all tasks are completed */
const allDoneMessages: SuggestionMessage[] = [
  {
    message:
      "Amazing work! All tasks completed! 🎉 Take a moment to celebrate, then set new goals.",
    type: "motivation",
  },
  {
    message:
      "You're on fire! 🔥 Every task is done. Consider planning your next batch of tasks.",
    type: "optimization",
  },
  {
    message:
      "Clean slate achieved! ✅ You've crushed it. Time to dream bigger and add new challenges.",
    type: "motivation",
  },
];

/** Messages for users with good progress (>50% completed) */
const goodProgressMessages: SuggestionMessage[] = [
  {
    message:
      "Great momentum! You're over halfway done. Keep pushing — the finish line is in sight! 💪",
    type: "motivation",
  },
  {
    message:
      "Impressive progress! Try tackling the hardest remaining task next for maximum impact. 🧠",
    type: "optimization",
  },
  {
    message:
      "You're making solid progress! Consider breaking large remaining tasks into smaller chunks. 📋",
    type: "optimization",
  },
  {
    message:
      "Over 50% done! 🌟 Focus on one task at a time to maintain your flow state.",
    type: "reminder",
  },
];

/** Messages for users with some progress (<50% completed) */
const someProgressMessages: SuggestionMessage[] = [
  {
    message:
      "You've started strong! Try the 2-minute rule: if a task takes less than 2 minutes, do it now. ⚡",
    type: "optimization",
  },
  {
    message:
      "Progress is progress! Focus on completing one task before moving to the next. 🎯",
    type: "reminder",
  },
  {
    message:
      "Tip: Prioritize your tasks by urgency. Start with what matters most today. 📌",
    type: "optimization",
  },
  {
    message:
      "Keep going! Every completed task builds momentum. You're building great habits. 🌱",
    type: "motivation",
  },
];

/** Messages for users with many pending tasks */
const manyPendingMessages: SuggestionMessage[] = [
  {
    message:
      "You have several tasks ahead. Try time-blocking: dedicate 25-min focused sessions to each. ⏱️",
    type: "optimization",
  },
  {
    message:
      "Feeling overwhelmed? Pick just 3 priority tasks for today and focus only on those. 🎯",
    type: "optimization",
  },
  {
    message:
      "Break it down! Large task lists feel easier when you focus on the next single action. 📝",
    type: "reminder",
  },
];

/**
 * Pick a random message from an array
 */
function pickRandom(messages: SuggestionMessage[]): SuggestionMessage {
  return messages[Math.floor(Math.random() * messages.length)];
}

// ---- Route Handler ----

/**
 * GET /api/suggestion
 * Query params:
 *   - total: total number of tasks
 *   - completed: number of completed tasks
 *
 * Returns a contextual productivity suggestion based on task stats.
 */
suggestionRouter.get("/suggestion", (req: Request, res: Response) => {
  const total = parseInt(req.query.total as string) || 0;
  const completed = parseInt(req.query.completed as string) || 0;
  const pending = total - completed;
  const completionRate = total > 0 ? completed / total : 0;

  let suggestion: SuggestionMessage;

  if (total === 0) {
    // No tasks at all
    suggestion = pickRandom(noTaskMessages);
  } else if (completed === total) {
    // All tasks done
    suggestion = pickRandom(allDoneMessages);
  } else if (pending > 5) {
    // Many pending tasks
    suggestion = pickRandom(manyPendingMessages);
  } else if (completionRate > 0.5) {
    // Good progress
    suggestion = pickRandom(goodProgressMessages);
  } else {
    // Some progress
    suggestion = pickRandom(someProgressMessages);
  }

  res.json(suggestion);
});
