alter table public.products
  add column if not exists gallery_urls text[] not null default '{}',
  add column if not exists available_colors text[] not null default '{}';

alter table public.products
  drop constraint if exists products_gallery_urls_limit,
  add constraint products_gallery_urls_limit check (cardinality(gallery_urls) <= 12),
  drop constraint if exists products_available_colors_limit,
  add constraint products_available_colors_limit check (cardinality(available_colors) <= 12);
