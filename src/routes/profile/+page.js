import { redirect } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient';
import { withAuth } from '@supabase/auth-helpers-sveltekit';

export const load = withAuth(async({ session }) => {
	if (!session.user) {
		throw redirect(302, '/login');
	}
	let {
		data: profile,
		error,
		status
	} = await supabase
		.from('profiles')
		.select(`username, country, favorite_team, avatar_url`)
		.eq('id', session.user.id)
		.single();

	if (profile?.avatar_url) {
		let { data: imageUrl } = supabase.storage
			.from('avatars')
			.getPublicUrl(profile.avatar_url.split('/').slice(1).join('/'));

		return {
			profile: {
				...profile,
				imageUrl: imageUrl.publicURL
			}
		};
	}

	return {
		profile
	};
});