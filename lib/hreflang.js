export const LOCALES = ["en", "es", "fr"];

export function getHreflangLinks({ path }) {
  const SITE_URL = "http://localhost:3000";

  return LOCALES.map((locale) => ({
    locale,
    href: `${SITE_URL}/${locale}${path}`,
  }));
}
