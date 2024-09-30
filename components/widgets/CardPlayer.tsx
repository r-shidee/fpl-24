import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleDot,
	faFutbol,
	faHand,
	faHospital,
	faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { getFixtures } from "@/utils";
import Fixtures from "./Fixtures";

type Player = {
	id: number;
	team: number;
	team_code: number;
	now_cost: number;
	goals_scored: number;
	assists: number;
	saves: number;
	minutes: number;
	starts: number;
	element_type: number;
	expected_goals: number;
	expected_assists: number;
	expected_goal_involvements: number;
	expected_goal_involvements_per_90: number;
	expected_goals_conceded: number;
	penalties_order: number;
	first_name: string;
	second_name: string;
	web_name: string;
	status: string;
	photo: string;
};

interface PlayerCardProps {
	player: Player;
}

const positions: { [key: number]: string } = {
	1: "Goalkeeper",
	2: "Defender",
	3: "Midfielder",
	4: "Forward",
};

const teams: { [key: number]: string } = {
	1: "ars",
	2: "avl",
	3: "bou",
	4: "bre",
	5: "bha",
	6: "che",
	7: "cry",
	8: "eve",
	9: "ful",
	10: "ips",
	11: "lei",
	12: "liv",
	13: "mci",
	14: "mun",
	15: "new",
	16: "nfo",
	17: "sou",
	18: "tot",
	19: "whu",
	20: "wol",
};

const RenderDivs = ({
	goals,
	assists,
	saves,
	position,
}: {
	goals: number;
	assists: number;
	saves: number;
	position: number;
}) => {
	return (
		<div className="flex justify-between flex-wrap gap-1 px-2">
			<div className="flex flex-wrap gap-1">
				{Array.from({ length: goals }, (_, index) => (
					<FontAwesomeIcon
						className="w-3 h-3 "
						key={index}
						icon={faFutbol}
					/>
				))}
			</div>
			<div className="flex flex-wrap gap-1 align-baseline">
				{Array.from({ length: assists }, (_, index) => (
					<FontAwesomeIcon
						className="w-3 h-3 "
						key={index}
						icon={faCircleDot}
					/>
				))}
			</div>
			{position === 1 ? (
				<div className="flex flex-wrap gap-1">
					{Array.from({ length: saves }, (_, index) => (
						<FontAwesomeIcon
							className="w-3 h-3 "
							key={index}
							icon={faHand}
						/>
					))}
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default async function CardPlayer({
	player,
	teamName,
}: {
	player: Player;
	teamName: string;
}) {
	return (
		<div
			key={player.id}
			className=" hover:bg-slate-900 rounded group border aspect-[2/3] ">
			<Link href={`/player/${player.id}`}>
				<div className="grid relative gap-2">
					<div className="flex relative gap-2 items-center p-2">
						<Image
							src={
								"https://resources.premierleague.com/premierleague/badges/rb/t" +
								player.team_code +
								".svg"
							}
							width={32}
							height={32}
							alt={player.team_code.toString()}
							className=" h-8 w-8 "
						/>
						<div className="flex flex-col leading-tight w-full">
							<div className="flex flex-wrap justify-between">
								<p className="font-bold">{player.web_name}</p>
							</div>
							<p className=" text-gray-400 text-sm">
								{positions[player.element_type]}
							</p>
						</div>
						<div
							className={` w-12 h-12 flex justify-end pt-2 pr-2 rounded-bl-full absolute right-0 text-sm font-serif `}>
							{(player.now_cost / 10).toFixed(1)}
						</div>
					</div>
					<RenderDivs
						goals={player.goals_scored}
						assists={player.assists}
						saves={player.saves}
						position={player.element_type}
					/>
					<div
						className={`rounded relative overflow-hidden flex ease-in-out group-hover:bg-none items-center club--${
							teams[player.team]
						} `}>
						<Image
							className="object-cover group-hover:scale-105 w-full group-hover:z-0"
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={250}
							height={250}
						/>
						<div className="absolute bottom-0 p-1 flex gap-1 w-full">
							{player.penalties_order ? (
								<div className="w-fit justify-between items-center flex font-mono text-xs bg-green-500 px-2 py-1 rounded-sm">
									PK-{player.penalties_order}
								</div>
							) : (
								""
							)}
							{player.status === "i" ? (
								<div className="justify-between items-center flex w-fit font-mono text-xs bg-red-500 px-2 py-1 rounded-sm">
									<FontAwesomeIcon
										className="w-3 h-3 "
										icon={faHospital}
									/>
								</div>
							) : (
								""
							)}
						</div>
					</div>

					<div className={` text-slate-500 p-2`}>
						<div
							className="h-1 bg-red-500 max-w-full rounded-lg"
							style={{
								width: `calc( ${(player.minutes / (5 * 90)) * 100}%)`,
							}}></div>
						<div className="flex flex-col w-full items-center p-1 gap-1 leading-tight z-10">
							<div className="justify-between items-center flex w-full font-mono text-xs">
								<p>mins</p>
								<p className="font-bold">{player.minutes}</p>
							</div>

							{player.element_type == 1 ? (
								<div className="justify-between items-center flex w-full font-mono text-xs">
									<p>saves</p>
									<p className="font-bold">{player.saves}</p>
								</div>
							) : (
								""
							)}

							{player.element_type != 1 ? (
								<div className="justify-between items-center flex w-full font-mono text-xs">
									<p>xg/90</p>
									<p className="font-bold">
										{player.expected_goal_involvements_per_90}
									</p>
								</div>
							) : (
								""
							)}
							{player.element_type != 1 ? (
								<div className="justify-between items-center flex w-full font-mono text-xs">
									<p>xgi</p>
									<p className="font-bold">
										{player.expected_goal_involvements}
									</p>
								</div>
							) : (
								""
							)}
							{player.element_type < 3 ? (
								<div className="justify-between items-center flex w-full font-mono text-xs">
									<p>xgc</p>
									<p className="font-bold">{player.expected_goals_conceded}</p>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
