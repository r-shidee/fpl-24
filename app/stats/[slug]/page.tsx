import FilterComponent from "@/components/FilterComponent";


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
		<div className="p-4">
			<FilterComponent
				players={players}
				slug={params.slug}
			/>
		</div>
	);
}
