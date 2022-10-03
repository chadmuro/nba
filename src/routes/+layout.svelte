<script>
	import '../app.css';
	import '$lib/supabaseClient';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	startSupabaseSessionSync({
		page,
		handleRefresh: () => invalidateAll()
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
