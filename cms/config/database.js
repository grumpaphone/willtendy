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
		DATABASE_SSL: process.env.DATABASE_SSL,
	});

	return {
		connection: {
			client: 'postgres',
			connection: {
				connectionString: env('DATABASE_URL'),
				ssl: env('DATABASE_SSL') === 'true' ? {
					rejectUnauthorized: false
				} : false,
				debug: true,
			},
			pool: {
				min: 0,
				max: 5,
				acquireTimeoutMillis: 300000,
				createTimeoutMillis: 300000,
				destroyTimeoutMillis: 50000,
				idleTimeoutMillis: 300000,
				reapIntervalMillis: 10000,
				createRetryIntervalMillis: 2000,
				propagateCreateError: false,
			},
			debug: true,
		},
	};
};
