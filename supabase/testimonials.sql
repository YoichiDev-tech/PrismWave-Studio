-- Feedback / testimonials — private until you approve
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text not null default '',
  rating integer not null check (rating between 1 and 5),
  message text not null,
  public_text text,
  source text not null default 'general'
    check (source in ('audit', 'general', 'client')),
  audit_score integer check (audit_score is null or (audit_score between 0 and 100)),
  site_url text,
  session_id text,
  publish_consent boolean not null default false,
  show_name boolean not null default true,
  show_business boolean not null default true,
  featured boolean not null default false,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists testimonials_status_idx
  on public.testimonials (status, created_at desc);

create index if not exists testimonials_approved_idx
  on public.testimonials (status, featured desc, approved_at desc);

alter table public.testimonials enable row level security;

-- No anon policies. Browser talks only to /api/testimonials (service role).