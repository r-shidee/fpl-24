"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardPlayer from "./widgets/CardPlayer";

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

const slugTitle: { [key: string]: string } = {
	goals_scored: "Goals",
	assists: "Assists",
	bps: "Bonus Points System",
	points_per_game: "Points Per Game",
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
			<h1 className="text-2xl">{slugTitle[slug]}</h1>

			{/* Filter Buttons */}
			<div className="flex gap-4 mb-4">
				<Button onClick={() => setFilter("gk")}>Goalkeeper</Button>
				<Button onClick={() => setFilter("df")}>Defenders</Button>
				<Button onClick={() => setFilter("md")}>Midfielders</Button>
				<Button onClick={() => setFilter("fw")}>Forwards</Button>
				<Button onClick={() => setFilter("null")}>Reset</Button>
			</div>

			{/* Players List */}
			<div className="grid grid-cols-6 gap-4">
				{filteredPlayers.map((player: Player) => (
					<CardPlayer
						key={player.id}
						teamName="teamName"
						player={player}
					/>
				))}
			</div>
		</div>
	);
};

export default FilterComponent;
