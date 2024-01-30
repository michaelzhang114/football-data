import { autocomplete } from "./autocomplete.js";
import { displayGuesses, showCopyText, goBackToTop } from "./helpers.js";
import { initLocalStorage } from "./storage.js";
import { initStatistics } from "./stats.js";
import { initBasicCssStuff } from "./nav.js";
import {
	getCurrentIndex,
	answerIdCandidates as answerIdCandidatesArr,
} from "./answer.js";
import {
	fetchAnswerClubsDetails,
	fetchAllPlayerData,
	displayLogos,
} from "./api-calls.js";

var globalAnswer;
var globalAnswerName;

var fullPlayerData = [];
// run get on all player data and all players

function getIdByName(playerName) {
	const player = fullPlayerData.find((player) => player.name === playerName);

	// Check if the player with the given name is found
	if (player) {
		return player.id;
	} else {
		// Return a specific value (or handle the absence of the player as needed)
		return null;
	}
}

function handleSubmit() {
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGuesses = JSON.parse(window.localStorage.getItem("guesses"));
	const myIsSolved = JSON.parse(window.localStorage.getItem("isSolved"));

	if (myGuessesRemaining <= 0 || myIsSolved === true) {
		return;
	}

	const userInput = document.getElementById("myInput").value;
	if (userInput.length == 0) return;

	if (getIdByName(userInput) === globalAnswer) {
		myGuesses.unshift({
			name: userInput,
			id: getIdByName(userInput),
			output: "✅",
		});
		window.localStorage.setItem("isSolved", "true");
	} else {
		myGuesses.unshift({
			name: userInput,
			id: getIdByName(userInput),
			output: "❌",
		});
	}

	//update vars
	window.localStorage.setItem("guessesRemaining", myGuessesRemaining - 1);
	window.localStorage.setItem("guesses", JSON.stringify(myGuesses));

	document.getElementById("myInput").value = "";

	displayGuesses();
	showRevealedAnswer();
}

// async function initAnswer() {
// 	const { answerID, answerName } = await fetchAnswer();
// 	globalAnswer = answerID;
// 	globalAnswerName = answerName;
// }

function handleClear() {
	localStorage.removeItem("guesses");
	localStorage.removeItem("guessesRemaining");
	localStorage.removeItem("isSolved");
	localStorage.removeItem("isRevealed");
	localStorage.removeItem("puzzleNumber");

	initLocalStorage();
	displayGuesses();
	showRevealedAnswer();
}

async function handleRefresh() {
	handleClear();
	window.location.reload();
}

function showRevealedAnswer() {
	// Get all the local storage vars
	const myIsSolved = JSON.parse(window.localStorage.getItem("isSolved"));
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGamesPlayed = Number(window.localStorage.getItem("gamesPlayed"));
	const myGamesWon = Number(window.localStorage.getItem("gamesWon"));
	const myIsRevealed = JSON.parse(window.localStorage.getItem("isRevealed"));
	const myStreakCounter = Number(
		window.localStorage.getItem("streakCounter")
	);

	const revealDiv = document.getElementById("answer-revealed-wrapper");
	const revealDivText = document.getElementById("answer-reveal");

	//if they solved it
	if (myIsSolved === true) {
		revealDiv.style.display = "block";
		revealDivText.innerText = `Congrats! The answer was ${globalAnswerName}`;

		if (myIsRevealed === false) {
			window.localStorage.setItem("isRevealed", "true");
			window.localStorage.setItem("gamesPlayed", myGamesPlayed + 1);
			window.localStorage.setItem("gamesWon", myGamesWon + 1);
			window.localStorage.setItem("streakCounter", myStreakCounter + 1);
		}
		goBackToTop();
		initStatistics();

		showCopyText("✅");

		return;
	}

	//if they've made 5 guesses
	if (myGuessesRemaining == 0) {
		revealDiv.style.display = "block";
		revealDivText.innerText = `The answer was ${globalAnswerName}`;
		if (myIsRevealed === false) {
			window.localStorage.setItem("isRevealed", "true");
			window.localStorage.setItem("gamesPlayed", myGamesPlayed + 1);
			window.localStorage.setItem("streakCounter", 0);
		}
		goBackToTop();
		initStatistics();
		showCopyText("❌");

		return;
	}

	//otherwise keep it hidden
	revealDiv.style.display = "none";
}

// function runEveryXmin(min) {
// 	setInterval(async () => {
// 		const currPuzzleNum = await fetchPuzzleNumber();
// 		const puzzleNumber = window.localStorage.getItem("puzzleNumber");
// 		if (!puzzleNumber || currPuzzleNum != puzzleNumber) {
// 			handleRefresh();
// 			initAnswer();
// 			window.localStorage.setItem("puzzleNumber", currPuzzleNum);
// 		}
// 	}, min * 60 * 1000); // 10000 milliseconds = 10 seconds
// }

function initAnswerIdFromPuzzleNum(puzzleNum) {
	globalAnswer = answerIdCandidatesArr[puzzleNum];
}

async function main() {
	try {
		// First, make sure they have default values in local storage
		initLocalStorage();

		// These can happen whenever
		initBasicCssStuff();
		initStatistics();

		const currPuzzleNum = getCurrentIndex();
		const puzzleNumber = window.localStorage.getItem("puzzleNumber");
		if (currPuzzleNum != puzzleNumber) {
			handleRefresh();
			// initAnswer();
			window.localStorage.setItem("puzzleNumber", currPuzzleNum);
		}
		console.log(`puzzle num is: ${currPuzzleNum}`);
		initAnswerIdFromPuzzleNum(currPuzzleNum);
		console.log(`answer id: ${globalAnswer}`);

		// Destructuring the data of the player
		const answerClubsData = await fetchAnswerClubsDetails(globalAnswer);
		const playerName = answerClubsData.name;
		const clubIDs = answerClubsData.clubIDs;
		const clubNames = answerClubsData.clubNames;
		const period = answerClubsData.period;

		// init answer name
		globalAnswerName = playerName;
		console.log(`answer name: ${globalAnswerName}`);

		// init logos
		displayLogos(clubIDs, clubNames);

		// set up autocomplete
		autocomplete(document.getElementById("myInput"), []);

		// set up submit button
		fullPlayerData = await fetchAllPlayerData(); // need this by handleSubmit
		const mySubmitButton = document.getElementById("mySubmit");
		mySubmitButton.addEventListener("click", handleSubmit);

		// need these here to show them their guesses and answer reveal
		// in case they refresh
		displayGuesses();
		showRevealedAnswer();
	} catch (error) {
		console.error("Error in main function:", error);
	}
}

//runEveryXmin(1);
main();
