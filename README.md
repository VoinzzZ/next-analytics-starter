# next-analytics-starter

Production-ready analytics dashboard starter built with Next.js, Supabase, shadcn/ui, and Tailwind CSS.

## Features
- Authentication (email + Google OAuth)
- Role-based access control (admin/moderator/user)
- Analytics dashboard with charts
- Dark mode
- TypeScript ready
- Supabase integrated (auth + RLS + migrations)

## Tech Stack

| Technology | Version |
| --- | --- |
| Next.js | 16 |
| Supabase | Latest |
| TypeScript | Latest |
| Tailwind CSS | v4 |
| shadcn/ui | Latest |
| Recharts | Latest |

## Getting Started
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
4. Run Supabase migrations:
   ```bash
   supabase db push
   ```
   Or paste the SQL files from `supabase/migrations` into the Supabase SQL editor.
5. Start the dev server:
   ```bash
   npm run dev
   ```

## Project Structure
```
src/app
src/components
src/lib
supabase/migrations
```

## Database Schema
- `profiles`: user profile data (`id`, `full_name`, `avatar_url`, `created_at`, `updated_at`)
- `user_roles`: role assignments (`id`, `user_id`, `role`, `created_at`)
- `subscriptions`: billing status (`id`, `user_id`, `plan`, `status`, `created_at`, `updated_at`)

## Deploy
Deploy to Vercel and set the following environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

