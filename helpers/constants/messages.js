const MESSAGES = {
	PERMISSION_NOT_ALLOWED: 'You Are Not Allowed To Perform This Action',
	ACCESS_DENIED: 'You Are Not Allowed To Access!',
	UNEXPECTED_FILE: 'Some Field Keys Are Not Allowed.',
	WRONG_FIELD_FILE_COUNT: 'File Field Count Is Not Proper.',
	DATA_ASSOCIATED: 'Cannot perform! This data is already associated with some records',
	FILE_TOO_LARGE_MESSAGE: (size = 2) => `Allowed Maximum File Size Is ${size} MB.`,
	ADD_MESSAGE: name => `${name} Added`,
	UPDATE_MESSAGE: name => `${name} Updated`,
};

module.exports = {MESSAGES};
