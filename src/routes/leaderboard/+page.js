import supabase from '$lib/supabaseClient';

export async function load() {
	const { data: users, error } = await supabase
		.from('profile_points')
		.select(`id, points, user_id (username, country, favorite_team (full_name, logo))`)
		.order('points', { ascending: false })
		.limit(20);

	const usersWithRank = users?.map((user, index) => ({
		...user,
		rank: index + 1
	}));

	return {
		users: usersWithRank || []
	};
}
