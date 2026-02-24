// ============================================================
// Dashboard Header Component
// Navigation bar with user info and logout
// ============================================================

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Zap, LogOut, LayoutGrid, Map } from "lucide-react";

interface DashboardHeaderProps {
  email: string;
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  // Get initials from email for avatar
  const initials = email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Zentro</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/architecture">
            <Button variant="ghost" size="sm" className="gap-2">
              <Map className="h-4 w-4" />
              Architecture
            </Button>
          </Link>
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium">{email}</p>
              <p className="text-xs text-muted-foreground">Signed in</p>
            </div>
            <DropdownMenuSeparator />
            <Link href="/dashboard" className="sm:hidden">
              <DropdownMenuItem>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href="/architecture" className="sm:hidden">
              <DropdownMenuItem>
                <Map className="mr-2 h-4 w-4" />
                Architecture
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="sm:hidden" />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
