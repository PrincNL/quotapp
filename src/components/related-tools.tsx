import Link from "next/link";
import { Calculator, Percent, Hash, Type, Calendar, Scale, Banknote, TrendingUp, ArrowRight } from "lucide-react";

interface Tool {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tools: Tool[] = [
  { name: "BTW Calculator", href: "/tools/btw", icon: Calculator, description: "Bereken 21%, 9% of 0% BTW" },
  { name: "Hypotheek Calculator", href: "/tools/hypotheek", icon: Banknote, description: "Maximale hypotheek berekenen" },
  { name: "Procent Calculator", href: "/tools/procent", icon: Percent, description: "Alle percentage berekeningen" },
  { name: "IBAN Checker", href: "/tools/iban", icon: Hash, description: "Controleer IBAN nummers" },
  { name: "Tekst Tools", href: "/tools/tekst", icon: Type, description: "Woorden en karakters tellen" },
  { name: "Valuta Converter", href: "/tools/valuta", icon: TrendingUp, description: "Valuta omrekenen" },
  { name: "Datum Calculator", href: "/tools/datum", icon: Calendar, description: "Dagen tussen datums" },
  { name: "BMI Calculator", href: "/tools/bmi", icon: Scale, description: "Body Mass Index berekenen" },
];

interface RelatedToolsProps {
  currentTool?: string;
  limit?: number;
  className?: string;
}

export function RelatedTools({ currentTool, limit = 4, className = "" }: RelatedToolsProps) {
  const relatedTools = tools
    .filter((tool) => tool.name !== currentTool)
    .slice(0, limit);

  return (
    <section className={`py-8 ${className}`}>
      <h2 className="text-xl font-bold mb-4">Gerelateerde tools</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {relatedTools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
          >
            <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{tool.name}</p>
              <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
