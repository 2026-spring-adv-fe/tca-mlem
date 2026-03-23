// React
import { useNavigate } from "react-router";
import { useState } from "react";

// NPM
import clsx from "clsx";

// Types
import type { Player } from "./Play";


type Players = {
	player: Player,
}

/*
	Setup Props
*/
type SetupProps = {
	player: string,
	setPlayers: (players: Player[]) => void,
}

/*
	Setup Component
*/
export const Setup: React.FC<SetupProps> = ({ player, setPlayers }) => {
	const nav = useNavigate();

	const [setupPage, setSetupPage] = useState(1);
	const [setupComplete, setSetupComplete] = useState(true);

	const updatePlayers = () => {
		setPlayers([
			{ name: 'Austin', page: 1 },
			{ name: 'Avery', page: 2 },
		]);

		nav('/play');
	}

	return (
		<>
		<div className="w-96 text-center mt-5 mx-auto">
			<p className={ setupPage != 1 ? 'hidden' : ''}>How many people are playing?</p>
			<select defaultValue="" className={clsx("select w-50 mt-2", setupPage != 1 && 'hidden')} onChange={ (e) => console.log(e.target.value) }>
				<option disabled={true}>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>
		</div>

		<div className="controls text-center">
			{ setupComplete
				? <button className="btn btn-primary btn-outline" onClick={ updatePlayers }>Play Game</button>
				: <button className="btn bg-purple-800 mx-auto my-5" onClick={ () => setSetupPage(setupPage + 1) }>Next</button>
			}
		</div>
		</>
	);
}