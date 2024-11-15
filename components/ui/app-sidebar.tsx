"use client";

import { useState, useEffect } from "react";

import {
	Calendar,
	Database,
	Goal,
	Hand,
	HelpCircle,
	Home,
	Inbox,
	Search,
	Settings,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Team } from "@/types/Team";

import Link from "next/link";

// Menu items.
const items = [
	{
		title: "Goals",
		url: "/goals_scored",
	},
	{
		title: "Assists",
		url: "/assists",
	},
	{
		title: "Saves",
		url: "/saves",
	},
	{
		title: "xG",
		url: "/expected_goals",
	},
	{
		title: "xA",
		url: "/expected_assists",
	},
	{
		title: "xGC",
		url: "/expected_goals_conceded",
	},
	{
		title: "xGI",
		url: "/expected_goal_involvements",
	},
	{
		title: "ict index",
		url: "/ict_index",
	},
];

export function AppSidebar() {
	const [teams, setTeams] = useState<any[]>([]);

	useEffect(() => {
		async function fetchTeams() {
			let res = await fetch("/api/teams");
			let data = await res.json();
			setTeams(data);
		}
		fetchTeams();
	}, []);

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Link href="/">FPL-24</Link>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={`/stats` + item.url}>
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
