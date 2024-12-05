const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {UPLOAD_FILE_SIZE, MAX_FILE_UPLOAD_COUNT} = require('../constants/general.constants');

function customFileFilter(req, file, callback, extensions) {
	const ext = path.extname(file.originalname).toLowerCase();
	if (!extensions.includes(ext.toLowerCase())) {
		const customErr = new Error(`Only ${extensions.toString()} File Type Allowed`);
		customErr.status = 422;
		return callback(customErr, false);
	}
	// if (
	// 	file.mimetype == 'image/png' ||
	// 	file.mimetype == 'image/jpeg' ||
	// 	file.mimetype == 'image/jpg'
	// )
	callback(null, true);
}

function customFileLocation(req, file, callback, filePath) {
	const folderPath = path.join(__dirname, '../../', filePath);

	// Check if the folder exists, and create it if it doesn't
	fs.mkdir(folderPath, {recursive: true}, err => {
		if (err) {
			callback(err);
		} else {
			callback(null, folderPath);
		}
	});
}

function customFileName(req, file, cb) {
	const ext = path.extname(file.originalname).toLowerCase();

	const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
	cb(null, `${uniqueSuffix}${ext}`);
}

const customMulterStorage = (filePath, extensions) =>
	multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => customFileLocation(req, file, cb, filePath),
			filename: customFileName,
		}),
		fileFilter: (req, file, cb) => customFileFilter(req, file, cb, extensions),
		limits: {
			fileSize: UPLOAD_FILE_SIZE * 1024 * 1024,
			files: MAX_FILE_UPLOAD_COUNT,
		},
	});

module.exports = {customMulterStorage};
