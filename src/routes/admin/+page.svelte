<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import supabase from '$lib/supabaseClient';

	// const adminId = import.meta.env.VITE_ADMIN_ID;

	// export async function load({ session }) {
	// 	if (session !== adminId) {
	// 		return {
	// 			status: 302,
	// 			redirect: '/login'
	// 		};
	// 	}

	// 	const { data: upcomingGames, error: upcomingGamesError } = await supabase
	// 		.from('games')
	// 		.select(
	// 			`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year)`
	// 		)
	// 		.is('game_result', null)
	// 		.order('date', { ascending: true })
	// 		.limit(10);

	// 	const { data: completedGames, error: completedGamesError } = await supabase
	// 		.from('games')
	// 		.select(
	// 			`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year), game_result (home_team_score, away_team_score, winning_team, losing_team)`
	// 		)
	// 		.not('game_result', 'is', null)
	// 		.order('date', { ascending: false })
	// 		.limit(10);

	// 	return {
	// 		props: {
	// 			upcomingGames: upcomingGames || [],
	// 			completedGames: completedGames || []
	// 		}
	// 	};
	// }
</script>

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import NewGame from '$lib/components/modals/NewGame.svelte';
	import UpcomingGames from '$lib/components/tables/UpcomingGames.svelte';
	import CompletedGames from '$lib/components/tables/CompletedGames.svelte';

	export let upcomingGames;
	export let completedGames;
</script>

<div>
	<NewGame />
	<UpcomingGames games={upcomingGames} />
	<div class="py-8" />
	<CompletedGames games={completedGames} />
</div>
