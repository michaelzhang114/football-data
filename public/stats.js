export function initStatistics() {
	const played = document.getElementsByClassName("played-num");
	const won = document.getElementsByClassName("won-num");
	const streak = document.getElementsByClassName("streak-num");

	for (let i = 0; i < played.length; i++) {
		played[i].innerHTML = window.localStorage.getItem("gamesPlayed");
		won[i].innerHTML = window.localStorage.getItem("gamesWon");
		streak[i].innerHTML = window.localStorage.getItem("streakCounter");
	}
}
