<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main class="max-w-7xl mx-auto p-4">
	<slot />
</main>
