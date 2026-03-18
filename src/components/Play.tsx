import { useState } from "react";
import { useNavigate } from "react-router";

import clsx from "clsx";

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
	const [slide, setSlide] = useState(1);

	const players = [
		{ name: 'Austin' },
		{ name: 'Avery' },
		{ name: 'Inari' },
		{ name: 'Simba' },
		{ name: 'Aubie' },
	];

	return (
		<>
		<div className="grid grid-flow-col w-full gap-2 py-2 text-center">
			<button onClick={ () => setSlide(slide - 1) }
				className={ clsx(
					"material-symbols-outlined btn btn-ghost btn-xs ml-1 justify-self-start",
					slide <= 1 && '!btn-disabled'
				)}
				disabled={ slide <= 1 }
			>
				arrow_back_ios_new
			</button>

			{/* Player Names */}
			{ players.map((player, i) =>
				<h1
					className={ clsx(
						"text-lg",
						slide != i + 1 && 'hidden'
					)}
					key={player.name}
				>
					{ player.name }
				</h1>
			)}

			<button onClick={ () => setSlide(slide + 1) }
				className={clsx(
					"material-symbols-outlined btn btn-ghost btn-xs mr-1 justify-self-end",
					slide >= players.length && '!btn-disabled'
				)}
				disabled={ slide >= 5 }
			>
				arrow_forward_ios
			</button>
		</div>

		<div className="text-center">
			<div className="carousel w-96">
				<div
					className={ clsx(
						'carousel-item w-full',
						slide != 1 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						slide != 2 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						slide != 3 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						slide != 4 && 'hidden'
					)}
				>
					<img
						src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
						className="w-full" />
				</div>
				<div
					className={ clsx(
						'carousel-item w-full',
						slide != 5 && 'hidden'
					)}
				>
					Slide 5
				</div>
			</div>

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
		</div>
		</>
	);
}