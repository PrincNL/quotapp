import { Metadata } from "next";
import { IBANCheckerClient } from "./iban-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "IBAN Checker 2026 - IBAN Valideren & Controleren | QuotApp.nl",
  description: "Controleer of een IBAN nummer geldig is met onze gratis IBAN checker. Validatie voor Nederlandse en internationale IBAN nummers.",
  keywords: ["iban checker", "iban valideren", "iban controleren", "bankrekeningnummer", "iban validator"],
  openGraph: {
    title: "IBAN Checker - Valideer IBAN Nummers",
    description: "Controleer of een IBAN nummer geldig is",
    url: "https://quotapp.nl/tools/iban",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/iban",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "IBAN Checker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Valideer en controleer IBAN nummers",
  url: "https://quotapp.nl/tools/iban",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe controleer ik een IBAN nummer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Onze IBAN checker valideert het nummer automatisch met het MOD-97 algoritme. Voer de IBAN in (met of zonder spaties) en klik op Controleren.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het MOD-97 algoritme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het MOD-97 algoritme is een wiskundige controle die bestaat uit het verplaatsen van de landcode naar achteren, converteren naar cijfers, en controleren of de rest bij deling door 97 gelijk is aan 1.",
      },
    },
    {
      "@type": "Question",
      name: "Is een geldige IBAN garantie voor een bestaande rekening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee, een geldige IBAN betekent alleen dat de structuur correct is. Het garandeert niet dat de rekening actief is of dat het bij de juiste persoon hoort.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "IBAN Checker", item: "https://quotapp.nl/tools/iban" },
  ],
};

export default function IBANCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <IBANCheckerClient />
    </>
  );
}
