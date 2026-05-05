import { useEffect, useState } from "react";
import type { GameEvent } from "../functions/GameResults";
import { PointModal } from "./modal/PointModal";

type EventTimelineProps = {
	events: GameEvent[],
	setEvents: (e: GameEvent[]) => void
};

export const EventTimeline: React.FC<EventTimelineProps> = ({ events, setEvents }) => {
	const [event, setEvent] = useState<GameEvent>();
	const [showPointModal, setShowPointModal] = useState(false);

	useEffect(() => {
		console.log(event);

	}, [event]);

	return (
		<>
		{ showPointModal && event
			? <PointModal
				playerName={ event.playerName }
				currentEvent={ event.event }
				allEvents={ events }
				setEvents={ setEvents }
				setShowPointModal={ setShowPointModal }
			/>
			: null
		}
		<ul className="timeline timeline-vertical">
			{ events.map((e, i) =>
				<li
					key={i}
					onClick={() => {
						setShowPointModal(true)
						setEvent(e);
					}}
				>
					{/* Creates timeline line above the event on all events except the first */}
					{ i != 0 ? <hr /> : null}
					<div
						className={
							(i % 2 == 0)
								? "timeline-start timeline-box"
								: "timeline-end timeline-box"
						}
					>
						{
							e.playerName
								? `${e.playerName} ${e.event.toLowerCase()}`
								: e.event
						}
					</div>

					<div className="timeline-middle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="h-5 w-5"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>

					{ e.event !== 'Game End' ? <hr /> : null}
				</li>
			)}
		</ul>
		</>
	);
}