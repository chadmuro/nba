<script context="module">
	export async function load({ session }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		let {
			data: profile,
			error,
			status
		} = await supabase
			.from('profiles')
			.select(`username, country, favorite_team, avatar_url`)
			.eq('id', session)
			.single();

		return {
			props: {
				profile
			}
		};
	}
</script>

<script>
	import supabase from '$lib/supabaseClient';
	import countries from '$lib/countries';
	import { session } from '$app/stores';
	import { teams } from '$lib/stores/teamsStore';

	export let profile;

	let loading = false;
	let username = profile?.username || null;
	let country = profile?.country || null;
	let favorite_team = profile?.favorite_team || null;
	let avatar_url = null;

	async function updateProfile() {
		try {
			loading = true;

			const updates = {
				id: $session,
				username,
				country,
				favorite_team,
				avatar_url,
				updated_at: new Date()
			};

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			if (error) throw error;
		} catch (error) {
			console.error(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<h1>My Profile</h1>
<div class="mx-auto flex justify-center max-w-md border border-gray-500 p-8 rounded">
	<form class="form-control w-full max-w-xs" on:submit|preventDefault={updateProfile}>
		<label class="label" for="username">
			<span class="label-text">Username</span>
		</label>
		<input
			bind:value={username}
			id="username"
			type="text"
			placeholder="Username"
			class="input input-primary input-bordered w-full max-w-xs"
		/>
		<label class="label" for="country">
			<span class="label-text">Country</span>
		</label>
		<select bind:value={country} class="select select-primary w-full max-w-xs" id="country">
			<option disabled value={null} selected>Country</option>
			{#each Object.values(countries) as country}
				<option value={`${country.emoji} ${country.name}`}>{country.emoji} {country.name}</option>
			{/each}
		</select>
		<label class="label" for="favorite_team">
			<span class="label-text">Favorite Team</span>
		</label>
		<select bind:value={favorite_team} class="select select-primary w-full max-w-xs" id="country">
			<option disabled selected>Team</option>
			{#each $teams as team}
				<option value={team.id}>
					{team.full_name}
				</option>
			{/each}
		</select>
		<label class="label" for="image">
			<span class="label-text">Profile</span>
		</label>
		<input
			id="image"
			type="file"
			placeholder="Profile"
			class="input input-primary input-bordered w-full max-w-xs"
		/>
		<button class={`btn btn-primary my-4 ${loading && 'loading'}`}>Submit</button>
	</form>
</div>
