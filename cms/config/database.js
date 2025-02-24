const path = require('path');

if (process.env.PGHOST === '::1') {
	console.log('[DEBUG] Overriding PGHOST from ::1 to 127.0.0.1');
	process.env.PGHOST = '127.0.0.1';
}

module.exports = ({ env }) => {
	// Debug log all relevant environment variables
	console.log('[DEBUG] Database Environment Variables:', {
		DATABASE_URL: env('DATABASE_URL'),
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_CLIENT: process.env.DATABASE_CLIENT,
		PGHOST: process.env.PGHOST,
		PGPORT: process.env.PGPORT,
		PGDATABASE: process.env.PGDATABASE,
		PGUSER: process.env.PGUSER,
		DATABASE_SSL: process.env.DATABASE_SSL,
	});

	const client = env('DATABASE_CLIENT', 'postgres');

	const connections = {
		postgres: {
			connection: {
				host: env('PGHOST'),
				port: env.int('PGPORT'),
				database: env('PGDATABASE'),
				user: env('PGUSER'),
				password: env('PGPASSWORD'),
				ssl:
					env('DATABASE_SSL') === 'true'
						? {
								rejectUnauthorized: false,
							}
						: false,
				debug: false,
			},
			pool: {
				min: 0,
				max: 10,
				acquireTimeoutMillis: 60000,
				createTimeoutMillis: 30000,
				idleTimeoutMillis: 30000,
				reapIntervalMillis: 1000,
				createRetryIntervalMillis: 100,
			},
		},
	};

	return {
		connection: {
			client,
			...connections[client],
			acquireConnectionTimeout: 60000,
			pool: {
				min: 0,
				max: 10,
			},
		},
	};
};
