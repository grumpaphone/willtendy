module.exports = ({ env }) => {
	const app = {
		keys: env.array('APP_KEYS'),
		middleware: {
			before: [
				async (ctx, next) => {
					if (ctx.path === '/') {
						console.log('[Health Check] Root path accessed');
						ctx.status = 200;
						ctx.body = 'OK';
						return;
					}
					await next();
				},
			],
		},
	};

	return {
		host: env('HOST', '0.0.0.0'),
		port: env.int('PORT', 1337),
		app,
		webhooks: {
			populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
		},
	};
};
