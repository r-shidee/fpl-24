import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define the Team type
interface Team {
	id: number;
	code: number;
	name: string;
}

export default function Navbar() {
	return (
		<nav className="border-b">
			<Link href="/">Home</Link>
			<Link href="/player">Players</Link>
			<Link href="/teams">Teams</Link>
		</nav>
	);
}
