<script>
	export let file;
	export let imageUrl;

	let imagePreview;

	function getFile(e) {
		file = !!e.target.files.length && e.target.files[0];
		imagePreview = URL.createObjectURL(file);
	}

	function removeFile() {
		file = null;
		imagePreview = null;
	}
</script>

{#if file}
	<label class="label" for="image">
		<span class="label-text">Profile</span>
	</label>
	<div class="avatar mx-auto">
		<div class="w-48 rounded-full">
			<img src={imagePreview} alt="Avatar preview" />
		</div>
	</div>
	<button on:click={removeFile}>Remove Image</button>
{:else if imageUrl}
	<label class="label" for="image">
		<span class="label-text">Profile</span>
	</label>
	<div class="avatar mx-auto">
		<div class="w-48 rounded-full">
			<img src={imageUrl} alt="Avatar preview" />
		</div>
	</div>
	<input
		id="image"
		accept="image/*"
		type="file"
		placeholder="Profile"
		class="input w-full max-w-xs"
		on:change={getFile}
	/>
{:else}
	<label class="label" for="image">
		<span class="label-text">Profile</span>
	</label>
	<input
		id="image"
		accept="image/*"
		type="file"
		placeholder="Profile"
		class="input w-full max-w-xs"
		on:change={getFile}
	/>
{/if}
