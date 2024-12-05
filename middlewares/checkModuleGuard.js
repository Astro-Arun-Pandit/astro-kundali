const {AVAILABLE_MODULES} = require('../helpers/constants/module.constants');

/**
 * Middleware for checking module permissions based on the specified type.
 *
 * @param {string} type - The type of module for which to check permissions.
 * @returns {Function} Middleware function that takes in the request (req), response (res), and next function.
 * @throws {Object} Returns a 403 Forbidden JSON response if the user lacks the required permissions.
 */
const modulePermissionGuard = (req, moduleSlug, permissionType) => {
	try {
		const foundModule = AVAILABLE_MODULES.find(module => module.module_slug === moduleSlug);
		if (foundModule && req.user && req.user.module_permissions) {
			const requestModule = req.user.module_permissions.find(
				module => module.module_slug === foundModule.module_slug
			);
			if (requestModule && requestModule.permissions) {
				if (requestModule.permissions.includes(permissionType)) {
					return true;
				}
			}
		}
		return false;
	} catch (error) {
		return false;
	}
};

module.exports = {modulePermissionGuard};
