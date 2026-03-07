import { useState, useRef, useEffect } from "react";

type WelcomeProps = {
	setPlayer: (p: string) => void
}

export const Welcome: React.FC<WelcomeProps> = ({ setPlayer }) => {
	const [player, updatePlayer] = useState('');
	const dialogRef = useRef<HTMLDialogElement>(null);


	/*
		Closes the modal after providing a name
	*/
	const closeModal = () => {
		if (player) {
			setPlayer(player);

			// Close the modal
			dialogRef.current?.close();
		}
	}


	/*
		Open the modal when the app loads
	*/
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);

	return (
		<>
			<dialog ref={dialogRef} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Who is playing today?</h3>

					<input type="text" className="input mt-3 mb-1.5" placeholder="Name"
						onChange={ (e) => updatePlayer(e.target.value) }
					/>
					<p className="text-xs text-grey">{
						!player
							? 'A name is required to use the companion'
							: ''
					}</p>

					<button className="btn bg-purple-900 text-white mt-3"
						onClick={ () => closeModal() }
					>
						Get Started
					</button>
				</div>

			</dialog>
		</>
	);
}