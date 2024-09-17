import ChartStats from "@/components/widgets/ChartStats";
import { fetchPlayers, fetchTeams } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type Player = {
	id: number;
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

export default async function Page({
	params: { teamName },
}: {
	params: { teamName: string };
}) {
	const teams = await fetchTeams();
	const team = teams.find(
		(team) => team.short_name.toLowerCase() === teamName.toLowerCase()
	);

	if (!team) {
		return <div>Team not found</div>;
	}
	return (
		<>
			<div
				className={`club--${team.short_name.toLowerCase()} p-5 relative flex flex-col-reverse  md:flex-row justify-between items-center `}>
				<div className="mt-auto">
					<h1 className="text-4xl font-semibold">{team.name}</h1>
					<p>Upcoming Match :</p>
				</div>
				<div>
					<Image
						key={team.id}
						src={
							"https://resources.premierleague.com/premierleague/badges/rb/t" +
							team.code +
							".svg"
						}
						width={160}
						height={160}
						alt={"club"}
					/>
				</div>
			</div>
			<div className="p-5 mt-4">
				<h2 className="text-2xl font-semibold">Players</h2>
				<Players
					teamCode={team.code}
					teamName={team.short_name}
				/>
			</div>
		</>
	);
}

async function Players({
	teamCode,
	teamName,
}: {
	teamCode: number;
	teamName: string;
}) {
	const players = await fetchPlayers();
	const filteredPlayers = getPlayersByTeamCode(teamCode);
	filteredPlayers.sort(
		(a, b) =>
			b.expected_goal_involvements_per_90 - a.expected_goal_involvements_per_90
	);
	filteredPlayers.sort((a, b) => b.now_cost - a.now_cost);

	const positions: { [key: number]: string } = {
		1: "Goalkeeper",
		2: "Defender",
		3: "Midfielder",
		4: "Forward",
	};

	function getPlayersByTeamCode(teamCode: number): Player[] {
		return players.filter(
			(player: Player) => player.team_code === teamCode && player.status == "a"
		);
	}

	return (
		<div className="grid grid-cols-5">
			{filteredPlayers.map((player: Player) => (
				<div
					key={player.id}
					className="p-3 hover:bg-slate-900 rounded group">
					<Link href={`/player/${player.id}`}>
						<div className="flex flex-col gap-2 aspect-[2/1]">
							<div className="grid relative">
								<div
									className={`rounded relative overflow-hidden flex ease-in-out group-hover:bg-none items-center club--${teamName.toLowerCase()} `}>
									<Image
										src={
											"https://resources.premierleague.com/premierleague/badges/rb/t" +
											player.team_code +
											".svg"
										}
										width={20}
										height={20}
										alt={player.team_code.toString()}
										className="absolute top-1 left-1 h-5 w-5 "
									/>
									<div className=" absolute top-1 right-1 leading-tight">
										<p className="text-xs">
											${(player.now_cost / 10).toFixed(1)}
										</p>
									</div>
									<div className=" absolute bottom-0 left-0 grid grid-cols-2  gap-1 w-full leading-tight z-10">
										<div className="p-2 rounded-lg bg-sky-900/70">
											<p className="text-xs">Minutes</p>
											<p>{player.minutes}</p>
										</div>
										{player.element_type == 1 ? (
											<div className="p-2 rounded-lg  bg-slate-900/50">
												<p className="text-xs">Saves</p>
												<p>{player.saves}</p>
											</div>
										) : (
											""
										)}
										{player.element_type != 1 ? (
											<div className="p-2 rounded-lg  bg-slate-900/50">
												<p className="text-xs">Goals</p>
												<p>{player.goals_scored}</p>
											</div>
										) : (
											""
										)}
										{player.element_type != 1 ? (
											<div className="p-2 rounded-lg  bg-slate-900/50">
												<p className="text-xs">Assist</p>
												<p>{player.assists}</p>
											</div>
										) : (
											""
										)}
										{player.element_type != 1 ? (
											<div className="p-2 rounded-lg  bg-slate-900/50">
												<p className="text-xs">xgi/90</p>
												<p>{player.expected_goal_involvements_per_90}</p>
											</div>
										) : (
											""
										)}
									</div>
									<Image
										className="object-cover group-hover:scale-105 w-full group-hover:z-0 h-[240px]"
										src={
											"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
											player.photo.replace("jpg", "png")
										}
										alt={player.web_name}
										width={200}
										height={120}
									/>
								</div>
							</div>
							<div className="flex flex-col leading-tight">
								<p className="font-bold">{player.web_name}</p>
								<p className=" text-gray-400 text-sm">
									{positions[player.element_type]}
								</p>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
}
