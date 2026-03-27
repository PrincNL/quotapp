import { Metadata } from "next";
import { HypotheekVergelijkerClient } from "./hypotheek-vergelijker-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Hypotheek Vergelijker 2026 - Hypotheekrente Vergelijken | QuotApp.nl",
  description: "Vergelijk hypotheekrentes en voorwaarden van verschillende hypotheekverstrekkers. Vind de beste hypotheek voor jouw situatie.",
  keywords: ["hypotheek vergelijker", "hypotheekrente vergelijken", "beste hypotheek", "hypotheek offerte"],
  openGraph: {
    title: "Hypotheek Vergelijker - Vergelijk Hypotheekrentes",
    description: "Vergelijk hypotheekrentes en vind de beste deal",
    url: "https://quotapp.nl/tools/hypotheek-vergelijker",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/hypotheek-vergelijker",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hypotheek Vergelijker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Vergelijk hypotheekrentes en voorwaarden",
  url: "https://quotapp.nl/tools/hypotheek-vergelijker",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Waar moet ik op letten bij het vergelijken van hypotheken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Let op: rentepercentage, rentevaste periode, NHG-voorwaarden, boetevrij aflossingspercentage, en eventuele extra kosten zoals administratiekosten.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een goede hypotheekrente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een goede rente hangt af van de actuele markt, je risicoprofiel en de rentevaste periode. Vergelijk altijd meerdere aanbieders voor de beste deal.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Hypotheek Vergelijker", item: "https://quotapp.nl/tools/hypotheek-vergelijker" },
  ],
};

export default function HypotheekVergelijkerCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HypotheekVergelijkerClient />
    </>
  );
}
