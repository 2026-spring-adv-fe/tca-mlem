import { durationFormatter } from 'human-readable';

/*
	Exported type definitions
*/
export type ChosenCat = {
	player: string;
	cat: string;
}

export type GameResult = {
    winner: string;

    players: string[];
	chosenCats: ChosenCat[];

    start: string;
    end: string;
};

export type GeneralFacts = {
    lastPlayed: string;
    shortestGame: string;
    longestGame: string;
	favoriteCat: string;
};

export type LeaderboardEntry = {
	name:string;
	wins: number;
	losses: number;
	ratio: number;
	totalGames: number;
	rank : number;
}


/*
	Exported Functions
*/


/*
	Get a player's general facts
*/
export const getGeneralFacts = (games: GameResult[], player: string): GeneralFacts => {
	// Get the games of the provided player or all games otherwise
	const playerGames = player
		? games.filter(game => game.players.includes(player))
		: games
	;

	// console.log(playerGames);


	// Return default values if the player hasn't played any games yet
    if (!playerGames.length) {
        return {
            lastPlayed: 'N/A',
            shortestGame: 'N/A',
            longestGame: 'N/A',
			favoriteCat: 'N/A',
        }
    }

	// Get game end as date object
	const now = Date.now();
	const gameEnds = playerGames.map(game => now - Date.parse(game.end));
	const mostRecentGame = Math.min(...gameEnds);

	// Get game durations
	const gameDurations = playerGames.map(game =>
		Date.parse(game.end) - Date.parse(game.start)
	);


	// Calculate players favorite cat
	const playedCats = playerGames.flatMap(game =>
		game.chosenCats.filter(c => c.player == player)
	);

	// Get count of each cat played
	const catCount: Record<string, number> = {};
	playedCats.map(pc => catCount[pc.cat] = (catCount[pc.cat] || 0) + 1);

	// Gets the max value of catCount
	const maxCount = Object.values(catCount).reduce((a, b) => Math.max(a, b), 0);

	const favoriteCats = Object.keys(catCount).filter(k => catCount[k] == maxCount);

    return {
        lastPlayed: formatLastPlayed(mostRecentGame),
		shortestGame:formatGameDuration(Math.min(...gameDurations)),
        longestGame: formatGameDuration(Math.max(...gameDurations)),
		favoriteCat: `${favoriteCats.join(', ')}`,
    };
};


/*
	Get a player's leaderboard entry
*/
export const getLeaderboardEntry = (games: GameResult[], player: string): LeaderboardEntry => {
	// Player win count
	const wins = games.filter(game => game.winner == player).length;

	// Player total game count
	const totalGames = games.filter(game => game.players.includes(player)).length;

	return {
		name: player,
		wins: wins,
		losses: totalGames - wins,
		ratio: parseFloat((wins / totalGames).toFixed(2)),
		rank: 0,
		totalGames: totalGames,
	};
}


/*
	Gets all players and creates a leaderboard in order of
		1. Win / Loss Ratio
		2. Wins
*/
export const getLeaderboard = (games: GameResult[]): LeaderboardEntry[] => {
	const leaderboard = getAllPlayers(games).map(player =>
		({ ...getLeaderboardEntry(games, player) })
	).sort((a, b) =>
		b.ratio - a.ratio
	).sort((a, b) =>
		b.wins - a.wins
	);

	return leaderboard.map((player, i) =>
		({ ...player, rank: i + 1 })
	);
}


/*
	Helper functions
*/

const formatGameDuration = durationFormatter<string> ({});
const formatLastPlayed = durationFormatter<string> ({
	allowMultiples: ['y', 'mo', 'd', 'h', 'm'],
	keepNonLeadingZeroes: false
});


const getAllPlayers = (games: GameResult[]) => {
	const allPlayers = games.flatMap(game =>
		game.players
	).sort((a, b) =>
		a.localeCompare(b)
	);

	const players = new Set(allPlayers);

	return Array.from(players);
}
