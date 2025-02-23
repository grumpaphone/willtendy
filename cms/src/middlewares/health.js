module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path === config.path) {
      try {
        // Check database connection
        await strapi.db.connection.raw('SELECT 1');
        
        ctx.status = 200;
        ctx.body = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          database: 'connected',
          uptime: process.uptime()
        };
      } catch (error) {
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
  };
}; 