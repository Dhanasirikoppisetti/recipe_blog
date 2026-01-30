# Internationalized Recipe Blog with Next.js and Strapi CMS

A modern, multi-language recipe blog built with Next.js, Strapi headless CMS, and Tailwind CSS. Features static site generation (SSG), internationalization (i18n), and Docker containerization.

## Quick Start with Docker

The easiest way to run the entire application (both Next.js frontend and Strapi CMS):

```bash
# From the recipe-blog directory
docker-compose up --build
```

This will:
- Build and start Strapi CMS on http://localhost:1337
- Build and start Next.js app on http://localhost:3000
- Set up all required networking and volumes

**Important**: Make sure both `recipe-blog` and `strapi-app` folders are in the same parent directory.

### Accessing the Application

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

## Project Overview

This project demonstrates modern web development best practices for content-driven websites:

- **Next.js 14** for performance and SEO
- **Strapi 5** headless CMS for content management
- **Internationalization (i18n)** supporting English, Spanish, and French
- **Static Site Generation (SSG)** and ISR for fast page loads
- **Docker containerization** for easy deployment
- **Tailwind CSS** for responsive styling

## Features

### Core Features

1. **Multi-Language Support** (en, es, fr)
   - Automatic language detection based on URL
   - Language switcher component on all pages
   - Localized content from CMS
   - Translation files for UI strings

2. **Recipe Management**
   - Featured recipes on homepage (SSG)
   - Full recipe listing with client-side search and filtering
   - Individual recipe detail pages with SSG
   - Rich text content (ingredients, instructions)
   - Recipe metadata (cuisine, difficulty, cooking time)

3. **SEO Optimization**
   - Dynamic sitemap.xml generation for all locales
   - robots.txt configuration
   - Next.js Image component for optimized images
   - Proper HTML lang attributes

4. **User Features**
   - Language switcher component
   - Newsletter subscription form with validation
   - Social sharing buttons (Twitter/X)
   - Print-friendly recipe pages
   - Search and category filtering

5. **Performance**
   - Static Site Generation (SSG) for recipe pages
   - Image optimization with Next.js Image component
   - CSS-in-JS with Tailwind CSS
   - Efficient data fetching

## Technology Stack

- **Frontend**: React 18, Next.js 14
- **CMS**: Strapi
- **Styling**: Tailwind CSS 4, PostCSS
- **Internationalization**: next-i18next
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Containerization**: Docker, Docker Compose
- **Development**: ESLint, Node.js 20

## Setup Instructions

### Prerequisites

- Node.js 20+
- Docker and Docker Compose (for containerization)
- A Strapi instance running (local or remote)

### Local Development Setup

1. **Clone the repository**
   `ash
   git clone <repository-url>
   cd recipe-blog
   `

2. **Install dependencies**
   `ash
   npm install
   `

3. **Configure environment variables**
   `ash
   cp .env.example .env.local
   `
   
   Edit .env.local with your Strapi configuration:
   `env
   CMS_PROVIDER=strapi
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   `

4. **Start the development server**
   `ash
   npm run dev
   `
   
   The application will be available at http://localhost:3000

### Docker Setup

1. **Build and start containers**
   `ash
   docker-compose up --build
   `

2. **Access the application**
   - Open http://localhost:3000 in your browser
   - The application will be accessible after the health check passes

3. **Stop containers**
   `ash
   docker-compose down
   `

## Configuration

### Environment Variables

Create a .env.local file with the following variables:

`env
CMS_PROVIDER=strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`

### Internationalization (i18n)

The application supports three languages:
- **English** (en) - Default locale
- **Spanish** (es)
- **French** (fr)

Configuration is in 
ext-i18next.config.js.

### Strapi CMS Configuration

This project expects the following Strapi content types:

**Recipe Content Type:**
- 	itle (String, Localized)
- slug (String, Unique)
- description (Rich Text, Localized)
- ingredients (Rich Text, Localized)
- instructions (Rich Text, Localized)
- eaturedImage (Media)
- cusine (String) - Category/cuisine type
- difficulty (String) - Easy, Medium, Hard
- cookingTime (Number) - in minutes
- isFeatured (Boolean) - Show on homepage
- 	ags (JSON or Array)

## API Endpoints

### Generated Endpoints

- **GET /** - Homepage with featured recipes (SSG)
- **GET /recipes** - All recipes with search/filter
- **GET /recipes/[slug]** - Individual recipe detail page (SSG)
- **GET /sitemap.xml** - XML sitemap for all locales
- **GET /robots.txt** - Robots file
- **GET /api/health** - Health check endpoint

## Features in Detail

### Static Site Generation (SSG)

The following pages are statically generated at build time:

- Homepage (\/\) - Generated for all locales
- Recipe detail pages (\/recipes/[slug]\) - Generated for each recipe and locale

### Client-Side Search and Filtering

The recipes listing page (\/recipes\) supports:

- **Text search** - Search recipes by title in real-time
- **Category filtering** - Filter by cuisine/category

### Localization

All content is localized based on the URL locale:
- \/en/\ - English content
- \/es/\ - Spanish content
- \/fr/\ - French content

### Print-Friendly Recipes

Recipe detail pages include CSS media queries to hide non-essential elements when printing:
- Navigation hidden
- Footer hidden
- Comments section hidden

## Development

### Building the Project

\\\ash
npm run dev       # Development
npm run build     # Production build
npm start         # Production server
npm run lint      # Linting
\\\

## Testing

The application includes data-testid attributes for testing:

- \data-testid="featured-recipes"\ - Featured recipes container
- \data-testid="recipe-card"\ - Individual recipe card
- \data-testid="recipe-title"\ - Recipe title heading
- \data-testid="recipe-ingredients"\ - Ingredients list
- \data-testid="recipe-instructions"\ - Instructions list
- \data-testid="search-input"\ - Search input field
- \data-testid="category-filter"\ - Category filter select
- \data-testid="newsletter-form"\ - Newsletter form
- \data-testid="newsletter-email"\ - Newsletter email input
- \data-testid="newsletter-submit"\ - Newsletter submit button
- \data-testid="newsletter-success"\ - Success message
- \data-testid="newsletter-error"\ - Error message
- \data-testid="language-switcher"\ - Language switcher component
- \data-testid="social-share-twitter"\ - Twitter share button
- \data-testid="comments-list"\ - Comments section

## Deployment

### Docker Deployment

\\\ash
docker-compose up --build -d
\\\

The Docker configuration includes:
- Node.js 20 Alpine base image
- Health check endpoint
- Environment file support
- Port 3000 mapping

## Troubleshooting

### Build Issues

**Error: NEXT_PUBLIC_STRAPI_URL is not defined**
- Ensure \.env.local\ exists with \NEXT_PUBLIC_STRAPI_URL\ set
- Restart the development server

### CMS Connection Issues

**Cannot connect to Strapi**
- Verify Strapi is running at the configured URL
- Check network connectivity

## Security

- No sensitive data in translation files
- \.env.local\ excluded from version control
- Use HTTPS in production
- Validate all user inputs

## License

[Add your license here]

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [next-i18next Guide](https://next-i18next.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
