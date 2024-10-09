"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardPlayer from "./widgets/CardPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faListAlt } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { fetchEvents, getFinishedEventIds } from "@/utils";

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
	slug: number;
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
	const [priceFilter, setPriceFilter] = useState<{
		min: number;
		max: number;
	} | null>(null);
	const [viewFormat, setViewFormat] = useState<"card" | "list">("card");

	// Helper function to generate price ranges from 4.0 to 15.5
	const generatePriceRanges = (
		minPrice: number,
		maxPrice: number,
		step: number
	) => {
		let ranges = [];
		for (let i = minPrice; i <= maxPrice; i += step) {
			const min = parseFloat(i.toFixed(1));
			const max = parseFloat((i + step - 0.1).toFixed(1));
			ranges.push({ min, max });
		}
		return ranges;
	};
	const priceRanges = generatePriceRanges(4.0, 15, 2); // Generate price ranges between 4.0 and 15.5

	let filteredPlayers = players.filter((player) => {
		// Ensure the slug property is greater than 0
		if (player[slug] <= 0) return false;

		// Filter based on position
		if (filter) {
			if (filter === "gk" && player.element_type !== 1) return false;
			if (filter === "df" && player.element_type !== 2) return false;
			if (filter === "md" && player.element_type !== 3) return false;
			if (filter === "fw" && player.element_type !== 4) return false;
		}

		// Filter based on price range (player.now_cost is in 0.1 increments, so 4.0 becomes 40)
		if (priceFilter !== null) {
			const playerPrice = player.now_cost / 10; // Convert to decimal price
			if (playerPrice < priceFilter.min || playerPrice > priceFilter.max) {
				return false;
			}
		}

		return true;
	});

	filteredPlayers.sort((a, b) => b[slug] - a[slug]);

	// Toggle the price filter on and off
	const handlePriceClick = (min: number, max: number) => {
		if (priceFilter?.min === min && priceFilter?.max === max) {
			// If the same price filter is clicked, reset it
			setPriceFilter(null);
		} else {
			// Otherwise, set the new price filter
			setPriceFilter({ min, max });
		}
	};

	// Render players in card format
	const renderCardView = () => (
		<div className="grid grid-cols-6 gap-4">
			{filteredPlayers.slice(0, 21).map((player: Player) => (
				<CardPlayer
					key={player.id}
					teamName="teamName"
					player={player}
				/>
			))}
		</div>
	);

	// Render players in list format
	const renderListView = () => (
		<div className="">
			<div className="border-b py-2 flex justify-between">
				<div className="flex gap-4 items-center ">
					<div className="font-mono text-xs w-8 text-center">$</div>
				</div>
				<div className="flex gap-3">
					<div className="font-mono text-xs w-12 text-center">starts</div>
					<div className="font-mono text-xs w-12 text-center">mins</div>
					<div className="font-mono text-xs w-12 text-center">value</div>
				</div>
			</div>
			<div className="flex flex-col">
				{filteredPlayers.slice(0, 21).map((player: Player) => (
					<div
						key={player.id}
						className="border-b py-2 flex justify-between">
						<div className="flex gap-4 items-center ">
							<div className="font-mono text-xs w-8 text-center">
								{(player.now_cost / 10).toFixed(1)}
							</div>
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
							<div className="flex flex-col">
								<div className="font-semibold">{player.web_name}</div>
								<div className="text-xs">{positions[player.element_type]}</div>
							</div>
						</div>
						<div className="flex gap-4 items-center">
							<div className="font-mono text-lg w-12 text-center">
								{player.starts}
							</div>
							<div className="font-mono text-lg w-12 text-center">
								{player.minutes}
							</div>
							<div className="font-mono text-lg w-12 text-center">
								{player[slug]}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-2xl">{slugTitle[slug]}</h1>
			<div className="flex flex-wrap justify-between">
				<div className="flex gap-4 mb-4">
					<Button
						onClick={() => setFilter(filter === "gk" ? null : "gk")}
						className={filter === "gk" ? "bg-red-300" : ""}>
						Goalkeeper
					</Button>
					<Button
						onClick={() => setFilter(filter === "df" ? null : "df")}
						className={filter === "df" ? "bg-red-300" : ""}>
						Defenders
					</Button>
					<Button
						onClick={() => setFilter(filter === "md" ? null : "md")}
						className={filter === "md" ? "bg-red-300" : ""}>
						Midfielders
					</Button>
					<Button
						onClick={() => setFilter(filter === "fw" ? null : "fw")}
						className={filter === "fw" ? "bg-red-300" : ""}>
						Forwards
					</Button>
				</div>

				<div className="flex gap-4 flex-wrap">
					{/* Loop through generated price ranges */}
					{priceRanges.map(({ min, max }) => (
						<Button
							key={`${min}-${max}`}
							onClick={() => handlePriceClick(min, max)}
							className={
								priceFilter?.min === min && priceFilter?.max === max
									? "bg-red-300"
									: ""
							}>
							{min === max ? `${min}` : `${min}`}
						</Button>
					))}
					{/* <Button onClick={() => setPriceFilter(null)}>Reset Price</Button> */}
				</div>
			</div>
			{/* Toggle buttons for layout */}
			<div className="flex gap-4 self-end">
				<div
					className=" flex gap-2 items-center justify-center h-12 p-2"
					onClick={() => setViewFormat("card")}>
					<FontAwesomeIcon
						className=""
						icon={faIdCard}
					/>
					<div className="text-xs">Card View</div>
				</div>
				<div
					className=" flex gap-2 items-center justify-center h-12 p-2"
					onClick={() => setViewFormat("list")}>
					<FontAwesomeIcon
						className=""
						icon={faListAlt}
					/>
					<div className="text-xs">List View</div>
				</div>
			</div>

			{/* Conditionally render the view */}
			{viewFormat === "card" ? renderCardView() : renderListView()}
		</div>
	);
};

export default FilterComponent;
