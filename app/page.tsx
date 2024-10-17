import FilterComponent from "@/components/FilterComponent";
import Matches from "@/components/Matches";
import CardPlayer from "@/components/widgets/CardPlayer";
import { Player } from "@/types/Player";

export default async function Page() {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;
	let events = allData.events;

	let watchlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	let watchlistPlayers = players.filter((player: Player) =>
		watchlist.includes(player.id)
	);

	return (
		<div className="grid grid-cols-12">
			<div className="flex flex-col gap-4 p-4 col-span-9">
				<h1 className="text-2xl">My Team</h1>
				<FilterComponent
					players={watchlistPlayers}
					filtering={false}
				/>
			</div>
			<div className="flex flex-col gap-4 p-4 col-span-3">
				<Matches events={events} />
			</div>
		</div>
	);
}
