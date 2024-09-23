import CardPlayer from "@/components/widgets/CardPlayer";
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

	function getPlayersByTeamCode(teamCode: number): Player[] {
		return players.filter(
			(player: Player) => player.team_code === teamCode && player.status == "a"
		);
	}

	return (
		<div className="grid grid-cols-5">
			{filteredPlayers.map((player: Player) => (
				<CardPlayer
					key={player.id}
					teamName="teamName"
					player={player}
				/>
			))}
		</div>
	);
}
