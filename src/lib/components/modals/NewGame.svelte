<script>
	import { createForm } from 'svelte-forms-lib';
	import { toast } from '@zerodevx/svelte-toast';
	import * as yup from 'yup';
	import { teams } from '$lib/stores/teamsStore';
	import supabase from '$lib/supabaseClient';
	import ErrorAlert from '$lib/components/ui/ErrorAlert.svelte';

	let loading = false;
	let errorMessage = null;
	let isModalOpen = false;

	const { form, errors, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			date: '',
			time: '',
			home_team: '',
			away_team: ''
		},
		validationSchema: yup.object().shape({
			date: yup.string().required('Date is required'),
			time: yup.string().required('Time is required'),
			home_team: yup.string().required('Home team is required'),
			away_team: yup.string().required('Away team is required')
		}),
		onSubmit: async (values) => {
			try {
				loading = true;
				let { error } = await supabase.from('games').upsert({
					date: values.date,
					time: values.time,
					home_team: values.home_team,
					away_team: values.away_team
				});
				if (error) throw error;
				toast.push('Game information saved', { classes: ['info'] });
				handleCloseModal();
				// TODO - refresh data (save in writable store?)
			} catch (error) {
				errorMessage = error.error_description || error.message;
				console.error(error.error_description || error.message);
			} finally {
				loading = false;
			}
		}
	});

	const handleCloseModal = () => {
		isModalOpen = false;
		handleReset();
	};
</script>

<!-- The button to open modal -->
<div class="flex justify-end py-4">
	<label for="new-game-modal-button" class="btn btn-primary modal-button">New Game</label>
</div>

<!-- The modal contents -->
<input type="checkbox" id="new-game-modal-button" class="modal-toggle" bind:checked={isModalOpen} />
<div class="modal" on:click|self={() => (isModalOpen = false)}>
	<div class="modal-box">
		<label
			for="new-game-modal"
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={handleCloseModal}>✕</label
		>
		<h3 class="text-lg font-bold">Add a new game</h3>
		<form class="py-4 form-control w-full max-w-xs" on:submit={handleSubmit} novalidate>
			<label class="label" for="date">
				<span class="label-text">Date</span>
			</label>
			<input
				bind:value={$form.date}
				on:change={handleChange}
				id="date"
				type="date"
				name="date"
				placeholder="Date"
				class={`input input-bordered w-full max-w-xs ${
					$errors.date ? 'input-error' : 'input-primary'
				}`}
			/>
			<span class="text-error label-text-alt pt-2">{$errors.date}</span>
			<label class="label" for="time">
				<span class="label-text">Time</span>
			</label>
			<input
				bind:value={$form.time}
				on:change={handleChange}
				id="time"
				type="time"
				name="time"
				placeholder="Time"
				class={`input input-bordered w-full max-w-xs ${
					$errors.time ? 'input-error' : 'input-primary'
				}`}
			/>
			<span class="text-error label-text-alt pt-2">{$errors.time}</span>
			<label class="label" for="favorite_team">
				<span class="label-text">Home Team</span>
			</label>
			<select
				bind:value={$form.home_team}
				on:change={handleChange}
				name="home_team"
				class={`select w-full max-w-xs ${$errors.home_team ? 'select-error' : 'select-primary'}`}
				id="home_team"
			>
				<option disabled value="" selected>Home Team</option>
				{#each $teams as team}
					<option value={String(team.id)}>
						{team.full_name}
					</option>
				{/each}
			</select>
			<span class="text-error label-text-alt pt-2">{$errors.home_team}</span>
			<label class="label" for="favorite_team">
				<span class="label-text">Away Team</span>
			</label>
			<select
				bind:value={$form.away_team}
				on:change={handleChange}
				name="away_team"
				class={`select w-full max-w-xs ${$errors.away_team ? 'select-error' : 'select-primary'}`}
				id="away_team"
			>
				<option disabled value="" selected>Away Team</option>
				{#each $teams as team}
					<option value={String(team.id)}>
						{team.full_name}
					</option>
				{/each}
			</select>
			<span class="text-error label-text-alt pt-2">{$errors.away_team}</span>
			{#if errorMessage}
				<ErrorAlert {errorMessage} />
			{/if}
			<button class={`btn btn-primary my-4 ${loading && 'loading'}`}>Submit</button>
		</form>
	</div>
</div>
