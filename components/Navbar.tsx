import React from "react";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="border-b">
			<Link href="/">Home</Link>
			<Link href="/player">Players</Link>
		</nav>
	);
}
