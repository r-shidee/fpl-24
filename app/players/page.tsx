import { Player, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Player[]> {
	// Fetch data from your API here.
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
export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={data}
			/>
		</div>
	);
}
