<script context="module">
	import supabase from '$lib/supabaseClient';

	export async function load({ session }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const {
			data: completedGames,
			error: completedGamesError,
			count
		} = await supabase
			.from('game_select')
			.select(
				`*, game_id (date, time, home_team (id, full_name, logo), away_team (id, full_name, logo), game_result (home_team_score, away_team_score, winning_team, losing_team))`,
				{ count: 'exact' }
			)
			.match({ user_id: session })
			.not('game_result', 'is', null)
			.order('created_at', { ascending: false })
			.limit(10);

		return {
			props: {
				completedGames: completedGames || [],
				numberOfGames: count
			}
		};
	}
</script>

<script>
	import CompletedGames from '$lib/components/tables/CompletedGames.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';

	export let completedGames;
	export let numberOfGames;

	let currentPage = 1;
	const handlePageClick = (page) => {
		console.log('page click' + page);
	};

	const completedGameResults = completedGames.map((game) => ({
		...game.game_id,
		win: game.win
	}));
</script>

<div>
	<CompletedGames games={completedGameResults} showResult />
	<div class="flex justify-center pt-4">
		<Pagination {currentPage} totalCount={numberOfGames} {handlePageClick} perPage={1} />
	</div>
</div>
