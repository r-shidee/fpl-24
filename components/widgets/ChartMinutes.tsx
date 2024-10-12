"use client";

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

export default function ChartMinutes(props: any) {
	const totalMins = props.fixtures.map(
		(item: { minutes: any }) => item.minutes
	);
	const sum = totalMins.reduce((acc: any, mins: any) => acc + mins, 0);
	const totalAvailableMins = props.fixtures.length * 90;
	const percent = sum / totalAvailableMins;
	const chartData = [
		{ browser: "safari", visitors: sum, fill: "var(--color-safari)" },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
		safari: {
			label: "Safari",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col w-full">
			<CardHeader className="items-center pb-0">
				<CardTitle>Playing Time</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]">
					<RadialBarChart
						data={chartData}
						startAngle={0}
						endAngle={percent * 360}
						innerRadius={80}
						outerRadius={110}>
						<PolarGrid
							gridType="circle"
							radialLines={false}
							stroke="none"
							className="first:fill-muted last:fill-background"
							polarRadius={[86, 74]}
						/>
						<RadialBar
							dataKey="visitors"
							background
							cornerRadius={10}
						/>
						<PolarRadiusAxis
							tick={false}
							tickLine={false}
							axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle">
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-4xl font-bold">
													{(percent * 100).toPrecision(3)}%
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground">
													{sum}/{totalAvailableMins}
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="leading-none text-muted-foreground">
					Played for {props.fixtures.length} matches
				</div>
			</CardFooter>
		</Card>
	);
}
