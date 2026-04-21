import { MetadataRoute } from "next";

const baseUrl = "https://quotapp.nl";

const toolRoutes = [
  "/tools/afschrijving",
  "/tools/aftrekposten",
  "/tools/alimentatie",
  "/tools/annuiteitenhypotheek",
  "/tools/auto-lening",
  "/tools/bmi",
  "/tools/btw",
  "/tools/buffer-calculator",
  "/tools/datum",
  "/tools/deprecitatie-calculator",
  "/tools/efficiëntie-hypotheek",
  "/tools/energie-vergelijking",
  "/tools/energiekosten",
  "/tools/extra-aflossing",
  "/tools/huur-vs-koop",
  "/tools/hypotheek",
  "/tools/hypotheek-maandlasten",
  "/tools/hypotheek-oversluiten",
  "/tools/hypotheek-vergelijker",
  "/tools/iban",
  "/tools/inflatie-calculator",
  "/tools/jkp-berekening",
  "/tools/kosten-kind-calculator",
  "/tools/krediet",
  "/tools/lening",
  "/tools/lineaire-hypotheek",
  "/tools/maximale-huurprijs",
  "/tools/netto-bruto",
  "/tools/omzetbelasting",
  "/tools/pensioen",
  "/tools/pensioen-berekening",
  "/tools/persoonlijke-financiën",
  "/tools/procent",
  "/tools/rente",
  "/tools/salaris-netto",
  "/tools/spaardoel-calculator",
  "/tools/spaarrekening",
  "/tools/spaarrente-vergelijker",
  "/tools/sparen",
  "/tools/tekst",
  "/tools/valuta",
  "/tools/verlof",
  "/tools/verzekeringen-vergelijken",
  "/tools/vuistregel-hypotheek",
  "/tools/zorgplicht-calculator",
] as const;

const blogRoutes = [
  "btw-berekenen-2025-complete-gids",
  "hypotheek-berekenen-starters-2025",
  "procenten-berekenen-complete-gids",
  "iban-nummer-controleren",
  "maximale-hypotheek-2025",
  "hypotheek-berekenen-2026",
  "lening-berekenen-2026-complete-gids",
  "sparen-rente-op-rente-2026",
] as const;

const toolPriorityMap: Record<string, number> = {
  "/tools/hypotheek": 1,
  "/tools/btw": 1,
  "/tools/lening": 0.95,
  "/tools/sparen": 0.95,
  "/tools/rente": 0.9,
  "/tools/aftrekposten": 0.9,
  "/tools/auto-lening": 0.9,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...toolRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: path === "/tools/valuta" ? "daily" : "monthly" as const,
      priority: toolPriorityMap[path] ?? 0.8,
    })),
    ...blogRoutes.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: slug.includes("2026") ? 0.85 : 0.75,
    })),
  ];
}
