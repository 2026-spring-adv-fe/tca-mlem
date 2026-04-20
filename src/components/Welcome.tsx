import { useState, useRef, useEffect } from "react";

type WelcomeProps = {
	setPlayerName: (p: string) => void
}

export const Welcome: React.FC<WelcomeProps> = ({ setPlayerName }) => {
	const [playerName, updatePlayerName] = useState('');
	const dialogRef = useRef<HTMLDialogElement>(null);


	/*
		Closes the modal after providing a name
	*/
	const closeModal = () => {
		if (playerName) {
			// Ensure playerName name is capitalized
			const name = playerName.charAt(0).toUpperCase() + playerName.slice(1);

			// Set the playerName
			setPlayerName(name);

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
							onChange={ (e) => updatePlayerName(e.target.value) }
						/>
						<p className="text-xs text-grey">{
							!playerName
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