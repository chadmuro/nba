<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import supabase from '$lib/supabaseClient';

	// export async function load() {
	// 	const { data: users, error } = await supabase
	// 		.from('profile_points')
	// 		.select(`id, points, user_id (username, country, favorite_team (full_name, logo))`)
	// 		.order('points', { ascending: false })
	// 		.limit(20);

	// 	const usersWithRank = users?.map((user, index) => ({
	// 		...user,
	// 		rank: index + 1
	// 	}));

	// 	return {
	// 		props: {
	// 			users: usersWithRank || []
	// 		}
	// 	};
	// }
</script>

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import Leaderboard from '$lib/components/tables/Leaderboard.svelte';

	export let users = [];
</script>

<div>
	<Leaderboard {users} />
</div>
