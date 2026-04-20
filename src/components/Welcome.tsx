import { useState, useRef, useEffect } from "react";

type WelcomeProps = {
	setPlayerName: (p: string) => void
}

export const Welcome: React.FC<WelcomeProps> = ({ setPlayerName }) => {
	const [player, updatePlayer] = useState('');
	const dialogRef = useRef<HTMLDialogElement>(null);


	/*
		Closes the modal after providing a name
	*/
	const closeModal = () => {
		if (player) {
			// Ensure player name is capitalized
			const playerName = player.charAt(0).toUpperCase() + player.slice(1);
			setPlayerName(playerName);

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
						<h3 className="font-bold text-lg">Who is playing today?</h3>

						<input type="text" className="input mt-3 mb-1.5" placeholder="Name"
							onChange={ (e) => updatePlayer(e.target.value) }
						/>
						<p className="text-xs text-grey">{
							!player
								? 'A name is required to use the companion'
								: ''
						}</p>

						<button type="submit" className="btn bg-purple-900 text-white mt-3">
							Get Started
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
}