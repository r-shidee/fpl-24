import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Fixture {
	event: number;
	opponent_team: number;
	is_home: boolean;
	difficulty: number;
	team_h: number;
	team_a: number;
}

interface FixturesProps {
	fixtures: Fixture[];
	count: number;
}

const Fixtures: React.FC<FixturesProps> = ({ fixtures, count }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Upcoming Fixtures</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-5">
					{fixtures.slice(0, count).map((fixture, index) => (
						<div
							key={index}
							className="mb-2">
							GW{fixture.event}: {fixture.is_home ? "H" : "A"} vs{" "}
							{fixture.opponent_team} (FDR: {fixture.difficulty})
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default Fixtures;
