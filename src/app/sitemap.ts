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

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: tool.priority,
    })),
  ];

  return routes;
}
