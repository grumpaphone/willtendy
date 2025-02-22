module.exports = ({ env }) => {
	const parse = require('pg-connection-string').parse;
	const config = parse(env('DATABASE_URL', ''));

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: env('DATABASE_HOST', config.host),
				port: env.int('DATABASE_PORT', config.port || 5432),
				database: env('DATABASE_NAME', config.database),
				user: env('DATABASE_USERNAME', config.user),
				password: env('DATABASE_PASSWORD', config.password),
				ssl: env.bool('DATABASE_SSL', true) ? {
					rejectUnauthorized: false,
				} : false,
				schema: env('DATABASE_SCHEMA', 'public'),
			},
			debug: false,
		},
	};
};
