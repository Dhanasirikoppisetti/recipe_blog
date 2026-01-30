# Recipe Blog - Project Submission Summary

## Project Overview

A fully functional, multi-language recipe blog built with Next.js 14.2.35, Strapi 5 CMS, and complete internationalization (i18n) support for English, Spanish, and French. The application is production-ready, containerized with Docker, and optimized for performance using Static Site Generation (SSG) and Incremental Static Regeneration (ISR).

## Repository

**GitHub:** https://github.com/Dhanasirikoppisetti/recipe_blog

## Key Features Implemented

### 1. **Internationalization (i18n)**
- Full support for 3 languages: English (en), Spanish (es), French (fr)
- Automatic locale-based routing with next-i18next
- 20+ translation keys for UI elements, forms, and navigation
- Language switcher component with dropdown menu and flag emojis
- Localized content from Strapi CMS API

### 2. **Static Site Generation (SSG)**
- Homepage (`/`) - Featured and all recipes with SSG + ISR (60s revalidation)
- Recipe detail pages (`/recipes/[slug]`) - Generated for all locale variants
- Automatic path generation with `getStaticPaths` for all recipe slugs
- Fallback to blocking for new recipes
- Optimal performance with fast page loads

### 3. **Content Management**
- Strapi 5 CMS integration via REST API
- Image optimization with Next.js Image component
- Dynamic recipe content fetching with locale support
- Proper error handling and fallbacks

### 4. **User Experience**
- **Search & Filter:** Client-side search by recipe title and category filtering
- **Newsletter Form:** Email validation with success/error states
- **Social Sharing:** Twitter sharing with pre-filled recipe info
- **Responsive Design:** Tailwind CSS with mobile-first approach
- **Dark Theme:** Modern dark UI with gradient accents

### 5. **SEO & Performance**
- XML sitemap generation for all locales at `/sitemap.xml`
- Sitemap includes homepage, recipes listing, and all recipe pages
- HTML lang attribute for correct locale declaration
- Proper hreflang links for language alternates
- Image optimization with srcset and responsive loading
- Print-friendly CSS for recipe printing

### 6. **Docker Containerization**
- Multi-stage Dockerfile for optimized builds
- docker-compose.yml orchestrating Next.js and Strapi services
- Health checks for both app and CMS services
- Inter-service networking for seamless communication
- Production-ready configuration with environment variables

### 7. **Code Quality**
- Proper data-testid attributes for testing
- Clean component structure and reusable components
- Error boundaries and graceful error handling
- TypeScript-compatible JSConfig configuration
- ESLint configuration for code consistency

## Project Structure

```
recipe-blog/
├── components/               # Reusable React components
│   ├── LanguageSwitcher.js   # Language selection dropdown
│   ├── NewsletterForm.js     # Email subscription form
│   └── SocialShare.js        # Social sharing buttons
├── pages/                    # Next.js pages and routes
│   ├── _app.js              # App layout and provider setup
│   ├── _document.js         # HTML document with locale meta
│   ├── index.js             # Homepage with featured recipes
│   ├── sitemap.xml.js       # Sitemap generation endpoint
│   ├── api/
│   │   ├── health.js        # Health check endpoint
│   │   └── hello.js         # Sample API route
│   └── recipes/
│       ├── index.js         # Redirect to homepage
│       └── [slug].js        # Dynamic recipe detail page
├── public/                   # Static assets
│   └── locales/             # i18n translation files
│       ├── en/common.json
│       ├── es/common.json
│       └── fr/common.json
├── lib/                      # Utility functions
│   ├── recipes.js           # Recipe API utilities
│   ├── strapi.js            # Strapi base fetch function
│   └── hreflang.js          # hreflang link generation
├── scripts/                  # Build-time scripts
│   └── generate-sitemap.mjs  # Sitemap generation script
├── styles/                   # Global styles
│   └── globals.css          # Tailwind CSS + custom styles
├── Dockerfile               # Production-ready container image
├── docker-compose.yml       # Multi-service orchestration
├── .env.example             # Environment variables template
├── next.config.mjs          # Next.js configuration
├── next-i18next.config.js   # i18n configuration
├── jsconfig.json            # JavaScript path aliases
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── REQUIREMENTS_VERIFICATION.md  # Complete requirements checklist
├── DOCKER.md                # Docker setup guide
├── DEPLOYMENT.md            # Deployment options guide
└── README.md                # Project documentation
```

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Run with Docker

```bash
# Clone the repository
git clone https://github.com/Dhanasirikoppisetti/recipe_blog.git
cd recipe-blog

# Build and start services
docker-compose up -d

# Wait for services to be healthy (~90 seconds)
# Access application at http://localhost:3000
# Strapi admin at http://localhost:1337/admin
```

### Run Locally

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your Strapi URL and site URL

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# This automatically runs sitemap generation via postbuild script
# Generates: public/sitemap.xml

# Start production server
npm start
```

## API Integration

### Strapi CMS Configuration

The application expects the following content structure in Strapi:

**Recipe Model:**
- `title` - Recipe name (localized text)
- `slug` - URL-safe identifier (unique text)
- `description` - Recipe overview (localized rich text)
- `ingredients` - Ingredient list (localized rich text/JSON)
- `instructions` - Step-by-step directions (localized rich text)
- `featuredImage` - Featured image (media)
- `cuisine` - Food category (text)
- `difficulty` - Difficulty level (text: Easy, Medium, Hard)
- `cookingTime` - Preparation time in minutes (number)
- `isFeatured` - Display on homepage (boolean)

### API Endpoints Used

- `GET /api/recipes?locale={locale}` - List all recipes
- `GET /api/recipes?filters[slug][$eq]={slug}&locale={locale}` - Get single recipe
- `GET /api/upload/files` - Fetch media assets

## Core Requirements Compliance

✅ **All 13 core requirements fully implemented:**

1. ✅ Docker containerization with health checks
2. ✅ .env.example with all required variables
3. ✅ i18n configuration (en, es, fr)
4. ✅ Homepage with featured recipes (SSG)
5. ✅ Dynamic recipe pages (getStaticPaths/Props)
6. ✅ Language switcher component
7. ✅ Localized content display
8. ✅ Search and filter functionality
9. ✅ Newsletter subscription form
10. ✅ Next.js Image component optimization
11. ✅ Sitemap generation for all locales
12. ✅ Social sharing buttons (Twitter)
13. ✅ Print-friendly recipe pages

See [REQUIREMENTS_VERIFICATION.md](REQUIREMENTS_VERIFICATION.md) for detailed verification of each requirement.

## Performance Optimizations

- **Static Site Generation (SSG)** - Pre-rendered pages for instant load times
- **Incremental Static Regeneration (ISR)** - 60-second revalidation for fresh content
- **Image Optimization** - Next.js Image component with srcset for responsive loading
- **Code Splitting** - Automatic code splitting per route
- **CSS-in-JS Optimization** - Tailwind CSS with PurgeCSS
- **Multi-stage Docker Build** - Reduced image size and faster startup
- **Client-side Filtering** - Reduces server requests with useMemo optimization

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)
- Deploy frontend with zero configuration
- Automatic deployments from GitHub
- Built-in preview deployments
- See [DEPLOYMENT.md](DEPLOYMENT.md) for setup steps

### Option 2: Docker on Any Cloud
- Use provided docker-compose.yml
- Deploy to AWS ECS, Google Cloud Run, DigitalOcean, etc.
- Self-contained application and CMS

### Option 3: Traditional Hosting
- Build with `npm run build`
- Deploy `out/` directory to any static host
- Connect to external Strapi instance

## Environment Variables

**Development (.env.local):**
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production:**
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
NEXT_PUBLIC_SITE_URL=https://your-recipe-blog.com
```

## Testing Checklist

- [ ] Run `docker-compose up -d` and verify both services start
- [ ] Access http://localhost:3000 - homepage loads with featured recipes
- [ ] Switch languages using the language switcher
- [ ] Search for a recipe using the search input
- [ ] Filter recipes by category using the dropdown
- [ ] Submit newsletter form with valid/invalid emails
- [ ] Visit a recipe page and click Twitter share button
- [ ] Print a recipe page and verify clean print layout
- [ ] Access /sitemap.xml and verify all locales are included
- [ ] Verify images load with proper srcset attributes

## Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.35 | React framework with SSG/SSR |
| React | 18.3.1 | UI library |
| Strapi | 5.x | Headless CMS |
| next-i18next | 15.4.3 | Internationalization |
| Tailwind CSS | 4.x | Utility-first styling |
| Node.js | 20+ | Runtime environment |
| Docker | Latest | Containerization |
| Docker Compose | 3.9 | Multi-service orchestration |

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support & Documentation

- **README.md** - Detailed project documentation
- **DOCKER.md** - Docker setup and management guide
- **DEPLOYMENT.md** - Deployment strategies and instructions
- **REQUIREMENTS_VERIFICATION.md** - Complete requirements checklist

## Author

**Dhana Siri Koppisetti**

## License

MIT License - See LICENSE file for details

---

**Project Status:** ✅ Complete and Ready for Production  
**Last Updated:** January 30, 2026  
**Repository:** https://github.com/Dhanasirikoppisetti/recipe_blog
