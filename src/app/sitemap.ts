import { MetadataRoute } from "next";

const baseUrl = "https://quotapp.nl";

const tools = [
  { path: "/tools/btw", priority: 0.9 },
  { path: "/tools/hypotheek", priority: 0.9 },
  { path: "/tools/procent", priority: 0.8 },
  { path: "/tools/iban", priority: 0.8 },
  { path: "/tools/tekst", priority: 0.7 },
  { path: "/tools/valuta", priority: 0.7 },
  { path: "/tools/datum", priority: 0.7 },
  { path: "/tools/bmi", priority: 0.7 },
];

const blogPosts = [
  { slug: "btw-berekenen-2025-complete-gids", priority: 0.8 },
  { slug: "hypotheek-berekenen-starters-2025", priority: 0.8 },
  { slug: "procenten-berekenen-complete-gids", priority: 0.7 },
  { slug: "iban-nummer-controleren", priority: 0.7 },
  { slug: "maximale-hypotheek-2025", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: tool.priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: post.priority,
    })),
  ];

  return routes;
}
