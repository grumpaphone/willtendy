const http = require('http');

// Create a basic health check server
http
	.createServer((_, res) => {
		res.writeHead(200);
		res.end('OK');
	})
	.listen(8080);

module.exports = ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	url: `https://${env('RAILWAY_PUBLIC_DOMAIN')}`,
	app: {
		keys: env.array('APP_KEYS'),
	},
	webhooks: {
		populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
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
});
