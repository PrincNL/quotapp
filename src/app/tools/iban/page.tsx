import type { Metadata } from "next";
import { IBANCheckerClient } from "./iban-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "IBAN Check | IBAN Nummer Controle (Nederlands)",
  description: "Controleer of een IBAN nummer geldig is. Internationale IBAN validatie met mod 97 check. Gratis online IBAN checker.",
  keywords: ["iban check", "iban controle", "iban nummer valideren", "iban validatie", "nederlandse iban"],
  openGraph: {
    title: "IBAN Checker - Controleer IBAN Nummers",
    description: "Valideer IBAN nummers wereldwijd",
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
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Controleer of een IBAN nummer geldig is",
  url: "https://quotapp.nl/tools/iban",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe controleer je of een IBAN geldig is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een IBAN wordt gevalideerd met de MOD 97 algoritme. De eerste twee letters (landcode) en twee cijfers (controlegetal) worden naar het einde verplaatst, letters worden omgezet in cijfers, en het resultaat moet deelbaar zijn door 97.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang is een Nederlands IBAN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een Nederlands IBAN bestaat uit 18 tekens: NL + 2 cijfers + 4 letters (bankcode) + 10 cijfers (rekeningnummer).",
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

export default function IBANCheckerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <IBANCheckerClient />
    </>
  );
}
