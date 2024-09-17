"use client";

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

interface ChartMinutesProps {
	minutes: number;
	starts: number;
}
export default function ChartMinutes({ minutes, starts }: ChartMinutesProps) {
	const totalMins = (minutes / (starts * 90)) * 360;

	const chartData = [
		{ browser: "safari", minutes: minutes, fill: "var(--color-safari)" },
	];

	const chartConfig = {
		minutes: {
			label: "Minutes",
		},
		safari: {
			label: "Safari",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square">
			<RadialBarChart
				data={chartData}
				startAngle={0}
				endAngle={minutes}
				innerRadius={20}
				outerRadius={50}>
				<PolarGrid
					gridType="circle"
					radialLines={false}
					stroke="none"
					className="first:fill-muted last:fill-background"
					polarRadius={[86, 74]}
				/>
				<RadialBar
					dataKey="minutes"
					background
					cornerRadius={4}
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
											{chartData[0].minutes.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground">
											Minutes
										</tspan>
									</text>
								);
							}
						}}
					/>
				</PolarRadiusAxis>
			</RadialBarChart>
		</ChartContainer>
	);
}
