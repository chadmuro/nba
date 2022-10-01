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
		teams
	};
}
