import Link from "next/link";
import { Calculator, Percent, Hash, Type, Calendar, Scale, Banknote, TrendingUp, ArrowRight } from "lucide-react";

const tools = [
  {
    name: "BTW Calculator",
    description: "Bereken 21%, 9% of 0% BTW eenvoudig",
    href: "/tools/btw",
    icon: Calculator,
    color: "bg-blue-500",
    popular: true,
  },
  {
    name: "Hypotheek Calculator",
    description: "Bereken je maandlasten en maximale hypotheek",
    href: "/tools/hypotheek",
    icon: Banknote,
    color: "bg-green-500",
    popular: true,
  },
  {
    name: "Procent Calculator",
    description: "Percentage berekeningen makkelijk gemaakt",
    href: "/tools/procent",
    icon: Percent,
    color: "bg-purple-500",
    popular: true,
  },
  {
    name: "IBAN Checker",
    description: "Controleer of je IBAN geldig is",
    href: "/tools/iban",
    icon: Hash,
    color: "bg-orange-500",
  },
  {
    name: "Tekst Tools",
    description: "Woorden tellen, karakters tellen, leestijd",
    href: "/tools/tekst",
    icon: Type,
    color: "bg-pink-500",
  },
  {
    name: "Valuta Converter",
    description: "EUR, USD, GBP en meer valuta's",
    href: "/tools/valuta",
    icon: TrendingUp,
    color: "bg-indigo-500",
  },
  {
    name: "Datum Calculator",
    description: "Dagen tussen datums, werkdagen tellen",
    href: "/tools/datum",
    icon: Calendar,
    color: "bg-teal-500",
  },
  {
    name: "BMI Calculator",
    description: "Bereken je Body Mass Index",
    href: "/tools/bmi",
    icon: Scale,
    color: "bg-red-500",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <!-- Hero Section -->
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Gratis Online Rekentools
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Handige Nederlandse rekentools voor dagelijks gebruik. 
          Snel, accuraat en helemaal gratis!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Calculator className="w-4 h-4" /> 8+ Tools</span>
          <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 100% Gratis</span>
          <span className="flex items-center gap-1"><ArrowRight className="w-4 h-4" /> Geen registratie</span>
        </div>
      </div>

      <!-- Tools Grid -->
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${tool.color} p-3 rounded-lg text-white`}>
                <tool.icon className="w-6 h-6" />
              </div>
              {tool.popular && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                  Populair
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">
              {tool.name}
            </h3>
            
            <p className="text-gray-600 text-sm">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>

      <!-- SEO Text -->
      <div className="mt-16 max-w-3xl mx-auto text-center text-gray-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Waarom QuotApp.nl?
        </h2>
        <p className="mb-4">
          Wij bieden een verzameling van de meest gebruikte online rekentools voor Nederlanders. 
          Van het berekenen van BTW tot het controleren van je IBAN - alles werkt direct in je browser 
          zonder gedoe.
        </p>
        
        <p>
          Onze tools worden dagelijks gebruikt door ondernemers, studenten, en iedereen die snel 
          een berekening wilt maken. Bookmark deze pagina voor snelle toegang!
        </p>
      </div>
    </div>
  );
}
