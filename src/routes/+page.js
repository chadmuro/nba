import supabase from '$lib/supabaseClient';

export async function load({ session }) {
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

	if (!session) {
		selectedTeam = undefined;
	}

	if (session) {
		const { data, error: selectedTeamError } = await supabase
			.from('game_select')
			.select('selected_team_id')
			.eq('game_id', upcomingGame[0].id)
			.eq('user_id', session)
			.limit(1);

		selectedTeam = data;
	}

	return {
		upcomingGame: upcomingGame[0],
		selectedTeam: selectedTeam ? selectedTeam[0] : undefined
	};
}
