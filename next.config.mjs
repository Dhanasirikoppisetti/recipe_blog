// next.config.mjs
import i18nConfig from "./next-i18next.config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  images: {
    domains: ["localhost", "host.docker.internal", "strapi"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "strapi",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
