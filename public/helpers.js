const DOMAIN = "www.footlegame.com";

export function goBackToTop() {
	// window.scrollTo(0, 0);

	const scrollStep = -window.scrollY / (500 / 15); // Adjust the speed here (500 is the duration in milliseconds)

	const scrollInterval = setInterval(() => {
		if (window.scrollY !== 0) {
			window.scrollBy(0, scrollStep);
		} else {
			clearInterval(scrollInterval);
		}
	}, 15);
}

export function displayGuesses() {
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGuesses = JSON.parse(window.localStorage.getItem("guesses"));

	const submissionsWrapper = document.getElementById("submissions-wrapper");
	submissionsWrapper.replaceChildren();

	const guessesRemainingDiv = document.getElementById("guesses-remaining");
	guessesRemainingDiv.textContent = `${myGuessesRemaining} guesses remaining!`;

	if (!myGuesses) return;

	for (var i = 0; i < myGuesses.length; i++) {
		const myGuessDiv = document.createElement("div");
		myGuessDiv.setAttribute("class", "guess");

		const outputDiv = document.createElement("div");
		outputDiv.setAttribute("class", "guess-output");
		myGuessDiv.append(outputDiv);
		outputDiv.textContent = `${myGuesses[i].output}`;

		const guessNameDiv = document.createElement("div");
		guessNameDiv.setAttribute("class", "guess-name");
		myGuessDiv.append(guessNameDiv);
		guessNameDiv.textContent = `${myGuesses[i].name}`;

		// myGuessDiv.textContent = `${myGuesses[i].name} ${myGuesses[i].output}`;
		// console.log(myGuesses[i].id);
		submissionsWrapper.append(myGuessDiv);
	}
}

export function showCopyText(tmp) {
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	let outString = "";
	const numCross = 5 - myGuessesRemaining - 1;
	for (let i = 0; i < numCross; i++) {
		outString += "❌";
	}
	outString += tmp;
	for (let i = 0; i < myGuessesRemaining; i++) {
		outString += "⬜";
	}

	const puzzleNumber = window.localStorage.getItem("puzzleNumber");
	const myTextArea = document.getElementById("share-text-area");
	myTextArea.value = `Footle #${puzzleNumber}\n${outString}\n${DOMAIN}`;
	initCopyButton();
}

function initCopyButton() {
	const btn = document.getElementById("copy-button");
	// btn.addEventListener("touchstart", handleCopy);
	// btn.addEventListener("click", handleCopy);
	btn.addEventListener("pointerdown", handleCopy);
}

function handleCopy(evt) {
	if (evt.pointerTyper === "touch") {
		evt.preventDefault();
	}

	var textarea = document.getElementById("share-text-area");
	textarea.select();
	textarea.setSelectionRange(0, 99999); // For mobile devices
	navigator.clipboard.writeText(textarea.value);

	// Change the button text and style to indicate copying
	var copyButton = document.getElementById("copy-button");
	var mySvg = copyButton.children[0];

	const copiedSVG = `
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
		<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		<path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
		<path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
		<path d="M11 14l2 2l4 -4" />
	</svg>`;

	mySvg.innerHTML = copiedSVG;

	// copyButton.innerText = "Copied!";
	copyButton.classList.add("copied");

	// Reset the button text and style after a short delay
	setTimeout(function () {
		const copySVG = `
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
			<path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
		</svg>
		`;
		mySvg.innerHTML = copySVG;
		copyButton.classList.remove("copied");
	}, 2000);
}

export function isNameInArray(array, targetName) {
	//check if any object in the array has a "name" property equal to a given string
	return array.some((player) => player.name === targetName);
}
