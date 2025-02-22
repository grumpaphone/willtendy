const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('Current NODE_ENV:', process.env.NODE_ENV);
	console.log('Current ENV_PATH:', process.env.ENV_PATH);
	console.log('All environment variables:', Object.keys(process.env));

	// Log Railway-specific environment variables
	console.log('RAILWAY_INTERNAL_PORT:', process.env.RAILWAY_INTERNAL_PORT);
	console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
	console.log('PGHOST:', process.env.PGHOST);
	console.log('PGPORT:', process.env.PGPORT);
	console.log('PGDATABASE:', process.env.PGDATABASE);
	console.log('PGUSER:', process.env.PGUSER);

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: env('PGHOST', 'postgres.railway.internal'),
				port: env.int('PGPORT', 5432),
				database: env('PGDATABASE', 'railway'),
				user: env('PGUSER', 'postgres'),
				password: env('PGPASSWORD'),
				ssl: {
					rejectUnauthorized: false,
				},
			},
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
