export default async function Page() {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;

	return (
		<ul>
			{players.map((player: { id: number; web_name: string }) => (
				<li key={player.id}>{player.web_name}</li>
			))}
		</ul>
	);
}
