const {DatabaseError} = require('pg');
const {DatabaseForeignError, DatabaseUniqueKeyError} = require('../helpers/errors/api-errors');
const {UniqueViolationError, ForeignKeyViolationError} = require('objection');

const logger = require('../helpers/logger/logger');
const Sentry = require('@sentry/node');

const ErrorHandler = (error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message;
	const errors = error.errors || [];
	logger.error(`error ${error.message}`);
	const respObj = {
		success: false,
		status,
		message:
			process.env.NODE_ENV === 'production' &&
			(error instanceof DatabaseError ||
				error instanceof UniqueViolationError ||
				error instanceof ForeignKeyViolationError ||
				error instanceof ReferenceError ||
				error instanceof SyntaxError)
				? 'Something Went Wrong'
				: message,
		stack: process.env.NODE_ENV === 'development' ? error.stack : {},
	};

	if (errors) {
		respObj['errors'] = errors;
	}
	Sentry.captureException(error);

	return res.status(status).json(respObj);
};

module.exports = ErrorHandler;
