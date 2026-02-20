"use client";

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

const metrics = [
  {
    label: "Total Users",
    value: "48,320",
    delta: "+8.2%",
    deltaClass: "text-emerald-600",
  },
  {
    label: "Revenue",
    value: "$128,430",
    delta: "+4.7%",
    deltaClass: "text-emerald-600",
  },
  {
    label: "Active Sessions",
    value: "6,914",
    delta: "-1.4%",
    deltaClass: "text-red-600",
  },
  {
    label: "Growth Rate",
    value: "12.6%",
    delta: "+2.1%",
    deltaClass: "text-emerald-600",
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Revenue (Last 6 Months)</CardTitle>
            <CardDescription>Monthly recurring revenue trend.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#18181b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>User Growth (Last 6 Months)</CardTitle>
            <CardDescription>New users added per month.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <XAxis dataKey="month" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip />
                <Bar dataKey="users" fill="#3f3f46" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
