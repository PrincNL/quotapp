import { Metadata } from "next";
import { SalarisNettoClient } from "./salaris-netto-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Bruto Netto Calculator 2026 - Salaris Berekenen | QuotApp.nl",
  description: "Bereken je netto salaris vanuit bruto. Online bruto netto calculator met alle Nederlandse belastingen en premies.",
  keywords: ["bruto netto calculator", "salaris berekenen", "netto loon", "loonheffing", "loonstrook"],
  openGraph: {
    title: "Bruto Netto Calculator - Bereken Je Netto Salaris",
    description: "Bereken eenvoudig je netto salaris vanuit bruto",
    url: "https://quotapp.nl/tools/salaris-netto",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/salaris-netto",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bruto Netto Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je netto salaris vanuit bruto",
  url: "https://quotapp.nl/tools/salaris-netto",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen bruto en netto salaris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bruto salaris is je volledige loon vóór aftrek van belastingen en premies. Netto salaris is wat je daadwerkelijk op je bankrekening ontvangt.",
      },
    },
    {
      "@type": "Question",
      name: "Welke aftrekposten worden van mijn bruto salaris gehaald?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Van je bruto salaris worden onder andere loonheffing (inkomstenbelasting), pensioenpremie, zorgpremie en eventuele werkgeverskosten afgetrokken.",
      },
    },
    {
      "@type": "Question",
      name: "Is de berekening exact?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deze calculator geeft een indicatie op basis van standaardtarieven. Je werkelijke netto salaris kan afwijken door persoonlijke omstandigheden zoals reiskostenvergoedingen of fietsplan.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Bruto Netto Calculator", item: "https://quotapp.nl/tools/salaris-netto" },
  ],
};

export default function SalarisCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <SalarisNettoClient />
    </>
  );
}
