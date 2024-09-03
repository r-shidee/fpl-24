import { Player, columns } from "./columns";
import { DataTable } from "./data-table";

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
		id: number;
	}) {
		const goalsassist = player.goals_scored + player.assists;
		const difference = goalsassist - player.expected_goal_involvements;

		return (
			// costperxg > 0.5 &&
			player.status == "a"
			// difference > 0 &&
			// player.now_cost < 40 &&
			// player.points_per_game > 3 &&
			// player.id == 524 || //Areola

			// || player.id == 1
			// player.element_type == 4
			// &&
			// (player.team == 1 ||
			// 	player.team == 2 ||
			// 	player.team == 13 ||
			// 	player.team == 15)
		);
		// return difference > 0 && player.minutes > 230 && player.now_cost <= 50;
	});
	return filteredPlayers;
}
export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={data}
			/>
		</div>
	);
}
