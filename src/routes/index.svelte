<script context="module">
	import supabase from '../supabaseClient';

	export async function load() {
		let { data: teams, error } = await supabase
			.from('teams')
			.select(
				`*, division (name),
    conference (name)`
			)
			.eq('id', 1);

		return {
			props: {
				teams
			}
		};
	}
</script>

<script>
	export let teams;
</script>

<p class="text-red-500">{teams[0].full_name}</p>
<img src={teams[0].logo} alt={teams[0].full_name} />
<button class="btn btn-primary">Click me</button>
