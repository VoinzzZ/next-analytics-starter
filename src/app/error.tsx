"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-none dark:border-zinc-800 dark:bg-black">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Something went wrong
        </p>
        <h1 className="mt-3 text-2xl font-semibold">We hit an error</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Please try again. If the problem persists, contact support.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
