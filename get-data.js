import axios from "axios";

const fs = require("fs");
const premID = 47;
const baseUrl = "https://www.fotmob.com/api";

const leaguesUrl = baseUrl + "/leagues?";
const teamsUrl = baseUrl + "/teams?";
const playerUrl = baseUrl + "/playerData?";

async function fetchTeams(leagueID) {
	const getLeagueByIdURL = leaguesUrl + `id=${leagueID}`;
	try {
		const response = await fetch(getLeagueByIdURL);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseData = await response.json();
		const teams = responseData.table[0].data.table.all; // Extracting teams from the league
		return teams;
	} catch (error) {
		console.error("Error fetching data (fetchTeams):", error.message);
	}
}

async function fetchPlayers(teamID) {
	//console.log(teamID);
	const getPlayersByTeamIdURL = teamsUrl + `id=${teamID}`;
	// console.log(getPlayersByTeamIdURL);
	try {
		const response = await fetch(getPlayersByTeamIdURL);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseData = await response.json();
		// console.log(responseData);
		const squadNested = responseData.squad;
		const squad = squadNested
			.slice(1) // First element is coach. Slice to select all elements except for first.
			.flat(2) // The response array is nested, flatten array with depth=2
			.filter((item) => typeof item === "object"); // Leaves some string tags (coach, midfielder, etc.). This removes all non {}.
		return squad;
	} catch (error) {
		console.error("Error fetching data (fetchPlayers):", error.message);
	}
}

async function fetchCareerPath(playerID) {
	try {
		const myURL = playerUrl + `id=${playerID}`;
		const response = await fetch(myURL);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseData = await response.json();
		const careerPath =
			responseData.careerHistory.careerItems.senior.teamEntries;
		//console.log(careerPath);
		return careerPath;
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
}

async function fetchAndWriteAllData() {
	try {
		const currentDate = getFriendlyDate();
		const folderName = `./${currentDate}/`;
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
		}

		const teams = await fetchTeams(premID);
		writeToFile(`${folderName}teams.json`, JSON.stringify(teams));
		console.log(`Wrote ${teams.length} teams in teams.json`);

		const teamsSimplified = teams.map((t) => t.id);
		writeToFile(
			`${folderName}teams-simplified.json`,
			JSON.stringify(teamsSimplified)
		);
		console.log(
			`Wrote ${teamsSimplified.length} teams in teams-simplified.json`
		);

		var players = [];
		for (let i = 0; i < teamsSimplified.length; i++) {
			const currentTeamPlayers = await fetchPlayers(teamsSimplified[i]);
			players = players.concat(currentTeamPlayers);
		}
		writeToFile(`${folderName}prem-players.json`, JSON.stringify(players));
		console.log(`Wrote ${players.length} players in prem-players.json`);

		const listOfPlayerNames = players.map((p) => p.name);
		writeToFile(
			`${folderName}prem-players-names.json`,
			JSON.stringify(listOfPlayerNames)
		);
		console.log(
			`Wrote ${listOfPlayerNames.length} players in prem-players-names.json`
		);

		const listOfPlayerIDs = players.map((p) => p.id);
		//downloadAllPlayerPics(listOfPlayerIDs);

		writeToFile(
			`${folderName}prem-players-ids.json`,
			JSON.stringify(listOfPlayerIDs)
		);
		console.log(
			`Wrote ${listOfPlayerIDs.length} players in prem-players-ids.json`
		);
	} catch (error) {
		console.error("Error w/ API:", error.message);
	}
}

function writeToFile(fileName, data) {
	// Helper to write stuff to file
	fs.writeFileSync(fileName, data, (err) => {
		if (err) throw err;
	});
}

function getFriendlyDate() {
	// Helper to generate friendly yyyy-mm date
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
	const formattedDate = `${year}-${month}`;
	return formattedDate;
}

async function downloadImage(url, id, dir) {
	try {
		const response = await axios.get(`${url}${id}.png`, {
			responseType: "arraybuffer",
		});

		if (response.status === 200) {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			const imageData = Buffer.from(response.data, "binary");
			fs.writeFileSync(`${dir}/${id}.png`, imageData);
			console.log(`Image ${id} downloaded successfully.`);
		} else {
			console.error(
				`Failed to download image ${id}. Status: ${response.status}`
			);
		}
	} catch (error) {
		console.error(`Error downloading image ${id}:`, error.message);
	}
}

async function downloadAllLogos(logoIdArray) {
	for (let i = 0; i < logoIdArray.length; i++) {
		const logoURL =
			"https://images.fotmob.com/image_resources/logo/teamlogo/";
		downloadImage(logoURL, logoIdArray[i], "logoo");
	}
}

async function downloadAllPlayerPics(playerIDs) {
	const imageURL = "https://images.fotmob.com/image_resources/playerimages/";
	try {
		for (var i = 0; i < playerIDs.length; i++) {
			const currentID = playerIDs[i];
			downloadImage(imageURL, currentID, "./assets/player-images/");
		}
	} catch (error) {
		console.error(`Error getting player pics`, error.message);
	}
}

async function getAllLogoIDs() {
	const allPlayerIDs = [
		169756, 319784, 776689, 1068920, 1117148, 171698, 209405, 357880,
		568571, 671529, 760712, 820140, 1107620, 1113690, 1249634, 1355539,
		172949, 202643, 831489, 846005, 933768, 956683, 963964, 1310118, 292462,
		570461, 806552, 860914, 950561, 1211648, 1231075, 1324871, 120569,
	];
	var allLogoIDs = [];
	try {
		for (let i = 0; i < allPlayerIDs.length; i++) {
			const myCareerPath = await fetchCareerPath(allPlayerIDs[i]);
			const logoIDs = myCareerPath
				.toReversed()
				.map((entry) => entry.teamId);
			allLogoIDs = allLogoIDs.concat(logoIDs);
		}
		let uniqueAllLogos = [...new Set(allLogoIDs)];
		console.log(uniqueAllLogos);
	} catch (error) {
		console.error("Error fetching logo:", error.message);
	}
}

// Example usage
// const imageUrl = "https://images.fotmob.com/image_resources/playerimages/";
// const imageId = "688278"; // Replace with the actual image ID

// fetchAndWriteAllData();

//getAllLogoIDs();
downloadAllLogos([
	161780, 8603, 8654, 8650, 8702, 8686, 1854, 9819, 10007, 10014, 9863, 8599,
	8198, 10189, 8674, 9925, 8466, 8235, 9938, 8667, 8451, 8638, 8285, 8525,
	213350, 9874, 178475, 10104, 8559, 8597, 8528, 161774, 8634, 9823, 6180,
	6244, 9997, 10269, 10086, 10204, 10077, 1915, 10013, 163363, 8593, 9879,
	8655, 101757, 9931, 8455, 8535, 6403, 9906, 9773, 8602, 455494, 8640,
	193027, 2254, 8450, 9865, 9772, 10170, -1, 10237, 8619, 8391, 8529, 8668,
	8657, 10252,
]);
