import { Metadata } from "next";
import { HuurVsKoopCalculatorClient } from "./huur-vs-koop-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Huur vs Koop Calculator 2026 - Kopen of Huren? | QuotApp.nl",
  description: "Vergelijk de kosten van huren versus kopen van een huis. Bereken het financieel verschil en ontdek of kopen of huren voordeliger is voor jouw situatie.",
  keywords: ["huur vs koop calculator", "kopen of huren", "huis kopen kosten", "huurwoning", "hypotheek kosten"],
  openGraph: {
    title: "Huur vs Koop Calculator - Kopen of Huren?",
    description: "Vergelijk de financiële voor- en nadelen van kopen vs huren",
    url: "https://quotapp.nl/tools/huur-vs-koop",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/huur-vs-koop",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Huur vs Koop Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Vergelijk de kosten van huren versus kopen van een huis",
  url: "https://quotapp.nl/tools/huur-vs-koop",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wanneer is kopen voordeliger dan huren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kopen is meestal voordeliger als je langere tijd op dezelfde plek blijft wonen (5+ jaar), eigen geld hebt voor de aanbetaling, en stabiel inkomen hebt.",
      },
    },
    {
      "@type": "Question",
      name: "Wat zijn de verborgen kosten van kopen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Naast de hypotheek zijn er kosten koper (overdrachtsbelasting, notariskosten, taxatie), onderhoudskosten, en eventueel verenigingsbijdragen.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het break-even punt voor kopen vs huren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het break-even punt ligt meestal tussen de 5 en 10 jaar, afhankelijk van de huizenmarkt, rentestand en je persoonlijke situatie.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Huur vs Koop Calculator", item: "https://quotapp.nl/tools/huur-vs-koop" },
  ],
};

export default function HuurVsKoopCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HuurVsKoopCalculatorClient />
    </>
  );
}
