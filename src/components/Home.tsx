import { useNavigate } from "react-router";

import type { GeneralFacts } from "../functions/GameResults";


/*
	Home Props
*/
type HomeProps = {
	generalFacts: GeneralFacts
}


/*
	Home Component
*/
export const Home: React.FC<HomeProps> = ({ generalFacts }) => {
	const nav = useNavigate();

	console.log(generalFacts);

	return (
		<>
			<div className="mx-auto w-96">
				<div className="p-4 pb-2 text-xs opacity-60 tracking-wide text-left">Win / Loss</div>
			</div>
			<div className="statsContainer text-center">
				<div className="stats shadow-md w-96 overflow-hidden">

					<div className="stat place-items-center">
						<div className="stat-title">Wins</div>
						<div className="stat-value">{ generalFacts.wins }</div>
					</div>

					<div className="stat place-items-center">
						<div className="stat-title">Losses</div>
						<div className="stat-value text-secondary">{ generalFacts.losses }</div>
					</div>

					<div className="stat place-items-center">
						<div className="stat-title">Ratio</div>
						<div className="stat-value">{ generalFacts.ratio }</div>
					</div>

					<div className="stat place-items-center">
						<div className="stat-title">Total Games</div>
						<div className="stat-value">{ generalFacts.totalGames }</div>
					</div>
				</div>
			</div>

			<div className="mx-auto w-96 mt-5">
				<div className="p-4 pb-2 text-xs opacity-60 tracking-wide text-left">Game Stats</div>
			</div>
			<div className="card bg-base-100 w-96 shadow-md mx-auto">
				<ul className="list bg-base-100 rounded-box shadow-md">
					<li className="list-row text-lg">
						Last Played: <span className="text-right">{ generalFacts.lastPlayed }</span>
					</li>

					<li className="list-row text-lg">
						Shortest Game: <span className="text-right">{ generalFacts.shortestGame }</span>
					</li>

					<li className="list-row text-lg">
						Longest Game: <span className="text-right">{ generalFacts.longestGame }</span>
					</li>

					<li className="list-row text-lg">
						Favorite Cat: <span className="text-right">{ generalFacts.favoriteCat }</span>
					</li>
				</ul>
			</div>

			<div className="text-center mt-10">
				<button
					className="btn bg-purple-700 text-white w-96"
					onClick={ () => nav('/setup') }
				>
					Setup a game
				</button>
			</div>

			<div className="dockSpacer pb-15"></div>
		</>
	);
}