#!/bin/sh
# Wait for Strapi to be ready
sleep 10

# Generate sitemap
node scripts/generate-sitemap.mjs

# Start Next.js
npm run start
