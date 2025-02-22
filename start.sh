#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Kill existing processes
pkill -f "node" || true
pkill -f "next" || true
pkill -f "strapi" || true

# Use Node.js 18
nvm use 18

# Start both applications
concurrently \
  "cd cms && NODE_VERSION=18 npm run develop" \
  "cd frontend && NODE_VERSION=18 npm run dev" 