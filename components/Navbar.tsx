"use client";
import { useState } from "react";
import Link from "next/link";


export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<nav className="navbar navbar--main">
			<div className="border-b items-center justify-between gap-4 p-4 h-12 flex">
				<Link href="/">Home</Link>
				<button
					className={`header__toggle ${
						isMenuOpen ? "header__toggle--open" : ""
					}`}
					onClick={toggleMenu}
					aria-label="Toggle menu">
					aaa
					<span className="header__toggle-bar"></span>
					<span className="header__toggle-bar"></span>
					<span className="header__toggle-bar"></span>
				</button>
			</div>
		</nav>
	);
}
