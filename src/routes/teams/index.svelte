<script context="module">
	import supabase from '$lib/supabaseClient';

	export async function load() {
		let { data: teams, error } = await supabase
			.from('teams')
			.select(
				`*, division (name),
    conference (name)`
			)
			.order('full_name', { ascending: true });

		return {
			props: {
				teams
			}
		};
	}
</script>

<script>
	import TeamsList from '$lib/components/TeamsList.svelte';

	export let teams;
</script>

<TeamsList {teams} />
