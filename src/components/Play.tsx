import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import clsx from "clsx";

import type { GameResult } from "../functions/GameResults";
import type { GameEvent } from "../functions/GameResults";
import { EventTimeline } from "./EventTimeline";


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

	TODO: add 'Events' that allows a player to input what happened on their turn -> i.e. 'Landed on planet', 'Landed on moon', 'Crashed', 'Made it to cosmos'
	TODO: add multipliers that target a specific event for end game calculations -> i.e. 'Landed on planet' x2, 'Landed on moon' x2'
*/
export const Play: React.FC<PlayProps> = ({ currentPlayers, addNewGameResult }) => {
	const nav = useNavigate();
	const [startTimestamp] = useState(new Date().toISOString());
	const [page, setPage] = useState(1);
	const [events, setEvents] = useState<GameEvent[]>([]);

	const possibleEvents = [
		'Landed on a planet',
		'Landed on a moon',
		'Made it to the cosmos',
		'Crashed',
	]

	useEffect(() => {
		setEvents([
			{
				id: 0,
				playerName: '',
				event:'Game Start',
				points: ''
			},
		]);


	}, []);


	return (
		<>
		<div className="grid grid-flow-col w-full gap-2 py-2 text-center mt-2">
			<button onClick={ () => setPage(page - 1) }
				className={clsx(
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
					className={clsx(
						"text-lg",
						page != player.page && 'hidden'
					)}
					key={player.name}
				>
					<div className="avatar flex justify-center items-center">
						<div
							className="w-12 rounded-full mr-3"
							key={player.cat}
						>
							<img src={ `cats/${player.cat}.png` } />
						</div>

						{ player.name }
					</div>
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
			{currentPlayers.map(player =>
				(page == player.page)
					? <div className="carousel w-full max-w-96">
						<div
							className={clsx(
								'carousel-item w-full',
								page != player.page && 'hidden'
							)}
							key={player.page}
						>
							<div className="w-96 grid gap-3">
								{possibleEvents.map((event, i) =>
									<button
										key={i}
										className="btn bg-purple-800 text-white"
										onClick={() => {
											setEvents([
												...events,
												{
													id: (i + 1),
													playerName: player.name,
													event:event,
													points: ''
												},
											])
										}}
									>
										{ event }
									</button>
								)}
							</div>
						</div>
					</div>
					: null
			)}
		</div>

		<div className="p-4 pb-2 text-xs opacity-60 tracking-wide text-center">
			Click on an event to add or modify the point value
		</div>

		<EventTimeline
			events={ events }
			setEvents={ setEvents }
		/>

		<button
			className="mx-auto"
			onClick={ () => {
				setEvents([
					...events,
					{
						id: 500,
						playerName: '',
						event:'Game End',
						points: ''
					},
				]);
			}}
		>
				Game End
		</button>

		<div className="mx-auto w-full max-w-96">
			{
				currentPlayers.map(p =>
					<button className="btn btn-primary btn-outline"
						onClick={() => {
							addNewGameResult({
								winner: p.name,
								players: currentPlayers.map(p => p.name),
								chosenCats: currentPlayers.map(p =>
									({
										playerName: p.name,
										cat: p.cat
									})
								),
								events: events,
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