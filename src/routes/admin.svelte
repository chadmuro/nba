<script context="module">
	import supabase from '$lib/supabaseClient';
	import NewGame from '$lib/components/modals/NewGame.svelte';
	import UpcomingGames from '$lib/components/tables/UpcomingGames.svelte';
	import CompletedGames from '$lib/components/tables/CompletedGames.svelte';

	const adminId = import.meta.env.VITE_ADMIN_ID;

	export async function load({ session }) {
		if (session !== adminId) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		let { data: games, error } = await supabase
			.from('games')
			.select(
				`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year)`
			)
			.order('date', { ascending: true })
			.limit(10);

		return {
			props: {
				games
			}
		};
	}
</script>

<script>
	export let games;
</script>

<div>
	<NewGame />
	<UpcomingGames {games} />
	<div class="py-8" />
	<CompletedGames {games} />
</div>
