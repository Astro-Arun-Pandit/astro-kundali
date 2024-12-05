const {AVAILABLE_MODULES} = require('../helpers/constants/module.constants');
const {HttpAccessDeniedError} = require('../helpers/errors/api-errors');

/**
 * Middleware for checking module permissions based on the specified type.
 *
 * @param {string} type - The type of module for which to check permissions.
 * @returns {Function} Middleware function that takes in the request (req), response (res), and next function.
 * @throws {Object} Returns a 403 Forbidden JSON response if the user lacks the required permissions.
 */
const moduleGuard = type => {
	return (req, res, next) => {
		try {
			const foundModule = AVAILABLE_MODULES.find(module => module.module_slug === type);
			if (foundModule && req.user && req.user.module_permissions) {
				const requestModule = req.user.module_permissions.find(
					module => module.module_slug === foundModule.module_slug
				);
				if (requestModule && requestModule.permissions) {
					// save actions on in req
					req.actions = requestModule.permissions;
					return next();
				}
			}
			throw new HttpAccessDeniedError();
		} catch (error) {
			next(error);
		}
	};
};

module.exports = {moduleGuard};
