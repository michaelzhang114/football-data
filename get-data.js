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

		// const playersSimplified = players.map((p) => p.id);
		// console.log(playersSimplified);
	} catch (error) {
		console.error("Error w/ API:", error.message);
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

function arrayEquals(a, b) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
}

//fetchAndWriteAllData();

//Gabriel Jesus ID: 576165

async function matchCareerPath(answerIDs, playerID) {
	const myCareerPath = await fetchCareerPath(playerID);
	const myClubsIDs = myCareerPath.map((c) => c.teamId);
	if (arrayEquals(answerIDs, myClubsIDs)) {
		return { verdict: "Correct!", schema: Array(answerIDs.length).fill(1) };
	}

	var outArray = [];
	for (var i = 0; i < answerIDs.length; i++) {
		if (myClubsIDs.includes(answerIDs[i])) {
			outArray.push(1);
		} else {
			outArray.push(0);
		}
	}
	return { verdict: "Incorrect", schema: outArray };
	// console.log(myClubs);
}

// arsenal, man city, palmeiras
// gabriel jesus

matchCareerPath([9825, 8456, 10283], 576165).then(
	function (value) {
		console.log(value);
	},
	function (error) {}
);
