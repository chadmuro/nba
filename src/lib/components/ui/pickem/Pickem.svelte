<script>
	import { DateTime } from 'luxon';
	import { toast } from '@zerodevx/svelte-toast';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import supabase from '$lib/supabaseClient';
	import PickemCard from './PickemCard.svelte';
	import { createDateTime } from '$lib/utils/createDateTime';

	export let upcomingGame;
	export let selectedTeam;

	const handleHomeTeamClick = async (id) => {
		if (!$page.data.session.user) {
			return goto('/login');
		}
		const { data, error } = await supabase.from('game_select').insert({
			game_id: upcomingGame.id,
			user_id: $page.data.session.user.id,
			selected_team_id: id
		});
		if (data) {
			selectedTeam = data[0].selected_team_id;
		}
		if (error) {
			toast.push(error.message, { classes: ['warn'] });
		}
	};

	const handleAwayTeamClick = async (id) => {
		if (!$page.data.session.user) {
			return goto('/login');
		}
		const { data, error } = await supabase.from('game_select').insert({
			game_id: upcomingGame.id,
			user_id: $page.data.session.user.id,
			selected_team_id: id
		});
		if (data) {
			selectedTeam = data[0].selected_team_id;
		}
		if (error) {
			toast.push(error.message, { classes: ['warn'] });
		}
	};

	const currentDt = createDateTime();
	const gameDt = createDateTime(upcomingGame.date, upcomingGame.time);
	// TODO - Disable buttons and UI when current time is passed game time
</script>

<div class="mt-20 text-center">
	<h2 class="text-3xl font-bold">Today's Pick'em Game</h2>
	<p>{gameDt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
	<p>{gameDt.toFormat('h:mm a, ZZZZ')}</p>
	<p class="text-lg py-2">Who you got?</p>
	{#if !selectedTeam}
		<div class="max-w-xl mx-auto flex justify-evenly items-center">
			<div
				transition:fly|local={{
					duration: 400,
					x: -500,
					y: 0,
					opacity: 0,
					easing: quintOut
				}}
			>
				<PickemCard team={upcomingGame.away_team} handleTeamClick={handleAwayTeamClick} />
			</div>
			<div
				transition:fly|local={{
					duration: 400,
					x: 500,
					y: 0,
					opacity: 0,
					easing: quintOut
				}}
			>
				<PickemCard team={upcomingGame.home_team} handleTeamClick={handleHomeTeamClick} />
			</div>
		</div>
	{:else}
		<div class="max-w-xl mx-auto flex justify-evenly">
			<div
				class="flex flex-col items-center justify-between w-48 p-2"
				transition:fly|local={{
					delay: 400,
					duration: 400,
					x: -500,
					y: 0,
					opacity: 0,
					easing: quintOut
				}}
			>
				<h3 class="text-md">{upcomingGame.away_team.full_name}</h3>
				<img
					class="h-16 w-16"
					src={upcomingGame.away_team.logo}
					alt={upcomingGame.away_team.full_name}
				/>
			</div>
			<div
				class="flex flex-col items-center justify-between w-48 p-2"
				transition:fly|local={{
					delay: 400,
					duration: 400,
					x: 500,
					y: 0,
					opacity: 0,
					easing: quintOut
				}}
			>
				<h3 class="text-md">{upcomingGame.home_team.full_name}</h3>
				<img
					class="h-16 w-16"
					src={upcomingGame.home_team.logo}
					alt={upcomingGame.home_team.full_name}
				/>
			</div>
		</div>
	{/if}

	{#if selectedTeam && selectedTeam === upcomingGame.away_team.id}
		<div
			class="flex flex-col items-center justify-between w-48 p-2 mx-auto"
			transition:fly|local={{
				delay: 400,
				duration: 400,
				x: -500,
				y: 0,
				opacity: 0,
				easing: quintOut
			}}
		>
			<h3 class="text-xl">{upcomingGame.away_team.full_name}</h3>
			<img
				class="h-36 w-36"
				src={upcomingGame.away_team.logo}
				alt={upcomingGame.away_team.full_name}
			/>
			<button class="btn btn-small mt-2" disabled>Locked</button>
		</div>
	{/if}
	{#if selectedTeam && selectedTeam === upcomingGame.home_team.id}
		<div
			class="flex flex-col items-center justify-between w-48 p-2 mx-auto"
			transition:fly|local={{
				delay: 400,
				duration: 400,
				x: 500,
				y: 0,
				opacity: 0,
				easing: quintOut
			}}
		>
			<h3 class="text-xl">{upcomingGame.home_team.full_name}</h3>
			<img
				class="h-36 w-36"
				src={upcomingGame.home_team.logo}
				alt={upcomingGame.home_team.full_name}
			/>
			<button class="btn btn-small mt-2" disabled>Locked</button>
		</div>
	{/if}
</div>
