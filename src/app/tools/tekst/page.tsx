import type { Metadata } from "next";
import { TekstToolsClient } from "./tekst-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Tekst Analyse | Woorden Tellen, Karakters, Leestijd",
  description: "Analyseer je tekst: woorden tellen, karakters tellen, leestijd berekenen, zinnen tellen. Handige tekst tools voor schrijvers.",
  keywords: ["woorden tellen", "karakters tellen", "tekst analyse", "leestijd", "zinnen tellen"],
  openGraph: {
    title: "Tekst Tools - Woorden en Karakters Tellen",
    description: "Analyseer en bewerk je tekst",
    url: "https://quotapp.nl/tools/tekst",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/tekst",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tekst Tools",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Analyseer je tekst met woorden tellen en meer",
  url: "https://quotapp.nl/tools/tekst",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe bereken je leestijd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De gemiddelde leessnelheid is ongeveer 200-250 woorden per minuut. Deze tool gebruikt 200 wpm als uitgangspunt voor de leestijdberekening.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Tekst Tools", item: "https://quotapp.nl/tools/tekst" },
  ],
};

export default function TekstToolsPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TekstToolsClient />
    </>
  );
}
