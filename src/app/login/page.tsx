"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
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
                Welcome
              </p>
              <h1 className="mt-3 text-2xl font-semibold">
                Build your analytics stack faster.
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Authenticate, manage roles, and ship dashboards without
                rebuilding infrastructure.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                  Supabase Auth + RLS policies ready
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                  Modern dashboard templates included
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-zinc-900 dark:bg-white" />
                  TypeScript-first starter kit
                </li>
              </ul>
            </div>
            <div className="text-xs text-zinc-500">
              Starter kit for SaaS teams.
            </div>
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-black/40 dark:text-zinc-300">
              “We shipped our MVP in 10 days using this starter kit. The
              analytics dashboard and Supabase auth saved weeks of work.”
              <div className="mt-3 text-xs uppercase tracking-widest text-zinc-500">
                Product Lead, Finch Labs
              </div>
            </div>
          </div>

          <Card className="w-full border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-black">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Welcome back.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
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
                    autoComplete="current-password"
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  Sign in with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
