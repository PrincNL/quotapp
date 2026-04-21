import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // Global rules for all crawlers
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/admin/",
          "/auth/",
          "/*.json$",
        ],
        crawlDelay: 1,
      },
      // Specific rules for Googlebot
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/admin/",
          "/auth/",
        ],
      },
      // Specific rules for Bingbot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/admin/",
          "/auth/",
        ],
      },
    ],
    
    // Sitemap locations
    sitemap: [
      "https://quotapp.nl/sitemap.xml",
    ],
    
    // Host directive for crawlers
    host: "https://quotapp.nl",
  };
}
