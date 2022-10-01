<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import supabase from '$lib/supabaseClient';

	// export async function load() {
	// 	let { data: teams, error } = await supabase
	// 		.from('teams')
	// 		.select(
	// 			`*, division (name),
    conference (name)`
	// 		)
	// 		.order('full_name', { ascending: true });

	// 	return {
	// 		props: {
	// 			teams
	// 		}
	// 	};
	// }
</script>

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import TeamsList from '$lib/components/TeamsList.svelte';

	export let teams;
</script>

<TeamsList {teams} />
