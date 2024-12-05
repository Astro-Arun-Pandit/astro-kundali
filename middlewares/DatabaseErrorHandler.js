const {DatabaseError} = require('pg');
const logger = require('../helpers/logger/logger');
const {DatabaseForeignError, DatabaseUniqueKeyError} = require('../helpers/errors/api-errors');

const MONGODatabaseErrorHandler = (error, req, res, next) => {
	if (error instanceof DatabaseError) {
		logger.error(`error ${error.message}`);
		const status = error.status || 500;
		let message = error.message;

		switch (String(error.code)) {
			case '23503':
				throw new DatabaseForeignError('Data Is Already Associated To Some Records');
			case '23505':
				throw new DatabaseUniqueKeyError('Key Already Exists');
			default:
				return res.status(status).json({
					success: false,
					status,
					message: process.env.NODE_ENV === 'development' ? message : 'Something Went Wrong',
					stack: process.env.NODE_ENV === 'development' ? error.stack : {},
				});
		}
	} else {
		next(error);
	}
};

module.exports = MONGODatabaseErrorHandler;
