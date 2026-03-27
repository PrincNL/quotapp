import { Metadata } from "next";
import { VerlofCalculatorClient } from "./verlof-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Verlof Calculator 2026 - Vakantiedagen & Uitbetaald Verlof Berekenen | QuotApp.nl",
  description: "Bereken je vakantiedagen, overgebleven verlof en uit te betalen verlofuren. Gratis verlof calculator voor werknemers in Nederland.",
  keywords: ["verlof calculator", "vakantiedagen berekenen", "uitbetaald verlof", "verlofuren", "werkdagen tellen"],
  openGraph: {
    title: "Verlof Calculator - Bereken Je Vakantiedagen en Verlofuren",
    description: "Reken uit hoeveel verlof je hebt en wat de waarde is",
    url: "https://quotapp.nl/tools/verlof",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/verlof",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Verlof Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken vakantiedagen en uit te betalen verlof",
  url: "https://quotapp.nl/tools/verlof",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel vakantiedagen heb ik wettelijk recht op?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wettelijk heb je recht op minimaal 4 keer het aantal uren dat je per week werkt. Bij een fulltime baan (40 uur) is dat 160 uur of 20 dagen.",
      },
    },
    {
      "@type": "Question",
      name: "Kan mijn werkgever verlof uitbetalen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wettelijk verlof mag niet worden uitbetaald, behalve bij einde dienstverband. Bovenwettelijk verlof kan wel worden uitbetaald als dit in de cao of arbeidsovereenkomst is afgesproken.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het verschil tussen wettelijk en bovenwettelijk verlof?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wettelijk verlof is het minimum dat de wet voorschrijft. Bovenwettelijk verlof is extra verlof dat je werkgever geeft boven op het wettelijk minimum.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Verlof Calculator", item: "https://quotapp.nl/tools/verlof" },
  ],
};

export default function VerlofCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <VerlofCalculatorClient />
    </>
  );
}
