const path = require('path');

if (process.env.PGHOST === '::1') {
	console.log('[DEBUG] Overriding PGHOST from ::1 to 127.0.0.1');
	process.env.PGHOST = '127.0.0.1';
}

module.exports = ({ env }) => {
	// Debug log all relevant environment variables
	console.log('[DEBUG] Database Environment Variables:', {
		DATABASE_CLIENT: env('DATABASE_CLIENT'),
		DATABASE_URL: env('DATABASE_URL'),
		POSTGRES_USER: process.env.POSTGRES_USER,
		POSTGRES_DB: process.env.POSTGRES_DB,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		PGHOST: process.env.PGHOST,
		PGPORT: process.env.PGPORT,
		NODE_ENV: process.env.NODE_ENV,
	});

	// Ensure we're using postgres client when DATABASE_URL is provided
	const client = env('DATABASE_CLIENT', process.env.DATABASE_URL ? 'postgres' : 'sqlite');

	if (client === 'postgres') {
		console.log('[DEBUG] Using Postgres configuration');
		return {
			defaultConnection: 'default',
			connections: {
				default: {
					connector: 'bookshelf',
					settings: {
						client: 'postgres',
						host: env('DATABASE_HOST', process.env.PGHOST),
						port: env.int('DATABASE_PORT', process.env.PGPORT),
						database: env('DATABASE_NAME', process.env.POSTGRES_DB),
						username: env('DATABASE_USERNAME', process.env.POSTGRES_USER),
						password: env('DATABASE_PASSWORD', process.env.POSTGRES_PASSWORD),
						ssl: env.bool('DATABASE_SSL', true) ? {
							rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false)
						} : false,
						schema: env('DATABASE_SCHEMA', 'public')
					},
					options: {
						pool: {
							min: env.int('DATABASE_POOL_MIN', 2),
							max: env.int('DATABASE_POOL_MAX', 10)
						},
						debug: env.bool('DATABASE_DEBUG', false),
						useNullAsDefault: true
					}
				}
			}
		};
	}

	// Fallback to SQLite for development
	console.log('[DEBUG] Using SQLite configuration');
	return {
		defaultConnection: 'default',
		connections: {
			default: {
				connector: 'bookshelf',
				settings: {
					client: 'sqlite',
					filename: path.join(
						__dirname,
						'..',
						'..',
						env('DATABASE_FILENAME', '.tmp/data.db')
					)
				},
				options: {
					useNullAsDefault: true,
					debug: env.bool('DATABASE_DEBUG', false)
				}
			}
		}
	};
};
