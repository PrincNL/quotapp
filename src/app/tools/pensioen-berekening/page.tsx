import { Metadata } from "next";
import { PensioenCalculatorClient } from "./pensioen-berekening-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pensioen Berekening 2026 - Pensioenopbouw Simuleren | QuotApp.nl",
  description: "Simuleer je pensioenopbouw en ontdek wat je later aan pensioen krijgt. Pensioen calculator voor werknemers en zelfstandigen.",
  keywords: ["pensioen berekening", "pensioenopbouw simulatie", "ouderdoms pensioen", "pensioen verwachting"],
  openGraph: {
    title: "Pensioen Berekening - Simuleer Je Pensioenopbouw",
    description: "Ontdek wat je later aan pensioen krijgt",
    url: "https://quotapp.nl/tools/pensioen-berekening",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/pensioen-berekening",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pensioen Berekening",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Simuleer je pensioenopbouw en toekomstig pensioen",
  url: "https://quotapp.nl/tools/pensioen-berekening",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel pensioen bouw ik op?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dat hangt af van je pensioenregeling, je salaris en het aantal dienstjaren. Raadpleeg je Uniform Pensioenoverzicht (UPO) voor je exacte opbouw.",
      },
    },
    {
      "@type": "Question",
      name: "Heb ik genoeg pensioen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een vuistregel is dat je pensioen 70% van je laatste salaris moet zijn. Bereken of je hiermee uitkomt of dat je aanvullend pensioen nodig hebt.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Pensioen Berekening", item: "https://quotapp.nl/tools/pensioen-berekening" },
  ],
};

export default function PensioenBerekeningCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PensioenCalculatorClient />
    </>
  );
}
