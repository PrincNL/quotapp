import { Metadata } from "next";
import { KredietCalculatorClient } from "./krediet-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Krediet Calculator 2026 - Krediet Simuleren | QuotApp.nl",
  description: "Simuleer de kosten van een krediet. Bereken maandlasten en totaal te betalen bedrag. Gratis krediet simulator.",
  keywords: ["krediet calculator", "krediet simulatie", "leenbedrag", "kredietkosten", "krediet aanvragen"],
  openGraph: {
    title: "Krediet Calculator - Simuleer Je Krediet",
    description: "Bereken de kosten en maandlasten van een krediet",
    url: "https://quotapp.nl/tools/krediet",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/krediet",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Krediet Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Simuleer krediet en bereken maandlasten",
  url: "https://quotapp.nl/tools/krediet",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het JKP (Jaarlijks Kosten Percentage)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het JKP is de totale kosten van een krediet uitgedrukt als percentage per jaar. Het inclusief alle kosten: rente, provisie en afsluitkosten.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het verschil tussen rente en JKP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De rente is alleen de prijs voor het lenen van geld. Het JKP is de totale prijs inclusief alle bijkomende kosten en geeft een completer beeld van de werkelijke kosten.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Krediet Calculator", item: "https://quotapp.nl/tools/krediet" },
  ],
};

export default function KredietCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <KredietCalculatorClient />
    </>
  );
}
