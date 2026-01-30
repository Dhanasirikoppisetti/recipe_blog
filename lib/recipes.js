const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const SKIP_CMS_FETCH = process.env.SKIP_CMS_FETCH === "true";

if (!API_URL && !SKIP_CMS_FETCH) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
}

export function getStrapiMedia(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

export async function fetchAPI(path, { locale } = {}) {
  if (!API_URL || SKIP_CMS_FETCH) {
    return { data: [] };
  }

  const url = new URL(path, API_URL);

  if (locale) {
    url.searchParams.set("locale", locale);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();
    console.error("Strapi error:", text);
    throw new Error(`Strapi API error ${res.status}`);
  }

  return res.json();
}

// All recipes (with featured only later if needed)
// lib/recipes.js
export async function getAllRecipes(locale) {
  const data = await fetchAPI("/api/recipes?populate=featuredImage", {
    locale,
  });

  return (data?.data || [])
    .map((item) => {
      const attrs = item?.attributes || item;
      const slug = attrs?.slug || null;
      const title = attrs?.title || null;
      const img =
        attrs?.featuredImage?.data?.attributes ||
        attrs?.featuredImage ||
        null;

      if (!slug || !title) return null;

      return {
        id: item.id,
        slug,
        title,
        featuredImage: img,
        cusine: attrs?.cusine || "", // used as category
        difficulty: attrs?.difficulty || "",
        cookingTime: attrs?.cookingTime ?? null,
        isFeatured: attrs?.isFeatured ?? false,
      };
    })
    .filter(Boolean);
}


// Only featured recipes (if you have isFeatured or similar; adjust field name)
export async function getFeaturedRecipes(locale) {
  const data = await fetchAPI(
    "/api/recipes?populate=featuredImage&filters[isFeatured][$eq]=true",
    { locale }
  );

  return (data?.data || [])
    .map((item) => {
      const attrs = item?.attributes || item;
      const slug = attrs?.slug || null;
      const title = attrs?.title || null;
      const img =
        attrs?.featuredImage?.data?.attributes ||
        attrs?.featuredImage ||
        null;

      if (!slug || !title) return null;

      return {
        id: item.id,
        slug,
        title,
        featuredImage: img,
      };
    })
    .filter(Boolean);
}


// Single recipe by slug
export async function getRecipeBySlug(slug, locale) {
  const data = await fetchAPI(
    `/api/recipes?populate=featuredImage&filters[slug][$eq]=${slug}`,
    { locale }
  );

  const item = data?.data?.[0];
  if (!item) return null;

  const attrs = item?.attributes || item;
  const img =
    attrs?.featuredImage?.data?.attributes ||
    attrs?.featuredImage ||
    null;

  return {
    id: item.id,
    slug: attrs?.slug,
    title: attrs?.title,
    description: attrs?.description || [],
    ingredients: attrs?.ingredients || [],
    instructions: attrs?.instructions || [],
    featuredImage: img,
    cusine: attrs?.cusine || "",
    difficulty: attrs?.difficulty || "",
    cookingTime: attrs?.cookingTime ?? null,
  };
}
