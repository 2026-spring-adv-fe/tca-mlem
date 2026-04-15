import type { LeaderboardEntry } from "../functions/GameResults";

/*
	Leaderboard Props
*/
type LeaderboardProps = {
	leaderboard: LeaderboardEntry[]
	playerName: string
}

/*
	leaderboard Component
*/
export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, playerName }) => {
	const leaderboardEntry = leaderboard.find(p => p.name == playerName)
		|| {
			name: playerName,
			wins: 0,
			losses: 0,
			ratio: 0,
			totalGames: 0,
			rank: 'N/A'
		};
	;

	return (
		<>
		<div className="mx-auto max-w-96 mt-2">
			<div className="p-4 pb-2 text-xs opacity-60 tracking-wide grid grid-flow-col">
				{ playerName } <span className="text-right">Current Rank: { leaderboardEntry.rank }</span>
			</div>
		</div>
		<div className="overflow-x-auto rounded-box border border-base-content/5 max-w-96 mx-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th className="w-5">#</th>
						<th>Name</th>
						<th className="text-center">Wins</th>
						<th className="text-center">Losses</th>
						<th className="text-center">Ratio</th>
					</tr>
				</thead>
				<tbody>
					{
						leaderboard.map((p, i) =>
							<tr key={ p.name }>
								<td>{ i + 1 }</td>
								<td className='flex items-center gap-5 w-25'>
									{ p.name }
									{ p.name == playerName
										? <span className="material-symbols-outlined text-purple-900">person</span>
										: null
									}
								</td>
								<td className="text-right">{ p.wins }</td>
								<td className="text-right">{ p.losses }</td>
								<td className="text-right">{ p.ratio }</td>
							</tr>
						)
					}
				</tbody>
			</table>
		</div>
		</>
	);
}