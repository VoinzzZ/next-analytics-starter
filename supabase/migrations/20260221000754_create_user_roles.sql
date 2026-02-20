do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'user', 'moderator');
  end if;
end$$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

create policy "user_roles_admin_select"
  on public.user_roles
  for select
  using (public.is_admin());

create policy "user_roles_admin_insert"
  on public.user_roles
  for insert
  with check (public.is_admin());

create policy "user_roles_admin_update"
  on public.user_roles
  for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "user_roles_admin_delete"
  on public.user_roles
  for delete
  using (public.is_admin());

create policy "user_roles_read_own"
  on public.user_roles
  for select
  using (auth.uid() = user_id);
