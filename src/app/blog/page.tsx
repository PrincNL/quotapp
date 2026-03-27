import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { InlineAd } from "@/components/ad-components";

const blogPosts = [
  {
    slug: "hypotheek-berekenen-2026",
    title: "Hypotheek Berekenen 2026: Alles Wat Je Moet Weten",
    excerpt: "Complete gids over hypotheken in 2026. Leer hoe je je maximale hypotheek berekent, wat je maandlasten worden, en alles over NHG en annuïteitenhypotheek.",
    date: "2026-03-27",
    readTime: "12 min",
    category: "Hypotheek",
    keywords: ["hypotheek berekenen", "maximale hypotheek", "maandlasten hypotheek", "NHG 2026"],
  },
  {
    slug: "lening-berekenen-2026-complete-gids",
    title: "Lening Berekenen 2026: Complete Gids",
    excerpt: "Alles over leningen berekenen in 2026. Persoonlijke lening, autofinanciering, kredietrente - leer wat je maandlasten worden.",
    date: "2026-03-27",
    readTime: "10 min",
    category: "Leningen",
    keywords: ["lening berekenen", "persoonlijke lening", "maandlasten lening", "kredietrente"],
  },
  {
    slug: "sparen-rente-op-rente-2026",
    title: "Sparen en Rente-op-Rente: De Kracht van Samengestelde Rente",
    excerpt: "Ontdek het machtige effect van rente-op-rente. Hoe langer je spaart, hoe sneller je vermogen groeit - de ultieme gids voor slim sparen.",
    date: "2026-03-27",
    readTime: "9 min",
    category: "Sparen",
    keywords: ["sparen berekenen", "rente op rente", "spaarrente", "samengestelde rente"],
  },
  {
    slug: "btw-berekenen-2025-complete-gids",
    title: "BTW Berekenen in 2025: De Complete Gids voor Ondernemers",
    excerpt: "Leer alles over btw berekenen in Nederland. Van 21% tot 9% btw-tarief, inclusief naar exclusief en handige rekentips voor ondernemers.",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Financiën",
    keywords: ["btw berekenen", "21 btw", "9 btw", "btw tarieven 2025"],
  },
  {
    slug: "hypotheek-berekenen-starters-2025",
    title: "Hypotheek Berekenen voor Starters in 2025: Wat Kan je Lenen?",
    excerpt: "Ben je starter op de woningmarkt? Ontdek hoe je je maximale hypotheek berekent, wat je maandlasten worden en welke regels er gelden in 2025.",
    date: "2025-01-10",
    readTime: "10 min",
    category: "Hypotheek",
    keywords: ["hypotheek berekenen", "maximale hypotheek", "starters", "maandlasten"],
  },
  {
    slug: "procenten-berekenen-complete-gids",
    title: "Procenten Berekenen: De Complete Gids met Voorbeelden",
    excerpt: "Leer alle manieren om procenten te berekenen. Van percentage van een bedrag tot stijging/daling berekenen - met praktische voorbeelden.",
    date: "2025-01-05",
    readTime: "7 min",
    category: "Rekenen",
    keywords: ["procent berekenen", "percentage calculator", "stijging berekenen"],
  },
  {
    slug: "iban-nummer-controleren",
    title: "IBAN Nummer Controleren: Hoe Werkt het en Waarom is het Belangrijk?",
    excerpt: "Ontdek hoe IBAN-validatie werkt, waarom het belangrijk is om IBAN-nummers te checken, en hoe je zelf een Nederlands IBAN kunt verifiëren.",
    date: "2024-12-28",
    readTime: "6 min",
    category: "Bankieren",
    keywords: ["iban check", "iban validator", "nederlandse iban"],
  },
  {
    slug: "maximale-hypotheek-2025",
    title: "Maximale Hypotheek 2025: Rekenregels en Tips",
    excerpt: "Alles over de maximale hypotheek in 2025. Leer hoeveel je kunt lenen, welke factoren meespelen en hoe je je leencapaciteit vergroot.",
    date: "2024-12-20",
    readTime: "9 min",
    category: "Hypotheek",
    keywords: ["maximale hypotheek", "leencapaciteit", "hypotheek 2025"],
  },
];

// Blog schema
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "QuotApp.nl Blog",
  description: "Artikelen over rekenen, financiën en het gebruik van online tools",
  url: "https://quotapp.nl/blog",
};

// Article list schema
const articlesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: blogPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      url: `https://quotapp.nl/blog/${post.slug}`,
      datePublished: post.date,
      keywords: post.keywords.join(", "),
    },
  })),
};

export const metadata = {
  title: "Blog | Rekentips, Financiën en Online Tools",
  description: "Lees artikelen over btw berekenen, hypotheek berekenen, procenten en meer. Handige tips en uitleg over onze rekentools.",
  keywords: ["blog", "rekenen", "financiën", "btw", "hypotheek", "tips"],
  alternates: {
    canonical: "https://quotapp.nl/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={blogSchema} />
      <JsonLd data={articlesSchema} />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">QuotApp.nl Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Handige artikelen over rekenen, financiën en het optimaal gebruiken van onze online tools. 
          Van btw-berekeningen tot hypotheekadvies.
        </p>
      </div>

      {/* Inline Ad */}
      <InlineAd slot="blog-top-1" />

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="p-6">
                {/* Category & Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("nl-NL")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center text-sm font-medium text-primary">
                  <span>Lees verder</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Inline Ad */}
      <InlineAd slot="blog-bottom-1" />

      {/* SEO Content */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-4">Over onze blog</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p className="mb-4">
            Welkom op de QuotApp.nl blog! Hier delen we regelmatig nuttige artikelen over rekenen, 
            financiën en het gebruik van onze online tools. Of je nu ondernemer bent en wilt weten 
            hoe je btw correct berekent, of starter op de woningmarkt die zijn maximale hypotheek 
            wil weten - wij helpen je op weg.
          </p>
          <p>
            Onze artikelen zijn geschreven om je praktisch te helpen. We vermijden ingewikkeld jargon 
            en focussen op heldere uitleg met concrete voorbeelden. Heb je een onderwerp waar je meer 
            over wilt weten? Laat het ons weten!
          </p>
        </div>
      </div>
    </div>
  );
}
