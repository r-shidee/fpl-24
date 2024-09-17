import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./scss/global.scss";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<div className="layout--main">
						<Navbar />
						<Sidebar />
						<div className="content--main w-full overflow-y-scroll mx-auto rounded-xl h-dvh bg-slate-900">
							{children}
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
