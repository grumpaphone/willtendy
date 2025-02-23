const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('=== Production Database Configuration ===');
	console.log('NODE_ENV:', process.env.NODE_ENV);
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('Process CWD:', process.cwd());

	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is required in production');
	}

	return {
		connection: {
			client: 'postgres',
			connection: process.env.DATABASE_URL,
			debug: false,
			acquireConnectionTimeout: 60000,
			pool: {
				min: 0,
				max: 5,
				createTimeoutMillis: 30000,
				acquireTimeoutMillis: 60000,
				idleTimeoutMillis: 30000,
				reapIntervalMillis: 1000,
				createRetryIntervalMillis: 100,
			},
		},
	};
};
