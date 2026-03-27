import Link from "next/link";
import { Calculator, Percent, Hash, Type, Calendar, Scale, Banknote, TrendingUp, ArrowRight, CheckCircle, Star, Zap, Shield, PiggyBank, Euro } from "lucide-react";
import { QuoteOfTheDay } from "@/components/quote-of-the-day";
import { RecentlyUsed, FavoriteTools, ToolStats } from "@/components/tool-activity";
import { BadgeDisplay } from "@/components/badge-display";
import { ToolCombos } from "@/components/tool-combos";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { InlineAd, TopBannerAd, StickyAd, AnchorAd, ResponsiveAd, InArticleAd } from "@/components/ad-components";
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
    name: "Sparen Calculator",
    shortName: "Sparen",
    description: "Bereken je spaarrendement met rente-op-rente",
    href: "/tools/sparen",
    icon: PiggyBank,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-600",
    popular: true,
    keywords: ["sparen berekenen", "spaarrente", "rente op rente"],
  },
  {
    name: "BTW Calculator",
    shortName: "BTW",
    description: "Bereken 21%, 9% of 0% BTW eenvoudig",
    href: "/tools/btw",
    icon: Calculator,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
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
];

// WebPage schema for homepage
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "QuotApp.nl - Gratis Online Rekentools",
  description: "Gratis Nederlandse rekentools: BTW, hypotheek, procenten, IBAN, valuta, BMI en meer. 100% gratis, geen registratie.",
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
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={webpageSchema} />
      
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
                <span>11 Tools</span>
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
            <TopBannerAd slot="homepage-top-leaderboard" />
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
            <InArticleAd slot="homepage-after-quote" />

            {/* Tool Activity */}
            <RecentlyUsed />
            <FavoriteTools />
            <ToolStats />

            {/* Badges */}
            <BadgeDisplay />

            {/* FIRST IN-CONTENT AD - High visibility */}
            <div className="my-8">
              <InlineAd slot="homepage-inline-1" />
            </div>

            {/* Tools Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Alle Rekentools</h2>
                <span className="text-sm text-muted-foreground">11 tools beschikbaar</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Kies uit onze collectie van 11 gratis online rekentools. 
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
                    <div className="tool-card card h-full p-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Gradient header */}
                      <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                            <tool.icon className="w-6 h-6" />
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
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECOND IN-CONTENT AD - After tools */}
            <InlineAd slot="homepage-inline-2" />

            {/* Tool Combos */}
            <ToolCombos />

            {/* THIRD IN-CONTENT AD - After tool combos */}
            <div className="my-8">
              <ResponsiveAd slots={{ mobile: "homepage-rectangle-mobile", desktop: "homepage-rectangle-desktop" }} />
            </div>

            {/* Newsletter */}
            <NewsletterSignup />

            {/* SEO Content Section */}
            <div className="mt-16 max-w-4xl mx-auto">
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
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Snel & Eenvoudig</h3>
                    <p className="text-sm">Geen registratie nodig. Geen apps installeren. Direct aan de slag in je browser.</p>
                  </div>
                  <div className="p-6 bg-muted rounded-xl text-center">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">100% Privé</h3>
                    <p className="text-sm">Alle berekeningen gebeuren lokaal in je browser. Je gegevens blijven bij jou.</p>
                  </div>
                  <div className="p-6 bg-muted rounded-xl text-center">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Overal Werkt</h3>
                    <p className="text-sm">Op desktop, tablet en mobiel. Altijd beschikbaar, waar je ook bent.</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Onze Populairste Rekentools
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/btw" className="hover:text-primary transition-colors">BTW Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      De meest gebruikte tool voor ondernemers. Bereken moeiteloos <strong>21% BTW</strong> of 
                      <strong> 9% BTW</strong>. Van exclusief naar inclusief en vice versa. 
                      Perfect voor facturen en prijsberekeningen.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/hypotheek" className="hover:text-primary transition-colors">Hypotheek Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      Wil je een huis kopen? Bereken je <strong>maximale hypotheek</strong> en geschatte 
                      <strong> maandlasten</strong> op basis van je inkomen. Inclusief rente en looptijd.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">
                      <Link href="/tools/procent" className="hover:text-primary transition-colors">Procent Calculator</Link>
                    </h4>
                    <p className="text-sm">
                      Alle percentage berekeningen in één tool. X% van Y, stijging/daling berekenen, 
                      percentage van totaal. Handig voor kortingen, statistieken en analyses.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Hoe Werkt Het?
                </h3>
                <p className="mb-4">
                  Het gebruik van onze tools is kinderspel. Kies een tool uit het overzicht hierboven, 
                  vul je gegevens in, en zie direct het resultaat. Alle berekeningen gebeuren in real-time 
                  in je browser - geen wachttijden, geen pagina-herladingen.
                </p>
                <p className="mb-6">
                  Ons platform is geoptimaliseerd voor snelheid en gebruiksgemak. We begrijpen dat je 
                  snel een antwoord nodig hebt, daarom werken al onze tools direct zonder gedoe. 
                  En het mooiste: het is helemaal gratis!
                </p>
              </div>
            </div>

            {/* FOURTH IN-CONTENT AD - After SEO content */}
            <InlineAd slot="homepage-inline-3" />

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
              <StickyAd slot="homepage-sidebar-1" />
              <div className="h-4" />
              <StickyAd slot="homepage-sidebar-2" />
            </div>
          </aside>
        </div>
      </div>

      {/* FIFTH AD - Before footer */}
      <section className="container mx-auto px-4 pb-8">
        <InlineAd slot="homepage-bottom-1" />
      </section>

      {/* Mobile Anchor Ad - Always visible on mobile */}
      <AnchorAd slot="homepage-mobile-anchor" />
    </div>
  );
}
