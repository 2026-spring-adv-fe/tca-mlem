// React
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

// Types
import type { Player } from "./Play";

// Drag n Drop
import { DragDropProvider } from '@dnd-kit/react';
import { DraggableItem } from "./DraggableItem";
import { Dropzone } from "./Dropzone";


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
	// Navigate
	const nav = useNavigate();

	// Playable cats
	const playableCats = [
		{ cat: 'Chef' },
		{ cat: 'Captain' },
		{ cat: 'Doctor' },
		{ cat: 'Engineer' },
		{ cat: 'Scout' },
	]

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
	const [newPlayer, setNewPlayer] = useState('');
	const [availablePlayers, setAvailablePlayers] = useState(sortAvailablePlayers(
		allPlayers.map(p =>
			({
				name: p,
				checked: p === playerName ? true : false,
			})
		)
	));

	// Drag n Drop
	const [chosenCats, setChosenCats] = useState<string[]>([]);

	// Available players watcher
	useEffect(() => {
		// Make sure current player is in available player array
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


	/*
		Updates player's chosen cats on drag n drop setup screen
	*/
	const setPlayerCat = (playerName: string, cat: string) => {
		if (playerName) {
			// Set current players and the page they should appear on
			setCurrentPlayers(currentPlayers.map(p =>
				({
					name: p.name,
					cat: p.name == playerName ? cat : p.cat,
					page: p.page
				})
			));
		} else {
			// Unset cat from player
			setCurrentPlayers(currentPlayers.map(p =>
				({
					name: p.name,
					cat: p.cat == cat ? '' : p.cat,
					page: p.page
				})
			));
		}

		// Update chosen cats
		setChosenCats([
			...chosenCats,
			cat
		]);
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
				<form className="w-full max-w-96 mt-5 mx-auto p-2"
					onSubmit={ (e) => {
						// Prevent page reload
						e.preventDefault();

						// Add the new player
						addPlayer();
					}}
				>
					<input
						type="text"
						className="input w-full mr-2 mt-2"
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

				<div className="w-full max-w-96 mt-5 mx-auto p-2">
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
				<div className="w-full max-w-96 mx-auto mt-5 p-2">
					<span className="ml-2">Drag chosen character to player:</span>

					<DragDropProvider
						onDragEnd={(event) => {
							if (event.canceled) return;

							const playerName = (event.operation.target?.id)?.toString() ?? '';
							const cat = (event.operation.source?.id)?.toString() ?? '';

							// Set player cat
							setPlayerCat(playerName, cat);

							// Add cat back to drag and drop zone
							if (!playerName) {
								setChosenCats(chosenCats.map(c => c == cat ? '' : c));
							}
						}}
					>
						<div className="w-full max-w-96 my-3 grid grid-cols-2">
							{ playableCats.map(
								c => !chosenCats.includes(c.cat)
									? <DraggableItem name={ c.cat } key={ c.cat } />
									: null
							)}
						</div>

						{ currentPlayers.map(p =>
							<div className="card card-border mt-3 shadow-sm" key={ p.name }>
								<div className="card-body">
									{ p.name }
									<Dropzone id={p.name}>
										{ p.cat ? <DraggableItem name={ p.cat } /> : null }
									</Dropzone>
								</div>
							</div>
						)}
					</DragDropProvider>
				</div>
			</>
		}
		<div className="controls text-center">
			{ setupPage == 2
				? <button className="btn bg-purple-800 mx-auto my-5 text-white" onClick={ () => nav('/play') }>Play Game</button>
				: <button className="btn bg-purple-800 mx-auto my-5 text-white" onClick={ () => setSetupPage(setupPage + 1) }>Next</button>
			}
		</div>


		</>
	);
}