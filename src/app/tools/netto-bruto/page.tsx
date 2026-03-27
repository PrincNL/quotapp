import { Metadata } from "next";
import { NettoBrutoCalculatorClient } from "./netto-bruto-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Netto Bruto Calculator 2026 - Van Netto naar Bruto Berekenen | QuotApp.nl",
  description: "Bereken je bruto salaris vanuit netto. Handige netto naar bruto calculator voor ondernemers en werkgevers.",
  keywords: ["netto bruto calculator", "netto naar bruto", "bruto salaris berekenen", "loonkosten"],
  openGraph: {
    title: "Netto Bruto Calculator - Bereken Je Bruto vanuit Netto",
    description: "Bereken eenvoudig je bruto salaris vanuit netto",
    url: "https://quotapp.nl/tools/netto-bruto",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/netto-bruto",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Netto Bruto Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken bruto salaris vanuit netto",
  url: "https://quotapp.nl/tools/netto-bruto",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Waarom zou ik netto naar bruto berekenen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Als werkgever wil je weten wat de werkelijke loonkosten zijn. Als ondernemer kun je zo berekenen wat je factureren moet om netto een bepaald bedrag over te houden.",
      },
    },
    {
      "@type": "Question",
      name: "Wat zijn de werkgeverslasten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Werkgeverslasten omvatten sociale verzekeringspremies, pensioenpremie, reiskostenvergoeding en eventuele CAO-gerelateerde kosten.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Netto Bruto Calculator", item: "https://quotapp.nl/tools/netto-bruto" },
  ],
};

export default function NettoBrutoCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <NettoBrutoCalculatorClient />
    </>
  );
}
