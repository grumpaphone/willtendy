module.exports = {
	routes: [
		{
			method: 'GET',
			path: '/api/health',
			handler: (ctx) => {
				ctx.body = {
					status: 'ok',
					timestamp: new Date().toISOString(),
					port: process.env.PORT || 1337,
				};
			},
			config: {
				auth: false,
				policies: [],
			},
		},
	],
};
