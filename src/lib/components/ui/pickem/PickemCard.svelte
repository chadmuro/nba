<script>
	export let team;
	export let selectedTeam;
	export let handleTeamClick;
</script>

{#if selectedTeam && selectedTeam !== team.id}
	<div />
{:else}
	<div class="flex flex-col items-center justify-between w-48 p-2">
		<h3 class="text-xl">{team.full_name}</h3>
		<img class="h-36 w-36" src={team.logo} alt={team.full_name} />
		<button
			class="btn btn-small mt-2"
			disabled={!!selectedTeam}
			on:click={() => handleTeamClick(team.id)}
			>{#if selectedTeam === team.id}
				Selected
			{:else}
				Select
			{/if}</button
		>
	</div>
{/if}
