const http = require('http');

// Create a basic health check server
const healthServer = http.createServer((_, res) => {
	res.writeHead(200);
	res.end('OK');
});

healthServer.listen(8080, '0.0.0.0', () => {
	console.log('Health check server listening on port 8080');
});

module.exports = ({ env }) => ({
	url: env(
		'STRAPI_ADMIN_BACKEND_URL',
		'https://willtendy-production.up.railway.app'
	),
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	app: {
		keys: env.array('APP_KEYS'),
	},
	dirs: {
		public: env('PUBLIC_DIR', './public'),
	},
	webhooks: {
		populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
	},
	admin: {
		auth: {
			secret: env('ADMIN_JWT_SECRET'),
		},
	},
	// Add trusted proxies and hosts for healthcheck
	settings: {
		proxy: {
			enabled: true,
			host: env('HOST', '0.0.0.0'),
			port: env.int('PORT', 1337),
		},
		cors: {
			enabled: true,
			origin: [
				'https://healthcheck.railway.app',
				'https://willtendy-production.up.railway.app',
				'http://localhost:3000',
			],
		},
	},
	proxy: true,
});
