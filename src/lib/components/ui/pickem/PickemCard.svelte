<script>
	export let team;
	export let handleTeamClick;
</script>

<div class="flex flex-col items-center justify-between w-64 p-2">
	<h3 class="text-xl">{team.full_name}</h3>
	<img class="h-36 w-36" src={team.logo} alt={team.full_name} />
	<button class="btn btn-small mt-2" on:click={() => handleTeamClick(team.id)}> Select</button>
</div>
