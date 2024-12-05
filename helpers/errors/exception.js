class ExceptionError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ExceptionalError';
		this.status = 401;
	}
}

module.exports = {ExceptionError};
