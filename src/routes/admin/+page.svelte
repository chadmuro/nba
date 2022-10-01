<script>
	import NewGame from '$lib/components/modals/NewGame.svelte';
	import UpcomingGames from '$lib/components/tables/UpcomingGames.svelte';
	import CompletedGames from '$lib/components/tables/CompletedGames.svelte';

	export let data;
</script>

<div>
	<NewGame />
	<UpcomingGames games={data.upcomingGames} />
	<div class="py-8" />
	<CompletedGames games={data.completedGames} />
</div>
