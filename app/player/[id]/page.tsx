import { fetchPlayer, fetchTeams, getClubShort, getFixtures } from "@/utils";
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
import TablePoints from "@/components/widgets/TablePoints";
import ChartMinutesBar from "@/components/widgets/ChartMinutesBar";
import CalendarGameweek from "@/components/widgets/CalendarGameweek";

import { Team } from "@/types/Team"; // Make sure to import the updated Team type


export default async function Page({ params }: { params: { id: number } }) {
	const player = await fetchPlayer(params.id);
	const fixtures = await getFixtures(params.id);
	const teams: Team[] = await fetchTeams(); // Explicitly type teams as Team[]

	if (!player) {
		return <div>No player data available</div>;
	}
	return (
		<div className="grid gap-5 rounded-2xl">
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-4 w-full">
				<div className="card--player col-span-1 gap-2 grid">
					<div className="card__info flex flex-col">
						<h2 className="text-2xl font-bold tracking-tight">
							{player.first_name} {player.second_name}
						</h2>
					</div>
					<div
						className={`grid grid-cols-2 grid-rows-2 aspect-square overflow-hidden`}>
						<div
							className={`flex justify-center items-center club--${getClubShort(
								player?.team
							)}`}>
							<Image
								className="object-cover rounded-full bg-black"
								src={
									"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
									player.photo.replace("jpg", "png")
								}
								alt={player.web_name}
								width={120}
								height={120}
							/>
						</div>
						<div className="aspect-square bg-bauhaus-yellow text-black w-full flex flex-col justify-center items-center">
							<p className="text-3xl font-bold leading-none">
								{(player.now_cost / 10).toFixed(1)}
							</p>
							<p>price</p>
						</div>
						<div className="aspect-square bg-bauhaus-blue text-white w-full flex flex-col justify-center items-center">
							<p className="text-3xl font-bold leading-none">{player.form}</p>
							<p>form</p>
						</div>
						<div className="aspect-square bg-bauhaus-red text-white w-full flex flex-col justify-center items-center">
							<p className="text-3xl font-bold leading-none">
								{player.selected_by_percent}%
							</p>
							<p>ownership</p>
						</div>
					</div>
				</div>

				<CalendarGameweek
					upcomingfixtures={fixtures.fixtures}
					pastfixtures={fixtures.history}
					teams={teams}
				/>
				{/* <Fixtures
					fixtures={fixtures.fixtures}
					count={fixtures.fixtures.length}
				/> */}
				{/* <div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col border px-6 py-5">
						<p className="text-xs">Starts</p>
						<div className=" text-3xl font-bold stats">{player.starts}</div>
					</div>
					<div className="flex flex-col border px-6 py-5">
						<p className="text-xs">Total Minutes</p>
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
				</div> */}
			</div>
			<div className="stats grid lg:grid-cols-4 gap-4">
				{/* <ChartMinutesBar fixtures={fixtures.history} /> */}
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
				{/* <ChartExpected fixtures={fixtures.history} /> */}
				{/* <ChartPoints fixtures={fixtures.history} /> */}
				<ChartMinutes fixtures={fixtures.history} />
				{/* <ChartDifficulty fixtures={fixtures.fixtures} /> */}
			</div>
			<div className="grid grid-cols-2 gap-4 w-full"></div>

			{/* <AddData /> */}
		</div>
	);
}
