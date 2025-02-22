module.exports = ({ env }) => ({
	settings: {
		cors: {
			enabled: true,
			origin: [
				'https://willtendy-production.up.railway.app',
				'http://localhost:3000',
				'https://localhost:3000',
				'https://grumpaphone.github.io'
			],
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
			headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
			keepHeaderOnError: true,
		},
	},
});
