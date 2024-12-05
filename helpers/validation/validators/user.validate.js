const Joi = require('joi');
const {
	JoiStringValidation,
	JoiNameValidation,
	JoiPhoneValidation,
	JoiEmailValidation,
	JoiNumberValidation,
	JoiNumberArrayValidation,
} = require('../common');

const user_login_schema = Joi.object({
	userInput: Joi.alternatives().try(JoiNameValidation('userInput'), JoiPhoneValidation('userInput')).required(),
	user_password: JoiStringValidation({fieldName: 'user_password'}).required(),
}).options({
	abortEarly: false,
});

const user_add_schema = Joi.object({
	user_name: JoiNameValidation('user_name').required().trim(),
	user_email: JoiEmailValidation('user_email').required(),
	// user_password: JoiStringValidation({fieldName: 'user_password'}).min(3).trim().required(),
	user_phone_number: JoiPhoneValidation('user_phone_number').required(),
	user_role: JoiNumberValidation({fieldName: 'user_role'}).required(),
	user_status: JoiStringValidation({fieldName: 'user_status', validEnum: ['active', 'inactive']})
		.valid('active', 'inactive')
		.trim()
		.lowercase()
		.required(),
}).options({abortEarly: false});

const user_update_schema = Joi.object({
	user_name: JoiNameValidation('user_name').required().trim(),
	user_email: JoiEmailValidation('user_email').required(),
	user_role: JoiNumberValidation({fieldName: 'user_role'}).required(),
	user_status: JoiStringValidation({fieldName: 'user_status', validEnum: ['active', 'inactive']})
		.valid('active', 'inactive')
		.trim()
		.lowercase()
		.required(),
}).options({abortEarly: false});

const user_delete_schema = Joi.object({
	userIds: JoiNumberArrayValidation('userIds').required(),
}).options({abortEarly: false});

const user_phone_schema = Joi.object({
	user_phone_number: JoiPhoneValidation('user_phone_number').required(),
}).options({abortEarly: false});

const user_validate_otp_schema = Joi.object({
	user_phone_number: JoiPhoneValidation('user_phone_number').required(),
	otp: JoiNumberValidation({fieldName: 'otp'}).required().min(100000).max(999999),
}).options({abortEarly: false});

const user_change_password_schema_after_otp = Joi.object({
	password: JoiStringValidation({fieldName: 'password'}).required().min(6),
	confirm_password: Joi.any()
		.equal(Joi.ref('password'))
		.required()
		.messages({'any.only': 'Confirm Password Does Not Match With Password'}),
}).options({
	abortEarly: false,
});

const user_change_password_schema = Joi.object({
	old_password: JoiStringValidation({fieldName: 'old_password'}).required().min(6),
	password: JoiStringValidation({fieldName: 'password'}).required().min(6),
	confirm_password: Joi.any()
		.equal(Joi.ref('password'))
		.required()
		.messages({'any.only': 'Confirm Password Does Not Match With Password'}),
}).options({
	abortEarly: false,
});

module.exports = {
	user_login_schema,
	user_add_schema,
	user_update_schema,
	user_delete_schema,
	user_phone_schema,
	user_validate_otp_schema,
	user_change_password_schema_after_otp,
	user_change_password_schema,
};
