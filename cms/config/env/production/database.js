module.exports = ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
			host: env('PGHOST'),
			port: env.int('PGPORT'),
			database: env('PGDATABASE'),
			user: env('PGUSER'),
			password: env('PGPASSWORD'),
			ssl: {
				rejectUnauthorized: false,
			},
		},
		debug: false,
		acquireConnectionTimeout: 1000000,
		pool: {
			min: 0,
			max: 10,
			createTimeoutMillis: 30000,
			acquireTimeoutMillis: 600000,
			idleTimeoutMillis: 20000,
			reapIntervalMillis: 20000,
			createRetryIntervalMillis: 200,
		},
	},
});
