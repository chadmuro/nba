<script context="module">
	import supabase from '$lib/supabaseClient';
	import NewGame from '$lib/components/modals/NewGame.svelte';

	const adminId = import.meta.env.VITE_ADMIN_ID;

	export async function load({ session }) {
		if (session !== adminId) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		let { data: games, error } = await supabase
			.from('games')
			.select(
				`*, home_team (full_name, logo),
    away_team (full_name, logo), season (year)`
			)
			.order('date', { ascending: true })
			.limit(10);

		return {
			props: {
				games
			}
		};
	}
</script>

<script>
	export let games;
	console.log(games);
</script>

<NewGame />
<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Date</th>
				<th>Time</th>
				<th>Home team</th>
				<th>Away team</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each games as game}
				<tr>
					<th>{game.date}</th>
					<td>{game.time}</td>
					<td>{game.home_team.full_name}</td>
					<td>{game.away_team.full_name}</td>
					<th>
						<button class="btn btn-ghost btn-xs">Edit</button>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
