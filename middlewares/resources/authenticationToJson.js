/**
 * Class representing a converter for user authentication data.
 */
class UserDataConvertor {
	/**
	 * Creates an instance of AuthDataConvertor.
	 * @param {Array} input - The input data to be converted.
	 */
	constructor(input) {
		this.input = input;
		this.transformedOutput = {};
	}

	/**
	 * Converts the input data into the desired authentication data format.
	 *
	 * @returns {Object} - The transformed authentication data.
	 */
	convertToUserData() {
		// Iterate over each item in the input data
		this.input.forEach(item => {
			// If transformedOutput doesn't have user_id, initialize user-related properties
			if (!this.transformedOutput.user_id) {
				this.transformedOutput.user_id = item.user_id;
				this.transformedOutput.user_name = item.user_name;
				this.transformedOutput.user_email = item.user_email;
				this.transformedOutput.user_phone_number = item.user_phone_number;
				this.transformedOutput.user_status = item.user_status;
				this.transformedOutput.user_unique_id = item.user_unique_id;
				this.transformedOutput.is_delete = item.is_delete;
				this.transformedOutput.role_id = item.role_id;
				this.transformedOutput.role_name = item.role_name;
				this.transformedOutput.role_slug = item.role_slug;
				this.transformedOutput.module_permissions = [];
			}

			// Create modulePermissions object from the current item
			const modulePermissions = {
				module_name: item.module_name,
				module_slug: item.module_slug,
				permissions: item.permissions,
			};

			// Push the modulePermissions object to the module_permissions array
			this.transformedOutput.module_permissions.push(modulePermissions);
		});

		// Return the transformed authentication data
		return this.transformedOutput;
	}
}

module.exports = {UserDataConvertor};
