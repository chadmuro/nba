<script>
	import supabase from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let loading = false;

	const handleLogout = async () => {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
			goto('/');
		} catch (error) {
			console.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<header class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label for="menu" tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Home</a></li>
				<!-- <li><a href="/teams">Teams</a></li> -->
				<li><a href="/games">Games History</a></li>
				<li><a href="/leaderboard">Leaderboard</a></li>
				<li><a href="/profile">Profile</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">NBA Pick'em</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0">
			<li><a href="/">Home</a></li>
			<!-- <li><a href="/teams">Teams</a></li> -->
			<li><a href="/games">Games History</a></li>
			<li><a href="/leaderboard">Leaderboard</a></li>
			<li><a href="/profile">Profile</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		{#if $page.data.session.user}
			<button on:click={handleLogout} class="btn" disabled={loading}>Logout</button>
		{:else}
			<a href="/login" class="btn">Login</a>
		{/if}
	</div>
</header>
