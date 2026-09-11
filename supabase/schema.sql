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
