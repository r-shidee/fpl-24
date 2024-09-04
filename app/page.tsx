import Standings from "@/components/widgets/Standings";

export default async function Page() {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl">Premier League 2024/25</h1>
			<div className="grid grid-cols-3 gap-4">
				<Standings
					players={players}
					description="Goals"
					sortBy="goals_scored"
				/>
				<Standings
					players={players}
					description="Assists"
					sortBy="assists"
				/>
				<Standings
					players={players}
					description="Top Saves"
					sortBy="saves"
				/>
				<Standings
					players={players}
					description="BPS"
					sortBy="bps"
				/>
				<Standings
					players={players}
					description="PPG"
					sortBy="points_per_game"
				/>
			</div>
		</div>
	);
}
