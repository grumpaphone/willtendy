# Will Tendy Portfolio

This repository contains Will Tendy's portfolio website, featuring a Next.js frontend and a Strapi CMS backend.

## Project Structure

- `frontend/` - Next.js application
- `cms/` - Strapi CMS
- `railway.toml` - Railway deployment configuration

## Development Commands

### Setup

```bash
# Install dependencies for both frontend and backend
npm install
cd frontend && npm install
cd cms && npm install
```

### Running the Application

```bash
# Start both frontend and backend concurrently
npm run dev

# Start only the frontend
npm run frontend

# Start only the backend
npm run backend
```

### Database Management

```bash
# Import videos from CSV files
cd cms && node import-videos.js

# Create an API token for the CMS
cd cms && node create-token.js
```

## Deployment Commands

### Railway Deployment

```bash
# Deploy to Railway
railway up

# View Railway logs
railway logs

# Link to an existing Railway project
railway link

# Add a PostgreSQL database
railway add
```

### Environment Variables

```bash
# Set environment variables for Railway
railway variables set KEY=VALUE

# List all environment variables
railway variables list
```

## Maintenance Commands

```bash
# Build the frontend for production
cd frontend && npm run build

# Build the CMS for production
cd cms && npm run build

# Run linting on the frontend
cd frontend && npm run lint
```

## Health Check

The application includes a health check endpoint at `/health` that verifies:

- Server status
- Database connection

## Troubleshooting

If you encounter issues with the application, try the following:

1. Clear npm cache: `npm cache clean --force`
2. Remove node_modules: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Check environment variables are properly set
5. Verify database connection

## License

MIT
