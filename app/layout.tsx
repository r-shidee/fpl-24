import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import "./globals.css";
import "./scss/global.scss";
import "./google-icon.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FPL-24",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html
				lang="en"
				suppressHydrationWarning
			>
				<body className={`layout--main ` + inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<SidebarProvider>
							<AppSidebar />
							<main>
								<SidebarTrigger />
								<div className="content--main w-full overflow-y-scroll mx-auto rounded-xl p-4">
									{children}
								</div>
							</main>
						</SidebarProvider>
					</ThemeProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
