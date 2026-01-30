// pages/sitemap.xml.js

import fs from "fs";
import path from "path";

export async function getServerSideProps({ res }) {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemap = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, "utf8")
    : "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"></urlset>";

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
