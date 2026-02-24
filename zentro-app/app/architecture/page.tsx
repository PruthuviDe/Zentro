// ============================================================
// Architecture Page (/architecture)
// Explains the cloud architecture and tech stack
// Includes a text-based architecture diagram
// ============================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  ArrowLeft,
  Globe,
  Database,
  Server,
  BarChart3,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Zentro</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              System Architecture
            </h1>
            <p className="text-muted-foreground mt-2">
              Zentro is a cloud-native application demonstrating modern
              full-stack architecture with four key services working together.
            </p>
          </div>

          {/* Architecture Diagram */}
          <Card className="shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Architecture Diagram</CardTitle>
              <CardDescription>
                How the services connect and communicate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-center whitespace-pre leading-relaxed">
{`
┌─────────────────────────────────────────────────────────────┐
│                        USER (Browser)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend Host)                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App (App Router)                  │  │
│  │  • TypeScript  • Tailwind CSS  • shadcn/ui            │  │
│  │  • Server Components  • Client Components             │  │
│  └──────────┬──────────────────────┬─────────────────────┘  │
└─────────────┼──────────────────────┼────────────────────────┘
              │                      │
     ┌────────▼────────┐    ┌────────▼────────┐
     │                 │    │                 │
     ▼                 │    ▼                 │
┌─────────────┐        │  ┌──────────────┐   │
│  SUPABASE   │        │  │   RAILWAY    │   │
│             │        │  │              │   │
│ • Auth      │        │  │ • Express.js │   │
│ • PostgreSQL│        │  │ • REST API   │   │
│ • Realtime  │        │  │ • /suggestion│   │
│ • RLS       │        │  │              │   │
└─────────────┘        │  └──────────────┘   │
                       │                     │
                       ▼                     │
                 ┌───────────┐               │
                 │ FIREBASE  │◄──────────────┘
                 │           │
                 │ Analytics │
                 │ • Events  │
                 │ • Metrics │
                 └───────────┘
`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Vercel */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Vercel</CardTitle>
                    <CardDescription>Frontend Hosting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Hosts the Next.js frontend application with automatic
                  deployments, edge caching, and serverless functions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 15</Badge>
                  <Badge variant="secondary">App Router</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">shadcn/ui</Badge>
                </div>
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Automatic Git deployments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Edge network for fast loading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Environment variable management</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supabase */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Supabase</CardTitle>
                    <CardDescription>Auth + Database</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Provides authentication, PostgreSQL database with row-level
                  security, and real-time subscriptions for live updates.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">Auth</Badge>
                  <Badge variant="secondary">Realtime</Badge>
                  <Badge variant="secondary">RLS</Badge>
                </div>
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span>Row-level security policies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Email/password authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>WebSocket-based realtime sync</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Railway */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Server className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Railway</CardTitle>
                    <CardDescription>Backend Logic API</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Hosts a lightweight Node.js/Express API service that provides
                  productivity suggestions and custom backend logic.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">REST API</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>GET /api/suggestion endpoint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Deployed separately from frontend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Auto-scaling with Railway</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Firebase */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Firebase</CardTitle>
                    <CardDescription>Analytics</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Tracks user interactions and events for analytics insights,
                  including page views, task actions, and login events.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Analytics</Badge>
                  <Badge variant="secondary">Events</Badge>
                  <Badge variant="secondary">Metrics</Badge>
                </div>
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Dashboard view tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>Task creation & completion events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span>User login tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Flow */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Data Flow</CardTitle>
              <CardDescription>
                How data moves through the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FlowStep
                  step={1}
                  title="User Authentication"
                  description="User signs up or logs in via the Next.js frontend. Supabase Auth handles session management with JWT tokens stored in cookies."
                />
                <FlowStep
                  step={2}
                  title="Task Operations"
                  description="CRUD operations on tasks go directly from the frontend to Supabase PostgreSQL. Row-level security ensures data isolation per user."
                />
                <FlowStep
                  step={3}
                  title="Real-time Sync"
                  description="Supabase Realtime sends WebSocket updates when tasks change, keeping the UI synchronized across multiple browser tabs or devices."
                />
                <FlowStep
                  step={4}
                  title="Productivity Insights"
                  description="The frontend calls the Railway-hosted Express API to get personalized productivity suggestions based on current task statistics."
                />
                <FlowStep
                  step={5}
                  title="Analytics Tracking"
                  description="Firebase Analytics captures user events (login, task creation, task completion, page views) for usage analytics and insights."
                />
              </div>
            </CardContent>
          </Card>

          {/* Back to Dashboard */}
          <div className="text-center pb-8">
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

/** Flow step component for the data flow section */
function FlowStep({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
        {step}
      </div>
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
