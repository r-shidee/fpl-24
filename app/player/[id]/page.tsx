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

interface Item {
	season_name: string;
	total_points: number;
	element_code: number;
}

export default async function Page({ params }: { params: { id: number } }) {
	const player = await fetchPlayer(params.id);
	const fixtures = await getFixtures(params.id);
	return (
		<div className="flex flex-wrap gap-5 rounded-2xl">
			<div className=" p-5 flex gap-4 justify-between w-full">
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
						<p>
							{(player.now_cost / 10).toFixed(1)} {player.teamId}
						</p>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col text-right">
						<p className="text-sm">Starts</p>
						<div className=" text-lg font-bold stats">{player.starts}</div>
					</div>
					<div className="flex flex-col text-right">
						<p className="text-sm">Minutes</p>
						<div className=" text-lg font-bold stats">{player.minutes}</div>
					</div>
					<div className="flex flex-col text-right">
						<p className="text-sm">Goals</p>
						<div className=" text-lg font-bold stats">
							{player.goals_scored}
						</div>
					</div>
					<div className="flex flex-col text-right">
						<p className="text-sm">Assists</p>
						<div className=" text-lg font-bold stats">{player.assists}</div>
					</div>
				</div>
			</div>
			<Card className="w-1/4">
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
			<ChartPoints fixtures={fixtures.history} />
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Previous Seasons</CardTitle>
				</CardHeader>
				<CardContent>
					{fixtures.history_past.map((item: Item) => (
						<div
							key={item.element_code}
							className="mb-4">
							<div className="mb-2">{item.season_name}</div>
							<div className="flex gap-2">
								<div className="flex flex-col p-4 border w-fit rounded items-center">
									<div>Total Points</div>
									<div className="text-xl font-bold">{item.total_points}</div>
								</div>
								<div className="flex flex-col p-4 border w-fit rounded items-center">
									<div>Minutes</div>
									<div className="text-xl font-bold">{item.minutes}</div>
								</div>
								<div className="flex flex-col p-4 border w-fit rounded items-center">
									<div>Goals</div>
									<div className="text-xl font-bold">{item.goals_scored}</div>
								</div>
								<div className="flex flex-col p-4 border w-fit rounded items-center">
									<div>Assists</div>
									<div className="text-xl font-bold">{item.assists}</div>
								</div>
								<div className="flex flex-col p-4 border w-fit rounded items-center">
									<div>Saves</div>
									<div className="text-xl font-bold">{item.saves}</div>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
