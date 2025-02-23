const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	// Log all relevant environment variables for debugging
	console.log('=== Database Configuration Debug ===');
	console.log('NODE_ENV:', process.env.NODE_ENV);
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('DATABASE_CLIENT:', process.env.DATABASE_CLIENT);
	console.log('PGHOST:', process.env.PGHOST);
	console.log(
		'Available env variables:',
		Object.keys(process.env).filter(
			(key) =>
				key.includes('PG') ||
				key.includes('DATABASE') ||
				key.includes('RAILWAY')
		)
	);

	// Get the DATABASE_URL from Railway
	const databaseUrl = env('DATABASE_URL');

	if (!databaseUrl) {
		console.error('DATABASE_URL is not set!');
		throw new Error('DATABASE_URL environment variable is required');
	}

	// Parse the connection string
	const config = parse(databaseUrl);
	console.log('Parsed database config:', {
		host: config.host,
		port: config.port,
		database: config.database,
		user: config.user,
		// password omitted for security
	});

	return {
		connection: {
			client: 'postgres',
			connection: databaseUrl,
			debug: true,
			pool: {
				min: 0,
				max: 10,
				acquireTimeoutMillis: 5000,
				createTimeoutMillis: 5000,
				destroyTimeoutMillis: 5000,
				idleTimeoutMillis: 30000,
				reapIntervalMillis: 1000,
				createRetryIntervalMillis: 100,
				propagateCreateError: false,
			},
		},
	};
};
