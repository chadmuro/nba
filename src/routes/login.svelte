<script>
	import supabase from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let loading = false;
	let email;
	let password;

	const handleLogin = async () => {
		try {
			loading = true;
			const { user, session, error } = await supabase.auth.signIn({
				email,
				password
			});
			if (error) throw error;
			goto('/');
		} catch (error) {
			console.error(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="mx-auto flex justify-center max-w-md border border-gray-500 p-8 rounded">
	<form class="w-full form-control" on:submit|preventDefault={handleLogin}>
		<h1 class="text-2xl text-center">Welcome to NBA Pick'em</h1>
		<p class="description my-4 text-center">Login with your email below</p>
		<label class="label" for="email">
			<span class="label-text">Email</span>
		</label>
		<input
			bind:value={email}
			id="email"
			type="email"
			placeholder="Email address"
			class="input input-primary input-bordered w-full"
		/>
		<label class="label" for="password">
			<span class="label-text">Password</span>
		</label>
		<input
			bind:value={password}
			id="password"
			type="password"
			placeholder="Password"
			class="input input-primary input-bordered w-full"
		/>
		<button class={`btn btn-primary my-4 ${loading && 'loading'}`} type="submit">Submit</button>
		<p>Don't have an account? <a href="/signup" class="link link-primary">Sign up</a></p>
	</form>
</div>
