import { useState } from "react";
import { useNavigate } from "react-router";

import type { GameResult } from "../functions/GameResults";


/*
	Play Props
*/
type PlayProps = {
	addNewGameResult: (g: GameResult) => void,
}

/*
	Play Component
*/
export const Play: React.FC<PlayProps> = ({ addNewGameResult }) => {
	const nav = useNavigate();
	const [startTimestamp] = useState(new Date().toISOString());

	return (
		<>
			<h1>Play</h1>
			<button className="btn btn-primary btn-outline"
				onClick={() => {
					addNewGameResult({
						winner: 'Snape',
						players: [
							'Hermione',
							'Snape',
							'Dumbledore',
						],
						chosenCats: [
							{ player: 'Snape', cat: 'Chef' },
							{ player: 'Dumbledore', cat: 'Explorer' },
							{ player: 'Hermione', cat: 'Engineer' },
						],
						start: startTimestamp,
						end: new Date().toISOString(),
					});

					nav('/');
				}}
			>
				Game Over
			</button>
		</>
	);
}