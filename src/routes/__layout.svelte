<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="max-w-7xl mx-auto p-4 flex-1 w-full">
		<slot />
	</main>
	<Footer />
</div>
