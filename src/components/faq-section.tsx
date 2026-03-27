import { JsonLd } from "@/components/json-ld";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQSection({ items, title = "Veelgestelde vragen", className = "" }: FAQSectionProps) {
  // Generate FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className={`py-8 ${className}`}>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group bg-muted/50 rounded-lg border border-border/50 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium hover:bg-muted transition-colors">
                <span>{item.question}</span>
                <svg
                  className="w-5 h-5 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
