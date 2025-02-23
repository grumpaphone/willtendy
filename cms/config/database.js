const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	// Check if we have a DATABASE_URL
	const databaseUrl = env('DATABASE_URL');

	if (databaseUrl) {
		return {
			connection: {
				client: 'postgres',
				connection: databaseUrl,
				debug: false,
			},
		};
	}

	// Fallback to individual parameters for development
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
