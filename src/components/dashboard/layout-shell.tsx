"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";

export type DashboardShellProps = {
  children: React.ReactNode;
  isAdmin: boolean;
  userName: string;
  userAvatarUrl?: string | null;
};

export function DashboardShell({
  children,
  isAdmin,
  userName,
  userAvatarUrl,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="flex">
        <Sidebar
          isAdmin={isAdmin}
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-black/90">
            <div className="flex h-16 w-full items-center justify-end px-4 md:px-6">
              <Button
                variant="ghost"
                size="sm"
                className="mr-auto md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                Menu
              </Button>
              <Navbar userName={userName} userAvatarUrl={userAvatarUrl} />
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
