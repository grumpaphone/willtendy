module.exports = ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	url: 'https://willtendy-production.up.railway.app',
	proxy: true,
	app: {
		keys: env.array('APP_KEYS'),
	},
	webhooks: {
		populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
	},
});
