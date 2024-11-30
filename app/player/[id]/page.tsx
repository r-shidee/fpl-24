import { notFound } from "next/navigation";

import { fetchPlayer, fetchTeams, getClubShort, getFixtures } from "@/utils";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import ChartPoints from "@/components/widgets/ChartPoints";
import ChartMinutes from "@/components/widgets/ChartMinutes";
import ChartExpected from "@/components/widgets/ChartExpected";
import ChartDifficulty from "@/components/widgets/ChartDifficulty";
import AddData from "@/components/AddData";
import TablePoints from "@/components/widgets/TablePoints";
import ChartMinutesBar from "@/components/widgets/ChartMinutesBar";
import CalendarGameweek from "@/components/widgets/CalendarGameweek";
import { Team } from "@/types/Team";

import Fixtures from "@/components/widgets/Fixtures";
import LatestMatches from "@/components/widgets/LatestMatches";

export default async function Page({ params }: { params: { id: number } }) {
	const player = await fetchPlayer(params.id);
	const fixtures = await getFixtures(params.id);
	const teams: Team[] = await fetchTeams(); // Explicitly type teams as Team[]

	if (!player) {
		notFound();
	}
	return (
		<div className="grid gap-5 rounded-2xl">
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-4 w-full">
				<div className="card--player lg:col-span-4 gap-2 grid">
					<div
						className={`card__info flex items-end justify-between p-4 pb-0 overflow-hidden club--${teams[
							player.team - 1
						].short_name.toLowerCase()}`}
					>
						<div className="flex flex-col gap-4 p-4">
							<h2 className="text-4xl font-bold tracking-tight">
								{player.first_name} {player.second_name}
							</h2>
							<div className="grid xl:grid-cols-4 font-mono text-xs gap-4">
								<div className="flex flex-col p-3 gap-1 rounded-sm border">
									<p>Price</p>
									<p> {(player.now_cost / 10).toFixed(1)}</p>
								</div>
								<div className="flex flex-col p-3 gap-1 rounded-sm border ">
									<p>Ownership</p>
									<p>{player.selected_by_percent}%</p>
								</div>
								<div className="flex flex-col p-3 gap-1 rounded-sm border ">
									<p>Form</p>
									<p>{player.form}</p>
								</div>
							</div>
						</div>
						<Image
							className="object-cover"
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={256}
							height={256}
						/>
					</div>
				</div>

				<LatestMatches
					matches={fixtures.history}
					teams={teams}
					position={player.element_type}
				/>
				<div className="col-span-1 p-4">
					<div className="">
						<Fixtures
							fixtures={fixtures.fixtures}
							teams={teams}
							count={10}
						/>
					</div>
				</div>

				<div className="p-4">
					<div className="countdown__title tracking-widest font-mono uppercase border-b border-muted-foreground pb-2 mb-2">
						Expected Stats
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Stats</TableHead>
								<TableHead className="text-right">Value</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">xGI</TableCell>
								<TableCell className="text-right">
									{player.expected_goal_involvements}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">xG</TableCell>
								<TableCell className="text-right">
									{player.expected_goals}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">xA</TableCell>
								<TableCell className="text-right">
									{player.expected_assists}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">xGC</TableCell>
								<TableCell className="text-right">
									{player.expected_goals_conceded}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<ChartMinutes fixtures={fixtures.history} />
			</div>
		</div>
	);
}
