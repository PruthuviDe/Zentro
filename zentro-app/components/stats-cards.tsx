// ============================================================
// Stats Cards Component
// Displays task statistics in a card grid
// ============================================================

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle2, Clock } from "lucide-react";
import type { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const completionRate =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total Tasks */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Tasks
          </CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            All tracked tasks
          </p>
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completed
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-600">
            {stats.completed}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {completionRate}% completion rate
          </p>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending
          </CardTitle>
          <Clock className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-600">
            {stats.pending}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Tasks remaining
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
