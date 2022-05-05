<script>
	import { teams } from '$lib/stores/teamsStore';

	let loading = false;
	let date = null;
	let time = null;
	let home_team = null;
	let away_team = null;
</script>

<div class="flex justify-end py-4">
	<label for="new-game-modal" class="btn btn-primary modal-button">Add game</label>
</div>
<input type="checkbox" id="new-game-modal" class="modal-toggle" />
<label for="new-game-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="new-game-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Add a new game</h3>
		<form class="py-4 form-control w-full max-w-xs">
			<label class="label" for="date">
				<span class="label-text">Date</span>
			</label>
			<input
				bind:value={date}
				id="date"
				type="date"
				placeholder="Date"
				class="input input-primary input-bordered w-full max-w-xs"
			/>
			<label class="label" for="time">
				<span class="label-text">Time</span>
			</label>
			<input
				bind:value={time}
				id="time"
				type="time"
				placeholder="Time"
				class="input input-primary input-bordered w-full max-w-xs"
			/>
			<label class="label" for="favorite_team">
				<span class="label-text">Home Team</span>
			</label>
			<select bind:value={home_team} class="select select-primary w-full max-w-xs" id="country">
				<option disabled value={null} selected>Home Team</option>
				{#each $teams as team}
					<option value={team.id}>
						{team.full_name}
					</option>
				{/each}
			</select>
			<label class="label" for="favorite_team">
				<span class="label-text">Away Team</span>
			</label>
			<select bind:value={away_team} class="select select-primary w-full max-w-xs" id="country">
				<option disabled value={null} selected>Away Team</option>
				{#each $teams as team}
					<option value={team.id}>
						{team.full_name}
					</option>
				{/each}
			</select>
			<button class={`btn btn-primary my-4 ${loading && 'loading'}`}>Submit</button>
		</form>
	</label>
</label>
