import type { Metadata } from "next";
import { ValutaConverterClient } from "./valuta-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Valuta Omrekenen | EUR USD GBP Converter",
  description: "Zet valuta's om: Euro, Dollar, Pond, Yen en meer. Wisselkoers calculator voor reizen en zakelijk gebruik. Gratis valuta converter.",
  keywords: ["valuta omrekenen", "euro dollar", "wisselkoers", "valuta converter", "eur usd"],
  openGraph: {
    title: "Valuta Converter - EUR USD GBP en meer",
    description: "Reisgeld en zakelijke valuta omrekenen",
    url: "https://quotapp.nl/tools/valuta",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/valuta",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Valuta Converter",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Zet valuta's om naar andere munten",
  url: "https://quotapp.nl/tools/valuta",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welke valuta's kan ik omrekenen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deze calculator ondersteunt EUR (Euro), USD (Dollar), GBP (Britse Pond), CHF (Zwitserse Frank), JPY (Japanse Yen), CAD (Canadese Dollar), AUD (Australische Dollar) en CNY (Chinese Yuan).",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Valuta Converter", item: "https://quotapp.nl/tools/valuta" },
  ],
};

export default function ValutaConverterPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ValutaConverterClient />
    </>
  );
}
