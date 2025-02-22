const http = require('http');

// Create a basic health check server
const healthServer = http.createServer((req, res) => {
	if (req.url === '/health') {
		res.writeHead(200);
		res.end('OK');
	} else {
		res.writeHead(404);
		res.end();
	}
});

module.exports = ({ env }) => {
	// Start health check server on a different port
	const healthPort = env.int('HEALTH_PORT', 8080);
	healthServer.listen(healthPort);

	return {
		host: env('HOST', '0.0.0.0'),
		port: env.int('PORT', 1337),
		url: env('RAILWAY_STATIC_URL', 'https://willtendy-production.up.railway.app'),
		proxy: true,
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
	};
};
