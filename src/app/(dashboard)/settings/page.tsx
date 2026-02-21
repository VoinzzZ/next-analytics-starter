"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;
      if (!user) return;

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setFullName(data.full_name || "");
      setAvatarUrl(data.avatar_url || "");
    };

    loadProfile();
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);
    setIsSaving(true);

    const supabase = createClient();
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;
    if (!user) {
      setErrorMessage("User not found.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        avatar_url: avatarUrl,
      })
      .eq("id", user.id);

    if (error) {
      setErrorMessage(error.message);
      setIsSaving(false);
      return;
    }

    setStatusMessage("Profile updated successfully.");
    setIsSaving(false);
  };

  const handlePasswordReset = async () => {
    if (!email) return;
    setStatusMessage(null);
    setErrorMessage(null);
    setIsResetting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setErrorMessage(error.message);
      setIsResetting(false);
      return;
    }

    setStatusMessage("Password reset email sent.");
    setIsResetting(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Preferences
        </p>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  value={avatarUrl}
                  onChange={(event) => setAvatarUrl(event.target.value)}
                  placeholder="https://"
                />
              </div>
              {statusMessage ? (
                <p className="text-sm text-emerald-600" aria-live="polite">
                  {statusMessage}
                </p>
              ) : null}
              {errorMessage ? (
                <p className="text-sm text-red-600" aria-live="polite">
                  {errorMessage}
                </p>
              ) : null}
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage account security.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={email} readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePasswordReset}
                  disabled={isResetting || !email}
                >
                  {isResetting ? "Sending..." : "Change Password"}
                </Button>
                <p className="text-sm text-muted-foreground">
                  We will send a reset link to your email.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Destructive actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Deleting your account is permanent and cannot be undone.
              </p>
              <Button type="button" variant="destructive" disabled>
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
