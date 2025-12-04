-- Run this in your Supabase SQL editor to create the `backgrounds` table and seed image URLs per mythology.

-- 1. Create table
create table if not exists backgrounds (
  mythology text primary key,
  image_url text not null,
  updated_at timestamptz default now()
);

-- 2. Clear and reseed
truncate table backgrounds;

-- 3. Insert sample backgrounds (replace these with your own Storage URLs later)
insert into backgrounds (mythology, image_url) values
('Mesir','https://picsum.photos/seed/bg_mesir/1200/800'),
('Mesopotamia','https://picsum.photos/seed/bg_mesopotamia/1200/800'),
('Yunani','https://picsum.photos/seed/bg_yunani/1200/800'),
('Nordik','https://picsum.photos/seed/bg_nordik/1200/800'),
('Celtic','https://picsum.photos/seed/bg_celtic/1200/800'),
('Jepang','https://picsum.photos/seed/bg_jepang/1200/800'),
('China','https://picsum.photos/seed/bg_china/1200/800'),
('Aztec','https://picsum.photos/seed/bg_aztec/1200/800');
