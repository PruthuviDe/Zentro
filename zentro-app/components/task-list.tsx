// ============================================================
// Task List Component
// Renders the list of tasks with empty state
// ============================================================

import { TaskItem } from "@/components/task-item";
import { ClipboardList } from "lucide-react";
import type { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
}

export function TaskList({ tasks, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-1">No tasks yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Create your first task to get started. Stay organized and track your
          progress!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
