const {HttpNoDataFoundTypeError} = require('../errors/api-errors');

// success handler function to call at time of success
function successHandler(res, message, jsonData, extraKeyPair) {
	try {
		// returning success with res, message, jsonData, extraKeyPair 
		return res.json({
			success: true,
			message,
			...(jsonData && {data: jsonData}),
			...(extraKeyPair && {...extraKeyPair}),
		});
	} catch (error) {
		// log and throw error 
		console.log(error);
		throw new HttpNoDataFoundTypeError();
	}
}

module.exports = successHandler;
