import { getCurrentIndex } from "./answer.js";

export async function initLocalStorage() {
	// Most important, get the currentIndex, which is the
	// puzzle number and this is used as the index
	// of the answerCandidates array

	const currPuzzleNum = getCurrentIndex();
	const puzzleNumber = window.localStorage.getItem("puzzleNumber");
	if (!puzzleNumber) {
		console.log("new puzzle num");
		window.localStorage.setItem("puzzleNumber", currPuzzleNum);
	}

	// Game play stuff

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

	const isRevealed = window.localStorage.getItem("isRevealed");
	if (!isRevealed) {
		window.localStorage.setItem("isRevealed", "false");
	}

	// Statistics

	const storedGamesPlayed = window.localStorage.getItem("gamesPlayed");
	if (!storedGamesPlayed) {
		window.localStorage.setItem("gamesPlayed", 0);
	}

	const storedGamesWon = window.localStorage.getItem("gamesWon");
	if (!storedGamesWon) {
		window.localStorage.setItem("gamesWon", 0);
	}

	const streakCounter = window.localStorage.getItem("streakCounter");
	if (!streakCounter) {
		window.localStorage.setItem("streakCounter", 0);
	}
}
