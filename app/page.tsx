import { Player } from "@/types/Player";
import { Event } from "@/types/Event";
import { Countdown } from "@/components/widgets/Countdown";
import FilterComponent from "@/components/FilterComponent";
import WeeklyFixtures from "@/components/WeeklyFixtures";

export default async function Page() {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;
	let events = allData.events;
	let nextEvent = events.find((event: Event) => event.is_next);

	let watchlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	let watchlistPlayers = players.filter((player: Player) =>
		watchlist.includes(player.id)
	);

	// Fetch fixtures data
	let fixturesData = await fetch(
		`https://fantasy.premierleague.com/api/fixtures/?event=${nextEvent.id}`
	);
	let fixtures = await fixturesData.json();

	return (
		<div className="grid lg:grid-cols-12">
			<div className="flex flex-col gap-4 p-4 col-span-3 xl:col-span-9">
				<Countdown
					deadline={nextEvent.deadline_time}
					name={nextEvent.name}
				/>
				{nextEvent && (
					<WeeklyFixtures
						eventId={nextEvent.id}
						fixtures={fixtures}
					/>
				)}
			</div>
		</div>
	);
}
