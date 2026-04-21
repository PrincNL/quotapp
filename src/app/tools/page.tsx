import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Calculator,
  Coins,
  CreditCard,
  Fuel,
  Home,
  PiggyBank,
  Receipt,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { InlineAd, TopBannerAd, AD_SLOTS } from "@/components/ad-components";

const toolsByCategory = [
  {
    category: "Hypotheek & Wonen",
    icon: Home,
    color: "from-green-500 to-emerald-600",
    tools: [
      { name: "Hypotheek Calculator", href: "/tools/hypotheek", description: "Bereken je maximale hypotheek en maandlasten", keywords: ["hypotheek berekenen", "maximale hypotheek"] },
      { name: "Hypotheek Maandlasten", href: "/tools/hypotheek-maandlasten", description: "Exact berekenen met alle kosten", keywords: ["hypotheek maandlasten", "maandlasten berekenen"] },
      { name: "Vuistregel Hypotheek", href: "/tools/vuistregel-hypotheek", description: "Snelle vuistregels voor hypotheek", keywords: ["vuistregel hypotheek", "snelle check"] },
      { name: "Efficiëntie Hypotheek", href: "/tools/efficiëntie-hypotheek", description: "Extra aflossing vs beleggen", keywords: ["extra aflossing", "beleggen"] },
      { name: "Annuïteitenhypotheek", href: "/tools/annuiteitenhypotheek", description: "Bereken maandlasten annuïteitenhypotheek", keywords: ["annuïteit", "maandlasten"] },
      { name: "Lineaire Hypotheek", href: "/tools/lineaire-hypotheek", description: "Bereken lineaire hypotheek aflossing", keywords: ["lineaire hypotheek", "lineair aflossen"] },
      { name: "Hypotheek Oversluiten", href: "/tools/hypotheek-oversluiten", description: "Bereken kosten en voordeel oversluiten", keywords: ["hypotheek oversluiten"] },
      { name: "Hypotheek Vergelijker", href: "/tools/hypotheek-vergelijker", description: "Vergelijk hypotheekofferte", keywords: ["hypotheek vergelijken"] },
      { name: "Huur vs Kopen", href: "/tools/huur-vs-koop", description: "Analyseer of kopen of huren gunstiger is", keywords: ["huur vs kopen", "woning"] },
      { name: "Maximale Huurprijs", href: "/tools/maximale-huurprijs", description: "Bereken maximale huurprijs per punt", keywords: ["huurprijs", "woningwaarde"] },
      { name: "Extra Aflossing", href: "/tools/extra-aflossing", description: "Bereken voordeel extra aflossing", keywords: ["extra aflossing", "hypotheek"] },
    ],
  },
  {
    category: "Leningen & Krediet",
    icon: CreditCard,
    color: "from-blue-600 to-indigo-700",
    tools: [
      { name: "Lening Calculator", href: "/tools/lening", description: "Bereken persoonlijke lening maandlasten", keywords: ["lening berekenen", "persoonlijke lening"] },
      { name: "Auto Lening Calculator", href: "/tools/auto-lening", description: "Financier je auto met gunstige voorwaarden", keywords: ["auto lening", "autofinanciering"] },
      { name: "Krediet Calculator", href: "/tools/krediet", description: "Bereken kredietkosten en JKP", keywords: ["krediet", "jkp"] },
      { name: "JKP Berekening", href: "/tools/jkp-berekening", description: "Bereken jaarlijks kostenpercentage", keywords: ["jkp", "kostenpercentage"] },
    ],
  },
  {
    category: "Sparen & Beleggen",
    icon: PiggyBank,
    color: "from-blue-500 to-blue-600",
    tools: [
      { name: "Sparen Calculator", href: "/tools/sparen", description: "Bereken spaarrendement met rente-op-rente", keywords: ["sparen berekenen", "spaarrente"] },
      { name: "Spaardoel Calculator", href: "/tools/spaardoel-calculator", description: "Hoeveel sparen voor je doel", keywords: ["spaardoel", "spaardoelen"] },
      { name: "Buffer Calculator", href: "/tools/buffer-calculator", description: "Hoeveel spaargeld nodig als buffer", keywords: ["financiële buffer", "noodfonds"] },
      { name: "Spaarrekening", href: "/tools/spaarrekening", description: "Bereken spaargroei over tijd", keywords: ["spaarrekening"] },
      { name: "Spaarrente Vergelijker", href: "/tools/spaarrente-vergelijker", description: "Vergelijk spaarrentes", keywords: ["spaarrente vergelijken"] },
      { name: "Pensioen Berekening", href: "/tools/pensioen-berekening", description: "Bereken je pensioenopbouw", keywords: ["pensioen", "ouderdomsvoorziening"] },
      { name: "Pensioen Calculator", href: "/tools/pensioen", description: "Plan je pensioen", keywords: ["pensioen berekenen"] },
      { name: "Inflatie Calculator", href: "/tools/inflatie-calculator", description: "Bereken inflatie-effect op geld", keywords: ["inflatie", "koopkracht"] },
    ],
  },
  {
    category: "Belastingen & Boekhouding",
    icon: Receipt,
    color: "from-emerald-500 to-teal-600",
    tools: [
      { name: "BTW Calculator", href: "/tools/btw", description: "Bereken 21%, 9% of 0% BTW", keywords: ["btw berekenen", "21 btw", "9 btw"] },
      { name: "Omzetbelasting", href: "/tools/omzetbelasting", description: "Bereken omzetbelasting en verlegging", keywords: ["omzetbelasting", "btw"] },
      { name: "Aftrekposten Calculator", href: "/tools/aftrekposten", description: "Bereken je belasting aftrekposten", keywords: ["aftrekposten", "belasting"] },
      { name: "Afschrijving Calculator", href: "/tools/afschrijving", description: "Bereken afschrijving op activa", keywords: ["afschrijving", "boekhouding"] },
      { name: "Depreciatie Calculator", href: "/tools/deprecitatie-calculator", description: "Bereken waardevermindering", keywords: ["depreciatie", "restwaarde"] },
    ],
  },
  {
    category: "Salaris & Persoonlijk",
    icon: Wallet,
    color: "from-yellow-500 to-orange-600",
    tools: [
      { name: "Netto-Brutocalculator", href: "/tools/netto-bruto", description: "Bereken netto van bruto salaris", keywords: ["netto bruto", "salaris"] },
      { name: "Bruto-Netto Calculator", href: "/tools/bruto-netto", description: "Bereken bruto van netto salaris", keywords: ["bruto netto", "inkomen"] },
      { name: "Salaris Netto Calculator", href: "/tools/salaris-netto", description: "Bereken je netto maandsalaris", keywords: ["salaris netto"] },
      { name: "Verlof Calculator", href: "/tools/verlof", description: "Bereken vakantiedagen en uitbetaling", keywords: ["verlof", "vakantiedagen"] },
      { name: "Alimentatie Calculator", href: "/tools/alimentatie", description: "Bereken partner- en kinderalimentatie", keywords: ["alimentatie", "echtscheiding"] },
    ],
  },
  {
    category: "Rente & Financiële Calculaties",
    icon: TrendingDown,
    color: "from-purple-500 to-pink-600",
    tools: [
      { name: "Rente Calculator", href: "/tools/rente", description: "Bereken rente-op-rente en kredietaflossingen", keywords: ["rente berekenen", "samengestelde rente"] },
    ],
  },
  {
    category: "Energie & Woning",
    icon: Fuel,
    color: "from-cyan-500 to-teal-600",
    tools: [
      { name: "Energiekosten Calculator", href: "/tools/energiekosten", description: "Bereken stroom- en gaskosten", keywords: ["energiekosten", "stroom", "gas"] },
      { name: "Energie Vergelijking", href: "/tools/energie-vergelijking", description: "Gas vs elektrisch vs hybride", keywords: ["energie vergelijking", "warmtepomp"] },
    ],
  },
  {
    category: "Persoonlijke Financiën",
    icon: Wallet,
    color: "from-pink-500 to-rose-600",
    tools: [
      { name: "Persoonlijke Financiën", href: "/tools/persoonlijke-financiën", description: "Overzicht inkomsten en uitgaven", keywords: ["persoonlijke financiën", "budget"] },
      { name: "Zorgplicht Calculator", href: "/tools/zorgplicht-calculator", description: "Bereken of je in problemen zit", keywords: ["zorgplicht", "schulden"] },
      { name: "Verzekeringen Vergelijken", href: "/tools/verzekeringen-vergelijken", description: "Zorg, auto en inboedel vergelijken", keywords: ["verzekeringen", "zorgverzekering"] },
      { name: "Kosten Kind Calculator", href: "/tools/kosten-kind-calculator", description: "Opvoedkosten berekenen", keywords: ["kosten kind", "opvoedkosten"] },
    ],
  },
  {
    category: "Algemene Tools",
    icon: Calculator,
    color: "from-gray-500 to-gray-600",
    tools: [
      { name: "Procent Calculator", href: "/tools/procent", description: "Percentage berekeningen makkelijk", keywords: ["procent berekenen", "percentage"] },
      { name: "IBAN Checker", href: "/tools/iban", description: "Controleer IBAN-nummer validiteit", keywords: ["iban check", "iban validator"] },
      { name: "Valuta Converter", href: "/tools/valuta", description: "EUR, USD, GBP en meer valuta's", keywords: ["valuta omrekenen", "wisselkoers"] },
      { name: "Datum Calculator", href: "/tools/datum", description: "Dagen tellen en werkdagen berekenen", keywords: ["dagen berekenen", "datum"] },
      { name: "Tekst Tools", href: "/tools/tekst", description: "Woorden tellen, karakters tellen, leestijd", keywords: ["woorden tellen", "tekst"] },
      { name: "BMI Calculator", href: "/tools/bmi", description: "Bereken je Body Mass Index", keywords: ["bmi berekenen", "gezond gewicht"] },
    ],
  },
];

const allTools = toolsByCategory.flatMap((category) => category.tools);
const toolCount = allTools.length;

const quickStartTools = [
  {
    name: "Hypotheek berekenen",
    href: "/tools/hypotheek",
    description: "Start met maximale hypotheek en maandlasten.",
    icon: Banknote,
    accent: "from-green-500 to-emerald-600",
  },
  {
    name: "Lening vergelijken",
    href: "/tools/lening",
    description: "Controleer direct je maandlasten en totale kosten.",
    icon: CreditCard,
    accent: "from-blue-600 to-indigo-700",
  },
  {
    name: "Spaargroei plannen",
    href: "/tools/sparen",
    description: "Zie wat rente-op-rente voor je spaardoel doet.",
    icon: PiggyBank,
    accent: "from-blue-500 to-cyan-600",
  },
  {
    name: "BTW uitrekenen",
    href: "/tools/btw",
    description: "Snel exclusief, inclusief en BTW-bedrag berekenen.",
    icon: Receipt,
    accent: "from-emerald-500 to-teal-600",
  },
];

const toolsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Alle Rekentools - QuotApp.nl",
  description: `Bekijk alle ${toolCount} gratis online rekentools voor Nederland. Van BTW berekenen tot hypotheek calculaties, van sparen tot lenen.`,
  url: "https://quotapp.nl/tools",
  isPartOf: {
    "@type": "WebSite",
    name: "QuotApp.nl",
    url: "https://quotapp.nl",
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Gratis Online Rekentools",
    description: "Alle rekentools beschikbaar op QuotApp.nl",
    itemListElement: allTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://quotapp.nl${tool.href}`,
      description: tool.description,
    })),
  },
};

export const metadata = {
  title: `Alle Rekentools | ${toolCount} Gratis Online Calculators`,
  description: `Bekijk alle ${toolCount} gratis online rekentools voor Nederland. Hypotheek, lening, BTW, sparen, salaris en meer. Alle tools 100% gratis en direct te gebruiken.`,
  keywords: ["rekentools", "calculators", "online rekenmachine", "gratis rekenen", "btw", "hypotheek", "lening", "sparen", "salaris"],
  alternates: {
    canonical: "https://quotapp.nl/tools",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://quotapp.nl/tools",
    siteName: "QuotApp.nl",
    title: `Alle Rekentools | ${toolCount} Gratis Online Calculators - QuotApp.nl`,
    description: `Bekijk alle ${toolCount} gratis online rekentools voor Nederland. Hypotheek, lening, BTW, sparen en meer.`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuotApp.nl - Alle Rekentools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Alle Rekentools | ${toolCount} Gratis Online Calculators`,
    description: `Bekijk alle ${toolCount} gratis online rekentools voor Nederland.`,
    images: ["/og-image.svg"],
  },
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={toolsCollectionSchema} />

      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="absolute inset-0 overflow-hidden soft-grid opacity-40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="section-shell mx-auto max-w-4xl p-6 text-center md:p-8">
            <h1 className="mb-6 text-4xl font-bold gradient-text md:text-5xl">
              Alle gratis rekentools overzichtelijk op één plek
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {toolCount} handige online calculators voor al je berekeningen. Van hypotheek tot BTW, van sparen tot lenen — alles 100% gratis en direct te gebruiken.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="cta-chip">
                <Calculator className="h-4 w-4 text-primary" />
                <span>{toolCount} tools</span>
              </span>
              <span className="cta-chip">
                <Coins className="h-4 w-4 text-primary" />
                <span>100% gratis</span>
              </span>
              <span className="cta-chip">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Direct gebruiken</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4">
        <div className="mx-auto max-w-[970px]">
          <TopBannerAd slot={AD_SLOTS.homepageTop} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <section className="section-shell p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">Snel starten</p>
              <h2 className="text-2xl font-bold md:text-3xl">Populaire calculators voor geldvragen met koopintentie</h2>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground md:text-right">
              Begin bij de tools waar bezoekers het vaakst doorstromen naar een volgende berekening of vergelijking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickStartTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className={`rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg ${tool.accent}`}>
                    <tool.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Veel gebruikt
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  <span>Open calculator</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          {toolsByCategory.map((category) => (
            <div key={category.category} className="mb-12 last:mb-0">
              <div className="mb-6 flex items-center gap-3">
                <div className={`rounded-xl bg-gradient-to-br p-3 text-white shadow-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                  <p className="text-sm text-muted-foreground">{category.tools.length} tools in deze categorie</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-xl border border-border bg-card p-5 text-card-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                  >
                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <div className="mt-3 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <span>Open tool</span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Waarom QuotApp.nl rekentools gebruiken?</h2>

        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-lg text-muted-foreground">
            QuotApp.nl biedt een complete verzameling gratis online rekentools voor de Nederlandse markt.
            Of je nu een ondernemer bent die <strong>BTW moet berekenen</strong>, een starter die zijn
            <strong> maximale hypotheek wil weten</strong>, of gewoon iemand die snel
            <strong> procenten wil berekenen</strong> — wij hebben de juiste tool voor je.
          </p>

          <h3 className="mb-4 text-xl font-semibold">Alle categorieën rekentools</h3>

          <h4 className="mt-6 font-semibold">Hypotheek & Wonen</h4>
          <p>
            Van hypotheekberekeningen tot het vergelijken van rentetarieven: onze hypotheektools helpen je
            bij elke stap van je woonvraag. Bereken je maximale hypotheek, vergelijk annuïteiten- met
            lineaire hypotheken, en ontdek of oversluiten voordelig is.
          </p>

          <h4 className="mt-6 font-semibold">Leningen & Krediet</h4>
          <p>
            Wil je lenen voor een auto, verbouwing of andere aankoop? Onze leningcalculators helpen je
            inzicht te krijgen in je maandlasten, totale kosten en het jaarlijks kostenpercentage (JKP).
          </p>

          <h4 className="mt-6 font-semibold">Sparen & Beleggen</h4>
          <p>
            Bereken hoe snel je vermogen groeit met rente-op-rente, vergelijk spaarrentes, en plan je
            pensioen. Onze spaartools maken financiële planning eenvoudig.
          </p>

          <h4 className="mt-6 font-semibold">Belastingen & Boekhouding</h4>
          <p>
            Voor ondernemers en ZZP&apos;ers: bereken BTW, ontdek aftrekposten, en bereken afschrijvingen.
            Al onze tools zijn afgestemd op de Nederlandse belastingregels.
          </p>

          <h4 className="mt-6 font-semibold">Salaris & Persoonlijk</h4>
          <p>
            Van bruto-naar-netto berekeningen tot het uitrekenen van vakantiedagen: onze salaristools
            geven je inzicht in je inkomen en rechten.
          </p>

          <h4 className="mt-6 font-semibold">Algemene Tools</h4>
          <p>
            Van procenten en datums tot IBAN-checks en valuta-omrekeningen: deze alledaagse calculators
            maken snel rekenwerk een fluitje van een cent.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        <InlineAd slot={AD_SLOTS.homepageInline} />
      </div>
    </div>
  );
}
