import { Event } from "@/types/Event";
import { epochToDate } from "@/utils/dateUtils";

type EventProps = {
	events: Event[];
};

const Matches: React.FC<EventProps> = ({ events }) => {
	const currentEvent = events.find((event) => event.is_current === true);

	return (
		<div className="border rounded p-4">
			{currentEvent ? (
				<div>
					<div className="font-extralight text-sm text-gray-50 flex flex-wrap justify-between border-b pb-2 mb-2">
						<span>{currentEvent.name}</span>
						<span className="tracking-widest ">DEADLINE</span>
					</div>
					<div
						key={currentEvent.id}
						className="flex justify-between items-center">
						<div>
							<div className="text-lg font-semibold">
								{epochToDate(currentEvent.deadline_time_epoch).dayOfWeek}
							</div>
							<div className="font-light">
								{epochToDate(currentEvent.deadline_time_epoch).time}
							</div>
						</div>
						<div className="inline-flex flex-col p-1 border rounded w-12 h-12 justify-center items-center">
							<p>{epochToDate(currentEvent.deadline_time_epoch).dayOfMonth}</p>
							<p className="text-xs">
								{epochToDate(currentEvent.deadline_time_epoch).month}
							</p>
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
