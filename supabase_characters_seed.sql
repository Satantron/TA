-- Characters table and seed
BEGIN;

CREATE TABLE IF NOT EXISTS public.characters (
  id bigint generated always as identity primary key,
  name text not null,
  mythology text not null,
  short_description text,
  image_url text,
  sources jsonb default '[]'::jsonb
);

TRUNCATE TABLE public.characters RESTART IDENTITY;

INSERT INTO public.characters (name, mythology, short_description, image_url, sources) VALUES
  ('Zeus', 'Greek', 'King of the gods, ruler of Mount Olympus.', 'https://picsum.photos/seed/zeus-portrait/300/430', '["Hesiod - Theogony", "Homer - Iliad"]'),
  ('Athena', 'Greek', 'Goddess of wisdom, war strategy, and crafts.', 'https://picsum.photos/seed/athena-portrait/300/430', '["Homeric Hymns", "Herodotus - Histories"]'),
  ('Odin', 'Norse', 'Allfather, god of wisdom, poetry, death, and magic.', 'https://picsum.photos/seed/odin-portrait/300/430', '["Poetic Edda", "Prose Edda"]'),
  ('Thor', 'Norse', 'God of thunder, strength, and protection.', 'https://picsum.photos/seed/thor-portrait/300/430', '["Poetic Edda", "Prose Edda"]'),
  ('Ra', 'Egyptian', 'Sun god, creator and ruler traveling the sky.', 'https://picsum.photos/seed/ra-portrait/300/430', '["Pyramid Texts", "Book of the Dead"]');

COMMIT;
