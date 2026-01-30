// pages/sitemap.xml.js

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function fetchAllRecipes() {
  const locales = ["en", "es", "fr"];
  const allRecipes = [];

  for (const locale of locales) {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/recipes?locale=${locale}&pagination[pageSize]=100`
      );
      const json = await res.json();
      const recipes = json.data || [];
      
      recipes.forEach((recipe) => {
        if (recipe.slug) {
          allRecipes.push({
            slug: recipe.slug,
            locale: locale,
          });
        }
      });
    } catch (error) {
      console.warn(`Failed to fetch recipes for locale ${locale}:`, error.message);
    }
  }

  return allRecipes;
}

export async function getServerSideProps({ res }) {
  const locales = ["en", "es", "fr"];
  const recipes = await fetchAllRecipes();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales
  .map((locale) => {
    return `
  <url>
    <loc>${SITE_URL}/${locale}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/${locale}/recipes</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  })
  .join("")}
${recipes
  .map(({ slug, locale }) => {
    return `
  <url>
    <loc>${SITE_URL}/${locale}/recipes/${encodeURIComponent(slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
