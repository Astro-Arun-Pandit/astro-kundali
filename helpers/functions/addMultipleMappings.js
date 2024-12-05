const Modules = require('../../models/modules/moduleModels');
const RolesModulesPermissionsMapping = require('../../models/rolesPermissionsMapping/mappingsModels');
const {HttpIdNotFoundError, HttpPermissionNotFoundError, HttpDataAlreadyExistsError} = require('../errors/api-errors');

// This function is used to add the multiple mappings with the role_id, module_id & permissions in one array
/**
 * Common Method , Used in
 * @param mappingArray and next trx
 * @Dependencies RolesController, MappingController
 * @returns true
 */
const addMultipleMappings = async function (trx, mappingArray, next) {
	try {
		for (const mapping of mappingArray) {
			const {role_id, module_id, permissions} = mapping;
			if (!role_id) {
				throw new HttpIdNotFoundError();
			}
			if (!module_id) {
				throw new HttpIdNotFoundError();
			}
			if (!permissions) {
				throw new HttpPermissionNotFoundError();
			}

			// check that module id exists or not already
			const isModuleExists = await Modules.getModuleById(module_id);
			if (!isModuleExists) {
				throw new HttpIdNotFoundError();
			}

			const mappingData = await RolesModulesPermissionsMapping.getSingleMappingByIds(role_id, module_id, trx);

			if (!mappingData) {
				await RolesModulesPermissionsMapping.addMapping(role_id, module_id, permissions, trx);
			} else {
				if (mappingData && mappingData.is_delete === true) {
					await RolesModulesPermissionsMapping.addMapping(role_id, module_id, permissions, trx);
				} else {
					throw new HttpDataAlreadyExistsError();
				}
			}
		}
		return true;
	} catch (error) {
		await trx.rollback();
		next(error);
	}
};

module.exports = addMultipleMappings;
