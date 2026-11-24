create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  model_code text not null unique check (char_length(model_code) between 1 and 50),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort_order integer not null default 0 check (sort_order between 0 and 9999),
  short_description text not null default '' check (char_length(short_description) <= 500),
  image_url text not null default '' check (char_length(image_url) <= 2048),
  price_display text not null default 'enquire' check (price_display in ('enquire', 'show', 'hide')),
  price_amount numeric(12, 2) check (price_amount is null or price_amount >= 0),
  status text not null default 'draft' check (status in ('published', 'draft', 'archived')),
  top_speed_kmh integer check (top_speed_kmh is null or top_speed_kmh between 0 and 300),
  range_km integer check (range_km is null or range_km between 0 and 2000),
  battery text not null default '' check (char_length(battery) <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_status_sort_order_idx on public.products (status, sort_order, name);
create or replace function public.set_products_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products for each row execute function public.set_products_updated_at();
alter table public.products enable row level security;
drop policy if exists "Anyone can view published products" on public.products;
create policy "Anyone can view published products" on public.products for select to anon, authenticated using (status = 'published');
drop policy if exists "BAR admin can manage products" on public.products;
create policy "BAR admin can manage products" on public.products for all to authenticated
using (lower((select auth.jwt() ->> 'email')) = 'bar.greenenergy@gmail.com')
with check (lower((select auth.jwt() ->> 'email')) = 'bar.greenenergy@gmail.com');
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
