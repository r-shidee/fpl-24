"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardPlayer from "./widgets/CardPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faListAlt } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { Player } from "@/types/Player";
import { Link } from "next-view-transitions";
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
	slug?: string;
	filtering?: boolean;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
	players,
	slug,
	filtering,
}) => {
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
	const priceRanges = generatePriceRanges(4.0, 15, 1); // Generate price ranges between 4.0 and 15.5

	let filteredPlayers = players.filter((player) => {
		// Ensure the slug property is greater than 0
		if (player[slug] <= 0) return false;
		if (player.minutes == 0) return false;

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
		<div className="grid grid-cols-2 lg:grid-cols-8 gap-4">
			{/* {filteredPlayers.slice(0, 21).map((player: Player) => ( */}
			{filteredPlayers.map((player: Player) => (
				<CardPlayer
					key={player.id}
					teamName="teamName"
					player={player}
					highlightValue={player[slug]}
				/>
			))}
		</div>
	);

	// Render players in list format
	const renderListView = () => (
		<div className="">
			<div className="border-b py-2 flex justify-between">
				<div className="flex gap-4 items-center ">
					{/* <div className="font-mono text-xs w-8 text-center">$</div> */}
				</div>
				{/* <div className="flex gap-3">
					<div className="font-mono text-xs w-12 text-center">starts</div>
					<div className="font-mono text-xs w-12 text-center">mins</div>
					<div className="font-mono text-xs w-12 text-center">value</div>
				</div> */}
			</div>
			<div className="flex flex-col">
				{filteredPlayers.slice(0, 21).map((player: Player) => (
					<div
						key={player.id}
						className="border-b py-2 flex justify-between">
						<div className="flex gap-4 items-center ">
							{/* <div className="font-mono text-xs w-8 text-center">
								{(player.now_cost / 10).toFixed(1)}
							</div> */}
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
								<Link href={`/player/${player.id}`}>
									<div className="font-semibold">{player.web_name}</div>
								</Link>
								<div className="flex gap-1 text-xs font-light text-gray-400">
									<div>{positions[player.element_type]}</div>
									<div>{(player.now_cost / 10).toFixed(1)}</div>
								</div>
							</div>
						</div>
						<div className="flex gap-4 items-center">
							{/* <div className="font-mono text-lg w-12 text-center">
								{player.starts}
							</div>
							<div className="font-mono text-lg w-12 text-center">
								{player.minutes}
							</div> */}
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
		<div className="flex flex-col gap-5 relative">
			<div className="flex justify-between">
				<div className="flex gap-4 self-end">
					<div
						className=" flex gap-2 items-center justify-center h-12 p-2"
						onClick={() => setViewFormat("card")}>
						<FontAwesomeIcon
							className="w-4 h-4"
							icon={faIdCard}
						/>
						<div className="text-xs">Card View</div>
					</div>
					<div
						className=" flex gap-2 items-center justify-center h-12 p-2"
						onClick={() => setViewFormat("list")}>
						<FontAwesomeIcon
							className="w-4 h-4"
							icon={faListAlt}
						/>
						<div className="text-xs">List View</div>
					</div>
				</div>
			</div>

			<div className="h-[72dvh] overflow-scroll pb-[80px]">
				{viewFormat === "card" ? renderCardView() : renderListView()}
			</div>

			<div className="overflow-hidden absolute w-full bottom-0 left-0 right-0 flex flex-wrap justify-between bg-black bg-opacity-30 z-30">
				<div className="flex flex-col">
					Filter
					<div className="flex gap-2 mb-2 overflow-scroll">
						<Button
							onClick={() => setFilter(filter === "gk" ? null : "gk")}
							className={filter === "gk" ? "bg-red-300" : ""}>
							GKP
						</Button>
						<Button
							onClick={() => setFilter(filter === "df" ? null : "df")}
							className={filter === "df" ? "bg-red-300" : ""}>
							DEF
						</Button>
						<Button
							onClick={() => setFilter(filter === "md" ? null : "md")}
							className={filter === "md" ? "bg-red-300" : ""}>
							MID
						</Button>
						<Button
							onClick={() => setFilter(filter === "fw" ? null : "fw")}
							className={filter === "fw" ? "bg-red-300" : ""}>
							FOR
						</Button>
					</div>
				</div>

				{filtering && (
					<div className="flex gap-1 py-2 items-center overflow-scroll">
						{/* Loop through generated price ranges */}
						{priceRanges.map(({ min, max }) => (
							<div
								key={`${min}-${max}`}
								onClick={() => handlePriceClick(min, max)}
								className={`" p-2 border rounded w-8 h-8 flex justify-center items-center text-xs "+ ${
									priceFilter?.min === min && priceFilter?.max === max
										? "bg-green-300 text-black"
										: "bg-white text-black"
								}`}>
								{min === max ? `${min}` : `${min}`}
							</div>
						))}
						{/* <Button onClick={() => setPriceFilter(null)}>Reset Price</Button> */}
					</div>
				)}
			</div>
		</div>
	);
};

export default FilterComponent;
