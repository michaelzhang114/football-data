const axios = require("axios"); // Use require instead of import
const express = require("express"); //Import the express dependency
const fs = require("fs").promises;
const sharp = require("sharp");

const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5050; //Save the port number where your server will be listening

// let tmp_answerID = 576165;

const baseUrl = "https://www.fotmob.com/api";

const leaguesUrl = baseUrl + "/leagues?";
const teamsUrl = baseUrl + "/teams?";
const playerUrl = baseUrl + "/playerData?";
const imagesUrl = "https://images.fotmob.com/image_resources/logo/teamlogo/";

const DIRECTORY = "2024-01/";

async function fetchPlayerInfo(playerID) {
	try {
		const myURL = playerUrl + `id=${playerID}`;
		console.log(`fetching player info: ${myURL}`);
		const response = await fetch(myURL);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseData = await response.json();
		const careerPath =
			responseData.careerHistory.careerItems.senior.teamEntries;
		const playerName = responseData.name;
		return { name: playerName, career: careerPath };
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
}

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

app.get("/api/get-clubs-info/:id", async (req, res) => {
	try {
		console.log("hit");
		const answerID = req.params.id;
		const { name, career } = await fetchPlayerInfo(answerID);

		let startEnd = career.toReversed().map((entry) => ({
			startDate: entry.startDate,
			endDate: entry.endDate,
		}));

		const transformedArray = startEnd.map((d) => {
			let startMonthYear;
			let endMonthYear;
			if (d.startDate == null) {
				startMonthYear = "XXX";
			} else {
				startMonthYear = new Date(d.startDate).toLocaleString("en-us", {
					month: "short",
					year: "numeric",
				});
			}

			if (d.endDate == null) {
				endMonthYear = "Now";
			} else {
				endMonthYear = new Date(d.endDate).toLocaleString("en-us", {
					month: "short",
					year: "numeric",
				});
			}

			return {
				period: `${startMonthYear} - ${endMonthYear}`,
			};
		});

		res.send({
			name: name,
			clubIDs: career.toReversed().map((entry) => entry.teamId),
			clubNames: career.toReversed().map((entry) => entry.team),
			period: transformedArray.map((t) => t.period),
		});
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
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

app.get("/api/club-logos/:id", async (req, res) => {
	const logoID = req.params.id;
	const imgUrl = `${imagesUrl}${logoID}.png`;
	console.log(imgUrl);
	try {
		const imageResponse = await axios.get(imgUrl, {
			responseType: "arraybuffer",
		});

		const compressedImageBuffer = await sharp(imageResponse.data)
			.png({ compressionLevel: 7 }) //0 is least compressed, 9 is most compressed
			.toBuffer();

		res.setHeader("Content-Type", "image/png"); // Adjust based on the image type
		res.send(compressedImageBuffer);
		// res.send(imageResponse.data);
	} catch (error) {
		console.error("Error fetching image:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	//server starts listening for any attempts from a client to connect at port: {port}
	console.log(`Now listening on port ${port}`);
});
