<script>
	export let currentPage;
	export let totalCount;
	export let perPage = 10;
	export let handlePageClick;

	$: numPages = Math.ceil(totalCount / perPage);
</script>

<div class="btn-group">
	{#each Array(numPages) as _, page}
		<button
			class="btn"
			class:btn-active={currentPage === page + 1}
			on:click={() => handlePageClick(page + 1)}>{page + 1}</button
		>
	{/each}
</div>
