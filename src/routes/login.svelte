<script>
	import countries from '$lib/countries';
</script>

<form class="form-control w-full max-w-xs">
	<label class="label" for="username">
		<span class="label-text">Username</span>
	</label>
	<input
		id="username"
		type="text"
		placeholder="Username"
		class="input input-primary input-bordered w-full max-w-xs"
	/>
	<label class="label" for="email">
		<span class="label-text">Email</span>
	</label>
	<input
		id="email"
		type="email"
		placeholder="Email address"
		class="input input-primary input-bordered w-full max-w-xs"
	/>
	<button class="btn btn-primary">Submit</button>
	<p>Don't have an account? <a href="/signup" class="link link-primary">Signup</a></p>
</form>
