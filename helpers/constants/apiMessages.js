const API_MESSAGES = {
	GREETINGS: 'Greetings',
	LOGIN_SUCCESSFULLY: 'Logged in successfully',
	ADDED_SUCCESSFULLY: moduleName => `${moduleName} added successfully`,
	FETCHED_SUCCESSFULLY: moduleName => `${moduleName} fetched successfully`,
	GET_DETAILS_SUCCESSFULLY: moduleName => `${moduleName} details fetched successfully`,
	GET_SINGLE_DETAILS_SUCCESSFULLY: moduleName => `${moduleName} detail fetched successfully`,
	SUCCESSFULLY: moduleName => `${moduleName} successfully`,
	UPDATED_SUCCESSFULLY: moduleName => `${moduleName} Updated Successfully`,
	ALREADY_EXIST: moduleName => `${moduleName} already exists`,
	DELETE_MESSAGE: module => `${module} Deleted Successfully`,
	DELETED_SUCCESSFULLY: (moduleName, records) => `${records} ${moduleName}'(s) deleted successfully`,
	CONTACT_TO_SUPPORT: 'Please contact to support team',
	SOMETHING_WENT_WRONG: 'Something went wrong',
};

module.exports = {API_MESSAGES};
