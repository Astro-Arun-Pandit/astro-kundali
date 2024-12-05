const app = require('./app.js');
const logger = require('./helpers/logger/logger.js');

const port = process.env.PORT;

app.listen(port, () => console.log(`API running on port ${port}`));

// Handle uncaught exceptions
process.on('uncaughtException', err => {
	console.error('Uncaught Exception:', err);
	logger.error('Uncaught Exception:', err);
	process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
	process.exit(1);
});
