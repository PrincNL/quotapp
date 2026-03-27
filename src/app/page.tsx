import Link from "next/link";
import { Calculator, Percent, Hash, Type, Calendar, Scale, Banknote, TrendingUp, ArrowRight, CheckCircle, Star, Zap, Shield, PiggyBank, Euro, Car, Heart, Sun, Receipt, Breadcrumb, Home } from "lucide-react";
import { QuoteOfTheDay } from "@/components/quote-of-the-day";
import { RecentlyUsed, FavoriteTools, ToolStats } from "@/components/tool-activity";
import { BadgeDisplay } from "@/components/badge-display";
import { ToolCombos } from "@/components/tool-combos";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { InlineAd, TopBannerAd, StickyAd, AnchorAd, RectangleAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { JsonLd } from "@/components/json-ld";

const tools = [
  {
    name: "Hypotheek Calculator",
    shortName: "Hypotheek",
    description: "Bereken je maandlasten en maximale hypotheek",
    href: "/tools/hypotheek",
    icon: Banknote,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500",
    popular: true,
    keywords: ["hypotheek berekenen", "maximale hypotheek", "maandlasten"],
  },
  {
    name: "Lening Calculator",
    shortName: "Lening",
    description: "Bereken maandlasten voor persoonlijke leningen",
    href: "/tools/lening",
    icon: Euro,
    color: "from-green-600 to-emerald-700",
    bgColor: "bg-green-600",
    popular: true,
    keywords: ["lening berekenen", "lening calculator", "maandlasten lening"],
  },
  {
    name: "Auto Lening Calculator",
    shortName: "Auto Lening",
    description: "Financier je auto met gunstige maandlasten",
    href: "/tools/auto-lening",
    icon: Car,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-600",
    popular: true,
    keywords: ["auto lening", "autofinanciering", "auto kopen"],
  },
  {
    name: "Sparen Calculator",
    shortName: "Sparen",
    description: "Bereken je spaarrendement met rente-op-rente",
    href: "/tools/sparen",
    icon: PiggyBank,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    popular: true,
    keywords: ["sparen berekenen", "spaarrente", "rente op rente"],
  },
  {
    name: "Alimentatie Calculator",
    shortName: "Alimentatie",
    description: "Bereken partner- en kinderalimentatie",
    href: "/tools/alimentatie",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500",
    keywords: ["alimentatie berekenen", "partneralimentatie", "echtscheiding"],
  },
  {
    name: "Aftrekposten Calculator",
    shortName: "Aftrekposten",
    description: "Bereken je belasting aftrekposten",
    href: "/tools/aftrekposten",
    icon: Receipt,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500",
    keywords: ["aftrekposten", "belasting aftrekken", "inkomstenbelasting"],
  },
  {
    name: "Verlof Calculator",
    shortName: "Verlof",
    description: "Bereken je vakantiedagen en uitbetaling",
    href: "/tools/verlof",
    icon: Sun,
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-500",
    keywords: ["vakantiedagen", "verlof berekenen", "uitbetaald verlof"],
  },
  {
    name: "BTW Calculator",
    shortName: "BTW",
    description: "Bereken 21%, 9% of 0% BTW eenvoudig",
    href: "/tools/btw",
    icon: Calculator,
    color: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-400",
    popular: true,
    keywords: ["btw berekenen", "21 btw", "9 btw"],
  },
  {
    name: "Rente Calculator",
    shortName: "Rente",
    description: "Bereken rente-op-rente en kredietaflossingen",
    href: "/tools/rente",
    icon: Percent,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500",
    keywords: ["rente berekenen", "rentevoet", "kredietrente"],
  },
  {
    name: "Procent Calculator",
    shortName: "Procent",
    description: "Percentage berekeningen makkelijk gemaakt",
    href: "/tools/procent",
    icon: Percent,
    color: "from-purple-400 to-purple-500",
    bgColor: "bg-purple-400",
    keywords: ["procent berekenen", "percentage calculator"],
  },
  {
    name: "IBAN Checker",
    shortName: "IBAN",
    description: "Controleer of je IBAN geldig is",
    href: "/tools/iban",
    icon: Hash,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500",
    keywords: ["iban check", "iban validator"],
  },
  {
    name: "Valuta Converter",
    shortName: "Valuta",
    description: "EUR, USD, GBP en meer valuta's",
    href: "/tools/valuta",
    icon: TrendingUp,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500",
    keywords: ["valuta omrekenen", "euro dollar"],
  },
  {
    name: "Datum Calculator",
    shortName: "Datum",
    description: "Dagen tussen datums, werkdagen tellen",
    href: "/tools/datum",
    icon: Calendar,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-500",
    keywords: ["dagen berekenen", "datum verschil"],
  },
  {
    name: "Tekst Tools",
    shortName: "Tekst",
    description: "Woorden tellen, karakters tellen, leestijd",
    href: "/tools/tekst",
    icon: Type,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500",
    keywords: ["woorden tellen", "karakters tellen"],
  },
  {
    name: "BMI Calculator",
    shortName: "BMI",
    description: "Bereken je Body Mass Index",
    href: "/tools/bmi",
    icon: Scale,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500",
    keywords: ["bmi berekenen", "gezond gewicht"],
  },
];

const homepageFAQ = [
  {
    question: "Zijn alle rekentools op QuotApp.nl gratis?",
    answer: "Ja, alle rekentools op QuotApp.nl zijn 100% gratis te gebruiken. Je hoeft niet te registreren en er zijn geen verborgen kosten. We financieren het platform via advertenties.",
  },
  {
    question: "Waarom zou ik QuotApp.nl gebruiken in plaats van andere calculators?",
    answer: "QuotApp.nl is speciaal ontwikkeld voor de Nederlandse markt. Onze tools zijn geoptimaliseerd voor Nederlandse situaties, zoals het berekenen van 21% en 9% BTW, het controleren van Nederlandse IBAN-nummers, en het berekenen van hypotheken volgens Nederlandse normen. Daarnaast werken alle tools direct in je browser zonder gedoe.",
  },
  {
    question: "Worden mijn gegevens opgeslagen?",
    answer: "Nee, je privacy is belangrijk voor ons. Alle berekeningen gebeuren lokaal in je browser. We slaan geen persoonlijke gegevens of berekeningen op op onze servers. Alleen anonieme gebruiksstatistieken worden verzameld om onze tools te verbeteren.",
  },
  {
    question: "Werken de tools ook op mobiel?",
    answer: "Absoluut! Alle tools zijn volledig responsive en werken perfect op desktop, tablet en mobiele telefoons. Je kunt overal en altijd een snelle berekening maken.",
  },
  {
    question: "Hoe nauwkeurig zijn de berekeningen?",
    answer: "Onze tools gebruiken gevestigde wiskundige formules en zijn getest op nauwkeurigheid. Voor financiële berekeningen zoals hypotheken geven we een indicatie - voor definitieve cijfers raden we altijd aan om contact op te nemen met een financieel adviseur.",
  },
  {
    question: "Hoe verdien ik aan de gratis rekentools?",
    answer: "Wij tonen relevante advertenties op QuotApp.nl om de kosten voor het gratis platform te dekken. Wij staan volledig achter transparantie: advertenties zijn altijd duidelijk gemarkeerd en storen niet overmatig. Wij kiezen zorgvuldig voor niet-opdringerige advertenties die passen bij de beleving van onze gebruikers.",
  },
  {
    question: "Welke rekentools zijn het meest populair?",
    answer: "Onze meest gebruikte tools zijn de BTW Calculator, Hypotheek Calculator en Procent Calculator. Deze tools worden dagelijks gebruikt door ondernemers, huizenkopers en iedereen die snel berekeningen nodig heeft.",
  },
  {
    question: "Kan ik de resultaten opslaan of delen?",
    answer: "Je kunt eenvoudig de resultaten van je berekeningen kopiëren en plakken. We werken aan een functie om berekeningen op te slaan, maar voorlopig gebeurt alles lokaal in je browser.",
  },
];

// BreadcrumbList Schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://quotapp.nl",
    },
  ],
};

// WebPage schema for homepage
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "QuotApp.nl - Gratis Online Rekentools voor Nederland",
  description: "Gratis Nederlandse rekentools: BTW, hypotheek, procenten, IBAN, valuta, BMI en meer. 15 tools, 100% gratis, geen registratie.",
  url: "https://quotapp.nl",
  isPartOf: {
    "@type": "WebSite",
    name: "QuotApp.nl",
    url: "https://quotapp.nl",
  },
  publisher: {
    "@type": "Organization",
    name: "QuotApp.nl",
    url: "https://quotapp.nl",
    logo: {
      "@type": "ImageObject",
      url: "https://quotapp.nl/logo.png",
    },
  },
  breadcrumb: breadcrumbSchema,
  mainEntity: {
    "@type": "ItemList",
    name: "Gratis Rekentools",
    description: "Lijst van alle gratis online rekentools op QuotApp.nl",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://quotapp.nl${tool.href}`,
      description: tool.description,
    })),
  },
};

// CollectionPage schema for tools
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Alle Rekentools - QuotApp.nl",
  description: "Bekijk alle 15 gratis online rekentools voor Nederland. Van BTW berekenen tot hypotheek calculaties.",
  url: "https://quotapp.nl/#tools",
  isPartOf: webpageSchema,
  about: {
    "@type": "Thing",
    name: "Online Calculators",
    description: "Gratis webgebaseerde rekenmachines voor dagelijks gebruik",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <JsonLd data={webpageSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-16 pb-12">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" /> Snel & Eenvoudig
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <Star className="w-4 h-4" /> 100% Gratis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm font-medium">
                <Shield className="w-4 h-4" /> Geen registratie
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Gratis Online Rekentools voor Nederland
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Handige Nederlandse rekentools voor dagelijks gebruik. 
              BTW berekenen, hypotheek berekenen, procenten en meer. 
              Snel, accuraat en helemaal gratis!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Calculator className="w-4 h-4" />
                <span>15 Tools</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                <TrendingUp className="w-4 h-4" />
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                <ArrowRight className="w-4 h-4" />
                <span>Geen registratie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP AD - Above fold, largest and most valuable */}
      <div className="w-full bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-[970px] mx-auto">
            <TopBannerAd slot={AD_SLOTS.homepageTop} />
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Ad for Desktop */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Quote of the Day */}
            <QuoteOfTheDay />

            {/* Ad after quote */}
            <InlineAd slot={AD_SLOTS.homepageInline} />

            {/* Tool Activity */}
            <RecentlyUsed />
            <FavoriteTools />
            <ToolStats />

            {/* Badges */}
            <BadgeDisplay />

            {/* FIRST IN-CONTENT AD - High visibility */}
            <div className="my-8">
              <InlineAd slot={AD_SLOTS.homepageInline} />
            </div>

            {/* Tools Grid */}
            <div className="mb-12" id="tools">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Alle Rekentools</h2>
                <span className="text-sm text-muted-foreground">15 tools beschikbaar</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Kies uit onze collectie van 15 gratis online rekentools. 
                Van <Link href="/tools/btw" className="text-primary hover:underline">BTW berekenen</Link> tot 
                je <Link href="/tools/hypotheek" className="text-primary hover:underline">maximale hypotheek berekenen</Link> - 
                alles werkt direct in je browser.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group"
                  >
                    <article className="tool-card card h-full p-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Gradient header */}
                      <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                            <tool.icon className="w-6 h-6" aria-hidden="true" />
                          </div>
                          {tool.popular && (
                            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full">
                              Populair
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm">
                          {tool.description}
                        </p>

                        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Open tool</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECOND IN-CONTENT AD - After tools */}
            <InlineAd slot={AD_SLOTS.homepageInline} />

            {/* Tool Combos */}
            <ToolCombos />

            {/* THIRD IN-CONTENT AD - After tool combos */}
            <div className="my-8">
              <RectangleAd slot={AD_SLOTS.homepageSidebar} />
            </div>

            {/* Newsletter */}
            <NewsletterSignup />

            {/* SEO Content Section - Rich content for Google indexing */}
            <div className="mt-16 max-w-4xl mx-auto" id="about">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Waarom QuotApp.nl?
              </h2>
              
              <div className="prose prose-lg text-muted-foreground max-w-none">
                <p className="mb-6 text-lg leading-relaxed">
                  <strong>QuotApp.nl</strong> is dé bestemming voor iedereen die snel en eenvoudig berekeningen wil maken. 
                  Of je nu een ondernemer bent die <strong>BTW moet berekenen</strong>, een starter op de woningmarkt 
                  die zijn <strong>maximale hypotheek wil weten</strong>, of gewoon iemand die snel wat <strong>procenten wil berekenen</strong> - 
                  wij hebben de juiste tool voor je.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-10 not-prose">
                  <div className="p-6 bg-muted rounded-xl text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Snel & Eenvoudig</h3>
                    <p className="text-sm">Geen registratie nodig. Geen apps installeren. Direct aan de slag in je browser.</p>
                  </div>
                  <div className="p-6 bg-muted rounded-xl text-center">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">100% Privé</h3>
                    <p className="text-sm">Alle berekeningen gebeuren lokaal in je browser. Je gegevens blijven bij jou.</p>
                  </div>
                  <div className="p-6 bg-muted rounded-xl text-center">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-purple-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Overal Werkt</h3>
                    <p className="text-sm">Op desktop, tablet en mobiel. Altijd beschikbaar, waar je ook bent.</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Onze Populairste Rekentools
                </h3>
                
                <div className="space-y-4 mb-8">
                  <article className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/btw" className="hover:text-primary transition-colors">BTW Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      De meest gebruikte tool voor ondernemers. Bereken moeiteloos <strong>21% BTW</strong> of 
                      <strong> 9% BTW</strong>. Van exclusief naar inclusief en vice versa. 
                      Perfect voor facturen en prijsberekeningen.
                    </p>
                  </article>
                  
                  <article className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/hypotheek" className="hover:text-primary transition-colors">Hypotheek Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      Wil je een huis kopen? Bereken je <strong>maximale hypotheek</strong> en geschatte 
                      <strong> maandlasten</strong> op basis van je inkomen. Inclusief rente en looptijd.
                    </p>
                  </article>
                  
                  <article className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/procent" className="hover:text-primary transition-colors">Procent Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      Alle percentage berekeningen in één tool. X% van Y, stijging/daling berekenen, 
                      percentage van totaal. Handig voor kortingen, statistieken en analyses.
                    </p>
                  </article>

                  <article className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/sparen" className="hover:text-primary transition-colors">Sparen Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      Bereken hoeveel je spaargeld groeit met <strong>rente-op-rente</strong>. 
                      Zie exact hoe je vermogen toeneemt over tijd en plan je financiële toekomst.
                    </p>
                  </article>

                  <article className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/lening" className="hover:text-primary transition-colors">Lening Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      Wil je lenen voor een auto, verbouwing of andere aankoop? Bereken je 
                      <strong> maandlasten</strong> en totale kosten van je lening.
                    </p>
                  </article>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Alle Beschikbare Rekentools
                </h3>
                <p className="mb-4">
                  Naast onze populairste tools bieden we nog meer handige calculators:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><Link href="/tools/rente" className="text-primary hover:underline">Rente Calculator</Link> - Bereken samengestelde rente en kredietaflossingen</li>
                  <li><Link href="/tools/alimentatie" className="text-primary hover:underline">Alimentatie Calculator</Link> - Bereken partner- en kinderalimentatie bij scheiding</li>
                  <li><Link href="/tools/aftrekposten" className="text-primary hover:underline">Aftrekposten Calculator</Link> - Ontdek welke kosten je kunt aftrekken van je belasting</li>
                  <li><Link href="/tools/verlof" className="text-primary hover:underline">Verlof Calculator</Link> - Bereken je vakantiedagen en uitbetaald verlof</li>
                  <li><Link href="/tools/iban" className="text-primary hover:underline">IBAN Checker</Link> - Valideer Nederlandse en internationale IBAN-nummers</li>
                  <li><Link href="/tools/valuta" className="text-primary hover:underline">Valuta Converter</Link> - Wisselkoersen voor EUR, USD, GBP en meer</li>
                  <li><Link href="/tools/datum" className="text-primary hover:underline">Datum Calculator</Link> - Bereken dagen tussen datums en werkdagen</li>
                  <li><Link href="/tools/tekst" className="text-primary hover:underline">Tekst Tools</Link> - Tel woorden, karakters en bereken leestijd</li>
                  <li><Link href="/tools/bmi" className="text-primary hover:underline">BMI Calculator</Link> - Bereken je Body Mass Index</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Hoe Werkt Het?
                </h3>
                <p className="mb-4">
                  Het gebruik van onze tools is kinderspel. Kies een tool uit het overzicht hierboven, 
                  vul je gegevens in, en zie direct het resultaat. Alle berekeningen gebeuren in real-time 
                  in je browser - geen wachttijden, geen pagina-herladingen.
                </p>
                <p className="mb-4">
                  Ons platform is geoptimaliseerd voor snelheid en gebruiksgemak. We begrijpen dat je 
                  snel een antwoord nodig hebt, daarom werken al onze tools direct zonder gedoe. 
                  En het mooiste: het is helemaal gratis!
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Voor Wie Is QuotApp.nl?
                </h3>
                <p className="mb-4">
                  Onze rekentools zijn ontworpen voor iedereen in Nederland:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Ondernemers en ZZP&apos;ers</strong> - Bereken BTW, factuurbedragen en winstmarges</li>
                  <li><strong>Huizenkopers</strong> - Ontdek je maximale hypotheek en maandlasten</li>
                  <li><strong>Spaarders</strong> - Zie hoe je geld groeit met rente-op-rente</li>
                  <li><strong>Leners</strong> - Vergelijk leningen en bereken maandlasten</li>
                  <li><strong>Studenten</strong> - Snelle berekeningen voor studie en projecten</li>
                  <li><strong>Iedereen</strong> - Van korting berekenen tot datums tellen</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Over Ons
                </h3>
                <p className="mb-6">
                  QuotApp.nl is opgericht met één doel: gratis, nauwkeurige rekentools beschikbaar 
                  maken voor iedereen in Nederland. We geloven dat goede financiële tools niet 
                  duur hoeven te zijn. Daarom zijn al onze tools 100% gratis te gebruiken, 
                  zonder registratie en zonder verborgen kosten.
                </p>
              </div>
            </div>

            {/* FOURTH IN-CONTENT AD - After SEO content */}
            <InlineAd slot={AD_SLOTS.homepageInline} />

            {/* Related Tools Section */}
            <div className="max-w-4xl mx-auto">
              <RelatedTools limit={6} />
            </div>

            {/* FAQ Section with Schema */}
            <div className="max-w-4xl mx-auto">
              <FAQSection items={homepageFAQ} title="Veelgestelde vragen over QuotApp.nl" />
            </div>
          </div>

          {/* Desktop Sidebar Ads - Multiple for more impressions */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <StickyAd slot={AD_SLOTS.homepageSidebar} />
            </div>
          </aside>
        </div>
      </div>

      {/* FIFTH AD - Before footer */}
      <section className="container mx-auto px-4 pb-8">
        <InlineAd slot={AD_SLOTS.homepageInline} />
      </section>

      {/* Mobile Anchor Ad - Always visible on mobile */}
      <AnchorAd slot={AD_SLOTS.mobileAnchor} />
    </div>
  );
}
