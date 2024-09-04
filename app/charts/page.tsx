async function getData(): Promise<Player[]> {
	// Fetch data from your API here.
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/",
		{
			cache: "no-store",
		}
	);
	let allData = await data.json();
	let players = allData.elements;

	let filteredPlayers = players.filter(function (player: {
		goals_scored: any;
		assists: any;
		status: any;
		expected_goal_involvements: number;
		expected_goals_conceded: number;
		id: number;
	}) {
		const goalsassist = player.goals_scored + player.assists;
		const difference = goalsassist - player.expected_goal_involvements;

		return player.status == "a" && player.expected_goals_conceded < 3;
		// return difference > 0 && player.minutes > 230 && player.now_cost <= 50;
	});
	return filteredPlayers;
}

export default async function Page() {
	const players = await getData();

	return (
		<ul>
			{players.map((player) => (
				<li key={player.id}>{player.web_name}</li>
			))}
		</ul>
	);
}
