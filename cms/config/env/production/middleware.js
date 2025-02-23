module.exports = ({ env }) => ({
	settings: {
		cors: {
			enabled: true,
			origin: [
				'https://willtendy-production.up.railway.app',
				'https://grumpaphone.github.io',
				'http://localhost:3000',
				'https://localhost:3000'
			],
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
			headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
			keepHeaderOnError: true,
		},
		logger: {
			level: 'debug',
			requests: true,
		},
		parser: {
			enabled: true,
			multipart: true,
			formLimit: '256mb',
			jsonLimit: '256mb',
			textLimit: '256mb',
		},
		gzip: {
			enabled: true,
		},
		security: {
			csrf: {
				enabled: true,
				key: '_csrf',
				secret: '_csrfSecret',
			},
			xframe: {
				enabled: false,
			},
			xss: {
				enabled: true,
			},
			hsts: {
				enabled: true,
				maxAge: 31536000,
				includeSubDomains: true,
			},
		},
	},
});
