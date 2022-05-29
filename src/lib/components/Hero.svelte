<script>
	import { session } from '$app/stores';
	console.log(session);
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
				<a href={$session ? '/leaderboard' : '/login'} class="btn btn-primary"
					>{$session ? 'Check out the leaderboard' : 'Get Started'}</a
				>
			</div>
		</div>
	</div>
</div>
