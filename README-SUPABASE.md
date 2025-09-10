# Supabase server configuration

Set the following environment variables before running `node server.js`:

Required (server-side):
- SUPABASE_URL=your-supabase-project-url
- SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

Optional fallbacks (development only):
- EXPO_PUBLIC_SUPABASE_URL
- EXPO_PUBLIC_SUPABASE_ANON_KEY

Windows PowerShell example:
```
$env:SUPABASE_URL="https://your-project.supabase.co"; `
$env:SUPABASE_SERVICE_ROLE_KEY="eyJhbGci..."; `
npm run server
```

Or create a `.env` file with the keys above and ensure `dotenv` is loaded.



