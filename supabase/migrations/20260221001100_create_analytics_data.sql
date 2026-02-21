do $$
begin
  if not exists (select 1 from pg_type where typname = 'month_abbr') then
    create type public.month_abbr as enum ('Aug','Sep','Oct','Nov','Dec','Jan');
  end if;
end$$;

create table if not exists public.traffic_stats (
  month public.month_abbr primary key,
  visits integer not null,
  uniques integer not null,
  avg_session_seconds integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.conversion_stats (
  month public.month_abbr primary key,
  rate numeric(5,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.source_stats (
  name text primary key,
  value integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.page_stats (
  page text primary key,
  views integer not null,
  uniques integer not null,
  bounce numeric(5,2) not null,
  created_at timestamptz not null default now()
);

insert into public.traffic_stats (month, visits, uniques, avg_session_seconds) values
  ('Aug', 48000, 24000, 300),
  ('Sep', 52000, 26000, 305),
  ('Oct', 61000, 30500, 310),
  ('Nov', 68000, 34000, 312),
  ('Dec', 75000, 37500, 314),
  ('Jan', 82000, 41100, 312)
on conflict (month) do update set
  visits = excluded.visits,
  uniques = excluded.uniques,
  avg_session_seconds = excluded.avg_session_seconds;

insert into public.conversion_stats (month, rate) values
  ('Aug', 2.40),
  ('Sep', 2.70),
  ('Oct', 2.60),
  ('Nov', 3.10),
  ('Dec', 3.40),
  ('Jan', 3.60)
on conflict (month) do update set rate = excluded.rate;

insert into public.source_stats (name, value) values
  ('Organic', 46),
  ('Direct', 28),
  ('Social', 16),
  ('Referral', 10)
on conflict (name) do update set value = excluded.value;

insert into public.page_stats (page, views, uniques, bounce) values
  ('/dashboard', 28430, 18220, 32.00),
  ('/pricing', 21840, 14100, 28.00),
  ('/features', 19210, 12430, 35.00),
  ('/blog/launch', 15980, 11300, 41.00),
  ('/integrations', 12540, 8920, 29.00),
  ('/case-studies', 10220, 7840, 33.00),
  ('/contact', 9760, 6440, 38.00),
  ('/docs/getting-started', 8930, 6210, 27.00),
  ('/security', 7610, 5180, 30.00),
  ('/careers', 6840, 4990, 36.00)
on conflict (page) do update set
  views = excluded.views,
  uniques = excluded.uniques,
  bounce = excluded.bounce;
