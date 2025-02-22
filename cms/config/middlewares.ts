export default [
	'strapi::errors',
	{
		name: 'strapi::security',
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					'connect-src': ["'self'", 'http:', 'https:'],
					'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
					'media-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
					upgradeInsecureRequests: null,
				},
			},
			frameguard: false,
		},
	},
	{
		name: 'strapi::cors',
		config: {
			enabled: true,
			origin: [
				'http://localhost:3000',
				'http://localhost:3001',
				'http://127.0.0.1:3000',
				'http://127.0.0.1:3001',
			],
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
			headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
			keepHeaderOnError: true,
		},
	},
	'strapi::poweredBy',
	'strapi::logger',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
];
