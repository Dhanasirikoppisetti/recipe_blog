# Deployment Guide

## Vercel Deployment (Frontend)

### Prerequisites
- Vercel account (free): https://vercel.com
- GitHub account connected to Vercel
- Strapi backend deployed (see Strapi deployment below)

### Steps

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Import your GitHub repository: `Dhanasirikoppisetti/recipe_blog`

2. **Configure Environment Variables**
   Add these in Vercel project settings:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.com
   NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
   ```

3. **Deploy**
   - Vercel will auto-deploy on every GitHub push
   - First deployment takes ~2-3 minutes

### Strapi Deployment Options

**Option 1: Strapi Cloud (Easiest)**
- Go to https://cloud.strapi.io
- Deploy Strapi project
- Copy the URL and use in Vercel env vars

**Option 2: Railway/Render (Docker)**
- Deploy using docker-compose.yml
- Free tier available
- Use the deployment URL in Vercel

**Option 3: Self-hosted VPS**
- Deploy Strapi on any VPS (DigitalOcean, AWS, etc.)
- Use the public URL in Vercel

## Local Development

```bash
npm install
npm run dev
```

Access at http://localhost:3000

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
