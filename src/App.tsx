import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router';

import { Home } from './components/Home';
import { Setup } from './components/Setup';
import { Play } from './components/Play';
import { Leaderboard } from './components/Leaderboard';
import { Navbar } from './components/Navbar';
import { Dock } from './components/Dock';


import { type GameResult, getGeneralFacts } from './functions/GameResults';
import './App.css'

const myName = 'Hermione';
const dummyGameResults: GameResult[] = [
	{
		winner: "Harry",
		players: [
			"Harry",
			"Hermione",
			"Ron",
		],
		chosenCats: [
			{ player: 'Harry', cat: 'chef' },
			{ player: 'Hermione', cat: 'Engineer' },
			{ player: 'Ron', cat: 'explorer' }
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
			{ player: 'Harry', cat: 'chef' },
			{ player: 'Hermione', cat: 'Captain' },
			{ player: 'Ron', cat: 'explorer' }
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
			{ player: 'Snape', cat: 'chef' },
			{ player: 'Hermione', cat: 'Captain' },
			{ player: 'Ron', cat: 'explorer' }
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


	/*
		Calculated State
	*/
	const addNewGameResult = (gameResult: GameResult): void => setGameResults([
		...gameResults,
		gameResult,
	]);

	console.log(gameResults);

	/*
		Return JSX
	*/
	return (
		<>

			<HashRouter>
				<Navbar playerName={ myName } />

				<Routes>
					<Route path="/" element={ <Home  generalFacts={ getGeneralFacts(gameResults, myName) } /> } />
					<Route path="/setup" element={ <Setup /> } />
					<Route path="/play" element={ <Play addNewGameResult={ addNewGameResult } /> } />
					<Route path="/leaderboard" element={ <Leaderboard /> } />
				</Routes>

				<Dock />
			</HashRouter>

		</>
	)
}

export default App
