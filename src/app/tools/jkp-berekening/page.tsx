import { Metadata } from "next";
import { JkpBerekeningClient } from "./jkp-berekening-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "JKP Calculator 2026 - Jaarlijks Kostenpercentage Berekenen | QuotApp.nl",
  description: "Bereken het JKP (Jaarlijks Kosten Percentage) van je lening. Vergelijk kredieten op basis van totale kosten.",
  keywords: ["jkp calculator", "jaarlijks kostenpercentage", "lening vergelijken", "kredietkosten", "jkp berekenen"],
  openGraph: {
    title: "JKP Calculator - Bereken Het Jaarlijks Kosten Percentage",
    description: "Vergelijk leningen op basis van het totale JKP",
    url: "https://quotapp.nl/tools/jkp-berekening",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/jkp-berekening",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JKP Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken het Jaarlijks Kosten Percentage van leningen",
  url: "https://quotapp.nl/tools/jkp-berekening",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Waarom is JKP belangrijk bij het vergelijken van leningen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het JKP maakt het mogelijk om leningen met verschillende rentetarieven en looptijden eerlijk te vergelijken, omdat het alle kosten meeneemt.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een goed JKP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een goed JKP hangt af van het type lening en je kredietwaardigheid. Voor persoonlijke leningen ligt een JKP tussen 5% en 15%. Hogere JKP betekent duurdere lening.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "JKP Calculator", item: "https://quotapp.nl/tools/jkp-berekening" },
  ],
};

export default function JkpCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JkpBerekeningClient />
    </>
  );
}
