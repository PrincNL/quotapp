import type { Metadata } from "next";
import { BMICalculatorClient } from "./bmi-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "BMI Berekenen | Body Mass Index Calculator",
  description: "Bereken je BMI (Body Mass Index). Gezond gewicht check voor mannen en vrouwen. Gratis BMI calculator met visuele gauge.",
  keywords: ["bmi berekenen", "body mass index", "gezond gewicht", "bmi calculator", "gewicht lengte"],
  openGraph: {
    title: "BMI Calculator - Body Mass Index Berekenen",
    description: "Bereken je BMI en check of je een gezond gewicht hebt",
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
  description: "Bereken je Body Mass Index",
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
        text: "Een gezonde BMI ligt tussen de 18.5 en 24.9. Onder de 18.5 is ondergewicht, tussen 25 en 29.9 is overgewicht, en boven de 30 is obesitas.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe bereken je BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI = gewicht in kg / (lengte in meters)². Bijvoorbeeld: 70 kg en 1.75m = 70 / (1.75 × 1.75) = 22.9.",
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
