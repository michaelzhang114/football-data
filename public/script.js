import { autocomplete } from "./autocomplete.js";

// const BACKEND_DOMAIN = "http://localhost:5050/";
const BACKEND_DOMAIN = "/";

var globalAnswer;
var globalAnswerName;

const ALL_PLAYERS = [
	"Adrian",
	"Alisson Becker",
	"Caoimhin Kelleher",
	"Vitezslav Jaros",
	"Marcelo",
	"Joel Matip",
	"Virgil van Dijk",
	"Andrew Robertson",
	"Joseph Gomez",
	"Konstantinos Tsimikas",
	"Trent Alexander-Arnold",
	"Ibrahima Konaté",
	"Jarell Quansah",
	"Conor Bradley",
	"Luke Chambers",
	"Calum Scanlon",
	"Thiago Alcántara",
	"Wataru Endo",
	"Alexis Mac Allister",
	"Dominik Szoboszlai",
	"Curtis Jones",
	"Ryan Gravenberch",
	"Harvey Elliott",
	"Fabio Carvalho",
	"Stefan Bajcetic",
	"Mohamed Salah",
	"Diogo Jota",
	"Cody Gakpo",
	"Luis Diaz",
	"Darwin Nunez",
	"Kaide Gordon",
	"James McConnell",
	"Ben Doak",
	"Robin Olsen",
	"Emiliano Martinez",
	"Lucas Digne",
	"Tyrone Mings",
	"Calum Chambers",
	"Álex Moreno",
	"Clément Lenglet",
	"Diego Carlos",
	"Ezri Konsa",
	"Matty Cash",
	"Pau Torres",
	"Bertrand Traoré",
	"John McGinn",
	"Leander Dendoncker",
	"Youri Tielemans",
	"Emiliano Buendia",
	"Douglas Luiz",
	"Boubacar Kamara",
	"Jacob Ramsey",
	"Ollie Watkins",
	"Leon Bailey",
	"Nicolo Zaniolo",
	"Moussa Diaby",
	"Jhon Duran",
	"Scott Carson",
	"Stefan Ortega",
	"Ederson Moraes",
	"Zack Steffen",
	"Kyle Walker",
	"John Stones",
	"Nathan Aké",
	"Manuel Akanji",
	"Ruben Dias",
	"Sergio Gomez",
	"Josko Gvardiol",
	"Max Alleyne",
	"Kevin De Bruyne",
	"Mateo Kovacic",
	"Bernardo Silva",
	"Kalvin Phillips",
	"Rodri",
	"Matheus Nunes",
	"Julián Álvarez",
	"Rico Lewis",
	"Mahamadou Susoho",
	"Jack Grealish",
	"Erling Haaland",
	"Phil Foden",
	"Jérémy Doku",
	"Oscar Bobb",
	"Micah Hamilton",
	"David Raya",
	"Aaron Ramsdale",
	"Karl Hein",
	"James Hillson",
	"Cédric Soares",
	"Oleksandr Zinchenko",
	"Takehiro Tomiyasu",
	"Ben White",
	"Gabriel",
	"Jurrien Timber",
	"William Saliba",
	"Jakub Kiwior",
	"Lino Sousa",
	"Jorginho",
	"Mohamed Elneny",
	"Thomas Partey",
	"Martin Ødegaard",
	"Declan Rice",
	"Emile Smith Rowe",
	"Fabio Vieira",
	"Leandro Trossard",
	"Gabriel Jesus",
	"Reiss Nelson",
	"Kai Havertz",
	"Edward Nketiah",
	"Bukayo Saka",
	"Gabriel Martinelli",
	"Fraser Forster",
	"Guglielmo Vicario",
	"Alfie Whiteman",
	"Brandon Austin",
	"Ivan Perisic",
	"Ben Davies",
	"Eric Dier",
	"Cristian Romero",
	"Emerson Royal",
	"Pedro Porro",
	"Iyenoma Udogie",
	"Micky van de Ven",
	"Ashley Phillips",
	"Pierre-Emile Højbjerg",
	"James Maddison",
	"Giovani Lo Celso",
	"Rodrigo Bentancur",
	"Yves Bissouma",
	"Ryan Sessegnon",
	"Oliver Skipp",
	"Pape Sarr",
	"Heung-Min Son",
	"Richarlison",
	"Manor Solomon",
	"Dejan Kulusevski",
	"Bryan Gil",
	"Brennan Johnson",
	"Alejo Veliz",
	"Lukasz Fabianski",
	"Alphonse Areola",
	"Joseph Anang",
	"Angelo Ogbonna",
	"Aaron Cresswell",
	"Emerson",
	"Kurt Zouma",
	"Vladimir Coufal",
	"Nayef Aguerd",
	"Konstantinos Mavropanos",
	"Ben Johnson",
	"James Ward-Prowse",
	"Tomas Soucek",
	"Lucas Paquetá",
	"Conor Coventry",
	"Edson Álvarez",
	"Oliver Scarles",
	"Michail Antonio",
	"Danny Ings",
	"Maxwel Cornet",
	"Said Benrahma",
	"Jarrod Bowen",
	"Pablo Fornals",
	"Mohammed Kudus",
	"Daniel Chesters",
	"Divin Mubama",
	"Lewis Orford",
	"Jason Steele",
	"Thomas McGill",
	"Bart Verbruggen",
	"James Milner",
	"Lewis Dunk",
	"Adam Webster",
	"Joel Veltman",
	"Pervis Estupinán",
	"Igor",
	"Jakub Moder",
	"Tariq Lamptey",
	"Jan Paul van Hecke",
	"Jack Hinshelwood",
	"Adam Lallana",
	"Pascal Gross",
	"Mahmoud Dahoud",
	"Billy Gilmour",
	"Julio Enciso",
	"Carlos Baleba",
	"Danny Welbeck",
	"Solly March",
	"Kaoru Mitoma",
	"Joao Pedro",
	"Evan Ferguson",
	"Ansu Fati",
	"Simon Adingra",
	"Facundo Buonanotte",
	"Adrian Mazilu",
	"Tom Heaton",
	"Andre Onana",
	"Altay Bayindir",
	"Jonny Evans",
	"Raphaël Varane",
	"Harry Maguire",
	"Victor Nilsson Lindelöf",
	"Luke Shaw",
	"Sergio Reguilon",
	"Diogo Dalot",
	"Aaron Wan-Bissaka",
	"Lisandro Martinez",
	"Tyrell Malacia",
	"Christian Eriksen",
	"Casemiro",
	"Bruno Fernandes",
	"Sofyan Amrabat",
	"Mason Mount",
	"Scott McTominay",
	"Hannibal Mejbri",
	"Kobbie Mainoo",
	"Anthony Martial",
	"Marcus Rashford",
	"Jadon Sancho",
	"Antony",
	"Facundo Pellistri",
	"Rasmus Højlund",
	"Alejandro Garnacho",
	"Martin Dubravka",
	"Mark Gillespie",
	"Nick Pope",
	"Loris Karius",
	"Daniel Burn",
	"Fabian Schär",
	"Kieran Trippier",
	"Emil Krafth",
	"Jamaal Lascelles",
	"Javier Manquillo",
	"Paul Dummett",
	"Matt Targett",
	"Sven Botman",
	"Valentino Livramento",
	"Lewis Hall",
	"Joelinton",
	"Sean Longstaff",
	"Bruno Guimaraes",
	"Joseph Willock",
	"Sandro Tonali",
	"Elliot Anderson",
	"Lewis Miley",
	"Matt Ritchie",
	"Callum Wilson",
	"Miguel Almiron",
	"Jacob Murphy",
	"Alexander Isak",
	"Harvey Barnes",
	"Anthony Gordon",
	"Marcus Bettinelli",
	"Robert Sánchez",
	"Djordje Petrovic",
	"Thiago Silva",
	"Ben Chilwell",
	"Axel Disasi",
	"Malang Sarr",
	"Trevoh Chalobah",
	"Reece James",
	"Marc Cucurella",
	"Wesley Fofana",
	"Benoit Badiashile",
	"Ian Maatsen",
	"Levi Colwill",
	"Malo Gusto",
	"Conor Gallagher",
	"Carney Chukwuemeka",
	"Cole Palmer",
	"Moisés Caicedo",
	"Enzo Fernández",
	"Romeo Lavia",
	"Lesley Ugochukwu",
	"Raheem Sterling",
	"Christopher Nkunku",
	"Mykhaylo Mudryk",
	"Armando Broja",
	"Noni Madueke",
	"Nicolas Jackson",
	"Deivid de Souza",
	"Daniel Bentley",
	"José Sá",
	"Tom King",
	"Craig Dawson",
	"Matt Doherty",
	"Jonny",
	"Nélson Semedo",
	"Santiago Bueno",
	"Max Kilman",
	"Toti Gomes",
	"Hugo Bueno",
	"Yerson Mosquera",
	"Mario Lemina",
	"Jean-Ricner Bellegarde",
	"Bruno Jordao",
	"Rayan Ait Nouri",
	"Thomas Doyle",
	"Boubacar Traore",
	"Joe Hodge",
	"Joao Gomes",
	"Pablo Sarabia",
	"Hee-Chan Hwang",
	"Pedro Neto",
	"Matheus Cunha",
	"Enso Gonzalez",
	"Darren Randolph",
	"Neto",
	"Ionut Andrei Radu",
	"Mark Travers",
	"Adam Smith",
	"Ryan Fredericks",
	"Marcos Senesi",
	"Lloyd Kelly",
	"Chris Mepham",
	"Max Aarons",
	"Illia Zabarnyi",
	"Milos Kerkez",
	"Ryan Christie",
	"Philip Billing",
	"Lewis Cook",
	"Joe Rothwell",
	"Tyler Adams",
	"Hamed Traorè",
	"Gavin Kilkenny",
	"Alex Scott",
	"Emiliano Marcondes",
	"Kieffer Moore",
	"Dominic Solanke",
	"David Brooks",
	"Marcus Tavernier",
	"Justin Kluivert",
	"Luis Sinisterra",
	"Antoine Semenyo",
	"Dango Ouattara",
	"Bernd Leno",
	"Marek Rodak",
	"Steven-Andreas Benda",
	"Tim Ream",
	"Timothy Castagne",
	"Kenny Tete",
	"Antonee Robinson",
	"Tosin Adarabioyo",
	"Issa Diop",
	"Fodé Ballo",
	"Calvin Bassey",
	"Tom Cairney",
	"Harrison Reed",
	"Joao Palhinha",
	"Sasa Lukic",
	"Andreas Pereira",
	"Alex Iwobi",
	"Tyrese Francois",
	"Willian",
	"Bobby Reid",
	"Raul Jiménez",
	"Adama Traoré",
	"Harry Wilson",
	"Vinicius",
	"Rodrigo Muniz",
	"Sam Johnstone",
	"Remi Matthews",
	"Dean Henderson",
	"James Tomkins",
	"Joel Ward",
	"Nathaniel Clyne",
	"Joachim Andersen",
	"Rob Holding",
	"Marc Guehi",
	"Nathan Ferguson",
	"Chris Richards",
	"Tyrick Mitchell",
	"Jeffrey Schlupp",
	"Will Hughes",
	"Jefferson Lerma",
	"Jairo Riedewald",
	"Eberechi Eze",
	"Cheick Oumar Doucouré",
	"Naouirou Ahamada",
	"Matheus Franca",
	"Jordan Ayew",
	"Odsonne Edouard",
	"Jean-Philippe Mateta",
	"Michael Olise",
	"Jesurun Rak-Sakyi",
	"Malcolm Ebiowei",
	"Wayne Hennessey",
	"Odisseas Vlachodimos",
	"Ethan Horvath",
	"Matt Turner",
	"Serge Aurier",
	"Willy Boly",
	"Felipe",
	"Scott McKenna",
	"Harry Toffolo",
	"Moussa Niakhaté",
	"Ola Aina",
	"Gonzalo Montiel",
	"Joe Worrall",
	"Richie Laryea",
	"Nuno Tavares",
	"Andrew Omobamidele",
	"Neco Williams",
	"Murillo",
	"Cheikhou Kouyaté",
	"Harry Arter",
	"Orel Mangala",
	"Ryan Yates",
	"Morgan Gibbs-White",
	"Ibrahim Sangaré",
	"Nicolás Dominguez",
	"Brandon Aguilera",
	"Danilo",
	"Andrey Santos",
	"Chris Wood",
	"Divock Origi",
	"Taiwo Awoniyi",
	"Callum Hudson-Odoi",
	"Anthony Elanga",
	"Mark Flekken",
	"Thomas Strakosha",
	"Ellery Balcombe",
	"Mathias Jørgensen",
	"Ben Mee",
	"Kristoffer Ajer",
	"Rico Henry",
	"Charlie Goode",
	"Ethan Pinnock",
	"Mads Roerslev",
	"Nathan Collins",
	"Aaron Hickey",
	"Christian Nørgaard",
	"Saman Ghoddos",
	"Mathias Jensen",
	"Vitaly Janelt",
	"Joshua Dasilva",
	"Frank Onyeka",
	"Shandon Baptiste",
	"Mikkel Damsgaard",
	"Yegor Yarmolyuk",
	"Neal Maupay",
	"Ivan Toney",
	"Yoane Wissa",
	"Bryan Mbeumo",
	"Keane Lewis-Potter",
	"Kevin Schade",
	"Andy Lonergan",
	"Jordan Pickford",
	"Joao Virginia",
	"Ashley Young",
	"Seamus Coleman",
	"James Tarkowski",
	"Michael Keane",
	"Ben Godfrey",
	"Vitalii Mykolenko",
	"Jarrad Branthwaite",
	"Nathan Patterson",
	"Idrissa Gana Gueye",
	"Abdoulaye Doucouré",
	"André Gomes",
	"Dele Alli",
	"Arnaut Danjuma",
	"Jack Harrison",
	"Dwight McNeil",
	"James Garner",
	"Amadou Onana",
	"Dominic Calvert-Lewin",
	"Beto",
	"Lewis Dobbin",
	"Youssef Chermiti",
	"Tim Krul",
	"Thomas Kaminski",
	"James Shea",
	"Daniel Potts",
	"Tom Lockyer",
	"Amari'i Bell",
	"Reece Burke",
	"Mads Juel Andersen",
	"Gabriel Osho",
	"Ryan Giles",
	"Alfie Doughty",
	"Teden Mengi",
	"Issa Kaboré",
	"Joseph Johnson",
	"Andros Townsend",
	"Luke Berry",
	"Ross Barkley",
	"Jordan Clark",
	"Pelly-Ruddock Mpanzu",
	"Marvelous Nakamba",
	"Tahith Chong",
	"Albert Sambi Lokonga",
	"Jake Burger",
	"Cauley Woodrow",
	"Carlton Morris",
	"Chiedozie Ogbene",
	"Jacob Brown",
	"Elijah Adebayo",
	"Sam Anderson",
	"Lawrence Vigouroux",
	"Arijanet Muric",
	"James Trafford",
	"Charlie Taylor",
	"Connor Roberts",
	"Dara O'Shea",
	"Hannes Delcroix",
	"Hjalmar Ekdal",
	"Jordan Beyer",
	"Vitinho",
	"Ameen Al Dakhil",
	"Jack Cork",
	"Johann Berg Gudmundsson",
	"Josh Brownhill",
	"Sander Berge",
	"Josh Cullen",
	"Jacob Bruun Larsen",
	"Michael Obafemi",
	"Han-Noah Massengo",
	"Wilson Odobert",
	"Luca Koleosho",
	"Jay Rodriguez",
	"Nathan Redmond",
	"Manuel Benson",
	"Darko Churlinov",
	"Lyle Foster",
	"Mike Tresor",
	"Zeki Amdouni",
	"Anass Zaroury",
	"Aaron Ramsey",
	"Wesley Foderingham",
	"Adam Davies",
	"Jordan Amissah",
	"Chris Basham",
	"George Baldock",
	"Jack Robinson",
	"John Egan",
	"Max Lowe",
	"Ben Osborn",
	"Auston Trusty",
	"Jayden Bogle",
	"Anel Ahmedhodzic",
	"Rhys Norrington-Davies",
	"Luke Thomas",
	"Femi Seriki",
	"Yasser Larouci",
	"John Fleck",
	"Oliver Norwood",
	"Tom Davies",
	"Gustavo Hamer",
	"Ismaila Cheick Coulibaly",
	"Vinicius de Souza Costa",
	"Anis Ben Slimane",
	"James McAtee",
	"Andre Brooks",
	"Evan Easton",
	"Oliver McBurnie",
	"Ben Brereton Diaz",
	"Rhian Brewster",
	"Cameron Archer",
	"Daniel Jebbison",
	"William Osula",
];

var fullPlayerData = [];
// run get on all player data and all players

function getIdByName(playerName) {
	const player = fullPlayerData.find((player) => player.name === playerName);

	// Check if the player with the given name is found
	if (player) {
		return player.id;
	} else {
		// Return a specific value (or handle the absence of the player as needed)
		return null;
	}
}

function handleSubmit() {
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGuesses = JSON.parse(window.localStorage.getItem("guesses"));
	const myIsSolved = JSON.parse(window.localStorage.getItem("isSolved"));

	if (myGuessesRemaining <= 0 || myIsSolved === true) {
		return;
	}

	const userInput = document.getElementById("myInput").value;
	if (userInput.length == 0) return;

	if (getIdByName(userInput) === globalAnswer) {
		myGuesses.unshift({
			name: userInput,
			id: getIdByName(userInput),
			output: "✅",
		});
		window.localStorage.setItem("isSolved", "true");
	} else {
		myGuesses.unshift({
			name: userInput,
			id: getIdByName(userInput),
			output: "❌",
		});
	}

	//update vars
	window.localStorage.setItem("guessesRemaining", myGuessesRemaining - 1);
	window.localStorage.setItem("guesses", JSON.stringify(myGuesses));

	document.getElementById("myInput").value = "";

	displayGuesses();
	showRevealedAnswer();
}

function initLocalStorage() {
	const storedGuessesRemaining =
		window.localStorage.getItem("guessesRemaining");
	if (!storedGuessesRemaining) {
		window.localStorage.setItem("guessesRemaining", 5);
	}

	const storedGuesses = window.localStorage.getItem("guesses");
	if (!storedGuesses) {
		window.localStorage.setItem("guesses", JSON.stringify([]));
	}

	const isSolved = window.localStorage.getItem("isSolved");
	if (!isSolved) {
		window.localStorage.setItem("isSolved", "false");
	}

	const storedGamesPlayed = window.localStorage.getItem("gamesPlayed");
	if (!storedGamesPlayed) {
		window.localStorage.setItem("gamesPlayed", 0);
	}

	const storedGamesWon = window.localStorage.getItem("gamesWon");
	if (!storedGamesWon) {
		window.localStorage.setItem("gamesWon", 0);
	}

	const isRevealed = window.localStorage.getItem("isRevealed");
	if (!isRevealed) {
		window.localStorage.setItem("isRevealed", "false");
	}

	const streakCounter = window.localStorage.getItem("streakCounter");
	if (!streakCounter) {
		window.localStorage.setItem("streakCounter", 0);
	}

	// const storedStats = window.localStorage.getItem("stats");
	// if (!storedStats) {
	// 	window.localStorage.setItem("stats", JSON.stringify([0, 0, 0, 0, 0]));
	// }
}

function displayGuesses() {
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGuesses = JSON.parse(window.localStorage.getItem("guesses"));

	const submissionsWrapper = document.getElementById("submissions-wrapper");
	submissionsWrapper.replaceChildren();

	const guessesRemainingDiv = document.getElementById("guesses-remaining");
	guessesRemainingDiv.textContent = `${myGuessesRemaining} guesses remaining!`;

	if (!myGuesses) return;

	for (var i = 0; i < myGuesses.length; i++) {
		const myGuessDiv = document.createElement("div");
		myGuessDiv.setAttribute("class", "guess");
		myGuessDiv.textContent = `${myGuesses[i].name} ${myGuesses[i].output}`;
		// console.log(myGuesses[i].id);
		submissionsWrapper.append(myGuessDiv);
	}
}

function displayClubNames(clubNames) {
	const listItems = document.getElementById("career-path-wrapper").children;
	const myLogos = document.getElementsByClassName("club-wrapper");

	for (let j = 0; j < listItems.length; j++) {
		const clubName = clubNames[j];
		const logo = myLogos[j];
		logo.setAttribute("aria-label", clubName);
		logo.setAttribute("data-balloon-pos", "up");

		// const p = document.createElement("p");
		// const n = document.createTextNode();
		// p.appendChild(n);
		// const curr = listItems[j];
		// curr.appendChild(p);
	}
}

async function displayLogos(logos, clubNames) {
	const baseUrl = `${BACKEND_DOMAIN}api/club-logos/`;
	try {
		const careerPathDiv = document.getElementById("career-path-wrapper");

		for (var i = 0; i < logos.length; i++) {
			const myUrl = baseUrl + `${logos[i]}`;
			const response = await fetch(myUrl);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const responseBlob = await response.blob();
			const imgURL = URL.createObjectURL(responseBlob);
			const imageElement = document.createElement("img");
			imageElement.src = imgURL;
			imageElement.setAttribute("class", "club-logo");

			const imageWrapper = document.createElement("div");
			imageWrapper.classList.add("club-wrapper");
			imageWrapper.append(imageElement);
			imageWrapper.setAttribute("aria-label", clubNames[i]);
			imageWrapper.setAttribute("data-balloon-pos", "up");

			careerPathDiv.append(imageWrapper);
		}

		//console.log(responseData);
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
}

async function fetchAnswerClubsDetails() {
	const baseUrl = `${BACKEND_DOMAIN}api/club-ids`;
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

async function initAnswer() {
	const myUrl = `${BACKEND_DOMAIN}api/answer`;
	try {
		const response = await fetch(myUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseJSON = await response.json();
		globalAnswer = responseJSON.answerID;
		globalAnswerName = responseJSON.name;
	} catch (error) {
		console.error("Error fetching answer:", error.message);
	}
}

async function initAllPlayerData() {
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

function initHelpButton() {
	const openModal = document.getElementById("help-modal-open");
	const myHelpModal = document.getElementById("help-modal");
	const closeModal = document.getElementById("close-help");

	openModal.addEventListener("click", () => {
		myHelpModal.showModal();
	});

	closeModal.addEventListener("click", () => {
		myHelpModal.close();
	});
}

function initStatsButton() {
	const openModal = document.getElementById("stats-modal-open");
	const myStatsModal = document.getElementById("stats-modal");
	const closeModal = document.getElementById("close-stats");

	openModal.addEventListener("click", () => {
		myStatsModal.showModal();
	});

	closeModal.addEventListener("click", () => {
		myStatsModal.close();
	});

	// const myGraphModal = document.getElementById("graph");

	// const xArray = [0, 4, 1, 0, 8];
	// const yArray = ["1", "3", "2", "4", "5"];

	// const data = [
	// 	{
	// 		x: xArray,
	// 		y: yArray,
	// 		type: "bar",
	// 		orientation: "h",
	// 		// categoryorder: "array",
	// 		marker: { color: "rgba(255,0,0,0.6)" },
	// 	},
	// ];

	// const layout = {
	// 	title: "Your Footle Stats",
	// 	yaxis: {
	// 		title: "Guesses",
	// 	},
	// 	xaxis: {
	// 		title: "Values",
	// 	},
	// };

	// Plotly.newPlot("graph", data, layout, { staticPlot: true });
}

function initClearButton() {
	const btn = document.getElementById("clear-btn");
	btn.addEventListener("click", handleClear);
}

function handleClear() {
	localStorage.removeItem("guesses");
	localStorage.removeItem("guessesRemaining");
	localStorage.removeItem("isSolved");
	localStorage.removeItem("isRevealed");

	initLocalStorage();
	displayGuesses();
	showRevealedAnswer();
}

function initRefreshButton() {
	const btn = document.getElementById("refresh-btn");
	btn.addEventListener("click", handleRefresh);
}

async function handleRefresh() {
	handleClear();
	const myUrl = `${BACKEND_DOMAIN}api/refresh`;
	// TODO call endpoint to change the answer id & refresh the page
	const response = await fetch(myUrl);
	window.location.reload();
}

function initCopyButton() {
	const btn = document.getElementById("copy-button");
	btn.addEventListener("click", () => {
		var textarea = document.getElementById("share-text-area");
		textarea.select();
		textarea.setSelectionRange(0, 99999); // For mobile devices
		navigator.clipboard.writeText(textarea.value);

		// Change the button text and style to indicate copying
		var copyButton = document.getElementById("copy-button");
		copyButton.innerText = "Copied!";
		copyButton.classList.add("copied");

		// Reset the button text and style after a short delay
		setTimeout(function () {
			copyButton.innerText = "Copy";
			copyButton.classList.remove("copied");
		}, 2000);
	});
}

function showCopyText(tmp) {
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	let outString = "";
	const numCross = 5 - myGuessesRemaining - 1;
	for (let i = 0; i < numCross; i++) {
		outString += "❌";
	}
	outString += tmp;
	for (let i = 0; i < myGuessesRemaining; i++) {
		outString += "⬜";
	}

	const myTextArea = document.getElementById("share-text-area");
	myTextArea.value = `Footle #123\n${outString}\nMyurl.com`;
	initCopyButton();
}

function showRevealedAnswer() {
	const myIsSolved = JSON.parse(window.localStorage.getItem("isSolved"));
	const myGuessesRemaining = window.localStorage.getItem("guessesRemaining");
	const myGamesPlayed = Number(window.localStorage.getItem("gamesPlayed"));
	const myGamesWon = Number(window.localStorage.getItem("gamesWon"));
	const myIsRevealed = JSON.parse(window.localStorage.getItem("isRevealed"));
	const myStreakCounter = Number(
		window.localStorage.getItem("streakCounter")
	);

	const revealDiv = document.getElementById("answer-revealed-wrapper");
	const revealDivText = document.getElementById("answer-reveal");

	//if they solved it
	if (myIsSolved === true) {
		revealDiv.style.display = "block";
		revealDivText.innerText = `Congrats! The answer is ${globalAnswerName}`;

		if (myIsRevealed === false) {
			window.localStorage.setItem("isRevealed", "true");
			window.localStorage.setItem("gamesPlayed", myGamesPlayed + 1);
			window.localStorage.setItem("gamesWon", myGamesWon + 1);
			window.localStorage.setItem("streakCounter", myStreakCounter + 1);
		}
		goBackToTop();
		initStatistics();

		showCopyText("✅");

		return;
	}

	//if they've made 5 guesses
	if (myGuessesRemaining == 0) {
		revealDiv.style.display = "block";
		revealDivText.innerText = `The answer is ${globalAnswerName}`;
		if (myIsRevealed === false) {
			window.localStorage.setItem("isRevealed", "true");
			window.localStorage.setItem("gamesPlayed", myGamesPlayed + 1);
			window.localStorage.setItem("streakCounter", 0);
		}
		goBackToTop();
		initStatistics();
		showCopyText("❌");

		return;
	}

	//otherwise keep it hidden
	revealDiv.style.display = "none";
}

function goBackToTop() {
	// window.scrollTo(0, 0);

	const scrollStep = -window.scrollY / (500 / 15); // Adjust the speed here (500 is the duration in milliseconds)

	const scrollInterval = setInterval(() => {
		if (window.scrollY !== 0) {
			window.scrollBy(0, scrollStep);
		} else {
			clearInterval(scrollInterval);
		}
	}, 15);
}

function initStatistics() {
	const played = document.getElementsByClassName("played-num");
	const won = document.getElementsByClassName("won-num");
	const streak = document.getElementsByClassName("streak-num");

	for (let i = 0; i < played.length; i++) {
		played[i].innerHTML = window.localStorage.getItem("gamesPlayed");
		won[i].innerHTML = window.localStorage.getItem("gamesWon");
		streak[i].innerHTML = window.localStorage.getItem("streakCounter");
	}
}

function runAtSpecificTimeOfDay(hour, minutes, func) {
	const twentyFourHours = 86400000;
	const now = new Date();
	let eta_ms =
		new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			hour,
			minutes,
			0,
			0
		).getTime() - now;
	if (eta_ms < 0) {
		eta_ms += twentyFourHours;
	}
	setTimeout(function () {
		//run once
		func();
		// run every 24 hours from now on
		setInterval(func, twentyFourHours);
	}, eta_ms);
}

async function main() {
	try {
		// runs every day at 23:09
		runAtSpecificTimeOfDay(21, 2, handleRefresh);
		initHelpButton();
		initStatsButton();
		// initClearButton();
		initLocalStorage();
		// initRefreshButton();
		// initStatistics();

		fullPlayerData = await initAllPlayerData();

		await initAnswer();

		autocomplete(document.getElementById("myInput"), ALL_PLAYERS);

		const answerClubsData = await fetchAnswerClubsDetails();
		const clubIDs = answerClubsData.clubIDs;
		const clubNames = answerClubsData.clubNames;
		const period = answerClubsData.period;

		displayLogos(clubIDs, clubNames);
		// displayClubNames();

		displayGuesses();

		const mySubmitButton = document.getElementById("mySubmit");
		mySubmitButton.addEventListener("click", handleSubmit);

		showRevealedAnswer();
		initStatistics();
	} catch (error) {
		console.error("Error in main function:", error);
	}
}

main();
