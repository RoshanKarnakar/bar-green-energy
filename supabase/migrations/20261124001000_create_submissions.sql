create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('enquiry', 'test_ride', 'contact')),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 5 and 30),
  model text not null default '' check (char_length(model) <= 100),
  city text not null default '' check (char_length(city) <= 120),
  preferred_at timestamptz,
  topic text not null default '' check (char_length(topic) <= 120),
  message text not null default '' check (char_length(message) <= 5000),
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'completed', 'closed')),
  internal_notes text,
  email_status text not null default 'not_configured' check (email_status in ('pending', 'sent', 'failed', 'not_configured')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists submissions_kind_created_at_idx on public.submissions (kind, created_at desc);
create index if not exists submissions_status_idx on public.submissions (status, created_at desc);

create or replace function public.set_submissions_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists submissions_set_updated_at on public.submissions;
create trigger submissions_set_updated_at before update on public.submissions for each row execute function public.set_submissions_updated_at();

alter table public.submissions enable row level security;
drop policy if exists "Public can submit customer requests" on public.submissions;
create policy "Public can submit customer requests" on public.submissions for insert to anon, authenticated
with check (status = 'new' and internal_notes is null);
drop policy if exists "BAR admin can manage customer requests" on public.submissions;
create policy "BAR admin can manage customer requests" on public.submissions for all to authenticated
using (lower((select auth.jwt() ->> 'email')) = 'bar.greenenergy@gmail.com')
with check (lower((select auth.jwt() ->> 'email')) = 'bar.greenenergy@gmail.com');

grant insert (kind, name, email, phone, model, city, preferred_at, topic, message, consent) on public.submissions to anon, authenticated;
grant select, update, delete on public.submissions to authenticated;
