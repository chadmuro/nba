<script context="module">
	import supabase from '$lib/supabaseClient';

	export async function load({ session }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const { data: completedGames, error: completedGamesError } = await supabase
			.from('game_select')
			.select(
				`*, game_id (date, time, home_team (id, full_name, logo), away_team (id, full_name, logo), game_result (home_team_score, away_team_score, winning_team, losing_team))`
			)
			.match({ user_id: session })
			.not('game_result', 'is', null)
			.order('created_at', { ascending: true })
			.limit(10);

		return {
			props: {
				completedGames: completedGames || []
			}
		};
	}
</script>

<script>
	import CompletedGames from '$lib/components/tables/CompletedGames.svelte';

	export let completedGames;
	const completedGameResults = completedGames.map((game) => ({
		...game.game_id,
		win: game.win
	}));
</script>

<div>
	<CompletedGames games={completedGameResults} showResult />
</div>
