import type { LeaderboardEntry } from "../functions/GameResults";

/*
	Leaderboard Props
*/
type LeaderboardProps = {
	leaderboard: LeaderboardEntry[]
	player: string
}

/*
	leaderboard Component
*/
export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, player }) => {

	return (
		<>
			<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-96 mx-auto mt-5">
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
										{ p.name == player
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

			<div className="dockSpacer pb-15"></div>
		</>
	);
}