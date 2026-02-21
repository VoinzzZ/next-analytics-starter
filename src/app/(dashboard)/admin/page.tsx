import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const summaryCards = [
  { label: "Total Users", value: "1,284" },
  { label: "Admin Count", value: "5" },
  { label: "Pro Users", value: "312" },
  { label: "Free Users", value: "972" },
];

const users = [
  {
    name: "Raka Pratama",
    email: "raka@acme.io",
    role: "admin",
    plan: "enterprise",
    joined: "Jan 12, 2025",
  },
  {
    name: "Sinta Widodo",
    email: "sinta@acme.io",
    role: "admin",
    plan: "pro",
    joined: "Mar 03, 2025",
  },
  {
    name: "Dimas Putra",
    email: "dimas@acme.io",
    role: "moderator",
    plan: "pro",
    joined: "Apr 22, 2025",
  },
  {
    name: "Alya Nabila",
    email: "alya@acme.io",
    role: "user",
    plan: "free",
    joined: "May 09, 2025",
  },
  {
    name: "Fajar Santoso",
    email: "fajar@acme.io",
    role: "user",
    plan: "free",
    joined: "Jun 17, 2025",
  },
  {
    name: "Nadia Kurnia",
    email: "nadia@acme.io",
    role: "user",
    plan: "pro",
    joined: "Aug 04, 2025",
  },
  {
    name: "Hadi Suryono",
    email: "hadi@acme.io",
    role: "user",
    plan: "free",
    joined: "Oct 26, 2025",
  },
  {
    name: "Maya Lestari",
    email: "maya@acme.io",
    role: "user",
    plan: "free",
    joined: "Dec 02, 2025",
  },
];

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard");
  }

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const isAdmin = roles?.some((role) => role.role === "admin");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Administration
        </p>
        <h1 className="text-2xl font-semibold">Admin Console</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, index) => (
          <Card
            key={card.label}
            className={`border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black ${
              index === 0
                ? "border-l-2 border-blue-500/70"
                : index === 1
                ? "border-l-2 border-emerald-500/70"
                : index === 2
                ? "border-l-2 border-violet-500/70"
                : "border-l-2 border-zinc-400/60"
            }`}
          >
            <CardHeader>
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-2xl">{card.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Overview of user roles and plans.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {users.map((userRow, index) => (
                <TableRow key={userRow.email} className={index % 2 === 0 ? "bg-zinc-50/60 dark:bg-zinc-900/20" : undefined}>
                  <TableCell className="font-medium">{userRow.name}</TableCell>
                  <TableCell>{userRow.email}</TableCell>
                    <TableCell className="capitalize">{userRow.role}</TableCell>
                    <TableCell className="capitalize">{userRow.plan}</TableCell>
                    <TableCell>{userRow.joined}</TableCell>
                    <TableCell className="text-right">
                      <Button type="button" variant="outline" size="sm">
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
          <CardHeader>
            <CardTitle>Admin Notes</CardTitle>
            <CardDescription>Quick actions and reminders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Pending reviews
              </p>
              <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                12 access requests
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Security
              </p>
              <p>2FA adoption is at 78% this month.</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Next audit
              </p>
              <p>Scheduled for March 15, 2026.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Review Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
