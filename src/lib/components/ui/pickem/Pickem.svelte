<script>
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import supabase from '$lib/supabaseClient';
	import PickemCard from './PickemCard.svelte';

	export let upcomingGame;
	export let selectedTeam;

	const handleHomeTeamClick = async (id) => {
		if (!$session) {
			return goto('/login');
		}
		console.log('home team');
		const { data, error } = await supabase.from('game_select').insert({
			game_id: upcomingGame.id,
			user_id: $session,
			selected_team_id: id
		});
		console.log(data, error);
	};

	const handleAwayTeamClick = async (id) => {
		if (!$session) {
			return goto('/login');
		}
		console.log('away team');
		const { data, error } = await supabase.from('game_select').insert({
			game_id: upcomingGame.id,
			user_id: $session,
			selected_team_id: id
		});
		console.log(data, error);
	};
</script>

<div class="mt-20 text-center">
	<h2 class="text-3xl font-bold">Today's Pick'em Game</h2>
	<p class="py-2">Who you got?</p>
	<div class="flex justify-center">
		<PickemCard
			team={upcomingGame.away_team}
			{selectedTeam}
			handleTeamClick={handleAwayTeamClick}
		/>
		<PickemCard
			team={upcomingGame.home_team}
			{selectedTeam}
			handleTeamClick={handleHomeTeamClick}
		/>
	</div>
</div>
