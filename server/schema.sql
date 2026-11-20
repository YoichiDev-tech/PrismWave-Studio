create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  business varchar(160) not null,
  email varchar(254) not null,
  phone varchar(40),
  city varchar(120),
  website varchar(500),
  message text not null,
  status varchar(24) not null default 'new'
    check (status in ('new','contacted','discovery','proposal','won','lost')),
  ip_hash char(64) not null,
  user_agent varchar(500),
  privacy_notice_acknowledged boolean not null default false,
  privacy_notice_version varchar(32) not null default '2026-11-20-draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
for each row execute function public.set_updated_at();

create table if not exists public.api_rate_limits (
  ip_hash char(64) primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0
);
create index if not exists api_rate_limits_window_idx on public.api_rate_limits (window_started_at);

-- Connect with a restricted server-side DATABASE_URL role.
-- Do not expose this database or its credentials to the public browser.
