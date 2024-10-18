"use client";
import { useState, useEffect } from "react";
import { Event } from "@/types/Event";
import { epochToDate } from "@/utils/dateUtils";
import { fetchEvents } from "@/utils/api/events";

const Matches: React.FC = () => {
	const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [timeLeft, setTimeLeft] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		async function loadEvents() {
			try {
				setLoading(true);
				const events = await fetchEvents();
				const current = events.find((event) => event.is_current === true);
				setCurrentEvent(current || null);
			} catch (err) {
				setError("Failed to load events");
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		loadEvents();
	}, []);

	useEffect(() => {
		if (!currentEvent) return;

		function calculateTimeLeft() {
			const difference = currentEvent.deadline_time_epoch * 1000 - Date.now();
			if (difference > 0) {
				return {
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				};
			}
			return { hours: 0, minutes: 0, seconds: 0 };
		}

		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [currentEvent]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="border rounded p-4">
			<div className="font-extralight tracking-widest text-sm text-gray-50">
				DEADLINE
			</div>
			{currentEvent ? (
				<div key={currentEvent.id}>
					<div className="font-bold text-2xl">
						{epochToDate(currentEvent.deadline_time_epoch).dayOfWeek}
					</div>
					<div>
						{epochToDate(currentEvent.deadline_time_epoch).dayOfMonth}{" "}
						{epochToDate(currentEvent.deadline_time_epoch).month} at{" "}
						{epochToDate(currentEvent.deadline_time_epoch).time}
					</div>
					<div className="flex space-x-4 text-xl font-bold mt-2">
						<div>
							<span>{timeLeft.hours.toString().padStart(2, "0")}</span>
							<span className="text-sm font-normal ml-1">hours</span>
						</div>
						<div>
							<span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
							<span className="text-sm font-normal ml-1">mins</span>
						</div>
						<div>
							<span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
							<span className="text-sm font-normal ml-1">secs</span>
						</div>
					</div>
				</div>
			) : (
				<div>No current matches</div>
			)}
		</div>
	);
};

export default Matches;
