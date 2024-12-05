const {customMulterStorage} = require('../helpers/functions/multerFile');

const allowedImageExtensions = ['.png', '.jpg', '.jpeg', '.jfif', '.mp4', '.mkv'];
const allowedDocExtensions = ['.pdf'];
const allowedExcelExtensions = ['.csv', '.xls', '.xlsx'];
const allowedCombineExtensions = allowedDocExtensions.concat(allowedImageExtensions);

const fileType = {
	onlyImages: allowedImageExtensions,
	onlyPdf: allowedDocExtensions,
	onlyImageAndPdf: allowedCombineExtensions,
	onlyExcel: allowedExcelExtensions,
};

/**
 * Middleware for handling file uploads.
 *
 * @function
 * @param {string} path - The destination path where files will be stored.
 * @param {object[]} fields - An array of field names for which files will be uploaded. [{name: 'gstDoc', maxCount: 1}]
 * @param {string} type - The type of file to be uploaded (e.g., 'onlyImages', 'onlyPdf').
 * @returns {Function} Express middleware function.
 */
function fileUploaderMiddleware(path, fields, type) {
	return (req, res, next) => {
		const upload = customMulterStorage(path, fileType[type]).fields(fields);
		upload(req, res, err => {
			if (err) {
				return next(err);
			}
			// Everything went fine.
			next();
		});
	};
}

module.exports = {fileUploaderMiddleware};
