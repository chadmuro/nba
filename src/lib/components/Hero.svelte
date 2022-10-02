<script>
	import { page } from '$app/stores';
</script>

<div class="bg-base-200">
	<div class="py-36">
		<div class="hero-content text-center ">
			<div class="max-w-lg">
				<h1 class="text-5xl font-bold">NBA Pick'em</h1>
				<p class="py-6">
					Welcome to NBA Pick'em. Choose a winner every night based on the line and climb the
					leaderboard!
				</p>
				<a href={$page.data.session.user ? '/leaderboard' : '/login'} class="btn btn-primary"
					>{$page.data.session.user ? 'Check out the leaderboard' : 'Get Started'}</a
				>
			</div>
		</div>
	</div>
</div>
