// React
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router';

// Components
import { Navbar } from './components/navbar/Navbar';
import { Home } from './components/Home';
import { Setup } from './components/Setup';
import { Play } from './components/Play';
import { Leaderboard } from './components/Leaderboard';
import { PageNotFound } from './components/PageNotFound';

// Types
import { type GameResult, getAllPlayers, getGeneralFacts, getLeaderboard } from './functions/GameResults';
import type { Player } from './components/Play';

// NPM
import localforage from 'localforage';

// CSS
import './App.css'


/*
	Javascript
*/
const dummyGameResults: GameResult[] = [
	{
		winner: "Harry",
		players: [
			"Harry",
			"Hermione",
			"Ron",
		],
		chosenCats: [
			{ playerName: 'Harry', cat: 'Chef' },
			{ playerName: 'Hermione', cat: 'Engineer' },
			{ playerName: 'Ron', cat: 'Explorer' }
		],
		start: "2026-02-01T18:53:59.078Z",
		end: "2026-02-01T19:27:59.078Z",
	},
	{
		winner: "Hermione",
		players: [
			"Harry",
			"Hermione",
			"Ron",
		],
		chosenCats: [
			{ playerName: 'Harry', cat: 'Chef' },
			{ playerName: 'Hermione', cat: 'Captain' },
			{ playerName: 'Ron', cat: 'Explorer' }
		],
		start: "2026-01-15T22:07:59.078Z",
		end: "2026-01-15T23:01:59.078Z",
	},
	{
		winner: "Snape",
		players: [
			"Snape",
			"Hermione",
			"Ron",
		],
		chosenCats: [
			{ playerName: 'Snape', cat: 'Chef' },
			{ playerName: 'Hermione', cat: 'Captain' },
			{ playerName: 'Ron', cat: 'Explorer' }
		],
		start: "2026-02-12T22:07:59.078Z",
		end: "2026-02-12T23:09:15.078Z",
	},
];


const App = () => {
	/*
		React Hooks
	*/
	const [gameResults, setGameResults] = useState(dummyGameResults);
	const [playerName, setPlayerName] = useState('');
	const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
	const [theme, setTheme] = useState('');


	useEffect(() => {
		const loadTheme = async () => {
			const result = await localforage.getItem<string>('theme') ?? 'lofi';

			if (!ignore) {
				setTheme(result);
			}
		}

		let ignore = false;
		loadTheme()

		return () => {
			ignore = true;
		}
	}, []);


	/*
		Calculated State
	*/
	const addNewGameResult = (gameResult: GameResult): void => setGameResults([
		...gameResults,
		gameResult,
	]);


	/*
		Return JSX
	*/
	return (
		<>
		<div className="min-h-screen" data-theme={ theme }>
			<HashRouter>
				<Navbar
					playerName={ playerName }
					setPlayerName={ setPlayerName }
					theme={ theme }
					setTheme={ setTheme }
				/>

				<Routes>
					{/* Home */}
					<Route path="/"
						element={
							<Home
								generalFacts={ getGeneralFacts(gameResults, playerName) }
								leaderboard={ getLeaderboard(gameResults) }
								playerName={ playerName }
							/>
						}
					/>

					{/* Setup */}
					<Route path="/setup"
						element={
							<Setup
								playerName={ playerName }
								allPlayers={ getAllPlayers(gameResults) }
								currentPlayers={ currentPlayers }
								setCurrentPlayers={ setCurrentPlayers }
							/>
						}
					/>

					{/* Play */}
					<Route path="/play"
						element={
							<Play
								currentPlayers={ currentPlayers }
								addNewGameResult={ addNewGameResult }
							/>
						}
					/>

					{/* Leaderboard */}
					<Route path="/leaderboard"
						element={
							<Leaderboard
								leaderboard={ getLeaderboard(gameResults) }
								playerName={ playerName }
							/>
						}
					/>

					{/* Page Not Found */}
					<Route path="/pageNotFound"
						element={
							<PageNotFound />
						}
					/>
				</Routes>
			</HashRouter>
		</div>
		</>
	)
}

export default App
