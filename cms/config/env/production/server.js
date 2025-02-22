module.exports = ({ env }) => ({
	url: env('RAILWAY_STATIC_URL'),
	proxy: true,
	app: {
		keys: env.array('APP_KEYS'),
	},
});
