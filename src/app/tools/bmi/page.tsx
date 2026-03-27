import { Metadata } from "next";
import { BMICalculatorClient } from "./bmi-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "BMI Calculator 2026 - Body Mass Index Berekenen | QuotApp.nl",
  description: "Bereken je BMI (Body Mass Index) en ontdek of je een gezond gewicht hebt. Gratis BMI calculator voor volwassenen.",
  keywords: ["bmi calculator", "body mass index", "gezond gewicht", "bmi berekenen", "overgewicht"],
  openGraph: {
    title: "BMI Calculator - Bereken Je Body Mass Index",
    description: "Ontdek of je een gezond gewicht hebt met onze BMI calculator",
    url: "https://quotapp.nl/tools/bmi",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/bmi",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMI Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je Body Mass Index en ontdek je gewichtscategorie",
  url: "https://quotapp.nl/tools/bmi",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is een gezonde BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een BMI tussen 18.5 en 24.9 wordt als gezond beschouwd voor volwassenen. Onder 18.5 is ondergewicht, 25-29.9 is overgewicht, en 30+ is obesitas.",
      },
    },
    {
      "@type": "Question",
      name: "Is BMI geschikt voor iedereen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is een indicatie maar niet geschikt voor iedereen. Het houdt geen rekening met spiermassa, botdichtheid, leeftijd en etniciteit. Raadpleeg een arts voor persoonlijk advies.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe wordt BMI berekend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI wordt berekend door het gewicht in kilogram te delen door de lengte in meters in het kwadraat. Bijvoorbeeld: 70kg / (1.75m)² = 22.9 BMI.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "BMI Calculator", item: "https://quotapp.nl/tools/bmi" },
  ],
};

export default function BMICalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BMICalculatorClient />
    </>
  );
}
