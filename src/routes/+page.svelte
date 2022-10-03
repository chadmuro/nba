<script>
	import Hero from '$lib/components/Hero.svelte';
	import Pickem from '$lib/components/ui/pickem/Pickem.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<div class="w-full">
	<Hero />
	{#if data.upcomingGame}
		<Pickem upcomingGame={data.upcomingGame} selectedTeam={data.selectedTeam?.selected_team_id} />
	{:else}
		<div class="mt-20 text-center">
			<p>No upcoming games</p>
		</div>
	{/if}
</div>
