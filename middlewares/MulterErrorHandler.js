const multer = require('multer');
const {MESSAGES} = require('../helpers/constants/messages');
const {UPLOAD_FILE_SIZE} = require('../helpers/constants/general.constants');

/**
 * Multer validation error handler
 * 
 * TODO - handle more error
 * type ErrorCode =
        | "LIMIT_PART_COUNT"
        | "LIMIT_FILE_SIZE"
        | "LIMIT_FILE_COUNT"
        | "LIMIT_FIELD_KEY"
        | "LIMIT_FIELD_VALUE"
        | "LIMIT_FIELD_COUNT"
        | "LIMIT_UNEXPECTED_FILE";
 * 
 */
const MulterErrorHandler = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		console.log(error);
		if (error.code === 'LIMIT_FILE_SIZE') {
			const customErr = new Error(MESSAGES.FILE_TOO_LARGE_MESSAGE(UPLOAD_FILE_SIZE));
			customErr.status = 422;
			return next(customErr);
		} else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
			const customErr = new Error(MESSAGES.UNEXPECTED_FILE);
			customErr.status = 422;
			return next(customErr);
		} else if (error.code === 'LIMIT_FIELD_KEY') {
			const customErr = new Error(MESSAGES.WRONG_FIELD_FILE_COUNT);
			customErr.status = 422;
			return next(customErr);
		} else {
			return next(error);
		}
	} else {
		next(error);
	}
};

module.exports = MulterErrorHandler;
