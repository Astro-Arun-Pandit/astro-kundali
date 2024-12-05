const HttpErrorType = {
	// Roles Errors
	RoleNotFoundError: 'RoleNotFoundError',
	RoleAlreadyExistsError: 'RoleAlreadyExistsError',
	RoleNameEmptyError: 'RoleNameEmptyError',
	RoleNotEditable: 'RoleNotEditable',

	// Permissions Errors
	PermissionNotFoundError: 'PermissionNotFoundError',
	PermissionAlreadyExistsError: 'PermissionAlreadyExistsError',
	PermissionNameEmptyError: 'PermissionNameEmptyError',

	// Modules Errors
	ModuleNotFoundError: 'ModuleNotFoundError',
	ModuleNameEmptyError: 'ModuleNameEmptyError',
	ModuleSlugAlreadyExistsError: 'ModuleSlugAlreadyExistsError',
	ModuleSlugEmptyError: 'ModuleSlugEmptyError',

	//Common

	slugAlreadyExistsError: 'slugAlreadyExistsError',

	// Access Errors
	AccessDenied: 'AccessDenied',
	PermissionDenied: 'PermissionDenied',

	// Roles_Modules_Permissions_Mapping Errors

	// Users Errors
	UserNotFoundError: 'UserNotFoundError',
	ProvideUserTypeError: 'ProvideUserTypeError',
	UserInActiveError: 'UserInActiveError',
	UserPhoneNumberExistsError: 'UserPhoneNumberExistsError',
	UserNameNotPresentError: 'UserNameNotPresentError',
	UserPhoneNumberNotPresentError: 'UserPhoneNumberNotPresentError',
	UserPasswordNotPresentError: 'UserPasswordNotPresentError',

	// Server Errors
	UnknownServerError: 'UnknownServerError',

	// Validation Errors
	ValidationError: 'ValidationError',
	UnAuthorizedError: 'UnAuthorizedError',
	TokenMissingError: 'TokenMissingError',

	// Email Errors
	EmailAlreadyExistsError: 'EmailAlreadyExistsError',

	// General Errors
	EmptyRequiredFieldsError: 'EmptyRequiredFieldsError',
	WrongCredentialsError: 'WrongCredentialsError',
	UnableToInsert: 'UnableToInsert',
	UnableToUpdate: 'UnableToUpdate',
	InvalidRequest: 'InvalidRequest',
	DataAlreadyExists: 'DataAlreadyExists',
	StepError: 'StepError',
	BadFormatError: 'BadFormatError',
	InvalidOtpError: 'InvalidOtpError',
	TokenExpire: 'TokenExpire',
	AssociationError: 'AssociationError',
	SubmittedResponse: 'SubmittedResponse',
	SomethingWentWrong: 'SomethingWentWrong',
	NotAllowed: 'NotAllowed',

	

	// 404 Error
	NoDataFoundError: 'NoDataFoundError',
	IdNotFound: 'IdNotFound',

};

module.exports = HttpErrorType;
