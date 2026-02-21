"use client";

import { Suspense } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartTooltip } from "@/components/charts/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const metrics = [
  {
    label: "Total Users",
    value: "48,320",
    delta: "+8.2%",
    deltaClass: "text-emerald-600",
    accent: "border-l-2 border-emerald-500/70",
  },
  {
    label: "Revenue",
    value: "$128,430",
    delta: "+4.7%",
    deltaClass: "text-emerald-600",
    accent: "border-l-2 border-blue-500/70",
  },
  {
    label: "Active Sessions",
    value: "6,914",
    delta: "-1.4%",
    deltaClass: "text-red-600",
    accent: "border-l-2 border-rose-500/70",
  },
  {
    label: "Growth Rate",
    value: "12.6%",
    delta: "+2.1%",
    deltaClass: "text-emerald-600",
    accent: "border-l-2 border-amber-500/70",
  },
];

const revenueData = [
  { month: "Aug", value: 18000 },
  { month: "Sep", value: 22000 },
  { month: "Oct", value: 24500 },
  { month: "Nov", value: 27000 },
  { month: "Dec", value: 30500 },
  { month: "Jan", value: 32430 },
];

const growthData = [
  { month: "Aug", users: 4200 },
  { month: "Sep", users: 4800 },
  { month: "Oct", users: 5100 },
  { month: "Nov", users: 5600 },
  { month: "Dec", users: 6100 },
  { month: "Jan", users: 6900 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between dark:border-zinc-800">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Overview
          </p>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-zinc-500">
            Monitor growth, revenue, and engagement at a glance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">New Report</Button>
        </div>
      </div>
      <Suspense fallback={<DashboardMetricsSkeleton />}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              className={`border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black ${metric.accent}`}
            >
              <CardHeader>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="text-2xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm font-medium ${metric.deltaClass}`}>
                  {metric.delta} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Suspense>

      <Suspense fallback={<DashboardChartsSkeleton />}>
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-4">
          <Card className="h-full border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Revenue (Last 6 Months)</CardTitle>
                <CardDescription>Monthly recurring revenue trend.</CardDescription>
              </div>
              <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs uppercase tracking-widest text-zinc-500 dark:border-zinc-800">
                MRR
              </span>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" stroke="#27272a" />
                  <YAxis stroke="#27272a" />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="h-full border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>User Growth (Last 6 Months)</CardTitle>
                <CardDescription>New users added per month.</CardDescription>
              </div>
              <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs uppercase tracking-widest text-zinc-500 dark:border-zinc-800">
                Users
              </span>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <XAxis dataKey="month" stroke="#27272a" />
                  <YAxis stroke="#27272a" />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="users"
                    fill="#0f172a"
                    radius={[6, 6, 0, 0]}
                    activeBar={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
              <CardDescription>Key changes this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start justify-between gap-3">
                  <span>New enterprise leads</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    48
                  </span>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <span>Churned subscriptions</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    6
                  </span>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <span>Avg. session time</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    5m 42s
                  </span>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <span>Top channel</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    Organic
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Session Breakdown</CardTitle>
              <CardDescription>Active vs returning users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      New users
                    </span>
                    <span className="font-medium">62%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <div className="h-2 w-[62%] rounded-full bg-zinc-950 dark:bg-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Returning users
                    </span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <div className="h-2 w-[38%] rounded-full bg-zinc-700 dark:bg-zinc-300" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Starter Checklist</CardTitle>
              <CardDescription>Get your SaaS ready faster.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <span>Connect Supabase project</span>
                  <span className="text-xs font-semibold text-emerald-600">
                    Done
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <span>Invite teammates</span>
                  <span className="text-xs font-semibold text-zinc-500">
                    Pending
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <span>Replace mock analytics</span>
                  <span className="text-xs font-semibold text-zinc-500">
                    Pending
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest product signals.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center justify-between">
                  <span>New trial signups</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    14
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Activated workspaces</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    9
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Failed payments</span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    2
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

function DashboardMetricsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`metric-skeleton-${index}`}
          className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-8 w-32" />
          <Skeleton className="mt-4 h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

function DashboardChartsSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="grid gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`chart-skeleton-${index}`}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
          >
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-56" />
            <Skeleton className="mt-6 h-64 w-full" />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`panel-skeleton-${index}`}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-3 w-40" />
            <Skeleton className="mt-6 h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
