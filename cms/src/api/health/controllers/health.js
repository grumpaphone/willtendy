module.exports = {
  async index(ctx) {
    console.log('[Health Controller] /health endpoint hit');
    ctx.send({
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  }
}; 