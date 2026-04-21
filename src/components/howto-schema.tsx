"use client";

import { JsonLd } from "./json-ld";

interface HowToStep {
  name: string;
  text: string;
  position: number;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  toolUrl: string;
}

// HowTo Schema voor tool pages - Google's rich result type
export function HowToSchema({ name, description, steps, toolUrl }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    image: {
      "@type": "ImageObject",
      "url": "https://quotapp.nl/og-image.svg",
      "width": 1200,
      "height": 630,
    },
    tool: {
      "@type": "WebApplication",
      "name": name,
      "url": toolUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
      },
    },
    step: steps.map((step) => ({
      "@type": "HowToStep",
      "position": step.position,
      "name": step.name,
      "text": step.text,
      "itemListElement": {
        "@type": "HowToDirection",
        "text": step.text,
      },
    })),
    "totalTime": `PT${steps.length * 2}M`, // Estimated time based on steps
    "supply": {
      "@type": "HowToSupply",
      "name": "Internetverbinding en invoergegevens",
    },
  };

  return <JsonLd data={schema} />;
}

// Video Schema voor explainer video's (als die worden toegevoegd)
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    uploadDate: uploadDate,
    duration: duration,
    embedUrl: "https://quotapp.nl/videos/embed/" + name.toLowerCase().replace(/\s+/g, "-"),
    width: 1280,
    height: 720,
  };

  return <JsonLd data={schema} />;
}

// Recipe Schema voor financiële calculators (alternatief HowTo)
export function RecipeSchema({
  name,
  description,
  prepTime,
  cookTime,
  keywords,
}: {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  keywords: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: name,
    description: description,
    keywords: keywords.join(", "),
    prepTime: prepTime,
    cookTime: cookTime,
    totalTime: prepTime,
    recipeCategory: "Calculator",
    recipeCuisine: "Netherlands",
  };

  return <JsonLd data={schema} />;
}

// Stap-voor-stap HowTo component voor UI
interface HowToProps {
  title: string;
  steps: { title: string; description: string }[];
}

export function HowTo({ title, steps }: HowToProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        {title}
      </h3>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <div>
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Example HowTo data voor BTW calculator
export const btwHowToSteps = [
  {
    name: "Voer uw bedrag in",
    text: "Typ het bedrag in het invoerveld. Dit kan een heel getal zijn (bijv. 100) of met decimalen (bijv. 99,99).",
    position: 1,
  },
  {
    name: "Kies het BTW percentage",
    text: "Selecteer 21% voor het standaardtarief of 9% voor het verlaagde tarief. Het juiste percentage is afhankelijk van het product of de dienst.",
    position: 2,
  },
  {
    name: "Selecteer berekeningstype",
    text: "Kies 'Exclusief naar Inclusief' om BTW toe te voegen, of 'Inclusief naar Exclusief' om BTW eruit te halen.",
    position: 3,
  },
  {
    name: "Bekijk het resultaat",
    text: "De calculator toont direct het bedrag exclusief BTW, het BTW bedrag, en het totaal inclusief BTW.",
    position: 4,
  },
];

export const hypotheekHowToSteps = [
  {
    name: "Voer uw inkomen in",
    text: "Vul uw bruto jaarinkomen in. Bij partners kunt u beide inkomens optellen voor een indicatie van de maximale hypotheek.",
    position: 1,
  },
  {
    name: "Geef de hypotheekrente op",
    text: "Voer de verwachte of huidige hypotheekrente in. Gebruik 3,5% als indicatie voor een 10-jaars rentevast periode.",
    position: 2,
  },
  {
    name: "Kies de looptijd",
    text: "Selecteer de gewenste looptijd van uw hypotheek, meestal 30 jaar voor een annuïteitenhypotheek.",
    position: 3,
  },
  {
    name: "Bekijk uw maandlasten",
    text: "De calculator toont uw geschatte bruto maandlasten, inclusief rente en aflossing.",
    position: 4,
  },
];
