import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    "User";

  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Account</p>
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>
      <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Account details from Supabase.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar className="size-16">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={fullName} /> : null}
            <AvatarFallback>{fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Full name
              </p>
              <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                {fullName}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Email
              </p>
              <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Avatar URL
              </p>
              <p className="break-all text-sm">{avatarUrl || "Not set"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
