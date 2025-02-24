// Add a simple in-memory cache for health checks
let healthCache = {
	status: null,
	timestamp: 0,
	ttl: 30000 // 30 seconds
};

module.exports = (config, { strapi }) => {
	return async (ctx, next) => {
		if (ctx.path === '/health') {
			// Use cached result if available and fresh
			const now = Date.now();
			if (healthCache.status && (now - healthCache.timestamp < healthCache.ttl)) {
				ctx.status = healthCache.status === 'healthy' ? 200 : 503;
				ctx.body = healthCache.body;
				return;
			}

			try {
				// Check database connection
				if (process.env.NODE_ENV !== 'production') {
					console.log('[Health Check] Testing database connection...');
				}
				await strapi.db.connection.raw('SELECT 1');

				// Server info
				const serverInfo = {
					timestamp: new Date().toISOString(),
					uptime: process.uptime(),
					environment: process.env.NODE_ENV,
				};

				// Update cache
				healthCache = {
					status: 'healthy',
					timestamp: now,
					body: {
						status: 'healthy',
						...serverInfo,
						database: 'connected',
					}
				};

				if (process.env.NODE_ENV !== 'production') {
					console.log('[Health Check] All checks passed, returning healthy status');
				}
				
				ctx.status = 200;
				ctx.body = healthCache.body;
			} catch (error) {
				// Only log in production when health check fails
				if (process.env.NODE_ENV === 'production') {
					console.error('[Health Check] Failed:', error);
				} else {
					console.error('[Health Check] Failed:', error);
				}

				// Update cache with error status
				healthCache = {
					status: 'unhealthy',
					timestamp: now,
					body: {
						status: 'unhealthy',
						timestamp: new Date().toISOString(),
						error: error.message,
					}
				};

				ctx.status = 503;
				ctx.body = healthCache.body;
			}
			return;
		}
		await next();
	};
};
