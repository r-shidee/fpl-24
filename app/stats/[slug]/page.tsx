import FilterComponent from "@/components/FilterComponent";
import { Player } from "@/types/Player";

async function getData(): Promise<Player[]> {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;

	return players;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const players = await getData();

	return (
		<div className="">
			<div className="py-8 text-4xl font-bold capitalize">
				{params.slug.replaceAll("_", " ")}
			</div>
			<FilterComponent
				players={players}
				slug={params.slug}
				filtering={true}
			/>
		</div>
	);
}
