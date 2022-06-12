<script>
	export let users;
</script>

<h2 class="text-2xl">Leaderboard</h2>
<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>Rank</th>
				<th>Username</th>
				<th>Country</th>
				<th>Favorite Team</th>
				<th>Points</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<th>{user.rank}</th>
					<td>{user.user_id.username}</td>
					<td>{user.user_id.country || ''}</td>
					<td>
						{#if user.user_id.favorite_team}
							<div class="flex">
								<img
									src={user.user_id.favorite_team?.logo}
									alt={user.user_id.favorite_team?.full_name}
									class="w-6 h-6 mr-2"
								/>
								<p>
									{user.user_id.favorite_team?.full_name}
								</p>
							</div>
						{/if}
					</td>
					<th>{user.points}</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
