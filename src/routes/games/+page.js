import { redirect } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient';
import { withAuth } from '@supabase/auth-helpers-sveltekit';

export const load = withAuth(async({ session }) => {
	if (!session.user) {
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
		.match({ user_id: session.user.id })
		.not('game_result', 'is', null)
		.order('created_at', { ascending: false })
		.limit(10);

	return {
		completedGames: completedGames || [],
		numberOfGames: count
	};
})
