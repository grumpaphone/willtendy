module.exports = (config, { strapi }) => {
	return async (ctx, next) => {
		if (ctx.path === '/health') {
			console.log('[Health Check] Received health check request');
			try {
				// Check database connection
				console.log('[Health Check] Testing database connection...');
				await strapi.db.connection.raw('SELECT 1');

				// Check server status
				console.log('[Health Check] Checking server status...');
				const serverInfo = {
					timestamp: new Date().toISOString(),
					uptime: process.uptime(),
					environment: process.env.NODE_ENV,
					port: process.env.PORT,
					host: process.env.HOST,
				};

				console.log(
					'[Health Check] All checks passed, returning healthy status'
				);
				ctx.status = 200;
				ctx.body = {
					status: 'healthy',
					...serverInfo,
					database: 'connected',
				};
			} catch (error) {
				console.error('[Health Check] Failed:', error);
				ctx.status = 503;
				ctx.body = {
					status: 'unhealthy',
					timestamp: new Date().toISOString(),
					error: error.message,
				};
			}
			return;
		}
		await next();
	};
};
