<script>
	import TeamsList from '$lib/components/TeamsList.svelte';

	export let data;
</script>

<TeamsList teams={data.teams} />
