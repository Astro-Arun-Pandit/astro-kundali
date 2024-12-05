const {ALL_PERMISSIONS_TYPES, HTTP_REQ_METHODS} = require('../helpers/constants/general.constants');
const {HttpPermissionDeniedError} = require('../helpers/errors/api-errors');

const checkPermission = (req, res, next, permissionType, methodArray) => {
	try {
		const actions = req.actions || [];

		if (actions.includes(permissionType) && methodArray.includes(req.method)) {
			return next();
		} else {
			throw new HttpPermissionDeniedError();
		}
	} catch (error) {
		return next(error);
	}
};

const permissionValidators = {
	Delete: (req, res, next) =>
		checkPermission(req, res, next, ALL_PERMISSIONS_TYPES.Delete, [HTTP_REQ_METHODS.DELETE, HTTP_REQ_METHODS.POST]),
	Add: (req, res, next) => checkPermission(req, res, next, ALL_PERMISSIONS_TYPES.Add, [HTTP_REQ_METHODS.POST]),
	Edit: (req, res, next) =>
		checkPermission(req, res, next, ALL_PERMISSIONS_TYPES.Edit, [HTTP_REQ_METHODS.PUT, HTTP_REQ_METHODS.PATCH]),
	View: (req, res, next) => checkPermission(req, res, next, ALL_PERMISSIONS_TYPES.View, [HTTP_REQ_METHODS.GET]),
};

module.exports = {permissionValidators};
