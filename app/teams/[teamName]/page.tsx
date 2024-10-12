import CardPlayer from "@/components/widgets/CardPlayer";
import { fetchPlayers, fetchTeams } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Player } from '@/types/Player';

type Fixture = any; // Replace 'any' with the actual fixture type

type Props = {
	players: Player[];
	paramsID: string;
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
		<div>
			<div
				className={`club--${team.short_name.toLowerCase()} p-5 relative flex flex-col-reverse  md:flex-row justify-between `}>
				<div>
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
		</div>
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
	// filteredPlayers.sort((a, b) => b.now_cost - a.now_cost);

	function getPlayersByTeamCode(teamCode: number): Player[] {
		return players.filter(
			(player: Player) => player.team_code === teamCode && player.status == "a"
		);
	}

	function getPlayersByPosition(position: number): Player[] {
		return filteredPlayers.filter(
			(player: Player) => player.element_type === position
		);
	}

	const gks = getPlayersByPosition(1);
	const def = getPlayersByPosition(2);
	const mid = getPlayersByPosition(3);
	const fwd = getPlayersByPosition(4);

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h2 className="mb-2">Forwards</h2>
				<div className="grid grid-cols-6 gap-4">
					{fwd.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teamName="teamName"
							player={player}
						/>
					))}
				</div>
			</div>
			<div>
				<h2 className="mb-2">Midfielders</h2>
				<div className="grid grid-cols-6 gap-4">
					{mid.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teamName="teamName"
							player={player}
						/>
					))}
				</div>
			</div>
			<div>
				<h2 className="mb-2">Defenders</h2>
				<div className="grid grid-cols-6 gap-4">
					{def.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teamName="teamName"
							player={player}
						/>
					))}
				</div>{" "}
			</div>
			<div>
				<h2 className="mb-2">Goalkeepers</h2>
				<div className="grid grid-cols-6 gap-4">
					{gks.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teamName="teamName"
							player={player}
						/>
					))}
				</div>{" "}
			</div>
		</div>
	);
}

// 1. passing teamID from page param eg. 'ars'
// 2 . convert to Uppercase
// 3. find all players with team
