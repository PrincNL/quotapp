import { Metadata } from "next";
import { HypotheekOversluitenClient } from "./hypotheek-oversluiten-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Hypotheek Oversluiten Calculator 2026 - Kosten & Besparing Berekenen | QuotApp.nl",
  description: "Bereken of hypotheek oversluiten voordelig is. Ontdek de kosten en potentiële besparing bij oversluiten naar een lagere rente.",
  keywords: ["hypotheek oversluiten", "oversluiten kosten", "hypotheekcalculator", "rente besparen", "hypotheek aanpassen"],
  openGraph: {
    title: "Hypotheek Oversluiten Calculator - Bereken Je Besparing",
    description: "Ontdek of oversluiten van je hypotheek voordelig is",
    url: "https://quotapp.nl/tools/hypotheek-oversluiten",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/hypotheek-oversluiten",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hypotheek Oversluiten Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken de kosten en besparing van hypotheek oversluiten",
  url: "https://quotapp.nl/tools/hypotheek-oversluiten",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat kost hypotheek oversluiten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kosten voor oversluiten zijn onder andere: royementsprovisie (boete bij vervroegd aflossen), notariskosten, taxatiekosten en advieskosten. Reken op ongeveer 0,5% tot 2% van de hypotheeksom.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer is oversluiten voordelig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oversluiten is voordelig als de rente die je bespaart groter is dan de kosten die je maakt, en je van plan bent om nog lang in je huis te blijven wonen.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik altijd mijn hypotheek oversluiten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Niet altijd. Je huidige hypotheek mag hiervoor worden gesloten, je inkomen moet toereikend zijn voor de nieuwe hypotheek, en je moet voldoen aan de huidige hypotheeknormen.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Hypotheek Oversluiten Calculator", item: "https://quotapp.nl/tools/hypotheek-oversluiten" },
  ],
};

export default function HypotheekOversluitenCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HypotheekOversluitenClient />
    </>
  );
}
