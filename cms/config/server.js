module.exports = ({ env }) => {
	const app = {
		keys: env.array('APP_KEYS'),
	};

	// Add basic health check middleware
	app.middleware = {
		before: [
			async (ctx, next) => {
				console.log(`[Health Check] Request received at path: ${ctx.path}`);
				
				// Match both root and /health paths
				if (ctx.path === '/' || ctx.path === '/health') {
					try {
						// Basic server health check
						console.log('[Health Check] Checking server status...');
						
						// Database health check
						console.log('[Health Check] Testing database connection...');
						await strapi.db.connection.raw('SELECT 1');
						
						console.log('[Health Check] All checks passed');
						ctx.status = 200;
						ctx.body = {
							status: 'healthy',
							timestamp: new Date().toISOString(),
							environment: process.env.NODE_ENV,
							database: 'connected'
						};
					} catch (error) {
						console.error('[Health Check] Error:', error);
						ctx.status = 503;
						ctx.body = {
							status: 'unhealthy',
							timestamp: new Date().toISOString(),
							error: error.message
						};
					}
					return;
				}
				await next();
			}
		]
	};

	const config = {
		host: env('HOST', '0.0.0.0'),
		port: env.int('PORT', 1337),
		app,
		url: env('STRAPI_ADMIN_BACKEND_URL', 'http://localhost:1337'),
		webhooks: {
			populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
		},
		admin: {
			auth: {
				secret: env('ADMIN_JWT_SECRET'),
			},
		},
	};

	// Parse CORS origins from environment variable
	const corsOrigins = env('CORS_ORIGIN', '').split(',').filter(Boolean);
	if (corsOrigins.length > 0) {
		console.log('[Server] Setting CORS origins:', corsOrigins);
		config.cors = {
			origin: corsOrigins,
			credentials: true,
		};
	}

	console.log('[Server] Starting with config:', {
		host: config.host,
		port: config.port,
		env: process.env.NODE_ENV,
		url: config.url,
		cors: config.cors,
	});

	return config;
};
