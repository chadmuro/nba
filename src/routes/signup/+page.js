import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { user: session } = parent();
	if (session) {
		throw redirect(302, '/profile');
	}

	return {};
}
