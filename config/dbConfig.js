const { MongoClient } = require('mongodb');
const { ASTRO_ARUN_DB_SCHEMAS } = require('./dbName');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';  // Default URI or environment variable
const dbName = ASTRO_ARUN_DB_SCHEMAS.ASTRO_KUNDALI;  // Default DB name or environment variable

// Attempt to perform a simple query to check the connection
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(client => {
		const db = client.db(dbName);

		// Check if the database is accessible by listing collections
		db.listCollections().toArray()
			.then(() => {
				// Check for a schema/environment variable (optional)
				if (!process.env.MONGODB_SCHEMA) {
					console.warn("Warning: You haven't specified the schema name, using default schema.");
				}
				console.log('Connected to MongoDB database');
				client.close();  // Close connection after use
			})
			.catch(error => {
				console.error('Error checking collections:', error.message);
				client.close();
			});
	})
	.catch(error => {
		console.error('Error connecting to MongoDB:', error.message);
	});
