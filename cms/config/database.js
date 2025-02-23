const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('=== Database Configuration Debug ===');
	console.log('Loading DEVELOPMENT database configuration');
	console.log('NODE_ENV:', process.env.NODE_ENV);

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
				ssl: false,
			},
			debug: false,
		},
	};
};
