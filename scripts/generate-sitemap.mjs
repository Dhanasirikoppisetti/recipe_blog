import fs from "fs";
import path from "path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const LOCALES = ["en", "es", "fr"];

function urlEntry(loc, changefreq = "weekly", priority = "0.8") {
  return `\n  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function fetchSlugs(locale) {
  if (!STRAPI_URL) return [];

  try {
    const response = await fetch(
      `${STRAPI_URL}/api/recipes?locale=${locale}&fields[0]=slug`,
      { timeout: 5000 }
    );

    if (!response.ok) {
      console.warn(
        `Failed to fetch recipes for locale ${locale}: ${response.status}`
      );
      return [];
    }

    const json = await response.json();
    if (!json?.data || !Array.isArray(json.data)) return [];

    return json.data
      .map((recipe) => recipe?.slug)
      .filter(Boolean);
  } catch (error) {
    console.warn(`Error fetching recipes for locale ${locale}:`, error.message);
    return [];
  }
}

async function generate() {
  const urls = [];

  // Add homepage and recipes listing for all locales
  for (const locale of LOCALES) {
    urls.push(urlEntry(`${SITE_URL}/${locale}`, "daily", "1.0"));
    urls.push(urlEntry(`${SITE_URL}/${locale}/recipes`, "weekly", "0.9"));
  }

  // Try to add individual recipes if CMS is available
  if (STRAPI_URL) {
    for (const locale of LOCALES) {
      const slugs = await fetchSlugs(locale);
      for (const slug of slugs) {
        urls.push(urlEntry(`${SITE_URL}/${locale}/recipes/${slug}`));
      }
    }
  } else {
    console.warn("NEXT_PUBLIC_STRAPI_URL not set; skipping individual recipe pages in sitemap");
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}\n</urlset>`;

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  
  // Ensure public directory exists
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath}`);
}

generate().catch((error) => {
  console.error("Sitemap generation failed:", error);
  process.exit(1);
});
