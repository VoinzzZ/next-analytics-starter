"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  LayoutDashboard,
  Settings,
  Shield,
} from "lucide-react";

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
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
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
        className={`fixed left-0 top-0 z-50 h-full w-64 border-r border-zinc-200 bg-white p-6 transition-transform dark:border-zinc-800 dark:bg-zinc-950 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between md:justify-start">
          <span className="text-lg font-semibold">Workspace</span>
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
        <nav className="mt-8 flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
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
        <div className="text-xs text-zinc-500">Analytics Starter</div>
      </aside>
    </>
  );
}
