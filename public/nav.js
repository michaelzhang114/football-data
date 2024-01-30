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
}

export function initBasicCssStuff() {
	initHelpButton();
	initStatsButton();
}
