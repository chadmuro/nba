<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import supabase from '$lib/supabaseClient';
	import { session } from '$app/stores';

	supabase.auth.onAuthStateChange((_, sbSession) => {
		if (sbSession?.user) {
			$session = sbSession.user?.id;
			document.cookie = `session=${sbSession?.user?.id}; expires=${new Date(
				sbSession.expires_at * 1000
			).toUTCString()}`;
		} else {
			$session = false;
			document.cookie.split(';').forEach(function (c) {
				document.cookie = c
					.replace(/^ +/, '')
					.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
			});
		}
	});
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="max-w-7xl mx-auto p-4 flex-1 w-full">
		<slot />
	</main>
	<Footer />
</div>
