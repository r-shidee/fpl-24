import { fetchTeams } from "@/utils";

interface Team {
	code: number;
	draw: number;
	form: null;
	id: number;
	loss: number;
	name: string;
	played: number;
	points: number;
	position: number;
	short_name: string;
	strength: number;
	team_division: null;
	unavailable: boolean;
	win: number;
	strength_overall_home: number;
	strength_overall_away: number;
	strength_attack_home: number;
	strength_attack_away: number;
	strength_defence_home: number;
	strength_defence_away: number;
	pulse_id: number;
}

interface Fixture {
	id: number;
	code: number;
	team_h: number;
	team_a: number;
	event: number;
	minutes: number;
	difficulty: number;
	finished: boolean;
	provisional_start_time: boolean;
	is_home: boolean;
	kickoff_time: string;
	event_name: string;
}

interface FixturesProps {
	fixtures: Fixture[];
	count: number;
}

export default async function Fixtures({ fixtures, count }: FixturesProps) {
	const teams = await fetchTeams();

	if (count) {
		fixtures = fixtures.slice(0, count + 1);
	}

	return (
		<div className="flex flex-wrap gap-1">
			{fixtures.map((fixture) => (
				<div
					key={fixture.code}
					className={`border p-2 text-xs fixture--level-${fixture.difficulty}`}>
					<div>{fixture.event_name.replace("Gameweek", "")}</div>
					<div>
						{fixture.is_home ? (
							<div>{teams[fixture.team_a - 1].short_name} (H)</div>
						) : (
							<div>{teams[fixture.team_h - 1].short_name} (A)</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
