import { useState, useEffect, useRef } from "react";

import localforage from "localforage";
import type { GameEvent } from "../../functions/GameResults";


/*
	Point Modal Props
*/
type PointModalProps = {
	playerName: string,
	currentEvent: GameEvent,
	allEvents: GameEvent[],
	setEvents: (e: GameEvent[]) => void,
	setShowPointModal: (spm: boolean) => void,
};


/*
	Point Modal Component
*/
export const PointModal: React.FC<PointModalProps> = ({ playerName, currentEvent,  allEvents, setEvents, setShowPointModal }) => {
	const [points, setPoints] = useState<string>();
	const dialogRef = useRef<HTMLDialogElement>(null);


	/*
		Closes the modal after providing a name
	*/
	const closeModal = async () => {
		if (points) {
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
						closeModal();
					}}
				>
					<h3 className="font-bold text-lg">How many points for this event?</h3>

					<label>
						{ currentEvent.event }
						<input type="number"
							className="number mt-3 mb-1.5"
							onChange={ (e) => setPoints(e.target.value) }
						/>
					</label>

					<button type="submit" className="btn bg-purple-900 text-white mt-3">
						Save Email
					</button>

					<button
						className="btn btn-error text-white mt-3 ml-3"
						onClick={ () => closeModal() }
					>
							Cancel
					</button>
				</form>
			</div>
		</dialog>
		</>
	);
}