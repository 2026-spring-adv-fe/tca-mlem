import { useState, useRef, useEffect } from "react";

import type { GameEvent } from "../../functions/GameResults";

/*
	Point Modal Props
*/
type PointModalProps = {
	currentEvent: GameEvent,
	allEvents: GameEvent[],
	setEvents: (e: GameEvent[]) => void,
	setShowPointModal: (spm: boolean) => void,
};


/*
	Point Modal Component
*/
export const PointModal: React.FC<PointModalProps> = ({ currentEvent,  allEvents, setEvents, setShowPointModal }) => {
	const [points, setPoints] = useState<string>('');
	const dialogRef = useRef<HTMLDialogElement>(null);

	/*
		Closes the modal after providing a name
	*/
	const closeModal = async (cancel: boolean) => {
		if (!cancel) {
			setEvents(allEvents.map(event =>
				({
					id: event.id,
					playerName: event.playerName,
					event: event.event,
					points: event.id == currentEvent.id
						? points
						: event.points
				})
			))
		}

		// Reset show Point Modal state
		setShowPointModal(false);

		// Close the modal
		dialogRef.current?.close();
	}

	/*
		Open the modal when the app loads
	*/
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);

	return (
		<>
		<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle text-center">
			<div className="modal-box">
				<form
					onSubmit={ (e) => {
						// Prevent page reload
						e.preventDefault();

						// Close the modal
						closeModal(false);
					}}
				>
					<h3 className="font-bold text-lg">How many points for this event?</h3>

					{ currentEvent.event }
					<input type="number"
						className="input mt-3 mb-1.5"
						value={ currentEvent.points }
						onChange={ (e) => setPoints(e.target.value) }
					/>

					<button type="submit" className="btn bg-purple-900 text-white mt-3">
						Save Points
					</button>

					<button
						className="btn bg-red-500 border-red-500 text-white mt-3 ml-3"
						onClick={ () => closeModal(true) }
					>
						Cancel
					</button>
				</form>
			</div>
		</dialog>
		</>
	);
}