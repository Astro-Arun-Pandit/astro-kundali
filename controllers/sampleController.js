const Users = require('../models/sampleModel');

// Defining all the controller routes here
const SampleController = (req, res, next) => {
	try {
		return res.status(200).json({
			success: true,
			message: 'Main sample route running fine!',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {SampleController};
