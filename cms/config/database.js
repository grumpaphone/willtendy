const path = require('path');

// Only log in development
if (process.env.PGHOST === '::1' && process.env.NODE_ENV !== 'production') {
	console.log('[DEBUG] Overriding PGHOST from ::1 to 127.0.0.1');
	process.env.PGHOST = '127.0.0.1';
}

module.exports = ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
			connectionString: env('DATABASE_URL'),
			ssl: env.bool('DATABASE_SSL', false)
				? {
						rejectUnauthorized: false,
					}
				: false,
		},
		pool: {
			min: 2,
			max: 10,
			acquireTimeoutMillis: 30000,
			createTimeoutMillis: 30000,
			idleTimeoutMillis: 30000,
			reapIntervalMillis: 1000,
			createRetryIntervalMillis: 100,
		},
		debug: env.bool('DATABASE_DEBUG', false),
	},
});
