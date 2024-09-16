import { fetchPlayers } from "@/utils";

type Player = {
	id: number;
	web_name: string;
};
export default async function Page() {
	const players = await fetchPlayers();

	return (
		<ul>
			{players.map((player: Player) => (
				<li key={player.id}>{player.web_name}</li>
			))}
		</ul>
	);
}
