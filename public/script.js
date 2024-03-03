import { autocomplete } from "./autocomplete.js";
import {
	displayGuesses,
	showCopyText,
	goBackToTop,
	isNameInArray,
} from "./helpers.js";
import { initLocalStorage } from "./storage.js";
import { initStatistics } from "./stats.js";
import { initBasicCssStuff } from "./nav.js";
import { getCurrentIndex, getAnswerIdFromPuzzleNumber } from "./answer.js";
import {
	fetchAnswerClubsDetails,
	fetchAllPlayerData,
	displayLogos,
	getEnvConfigs,
} from "./api-calls.js";
import { startCountdown } from "./countdown.js";

// use global vars for these to avoid putting them in local storage
var globalAnswer;
var globalAnswerName;

// global for tracking debug
var globalCurrPuzzNumDebug = 0;

// run get on all player data. Only need player names and IDs but getting all for now
var fullPlayerData = [];

function getIdByName(playerName) {
	const player = fullPlayerData.find(
		(player) =>
			deaccentAndLowerCase(player.name) ===
			deaccentAndLowerCase(playerName)
	);

	// Check if the player with the given name is found
	if (player) {
		return player.id;
	} else {
		// Return a specific value (or handle the absence of the player as needed)
		return null;
	}
}

function deaccentAndLowerCase(myString) {
	var string_norm = myString.normalize("NFD").replace(/\p{Diacritic}/gu, ""); // Old method: .replace(/[\u0300-\u036f]/g, "");
	return string_norm.toLowerCase().trim();
}

function handleSubmit(evt) {
	// evt.preventDefault();

	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGuesses = JSON.parse(window.localStorage.getItem("guesses"));
	const myIsSolved = JSON.parse(window.localStorage.getItem("isSolved"));

	if (myGuessesRemaining <= 0 || myIsSolved === true) {
		return;
	}

	const userInput = document.getElementById("myInput").value;

	// If their guess was 0 length, leave it - TODO
	if (userInput.length == 0) return;

	// If they already guessed this, leave it - TODO
	if (isNameInArray(myGuesses, userInput)) return;

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

	//passing the name of function
	displayGuesses("handleSubmit");
	showRevealedAnswer();

	if (evt.pointerType === "touch") {
		evt.preventDefault();
	}
}

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
	revealDiv.classList.add("fade-in");
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
		startCountdown();

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
		startCountdown();

		return;
	}

	//otherwise keep it hidden
	revealDiv.style.display = "none";
}

function initDebugFooter() {
	const f = document.querySelector("footer");
	const btnPrev = document.createElement("button");
	btnPrev.addEventListener("pointerdown", (evt) => {
		globalCurrPuzzNumDebug--;

		let currPuzzleNum = Number(window.localStorage.getItem("puzzleNumber"));
		currPuzzleNum += globalCurrPuzzNumDebug;
		syncPuzzleNumTo(currPuzzleNum);

		if (evt.pointerType === "touch") {
			evt.preventDefault();
		}
	});
	btnPrev.innerText = "prev";

	const btnNext = document.createElement("button");
	btnNext.addEventListener("pointerdown", (evt) => {
		globalCurrPuzzNumDebug++;

		let currPuzzleNum = Number(window.localStorage.getItem("puzzleNumber"));
		currPuzzleNum += globalCurrPuzzNumDebug;
		syncPuzzleNumTo(currPuzzleNum);

		if (evt.pointerType === "touch") {
			evt.preventDefault();
		}
	});
	btnNext.innerText = "next";

	f.appendChild(btnPrev);
	f.appendChild(btnNext);
}

function syncPuzzleNumTo(currPuzzleNum) {
	// when the puzzle num (index) changes, change the local storage to that.
	// safety: set local storage to at least 0
	if (currPuzzleNum != window.localStorage.getItem("puzzleNumber")) {
		handleRefresh();
		window.localStorage.setItem(
			"puzzleNumber",
			currPuzzleNum < 0 ? 0 : currPuzzleNum
		);
	}
}

async function main() {
	try {
		const myEnvConfig = await getEnvConfigs();
		console.log(myEnvConfig);
		if (myEnvConfig == "development") {
			initDebugFooter();
		}
		// First, make sure they have default values in local storage
		initLocalStorage(myEnvConfig);

		// These can happen whenever
		initBasicCssStuff();
		initStatistics();

		if (myEnvConfig === "production") {
			const currPuzzleNum = getCurrentIndex();
			syncPuzzleNumTo(currPuzzleNum);
		}

		// get and save the answer id in a variable (not local storage)
		globalAnswer = getAnswerIdFromPuzzleNumber(
			window.localStorage.getItem("puzzleNumber")
		);

		// console.log(`answer id: ${globalAnswer}`);

		// Destructuring the data of the player
		const answerClubsData = await fetchAnswerClubsDetails(globalAnswer);
		const playerName = answerClubsData.name;
		const clubIDs = answerClubsData.clubIDs;
		const clubNames = answerClubsData.clubNames;
		const period = answerClubsData.period;
		const transferType = answerClubsData.transferType;

		// init answer name
		globalAnswerName = playerName;
		// console.log(`answer name: ${globalAnswerName}`);

		// init logos
		displayLogos(clubIDs, clubNames, transferType, period);

		// set up autocomplete
		autocomplete(document.getElementById("myInput"), []);

		// set up submit button
		fullPlayerData = await fetchAllPlayerData(); // need this by handleSubmit
		const mySubmitButton = document.getElementById("mySubmit");
		mySubmitButton.addEventListener("pointerdown", handleSubmit);
		// mySubmitButton.addEventListener("touchstart", handleSubmit);
		// mySubmitButton.addEventListener("click", handleSubmit);

		// need these here to show them their guesses and answer reveal
		// in case they refresh
		displayGuesses();
		showRevealedAnswer();
	} catch (error) {
		console.error("Error in main function:", error);
	}
}

main();
