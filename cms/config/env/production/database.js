const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	const { host, port, database, user, password } = parse(
		env('DATABASE_URL', '')
	);

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: host || env('PGHOST'),
				port: port || env.int('PGPORT'),
				database: database || env('PGDATABASE'),
				user: user || env('PGUSER'),
				password: password || env('PGPASSWORD'),
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
	};
};
