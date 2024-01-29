export async function initLocalStorage() {
	const storedGuessesRemaining =
		window.localStorage.getItem("guessesRemaining");
	if (!storedGuessesRemaining) {
		window.localStorage.setItem("guessesRemaining", 5);
	}

	const storedGuesses = window.localStorage.getItem("guesses");
	if (!storedGuesses) {
		window.localStorage.setItem("guesses", JSON.stringify([]));
	}

	const isSolved = window.localStorage.getItem("isSolved");
	if (!isSolved) {
		window.localStorage.setItem("isSolved", "false");
	}

	const storedGamesPlayed = window.localStorage.getItem("gamesPlayed");
	if (!storedGamesPlayed) {
		window.localStorage.setItem("gamesPlayed", 0);
	}

	const storedGamesWon = window.localStorage.getItem("gamesWon");
	if (!storedGamesWon) {
		window.localStorage.setItem("gamesWon", 0);
	}

	const isRevealed = window.localStorage.getItem("isRevealed");
	if (!isRevealed) {
		window.localStorage.setItem("isRevealed", "false");
	}

	const streakCounter = window.localStorage.getItem("streakCounter");
	if (!streakCounter) {
		window.localStorage.setItem("streakCounter", 0);
	}

	const currPuzzleNum = await fetchPuzzleNumber();
	const puzzleNumber = window.localStorage.getItem("puzzleNumber");
	if (!puzzleNumber) {
		console.log("new puzzle num");
		window.localStorage.setItem("puzzleNumber", currPuzzleNum);
	}
	console.log("init");

	// const storedStats = window.localStorage.getItem("stats");
	// if (!storedStats) {
	// 	window.localStorage.setItem("stats", JSON.stringify([0, 0, 0, 0, 0]));
	// }
}
