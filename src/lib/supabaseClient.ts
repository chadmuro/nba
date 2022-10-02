import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';
import { setupSupabaseHelpers } from '@supabase/auth-helpers-sveltekit';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseKey, {
	persistSession: false,
	autoRefreshToken: false
});

setupSupabaseHelpers({
	supabaseClient,
	cookieOptions: {
		secure: !dev
	}
});

export default supabaseClient;
