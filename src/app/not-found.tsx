import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-none dark:border-zinc-800 dark:bg-black">
        <p className="text-xs uppercase tracking-widest text-zinc-500">404</p>
        <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-zinc-500">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
