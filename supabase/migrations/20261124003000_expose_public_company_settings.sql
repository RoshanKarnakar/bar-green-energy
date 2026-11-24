-- Expose only visitor-safe settings. Do not grant public SELECT on site_settings,
-- because it also stores the private notification recipient and admin controls.
create or replace function public.get_public_site_settings()
returns table (
  contact_phone text,
  public_email text,
  business_hours text,
  office_address text,
  test_ride_locations text[],
  instagram_url text,
  linkedin_url text,
  youtube_url text
)
language sql
stable
security definer
set search_path = ''
as $$
  select s.contact_phone, s.public_email, s.business_hours, s.office_address,
         s.test_ride_locations, s.instagram_url, s.linkedin_url, s.youtube_url
  from public.site_settings as s
  where s.id = 1
$$;

revoke all on function public.get_public_site_settings() from public;
grant execute on function public.get_public_site_settings() to anon, authenticated;
