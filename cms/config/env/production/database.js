const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('=== Production Database Configuration ===');
	console.log('NODE_ENV:', process.env.NODE_ENV);
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('Process CWD:', process.cwd());

	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is required in production');
	}

	const config = parse(process.env.DATABASE_URL);

	return {
		connection: {
			client: 'postgres',
			connection: {
				...config,
				ssl: { rejectUnauthorized: false },
			},
			pool: {
				min: 0,
				max: 5,
				acquireTimeoutMillis: 60000,
				createTimeoutMillis: 30000,
				idleTimeoutMillis: 30000,
				reapIntervalMillis: 1000,
				createRetryIntervalMillis: 100,
			},
		},
	};
};
