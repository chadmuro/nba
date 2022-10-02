import { redirect } from '@sveltejs/kit';
import { withAuth } from '@supabase/auth-helpers-sveltekit';

export const load = withAuth(async({ session }) => {
	if (session.user) {
		throw redirect(302, '/profile');
	}

	return {};
})
