<script>
	import { createForm } from 'svelte-forms-lib';
	import { toast } from '@zerodevx/svelte-toast';
	import * as yup from 'yup';
	import supabase from '$lib/supabaseClient';
	import ErrorAlert from '$lib/components/ui/ErrorAlert.svelte';

	export let game;
	let loading = false;
	let errorMessage = null;
	let isModalOpen = false;

	const { form, errors, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			home_team_score: 0,
			away_team_score: 0
		},
		validationSchema: yup.object().shape({
			home_team_score: yup
				.number()
				.min(1, 'Home team score is required')
				.required('Home team score is required'),
			away_team_score: yup
				.number()
				.min(1, 'Away team score is required')
				.required('Away team score is required')
		}),
		onSubmit: async (values) => {
			const winningTeam =
				Number(values.home_team_score) > Number(values.away_team_score)
					? game.home_team.id
					: game.away_team.id;
			const losingTeam =
				Number(values.home_team_score) > Number(values.away_team_score)
					? game.away_team.id
					: game.home_team.id;

			try {
				loading = true;
				let { data: gameResult, error } = await supabase.from('game_results').upsert({
					completed: true,
					winning_team: winningTeam,
					losing_team: losingTeam,
					game: game.id,
					home_team_score: values.home_team_score,
					away_team_score: values.away_team_score
				});
				if (error) throw error;

				let { error: updateError } = await supabase
					.from('games')
					.update({
						game_result: gameResult[0].id
					})
					.match({ id: game.id });
				if (updateError) throw updateError;

				toast.push('Game result saved', { classes: ['info'] });
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
<label for={`add-score-modal-button-${game.id}`} class="btn btn-ghost btn-xs">Add Score</label>

<!-- The modal contents -->
<input
	type="checkbox"
	id={`add-score-modal-button-${game.id}`}
	class="modal-toggle"
	bind:checked={isModalOpen}
/>
<div class="modal" on:click|self={() => (isModalOpen = false)}>
	<div class="modal-box">
		<label
			for={`add-score-modal-${game.id}`}
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={handleCloseModal}>✕</label
		>
		<h3 class="text-lg font-bold">Add game result</h3>
		<form class="py-4 form-control w-full max-w-xs" on:submit={handleSubmit} novalidate>
			<label class="label" for="home_team_score">
				<span class="label-text">{game.home_team.full_name} score</span>
			</label>
			<input
				bind:value={$form.home_team_score}
				on:change={handleChange}
				id="home_team_score"
				type="number"
				name="home_team_score"
				placeholder=""
				class={`input input-bordered w-full max-w-xs ${
					$errors.home_team_score ? 'input-error' : 'input-primary'
				}`}
			/>
			<span class="text-error label-text-alt pt-2">{$errors.home_team_score}</span>
			<label class="label" for="away_team_score">
				<span class="label-text">{game.away_team.full_name} score</span>
			</label>
			<input
				bind:value={$form.away_team_score}
				on:change={handleChange}
				id="away_team_score"
				type="number"
				name="away_team_score"
				placeholder=""
				class={`input input-bordered w-full max-w-xs ${
					$errors.away_team_score ? 'input-error' : 'input-primary'
				}`}
			/>
			<span class="text-error label-text-alt pt-2">{$errors.away_team_score}</span>
			{#if errorMessage}
				<ErrorAlert {errorMessage} />
			{/if}
			<button class={`btn btn-primary my-4 ${loading && 'loading'}`}>Submit</button>
		</form>
	</div>
</div>
