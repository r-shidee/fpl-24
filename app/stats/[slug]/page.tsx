import FilterComponent from "@/components/FilterComponent";
import { Player } from "@/types/Player";

async function getData(): Promise<Player[]> {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/",
		{
			cache: "no-store",
		}
	);
	let allData = await data.json();
	let players = allData.elements;

	return players;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const players = await getData();

	return (
		<div className="">
			<FilterComponent
				players={players}
				slug={params.slug}
			/>
		</div>
	);
}
