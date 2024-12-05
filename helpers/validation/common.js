const Joi = require('joi');

const {PHONE_PATTERN, NAME_PATTERN} = require('../constants/general.constants');

/**

 * Joi string validation.

 *

 * Provides validation for string types with customizable error messages based on the field name.

 *

 * To improve error presentation, always provide the field name.

 *

 * When providing an enumeration (enum), specify valid keys for better validation and error messages.

 *

 * @param {Object} options - An object containing the field name and valid enum keys.

 * @param {string} [options.fieldName='field'] - The name of the field for better error presentation.

 * @param {string[]} [options.validEnum=''] - The valid enumeration keys for the field.

 * @returns {Joi.StringSchema<string>} - Returns a Joi string schema instance with customized error messages.

 */

const JoiStringValidation = ({fieldName = 'field', validEnum = ''}) => {
	const str = Joi.string().messages({
		'string.base': `${fieldName} is string type`,

		'string.pattern.base': `${fieldName} requires specific pattern`,

		'string.empty': `${fieldName} cannot be empty`,

		'string.min': `${fieldName} require minimum {#limit} length`,

		'string.max': `${fieldName} require max {#limit} length`,

		'string.length': `${fieldName} require only {#limit} length`,

		'string.email': `${fieldName} not a valid mail`,

		'any.required': `${fieldName} is mandatory`,

		'any.only': `${fieldName} type can only ${validEnum}`,
	});

	return str;
};

/**

 * Joi Boolean Validation.

 *

 * Provides validation for boolean types with customizable error messages based on the field name.

 *

 * To improve error presentation, always provide the field name.

 *

 * @param {Object} options - An object containing the field name.

 * @param {string} options.fieldName - The name of the field for better error presentation.

 * @returns {Joi.BooleanSchema<boolean>} - Returns a Joi boolean schema instance with customized error messages.

 */

const JoiBooleanValidation = ({fieldName}) => {
	const bool = Joi.boolean().messages({
		'boolean.base': `${fieldName} is boolean type`,

		'boolean.empty': `${fieldName} cannot be empty`,

		'any.required': `${fieldName} is mandatory`,
	});

	return bool;
};

/**

 * Joi Number Validation.

 *

 * Provides validation for number types with customizable error messages based on the field name.

 *

 * To improve error presentation, always provide the field name.

 *

 * For number comparison, the following keys can be specified:

 * - `greater`: Validates that the number is greater than the provided value.

 *

 * @param {Object} options - An object containing the field name and number comparison key.

 * @param {string} options.fieldName - The name of the field for better error presentation.

 * @param {number} [options.greater=undefined] - The reference value for greater comparison.

 * @returns {Joi.NumberSchema<number>} - Returns a Joi number schema instance with customized error messages.

 */

const JoiNumberValidation = ({fieldName, greater = undefined}) => {
	const num = Joi.number().messages({
		'number.base': `${fieldName} is integer type`,

		'number.pattern.base': `${fieldName} requires specific pattern`,

		'number.empty': `${fieldName} cannot be empty`,

		'number.min': `${fieldName} require minimum value {#limit}`,

		'number.max': `${fieldName} require max value {#limit}`,

		'any.required': `${fieldName} is mandatory`,

		'number.ref': `${fieldName} should be greater than ${greater}`,

		'number.greater': `${fieldName} should be greater than ${greater}`,
	});

	return num;
};

/**

 * Joi Param Id Validation.

 *

 * Provides validation for param ids with customizable error messages based on the field name.

 *

 * To improve error presentation, always provide the field name.

 *

 * For number comparison, the following keys can be specified:

 * - `greater`: Validates that the number is greater than the provided value.

 *

 * @param {Object} options - An object containing the field name and number comparison key.

 * @param {string} options.fieldName - The name of the field for better error presentation.

 * @param {number} [options.greater=undefined] - The reference value for greater comparison.

 * @returns {Joi.NumberSchema<number>} - Returns a Joi number schema instance with customized error messages.

 */
const JoiParamIdValidation = ({fieldName, greater = undefined}) => {
	const num = Joi.number()
		.required()
		.min(1)
		.integer()
		.max(100000)
		.messages({
			'number.base': `${fieldName} is integer type`,

			'number.pattern.base': `${fieldName} requires specific pattern`,

			'number.empty': `${fieldName} cannot be empty`,

			'number.min': `${fieldName} require minimum value {#limit}`,

			'number.max': `${fieldName} require max value {#limit}`,

			'any.required': `${fieldName} is mandatory`,

			'number.ref': `${fieldName} should be greater than ${greater}`,

			'number.greater': `${fieldName} should be greater than ${greater}`,
		});

	return num;
};

/**

 * Joi Date Validation.

 *

 * Provides validation for date types with customizable error messages based on the field name.

 *

 * To improve error presentation, always provide the field name.

 *

 * For date comparison, the following keys can be specified:

 * - `greater`: Validates that the date is greater than the provided value (default is 'now').

 * - `less`: Validates that the date is less than the provided value (default is 'now').

 * - `max`: Validates that the date is less than or equal to the provided value (default is 'now').

 * - `min`: Validates that the date is greater than or equal to the provided value (default is 'now').

 *

 * @param {Object} options - An object containing the field name and date comparison keys.

 * @param {string} options.fieldName - The name of the field for better error presentation.

 * @param {string} [options.greater='now'] - The reference date for greater comparison.

 * @param {string} [options.less='now'] - The reference date for less comparison.

 * @param {string} [options.max='now'] - The reference date for max comparison.

 * @param {string} [options.min='now'] - The reference date for min comparison.

 * @returns {Joi.DateSchema<Date>} - Returns a Joi date schema instance with customized error messages.

 */

const JoiDateValidation = ({fieldName, greater = 'now', less = 'now', max = 'now', min = 'now'}) => {
	const date = Joi.date().messages({
		'date.base': `${fieldName} is date type`,

		'date.empty': `${fieldName} cannot be empty`,

		'date.ref': `${fieldName} should be greater than ${greater}`,

		'date.greater': `${fieldName} should be greater than ${greater}`,

		'date.max': `${fieldName} should be greater than ${max}`,

		'date.min': `${fieldName} should be ${min}`,

		'date.less': `${fieldName} should be less than ${less}`,

		'any.required': `${fieldName} is mandatory`,
	});

	return date;
};

/**

 * Validates a phone number using Joi validation.

 *

 * @param {string} name - The name of the field.

 * @param {number} [length=10] - The length of the phone number (default is 10).

 * @param {boolean} [required=true] - Indicates if the field is required (default is true).

 * @returns {Joi.StringSchema<string>} - Returns a Joi schema for phone validation.

 */

const JoiPhoneValidation = (name, length = 10, required = true) => {
	const str = JoiStringValidation({fieldName: name}).pattern(PHONE_PATTERN).length(length).trim();

	return required ? str.required() : str;
};

/**

 * Validates a name using Joi validation.

 *

 * @param {string} name - The name of the field.

 * @returns {Joi.StringSchema<string>} - Returns a Joi schema for name validation.

 */

const JoiNameValidation = (name, required = true) => {
	const str = JoiStringValidation({fieldName: name}).pattern(NAME_PATTERN).min(2).max(255).trim();

	return required ? str.required() : str;
};

/**

 * Validates an email address using Joi validation.

 *

 * @param {string} name - The name of the field.

 * @param {boolean} [required=true] - Indicates if the field is required (default is true).

 * @returns {Joi.StringSchema<string>} - Returns a Joi schema for email validation.

 */

const JoiEmailValidation = (name, required = true) => {
	const str = JoiStringValidation({fieldName: name}).email().trim().max(250);

	return required ? str.required() : str;
};

/**

 * Validates a delete status using Joi validation.

 *

 * @param {string} name - The name of the field.

 * @returns {Joi.BooleanSchema<boolean>} - Returns a Joi schema for boolean validation.

 */

const JoiIsDeleteStatusValidation = name => {
	const str = JoiBooleanValidation({fieldName: name}).required();

	return str;
};

const JoiNumberArrayValidation = name => {
	const arr = Joi.array()
		.min(1)
		.items(JoiNumberValidation({fieldName: name}))
		.unique()
		.messages({
			'array.base': `${name} is array type`,
			'array.unique': `${name} requires unique ids`,
			'any.required': `${name} is mandatory`,
			'array.min': `${name} can not be empty`,
		});
	return arr;
};

const JoiNumberArrayValidationEmpty = name => {
	const arr = Joi.array()
		.items(JoiNumberValidation({fieldName: name}))
		.unique()
		.messages({
			'array.base': `${name} is array type`,
			'array.unique': `${name} requires unique ids`,
			'any.required': `${name} is mandatory`,
			'array.min': `${name} can not be empty`,
		});
	return arr;
};
const JoiStringArrayValidation = ({fieldName, min = 1}) => {
	const arr = Joi.array()
		.items(Joi.string().trim().required())
		.min(min)
		.unique()
		.messages({
			'array.base': `${fieldName} must be an array`,
			'array.unique': `${fieldName} requires unique values`,
			'any.required': `${fieldName} is mandatory`,
			'array.min': `${fieldName} cannot be empty`,
			'string.base': `Each item in ${fieldName} must be a string`,
			'string.empty': `Each item in ${fieldName} cannot be an empty string`,
		});

	return arr;
};
const JoiStringArrayValidationEmpty = ({fieldName}) => {
	const arr = Joi.array()
		.items(Joi.string().trim().optional())
		.unique()
		.messages({
			'array.base': `${fieldName} must be an array`,
			'array.unique': `${fieldName} requires unique values`,
			'any.required': `${fieldName} is mandatory`,
			'array.min': `${fieldName} cannot be empty`,
			'string.base': `Each item in ${fieldName} must be a string`,
			'string.empty': `Each item in ${fieldName} cannot be an empty string`,
		});

	return arr;
};
module.exports = {
	JoiDateValidation,

	JoiNumberValidation,

	JoiStringValidation,

	JoiBooleanValidation,

	JoiPhoneValidation,

	JoiNameValidation,

	JoiIsDeleteStatusValidation,

	JoiEmailValidation,
	JoiNumberArrayValidation,
	JoiNumberArrayValidationEmpty,
	JoiStringArrayValidation,
	JoiStringArrayValidationEmpty,
	JoiParamIdValidation,
	
};
