const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchAPI(path, options = {}) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
  }

  const url = new URL(path, API_URL);

  if (options.locale) {
    url.searchParams.set("locale", options.locale);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();
    console.error("Strapi error:", text);
    throw new Error(`Strapi API error ${res.status}`);
  }

  return res.json();
}