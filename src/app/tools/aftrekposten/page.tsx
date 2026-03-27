import { Metadata } from "next";
import { AftrekpostenCalculatorClient } from "./aftrekposten-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Belasting Aftrekposten Calculator 2026 - Bereken Je Aftrek | QuotApp.nl",
  description: "Bereken welke belastingaftrekposten je kunt gebruiken. Hypotheekrente, zorgkosten, giften en meer. Optimaliseer je belastingaangifte.",
  keywords: ["aftrekposten calculator", "belastingaftrek", "hypotheekrente aftrek", "zorgkosten aftrekken", "inkomstenbelasting"],
  openGraph: {
    title: "Aftrekposten Calculator - Bereken Je Belastingaftrek",
    description: "Ontdek welke aftrekposten je kunt gebruiken voor je belastingaangifte",
    url: "https://quotapp.nl/tools/aftrekposten",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/aftrekposten",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Aftrekposten Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je belastingaftrekposten voor de inkomstenbelasting",
  url: "https://quotapp.nl/tools/aftrekposten",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat zijn aftrekposten bij de belasting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aftrekposten zijn kosten die je van je inkomen mag aftrekken voordat je belasting berekent. Dit verlaagt je belastbaar inkomen en dus je belasting.",
      },
    },
    {
      "@type": "Question",
      name: "Welke aftrekposten kan ik gebruiken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Veelvoorkomende aftrekposten zijn: hypotheekrente, persoonlijke verzekeringen, betaalde alimentatie, giften, studiekosten en ondernemersaftrek.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Aftrekposten Calculator", item: "https://quotapp.nl/tools/aftrekposten" },
  ],
};

export default function AftrekpostenCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AftrekpostenCalculatorClient />
    </>
  );
}
