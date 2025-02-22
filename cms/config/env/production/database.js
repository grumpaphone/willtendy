const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('Current NODE_ENV:', process.env.NODE_ENV);
	console.log('Current ENV_PATH:', process.env.ENV_PATH);
	console.log('All environment variables:', Object.keys(process.env));

	// Get the connection string from Railway's environment variable
	const connectionString = env('DATABASE_URL');
	console.log('Connection string available:', !!connectionString);

	// Parse the connection string
	const config = parse(connectionString);
	console.log('Parsed config host:', config.host);

	return {
		defaultConnection: 'default',
		connections: {
			default: {
				connector: 'bookshelf',
				settings: {
					client: 'postgres',
					host: config.host,
					port: config.port,
					database: config.database,
					username: config.user,
					password: config.password,
					ssl: {
						rejectUnauthorized: false,
					},
					schema: 'public',
				},
				options: {
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
			},
		},
	};
};
