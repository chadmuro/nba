<script>
	export let team;
</script>

<div class="avatar">
	<div
		class="relative w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-white"
	>
		<img src={team.logo} alt={team.full_name} class="w-full h-full absolute" />
	</div>
</div>

<style>
	.avatar img {
		object-fit: fill;
	}
</style>
