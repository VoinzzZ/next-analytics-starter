"use client";

import { Suspense, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
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
import { DateRangePicker } from "@/components/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const trafficData = [
  { month: "Aug", visits: 48000 },
  { month: "Sep", visits: 52000 },
  { month: "Oct", visits: 61000 },
  { month: "Nov", visits: 68000 },
  { month: "Dec", visits: 75000 },
  { month: "Jan", visits: 82000 },
];

const conversionData = [
  { month: "Aug", rate: 2.4 },
  { month: "Sep", rate: 2.7 },
  { month: "Oct", rate: 2.6 },
  { month: "Nov", rate: 3.1 },
  { month: "Dec", rate: 3.4 },
  { month: "Jan", rate: 3.6 },
];

const sourceData = [
  { name: "Organic", value: 46 },
  { name: "Direct", value: 28 },
  { name: "Social", value: 16 },
  { name: "Referral", value: 10 },
];

const sourceColors = ["#2563eb", "#06b6d4", "#7c3aed", "#f59e0b"];

const tableRows = [
  { page: "/dashboard", views: "28,430", unique: "18,220", bounce: "32%" },
  { page: "/pricing", views: "21,840", unique: "14,100", bounce: "28%" },
  { page: "/features", views: "19,210", unique: "12,430", bounce: "35%" },
  { page: "/blog/launch", views: "15,980", unique: "11,300", bounce: "41%" },
  { page: "/integrations", views: "12,540", unique: "8,920", bounce: "29%" },
  { page: "/case-studies", views: "10,220", unique: "7,840", bounce: "33%" },
  { page: "/contact", views: "9,760", unique: "6,440", bounce: "38%" },
  { page: "/docs/getting-started", views: "8,930", unique: "6,210", bounce: "27%" },
  { page: "/security", views: "7,610", unique: "5,180", bounce: "30%" },
  { page: "/careers", views: "6,840", unique: "4,990", bounce: "36%" },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Insights
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex size-2 rounded-full bg-blue-600" />
          <h1 className="text-2xl font-semibold">Analytics</h1>
        </div>
      </div>
      <Suspense fallback={<AnalyticsMetricsSkeleton />}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Visits",
              value: "82,420",
              change: "+6.4%",
              color: "text-emerald-600",
            },
            {
              label: "Unique Visitors",
              value: "41,180",
              change: "+3.1%",
              color: "text-emerald-600",
            },
            {
              label: "Bounce Rate",
              value: "32.8%",
              change: "-1.2%",
              color: "text-emerald-600",
            },
            {
              label: "Avg. Session",
              value: "5m 12s",
              change: "+0.4%",
              color: "text-emerald-600",
            },
          ].map((item) => (
            <Card
              key={item.label}
              className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black"
            >
              <CardHeader>
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-2xl">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm font-medium ${item.color}`}>
                  {item.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Suspense>
      <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
        <CardHeader>
          <CardTitle>Date Range</CardTitle>
          <CardDescription>Select the time window to view.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {["Last 7 days", "Last 30 days", "Last 90 days", "This year"].map(
              (range, index) => (
                <Button
                  key={range}
                  type="button"
                  variant={index === 1 ? "default" : "outline"}
                  className={index === 1 ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
                >
                  {range}
                </Button>
              )
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <DateRangePicker
              label="Date range"
              value={dateRange}
              onChange={setDateRange}
            />
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              type="button"
            >
              Apply
            </Button>
          </div>
          <p className="text-xs text-zinc-500">
            Dates are shown in your local timezone.
          </p>
        </CardContent>
      </Card>

      <Suspense fallback={<AnalyticsChartsSkeleton />}>
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Total visits across channels.</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="rounded-full border border-zinc-200 px-2 py-1 dark:border-zinc-800">
                  Last 6 months
                </span>
                <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  +6.4% MoM
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Total Visits
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    82.4k
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Unique
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    41.1k
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Avg. Session
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    5m 12s
                  </p>
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient
                        id="trafficFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="transparent" />
                    <XAxis dataKey="month" stroke="#27272a" />
                    <YAxis stroke="#27272a" />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#2563eb"
                      fill="url(#trafficFill)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#0f172a"
                      strokeWidth={1}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Share of visits by channel.</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={entry.name} fill={sourceColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>Monthly conversion rate trend.</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid stroke="transparent" />
                    <XAxis dataKey="month" stroke="#27272a" />
                    <YAxis stroke="#27272a" />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#7c3aed"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
              <CardHeader>
                <CardTitle>Top Channels</CardTitle>
                <CardDescription>Highest converting sources.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span>Organic Search</span>
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      3.8%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Direct</span>
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      3.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Referral</span>
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      2.9%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>

      <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Performance by page.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Unique Visitors</TableHead>
                <TableHead>Bounce Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow
                  key={row.page}
                  className={
                    index % 2 === 0
                      ? "bg-zinc-50/60 dark:bg-zinc-900/20"
                      : undefined
                  }
                >
                  <TableCell className="font-medium">{row.page}</TableCell>
                  <TableCell>{row.views}</TableCell>
                  <TableCell>{row.unique}</TableCell>
                  <TableCell>{row.bounce}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsMetricsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`analytics-metric-skeleton-${index}`}
          className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-8 w-28" />
          <Skeleton className="mt-4 h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

function AnalyticsChartsSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-56" />
        <Skeleton className="mt-6 h-72 w-full" />
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`analytics-chart-skeleton-${index}`}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-3 w-40" />
            <Skeleton className="mt-6 h-40 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
