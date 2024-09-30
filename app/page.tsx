import Standings from "@/components/widgets/Standings";
import CardPlayer from "@/components/widgets/CardPlayer";
export default async function Page() {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;

	let watchlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	let watchlistPlayers = players.filter((player: any) =>
		watchlist.includes(player.id)
	);

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl">My Team</h1>
			<div className="grid grid-cols-6 gap-4">
				{watchlistPlayers.map((player: Player) => (
					<CardPlayer
						key={player.id}
						teamName="teamName"
						player={player}
					/>
				))}
			</div>

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
					description="Saves"
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
