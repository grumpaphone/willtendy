module.exports = ({ env }) => ({
	settings: {
		cors: {
			enabled: true,
			origin: env.array('CORS_ORIGIN', [
				'https://*.railway.app',
				'http://localhost:3000',
				'https://localhost:3000',
				'https://grumpaphone.github.io',
			]),
			credentials: true,
		},
	},
});
