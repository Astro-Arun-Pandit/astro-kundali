const jwt = require('jsonwebtoken');
const {HttpUnAuthorizedError} = require('../helpers/errors/api-errors');
const logger = require('../helpers/logger/logger');
const {ROLES_LIST} = require('../helpers/constants/general.constants');

const roleGuard = roleType => {
	return async (req, res, next) => {
		try {
			if (!req.user || !req.user_role) {
				throw new HttpUnAuthorizedError();
			} else {
				const user_role = req.user_role;

				if (user_role && user_role.role_status === 'active' && user_role.is_delete === false) {
					if (
						Object.values(ROLES_LIST).includes(user_role.role_name) &&
						roleType.includes(user_role.role_name)
					) {
						next();
					} else {
						throw new HttpUnAuthorizedError();
					}
				} else {
					throw new HttpUnAuthorizedError();
				}
			}
		} catch (error) {
			if (error instanceof jwt.JsonWebTokenError) {
				logger.error('JsonWebTokenError', error);
				const customError = new HttpUnAuthorizedError();
				next(customError);
			}
			next(error);
		}
	};
};

module.exports = {roleGuard};
