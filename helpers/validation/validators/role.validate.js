const Joi = require('joi');
const {JoiStringValidation, JoiNumberValidation, JoiNumberArrayValidation} = require('../common');
const {ALL_PERMISSIONS_TYPES} = require('../../constants/general.constants');

// Schema validation for role addition
const mappingObjectSchema = Joi.object({
	module_id: JoiNumberValidation({fieldName: 'module_id'}).required(),
	permissions: Joi.array()
		.items(
			JoiStringValidation({fieldName: 'permissions', validEnum: Object.values(ALL_PERMISSIONS_TYPES)}).valid(
				ALL_PERMISSIONS_TYPES.Add,
				ALL_PERMISSIONS_TYPES.View,
				ALL_PERMISSIONS_TYPES.Delete,
				ALL_PERMISSIONS_TYPES.Edit,
				ALL_PERMISSIONS_TYPES.Download,
			)
		)
		.required(),
});

// schema validation for role addition
const role_add_schema = Joi.object({
	role_name: JoiStringValidation({fieldName: 'role_name'}).min(3).required(),
	mappingArray: Joi.array().items(mappingObjectSchema).required(),
}).options({
	abortEarly: false,
});

// schema validation for role update
const role_update_schema = Joi.object({
	role_name: JoiStringValidation({fieldName: 'role_name'}).min(3).trim().required(),
	role_status: JoiStringValidation({fieldName: 'role_status', validEnum: ['active', 'inactive']})
		.valid('active', 'inactive')
		.trim()
		.lowercase()
		.required(),
	mappingArray: Joi.array().items(mappingObjectSchema).required(),
}).options({
	abortEarly: false,
});

const role_delete_schema = Joi.object({
	roleIds: JoiNumberArrayValidation('roleIds').required(),
}).options({abortEarly: false});

module.exports = {role_add_schema, role_update_schema, role_delete_schema};
