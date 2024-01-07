function getFriendlyDate() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
	const formattedDate = `${year}-${month}`;
	console.log(formattedDate);
}

console.log(getFriendlyDate());
