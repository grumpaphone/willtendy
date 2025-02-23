const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('=== Production Database Configuration ===');
	console.log('NODE_ENV:', process.env.NODE_ENV);
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('Process CWD:', process.cwd());

	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is required in production');
	}

	// Parse the connection URL
	const parsed = parse(process.env.DATABASE_URL);

	// Log the parsed configuration
	console.log('Parsed database configuration:', {
		host: parsed.host,
		port: parsed.port,
		database: parsed.database,
		user: parsed.user,
		// password omitted for security
	});

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: 'postgres.railway.internal', // Explicitly set the host
				port: parseInt(parsed.port || '5432', 10),
				database: parsed.database || 'railway',
				user: parsed.user || 'postgres',
				password: parsed.password,
				ssl: {
					rejectUnauthorized: false,
					ca: process.env.CA_CERT, // Include CA cert if provided
				},
				schema: 'public',
				charset: 'utf8',
			},
			debug: true, // Enable debug logging temporarily
			acquireConnectionTimeout: 60000,
			pool: {
				min: 0,
				max: 5,
				createTimeoutMillis: 30000,
				acquireTimeoutMillis: 60000,
				idleTimeoutMillis: 30000,
				reapIntervalMillis: 1000,
				createRetryIntervalMillis: 100,
				propagateCreateError: false, // Don't fail fast on creation
			},
		},
	};
};
