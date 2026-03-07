import { useEffect, useRef, useState } from "react";

type WelcomeProps = {
	setPlayer: (player: string) => void
}

export const Welcome: React.FC<WelcomeProps> = ({ setPlayer }) => {
	const modal = useRef<HTMLDialogElement>(null);

	const [player, setPlayerInput] = useState('');

	useEffect(() => {
		modal.current?.showModal();
	}, []);

	return (
		<>
			<dialog ref={modal} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Who is playing today?</h3>
					<input type="text" className="input my-5" placeholder="First Name" onChange={ (e) => setPlayerInput(e.target.value) }/>
					<button className="btn bg-purple-800 text-white" onClick={ () => setPlayer(player) }>Get Started</button>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}