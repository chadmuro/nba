import supabase from '$lib/supabaseClient';
import { writable } from 'svelte/store';

export const teams = writable([]);

export async function getTeams() {
	console.log('data fetch');
	const { data, error } = await supabase
		.from('teams')
		.select(
			`*, division (name),
  conference (name)`
		)
		.order('full_name', { ascending: true });

	if (error) {
		console.error(error.message);
	}
	teams.set(data);
}

getTeams();
