<script>
	export let games;
	export let showResult = false;
</script>

<h2>Completed Games</h2>
<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				{#if showResult}
					<th />
				{/if}
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
					{#if showResult && game.win}
						<th>🏆</th>
					{:else if showResult && !game.win}
						<th>😭</th>
					{/if}
					<th>{game.date}</th>
					<td>{game.time}</td>
					<td>
						{game.home_team.full_name}
						{#if game.game_result.winning_team === game.home_team.id}
							<div class="badge badge-accent">W</div>
						{/if}
					</td>
					<td>{game.game_result.home_team_score}</td>
					<td
						>{game.away_team.full_name}
						{#if game.game_result.winning_team === game.away_team.id}
							<div class="badge badge-accent">W</div>
						{/if}</td
					>
					<td>{game.game_result.away_team_score}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
