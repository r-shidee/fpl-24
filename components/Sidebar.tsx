import Link from "next/link";
import Image from "next/image";

import { fetchTeams } from "@/utils";

export default async function Sidebar() {
	const teams = await fetchTeams();

	const links = [
		{
			label: "Goals",
			url: "/goals_scored",
			icon: "sports_soccer",
		},
		{
			label: "Assists",
			url: "/assists",
			icon: "handshake",
		},
		{
			label: "Saves",
			url: "/saves",
			icon: "front_hand",
		},
		{
			label: "Bonus Points",
			url: "/bps",
			icon: "bolt",
		},
	];

	return (
		<div className="sidebar--left p-1">
			<nav className="gap-2 p-3 flex flex-col rounded-lg bg-slate-900">
				<div>
					<Link
						href="/player"
						className="text-lg">
						Players
					</Link>
				</div>

				<div>
					<div className="text-lg">
						<Link href="/stats">Stats</Link>
					</div>
					<div className="flex flex-col">
						{links?.map((link, index) => (
							<Link
								href={`/stats` + link.url}
								key={index}>
								<div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800">
									<div className="aspect-square rounded border flex items-center justify-center w-12 h-12 bg-bauhaus-blue">
										<span className="material-symbols-outlined">
											{link.icon}
										</span>
									</div>
									<span className="text-sm font-mono">{link.label}</span>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div>
					{/* <Link
						href="/teams"
						className="text-lg">
						Teams
					</Link> */}
					<div className="grid grid-cols-4 gap-2 p-2">
						{teams.map((team) => (
							<Link
								href={"/teams/" + team.short_name.toLowerCase()}
								key={team.id}
								className={`club--${team.short_name.toLowerCase()} relative flex justify-center items-center aspect-square w-12 h-12 rounded `}>
								<Image
									key={team.id}
									src={
										"https://resources.premierleague.com/premierleague/badges/rb/t" +
										team.code +
										".svg"
									}
									width={40}
									height={40}
									alt={"club"}
									className="w-8 h-8"
								/>
							</Link>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}
