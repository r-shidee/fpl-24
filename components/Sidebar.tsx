import Link from "next/link";
import Image from "next/image";

import { fetchTeams } from "@/utils";

export default async function Sidebar() {
	const teams = await fetchTeams();

	return (
		<div
			className="sidebar--left w-[200px] rounded-lg bg-slate-900
        ">
			<nav className="gap-2 p-4 h-12 flex flex-col">
				<div>
					<Link
						href="/player"
						className="text-lg">
						Players
					</Link>
				</div>
				<div>
					<Link
						href="/teams"
						className="text-lg">
						Teams
					</Link>
					<div className="grid grid-cols-4 gap-2 mt-2">
						{teams.map((team) => (
							<Link
								href={"/teams/" + team.short_name.toLowerCase()}
								key={team.id}
								className={` relative flex justify-between items-center`}>
								<Image
									key={team.id}
									src={
										"https://resources.premierleague.com/premierleague/badges/rb/t" +
										team.code +
										".svg"
									}
									width={20}
									height={20}
									alt={"club"}
									className="w-5 h-5"
								/>
							</Link>
						))}
					</div>
				</div>
				<div>
					<div className="text-lg">
						<Link href="/stats">Stats</Link>
					</div>
					<div className="pl-2 flex flex-col">
						<Link href="/stats/goals_scored">Goals</Link>
						<Link href="/stats/assists">Assists</Link>
						<Link href="/stats/saves">Saves</Link>
						<Link href="/stats/bps">Bonus Points</Link>
						<Link href="/stats/points_per_game">Points Per Game</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
