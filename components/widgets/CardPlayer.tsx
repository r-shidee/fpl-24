import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleDot,
	faFutbol,
	faHand,
} from "@fortawesome/free-regular-svg-icons";

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
	expected_goal_involvements_per_90: number;
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
		<div className="flex justify-between flex-wrap gap-1">
			<div className="flex flex-wrap gap-1">
				{Array.from({ length: goals }, (_, index) => (
					<FontAwesomeIcon
						className="w-3 h-3 text-white"
						key={index}
						icon={faFutbol}
					/>
				))}
			</div>
			<div className="flex flex-wrap gap-1 align-baseline">
				{Array.from({ length: assists }, (_, index) => (
					<FontAwesomeIcon
						className="w-3 h-3 text-white"
						key={index}
						icon={faCircleDot}
					/>
				))}
			</div>
			{position === 1 ? (
				<div className="flex flex-wrap gap-1">
					{Array.from({ length: saves }, (_, index) => (
						<FontAwesomeIcon
							className="w-3 h-3 text-white"
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

export default function CardPlayer({
	player,
	teamName,
}: {
	player: Player;
	teamName: string;
}) {
	return (
		<div
			key={player.id}
			className="p-3 hover:bg-slate-900 rounded group border">
			<Link href={`/player/${player.id}`}>
				<div className="grid relative gap-2">
					<div className="flex relative gap-2 items-center">
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
								{(player.now_cost / 10).toFixed(1)}
							</div>
							<p className=" text-gray-400 text-sm">
								{positions[player.element_type]}
							</p>
						</div>
					</div>

					<div
						className={`rounded relative overflow-hidden flex ease-in-out group-hover:bg-none items-center club--${
							teams[player.team]
						} `}>
						<div className=" absolute top-2 left-2 right-1 leading-tight">
							<div>
								<RenderDivs
									goals={player.goals_scored}
									assists={player.assists}
									saves={player.saves}
									position={player.element_type}
								/>
							</div>
						</div>

						<Image
							className="object-cover group-hover:scale-105 w-full group-hover:z-0 h-[300px]"
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={250}
							height={250}
						/>
					</div>
				</div>

				<div
					className="h-1 bg-red-500"
					style={{
						width: `calc( ${(player.minutes / (5 * 90)) * 100}%)`,
					}}></div>

				<div className="relative">
					<div className="flex w-full items-center p-1 gap-1 leading-tight z-10">
						<div className="p-2 rounded-lg">
							<p className="text-xs">Mins / {player.minutes}</p>
						</div>
						{player.element_type == 1 ? (
							<div className="p-1 rounded-lg  bg-sky-100/70 text-black">
								<p className="text-xs">Saves /{player.saves}</p>
							</div>
						) : (
							""
						)}

						{player.element_type != 1 ? (
							<div className="p-1 rounded-lg  bg-sky-100/70 text-black">
								<p className="text-xs">
									xgi per 90 / {player.expected_goal_involvements_per_90}
								</p>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</Link>
		</div>
	);
}
