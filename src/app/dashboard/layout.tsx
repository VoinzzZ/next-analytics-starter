import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/layout-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const isAdmin = roles?.some((role) => role.role === "admin") ?? false;
  const userName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "User";
  const userEmail = user.email || "";
  const userAvatarUrl = user.user_metadata?.avatar_url || null;

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <DashboardShell
      isAdmin={isAdmin}
      userName={userName}
      userEmail={userEmail}
      userAvatarUrl={userAvatarUrl}
      logoutAction={signOut}
    >
      {children}
    </DashboardShell>
  );
}
