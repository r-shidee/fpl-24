import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Team } from "@/types/Team";
import { Event } from "@/types/Event";

import Image from "next/image";
import { fetchEvents } from "@/utils/api/events";
interface Fixture {
	event: number;
	is_home: boolean;
	difficulty: number;
	team_h: number;
	team_a: number;
}

interface FixturesProps {
	fixtures: Fixture[];
	count?: number;
	teams: Team[];
}

const Fixtures: React.FC<FixturesProps> = async ({
	fixtures,
	count,
	teams,
}) => {
	const events = await fetchEvents();
	const nextEvent = events.find((event: Event) => event.is_next);

	// Filter fixtures starting from the next event
	const upcomingFixtures = fixtures.filter(
		(fixture) => fixture.event >= (nextEvent?.id || 1)
	);
	const displayedFixtures = upcomingFixtures.slice(0, count);

	const totalFDR = displayedFixtures.reduce(
		(sum, fixture) => sum + fixture.difficulty,
		0
	);
	const averageFDR = totalFDR / displayedFixtures.length;

	return (
		<Card className="xl:col-span-3">
			<CardHeader>
				<CardTitle>Upcoming Fixtures</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-10">
					{displayedFixtures.map((fixture, index) => (
						<div
							key={index}
							className={`p-1 mb-2 flex-col flex items-center gap-2 fixture--level-${fixture.difficulty}`}>
							<span className="font-mono text-xs">{fixture.event}</span>

							<Image
								key={fixture.is_home ? fixture.team_a : fixture.team_h}
								src={
									"https://resources.premierleague.com/premierleague/badges/rb/t" +
									(fixture.is_home
										? teams[fixture.team_a - 1].code
										: teams[fixture.team_h - 1].code) +
									".svg"
								}
								width={40}
								height={40}
								alt={"club"}
								className="w-8 h-8"
							/>
							<div className="font-mono text-xs flex flex-col items-center">
								{fixture.is_home
									? teams[fixture.team_a - 1].short_name
									: teams[fixture.team_h - 1].short_name}
								<span>{fixture.is_home ? "Home" : "Away"}</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter>
				<div className="leading-none text-muted-foreground">
					<p>Total FDR: {totalFDR}/25</p>
					<p>Average FDR: {averageFDR.toFixed(2)}</p>
					{/* Add description based on total FDR */}
					<p className="mt-2">
						{totalFDR <= 10 && "Very easy upcoming fixtures"}
						{totalFDR > 10 &&
							totalFDR <= 15 &&
							"Relatively easy upcoming fixtures"}
						{totalFDR > 15 &&
							totalFDR <= 20 &&
							"Moderately difficult upcoming fixtures"}
						{totalFDR > 20 && "Very difficult upcoming fixtures"}
					</p>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Fixtures;
