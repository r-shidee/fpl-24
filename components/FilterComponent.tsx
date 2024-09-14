"use client"; // Indicates that this is a client component
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const clubClasses: { [key: number]: string } = {
	1: "bg-gradient-to-tr from-clubs-ars",
	2: "bg-gradient-to-tr from-clubs-avl",
	3: "bg-gradient-to-tr from-clubs-bou",
	4: "bg-gradient-to-tr from-clubs-bre",
	5: "bg-gradient-to-tr from-clubs-bha",
	6: "bg-gradient-to-tr from-clubs-che",
	7: "bg-gradient-to-tr from-clubs-cry",
	8: "bg-gradient-to-tr from-clubs-eve",
	9: "bg-gradient-to-tr from-clubs-ful",
	10: "bg-gradient-to-tr from-clubs-ips",
	11: "bg-gradient-to-tr from-clubs-lei",
	12: "bg-gradient-to-tr from-clubs-liv",
	13: "bg-gradient-to-tr from-clubs-mci",
	14: "bg-gradient-to-tr from-clubs-mun",
	15: "bg-gradient-to-tr from-clubs-new",
	16: "bg-gradient-to-tr from-clubs-nfo",
	17: "bg-gradient-to-tr from-clubs-sou",
	18: "bg-gradient-to-tr from-clubs-tot",
	19: "bg-gradient-to-tr from-clubs-whu",
	20: "bg-gradient-to-tr from-clubs-wol",
};

const positions: { [key: number]: string } = {
	1: "Goalkeeper",
	2: "Defender",
	3: "Midfielder",
	4: "Forward",
};

type Player = {
	id: number;
	web_name: string;
	team: number;
	team_code: number;
	element_type: number;
	now_cost: number;
	goals_scored: number;
	assists: number;
	expected_goal_involvements: number;
	minutes: number;
	status: string;
	photo: string;
	[key: string]: any; // For dynamic property access
};

type FilterComponentProps = {
	players: Player[];
	slug: string;
};

const FilterComponent: React.FC<FilterComponentProps> = ({ players, slug }) => {
	const [filter, setFilter] = useState<string | null>(null);

	let filteredPlayers = players.filter((player) => {
		if (player[slug] <= 0) return false;

		if (!filter) return true;
		if (filter === "gk") {
			return player.element_type == 1;
		} else if (filter === "df") {
			return player.element_type == 2;
		} else if (filter === "md") {
			return player.element_type == 3;
		} else if (filter === "fw") {
			return player.element_type == 4;
		}

		return true;
	});

	filteredPlayers.sort((a, b) => b[slug] - a[slug]);

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-2xl">{slug}</h1>

			{/* Filter Buttons */}
			<div className="flex gap-4 mb-4">
				<button
					onClick={() => setFilter("gk")}
					className="px-4 py-2 bg-blue-500 text-white rounded">
					GKP
				</button>
				<button
					onClick={() => setFilter("df")}
					className="px-4 py-2 bg-green-500 text-white rounded">
					DEF
				</button>
				<button
					onClick={() => setFilter("md")}
					className="px-4 py-2 bg-yellow-500 text-white rounded">
					MID
				</button>
				<button
					onClick={() => setFilter("fw")}
					className="px-4 py-2 bg-red-500 text-white rounded">
					FOR
				</button>
				<button
					onClick={() => setFilter(null)}
					className="px-4 py-2 bg-gray-500 text-white rounded">
					Reset Filter
				</button>
			</div>

			{/* Players List */}
			<div className="flex flex-wrap gap-4">
				{filteredPlayers.map((player) => (
					<div
						key={player.id}
						className="p-3 hover:bg-slate-900 rounded">
						<div className="flex flex-col gap-2">
							<div
								className={`rounded relative flex justify-between items-center ${
									clubClasses[player.team] || "bg-gray-200 text-black"
								}`}>
								<Image
									src={
										"https://resources.premierleague.com/premierleague/badges/rb/t" +
										player.team_code +
										".svg"
									}
									width={20}
									height={20}
									alt={player.team}
									className="absolute top-1 left-1 h-5 w-5 "
								/>
								<div className=" absolute top-1 right-1 leading-tight">
									<p className="text-xs">
										${(player.now_cost / 10).toFixed(1)}
									</p>
								</div>
								<Image
									className="object-cover"
									src={
										"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
										player.photo.replace("jpg", "png")
									}
									alt={player.web_name}
									width={120}
									height={120}
								/>
								<div className="absolute text-white  font-bold text-2xl w-full bottom-0 text-center bg-opacity-70 bg-slate-900 p-1 leading-none">
									{player[slug]}
								</div>
							</div>
							<div className="flex flex-col leading-tight">
								<Link href={`/player/${player.id}`}>
									<p className="font-bold">{player.web_name}</p>
								</Link>
								<p className=" text-gray-400 text-sm">
									{positions[player.element_type]}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilterComponent;
