// React
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { getAllPlayers } from "../functions/GameResults";

// NPM
import clsx from "clsx";

// Types
import type { Player } from "./Play";


type AvailablePlayer = {
	name: string,
	checked: boolean,
}

/*
	Setup Props
*/
type SetupProps = {
	playerName: string,
	allPlayers: string[],
	setCurrentPlayers: (players: Player[]) => void,
}

/*
	Setup Component

	TODO: Checklist of all previous players? (Get Players from gameResults.players)
*/
export const Setup: React.FC<SetupProps> = ({ playerName, allPlayers, setCurrentPlayers }) => {
	const nav = useNavigate();


	const [setupPage, setSetupPage] = useState(1);
	const [setupComplete, setSetupComplete] = useState(true);
	const [availablePlayers, setAvailablePlayers] = useState(allPlayers.map(p =>
		({
			name: p,
			checked: p === playerName ? true : false,
		})
	).sort((a, b) =>
		// Sort results so the current user is at the top
		(a.checked ? -1 : 0) - (b.checked ? -1 : 0)
	));

	// Set current players when available players is updated
	useEffect(() => {
		// Get the names of selected players
		const players = availablePlayers.filter(p =>
			p.checked
		).map(p =>
			p.name
		);

		// Set current players and the page they should appear on
		setCurrentPlayers(players.map((p, i) =>
			({
				name: p,
				cat: 'Chef',

				page: i += 1,
			})
		));
	}, [availablePlayers]);


	// Updates available players when a new player is selected
	const updateAvailablePlayers = (player: AvailablePlayer) => {
		setAvailablePlayers(availablePlayers.map(p =>
			({
				name: p.name,
				checked: p.name == player.name
					? !p.checked
					: p.checked
			})
		));

		// nav('/play');

	}

	return (
		<>
		<div className="w-96 mt-5 mx-auto">
			Select Players:
			{ availablePlayers.map(p =>
				<label className="block" key={ p.name }>
					<input type="checkbox"
						className="checkbox mx-2"
						onChange={ () => updateAvailablePlayers(p) }
						checked={ p.checked }
						disabled={ p.name == playerName }
					/>
					{ p.name }
				</label>
			)}
		</div>

		<div className="controls text-center">
			{ setupComplete
				? <button className="btn btn-primary btn-outline" onClick={ () => nav('/play') }>Play Game</button>
				: <button className="btn bg-purple-800 mx-auto my-5" onClick={ () => setSetupPage(setupPage + 1) }>Next</button>
			}
		</div>
		</>
	);
}