// Importing all the liberaries
const express = require('express');
const Sentry = require('@sentry/node');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment-timezone');

// Importing all the other files below
const httpLogger = require('./helpers/logger/httpLogger');

// Importing all the Routes Below
const indexRoute = require('./routes/indexRoutes');
const GlobalErrorHandler = require('./middlewares/globalErrorHandler');
const PGDatabaseErrorHandler = require('./middlewares/DatabaseErrorHandler');
const JoiValidationErrorHandler = require('./middlewares/ValidationErrorHandler');
const {FallbackOrigin} = require('./helpers/constants/general.constants');
const MulterErrorHandler = require('./middlewares/MulterErrorHandler');

// Calling the app
const app = express();

// set timezone

process.env.TZ = 'Asia/Kolkata';

const defaultTimezone = process.env.TIMEZONE || 'Asia/Kolkata';
// Example timezone

moment.tz.setDefault(defaultTimezone);
// Sentry  initialized
Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		// enable HTTP calls tracing
		// new Sentry.Integrations.Http({tracing: true}),
		// // enable Express.js middleware tracing
		new Sentry.Integrations.Express({app}),
	],
});

// // The Sentry request handler middleware must be added before any other handlers
// app.use(Sentry.Handlers.requestHandler());

// Calling the middlewares
dotenv.config();

app.use(express.json({limit: '10mb'}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: false,
	})
);
app.use(httpLogger);

// Setting all the headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
	res.header('Access-Control-Expose-Headers', ['Authorization']);
	next();
});

// Allow Other Origins
let allowedOrigins = process.env.ALLOWED_ORIGINS || '';
allowedOrigins = allowedOrigins.split(',');

// Cors are defined below
app.use(
	cors({
		optionsSuccessStatus: 200,
		exposedHeaders: ['x-user-token'],
		origin: [...FallbackOrigin, ...allowedOrigins],
		credentials: (process.env.NODE_ENV || 'development') === 'development' ? false : true,
	})
);

app.use(express.static(path.join(__dirname, 'public')));

// All routes are defined below
app.get('/api/health', (req, res) => {
	return res.status(200).json({
		success: true,
		message: `Main server running fine at ${process.env.BASEURL}:${process.env.PORT}`,
	});
});

// Defining the routes and the prefixes below
app.use('/api', indexRoute);

// Unexceptional route call
app.use((req, res) => {
	return res.status(404).json({
		success: false,
		error: 'Not Found',
		message: 'The requested resource was not found.',
	});
});

app.use(Sentry.Handlers.errorHandler());

// Calling the database error handler middleware here
app.use(PGDatabaseErrorHandler);

// Calling the multer error handler middleware here
app.use(MulterErrorHandler);

// Calling the validation error handler middleware here
app.use(JoiValidationErrorHandler);

// Calling the global error handler middleware here
app.use(GlobalErrorHandler);

module.exports = app;
