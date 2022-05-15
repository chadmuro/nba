<script>
	import EditGame from '$lib/components/modals/EditGame.svelte';

	export let games;
</script>

<h2>Completed Games</h2>
<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Date</th>
				<th>Time</th>
				<th>Home team</th>
				<th>Home team score</th>
				<th>Away team</th>
				<th>Away team score</th>
			</tr>
		</thead>
		<tbody>
			{#each games as game}
				<tr>
					<th>{game.date}</th>
					<td>{game.time}</td>
					<td>{game.home_team.full_name}</td>
					<td />
					<td>{game.away_team.full_name}</td>
					<td />
				</tr>
			{/each}
		</tbody>
	</table>
</div>
