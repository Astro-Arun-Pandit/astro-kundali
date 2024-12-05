// Function to convert UTC timestamp to IST format
const convertToIST = function (timestamp) {
	const utcDate = new Date(timestamp);
	const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
	const istDate = new Date(utcDate.getTime() + istOffset);

	// Format the IST date as "YYYY-MM-DDTHH:mm:ss"
	const formattedISTDate = istDate.toISOString().slice(0, 19).replace('T', ' ');

	return formattedISTDate;
};

module.exports = convertToIST;
