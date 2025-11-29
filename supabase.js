import { createClient } from '@supabase/supabase-js';

// Determine Supabase credentials from multiple sources so the project works
// both in a plain Node environment and in Expo (via app.json `expo.extra`).
let SUPABASE_URL = process.env.SUPABASE_URL;
let SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// If running inside Expo, read values from Constants.manifest.extra when available.
try {
  // require here so file can still run in non-Expo environments
  // (Metro will provide expo-constants in Expo projects).
  // eslint-disable-next-line global-require
  const Constants = require('expo-constants').default;
  const extra = (Constants.manifest && Constants.manifest.extra) || (Constants.expoConfig && Constants.expoConfig.extra);
  if (extra) {
    SUPABASE_URL = SUPABASE_URL || extra.SUPABASE_URL;
    SUPABASE_ANON_KEY = SUPABASE_ANON_KEY || extra.SUPABASE_ANON_KEY;
  }
} catch (e) {
  // Not running under Expo or expo-constants not installed — ignore.
}

// Fallback placeholders (do NOT commit real keys to the repo)
SUPABASE_URL = SUPABASE_URL || 'https://your-project.supabase.co';
SUPABASE_ANON_KEY = SUPABASE_ANON_KEY || 'PUBLIC_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchMyths() {
  try {
    const { data, error } = await supabase.from('myths').select('*').order('id', { ascending: true });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local seed', err?.message || err);
    return null;
  }
}

// Optional helper to test the Supabase connection; returns true when successful.
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('myths').select('id').limit(1);
    if (error) {
      console.warn('Supabase test query error:', error.message || error);
      return false;
    }
    return Array.isArray(data);
  } catch (err) {
    console.warn('Supabase test failed:', err?.message || err);
    return false;
  }
}
