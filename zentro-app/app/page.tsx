// ============================================================
// Landing Page - Home Route (/)
// Public page with app introduction and login/signup links
// ============================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Zentro</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm text-muted-foreground">
              ☁️ Cloud-Native Task Management
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Manage tasks with{" "}
              <span className="text-primary">cloud power</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              A modern productivity app built with Next.js, Supabase, Railway,
              and Firebase. Real-time updates, smart suggestions, and beautiful
              design.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Start for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/architecture">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Architecture
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
              title="Task Management"
              description="Create, complete, and delete tasks with a clean, intuitive interface."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-amber-600" />}
              title="Real-time Updates"
              description="Changes sync instantly across devices using Supabase Realtime."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-600" />}
              title="Secure by Default"
              description="Row-level security ensures you only see your own data."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
              title="Smart Analytics"
              description="Firebase tracks usage patterns for actionable insights."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, Supabase, Railway & Firebase — a{" "}
            <span className="font-medium text-foreground">Zentro</span> demo
            project.
          </p>
        </div>
      </footer>
    </div>
  );
}

/** Feature card component for the landing page grid */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
