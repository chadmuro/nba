<script>
	import Leaderboard from '$lib/components/tables/Leaderboard.svelte';

	export let data;
</script>

<div>
	<Leaderboard users={data.users} />
</div>
