<script>
	import Hero from '$lib/components/Hero.svelte';
	import Pickem from '$lib/components/ui/pickem/Pickem.svelte';
	export let data;
</script>

<div class="w-full">
	<Hero />
	<Pickem upcomingGame={data.upcomingGame} selectedTeam={data.selectedTeam?.selected_team_id} />
</div>
