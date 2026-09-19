create extension if not exists pgcrypto;

create table if not exists public.interaction_events (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('pageview', 'action')),
  event_name text not null,
  path text,
  intent text check (intent in ('audit', 'build')),
  session_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists interaction_events_created_at_idx on public.interaction_events (created_at desc);
create index if not exists interaction_events_session_id_idx on public.interaction_events (session_id);
create index if not exists interaction_events_event_name_idx on public.interaction_events (event_name);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  intent text not null check (intent in ('audit', 'build')),
  name text not null,
  email text not null,
  business text,
  site_url text,
  idea text,
  message text not null,
  session_id text,
  audit_score integer check (audit_score between 0 and 100),
  audit_findings jsonb not null default '[]'::jsonb,
  scope_estimate text,
  attribution jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

create or replace function public.touch_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
before update on public.leads
for each row execute function public.touch_leads_updated_at();

alter table public.interaction_events enable row level security;
alter table public.leads enable row level security;

drop policy if exists "operators can read interaction events" on public.interaction_events;
create policy "operators can read interaction events"
on public.interaction_events for select
to authenticated using (true);

drop policy if exists "operators can read leads" on public.leads;
create policy "operators can read leads"
on public.leads for select
to authenticated using (true);

drop policy if exists "operators can update leads" on public.leads;
create policy "operators can update leads"
on public.leads for update
to authenticated using (true) with check (true);

-- Serverless functions use the service role for public inserts.
-- Keep the service role key server-side only.

-- ---------------------------------------------------------------------
-- Rate limiting for the public API routes (api/audit.ts, api/send.ts,
-- api/audit-lead.ts, api/track.ts). Only ever touched via the service
-- role from those routes' check_rate_limit() calls, so no public RLS
-- policies are needed beyond RLS being on (default-deny).
-- ---------------------------------------------------------------------

create table if not exists public.rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  count integer not null default 0
);

alter table public.rate_limits enable row level security;

-- Atomic check-and-increment for a fixed-window rate limit. Returns true
-- when the caller is still within the limit (and counts this call), false
-- when the limit for the current window has been hit. `for update` locks
-- the row so concurrent serverless invocations can't both read the same
-- stale count and both get allowed through
create or replace function public.check_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  window_started timestamptz;
begin
  select count, window_start into current_count, window_started
  from public.rate_limits
  where key = p_key
  for update;

  if not found then
    insert into public.rate_limits (key, window_start, count)
    values (p_key, now(), 1);
    return true;
  end if;

  if now() - window_started > make_interval(secs => p_window_seconds) then
    update public.rate_limits
    set window_start = now(), count = 1
    where key = p_key;
    return true;
  end if;

  if current_count >= p_limit then
    return false;
  end if;

  update public.rate_limits
  set count = count + 1
  where key = p_key;
  return true;
end;
$$;

-- Optional housekeeping: rate_limits rows are tiny and self-overwriting,
-- but if you want to prune stale keys periodically, this deletes anything
-- untouched for a day. Run it from the SQL editor or on a cron/pg_cron job
-- — it is NOT called automatically by check_rate_limit()
create or replace function public.prune_rate_limits()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.rate_limits where window_start < now() - interval '1 day';
$$;