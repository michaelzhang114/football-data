const premID = 47;
const baseUrl = "https://www.fotmob.com/api";

// const baseUrl =
// 	"https://cors-anywhere.herokuapp.com/https://www.fotmob.com/api";

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

function arrayEquals(a, b) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
}

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

matchCareerPath([9825, 8456, 10283], 576165).then(
	// arsenal, man city, palmeiras
	// gabriel jesus
	function (value) {
		console.log(value);
	},
	function (error) {}
);
