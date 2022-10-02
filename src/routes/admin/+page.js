import { redirect } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient';
import { withAuth } from '@supabase/auth-helpers-sveltekit';

const adminId = import.meta.env.VITE_ADMIN_ID;

export const load = withAuth(async({ session }) => {
	if (session.user.id !== adminId) {
		throw redirect(302, '/login');
	}

	const { data: upcomingGames, error: upcomingGamesError } = await supabase
		.from('games')
		.select(
			`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year)`
		)
		.is('game_result', null)
		.order('date', { ascending: true })
		.limit(10);

	const { data: completedGames, error: completedGamesError } = await supabase
		.from('games')
		.select(
			`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year), game_result (home_team_score, away_team_score, winning_team, losing_team)`
		)
		.not('game_result', 'is', null)
		.order('date', { ascending: false })
		.limit(10);

	return {
		upcomingGames: upcomingGames || [],
		completedGames: completedGames || []
	};
})
