module.exports = ({ env }) => {
	const app = {
		keys: env.array('APP_KEYS'),
		middleware: {
			before: [
				async (ctx, next) => {
					if (ctx.path === '/health') {
						console.log('[Health Check Middleware] /health endpoint hit');
						ctx.status = 200;
						ctx.body = 'OK';
						return;
					}
					await next();
				},
			],
		},
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
