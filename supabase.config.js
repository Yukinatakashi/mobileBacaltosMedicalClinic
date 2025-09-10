// Supabase Configuration
// Replace these with your actual Supabase project URL and anon key
// You can find these in your Supabase project settings

export const SUPABASE_CONFIG = {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL || 'your_supabase_project_url_here',
  anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here'
};

// Instructions:
// 1. Create a .env file in the root directory
// 2. Add the following variables:
//    EXPO_PUBLIC_SUPABASE_URL=your_actual_supabase_url
//    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
// 3. Get these values from your Supabase project dashboard
