function initHelpButton() {
	const openModal = document.getElementById("help-modal-open");
	const myHelpModal = document.getElementById("help-modal");
	const closeModal = document.getElementById("close-help");

	// openModal.addEventListener("click", () => {
	// 	myHelpModal.showModal();
	// });

	// openModal.addEventListener("touchstart", (evt) => {
	// 	evt.preventDefault();
	// 	myHelpModal.showModal();
	// });

	openModal.addEventListener("pointerdown", (evt) => {
		myHelpModal.showModal();
		if (evt.pointerType === "touch") {
			evt.preventDefault();
		}
	});

	// closeModal.addEventListener("click", () => {
	// 	myHelpModal.close();
	// });

	// closeModal.addEventListener("touchstart", (evt) => {
	// 	evt.preventDefault();
	// 	myHelpModal.close();
	// });

	closeModal.addEventListener("pointerdown", (evt) => {
		myHelpModal.close();
		if (evt.pointerType === "touch") {
			evt.preventDefault();
		}
	});
}

function initStatsButton() {
	const openModal = document.getElementById("stats-modal-open");
	const myStatsModal = document.getElementById("stats-modal");
	const closeModal = document.getElementById("close-stats");

	// openModal.addEventListener("click", () => {
	// 	myStatsModal.showModal();
	// });

	// openModal.addEventListener("touchstart", (evt) => {
	// 	evt.preventDefault();
	// 	myStatsModal.showModal();
	// });

	openModal.addEventListener("pointerdown", (evt) => {
		myStatsModal.showModal();
		if (evt.pointerType === "touch") {
			evt.preventDefault();
		}
	});

	// closeModal.addEventListener("click", () => {
	// 	myStatsModal.close();
	// });

	// closeModal.addEventListener("touchstart", (evt) => {
	// 	evt.preventDefault();
	// 	myStatsModal.close();
	// });

	closeModal.addEventListener("pointerdown", (evt) => {
		myStatsModal.close();
		if (evt.pointerType === "touch") {
			evt.preventDefault();
		}
	});
}

export function initBasicCssStuff() {
	initHelpButton();
	initStatsButton();
}
