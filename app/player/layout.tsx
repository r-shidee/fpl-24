"use client";
import { useParams } from "next/navigation";

export default function PlayerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const params = useParams();
	const slug = params.id; // Accessing the slug parameter

	return <section className=" p-4 flex flex-col gap-5">{children}</section>;
}
