const {HttpBadFormatError} = require('../errors/api-errors');

// Function to parse the json
const parseJson = function (jsonString) {
	try {
		return JSON.parse(jsonString);
	} catch (error) {
		throw new HttpBadFormatError();
	}
};

module.exports = parseJson;
