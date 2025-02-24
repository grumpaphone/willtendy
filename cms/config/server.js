module.exports = ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	url: env('STRAPI_ADMIN_BACKEND_URL'),
	app: {
		keys: env.array('APP_KEYS'),
	},
	admin: {
		auth: {
			secret: env('ADMIN_JWT_SECRET'),
		},
	},
});
