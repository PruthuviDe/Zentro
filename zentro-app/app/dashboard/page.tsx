// ============================================================
// Dashboard Page (/dashboard)
// Protected route - main app interface
// Displays stats, tasks, and productivity suggestion
// ============================================================

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DashboardHeader } from "@/components/dashboard-header";
import { StatsCards } from "@/components/stats-cards";
import { TaskList } from "@/components/task-list";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { SuggestionCard } from "@/components/suggestion-card";
import { trackDashboardView } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import type { Task, DashboardStats } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const supabase = createClient();

  /** Calculate dashboard statistics from tasks */
  function calculateStats(taskList: Task[]): DashboardStats {
    const total = taskList.length;
    const completed = taskList.filter((t) => t.completed).length;
    return { total, completed, pending: total - completed };
  }

  /** Fetch tasks from Supabase */
  const fetchTasks = useCallback(async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    }

    const taskList = (data as Task[]) || [];
    setTasks(taskList);
    setStats(calculateStats(taskList));
  }, [supabase]);

  /** Check authentication and load initial data */
  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");
      await fetchTasks();
      setLoading(false);

      // Track dashboard view in Firebase
      await trackDashboardView();
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Set up Supabase Realtime subscription for task changes */
  useEffect(() => {
    const channel = supabase
      .channel("tasks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        () => {
          // Refresh tasks when any change occurs
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchTasks]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader email={email} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your tasks and track your productivity.
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Productivity Suggestion from Railway API */}
          <SuggestionCard
            totalTasks={stats.total}
            completedTasks={stats.completed}
          />

          {/* Task List Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tasks</h2>
              <CreateTaskDialog onTaskCreated={fetchTasks} />
            </div>
            <TaskList tasks={tasks} onUpdate={fetchTasks} />
          </div>
        </div>
      </main>
    </div>
  );
}
