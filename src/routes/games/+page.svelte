<script>
	import CompletedGames from '$lib/components/tables/CompletedGames.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import { page } from '$app/stores';
	import { getPagination } from '$lib/utils/getPagination';

	export let data;
	let session = $page.data.user;

	let currentPage = 1;
	const handlePageClick = async (page) => {
		const { from, to } = getPagination(page - 1, 10);
		const {
			data: completedGamesPagination,
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
			.range(from, to)
			.limit(10);

		currentPage = page;
		completedGameResults = completedGamesPagination.map((game) => ({
			...game.game_id,
			win: game.win
		}));
	};

	let completedGameResults = data.completedGames.map((game) => ({
		...game.game_id,
		win: game.win
	}));
</script>

<div>
	<CompletedGames games={completedGameResults} showResult />
	<div class="flex justify-center pt-4">
		<Pagination {currentPage} totalCount={data.numberOfGames} {handlePageClick} perPage={10} />
	</div>
</div>
