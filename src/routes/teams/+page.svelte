<script>
	import TeamsList from '$lib/components/TeamsList.svelte';

	export let data;
</script>

ß<TeamsList teams={data.teams} />
