"use client";

import { motion } from "framer-motion";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const toolCombos = [
  {
    title: "Ondernemer Pakket",
    description: "Alle tools voor ondernemers",
    tools: ["BTW", "Procent", "Valuta"],
    color: "from-blue-500 to-cyan-500",
    icon: Calculator,
  },
  {
    title: "Financieel Pakket",
    description: "Tools voor je financiën",
    tools: ["Hypotheek", "BMI", "Procent"],
    color: "from-green-500 to-emerald-500",
    icon: Calculator,
  },
  {
    title: "Dagelijkse Tools",
    description: "Meest gebruikte combinaties",
    tools: ["Datum", "Tekst", "IBAN"],
    color: "from-purple-500 to-pink-500",
    icon: Calculator,
  },
];

const toolLinks: Record<string, string> = {
  "BTW": "/tools/btw",
  "Hypotheek": "/tools/hypotheek",
  "Procent": "/tools/procent",
  "IBAN": "/tools/iban",
  "Tekst": "/tools/tekst",
  "Valuta": "/tools/valuta",
  "Datum": "/tools/datum",
  "BMI": "/tools/bmi",
};

export function ToolCombos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Handige Combinaties</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {toolCombos.map((combo) => (
          <div
            key={combo.title}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br p-[1px]"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative h-full bg-card rounded-xl p-4">
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${combo.color} text-white mb-3`}>
                <combo.icon className="w-4 h-4" />
              </div>
              
              <h3 className="font-semibold mb-1">{combo.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{combo.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {combo.tools.map((tool) => (
                  <Link
                    key={tool}
                    href={toolLinks[tool]}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                  >
                    {tool}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
