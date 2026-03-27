"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "./json-ld";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  schemaEnabled?: boolean;
  pageUrl?: string;
}

export function FAQ({ items, title = "Veelgestelde vragen", schemaEnabled = true, pageUrl }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate FAQ Schema if enabled
  const faqSchema = schemaEnabled ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item, index) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
      ...(pageUrl && {
        url: pageUrl + "#faq-" + index,
      }),
    })),
  } : null;

  return (
    <>
      {schemaEnabled && faqSchema && <JsonLd data={faqSchema} />}
      
      <section className="my-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {title}
        </h2>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              id={"faq-" + index}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-card hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={"faq-answer-" + index}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                id={"faq-answer-" + index}
                className={`px-5 pb-4 pt-2 text-muted-foreground ${
                  openIndex === index ? "block" : "hidden"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// Common FAQ items for financial calculators
export const btwFaqItems: FAQItem[] = [
  {
    question: "Hoe werkt de BTW calculator?",
    answer: "Vul het bedrag in, kies het BTW percentage (21%, 9% of 0%), en klik op berekenen. De calculator toont automatisch het bedrag exclusief BTW, het BTW bedrag, en het totaal inclusief BTW.",
  },
  {
    question: "Wat is het hoge BTW tarief in Nederland?",
    answer: "Het hoge BTW tarief in Nederland is 21%. Dit tarief geldt voor de meeste producten en diensten zoals elektronica, kleding, meubels en professionele diensten.",
  },
  {
    question: "Wat is het lage BTW tarief in Nederland?",
    answer: "Het lage BTW tarief in Nederland is 9%. Dit geldt voor eerste levensbehoeften zoals voedsel, dranken, boeken, kranten, openbaar vervoer en woningrenovatie.",
  },
  {
    question: "Hoe reken ik BTW uit een totaalbedrag?",
    answer: "Selecteer 'Incl. BTW → Excl. BTW' in de calculator, vul het totaalbedrag in, en kies het juiste percentage. De calculator berekent automatisch het exclusieve bedrag en het BTW bedrag.",
  },
  {
    question: "Is BTW inbegrepen in de prijs bij de kassa?",
    answer: "Ja, in Nederland moet de consumentenprijs altijd inclusief BTW worden weergegeven. De prijs die je in de winkel ziet is dus inclusief BTW.",
  },
];

export const hypotheekFaqItems: FAQItem[] = [
  {
    question: "Hoeveel kan ik maximaal lenen voor een hypotheek?",
    answer: "Als vuistregel kun je ongeveer 4,5 tot 5 keer je bruto jaarinkomen lenen. Met een partner worden beide inkomens opgeteld. Gebruik onze hypotheek calculator voor een indicatie.",
  },
  {
    question: "Wat is het verschil tussen annuïteiten- en lineaire hypotheek?",
    answer: "Bij een annuïteitenhypotheek blijven je maandlasten gelijk (als de rente vaststaat), maar los je aan het begin weinig af en later steeds meer. Bij een lineaire hypotheek los je elke maand hetzelfde bedrag af, dus dalen je maandlasten.",
  },
  {
    question: "Wat is NHG (Nationale Hypotheek Garantie)?",
    answer: "NHG is een garantie op je hypotheek. Als je jouw hypotheek niet meer kunt betalen en je huis moet verkopen, dan zorgt NHG ervoor dat je restschuld wordt kwijtgescholden. In 2025 is de NHG-grens €435.000.",
  },
  {
    question: "Moet ik eigen geld hebben voor een hypotheek?",
    answer: "Niet perse. Met NHG kun je vaak 100% van de woningwaarde financieren. Wel moet je rekening houden met bijkomende kosten zoals notariskosten, taxatie en advies (kosten koper).",
  },
  {
    question: "Hoeveel eigen geld heb ik nodig als ik geen NHG neem?",
    answer: "Zonder NHG kun je meestal maximaal 90-100% van de woningwaarde lenen. Je hebt eigen geld nodig voor de kosten koper (circa 2-5% van de koopsom) en eventueel het verschil tussen lening en koopsom.",
  },
];

export const procentFaqItems: FAQItem[] = [
  {
    question: "Hoe bereken je 21% van een bedrag?",
    answer: "Vermenigvuldig het bedrag met 0,21 (of deel door 100 en vermenigvuldig met 21). Bijvoorbeeld: €100 × 0,21 = €21.",
  },
  {
    question: "Hoe bereken je een percentage van iets?",
    answer: "Deel het percentage door 100 en vermenigvuldig met het totaal. Bijvoorbeeld 15% van €80 = (15/100) × €80 = €12.",
  },
  {
    question: "Hoe bereken je een stijging in percentage?",
    answer: "Gebruik de formule: ((Nieuw - Oud) / Oud) × 100. Bijvoorbeeld: prijs gaat van €50 naar €60 = ((60-50)/50) × 100 = 20% stijging.",
  },
  {
    question: "Hoe bereken je korting percentage?",
    answer: "Gebruik de formule: ((Oud - Nieuw) / Oud) × 100. Bijvoorbeeld: was €80, nu €60 = ((80-60)/80) × 100 = 25% korting.",
  },
];
