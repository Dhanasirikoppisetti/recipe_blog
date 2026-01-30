# Docker Setup Guide (Recipe Blog + Strapi)

## Quick Start (Both Services)

### 1. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your Strapi CMS credentials:
```env
CMS_PROVIDER=strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Ensure Strapi app exists
Docker Compose expects a Strapi project in a sibling folder named `strapi-app` (same parent as `recipe-blog`).

Example structure:
```
your-parent-folder/
	recipe-blog/
	strapi-app/
```

If you already have a Strapi project, place it in `strapi-app`.

### 3. Add a Dockerfile to the Strapi project
Create `strapi-app/Dockerfile` with the following:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
```

Optional: add `strapi-app/.dockerignore` to reduce build context size:

```ignore
node_modules
build
.cache
.git
.env
.env.*
tmp
logs
```

### 4. Build and run with Docker Compose
```bash
docker-compose up --build -d
```

### 5. Verify the apps are running
- **Recipe Blog**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin
- Check container health: `docker-compose ps`
- View logs: `docker-compose logs -f app` or `docker-compose logs -f strapi`

## Useful Commands

### Stop the containers
```bash
docker-compose down
```

### Remove everything (including volumes)
```bash
docker-compose down -v
```

### Rebuild the image
```bash
docker-compose build --no-cache
```

### Access container shell
```bash
docker-compose exec app sh
```

### Access Strapi container shell
```bash
docker-compose exec strapi sh
```

### View container logs
```bash
docker-compose logs -f app
```

## Production Deployment

For production:
1. Set `NODE_ENV=production` in your environment
2. Use a reverse proxy (nginx) in front of the containers
3. Set proper `NEXT_PUBLIC_SITE_URL` for your domain
4. Use a managed database for Strapi (Postgres/MySQL) instead of SQLite
5. Use a managed CMS service (Strapi Cloud, Sanity, Contentful) if preferred

## Docker Image Details

- **Base Image**: node:20-alpine (lightweight)
- **Multi-stage Build**: Reduces final image size by ~60%
- **Health Check**: Verifies app is running via `/api/health`
- **Logging**: JSON format with size limits for log rotation
