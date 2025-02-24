const path = require('path');

if (process.env.PGHOST === '::1') {
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
	},
});
