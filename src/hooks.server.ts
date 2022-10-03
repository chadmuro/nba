import '$lib/supabaseClient';
import { auth } from '@supabase/auth-helpers-sveltekit/server';

export const handle = auth();
