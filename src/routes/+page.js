import supabase from '$lib/supabaseClient';
import { withAuth } from '@supabase/auth-helpers-sveltekit';

export const load = withAuth(async({ session }) => {
	const { data: upcomingGame, error: upcomingGamesError } = await supabase
		.from('games')
		.select(
			`*, home_team (id, full_name, logo),
    away_team (id, full_name, logo), season (year)`
		)
		.is('game_result', null)
		.order('date', { ascending: true })
		.limit(1);

	let selectedTeam;

	if (!session.user) {
		selectedTeam = undefined;
	}

	if (session.user && !!upcomingGame.length) {
		const { data, error: selectedTeamError } = await supabase
			.from('game_select')
			.select('selected_team_id')
			.eq('game_id', upcomingGame[0].id)
			.eq('user_id', session.user.id)
			.limit(1);

		selectedTeam = data;
	}

	return {
		upcomingGame: upcomingGame[0] || null,
		selectedTeam: selectedTeam ? selectedTeam[0] : undefined
	};
});
