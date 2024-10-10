import { fetchPlayer, getFixtures } from "@/utils";
import Image from "next/image";
import { getPlayersPosition } from "@/utils";
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
import Fixtures from "@/components/widgets/Fixtures";
import ChartMinutesBar from "@/components/widgets/ChartMinutesBar";

interface Item {
	season_name: string;
	total_points: number;
	element_code: number;
	minutes: number;
	goals_scored: number;
	assists: number;
	saves: number;
}

export default async function Page({ params }: { params: { id: number } }) {
	const player = await fetchPlayer(params.id);
	const fixtures = await getFixtures(params.id);

	if (!player) {
		return <div>No player data available</div>;
	}
	return (
		<div className="flex flex-wrap gap-5 rounded-2xl">
			<div className="flex gap-4 justify-between w-full">
				<div className="flex gap-4">
					<div className="bg-slate-300 rounded aspect-square h-[120px] w-[120px] pt-2 overflow-hidden">
						<Image
							className=""
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={120}
							height={120}
						/>
					</div>
					<div className="card__info flex flex-col">
						<h2 className="text-2xl font-bold tracking-tight">
							{player.first_name} {player.second_name}
						</h2>
						<p>{getPlayersPosition(player.element_type)}</p>
						<p>{(player.now_cost / 10).toFixed(1)}</p>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-4">
					<div className="flex flex-col border px-6 py-5">
						<p className="text-xs">Starts</p>
						<div className=" text-3xl font-bold stats">{player.starts}</div>
					</div>
					<div className="flex flex-col border px-6 py-5">
						<p className="text-xs">Minutes</p>
						<div className=" text-3xl font-bold stats">{player.minutes}</div>
					</div>
					<div className="flex flex-col border px-6 py-5">
						<p className="text-xs">Goals</p>
						<div className="text-3xl font-bold stats">
							{player.goals_scored}
						</div>
					</div>
					<div className="flex flex-col border px-6 py-5">
						<p className="text-xs">Assists</p>
						<div className="text-3xl font-bold stats">{player.assists}</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-4 w-full">
				<ChartMinutes fixtures={fixtures.history} />
				<ChartMinutesBar fixtures={fixtures.history} />
				<Card>
					<CardHeader>
						<CardTitle>Expected Stats</CardTitle>
					</CardHeader>
					<CardContent>
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
					</CardContent>
				</Card>
				<ChartExpected fixtures={fixtures.history} />
				<ChartPoints fixtures={fixtures.history} />
				<Fixtures
					fixtures={fixtures.fixtures}
					count={fixtures.fixtures.length}
				/>
				<ChartDifficulty fixtures={fixtures.fixtures} />
			</div>
			<div className="grid grid-cols-2 gap-4 w-full"></div>

			{/* <AddData /> */}
		</div>
	);
}
