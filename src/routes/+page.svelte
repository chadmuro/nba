<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import supabase from '$lib/supabaseClient';

	// export async function load({ session }) {
	// 	const { data: upcomingGame, error: upcomingGamesError } = await supabase
	// 		.from('games')
	// 		.select(
	// 			`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year)`
	// 		)
	// 		.is('game_result', null)
	// 		.order('date', { ascending: true })
	// 		.limit(1);

	// 	let selectedTeam;

	// 	if (!session) {
	// 		selectedTeam = undefined;
	// 	}

	// 	if (session) {
	// 		const { data, error: selectedTeamError } = await supabase
	// 			.from('game_select')
	// 			.select('selected_team_id')
	// 			.eq('game_id', upcomingGame[0].id)
	// 			.eq('user_id', session)
	// 			.limit(1);

	// 		selectedTeam = data;
	// 	}

	// 	return {
	// 		props: {
	// 			upcomingGame: upcomingGame[0],
	// 			selectedTeam: selectedTeam ? selectedTeam[0] : undefined
	// 		}
	// 	};
	// }
</script>

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import Hero from '$lib/components/Hero.svelte';
	import Pickem from '$lib/components/ui/pickem/Pickem.svelte';

	export let upcomingGame;
	export let selectedTeam;
</script>

<div class="w-full">
	<Hero />
	<Pickem {upcomingGame} selectedTeam={selectedTeam?.selected_team_id} />
</div>
