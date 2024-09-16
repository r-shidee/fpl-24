import React from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchTeams } from "@/utils";

// Define the Team type
interface Team {
	id: number;
	name: string;
}

export default async function Navbar() {
	const teams: Team[] = await fetchTeams();

	return (
		<nav className="border-b">
			<Link href="/">Home</Link>
			<Link href="/player">Players</Link>
			<div className="flex gap-2">
				{teams.map((team) => (
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
						className="h-5 w-5"
					/>
				))}
			</div>
		</nav>
	);
}
