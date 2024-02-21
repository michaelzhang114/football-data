// const BACKEND_DOMAIN = "http://localhost:5050/";
const BACKEND_DOMAIN = "/";

export async function getEnvConfigs() {
	// Fetch configuration from the server
	try {
		const resp = await fetch(`${BACKEND_DOMAIN}config`);
		const config = await resp.json();
		return config;
	} catch (error) {
		console.error("Error fetching configuration:", error);
	}
}

export async function fetchAnswerClubsDetails(playerId) {
	const baseUrl = `${BACKEND_DOMAIN}api/get-clubs-info/${playerId}`;
	try {
		const response = await fetch(baseUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseJSON = await response.json();
		return responseJSON;
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
}

export async function fetchAllPlayerData() {
	const myUrl = `${BACKEND_DOMAIN}api/all-players-info`;
	try {
		const response = await fetch(myUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseJSON = await response.json();
		return responseJSON;
	} catch (error) {
		console.error("Error fetching answer-id:", error.message);
	}
}

export async function displayLogos(logos, clubNames, transferType, period) {
	const puzzleNumDiv = document.getElementById("puzzle-number-wrapper");
	const puzzNum = window.localStorage.getItem("puzzleNumber");
	puzzleNumDiv.innerHTML = `Footle #${puzzNum}`;

	const baseUrl = `${BACKEND_DOMAIN}api/club-logos/`;
	try {
		const careerPathDiv = document.getElementById("career-path-wrapper");
		for (var i = 0; i < logos.length; i++) {
			console.log(period[i]);
			const dateString = period[i];
			const parts = dateString.split(" - "); // Split the string based on the '-' character
			const datePortion = parts[0]; // Extract the date portion (before the '-')
			// Parse the date string
			const dateArray = datePortion.split(" ");
			const monthIndex = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			].indexOf(dateArray[0]);
			const year = parseInt(dateArray[1], 10);

			const parsedDate = new Date(year, monthIndex, 1);

			// const parsedDate = new Date(Date.parse(datePortion + " 01"));
			// Get today's date
			const today = new Date();
			// Check if the parsed date is later than today's date
			const isLaterDate = parsedDate > today;
			console.log(parsedDate);
			console.log(isLaterDate);
			if (isLaterDate) {
				continue;
			}

			const imageElement = document.createElement("img");

			//Instead of manually setting image height and width. Make width fill the parent container. then height auto to keep the proportions
			// imageElement.setAttribute("height", "3.75rem");
			// imageElement.setAttribute("width", "3.75rem");
			// imageElement.setAttribute("width", "100%");
			// imageElement.setAttribute("height", "auto");

			const imageWrapper = document.createElement("div");
			imageWrapper.classList.add("club-wrapper");
			imageWrapper.append(imageElement);
			imageWrapper.style.opacity = "0";
			// imageWrapper.classList.add("fade-in");

			if (logos[i] == -1) {
				imageElement.src = "./img/-1.png";
			} else {
				const myUrl = baseUrl + `${logos[i]}`;
				const response = await fetch(myUrl);
				if (!response.ok) {
					imageElement.src = "./img/-1.png";
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const responseBlob = await response.blob();
				const imgURL = URL.createObjectURL(responseBlob);
				imageElement.src = imgURL;
			}

			imageElement.setAttribute("class", "club-logo");

			if (transferType[i] == "on loan") {
				imageWrapper.setAttribute(
					"aria-label",
					`${clubNames[i]} (on loan)`
				);
			} else {
				imageWrapper.setAttribute("aria-label", clubNames[i]);
			}

			imageWrapper.setAttribute("data-balloon-pos", "up");
			imageWrapper.classList.add("tooltip-small-text");
			// imageWrapper.setAttribute("data-balloon-length", "small");

			careerPathDiv.append(imageWrapper);
		}

		const clubLogos = document.querySelectorAll(".club-wrapper");

		for (var i = 0; i < clubLogos.length; i++) {
			clubLogos[i].classList.add("fade-in");
			clubLogos[i].style.opacity = "1";
		}
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
}

// async function fetchPuzzleNumber() {
// 	const baseUrl = `${BACKEND_DOMAIN}api/puzzle-number`;
// 	let puzzleNum;
// 	try {
// 		const response = await fetch(baseUrl);
// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}
// 		puzzleNum = await response.json();
// 		return puzzleNum;
// 	} catch (error) {
// 		console.error("Error fetching puzzle num:", error.message);
// 	}
// }

// async function fetchAnswer() {
// 	const myUrl = `${BACKEND_DOMAIN}api/answer`;
// 	try {
// 		const response = await fetch(myUrl);
// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}
// 		const responseJSON = await response.json();
// 		return {
// 			answerID: responseJSON.answerID,
// 			answerName: responseJSON.name,
// 		};
// 	} catch (error) {
// 		console.error("Error fetching answer:", error.message);
// 	}
// }
