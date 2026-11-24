create table if not exists public.site_settings (
  id smallint primary key check (id = 1),
  contact_phone text not null default '' check (char_length(contact_phone) <= 30),
  public_email text not null default '' check (char_length(public_email) <= 254),
  notification_email text not null default '' check (char_length(notification_email) <= 254),
  business_hours text not null default '' check (char_length(business_hours) <= 160),
  office_address text not null default '' check (char_length(office_address) <= 500),
  test_ride_locations text[] not null default '{}',
  instagram_url text not null default '' check (char_length(instagram_url) <= 500),
  linkedin_url text not null default '' check (char_length(linkedin_url) <= 500),
  youtube_url text not null default '' check (char_length(youtube_url) <= 500),
  notify_enquiries boolean not null default true,
  notify_test_rides boolean not null default true,
  notify_contact boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;
alter table public.site_settings enable row level security;
drop policy if exists "BAR admin can manage site settings" on public.site_settings;
create policy "BAR admin can manage site settings" on public.site_settings
for all to authenticated
using (lower((select auth.jwt() ->> 'email')) = 'bar.greenenergy@gmail.com')
with check (lower((select auth.jwt() ->> 'email')) = 'bar.greenenergy@gmail.com');
grant select, update on public.site_settings to authenticated;
