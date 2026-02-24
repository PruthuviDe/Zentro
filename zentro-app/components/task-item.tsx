// ============================================================
// Task Item Component
// Individual task card with toggle and delete actions
// ============================================================

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Loader2 } from "lucide-react";
import { updateTask, deleteTask } from "@/services/task-service";
import { trackTaskCompleted } from "@/lib/firebase";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

export function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /** Toggle task completion status */
  async function handleToggle() {
    setLoading(true);
    try {
      await updateTask(task.id, { completed: !task.completed });

      // Track completion event
      if (!task.completed) {
        await trackTaskCompleted();
      }

      onUpdate();
    } catch (error) {
      console.error("Failed to toggle task:", error);
    } finally {
      setLoading(false);
    }
  }

  /** Delete the task */
  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteTask(task.id);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setDeleting(false);
    }
  }

  // Format the creation date
  const formattedDate = new Date(task.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card
      className={`p-4 shadow-sm transition-all hover:shadow-md ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            disabled={loading}
            className="h-5 w-5"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-medium text-sm truncate ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </h3>
            <Badge
              variant={task.completed ? "secondary" : "outline"}
              className="text-xs shrink-0"
            >
              {task.completed ? "Done" : "Pending"}
            </Badge>
          </div>
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
              {task.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground/60">{formattedDate}</p>
        </div>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}
