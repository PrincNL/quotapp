import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Calculator,
  CreditCard,
  Hash,
  Home,
  Percent,
  PiggyBank,
  Scale,
  Shield,
  TrendingUp,
  Type,
  Calendar,
  Wallet,
  Target,
} from "lucide-react";

interface Tool {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tools: Tool[] = [
  { name: "BTW Calculator", href: "/tools/btw", icon: Calculator, description: "Bereken 21%, 9% of 0% BTW" },
  { name: "Hypotheek Calculator", href: "/tools/hypotheek", icon: Banknote, description: "Maximale hypotheek berekenen" },
  { name: "Hypotheek Maandlasten", href: "/tools/hypotheek-maandlasten", icon: Home, description: "Exacte maandlasten inclusief rente" },
  { name: "Hypotheek Vergelijker", href: "/tools/hypotheek-vergelijker", icon: Home, description: "Vergelijk hypotheekopties en scenario's" },
  { name: "Huur vs Kopen", href: "/tools/huur-vs-koop", icon: Home, description: "Vergelijk kopen met blijven huren" },
  { name: "Extra Aflossing", href: "/tools/extra-aflossing", icon: Home, description: "Zie wat extra aflossen oplevert" },
  { name: "Lening Calculator", href: "/tools/lening", icon: CreditCard, description: "Persoonlijke lening en maandlasten" },
  { name: "Krediet Calculator", href: "/tools/krediet", icon: CreditCard, description: "Bereken kredietlimiet en kosten" },
  { name: "Auto Lening Calculator", href: "/tools/auto-lening", icon: CreditCard, description: "Bereken autolening en maandbedrag" },
  { name: "JKP Berekening", href: "/tools/jkp-berekening", icon: Percent, description: "Vergelijk de echte kosten van lenen" },
  { name: "Sparen Calculator", href: "/tools/sparen", icon: PiggyBank, description: "Bereken rente-op-rente en spaargroei" },
  { name: "Spaardoel Calculator", href: "/tools/spaardoel-calculator", icon: Target, description: "Maak een plan voor je spaardoel" },
  { name: "Spaarrente Vergelijker", href: "/tools/spaarrente-vergelijker", icon: TrendingUp, description: "Vergelijk actuele spaarrentes" },
  { name: "Buffer Calculator", href: "/tools/buffer-calculator", icon: Wallet, description: "Bereken je ideale financiële buffer" },
  { name: "Inflatie Calculator", href: "/tools/inflatie-calculator", icon: TrendingUp, description: "Zie wat inflatie met je geld doet" },
  { name: "Verzekeringen Vergelijken", href: "/tools/verzekeringen-vergelijken", icon: Shield, description: "Zorg, auto en inboedel vergelijken" },
  { name: "Persoonlijke Financiën", href: "/tools/persoonlijke-financiën", icon: Wallet, description: "Overzicht van inkomsten en uitgaven" },
  { name: "Zorgplicht Calculator", href: "/tools/zorgplicht-calculator", icon: Shield, description: "Check of je financiële lasten te hoog zijn" },
  { name: "Rente Calculator", href: "/tools/rente", icon: TrendingUp, description: "Bereken rente-op-rente of aflossing" },
  { name: "Procent Calculator", href: "/tools/procent", icon: Percent, description: "Alle percentage berekeningen" },
  { name: "IBAN Checker", href: "/tools/iban", icon: Hash, description: "Controleer IBAN nummers" },
  { name: "Tekst Tools", href: "/tools/tekst", icon: Type, description: "Woorden en karakters tellen" },
  { name: "Valuta Converter", href: "/tools/valuta", icon: TrendingUp, description: "Valuta omrekenen" },
  { name: "Datum Calculator", href: "/tools/datum", icon: Calendar, description: "Dagen tussen datums" },
  { name: "BMI Calculator", href: "/tools/bmi", icon: Scale, description: "Body Mass Index berekenen" },
];

const toolMap = new Map(tools.map((tool) => [tool.name, tool]));

const relatedToolGroups: Record<string, string[]> = {
  "Hypotheek Calculator": [
    "Hypotheek Maandlasten",
    "Hypotheek Vergelijker",
    "Huur vs Kopen",
    "Extra Aflossing",
  ],
  "Lening Calculator": [
    "Krediet Calculator",
    "JKP Berekening",
    "Auto Lening Calculator",
    "Rente Calculator",
  ],
  "Sparen Calculator": [
    "Spaardoel Calculator",
    "Spaarrente Vergelijker",
    "Buffer Calculator",
    "Inflatie Calculator",
  ],
  "Verzekeringen Vergelijken": [
    "Persoonlijke Financiën",
    "Buffer Calculator",
    "Zorgplicht Calculator",
    "Sparen Calculator",
  ],
};

interface RelatedToolsProps {
  currentTool?: string;
  limit?: number;
  className?: string;
}

export function RelatedTools({ currentTool, limit = 4, className = "" }: RelatedToolsProps) {
  const mappedTools = currentTool
    ? (relatedToolGroups[currentTool] || [])
        .map((toolName) => toolMap.get(toolName))
        .filter((tool): tool is Tool => Boolean(tool))
    : [];

  const fallbackTools = tools.filter((tool) => tool.name !== currentTool);
  const relatedTools = (mappedTools.length > 0 ? mappedTools : fallbackTools).slice(0, limit);

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
