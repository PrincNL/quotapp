import { MetadataRoute } from "next";

const baseUrl = "https://quotapp.nl";

const tools = [
  { path: "/tools/hypotheek", priority: 1.0, keywords: "hypotheek berekenen, maximale hypotheek, maandlasten hypotheek" },
  { path: "/tools/lening", priority: 0.9, keywords: "lening berekenen, persoonlijke lening, lening simulatie" },
  { path: "/tools/sparen", priority: 0.9, keywords: "sparen berekenen, spaarrente, rente op rente" },
  { path: "/tools/rente", priority: 0.9, keywords: "rente berekenen, rentevoet, kredietrente" },
  { path: "/tools/btw", priority: 0.9, keywords: "btw berekenen, btw 21 procent, btw 9 procent" },
  { path: "/tools/procent", priority: 0.8, keywords: "procent berekenen, percentage calculator" },
  { path: "/tools/iban", priority: 0.8, keywords: "iban check, iban validator, iban nummer" },
  { path: "/tools/valuta", priority: 0.7, keywords: "valuta omrekenen, euro dollar, wisselkoers" },
  { path: "/tools/datum", priority: 0.7, keywords: "datum berekenen, dagen tellen, werkdagen" },
  { path: "/tools/tekst", priority: 0.7, keywords: "woorden tellen, karakters tellen, leestijd" },
  { path: "/tools/bmi", priority: 0.7, keywords: "bmi berekenen, body mass index" },
];

const blogPosts = [
  { slug: "hypotheek-berekenen-2026", priority: 0.9, title: "Hypotheek Berekenen 2026" },
  { slug: "lening-berekenen-2026-complete-gids", priority: 0.8, title: "Lening Berekenen 2026" },
  { slug: "sparen-rente-op-rente-2026", priority: 0.8, title: "Sparen en Rente-op-Rente 2026" },
  { slug: "btw-berekenen-2025-complete-gids", priority: 0.8, title: "BTW Berekenen 2025" },
  { slug: "hypotheek-berekenen-starters-2025", priority: 0.8, title: "Hypotheek voor Starters" },
  { slug: "procenten-berekenen-complete-gids", priority: 0.7, title: "Procenten Berekenen" },
  { slug: "iban-nummer-controleren", priority: 0.7, title: "IBAN Nummer Controleren" },
  { slug: "maximale-hypotheek-2025", priority: 0.7, title: "Maximale Hypotheek 2025" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
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
