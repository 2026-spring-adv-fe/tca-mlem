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

	return (
		<>
		<h1>Play</h1>


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

			<div className="flex w-full justify-center gap-2 py-2">

				<button onClick={ () => setSlide(slide - 1) }
					className={ clsx(
						"btn btn-xs material-symbols-outlined",
						slide <= 1 && '!hidden'
					)}
				>
					arrow_back_ios
				</button>
				<button onClick={ () => setSlide(slide + 1) }
					className={ clsx(
						"btn btn-xs material-symbols-outlined",
						slide >= 5 && '!hidden'
					)}
				>
					arrow_forward_ios
				</button>

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