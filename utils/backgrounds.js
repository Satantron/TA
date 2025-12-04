import { fetchBackgrounds } from '../supabase';

let cache = null;
let map = {};

export async function ensureBackgrounds() {
  if (cache) return map;
  const rows = await fetchBackgrounds();
  map = {};
  rows.forEach(r => {
    if (r && r.mythology && r.image_url) map[r.mythology] = r.image_url;
  });
  cache = true;
  return map;
}

export async function getBackgroundFor(mythology) {
  const m = await ensureBackgrounds();
  return m[mythology] || null;
}
