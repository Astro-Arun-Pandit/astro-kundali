const Joi = require('joi');
const {HttpValidationError} = require('../helpers/errors/api-errors');

/**
 * Joi validation error handler
 * add a errors value to the error object
 */
const JoiValidationErrorHandler = (error, req, res, next) => {
	if (error instanceof Joi.ValidationError) {
		const errors = [];
		if (error.details) {
			error.details.forEach(error => {
				errors.push({
					key: error.context.key,
					message: error.message,
				});
			});
		}
		throw new HttpValidationError(errors);
	} else {
		next(error);
	}
};

module.exports = JoiValidationErrorHandler;
