import { MetadataRoute } from "next";

const baseUrl = "https://quotapp.nl";

// All 38 tools with proper SEO metadata
const tools = [
  // Core financial tools (high priority)
  { 
    path: "/tools/hypotheek", 
    priority: 1.0, 
    changefreq: "weekly",
    keywords: "hypotheek berekenen, maximale hypotheek, maandlasten hypotheek, huis kopen, hypotheekrente 2026"
  },
  { 
    path: "/tools/btw", 
    priority: 1.0, 
    changefreq: "weekly",
    keywords: "btw berekenen, btw 21 procent, btw 9 procent, btw calculator, btw verleggen, omzetbelasting"
  },
  { 
    path: "/tools/procent", 
    priority: 1.0, 
    changefreq: "monthly",
    keywords: "procent berekenen, percentage calculator, korting berekenen, procentuele stijging, percentage van een getal"
  },
  { 
    path: "/tools/lening", 
    priority: 0.95, 
    changefreq: "weekly",
    keywords: "lening berekenen, persoonlijke lening, lening simulatie, lening aanvragen, krediet"
  },
  { 
    path: "/tools/sparen", 
    priority: 0.95, 
    changefreq: "monthly",
    keywords: "sparen berekenen, spaarrente, rente op rente, spaargroei, vermogen opbouwen, spaarcalculator"
  },
  { 
    path: "/tools/rente", 
    priority: 0.9, 
    changefreq: "monthly",
    keywords: "rente berekenen, rentevoet, kredietrente, samengestelde rente, rente op rente, jaarlijks kostenpercentage"
  },
  // Auto & voertuigen
  { 
    path: "/tools/auto-lening", 
    priority: 0.9, 
    changefreq: "weekly",
    keywords: "auto lening, autofinanciering, autokrediet, auto kopen op afbetaling, autoleasing"
  },
  // Woning & hypotheek aanvullend
  { 
    path: "/tools/annuiteitenhypotheek", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "annuïteitenhypotheek, annuïteit berekenen, maandlasten annuïteit, hypotheekvorm"
  },
  { 
    path: "/tools/lineaire-hypotheek", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "lineaire hypotheek, lineair aflossen, maandlasten lineaire hypotheek"
  },
  { 
    path: "/tools/hypotheek-oversluiten", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "hypotheek oversluiten, hypotheek meenemen, oversluitkosten, refinance"
  },
  { 
    path: "/tools/hypotheek-vergelijker", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "hypotheek vergelijken, hypotheekrente vergelijken, beste hypotheek, hypotheekofferte"
  },
  { 
    path: "/tools/huur-vs-koop", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "huur vs kopen, kopen of huren, woning kopen analyse,huis kopen financiering"
  },
  // Sparen & investeren
  { 
    path: "/tools/spaarrekening", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "spaarrekening, spaarrente, spaargeld, beste spaarrente, spaarrekening vergelijken"
  },
  { 
    path: "/tools/spaarrente-vergelijker", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "spaarrente vergelijken, beste spaarrente, spaarrekening vergelijken, hoogste rente"
  },
  { 
    path: "/tools/pensioen", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "pensioen berekenen, pensioenleeftijd, oudedagsvoorziening, pensioenopbouw"
  },
  { 
    path: "/tools/pensioen-berekening", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "pensioen berekenen, pensioeninkomen, pensioengat, oudedagsreserve"
  },
  { 
    path: "/tools/inflatie-calculator", 
    priority: 0.75, 
    changefreq: "monthly",
    keywords: "inflatie calculator, inflatiepercentage, koopkracht, geldwaarde"
  },
  // Belastingen
  { 
    path: "/tools/aftrekposten", 
    priority: 0.9, 
    changefreq: "monthly",
    keywords: "aftrekposten berekenen, belasting aftrekken, inkomstenbelasting, hypotheekrente aftrek, zorgkosten"
  },
  { 
    path: "/tools/omzetbelasting", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "omzetbelasting, btw-aangifte, btw verleggen, intracommunautaire levering"
  },
  // Persoonlijke financiën
  { 
    path: "/tools/alimentatie", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "alimentatie berekenen, partneralimentatie, kinderalimentatie, echtscheiding kosten, alimentatienormen"
  },
  { 
    path: "/tools/verlof", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "verlof berekenen, vakantiedagen, uitbetaald verlof, werkdagen, adv-dagen, verlofuren"
  },
  { 
    path: "/tools/netto-bruto", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "netto bruto berekenen, bruto netto, salaris berekenen, netto salaris, loonstrook"
  },
  { 
    path: "/tools/bruto-netto", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "bruto netto berekenen, bruto naar netto, salaris netto, inkomen na belasting"
  },
  { 
    path: "/tools/salaris-netto", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "salaris netto berekenen, maandsalaris, jaarsalaris, nettoloon, loon berekenen"
  },
  { 
    path: "/tools/krediet", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "krediet berekenen, kredietkosten, jkp, jaarlijks kostenpercentage, kredietsom"
  },
  { 
    path: "/tools/jkp-berekening", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "jkp berekenen, jaarlijks kostenpercentage, kredietvergelijking, effectieve rente"
  },
  { 
    path: "/tools/extra-aflossing", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "extra aflossing hypotheek, aflossing berekenen, boeterente, vervroegd aflossen"
  },
  // Overig financieel
  { 
    path: "/tools/afschrijving", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "afschrijving berekenen, lineaire afschrijving, afschrijvingstabel, activa afschrijven"
  },
  { 
    path: "/tools/deprecitatie-calculator", 
    priority: 0.75, 
    changefreq: "monthly",
    keywords: "depreciatie calculator, waardevermindering, afschrijving auto, restwaarde"
  },
  { 
    path: "/tools/energiekosten", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "energiekosten berekenen, stroomkosten, gaskosten, energieverbruik, energierekening"
  },
  // Huur
  { 
    path: "/tools/maximale-huurprijs", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "maximale huurprijs, huurprijs berekenen, puntentelling huur, huurtoeslag, woningwaarde"
  },
  // Tools zonder category
  { 
    path: "/tools/iban", 
    priority: 0.85, 
    changefreq: "monthly",
    keywords: "iban check, iban validator, iban nummer controleren, bankrekeningnummer, bic code"
  },
  { 
    path: "/tools/valuta", 
    priority: 0.8, 
    changefreq: "daily",
    keywords: "valuta omrekenen, euro dollar, wisselkoers, valuta converter, USD EUR GBP, valutakoers"
  },
  { 
    path: "/tools/datum", 
    priority: 0.75, 
    changefreq: "monthly",
    keywords: "datum berekenen, dagen tellen, werkdagen, datumverschil, leeftijd berekenen, jarige test"
  },
  { 
    path: "/tools/tekst", 
    priority: 0.7, 
    changefreq: "monthly",
    keywords: "woorden tellen, karakters tellen, leestijd, tekst analyse, letter teller, woordenteller"
  },
  { 
    path: "/tools/bmi", 
    priority: 0.8, 
    changefreq: "monthly",
    keywords: "bmi berekenen, body mass index, gezond gewicht, bmi calculator, overgewicht, ideaalgewicht"
  },
];

// All blog posts
const blogPosts = [
  { 
    slug: "hypotheek-berekenen-2026", 
    priority: 0.9, 
    changefreq: "monthly",
    title: "Hypotheek Berekenen 2026: Alles Wat Je Moet Weten over Hypotheken",
    description: "Leer alles over het berekenen van je hypotheek in 2026. Maximale hypotheek, maandlasten, hypotheekrente en tips voor starters."
  },
  { 
    slug: "lening-berekenen-2026-complete-gids", 
    priority: 0.85, 
    changefreq: "monthly",
    title: "Lening Berekenen 2026: Complete Gids voor Persoonlijke Leningen",
    description: "Alles over het berekenen van leningen: rente, maandlasten, totale kosten en waar je op moet letten bij lenen."
  },
  { 
    slug: "sparen-rente-op-rente-2026", 
    priority: 0.85, 
    changefreq: "monthly",
    title: "Sparen en Rente-op-Rente 2026: Hoe Bouw Je Vermogen Op?",
    description: "Ontdek de kracht van rente-op-rente bij sparen. Bereken hoe snel je spaargeld groeit met onze spaarcalculator."
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // Blog index page
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Tools index page
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // All tools with individual priorities
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: tool.changefreq as "daily" | "weekly" | "monthly",
      priority: tool.priority,
    })),
    // All blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: post.changefreq as "daily" | "weekly" | "monthly",
      priority: post.priority,
    })),
  ];

  return routes;
}
