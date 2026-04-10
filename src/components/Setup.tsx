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
	currentPlayers: Player[],
	setCurrentPlayers: (players: Player[]) => void,
}

/*
	Setup Component

	TODO: Checklist of all previous players? (Get Players from gameResults.players)
*/
export const Setup: React.FC<SetupProps> = ({ playerName, allPlayers, currentPlayers, setCurrentPlayers }) => {
	const nav = useNavigate();

	/*
		For sorting availablePlayers in a way that the current player is first

		Abstracted into function since functionality is needed in a few places
	*/
	const sortAvailablePlayers = (availablePlayers: AvailablePlayer[]) => {
		return [...availablePlayers].sort((a, b) => (a.checked ? -1 : 0) - (b.checked ? -1 : 0));
	}

	/*
		Hooks
	*/
	const [setupPage, setSetupPage] = useState(1);
	const [setupComplete, setSetupComplete] = useState(false);
	const [newPlayer, setNewPlayer] = useState('');
	const [availablePlayers, setAvailablePlayers] = useState(sortAvailablePlayers(
		allPlayers.map(p =>
			({
				name: p,
				checked: p === playerName ? true : false,
			})
		)
	));

	// Set current players when available players is updated
	useEffect(() => {
		// Add current player if not in the database yet
		if (!availablePlayers.find(p => p.name == playerName)) {
			setAvailablePlayers(
				sortAvailablePlayers([
					...availablePlayers,
					{ name: playerName, checked: true },
				])
			);
		}

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


	/*
		Updates available players when a new player is selected
	*/
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

	const addPlayer = () => {
		const player = newPlayer.trim();

		// Return if input is empty or player already exists
		if (!player) return;
		if (availablePlayers.find(p => p.name.toLowerCase() == player.toLowerCase())) return;

		setAvailablePlayers([
			...availablePlayers,
			{ name: player, checked: true }
		]);

		// Empty input field
		setNewPlayer('');
	}


	return (
		<>
		{ setupPage == 1
			? <>
				<form className="w-96 mt-5 mx-auto flex items-center"
					onSubmit={ (e) => {
						// Prevent page reload
						e.preventDefault();

						// Add the new player
						addPlayer();
					}}
				>
					<input
						type="text"
						className="input w-80 mr-2 mt-2"
						value={ newPlayer }
						onChange={ (e) => setNewPlayer(e.target.value)}
						placeholder="Add a new player"
					/>

					<button
						type="submit"
						className="material-symbols-outlined btn bg-purple-800 text-white mt-2"
					>
						add
					</button>
				</form>

				<div className="w-96 mt-5 mx-auto">
					Select Players:
					{ availablePlayers.map(p =>
						<label className="block mt-2" key={ p.name }>
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
			</>

			: <>
				{ currentPla}
			</>
		}
		<div className="controls text-center">
			{ setupComplete
				? <button className="btn bg-purple-800" onClick={ () => nav('/play') }>Play Game</button>
				: <button className="btn bg-purple-800 mx-auto my-5" onClick={ () => setSetupPage(setupPage + 1) }>Next</button>
			}
		</div>


		</>
	);
}