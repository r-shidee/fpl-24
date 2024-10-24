"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardPlayer from "./widgets/CardPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faListAlt } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { Player } from "@/types/Player";
import { Link } from "next-view-transitions";
import { Slider } from "@/components/ui/slider";

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
		// Ensure slug is defined and the property is greater than 0
		if (!slug || player[slug as keyof Player] == 0) return false;
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

	filteredPlayers.sort((a, b) => {
		const aValue = Number(a[slug as keyof Player]) || 0;
		const bValue = Number(b[slug as keyof Player]) || 0;
		return bValue - aValue;
	});

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
					highlightValue={(player[slug as keyof Player] ?? "").toString()}
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
				{filteredPlayers.slice(0, 21).map((player: Player, index: number) => (
					<div
						key={player.id}
						className="border-b py-2 flex justify-between"
					>
						<div className="flex gap-4 items-center ">
							<div className="font-mono w-8 text-center">{index + 1}</div>
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
								{player[slug as keyof Player]}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-5 relative">
			<div className="flex flex-wrap">
				<div className="overflow-hidden  w-full flex flex-col lg:flex-row flex-wrap gap-4 bg-black bg-opacity-30 z-30 p-2">
					<div className="flex flex-col gap-1">
						Filter by Position
						<div className="flex gap-2 mb-2 overflow-scroll">
							<div
								onClick={() => setFilter(filter === "gk" ? null : "gk")}
								className={`${
									filter === "gk" ? "bg-red-300" : ""
								} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
							>
								GKP
							</div>
							<div
								onClick={() => setFilter(filter === "df" ? null : "df")}
								className={`${
									filter === "df" ? "bg-red-300" : ""
								} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
							>
								DEF
							</div>
							<div
								onClick={() => setFilter(filter === "md" ? null : "md")}
								className={`${
									filter === "md" ? "bg-red-300" : ""
								} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
							>
								MID
							</div>
							<div
								onClick={() => setFilter(filter === "fw" ? null : "fw")}
								className={`${
									filter === "fw" ? "bg-red-300" : ""
								} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
							>
								FOR
							</div>
						</div>
					</div>

					{filtering && (
						<div className="lg:w-1/3 flex flex-col gap-2">
							<p>Filter by Pricing</p>
							<div className="flex gap-2 items-center">
								<div className="">4</div>
								<div className="w-full">
									<Slider
										className=""
										defaultValue={[40, 150]}
										min={40}
										max={150}
										step={5}
										minStepsBetweenThumbs={5}
									/>
								</div>

								<div className="">15</div>
							</div>
						</div>
					)}
				</div>
				<div className="flex gap-4 self-end">
					<div
						className=" flex gap-2 items-center justify-center h-12 p-2"
						onClick={() => setViewFormat("card")}
					>
						<FontAwesomeIcon
							className="w-4 h-4"
							icon={faIdCard}
						/>
						<div className="text-xs">Card View</div>
					</div>
					<div
						className=" flex gap-2 items-center justify-center h-12 p-2"
						onClick={() => setViewFormat("list")}
					>
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
		</div>
	);
};

export default FilterComponent;
