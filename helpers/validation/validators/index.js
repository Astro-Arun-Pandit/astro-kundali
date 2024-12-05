const {role_add_schema, role_update_schema, role_delete_schema} = require('./role.validate');


const {
	user_login_schema,
	user_add_schema,
	user_update_schema,
	user_delete_schema,
	user_phone_schema,
	user_validate_otp_schema,
	user_change_password_schema_after_otp,
	user_change_password_schema,
} = require('./user.validate');


// a single object for all validation schemas
const Validators = {
	role_add: role_add_schema,
	role_update: role_update_schema,

	// user
	user_login: user_login_schema,
	add_user: user_add_schema,
	update_user: user_update_schema,
	delete_user: user_delete_schema,
	delete_role: role_delete_schema,
	user_phone: user_phone_schema,
	validate_otp: user_validate_otp_schema,
	change_password_after_otp: user_change_password_schema_after_otp,
	change_password: user_change_password_schema,

};

module.exports = Validators;
