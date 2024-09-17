import Link from "next/link";

export default function Sidebar() {
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
				</div>
				<div>
					<div className="text-lg">Stats</div>
					<div className="pl-2 flex flex-col">
						<Link href="/charts/goals_scored">Goals</Link>
						<Link href="/charts/assists">Assists</Link>
						<Link href="/charts/saves">Saves</Link>
						<Link href="/charts/bps">Bonus Points</Link>
						<Link href="/charts/points_per_game">Points Per Game</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
