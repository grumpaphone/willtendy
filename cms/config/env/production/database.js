const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
	console.log('Current NODE_ENV:', process.env.NODE_ENV);
	console.log('Current ENV_PATH:', process.env.ENV_PATH);

	let dbUrl = env('DATABASE_URL');

	console.log('Raw DATABASE_URL:', dbUrl);
	console.log('Database SSL enabled:', env('DATABASE_SSL'));

	if (!dbUrl) {
		throw new Error(
			'DATABASE_URL is not set. Please set the DATABASE_URL environment variable.'
		);
	}

	// Normalize the URL if it starts with 'postgresql://'
	if (dbUrl.startsWith('postgresql://')) {
		dbUrl = dbUrl.replace(/^postgresql:\/\//, 'postgres://');
	}

	console.log('Normalized DATABASE_URL:', dbUrl);

	const { host, port, database, user, password } = parse(dbUrl);

	if (!host || !port || !database || !user) {
		throw new Error(
			'Incomplete DATABASE_URL provided. Please verify the DATABASE_URL environment variable.'
		);
	}

	const portNumber = Number(port);

	console.log('Parsed database configuration:', {
		host,
		port: portNumber,
		database,
		user,
		ssl: true,
	});

	return {
		connection: {
			client: 'postgres',
			connection: {
				host,
				port: portNumber,
				database,
				user,
				password,
				ssl: {
					rejectUnauthorized: false,
				},
			},
			debug: true, // Enable debug mode temporarily
		},
	};
};
