const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('Current NODE_ENV:', process.env.NODE_ENV);
	console.log('Current ENV_PATH:', process.env.ENV_PATH);
	console.log('All environment variables:', Object.keys(process.env));

	return {
		connection: {
			client: 'postgres',
			connection: {
				host: 'postgres.railway.internal',
				port: 5432,
				database: 'railway',
				user: 'postgres',
				password: 'BbIbbyQYmoGBsFuHpsbXjodevszruGtk',
				ssl: {
					rejectUnauthorized: false,
				},
			},
			debug: true,
			acquireConnectionTimeout: 5000,
		},
	};
};
