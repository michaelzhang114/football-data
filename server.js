const express = require("express"); //Import the express dependency
const fs = require("fs").promises;

const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5050; //Save the port number where your server will be listening

let tmp_answerID = 576165;

const baseUrl = "https://www.fotmob.com/api";

const leaguesUrl = baseUrl + "/leagues?";
const teamsUrl = baseUrl + "/teams?";
const playerUrl = baseUrl + "/playerData?";

const DIRECTORY = "2024-01/";

const answerIdCandidates = [
	169756, 319784, 776689, 1068920, 1117148, 171698, 209405, 357880, 568571,
	671529, 760712, 820140, 1107620, 1113690, 1249634, 1355539, 172949, 202643,
	831489, 846005, 933768, 956683, 963964, 1310118, 292462, 570461, 806552,
	860914, 950561, 1211648, 1231075, 1324871, 120569,
];

function initAnswerID() {
	if (answerIdCandidates.length === 0) {
		return null; // or any default value you prefer
	}

	// Generate a random index within the array's length
	const randomIndex = Math.floor(Math.random() * answerIdCandidates.length);

	// Return the randomly picked element
	return answerIdCandidates[randomIndex];
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

async function getAllLogosForPlayer(playerID) {
	try {
		const myCareerPath = await fetchCareerPath(playerID);
		const logoIDs = myCareerPath.reverse().map((entry) => entry.teamId);
		console.log(logoIDs);
	} catch (error) {
		console.error("Error fetching logo:", error.message);
	}
}

tmp_answerID = initAnswerID(answerIdCandidates);
console.log(tmp_answerID);

app.use(express.static("public"));

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
	//get requests to the root ("/") will route here
	res.sendFile("public/index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
	//the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.get("/api", (req, res) => {
	res.send({ text: "hi" });
});

app.get("/api/club-ids", async (req, res) => {
	try {
		const myCareerPath = await fetchCareerPath(tmp_answerID);
		res.send({
			clubIDs: myCareerPath.reverse().map((entry) => entry.teamId),
		});
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
});

app.get("/api/club-logos/:id", (req, res) => {
	const logoID = req.params.id;
	const imagePath = `${__dirname}/assets/club-logos/${logoID}.png`; // Assuming images are stored in a folder named "images"
	console.log(imagePath);
	// Send the image file
	res.sendFile(imagePath);
	//res.send({ text: "logos" });
});

app.get("/api/refresh", (req, res) => {
	tmp_answerID = initAnswerID(answerIdCandidates);
	console.log(tmp_answerID);
	res.json(tmp_answerID);
});

app.get("/api/all-players-info", async (req, res) => {
	try {
		const data = await fs.readFile(
			`${DIRECTORY}prem-players.json`,
			"utf-8"
		);
		const jsonData = JSON.parse(data);
		res.json(jsonData);
	} catch (error) {
		console.error("Error reading the file:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/api/answer", async (req, res) => {
	try {
		const data = await fs.readFile(
			`${DIRECTORY}prem-players.json`,
			"utf-8"
		);
		const jsonData = JSON.parse(data);
		const player = jsonData.find((p) => p.id === tmp_answerID);
		res.send({ answerID: tmp_answerID, name: player.name });
	} catch (error) {
		console.error("Error reading the file (/api/answer):", error);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	//server starts listening for any attempts from a client to connect at port: {port}
	console.log(`Now listening on port ${port}`);
});
