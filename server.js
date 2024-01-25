const axios = require("axios"); // Use require instead of import
const express = require("express"); //Import the express dependency
const fs = require("fs").promises;

const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5050; //Save the port number where your server will be listening

let tmp_answerID = 576165;

const baseUrl = "https://www.fotmob.com/api";

const leaguesUrl = baseUrl + "/leagues?";
const teamsUrl = baseUrl + "/teams?";
const playerUrl = baseUrl + "/playerData?";
const imagesUrl = "https://images.fotmob.com/image_resources/logo/teamlogo/";

const DIRECTORY = "2024-01/";

const answerIdCandidates = [
	477588, 748382, 1372921, 626667, 80562, 674014, 109491, 729731, 662428,
	246575, 552718, 737066, 844477, 113772, 789630, 923498, 846383, 671529,
	113836, 766435, 540963, 1207581, 789502, 1035202, 240538, 800520, 289137,
	765693, 330643, 860920, 576165, 157838, 1131987, 860914, 109897, 751550,
	239219, 97194, 1352713, 818893, 688273, 292313, 843040, 167008, 806552,
	1021834, 1052898, 1368318, 1348595, 1137705, 724306, 214570, 1010426,
	1197347, 1192854, 850354, 266520, 212867, 155782, 955529, 802245, 942549,
	914132, 769166, 295060, 1030829, 959407, 729988, 469701, 704523, 1107910,
	182962, 974618, 538112, 255610, 304355, 751066, 208494, 906937, 77690,
	955406, 215168, 792645, 1107280, 1089691, 434325, 189103, 1077975, 1013277,
	1279764, 592102, 469804, 465960, 1086647, 307317, 674009, 746395, 620618,
	240054, 731855, 191869, 729506, 1098780, 198444, 1067256, 711357, 1226789,
	820024, 978680, 696646, 1137668, 950474, 1227012, 212944, 942368, 1099974,
	951954, 787350, 841150, 210111, 846005, 1200631, 107917, 266523, 312765,
	424129, 933576, 793820, 521318, 439369, 1195281, 940442, 816325, 363364,
	1098752, 319784, 956169, 470834, 1197250, 976506, 494597, 562727, 1203661,
	287894, 169756, 749736, 957118, 179410, 295067, 498532, 873237, 201690,
	72241, 1356310, 1079485, 493165, 877401, 146830, 891855, 862608, 493647,
	176186, 1190867, 94086, 959247, 773991, 1185748, 863098, 259306, 963812,
	450980, 488139, 982692, 923312, 1073402, 891743, 650616, 888912, 1197655,
	750032, 822716, 243138, 1086939, 484878, 950561, 807729, 861447, 1025462,
	785411, 860975, 776151, 1086012, 536457, 797908, 848034, 401932, 820140,
	1068902, 683402, 881500, 169200, 956682, 416175, 916332, 664444, 671331,
	894805, 1258092, 1002039, 201664, 789066, 873014, 617310, 1107648, 292462,
	818975, 209405, 1324871, 901495, 356406, 496563, 1250253, 1088066, 37234,
	775355, 1187213, 259301, 202643, 1070712, 974753, 524437, 933845, 789571,
	844425, 49543, 172949, 789578, 403049, 246331, 614006, 1084981, 942381,
	862993, 426880, 1021382, 357880, 630953, 846369, 783505, 662936, 1083796,
	148302, 304455, 760359, 822237, 30973, 672469, 865131, 966027, 258269,
	352887, 369761, 1076756, 171698, 303346, 276729, 308932, 466672, 935379,
	1112684, 532220, 831489, 535936, 425255, 1199272, 867414, 623621, 23354,
	775614, 612150, 997560, 687008, 263653, 963964, 866967, 591734, 189982,
	318615, 620026, 184321, 883075, 502420, 540088, 1078788, 827315, 556972,
	442277, 683450, 696443, 820581, 195668, 782502, 795371, 956683, 1113670,
	1128945, 1308370, 1067168, 1021929, 847983, 239920, 471274, 129915, 230982,
	1113690, 793907, 363333, 794253, 185349, 675088, 1107620, 963983, 360918,
	1253827, 716687, 719219, 279489, 982620, 803343, 905498, 268212, 157723,
	419664, 611491, 417068, 523825, 610184, 1096400, 955376, 1054122, 604785,
	961306, 795539, 690107, 282775, 1097466, 413557, 570461, 917802, 465750,
	967622, 889534, 422685, 1069536, 488412, 654908, 682548, 710159, 339992,
	1047671,
];

function getDaysPast() {
	// Set the target date (January is 0-based month in JavaScript)
	// jan 23 2024 9PM
	const targetDate = new Date(2024, 0, 23, 21, 0, 0);

	// Get the current date
	const currentDate = new Date();

	// Calculate the time difference in milliseconds
	const timeDifference = currentDate - targetDate;

	// Convert milliseconds to days
	const daysPast = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	return daysPast;
}

function initAnswerID() {
	if (answerIdCandidates.length === 0) {
		return null; // or any default value you prefer
	}

	const currIndex = getDaysPast();
	console.log(`currentIndex: ${currIndex}`);

	return answerIdCandidates[currIndex];
}

async function fetchCareerPath(playerID) {
	try {
		const myURL = playerUrl + `id=${playerID}`;
		console.log(myURL);
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
		const logoIDs = myCareerPath.toReversed().map((entry) => entry.teamId);
		console.log(logoIDs);
	} catch (error) {
		console.error("Error fetching logo:", error.message);
	}
}

tmp_answerID = initAnswerID(answerIdCandidates);
console.log(`Answer ID is: ${tmp_answerID}`);

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

		let startEnd = myCareerPath.toReversed().map((entry) => ({
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
			clubIDs: myCareerPath.toReversed().map((entry) => entry.teamId),
			clubNames: myCareerPath.toReversed().map((entry) => entry.team),
			period: transformedArray.map((t) => t.period),
		});
	} catch (error) {
		console.error("Error fetching data:", error.message);
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
		res.setHeader("Content-Type", "image/png"); // Adjust based on the image type
		res.send(imageResponse.data);
	} catch (error) {
		console.error("Error fetching image:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/api/refresh", (req, res) => {
	tmp_answerID = initAnswerID(answerIdCandidates);
	console.log(`Refresh. Answer ID is now: ${tmp_answerID}`);
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
