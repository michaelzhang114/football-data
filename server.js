const express = require("express"); //Import the express dependency
const fs = require("fs").promises;

const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5050; //Save the port number where your server will be listening

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

app.get("/api/club-ids", (req, res) => {
	res.send({ clubIDs: [8178, 8455, 9825, 9817] });
});

app.get("/api/club-logos/:id", (req, res) => {
	const logoID = req.params.id;
	const imagePath = `${__dirname}/assets/club-logos/${logoID}.png`; // Assuming images are stored in a folder named "images"
	console.log(imagePath);
	// Send the image file
	res.sendFile(imagePath);
	//res.send({ text: "logos" });
});

app.get("/api/all-players-info", async (req, res) => {
	const directory = "2024-01/";
	try {
		const data = await fs.readFile(
			`${directory}prem-players.json`,
			"utf-8"
		);
		const jsonData = JSON.parse(data);
		res.json(jsonData);
	} catch (error) {
		console.error("Error reading the file:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/api/answer-id", (req, res) => {
	res.send({ answerID: 576165 });
});

app.listen(port, () => {
	//server starts listening for any attempts from a client to connect at port: {port}
	console.log(`Now listening on port ${port}`);
});

// app.get("/api/all-players-names", async (req, res) => {
// 	const directory = "2024-01/";
// 	try {
// 		const data = await fs.readFile(
// 			`${directory}prem-players-names.json`,
// 			"utf-8"
// 		);
// 		const jsonData = JSON.parse(data);
// 		res.json(jsonData);
// 	} catch (error) {
// 		console.error("Error reading the file:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// });
