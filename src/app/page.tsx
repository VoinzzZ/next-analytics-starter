import Link from "next/link";
import {
  BarChart3,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Puzzle,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    title: "Authentication",
    description: "Secure email/password and OAuth flows with Supabase Auth.",
    icon: Lock,
  },
  {
    title: "Role Management",
    description: "Admin, moderator, and user roles with RLS policies.",
    icon: ShieldCheck,
  },
  {
    title: "Analytics Dashboard",
    description: "Polished charts and insights ready for real data.",
    icon: BarChart3,
  },
  {
    title: "TypeScript Ready",
    description: "Typed APIs, components, and safer refactors.",
    icon: Puzzle,
  },
  {
    title: "Supabase Integrated",
    description: "Server, browser, and middleware clients included.",
    icon: LayoutDashboard,
  },
  {
    title: "shadcn/ui Components",
    description: "Reusable UI primitives with Tailwind styling.",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            A
          </span>
          Analytics Starter
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-10">
        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The Analytics Dashboard Starter
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Ship a production-ready analytics dashboard with authentication,
              role-based access, and a modern UI. Built on Next.js and Supabase.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Get Started
              </Link>
              <a
                href="https://github.com/your-org/next-analytics-starter"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-none dark:border-zinc-800 dark:bg-black">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-zinc-950 px-5 py-4 text-white dark:bg-white dark:text-zinc-950">
                <p className="text-xs uppercase tracking-widest text-zinc-300 dark:text-zinc-600">
                  Weekly Active
                </p>
                <p className="mt-3 text-3xl font-semibold">18,240</p>
                <p className="mt-1 text-xs text-emerald-300 dark:text-emerald-600">
                  +12.4%
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    MRR
                  </p>
                  <p className="mt-2 text-lg font-semibold">$128.4K</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Conversion
                  </p>
                  <p className="mt-2 text-lg font-semibold">3.6%</p>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-200 px-4 py-4 text-sm text-zinc-500 dark:border-zinc-800">
                Drag & drop real data once you connect Supabase.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Everything you need</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-none transition-transform hover:-translate-y-1 dark:border-zinc-800 dark:bg-black"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-none dark:border-zinc-800 dark:bg-black">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              What You Get
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              A production‑ready foundation
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              This starter kit is built for developers who want to launch fast
              without rebuilding the same infrastructure.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                Supabase auth + server/browser/middleware clients
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                Role-based access control with RLS policies
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                Analytics dashboards, settings, and admin pages
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-none dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Built for speed
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Launch your SaaS faster
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Start with a clean UI, sensible structure, and TypeScript-first
              codebase. Replace mock data with real APIs when you&apos;re ready.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black">
                <span>Auth + Users</span>
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  Ready
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black">
                <span>Analytics Views</span>
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  Ready
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black">
                <span>Admin Console</span>
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  Ready
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-none dark:border-zinc-800 dark:bg-black">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Tech Stack
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Modern tools, battle-tested
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Next.js", "Supabase", "TypeScript", "Tailwind"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium dark:border-zinc-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-none dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Ready to Build
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Launch your SaaS without the boilerplate.
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                This starter kit gives you auth, roles, and analytics screens so
                you can focus on product.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 Analytics Starter. All rights reserved.</p>
          <a
            href="https://github.com/your-org/next-analytics-starter"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
