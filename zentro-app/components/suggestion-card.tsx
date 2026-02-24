// ============================================================
// Suggestion Card Component
// Displays a productivity suggestion from the Railway API
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw, Loader2 } from "lucide-react";
import { getSuggestion } from "@/services/suggestion-service";
import type { ProductivitySuggestion } from "@/types";

interface SuggestionCardProps {
  totalTasks: number;
  completedTasks: number;
}

export function SuggestionCard({ totalTasks, completedTasks }: SuggestionCardProps) {
  const [suggestion, setSuggestion] = useState<ProductivitySuggestion | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchSuggestion() {
    setLoading(true);
    try {
      const data = await getSuggestion(totalTasks, completedTasks);
      setSuggestion(data);
    } catch (error) {
      console.error("Failed to fetch suggestion:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTasks, completedTasks]);

  return (
    <Card className="shadow-sm border-primary/20 bg-primary/[0.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          Productivity Insight
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={fetchSuggestion}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-12 flex items-center">
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {suggestion?.message ||
              "Keep up the great work! Stay focused on your goals."}
          </p>
        )}
        <p className="text-xs text-muted-foreground/60 mt-2">
          Powered by Railway API
        </p>
      </CardContent>
    </Card>
  );
}
