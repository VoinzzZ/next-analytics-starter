"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BarChart, LayoutDashboard, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type SidebarProps = {
  isAdmin: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
];

export function Sidebar({ isAdmin, open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const items = isAdmin
    ? [...navItems, { label: "Admin", href: "/admin", icon: Shield }]
    : navItems;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => onOpenChange(false)}
        role="button"
        tabIndex={0}
        aria-label="Close sidebar"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            onOpenChange(false);
          }
        }}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-56 border-r border-zinc-200 bg-white p-5 transition-transform dark:border-zinc-800 dark:bg-black md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between md:justify-start">
          <div className="flex items-center gap-2 text-base font-semibold">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              A
            </span>
            Analytics
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => onOpenChange(false)}
          >
            <span className="sr-only">Close sidebar</span>
            Close
          </Button>
        </div>
        <div className="mt-6 text-xs uppercase tracking-widest text-zinc-500">
          Navigation
        </div>
        <nav className="mt-3 flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
                onClick={() => onOpenChange(false)}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Separator className="my-6" />
        <div className="text-xs uppercase tracking-widest text-zinc-500">
          Analytics Starter
        </div>
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="uppercase tracking-widest text-[10px] text-zinc-500">
            Quick stats
          </p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span>MRR</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                $128k
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Active</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                6.9k
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
