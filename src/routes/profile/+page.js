import { redirect } from '@sveltejs/kit';

export async function load({ session }) {
	if (!session) {
		throw redirect(302, '/login');
	}
	let {
		data: profile,
		error,
		status
	} = await supabase
		.from('profiles')
		.select(`username, country, favorite_team, avatar_url`)
		.eq('id', session)
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
}
