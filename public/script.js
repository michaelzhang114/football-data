import { autocomplete } from "./autocomplete.js";

const BACKEND_DOMAIN = "http://localhost:5050/";

var globalGuessesRemaining = 5;
var globalListOfGuesses = [];
var globalAnswer;

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

const fullPlayerData = [
	{
		id: 169756,
		name: "Adrian",
		ccode: "ESP",
		cname: "Spain",
		role: "goalkeepers",
	},
	{
		id: 319784,
		name: "Alisson Becker",
		ccode: "BRA",
		cname: "Brazil",
		role: "goalkeepers",
	},
	{
		id: 776689,
		name: "Caoimhin Kelleher",
		ccode: "IRL",
		cname: "Ireland",
		role: "goalkeepers",
	},
	{
		id: 1068920,
		name: "Vitezslav Jaros",
		ccode: "CZE",
		cname: "Czechia",
		role: "goalkeepers",
	},
	{
		id: 1117148,
		name: "Marcelo",
		ccode: "BRA",
		cname: "Brazil",
		role: "goalkeepers",
	},
	{
		id: 576165,
		name: "Gabriel Jesus",
		ccode: "BRA",
		cname: "Brazil",
		isInjured: true,
		role: "attackers",
	},
];
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
	if (globalGuessesRemaining <= 0) {
		return;
	}
	const userInput = document.getElementById("myInput").value;
	const myGuesses = window.localStorage.getItem("guesses");

	if (getIdByName(userInput) === globalAnswer) {
		globalListOfGuesses.push({
			name: userInput,
			id: getIdByName(userInput),
			output: "✅",
		});
	} else {
		globalListOfGuesses.push({
			name: userInput,
			id: getIdByName(userInput),
			output: "❌",
		});
	}

	//update vars
	globalGuessesRemaining--;
	// globalListOfGuesses.push({ name: userInput, id: getIdByName(userInput), output });
	//update storage
	updateStorage();

	displayGuesses();
}

function updateStorage() {
	window.localStorage.setItem("guessesRemaining", globalGuessesRemaining);
	window.localStorage.setItem("guesses", JSON.stringify(globalListOfGuesses));
}

function initLocalStorage() {
	const storedGuessesRemaining =
		window.localStorage.getItem("guessesRemaining");
	if (!storedGuessesRemaining) {
		window.localStorage.setItem("guessesRemaining", globalGuessesRemaining);
	} else {
		globalGuessesRemaining = Number(storedGuessesRemaining);
	}

	const storedGuesses = window.localStorage.getItem("guesses");
	if (!storedGuesses) {
		window.localStorage.setItem("guessesRemaining", globalListOfGuesses);
	} else {
		globalListOfGuesses = JSON.parse(storedGuesses);
	}

	// const answer = window.localStorage.setItem("answer", "Kai Havertz");
	// const guesses = window.localStorage.setItem("guesses", "");
}

function displayGuesses() {
	const myArr = JSON.parse(window.localStorage.getItem("guesses"));
	if (!myArr) return;

	const submissionsWrapper = document.getElementById("submissions-wrapper");
	submissionsWrapper.replaceChildren();

	for (var i = 0; i < myArr.length; i++) {
		const myGuessDiv = document.createElement("div");
		myGuessDiv.setAttribute("class", "guess");
		myGuessDiv.textContent = `${myArr[i].name} ${myArr[i].id} ${myArr[i].output}`;
		submissionsWrapper.append(myGuessDiv);
	}

	const guessesRemainingDiv = document.getElementById("guesses-remaining");
	guessesRemainingDiv.textContent = `${window.localStorage.getItem(
		"guessesRemaining"
	)} guesses remaining!`;
}

async function displayLogos(logos) {
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

			careerPathDiv.append(imageElement);
		}

		//console.log(responseData);
	} catch (error) {
		console.error("Error fetching data:", error.message);
	}
}

async function initAnswer() {
	const myUrl = `${BACKEND_DOMAIN}api/answer-id`;
	try {
		const response = await fetch(myUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseJSON = await response.json();
		globalAnswer = responseJSON.answerID;
	} catch (error) {
		console.error("Error fetching answer-id:", error.message);
	}
}

autocomplete(document.getElementById("myInput"), ALL_PLAYERS);

displayLogos([8178, 8455, 9825, 9817]);

displayGuesses();

const mySubmitButton = document.getElementById("mySubmit");
mySubmitButton.addEventListener("click", handleSubmit);

initLocalStorage();
//initVarsFromLocalStorage();

initAnswer().then(() => {
	console.log(globalAnswer);
});
