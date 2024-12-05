const jwt = require('jsonwebtoken');
const Users = require('../models/users/userModel');
const {HttpUnAuthorizedError} = require('../helpers/errors/api-errors');
const {UserDataConvertor} = require('./resources/authenticationToJson');
const Roles = require('../models/roles/rolesModels');

/**
 * Middleware for user authentication using JSON Web Tokens (JWT).
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const authentication = async (req, res, next) => {
	try {
		// Extract token from the 'Authorization' header
		const extractToken = req.headers.authorization;
		if (extractToken && extractToken.split(' ').length > 1) {
			// Split the 'Authorization' header to get the token
			const token = extractToken.split(' ')[1];
			if (!token || token === 'null') {
				throw new HttpUnAuthorizedError();
			} else {
				// Verify the token using the secret key
				const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {ignoreExpiration: true});

				if (!decoded || !decoded.user_id) {
					throw new HttpUnAuthorizedError();
				} else {
					// Check if the token has expired
					const currentTime = Math.floor(Date.now() / 1000);
					if (decoded.exp && decoded.exp < currentTime) {
						throw new HttpUnAuthorizedError();
					} else {
						// Retrieve user information using user ID from the token
						const findUser = await Users.getUserById(decoded.user_id, false);
						if (findUser && findUser.length > 0) {
							const user_role = await Roles.getRoleById(decoded.user_role, false);
							// If user is found, convert user data, check the user role, status, is_delete and then attach to request object
							const convertedData = await new UserDataConvertor(findUser).convertToUserData();
							if (
								decoded.user_id === convertedData.user_id &&
								decoded.user_role === convertedData.role_id &&
								convertedData.user_status === 'active' &&
								convertedData.is_delete === false &&
								user_role &&
								user_role.role_status === 'active'
							) {
								req.user = convertedData;
								req.user_role = user_role;
								next();
							} else {
								throw new HttpUnAuthorizedError();
							}
						} else {
							throw new HttpUnAuthorizedError();
						}
					}
				}
			}
		} else {
			// If 'Authorization' header is missing or improperly formatted, throw Unauthorized error
			throw new HttpUnAuthorizedError();
		}
	} catch (error) {
		const customError = new HttpUnAuthorizedError();
		next(customError);
	}
};

module.exports = {authentication};
