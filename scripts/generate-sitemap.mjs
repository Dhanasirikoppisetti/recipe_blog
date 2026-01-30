import fs from "fs";

const SITE_URL = "http://localhost:3000";
const STRAPI_URL = "http://localhost:1337";

const locales = ["en", "es", "fr"];

async function fetchRecipes(locale) {
  const res = await fetch(
    `${STRAPI_URL}/api/recipes?locale=${locale}&pagination[pageSize]=100`
  );
  const json = await res.json();
  return json.data || [];
}

(async () => {
  let urls = [];

  // Static pages
  locales.forEach((locale) => {
    urls.push(`${SITE_URL}/${locale}`);
    urls.push(`${SITE_URL}/${locale}/recipes`);
  });

  // Dynamic recipe pages
  for (const locale of locales) {
    const recipes = await fetchRecipes(locale);

    recipes.forEach((recipe) => {
      const slug = recipe.slug; // 🔥 USE AS-IS
      if (!slug) return;

      urls.push(
        `${SITE_URL}/${locale}/recipes/${encodeURIComponent(slug)}`
      );
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log("✅ Sitemap generated successfully");
})();
