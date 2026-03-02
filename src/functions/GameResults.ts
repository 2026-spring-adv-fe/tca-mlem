import { formatDistanceToNow, differenceInMinutes } from 'date-fns';

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
	const gameEnds = playerGames.map(game => new Date(game.end));

	// Get the most recent game in milliseconds
	const mostRecentGame = new Date(Math.max(
		...gameEnds.map(date => date.getTime())
	));

	// Get distance between now and most recent game with suffix of minutes / days / etc
	const lastPlayedGame = formatDistanceToNow(mostRecentGame, { addSuffix: true });

	// Get game durations in minutes
	const durationsInMinutes = playerGames.map(game =>
		differenceInMinutes(new Date(game.end), new Date(game.start))
	);

	// Get games the player has won
	const playerWonGames = playerGames.filter(game => game.winner == player);

	// Calculate players favorite cat
	const playedCats = playerGames.flatMap(game =>
		game.chosenCats.filter(c => c.player == player)
	);
	// const favoriteCat = 'N/A';
	const counts: Record<string, number> = {};

	playedCats.map(pc => counts[pc.cat] = (counts[pc.cat] || 0) + 1);

	let favoriteCat = 'N/A';
    let maxCount = 0;
    for (const [cat, count] of Object.entries(counts)) {
		if (count > maxCount) {
			maxCount = count;
            favoriteCat = cat;
        }
    }

    return {
        lastPlayed: `${lastPlayedGame}`,
        shortestGame: `${Math.min(...durationsInMinutes)} minutes`,
        longestGame: `${Math.max(...durationsInMinutes)} minutes`,
		favoriteCat: `${favoriteCat}`,

		wins: playerWonGames.length,
		losses: playerGames.length - playerWonGames.length,
		ratio: parseFloat((playerWonGames.length / playerGames.length).toFixed(2)),
		totalGames: playerGames.length,
    };
};


/*
	Helper functions
*/