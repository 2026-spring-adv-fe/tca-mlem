// React
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

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

	TODO: player limit 5
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

	// Make sure current player is in available player array
	useEffect(() => {
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
				cat: '',
				page: i += 1,
			})
		));
	}, [availablePlayers]);


	/*
		Updates available players when a new player is selected
	*/
	const setPlayerChecked = (player: AvailablePlayer) => {
		setAvailablePlayers(availablePlayers.map(p =>
			({
				name: p.name,
				checked: p.name == player.name
					? !p.checked
					: p.checked
			})
		));
	}

	const setPlayerCat = (player: Player, cat: string) => {
		// Set current players and the page they should appear on
		setCurrentPlayers(currentPlayers.map(p =>
			({
				name: p.name,
				cat: p.name == player.name ? cat : p.cat,
				page: p.page
			})
		));
	}


	/*
		Adds a new player to the available players
	*/
	const addPlayer = () => {
		const player = newPlayer.trim().charAt(0).toUpperCase() + newPlayer.trim().slice(1);

		// Return if input is empty or player already exists
		if (!player) return;
		if (availablePlayers.find(p => p.name.toLowerCase() == player.toLowerCase())) return;

		// Add new player
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
								onChange={ () => setPlayerChecked(p) }
								checked={ p.checked }
								disabled={ p.name == playerName }
							/>
							{ p.name }
						</label>
					)}
				</div>
			</>

			: <>
				<div className="w-96 mx-auto mt-5">
					Choose player characters:

					{ currentPlayers.map(p =>
						<div className="card card-border mt-3 shadow-sm" key={ p.name }>
							<div className="card-body">
								{ p.name }
								<select
									className="select"
									onChange={ (e) => setPlayerCat(p, e.target.value) }
								>
									<option value="">- - -</option>
									<option value="Chef">Chef (white)</option>
									<option value="Commander">Commander (blue)</option>
									<option value="Doctor">Doctor (pink)</option>
									<option value="Engineer">Engineer (orange)</option>
									<option value="Scout">Scout (green)</option>
								</select>
							</div>
						</div>
					)}
				</div>
			</>
		}
		<div className="controls text-center">
			{ setupPage == 2
				? <button className="btn bg-purple-800" onClick={ () => nav('/play') }>Play Game</button>
				: <button className="btn bg-purple-800 mx-auto my-5" onClick={ () => setSetupPage(setupPage + 1) }>Next</button>
			}
		</div>


		</>
	);
}