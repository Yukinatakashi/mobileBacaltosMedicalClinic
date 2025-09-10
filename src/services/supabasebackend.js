const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Missing Supabase env vars!");
  console.error("SUPABASE_URL:", supabaseUrl ? "OK" : "MISSING");
  console.error("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceRoleKey ? "OK" : "MISSING");
  throw new Error("Missing Supabase env vars! Check .env at project root.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = { supabase };
