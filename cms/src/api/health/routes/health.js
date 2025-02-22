module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/api/health',
      handler: (ctx) => {
        ctx.body = { status: 'ok' };
      },
      config: {
        auth: false,
      },
    },
  ],
}; 