function initHelpButton() {
	const openModal = document.getElementById("help-modal-open");
	const myHelpModal = document.getElementById("help-modal");
	const closeModal = document.getElementById("close-help");

	openModal.addEventListener("click", () => {
		myHelpModal.showModal();
	});

	openModal.addEventListener("touchstart", (evt) => {
		evt.preventDefault();
		myHelpModal.showModal();
	});

	closeModal.addEventListener("click", () => {
		myHelpModal.close();
	});

	closeModal.addEventListener("touchstart", (evt) => {
		evt.preventDefault();
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

	openModal.addEventListener("touchstart", (evt) => {
		evt.preventDefault();
		myStatsModal.showModal();
	});

	closeModal.addEventListener("click", () => {
		myStatsModal.close();
	});

	closeModal.addEventListener("touchstart", (evt) => {
		evt.preventDefault();
		myStatsModal.close();
	});
}

export function initBasicCssStuff() {
	initHelpButton();
	initStatsButton();
}
