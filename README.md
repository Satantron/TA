# Lorebrary

Mobile/web app (React Native / Expo) catalog of mythological figures. Uses Supabase as the API backend.

Quick setup

1. Install dependencies:

```powershell
cd "c:\SoftEng\VScode\Javascript\TA"
npm install
```

2. Create a Supabase project and create a table using `supabase_seed.sql`.

3. Create a `.env` at project root (or use environment setup in Expo) with:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=public-anon-key
```

Expo-specific note:

If you're running with Expo, add the keys to `app.json` (or `app.config.js`) so they are available at runtime. Example `app.json` snippet:

```json
{
	"expo": {
		"extra": {
			"SUPABASE_URL": "https://your-project.supabase.co",
			"SUPABASE_ANON_KEY": "public-anon-key"
		}
	}
}
```

Alternatively, copy `.env.example` to `.env` and set the values. For Expo managed projects the recommended approach is `app.json` extras (above) or using a tool like `react-native-dotenv`.

4. Run the app with Expo:

```powershell
npx expo start
```

Notes
- The app fetches myth entries from the `myths` table. If Supabase is not configured, a seeded local dataset is used as fallback.
- Each mythology has its own grouping screen; there are 5+ screens and a bottom navigation bar.

Quick test:

1. Ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set (via `.env` or `app.json` extras).
2. Start the app:

```powershell
npx expo start
```

3. In the app, `fetchMyths()` will attempt to read from Supabase; if it cannot connect it falls back to the local seed in `data/seed.js`.
