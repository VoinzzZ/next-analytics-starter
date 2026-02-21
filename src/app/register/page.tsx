"use client";

import { useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    setSuccessMessage("Check your email for confirmation");
    setIsLoading(false);
  };

  const handleGoogleRegister = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative hidden flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900 lg:flex">
            <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-gradient-to-br from-zinc-200/60 to-transparent dark:from-white/10" />
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Get started
              </p>
              <h1 className="mt-3 text-2xl font-semibold">
                Launch your data product in days.
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Supabase auth, role management, analytics pages, ready to go.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                  Starter UI for dashboards & analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                  Role-based access out of the box
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                  Supabase clients pre-wired
                </li>
              </ul>
            </div>
            <div className="text-xs text-zinc-500">
              Built for developers.
            </div>
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-black/40 dark:text-zinc-300">
              “Clear layout, clean code, and a strong foundation. Perfect for
              teams building data products quickly.”
              <div className="mt-3 text-xs uppercase tracking-widest text-zinc-500">
                CTO, Northwind Studio
              </div>
            </div>
          </div>

          <Card className="w-full border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Set up your workspace in minutes.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                {errorMessage ? (
                  <p className="text-sm text-red-600" aria-live="polite">
                    {errorMessage}
                  </p>
                ) : null}
                {successMessage ? (
                  <p className="text-sm text-emerald-600" aria-live="polite">
                    {successMessage}
                  </p>
                ) : null}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleRegister}
                  disabled={isLoading}
                >
                  Sign up with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
