import { Metadata } from "next";
import { ValutaConverterClient } from "./valuta-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Valuta Converter 2026 - Wisselkoersen Omrekenen | QuotApp.nl",
  description: "Converteer valuta's met actuele wisselkoersen. EUR, USD, GBP, en meer. Snelle valuta calculator voor Nederland.",
  keywords: ["valuta converter", "wisselkoers", "euro naar dollar", "valuta omrekenen", "USD EUR GBP"],
  openGraph: {
    title: "Valuta Converter - Wisselkoersen Omrekenen",
    description: "Converteer valuta's snel met actuele wisselkoersen",
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
  description: "Converteer valuta's met actuele wisselkoersen",
  url: "https://quotapp.nl/tools/valuta",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe vaak worden de wisselkoersen bijgewerkt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De wisselkoersen worden dagelijks bijgewerkt op basis van Europese Centrale Bank gegevens. Voor de meest actuele koersen raden we aan om vlak voor je transactie te controleren.",
      },
    },
    {
      "@type": "Question",
      name: "Zijn de wisselkoersen inclusief transactiekosten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee, de getoonde koersen zijn indicatief en exclusief eventuele transactiekosten, provisie of toeslagen van banken of wisselkantoren.",
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

export default function ValutaCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ValutaConverterClient />
    </>
  );
}
