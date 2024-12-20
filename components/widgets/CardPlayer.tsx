import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleDot,
	faCircleXmark,
	faClock,
	faFutbol,
	faHand,
	faHospital,
	faMeh,
	faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { getFixtures } from "@/utils";
import Fixtures from "./Fixtures";
import { Player } from "@/types/Player";

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
	minutes,
	position,
}: {
	minutes: number;
	goals: number;
	assists: number;
	saves: number;
	position: number;
}) => {
	return (
		<div className="flex flex-wrap px-1 gap-2 items-center">
			<div className="flex flex-col flex-wrap gap-1 align-baseline">
				<div className="flex items-center gap-1">
					<FontAwesomeIcon
						className="w-3 h-3 "
						icon={faClock}
					/>
					<span className="text-xs">{minutes}</span>
				</div>
			</div>
			{position === 1 ? (
				<div className="flex items-center gap-1">
					<FontAwesomeIcon
						className="w-3 h-3 "
						icon={faHand}
					/>
					<span className="text-xs">{saves}</span>
				</div>
			) : (
				<div className="flex flex-col flex-wrap gap-1">
					<div className="flex items-center gap-1">
						<FontAwesomeIcon
							className="w-3 h-3 "
							icon={faFutbol}
						/>
						<span className="text-xs">{goals}</span>
					</div>
				</div>
			)}
			<div className="flex flex-col flex-wrap gap-1 align-baseline">
				<div className="flex items-center gap-1">
					<FontAwesomeIcon
						className="w-3 h-3 "
						icon={faCircleDot}
					/>
					<span className="text-xs">{assists}</span>
				</div>
			</div>
		</div>
	);
};

export default function CardPlayer({
	player,
	teamName,
	highlightValue,
}: {
	player: Player;
	teamName: string;
	highlightValue?: string;
}) {
	return (
		<div
			key={player.id}
			className=" hover:bg-slate-900 rounded group "
		>
			<Link href={`/player/${player.id}`}>
				<div className="grid relative gap-2">
					<div
						className={`rounded relative overflow-hidden aspect-square flex ease-in-out items-center club--${
							teams[player.team]
						} `}
					>
						<Image
							className="object-cover absolute bottom-0 w-full group-hover:z-0 group-hover:scale-95 z-10 top-8 -left-4"
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={250}
							height={250}
						/>

						<div className="absolute right-0 top-0 p-2">
							{highlightValue ? (
								<div className="font-mono text-2xl leading-none inline-flex text-shadow-md">
									{highlightValue}
								</div>
							) : (
								""
							)}
						</div>
						<div className="absolute left-0 top-0 p-2">
							{player.status === "i" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-red text-white rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3 "
										icon={faPlusSquare}
									/>
								</div>
							) : (
								""
							)}
							{player.status === "s" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-red text-white rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3 "
										icon={faCircleXmark}
									/>
								</div>
							) : (
								""
							)}
							{player.status === "d" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-yellow text-black rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3 "
										icon={faMeh}
									/>
								</div>
							) : (
								""
							)}
						</div>

						<div className="absolute bottom-0">
							{player.element_type === 1 && player.minutes <= 180 && (
								<div className="w-fit justify-between items-center flex font-mono text-xs bg-bauhaus-yellow text-black px-2 py-1 rounded-sm">
									Backup
								</div>
							)}
						</div>

						<div className="absolute bottom-0 left-0 p-1 flex gap-1 justify-center z-20 flex-col">
							{player.penalties_order ? (
								<div className="w-fit justify-between items-center flex font-mono text-xs bg-bauhaus-blue text-white px-2 py-1 rounded-sm">
									PK-{player.penalties_order}
								</div>
							) : (
								""
							)}
						</div>
					</div>
					<RenderDivs
						minutes={player.minutes}
						goals={player.goals_scored}
						assists={player.assists}
						saves={player.saves}
						position={player.element_type}
					/>

					{/* <div className={` text-slate-500 p-2`}>
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
					</div> */}
					<div className="flex relative gap-2 items-center">
						{/* <Image
							src={
								"https://resources.premierleague.com/premierleague/badges/rb/t" +
								player.team_code +
								".svg"
							}
							width={32}
							height={32}
							alt={player.team_code.toString()}
							className=" h-8 w-8 "
						/> */}
						<div className="flex flex-col leading-tight w-full">
							<div className="flex flex-wrap justify-between">
								<p className="text-sm">{player.web_name}</p>
							</div>
							<p className=" text-gray-400 text-xs font-light">
								{positions[player.element_type]}
							</p>
						</div>
						<div
							className={` w-12 h-12 flex justify-end pt-2 pr-2 rounded-bl-full absolute right-0 text-sm `}
						>
							{(player.now_cost / 10).toFixed(1)}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
