import { useState } from "react";
import { useNavigate } from "react-router";

import clsx from "clsx";

import type { GameResult } from "../functions/GameResults";


/*
	Represents a player
*/
export type Player = {
	name: string,
	cat: string;

	page: number,
}

/*
	Play Props
*/
type PlayProps = {
	currentPlayers: Player[],
	addNewGameResult: (g: GameResult) => void,
}

/*
	Play Component
*/
export const Play: React.FC<PlayProps> = ({ currentPlayers, addNewGameResult }) => {
	const nav = useNavigate();
	const [startTimestamp] = useState(new Date().toISOString());
	const [page, setPage] = useState(1);

	console.log(currentPlayers);

	return (
		<>
		<div className="grid grid-flow-col w-full gap-2 py-2 text-center">
			<button onClick={ () => setPage(page - 1) }
				className={ clsx(
					"material-symbols-outlined btn btn-ghost btn-xs ml-1 justify-self-start",
					page <= 1 && '!btn-disabled'
				)}
				disabled={ page <= 1 }
			>
				arrow_back_ios_new
			</button>

			{/* Player Names */}
			{ currentPlayers.map((player) =>
				<h1
					className={ clsx(
						"text-lg",
						page != player.page && 'hidden'
					)}
					key={player.name}
				>
					{ player.name }
				</h1>
			)}

			<button onClick={ () => setPage(page + 1) }
				className={clsx(
					"material-symbols-outlined btn btn-ghost btn-xs mr-1 justify-self-end",
					page >= currentPlayers.length && '!btn-disabled'
				)}
				disabled={ page >= 5 }
			>
				arrow_forward_ios
			</button>
		</div>

		<div className="text-center">
			<div className="carousel w-96">
				<div
					className={ clsx(
						'carousel-item w-full',
						page != 1 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						page != 2 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						page != 3 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						page != 4 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						page != 5 && 'hidden'
					)}
				>
					page 5
				</div>
			</div>

			{
				currentPlayers.map(p =>
					<button className="btn btn-primary btn-outline"
						onClick={() => {
							addNewGameResult({
								winner: p.name ,
								players: currentPlayers.map(p => p.name),
								chosenCats: currentPlayers.map(p =>
									({
										playerName: p.name,
										cat: p.cat
									})
								),
								start: startTimestamp,
								end: new Date().toISOString(),
							});

							nav('/');
						}}
						key={ p.name }
					>
						{ p.name }
					</button>
				)
			}
		</div>
		</>
	);
}