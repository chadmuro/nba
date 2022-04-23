<script>
	import countries from '$lib/countries';
</script>

<p>Sign up today to start playing!</p>
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
	<label class="label" for="country">
		<span class="label-text">Country</span>
	</label>
	<select class="select select-primary w-full max-w-xs" id="country">
		<option disabled selected>Country</option>
		{#each Object.values(countries) as country}
			<option>{country.emoji} {country.name}</option>
		{/each}
	</select>
	<label class="label" for="image">
		<span class="label-text">Profile</span>
	</label>
	<input
		id="image"
		type="file"
		placeholder="Profile"
		class="input input-primary input-bordered w-full max-w-xs"
	/>
	<button class="btn btn-primary my-4">Submit</button>
	<p>Already have an account? <a href="/login" class="link link-primary">Login</a></p>
</form>
