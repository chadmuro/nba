<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
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

<SvelteToast options={{ classes: ['log'] }} />
<div class="min-h-screen flex flex-col">
	<Header />
	<main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
		<slot />
	</main>
	<Footer />
</div>

<style>
	:global(.log.info) {
		--toastBackground: #48bb78;
		--toastBarBackground: #2f855a;
	}
	:global(.log.warn) {
		--toastBackground: #f56565;
		--toastBarBackground: #c53030;
	}
</style>
