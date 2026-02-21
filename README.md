<h1 align="center">next-analytics-starter</h1>

<p align="center">
  Production-ready analytics dashboard starter built with Next.js, Supabase, shadcn/ui, Tailwind CSS v4, and Recharts.
</p>

<p align="center">
  <a href="#stack">Stack</a> ·
  <a href="#features">Features</a> ·
  <a href="#project-structure">Structure</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#environment-variables">Env Vars</a> ·
  <a href="#scripts">Scripts</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#deployment">Deployment</a>
</p>

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| Backend & Auth | [Supabase](https://supabase.com/) (Postgres, Auth, RLS) |
| SSR Client | [`@supabase/ssr`](https://supabase.com/docs/guides/auth/server-side/nextjs) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Theme Management | [next-themes](https://github.com/pacocoursey/next-themes) |
| Language | TypeScript 5 |
| Linting | ESLint 9 (Next.js core web vitals) |
| CI Pipeline | GitHub Actions |

---

## Features

- **Authentication:** Email/password and Google OAuth integration via Supabase Auth.
- **Role-Based Access Control:** Distinguishes between `admin`, `moderator`, and `user` roles enforced by database-level Row Level Security (RLS).
- **Dashboard Interfaces:** Pre-built pages for Overview, Analytics, Settings, and Admin.
- **Theme Support:** Dark and light mode toggle persisted locally, optimized to prevent hydration mismatches.
- **Data Visualization:** Real-time analytics charts (traffic, conversion rates, traffic sources, top pages) backed by Supabase datasets.
- **Route Protection:** Middleware implementation that intercepts and redirects unauthenticated users attempting to access protected routes.
- **Type Safety:** Comprehensive TypeScript coverage across React components, API route handlers, and database queries.
- **Continuous Integration:** Automated linting and type checking on push or pull request to the main branch.

---

## Project Structure

```
next-analytics-starter/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages (Login, Register)
│   │   ├── (dashboard)/         # Protected application pages
│   │   │   ├── dashboard/       # Main overview dashboard
│   │   │   ├── analytics/       # Chart and reporting interfaces
│   │   │   ├── settings/        # User configuration
│   │   │   ├── admin/           # Administrative portal
│   │   │   └── profile/         # User profile management
│   │   ├── (marketing)/         # Public-facing landing pages
│   │   ├── api/                 # Next.js Route Handlers
│   │   │   └── analytics/
│   │   │       └── summary/     # Example: GET /api/analytics/summary
│   │   └── auth/callback/       # Supabase OAuth redirect handler
│   ├── components/
│   │   ├── ui/                  # shadcn/ui base primitives
│   │   ├── charts/              # Recharts implementations
│   │   ├── dashboard/           # Dashboard-specific compositions
│   │   ├── analytics/           # Analytics-specific compositions
│   │   ├── auth/                # Authentication forms and layouts
│   │   ├── marketing/           # Landing page compositions
│   │   ├── theme-toggle.tsx     # Theme switcher component
│   │   └── supabase-listener.tsx# Client-side session synchronization
│   ├── hooks/                   # Custom React hooks
│   ├── lib/
│   │   ├── supabase/            # Supabase clients (browser, server, middleware)
│   │   ├── env.ts               # Environment variable validation
│   │   ├── fetcher.ts           # Type-safe data fetcher utility
│   │   └── utils.ts             # Tailwind class merging and helpers
│   └── types/                   # Shared TypeScript definitions
├── supabase/
│   └── migrations/              # SQL schema and seed data definitions
├── middleware.ts                # Edge middleware for route protection
├── .env.example                 # Environment configuration template
└── .github/workflows/ci.yml    # GitHub Actions workflow configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`npm i -g supabase`)
- A [Supabase Project](https://supabase.com/dashboard) (can be created on the free tier)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/next-analytics-starter.git
cd next-analytics-starter
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

> **Note:** These credentials can be found in your Supabase Dashboard under Settings > API.

### 3. Database Initialization

Link your local environment to your Supabase project and apply migrations:

```bash
# Authenticate with Supabase CLI
npx supabase login

# Link repository to your Supabase project
npx supabase link --project-ref <PROJECT_REF> --password <DB_PASSWORD>

# Apply database schema and seed demonstration data
npx supabase db push
```

The migration process provisions the following tables:
- `profiles`: Extends the core Supabase authentication user record.
- `user_roles`: Manages role assignments (`admin`, `moderator`, `user`).
- `subscriptions`: Manages subscription states globally and by user role.
- `analytics_*`: Demo datasets used to populate the dashboard charts.

### 4. Local Development

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | The URL of your Supabase project instance. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | The anonymous public API key for your Supabase instance. |

> **Warning:** Never commit your `.env.local` file to version control.

---

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts the Next.js local development server. |
| `npm run build` | Compiles the application for production deployment. |
| `npm start` | Serves the compiled production build. |
| `npm run lint` | Executes ESLint against the codebase. |
| `npm run lint:fix` | Executes ESLint and automatically resolves fixable issues. |
| `npm run typecheck`| Executes the TypeScript compiler to verify type safety (`tsc --noEmit`). |

---

## Architecture

### Authentication & Session Management

The application uses Edge Middleware to guarantee robust access control.

```
Browser Request
    │
    ├─ middleware.ts ──→ updateSession() ──→ Refreshes Supabase session cookie
    │
    ├─ Public Route? → Proceed to route
    ├─ Authenticated user visiting /login or /register? → Redirect to /dashboard
    └─ Unauthenticated user visiting a protected route? → Redirect to /login
```

Current protected route segments: `/dashboard`, `/analytics`, `/settings`, `/admin`

### Supabase Architecture

Supabase logic is segmented into three specific client implementations to accommodate Next.js rendering contexts:

| File | Context | Purpose |
|---|---|---|
| `src/lib/supabase/client.ts` | Browser (Client Component) | Manages authentication state and realtime subscriptions. |
| `src/lib/supabase/server.ts` | Server Component / API Route | Executes secure database queries respecting RLS. |
| `src/lib/supabase/middleware.ts` | Edge Middleware | Handles session validation and cookie rotation. |

### Data Flow Example

```
/analytics page (Server Component)
    └─ fetcher.ts → Executes HTTP GET to /api/analytics/summary
                        └─ Supabase Server Client queries analytics_* tables
                               └─ Returns typed JSON payload to the UI
```

### Row Level Security (RLS)

Database access control is strictly enforced via PostgreSQL Row Level Security policies:
- `profiles`: Users have read/write access exclusively to their corresponding profile record.
- `user_roles`: Users possess read-only access to their role assignment. Role modification requires administrative privileges.
- `subscriptions`: Users access their associated subscriptions; administrators possess global read access.

---

## Database Migrations

Migration files are located in `supabase/migrations/` and apply sequentially:

| File | Description |
|---|---|
| `20260221000705_create_profiles.sql` | Provisions `profiles` table and automated trigger on user signup. |
| `20260221000754_create_user_roles.sql` | Provisions `user_roles` structure and associated RLS policies. |
| `20260221000820_create_subscriptions.sql` | Provisions `subscriptions` structure and associated RLS policies. |
| `20260221001100_create_analytics_data.sql` | Injects foundational analytics tables and populates seed data. |

Following any modification to these schema definitions, apply the changes via:
```bash
npx supabase db push
```

---

## Deployment

Deploy the application to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/<your-username>/next-analytics-starter)

Ensure the following post-deployment steps are completed:
1. Provide the necessary environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel Project Settings.
2. Register your Vercel deployment URL within the Supabase Dashboard under **Authentication > URL Configuration** (e.g., `https://<your-domain>/auth/callback`).

---

## Troubleshooting

| Issue | Resolution |
|---|---|
| Next.js Hydration Mismatch | Clear browser cookies. Verify that local Supabase credentials match the linked cloud project exactly. |
| Authentication Failures | Verify that email verification is configured correctly in the Supabase Auth settings. Inspect network requests to `supabase.co/auth/v1` for detailed error payloads. |
| Missing Dashboard Data | Rerun `npx supabase db push` to verify the `analytics_*` tables and seed data are correctly provisioned in your database. |
| TypeScript Compiler Errors | If the database schema has changed, regenerate types or manually update `src/types/` definitions to mirror the new PostgreSQL table structures. |
| Supabase CLI Migration Failures | Confirm your local environment is correctly linked using `supabase link` with the accurate `--project-ref` and database password. |

---

## Contributing

1. Fork the repository.
2. Initialize a new feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your modifications utilizing the [Conventional Commits](https://www.conventionalcommits.org/) standard.
4. Push the branch to your fork and open a Pull Request against the `main` branch.
5. Ensure the CI pipeline (linting and type checking) completes successfully prior to requesting a review.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
