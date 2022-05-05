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

		if (profile?.avatar_url) {
			let { data: imageUrl } = supabase.storage
				.from('avatars')
				.getPublicUrl(profile.avatar_url.split('/').slice(1).join('/'));

			return {
				props: {
					profile: {
						...profile,
						imageUrl: imageUrl.publicURL
					}
				}
			};
		}

		return {
			props: {
				profile
			}
		};
	}
</script>

<script>
	import { toast } from '@zerodevx/svelte-toast';
	import UploadAvatar from '$lib/components/UploadAvatar.svelte';
	import supabase from '$lib/supabaseClient';
	import countries from '$lib/constants/countries';
	import { session } from '$app/stores';
	import { teams } from '$lib/stores/teamsStore';

	export let profile;

	let loading = false;
	let username = profile?.username || null;
	let country = profile?.country || null;
	let favorite_team = profile?.favorite_team || null;
	let file = null;
	let avatar_url = null;

	async function updateProfile() {
		try {
			loading = true;

			if (file) {
				const { data: imageData, error: imageError } = await supabase.storage
					.from('avatars')
					.upload($session + '/' + Date.now(), file, {
						cacheControl: '3600',
						upsert: false
					});
				if (imageError) console.error(imageError.message);
				avatar_url = imageData.Key;
			}

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
			toast.push('Profile information saved', { classes: ['info'] });
		} catch (error) {
			toast.push(error.error_desription || error.message, { classes: ['warn'] });
			console.error(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<div class="mx-auto flex justify-center max-w-md border border-gray-500 p-8 rounded">
	<form class="form-control w-full max-w-xs" on:submit|preventDefault={updateProfile}>
		<h1 class="text-2xl text-center">My Profile</h1>
		<p class="description my-4 text-center">Rep your country and favorite team!</p>
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
			<option disabled value={null} selected>Team</option>
			{#each $teams as team}
				<option value={team.id}>
					{team.full_name}
				</option>
			{/each}
		</select>
		<UploadAvatar bind:file imageUrl={profile?.imageUrl} />
		<button class={`btn btn-primary my-4 ${loading && 'loading'}`}>Submit</button>
	</form>
</div>
