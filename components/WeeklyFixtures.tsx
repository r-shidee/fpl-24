"use client";

import { useEffect, useState } from "react";

interface Fixture {
	id: number;
	team_h: number;
	team_a: number;
	team_h_score: number | null;
	team_a_score: number | null;
	kickoff_time: string;
	// Add other properties as needed
}

interface WeeklyFixturesProps {
	eventId: number;
}

interface Fixture {
	id: number;
	team_h: number;
	team_a: number;
	team_h_score: number | null;
	team_a_score: number | null;
	kickoff_time: string;
	// Add other properties as needed
}

interface WeeklyFixturesProps {
	eventId: number;
	fixtures: Fixture[];
}

export default function WeeklyFixtures({
	eventId,
	fixtures,
}: WeeklyFixturesProps) {
	return (
		<div className="weekly-fixtures">
			<h2 className="text-xl font-semibold mb-4">
				Gameweek {eventId} Fixtures
			</h2>
			<ul className="space-y-2">
				{fixtures.map((fixture) => (
					<li
						key={fixture.id}
						className="bg-gray-100 p-2 rounded">
						{`${fixture.team_h} vs ${fixture.team_a} - ${new Date(
							fixture.kickoff_time
						).toLocaleString()}`}
					</li>
				))}
			</ul>
		</div>
	);
}
