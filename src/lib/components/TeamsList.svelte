<script>
	import TeamCard from '$lib/components/TeamCard.svelte';

	export let teams;

	const eastTeams = teams.filter((team) => team.conference.name === 'East');
	const westTeams = teams.filter((team) => team.conference.name === 'West');
</script>

<div class="flex">
	<div>
		<h2>East</h2>
		<div>
			{#each eastTeams as team}
				<TeamCard {team} />
			{/each}
		</div>
	</div>
	<div>
		<h2>West</h2>
		<div>
			{#each westTeams as team}
				<TeamCard {team} />
			{/each}
		</div>
	</div>
</div>
