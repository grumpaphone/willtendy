const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	// In production, use PG* environment variables
	if (process.env.NODE_ENV === 'production') {
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
				debug: false,
			},
		};
	}

	// In development, use DATABASE_* variables
	return {
		connection: {
			client: 'postgres',
			connection: {
				host: env('DATABASE_HOST', '127.0.0.1'),
				port: env.int('DATABASE_PORT', 5432),
				database: env('DATABASE_NAME', 'strapi'),
				user: env('DATABASE_USERNAME', 'postgres'),
				password: env('DATABASE_PASSWORD', ''),
				schema: env('DATABASE_SCHEMA', 'public'),
				ssl: env.bool('DATABASE_SSL', false),
			},
			debug: false,
		},
	};
};
