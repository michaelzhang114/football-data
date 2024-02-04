export function startCountdown() {
	const countdownElement = document.getElementById("countdown-timer");

	// Update the countdown every second
	const countdownInterval = setInterval(() => {
		const timeRemaining = calculateTimeRemaining();
		// console.log(timeRemaining);
		countdownElement.textContent = formatTime(timeRemaining);

		if (timeRemaining <= 0) {
			clearInterval(countdownInterval);
			countdownElement.textContent = "00:00:00 - Refresh now!";
		}
	}, 1000);

	// Initial update
	const initialTimeRemaining = calculateTimeRemaining();
	countdownElement.textContent = formatTime(initialTimeRemaining);
}

function calculateTimeRemaining() {
	const now = new Date().getTime();
	const targetMidnight = new Date();
	targetMidnight.setHours(23, 59, 59, 900);
	return targetMidnight - now;
}

function formatTime(milliseconds) {
	const seconds = Math.floor((milliseconds / 1000) % 60);
	const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
	const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

	return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
		seconds
	)}`;
}

function formatNumber(number) {
	return number < 10 ? `0${number}` : number;
}
