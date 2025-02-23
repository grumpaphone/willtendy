module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  url: env('STRAPI_ADMIN_BACKEND_URL', 'https://willtendy-production.up.railway.app'),
  autoOpen: false,
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
}); 