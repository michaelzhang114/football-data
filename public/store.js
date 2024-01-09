// export function initLocalStorage(guessesRemaining) {
// 	const storedGuessesRemaining =
// 		window.localStorage.getItem("guessesRemaining");
// 	if (!storedGuessesRemaining) {
// 		window.localStorage.setItem("guessesRemaining", guessesRemaining);
// 	} else {
// 		guessesRemaining = Number(storedGuessesRemaining);
// 	}
// }

// export function initLocalStorage(guessesRemaining) {
// 	const storedGuessesRemaining =
// 		window.localStorage.getItem("guessesRemaining");
// 	if (!storedGuessesRemaining) {
// 		window.localStorage.setItem("guessesRemaining", guessesRemaining);
// 	} else {
// 		guessesRemaining = Number(storedGuessesRemaining);
// 	}

// 	// const answer = window.localStorage.setItem("answer", "Kai Havertz");
// 	// const guesses = window.localStorage.setItem("guesses", "");
// }

export function getStoredGuessesRemaining() {
	return Number(window.localStorage.getItem("guessesRemaining"));
}

export function getStoredAnswer() {
	return window.localStorage.getItem("answer");
}

export function getStoredGuesses() {
	return JSON.parse(window.localStorage.getItem("guesses"));
}
