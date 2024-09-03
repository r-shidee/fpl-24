import Link from "next/link";

import { fetchPlayer } from "@/utils";
import Image from "next/image";
import { getClubShort, getPlayersPosition } from "@/utils";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default async function Page({ params }: { params: { id: number } }) {
	const player = await fetchPlayer(params.id);

	return (
		<div className="flex flex-wrap gap-5 rounded-2xl">
			<div className="bg-slate-100  p-5 flex gap-4 justify-between w-full">
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
						<p>{player.news}</p>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col text-right">
						<p className="text-sm">Starts</p>
						<div className=" text-lg font-bold stats">{player.starts}</div>
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
			<div className=" w-1/3">
				<h2 className="mb-4 text-lg font-semibold">Expected Stats</h2>
				<Table className="bg-slate-100 rounded">
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
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
