const {pincode_check_schema} = require('../helpers/validation/validators/pincode.datastore.validate');

function ParamValidate(param) {
	return async function (req, res, next) {
		try {
			//! If param is not exist, throw err
			if (!req.params[param]) {
				throw new Error(`'${param}' is not exist`);
			}
			next();
		} catch (err) {
			next(err);
		}
	};
}

const PincodeSearchParam = async (req, res, next) => {
	try {
		const searchTerm = req.query.searchTerm;
		const pinObj = {pincode: searchTerm};
		await pincode_check_schema.validateAsync(pinObj);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {ParamValidate, PincodeSearchParam};
