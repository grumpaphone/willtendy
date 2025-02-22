module.exports = ({ env }) => ({
	connection: {
		client: env('DATABASE_CLIENT', 'sqlite'),
		connection: env('DATABASE_CLIENT', 'sqlite') === 'sqlite' 
			? {
				filename: env('DATABASE_FILENAME', '.tmp/data.db'),
			}
			: {
				host: env('DATABASE_HOST'),
				port: env.int('DATABASE_PORT'),
				database: env('DATABASE_NAME'),
				user: env('DATABASE_USERNAME'),
				password: env('DATABASE_PASSWORD'),
				ssl: env.bool('DATABASE_SSL', false),
			},
		useNullAsDefault: true,
	},
});
