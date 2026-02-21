# next-analytics-starter

Production-ready analytics dashboard starter built with Next.js, Supabase, shadcn/ui, Tailwind CSS 4, and Recharts.

## Features
- Supabase auth (email/password + Google OAuth) with RLS and role-based access (admin/moderator/user)
- Ready-made dashboard (overview + analytics + settings + admin)
- Dark/light theme toggle, persisted via `next-themes`
- Real Supabase-backed demo data for charts/tables (see migrations)
- TypeScript, ESLint (Next core web vitals), Typecheck scripts, GitHub Actions CI

## Stack
- Next.js 16 (App Router) + React 19
- Supabase (auth + Postgres + RLS) via `@supabase/ssr`
- Tailwind CSS v4 + shadcn/ui primitives
- Recharts for charts

## Getting Started
1. Install deps
   ```bash
   npm install
   ```
2. Configure environment variables
   ```bash
   cp .env.example .env.local
   # fill these from Supabase project
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   ```
3. Supabase CLI login & link (one-time)
   ```bash
   npx supabase login
   npx supabase link --project-ref <PROJECT_REF> --password <DB_PASSWORD>
   ```
4. Push migrations + seed demo analytics data
   ```bash
   npx supabase db push
   ```
5. Run dev server
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` – start Next dev server
- `npm run lint` – ESLint (Next core web vitals)
- `npm run lint:fix` – ESLint with autofix
- `npm run typecheck` – `tsc --noEmit`
- `npm run build` / `npm start` – production build & serve

## CI
GitHub Actions workflow `.github/workflows/ci.yml` runs lint + typecheck on push/PR to `main`.

## Data & Migrations
- Auth/roles: see `supabase/migrations/20260221000705_create_profiles.sql` and `20260221000754_create_user_roles.sql`.
- Subscriptions + RLS policies (owner + admin): `20260221000820_create_subscriptions.sql`.
- Demo analytics datasets (traffic, conversion, sources, pages): `20260221001100_create_analytics_data.sql`.

## Architecture Notes
- Supabase clients centralised in `src/lib/supabase/*` with env validation in `src/lib/env.ts`.
- Auth session is synced on the client via `src/components/supabase-listener.tsx` (refreshes when signed in/out).
- Analytics page fetches live data from `/api/analytics/summary` with typed fetcher `src/lib/fetcher.ts` and shows graceful error state via `Alert`.
- Theme toggles avoid hydration mismatch by rendering both icons/text with CSS-driven visibility.

## Troubleshooting
- Hydration mismatch: clear cookies and ensure `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY` match the linked project.
- Signup/login issues: confirm email verification setting in Supabase Auth; check network response from `supabase.co/auth/v1`.
- Migrations: rerun `npx supabase db push` after schema changes.

## Deploy
Deploy to Vercel. Set env vars:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

For production Supabase auth, also configure OAuth redirect: `<your-domain>/auth/callback`.
