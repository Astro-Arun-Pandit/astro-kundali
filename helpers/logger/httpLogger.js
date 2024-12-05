const morganJson = require('morgan-json');
const morgan = require('morgan');

const logger = require('./logger');

const format = morganJson({
	method: ':method',
	url: ':url',
	status: ':status',
	contentLength: ':res[content-length]',
	responseTime: ':response-time',
});

const httpLogger = morgan(format, {
	stream: {
		write: message => {
			return logger.http(message);
		},
	},
});

module.exports = httpLogger;
