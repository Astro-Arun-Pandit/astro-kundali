const Validators = require('../helpers/validation/validators');

/**
 * Validation middleware used to check correct req.body
 *
 * specify correct validator string otherwise throws error
 *
 * please see validators in helpers for all keys(puc-backend\helpers\validation\validators\index)
 *
 * @param {string} validator
 * @returns validation middleware
 */
module.exports = function (validator) {
	return async function (req, res, next) {
		try {
			//! If validator is not exist, throw err
			if (!Validators[validator]) {
				throw new Error(`'${validator}' validator is not exist`);
			}
			const validated = await Validators[validator].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (err) {
			next(err);
		}
	};
};
