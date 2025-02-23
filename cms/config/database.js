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
	});

	return {
		connection: {
			client: 'postgres',
			connection: env('DATABASE_URL'),
			debug: false,
		},
	};
};
