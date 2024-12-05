const {MESSAGES} = require('../constants/messages');
const HttpErrorType = require('./http-errorTypes');

class HttpError extends Error {
	constructor(message, type, status, errors) {
		super(message);
		this.type = type;
		this.status = status;
		this.message = message;
		this.errors = errors;
	}
}



// Roles Errors
class HttpRoleNotFoundError extends HttpError {
	constructor() {
		super('Role not found', HttpErrorType.RoleNotFoundError, 404);
	}
}
class HttpRoleAlreadyExistsError extends HttpError {
	constructor() {
		super('Role Already Exists', HttpErrorType.RoleAlreadyExistsError, 409);
	}
}
class HttpRoleNameEmptyError extends HttpError {
	constructor() {
		super('Role Name Is Empty', HttpErrorType.RoleNameEmptyError, 401);
	}
}
class HttpRoleNotEditable extends HttpError {
	constructor() {
		super('Role Not Editable', HttpErrorType.RoleNotEditable, 403);
	}
}

// Permissions Errors
class HttpPermissionNotFoundError extends HttpError {
	constructor() {
		super('Permission not found', HttpErrorType.PermissionNotFoundError, 404);
	}
}
class HttpPermissionAlreadyExistsError extends HttpError {
	constructor() {
		super('Permission Already Exists', HttpErrorType.PermissionAlreadyExistsError, 409);
	}
}
class HttpPermissionNameEmptyError extends HttpError {
	constructor() {
		super('Permission Name Is Empty', HttpErrorType.PermissionNameEmptyError, 401);
	}
}

// Modules Errors
class HttpModuleNotFoundError extends HttpError {
	constructor() {
		super('Module not found', HttpErrorType.ModuleNotFoundError, 404);
	}
}

class HttpModuleNameEmptyError extends HttpError {
	constructor() {
		super('Module Name Is Empty', HttpErrorType.ModuleNameEmptyError, 401);
	}
}

class HttpModuleSlugEmptyError extends HttpError {
	constructor() {
		super('Module Slug Is Empty', HttpErrorType.ModuleSlugEmptyError, 401);
	}
}

class HttpModuleSlugAlreadyExistsError extends HttpError {
	constructor() {
		super('Module Slug Already Exists', HttpErrorType.ModuleSlugAlreadyExistsError, 409);
	}
}

// Users Errors
class HttpUserNotFoundError extends HttpError {
	constructor() {
		super('User not found', HttpErrorType.UserNotFoundError, 404);
	}
}
class HttpUserInActiveError extends HttpError {
	constructor() {
		super('User Account is Inactive, Please Contact The Admin', HttpErrorType.UserInActiveError, 422);
	}
}
class HttpProvideUserTypeError extends HttpError {
	constructor() {
		super('User Type Is Missing', HttpErrorType.ProvideUserTypeError, 400);
	}
}
class HttpUserPhoneNumberExistsError extends HttpError {
	constructor() {
		super('User Phone Number Already Exists', HttpErrorType.UserPhoneNumberExistsError, 409);
	}
}
class HttpUserNameNotPresentError extends HttpError {
	constructor() {
		super('User Name Is Empty', HttpErrorType.UserNameNotPresentError, 422);
	}
}
class HttpUserPhoneNumberNotPresentError extends HttpError {
	constructor() {
		super('User Phone Number Is Empty', HttpErrorType.UserPhoneNumberNotPresentError, 422);
	}
}
class HttpUserPasswordNotPresentError extends HttpError {
	constructor() {
		super('User Password Is Empty', HttpErrorType.UserPasswordNotPresentError, 422);
	}
}

// Server Errors
class HttpUnknownServerError extends HttpError {
	constructor(message) {
		super(message, HttpErrorType.UnknownServerError, 500);
	}
}

// Unauthorized Errors
class HttpUnAuthorizedError extends HttpError {
	constructor() {
		super('UnAuthorized', HttpErrorType.UnAuthorizedError, 401);
	}
}
class HttpTokenMissingError extends HttpError {
	constructor() {
		super('Token Not Found', HttpErrorType.TokenMissingError, 404);
	}
}

// Email Errors
class HttpEmailAlreadyExistsError extends HttpError {
	constructor() {
		super('Email Already Exists', HttpErrorType.EmailAlreadyExistsError, 409);
	}
}

// General Errors
class HttpEmptyRequiredFieldsTypeError extends HttpError {
	constructor() {
		super('Required Fields Are Missing', HttpErrorType.EmptyRequiredFieldsError, 401);
	}
}

class HttpIdNotFoundError extends HttpError {
	constructor() {
		super('Id Not Found', HttpErrorType.IdNotFound, 404);
	}
}
class HttpWrongCredentialsError extends HttpError {
	constructor() {
		super('Wrong Credentials', HttpErrorType.WrongCredentialsError, 401);
	}
}

class HttpBadFormatError extends HttpError {
	constructor() {
		super('Bad Format', HttpErrorType.BadFormatError, 422);
	}
}
class HttpSomethingWentWrong extends HttpError {
	constructor() {
		super('Something Went Wrong', HttpErrorType.SomethingWentWrong, 405);
	}
}
class HttpNotALlowed extends HttpError {
	constructor() {
		super('Not Allowed', HttpErrorType.NotAllowed, 405);
	}
}

// 404 Error
class HttpNoDataFoundTypeError extends HttpError {
	constructor() {
		super('Not Found', HttpErrorType.NoDataFoundError, 404);
	}
}


class HttpAccessDeniedError extends HttpError {
	constructor(message) {
		super(message || MESSAGES.ACCESS_DENIED, HttpErrorType.AccessDenied, 403);
	}
}

class HttpPermissionDeniedError extends HttpError {
	constructor(message) {
		super(message || MESSAGES.PERMISSION_NOT_ALLOWED, HttpErrorType.PermissionDenied, 403);
	}
}

module.exports = {
	HttpError,
	HttpUnknownServerError,
	HttpUserNotFoundError,
	HttpUserInActiveError,
	HttpEmailAlreadyExistsError,
	HttpRoleAlreadyExistsError,
	HttpUnAuthorizedError,
	HttpProvideUserTypeError,
	HttpEmptyRequiredFieldsTypeError,
	HttpRoleNotFoundError,
	HttpNoDataFoundTypeError,
	HttpRoleNameEmptyError,
	HttpIdNotFoundError,
	HttpPermissionNotFoundError,
	HttpPermissionAlreadyExistsError,
	HttpPermissionNameEmptyError,
	HttpModuleNotFoundError,
	HttpModuleNameEmptyError,
	HttpModuleSlugEmptyError,
	HttpModuleSlugAlreadyExistsError,
	HttpUserPhoneNumberExistsError,
	HttpUserNameNotPresentError,
	HttpUserPhoneNumberNotPresentError,
	HttpUserPasswordNotPresentError,
	HttpWrongCredentialsError,
	HttpTokenMissingError,
	HttpAccessDeniedError,
	HttpPermissionDeniedError,
	HttpBadFormatError,
	HttpRoleNotEditable,
	HttpSomethingWentWrong,
	HttpNotALlowed,
};
