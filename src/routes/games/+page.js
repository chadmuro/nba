import { redirect } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient';

export async function load({ parent }) {
	const { user: session } = parent();
	
	if (!session) {
		throw redirect(302, '/login');
	}

	const {
		data: completedGames,
		error: completedGamesError,
		count
	} = await supabase
		.from('game_select')
		.select(
			`*, game_id (date, time, home_team (id, full_name, logo), away_team (id, full_name, logo), game_result (home_team_score, away_team_score, winning_team, losing_team))`,
			{ count: 'exact' }
		)
		.match({ user_id: session })
		.not('game_result', 'is', null)
		.order('created_at', { ascending: false })
		.limit(10);

	return {
		completedGames: completedGames || [],
		numberOfGames: count
	};
}
