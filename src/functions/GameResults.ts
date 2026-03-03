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

	wins: number
	losses: number
	ratio: number
    totalGames: number;
};


/*
	Exported Functions
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

			wins: 0,
			losses: 0,
			ratio: 0.00,
			totalGames: 0,
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


	// Get games the player has won
	const playerWonGames = playerGames.filter(game => game.winner == player);

	// Calculate players favorite cat
	const playedCats = playerGames.flatMap(game =>
		game.chosenCats.filter(c => c.player == player)
	);

	// Get count of each cat played
	const catCount: Record<string, number> = {};
	playedCats.map(pc => catCount[pc.cat] = (catCount[pc.cat] || 0) + 1);

	// Gets the max value of catCount
	const max = Object.values(catCount).reduce((a, b) => Math.max(a, b), 0);

	const favoriteCats = Object.keys(catCount).filter(k => catCount[k] == max);


	// let favoriteCat = 'N/A';
    // let maxCount = 0;
    // for (const [cat, count] of Object.entries(catCount)) {
	// 	if (count > maxCount) {
	// 		maxCount = count;
    //         favoriteCat = cat;
    //     }
    // }




    return {
        lastPlayed: formatLastPlayed(mostRecentGame),
		shortestGame:formatGameDuration(Math.min(...gameDurations)),
        longestGame: formatGameDuration(Math.max(...gameDurations)),
		favoriteCat: `${favoriteCats.join(', ')}`,

		wins: playerWonGames.length,
		losses: playerGames.length - playerWonGames.length,
		ratio: parseFloat((playerWonGames.length / playerGames.length).toFixed(2)),
		totalGames: playerGames.length,
    };
};


/*
	Helper functions
*/

const formatGameDuration = durationFormatter<string> ({});
const formatLastPlayed = durationFormatter<string> ({
	allowMultiples: ['y', 'mo', 'd', 'h', 'm'],
	keepNonLeadingZeroes: false
});