<script>
	export let games;
	export let showResult = false;
</script>

<h2 class="text-2xl">Completed Games</h2>
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
				<th>Away team</th>
			</tr>
		</thead>
		<tbody>
			{#each games as game}
				<tr>
					{#if showResult && game.win}
						<th>
							<div class="badge badge-success">W</div>
						</th>
					{:else if showResult && !game.win}
						<th>
							<div class="badge badge-error">L</div>
						</th>
					{/if}
					<th>{game.date}</th>
					<td>{game.time}</td>
					<td>
						<div class="flex">
							<img src={game.home_team.logo} alt={game.home_team.full_name} class="w-6 h-6 mr-2" />
							<p>
								{game.home_team.full_name}
								<span class="font-bold">{game.game_result.home_team_score}</span>
							</p>
						</div>
					</td>
					<td>
						<div class="flex">
							<img src={game.away_team.logo} alt={game.away_team.full_name} class="w-6 h-6 mr-2" />
							<p>
								{game.away_team.full_name}
								<span class="font-bold">{game.game_result.away_team_score}</span>
							</p>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
