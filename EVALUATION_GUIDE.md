# Quick Reference - Project Testing & Evaluation

## Start the Application

```bash
cd c:\Users\dhana\recipe-blog
docker-compose up -d
```

Wait 90 seconds for Strapi to initialize, then open **http://localhost:3000**

## What to Test

### 1. Homepage (Requirement 4)
- ✅ Visit `http://localhost:3000` 
- ✅ Should see "Featured Recipes" section
- ✅ Featured recipes have `data-testid="recipe-card"`
- ✅ Featured recipes container has `data-testid="featured-recipes"`
- ✅ Below that: "All Recipes" section with search/filter

### 2. Language Switching (Requirement 6)
- ✅ Click language switcher (top right)
- ✅ Select "Español" (Spanish)
- ✅ URL changes to `/es/recipes`
- ✅ All text translates to Spanish
- ✅ Click English flag, URL becomes `/en/recipes`
- ✅ HTML lang attribute updates: `<html lang="en">` or `<html lang="es">`

### 3. Search & Filter (Requirement 8)
- ✅ Type a recipe name in search input (`data-testid="search-input"`)
- ✅ Recipe list filters in real-time
- ✅ Select a category from dropdown (`data-testid="category-filter"`)
- ✅ Only recipes in that category display
- ✅ Combine search + filter together

### 4. Recipe Detail Page (Requirement 5)
- ✅ Click any recipe card
- ✅ URL: `/en/recipes/recipe-slug`
- ✅ Page shows:
  - Title with `data-testid="recipe-title"`
  - Featured image (Next.js Image component with srcset)
  - Cuisine, Difficulty, Cook Time cards
  - Ingredients section with `data-testid="recipe-ingredients"`
  - Instructions section with `data-testid="recipe-instructions"`
  - Social sharing button (Twitter)
- ✅ All text translated based on locale

### 5. Social Sharing (Requirement 12)
- ✅ On recipe page, find Twitter button
- ✅ Button has `data-testid="social-share-twitter"`
- ✅ Click it - should open Twitter compose with:
  - Recipe URL in tweet
  - Recipe title in tweet text
  - Pre-filled sharing info

### 6. Newsletter Form (Requirement 9)
- ✅ Scroll to footer
- ✅ Find newsletter form with `data-testid="newsletter-form"`
- ✅ Email input has `data-testid="newsletter-email"`
- ✅ Submit button has `data-testid="newsletter-submit"`
- ✅ Enter invalid email (e.g., "test") and submit
  - Should show error: `data-testid="newsletter-error"`
- ✅ Clear and enter valid email (e.g., "test@example.com")
  - Form hides and shows success message: `data-testid="newsletter-success"`
  - Message: "Thanks for subscribing!" (or translated equivalent)

### 7. Print-Friendly Pages (Requirement 13)
- ✅ On any recipe page, press Ctrl+P (or Cmd+P)
- ✅ Print preview shows:
  - Recipe title, image, ingredients, instructions
  - White background (not dark)
  - Black text (not light)
  - NO header or footer
  - NO language switcher
  - NO navigation
  - NO social buttons
  - Clean, printable layout

### 8. Images & Performance (Requirement 10)
- ✅ Inspect recipe image (right-click → Inspect)
- ✅ `<img>` tag should have `srcset` attribute
- ✅ Should NOT have `data-nimg="intrinsic"` or `data-nimg="responsive"`
- ✅ Images load fast and resize responsively

### 9. Sitemap Generation (Requirement 11)
- ✅ Visit `http://localhost:3000/sitemap.xml`
- ✅ Should download/display XML
- ✅ Contains URLs like:
  ```xml
  <url>
    <loc>http://localhost:3000/en</loc>
  </url>
  <url>
    <loc>http://localhost:3000/es</loc>
  </url>
  <url>
    <loc>http://localhost:3000/fr</loc>
  </url>
  <url>
    <loc>http://localhost:3000/en/recipes</loc>
  </url>
  <url>
    <loc>http://localhost:3000/en/recipes/beef-stroganoff</loc>
  </url>
  <!-- Similar for es and fr locales -->
  ```

### 10. Localized Content (Requirement 7)
- ✅ Visit `/en/recipes/any-recipe`
- ✅ Note recipe title and content
- ✅ Switch to `/es/recipes/any-recipe`
- ✅ Recipe title should be in Spanish (if CMS has Spanish content)
- ✅ All UI labels translate (Ingredients → Ingredientes, etc.)

### 11. Docker Health (Requirement 1)
```bash
# Check container status
docker-compose ps

# Should show:
# recipe-blog    ... Up ... (healthy)
# recipe-strapi  ... Up ... (healthy)

# Test health endpoint
curl http://localhost:3000/api/health
# Returns: {"status":"ok"}
```

### 12. Environment Variables (Requirement 2)
- ✅ `.env.example` exists in project root
- ✅ Contains: `NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_SITE_URL`
- ✅ No real credentials or secrets
- ✅ Only placeholder values

### 13. i18n Configuration (Requirement 3)
- ✅ `next.config.mjs` has i18n object
- ✅ Default locale: `'en'`
- ✅ Locales: `['en', 'es', 'fr']`
- ✅ Translation files exist:
  - `public/locales/en/common.json`
  - `public/locales/es/common.json`
  - `public/locales/fr/common.json`
- ✅ Each has `search_placeholder` and other UI keys

## File Locations for Verification

| Feature | File | Lines |
|---------|------|-------|
| Featured Recipes | `pages/index.js` | 1-80 |
| Recipe Detail | `pages/recipes/[slug].js` | 1-203 |
| Search/Filter | `pages/index.js` | 45-55 |
| Newsletter Form | `components/NewsletterForm.js` | 1-80 |
| Social Share | `components/SocialShare.js` | 1-25 |
| Language Switcher | `components/LanguageSwitcher.js` | 1-100 |
| Print Styles | `styles/globals.css` | 620-661 |
| i18n Config | `next-i18next.config.js` | 1-20 |
| Sitemap Script | `scripts/generate-sitemap.mjs` | 1-100 |
| Docker Setup | `docker-compose.yml` | 1-80 |
| Health Check | `pages/api/health.js` | 1-5 |

## Expected URLs to Test

```
Homepage:
  http://localhost:3000
  http://localhost:3000/en
  http://localhost:3000/es
  http://localhost:3000/fr

Recipes List:
  http://localhost:3000/recipes (redirects to home)
  http://localhost:3000/en/recipes (redirects to home)

Recipe Detail (examples):
  http://localhost:3000/en/recipes/beef-stroganoff
  http://localhost:3000/es/recipes/beef-stroganoff
  http://localhost:3000/fr/recipes/beef-stroganoff

Sitemap:
  http://localhost:3000/sitemap.xml

Health Check:
  http://localhost:3000/api/health

Strapi Admin:
  http://localhost:1337/admin
```

## Common Issues & Solutions

### Issue: Services don't start
```bash
# Solution: Clean Docker environment
docker-compose down
docker system prune -f
docker-compose up -d
```

### Issue: Strapi shows "failed to connect"
```bash
# Wait 90 seconds - Strapi needs time to initialize
# Check logs with:
docker-compose logs strapi
```

### Issue: Images not loading
```bash
# Ensure Strapi is running and has recipe data
# Check Strapi admin at http://localhost:1337/admin
# Create some recipes with images
```

### Issue: Sitemap is empty
```bash
# Sitemap only generates at build time
# Add recipes to Strapi first, then:
npm run build
# Sitemap will be created at public/sitemap.xml
```

## Browser DevTools Tips

### Inspect Required Elements
```javascript
// In browser console:

// Featured recipes section
document.querySelector('[data-testid="featured-recipes"]')

// Recipe cards
document.querySelectorAll('[data-testid="recipe-card"]')

// Search input
document.querySelector('[data-testid="search-input"]')

// Category filter
document.querySelector('[data-testid="category-filter"]')

// Recipe title
document.querySelector('[data-testid="recipe-title"]')

// Ingredients
document.querySelector('[data-testid="recipe-ingredients"]')

// Instructions
document.querySelector('[data-testid="recipe-instructions"]')

// Language switcher
document.querySelector('[data-testid="language-switcher"]')

// Newsletter form
document.querySelector('[data-testid="newsletter-form"]')

// Twitter share button
document.querySelector('[data-testid="social-share-twitter"]')
```

## Verification Checklist

- [ ] Docker containers start and become healthy
- [ ] Homepage loads with featured recipes section
- [ ] Language switcher changes locale correctly
- [ ] Search input filters recipes by title
- [ ] Category filter works independently and with search
- [ ] Recipe detail page shows all required sections
- [ ] Images have srcset attribute (responsive)
- [ ] Social share button generates correct Twitter URL
- [ ] Newsletter form validates email input
- [ ] Newsletter form shows success message on valid email
- [ ] Recipe page prints cleanly (white bg, no header/footer)
- [ ] Sitemap.xml returns valid XML with all locales
- [ ] All UI text translates when changing languages
- [ ] HTML lang attribute matches selected locale
- [ ] Health check endpoint returns 200 status

## Final Verification Command

```bash
# Run all critical tests
docker-compose ps  # Verify both services healthy
curl -I http://localhost:3000  # Check app responds
curl -I http://localhost:3000/api/health  # Check health
curl http://localhost:3000/sitemap.xml | head -20  # Check sitemap
```

---

**For Complete Documentation:** See [REQUIREMENTS_VERIFICATION.md](REQUIREMENTS_VERIFICATION.md) and [SUBMISSION_SUMMARY.md](SUBMISSION_SUMMARY.md)
