const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('=== Database Configuration Debug ===');
	console.log('Loading PRODUCTION database configuration');
	console.log('NODE_ENV:', process.env.NODE_ENV);
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('Current working directory:', process.cwd());
	console.log('Configuration file being loaded:', __filename);

	if (!process.env.DATABASE_URL) {
		console.error('ERROR: DATABASE_URL is not set in production environment');
		throw new Error('DATABASE_URL is required in production');
	}

	const parsed = parse(process.env.DATABASE_URL);
	console.log('Parsed database connection:', {
		host: parsed.host,
		port: parsed.port,
		database: parsed.database,
		user: parsed.user,
		ssl: true,
	});

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: parsed.host,
				port: parsed.port,
				database: parsed.database,
				user: parsed.user,
				password: parsed.password,
				ssl: {
					rejectUnauthorized: false,
				},
			},
			debug: false,
			pool: {
				min: 0,
				max: 10,
				acquireTimeoutMillis: 30000,
				createTimeoutMillis: 30000,
				destroyTimeoutMillis: 5000,
				idleTimeoutMillis: 30000,
				reapIntervalMillis: 1000,
				createRetryIntervalMillis: 100,
				propagateCreateError: false,
			},
		},
	};
};
