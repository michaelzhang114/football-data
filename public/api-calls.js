// const BACKEND_DOMAIN = "http://localhost:5050/";
const BACKEND_DOMAIN = "/";

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

export async function displayLogos(logos, clubNames) {
	const puzzleNumDiv = document.getElementById("puzzle-number-wrapper");
	const puzzNum = window.localStorage.getItem("puzzleNumber");
	puzzleNumDiv.innerHTML = `Footle #${puzzNum}`;

	const baseUrl = `${BACKEND_DOMAIN}api/club-logos/`;
	try {
		const careerPathDiv = document.getElementById("career-path-wrapper");
		for (var i = 0; i < logos.length; i++) {
			const imageElement = document.createElement("img");
			// imageElement.style.opacity = "0";
			imageElement.setAttribute("height", "3.75rem");
			imageElement.setAttribute("width", "3.75rem");

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

			imageWrapper.setAttribute("aria-label", clubNames[i]);
			imageWrapper.setAttribute("data-balloon-pos", "up");

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