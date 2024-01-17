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
	169756, 319784, 776689, 1068920, 1117148, 171698, 209405, 357880, 568571,
	671529, 760712, 820140, 1107620, 1113690, 1249634, 1355539, 172949, 202643,
	831489, 846005, 933768, 956683, 963964, 1310118, 292462, 570461, 806552,
	860914, 950561, 1211648, 1231075, 1324871, 120569, 268375, 210111, 419664,
	425255, 477588, 488412, 570434, 710159, 729731, 792645, 303059, 356406,
	424129, 465960, 610184, 787350, 816325, 1021929, 540088, 671331, 818893,
	923498, 1088066, 36373, 276729, 363364, 533127, 159833, 263653, 417068,
	521318, 614006, 844477, 1070712, 1414691, 169200, 239219, 488139, 609755,
	675088, 955529, 974753, 1288450, 1333449, 312765, 737066, 815006, 942368,
	1113790, 1207956, 562727, 746395, 982692, 1013046, 160627, 623621, 664444,
	776151, 795179, 942381, 955406, 1021834, 1199709, 282775, 339992, 434325,
	534670, 654096, 889534, 1025462, 318615, 576165, 748382, 749736, 860920,
	961995, 1021586, 95336, 538501, 795539, 862993, 163670, 276121, 361315,
	789066, 797908, 941573, 1052898, 1097466, 266523, 493165, 604126, 620618,
	724306, 773991, 873014, 1107280, 212867, 654908, 822237, 935379, 970692,
	1076756, 1250658, 30973, 210164, 963812, 49543, 155782, 267371, 281207,
	307317, 617310, 719219, 770267, 279490, 524437, 766435, 770256, 783505,
	1315319, 158545, 214426, 426880, 491883, 523825, 683450, 891743, 982620,
	1203658, 1331666, 107917, 815080, 1131987, 38807, 201690, 303346, 304455,
	688278, 768331, 891855, 955139, 974618, 1251334, 37234, 167008, 469701,
	942549, 1073742, 1352713, 113836, 416850, 862608, 1021382, 1068482, 1086012,
	1227012, 1336566, 1386101, 24155, 611491, 866967, 43248, 230982, 255610,
	258269, 362694, 724436, 751550, 760320, 847983, 865118, 157723, 208494,
	422685, 593116, 750032, 843099, 1113785, 1292810, 413557, 696365, 846381,
	967622, 1073402, 1199272, 1203665, 72241, 195668, 280484, 287894, 188058,
	189982, 191869, 259306, 279489, 299984, 308932, 538112, 956682, 1107910,
	1197655, 535936, 820024, 850354, 860975, 867414, 1089691, 1296763, 155913,
	184321, 442277, 521148, 690107, 760359, 906937, 363357, 789571, 1067256,
	80562, 672469, 696646, 782502, 793907, 807729, 873289, 917802, 955376,
	966026, 1096400, 1197250, 966027, 1089685, 1096353, 1137668, 1137705,
	1190867, 1200631, 1372921, 246575, 704523, 976506, 1077975, 1084981,
	1197347, 1458868, 189103, 416175, 581530, 169162, 239920, 360918, 470834,
	848034, 865931, 1013277, 1116391, 1200657, 421786, 769166, 777052, 933845,
	940442, 1054122, 1070794, 1174672, 240054, 620026, 843040, 863098, 1458595,
	37780, 176186, 681213, 731855, 160447, 194323, 785411, 819215, 819762,
	956621, 1140003, 1195281, 439369, 532743, 562724, 613182, 729769, 875672,
	1086939, 1233655, 343316, 469202, 591734, 674014, 789630, 794253, 846369,
	933576, 1250253, 215168, 605643, 887969, 198444, 465750, 469804, 662428,
	683402, 696443, 800520, 877401, 182962, 502420, 524434, 556972, 575779,
	604785, 894805, 94086, 262550, 292313, 493647, 494417, 866201, 1128945,
	280287, 562726, 719330, 109897, 146830, 157838, 503659, 626667, 844425,
	883075, 950829, 1120224, 214570, 295067, 466672, 496563, 818975, 951954,
	1192854, 1316124, 154280, 637746, 706297, 1029063, 1226789, 1308370, 36283,
	304355, 471274, 729988, 195299, 246331, 268212, 551805, 575804, 592102,
	682548, 687008, 716687, 729506, 957118, 1050822, 1078788, 1458711, 148302,
	155129, 765693, 775614, 789502, 795371, 827315, 1021336, 1181700, 169719,
	426202, 643717, 846383, 1050166, 330643, 403049, 806579, 71908, 240538,
	552718, 562892, 650647, 711357, 803343, 961306, 1002039, 266520, 532220,
	650616, 688273, 759566, 856685, 865131, 888912, 1157236, 391064, 408987,
	666857, 923312, 1010426, 1083796, 23184, 303919, 959247, 23354, 77690,
	243138, 290410, 662936, 874025, 1030829, 1112684, 179410, 352887, 361770,
	363333, 704151, 751649, 939542, 950474, 1185748, 612150, 1079485, 1098752,
	1356310, 24229, 131408, 239759, 295060, 369761, 471271, 570760, 630953,
	789509, 933635, 956169, 1098780, 1099974, 1437880, 166422, 185349, 215384,
	259301, 498532, 541330, 751066, 901495, 1557926, 282276, 562725, 674009,
	802245, 873237, 1557925, 501380, 760752, 1187213, 289137, 484878, 789578,
	822716, 831044, 861447, 905498, 1279764, 46008, 129915, 494597, 540963,
	623716, 655575, 817720, 978680, 1341387, 1368318, 109491, 201664, 536457,
	833697, 881500, 963983, 1067168, 1069536, 1113670, 212944, 401932, 1348595,
	113772, 199494, 202181, 295062, 492589, 511032, 688271, 789646, 793820,
	914132, 916332, 997560, 1068902, 97194, 210971, 742405, 775355, 1035202,
	1047671, 1055316, 1107648, 1396784, 1601905, 509151, 820581, 841150,
	1086647, 1253827, 1258092,
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
		const logoIDs = myCareerPath.reverse().map((entry) => entry.teamId);
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
		res.send({
			clubIDs: myCareerPath.reverse().map((entry) => entry.teamId),
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
