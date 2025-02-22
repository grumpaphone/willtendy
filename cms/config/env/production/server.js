const http = require('http');

// Create a basic health check server
const healthServer = http.createServer((_, res) => {
	res.writeHead(200);
	res.end('OK');
});

healthServer.listen(8080, '0.0.0.0', () => {
	console.log('Health check server listening on port 8080');
});

module.exports = ({ env }) => {
	console.log('Server configuration - NODE_ENV:', process.env.NODE_ENV);
	console.log('Server configuration - PORT:', env.int('PORT', 1337));
	
	return {
		host: '0.0.0.0',
		port: env.int('PORT', 1337),
		url: 'https://willtendy-production.up.railway.app',
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
