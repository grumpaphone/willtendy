module.exports = ({ env }) => ({
	settings: {
		cors: {
			enabled: true,
			origin: env.array('CORS_ORIGIN', [
				'https://*.railway.app',
				'http://localhost:3000',
			]),
			credentials: true,
		},
	},
});
