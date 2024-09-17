import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="navbar navbar--main">
			<div className="border-b items-center gap-4 p-4 h-12 flex">
				<Link href="/">Home</Link>
			</div>
		</nav>
	);
}
