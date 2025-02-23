const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('=== Production Database Configuration ===');
	console.log('NODE_ENV:', process.env.NODE_ENV);
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('Process CWD:', process.cwd());

	const databaseUrl = env('DATABASE_URL');

	if (!databaseUrl) {
		throw new Error('DATABASE_URL is required in production');
	}

	// Parse the connection string
	const config = parse(databaseUrl);

	// Log the parsed configuration
	console.log('Parsed database configuration:', {
		host: config.host,
		port: config.port,
		database: config.database,
		user: config.user,
		// password omitted for security
	});

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: config.host,
				port: config.port,
				database: config.database,
				user: config.user,
				password: config.password,
				ssl: {
					rejectUnauthorized: false,
				},
				schema: env('DATABASE_SCHEMA', 'public'),
			},
			debug: false,
			acquireConnectionTimeout: 60000,
			pool: {
				min: 0,
				max: 5,
			},
		},
	};
};
