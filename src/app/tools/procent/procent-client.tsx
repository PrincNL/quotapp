"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, RotateCcw, BookOpen, Lightbulb, Calculator, TrendingUp, TrendingDown } from "lucide-react";
import { useRecentTools } from "@/hooks/use-tool-storage";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { FeedbackForm } from "@/components/feedback-form";
import { StickyAd, InlineAd } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import Link from "next/link";

interface Resultaat {
  waarde: number;
}

const procentFAQ = [
  {
    question: "Hoe bereken ik een percentage van een bedrag?",
    answer: "Om een percentage van een bedrag te berekenen, vermenigvuldig je het bedrag met het percentage en deel je door 100. Bijvoorbeeld: 20% van €100 = (20 × 100) ÷ 100 = €20. Onze calculator doet dit automatisch voor je.",
  },
  {
    question: "Hoe bereken ik een procentuele stijging?",
    answer: "Gebruik de formule: ((Nieuwe waarde - Oude waarde) ÷ Oude waarde) × 100. Bijvoorbeeld: van €80 naar €100 = ((100-80) ÷ 80) × 100 = 25% stijging. Selecteer 'Verschil' in de calculator.",
  },
  {
    question: "Hoe bereken ik korting in procenten?",
    answer: "Voor korting: ((Oude prijs - Nieuwe prijs) ÷ Oude prijs) × 100. Of gebruik onze 'Verlaging' modus: voer de originele prijs in en het kortingspercentage. De calculator toont direct het nieuwe bedrag.",
  },
  {
    question: "Hoe reken ik BTW-percentages uit?",
    answer: "Voor 21% BTW: vermenigvuldig met 1,21. Voor 9% BTW: vermenigvuldig met 1,09. Om BTW eruit te halen: deel door 1,21 (of 1,09). Gebruik voor btw-berekeningen onze speciale BTW Calculator voor het beste resultaat.",
  },
  {
    question: "Wat is het verschil tussen bruto en netto percentage?",
    answer: "Bruto percentage is het percentage berekend over het totale bedrag. Netto percentage houdt rekening met aftrekposten of kosten. Bijvoorbeeld: 21% btw over €100 is €21 bruto, maar als je korting krijgt op het totaalbedrag, wordt het percentage netto anders.",
  },
];

export function ProcentCalculatorClient() {
  const [mode, setMode] = useState<"of" | "verhoging" | "verlaging" | "verschil">("of");
  const [waarde1, setWaarde1] = useState("");
  const [waarde2, setWaarde2] = useState("");
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { recordToolUsage } = useRecentTools();

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [waarde1, waarde2, mode]);

  useEffect(() => {
    if (resultaat) {
      recordToolUsage("Procent");
    }
  }, [resultaat, recordToolUsage]);

  const bereken = useCallback(() => {
    const num1 = parseFloat(waarde1.replace(",", ".")) || 0;
    const num2 = parseFloat(waarde2.replace(",", ".")) || 0;

    if (num1 === 0 && num2 === 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);
    let result = 0;

    switch (mode) {
      case "of":
        result = (num1 * num2) / 100;
        break;
      case "verhoging":
        result = num1 * (1 + num2 / 100);
        break;
      case "verlaging":
        result = num1 * (1 - num2 / 100);
        break;
      case "verschil":
        result = ((num2 - num1) / num1) * 100;
        break;
    }

    setResultaat({ waarde: Math.round(result * 100) / 100 });
    setTimeout(() => setIsCalculating(false), 150);
  }, [waarde1, waarde2, mode]);

  const reset = () => {
    setWaarde1("");
    setWaarde2("");
    setResultaat(null);
  };

  const formatNumber = (value: number) => {
    return value.toFixed(2).replace(".", ",");
  };

  const getLabels = () => {
    switch (mode) {
      case "of":
        return { label1: "Bedrag", label2: "Percentage", unit: "€" };
      case "verhoging":
      case "verlaging":
        return { label1: "Oorspronkelijk bedrag", label2: "Percentage", unit: "€" };
      case "verschil":
        return { label1: "Oude waarde", label2: "Nieuwe waarde", unit: "%" };
    }
  };

  const labels = getLabels();
  const resultText = resultaat
    ? `${mode === "of" ? "" : mode === "verschil" ? "Verschil: " : "Resultaat: "}${formatNumber(resultaat.waarde)}${mode === "verschil" ? "%" : ""}`
    : "";

  const getModeIcon = () => {
    switch (mode) {
      case "of":
        return <Percent className="w-5 h-5" />;
      case "verhoging":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "verlaging":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case "verschil":
        return <Calculator className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                <Percent className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Procent" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Procent Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken percentages eenvoudig: percentage van bedrag, verhoging, verlaging en procentueel verschil. 
              Handig voor kortingen, rente, btw en statistieken.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Input Section */}
            <motion.div className="md:col-span-2 card">
              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { key: "of", label: "Percentage van", desc: "Bereken X% van een bedrag" },
                  { key: "verhoging", label: "Verhoging", desc: "Verhoog een bedrag met X%" },
                  { key: "verlaging", label: "Verlaging", desc: "Verlaag een bedrag met X%" },
                  { key: "verschil", label: "Verschil", desc: "Bereken % verschil tussen twee waarden" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => {
                      setMode(m.key as typeof mode);
                      setResultaat(null);
                    }}
                    className={`py-3 px-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      mode === m.key
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    title={m.desc}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{labels.label1}</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={waarde1}
                    onChange={(e) => setWaarde1(e.target.value.replace(/[^0-9.,-]/g, ""))}
                    placeholder="0"
                    className="w-full px-4 py-3 input text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{labels.label2}</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={waarde2}
                    onChange={(e) => setWaarde2(e.target.value.replace(/[^0-9.,-]/g, ""))}
                    placeholder="0"
                    className="w-full px-4 py-3 input text-lg"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="Procent Calculator" 
                    result={resultText}
                    url="/tools/procent"
                  />
                )}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div className="card">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                {getModeIcon()}
                Resultaat
              </h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    <motion.div 
                      className="p-6 bg-[hsl(var(--calc-result-bg))] rounded-xl border-2 border-[hsl(var(--calc-highlight))] result-highlight"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Resultaat</p>
                      <p className="text-3xl font-bold text-[hsl(var(--calc-result-text))]">
                        {mode === "verschil" ? "" : mode === "of" ? "€ " : "€ "}
                        {formatNumber(resultaat.waarde)}
                        {mode === "verschil" ? "%" : ""}
                      </p>
                    </motion.div>

                    <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                      {mode === "of" && `${waarde2}% van €${waarde1}`}
                      {mode === "verhoging" && `€${waarde1} + ${waarde2}%`}
                      {mode === "verlaging" && `€${waarde1} - ${waarde2}%`}
                      {mode === "verschil" && `Van ${waarde1} naar ${waarde2}`}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Percent className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul waarden in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Ad after result */}
          <InlineAd slot="procent-after-result" />

          {/* SEO Content Section - Uitgebreid */}
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Wat is Procent Calculator */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-xl font-bold">Wat is de Procent Calculator?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De <strong>Procent Calculator</strong> is een veelzijdige online tool waarmee je 
                  allerlei <strong>percentage berekeningen</strong> kunt maken. Of je nu wilt weten 
                  hoeveel 20% korting is van een prijs, of je wilt berekenen hoeveel procent je 
                  salaris is gestegen - deze calculator helpt je.
                </p>
                <p>
                  Percentages komen overal in het dagelijks leven voor: bij kortingen in de winkel, 
                  rente op je spaarrekening, loonsverhogingen, en statistieken in het nieuws. 
                  Met deze tool worden al die berekeningen kinderspel.
                </p>
              </div>
            </div>

            {/* Waarom gebruiken */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Waarom deze calculator gebruiken?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ 4 berekeningsmodi</h3>
                  <p className="text-sm text-muted-foreground">
                    Percentage van, verhoging, verlaging en procentueel verschil.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Direct resultaat</h3>
                  <p className="text-sm text-muted-foreground">
                    Zie meteen het antwoord terwijl je typt.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Handig voor kortingen</h3>
                  <p className="text-sm text-muted-foreground">
                    Bereken sale-prijzen en kortingspercentages direct.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Zakelijk gebruik</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect voor marge-berekeningen, rente en statistieken.
                  </p>
                </div>
              </div>
            </div>

            {/* Formules */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Percentage formules</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">1. Percentage van een bedrag</h4>
                    <code className="text-sm bg-background px-2 py-1 rounded">(Percentage ÷ 100) × Bedrag</code>
                    <p className="text-sm mt-2">Voorbeeld: 20% van €150 = €30</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">2. Verhoging met percentage</h4>
                    <code className="text-sm bg-background px-2 py-1 rounded">Bedrag × (1 + Percentage ÷ 100)</code>
                    <p className="text-sm mt-2">Voorbeeld: €100 + 15% = €115</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">3. Verlaging (korting)</h4>
                    <code className="text-sm bg-background px-2 py-1 rounded">Bedrag × (1 - Percentage ÷ 100)</code>
                    <p className="text-sm mt-2">Voorbeeld: €100 - 25% = €75</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">4. Procentueel verschil</h4>
                    <code className="text-sm bg-background px-2 py-1 rounded">((Nieuw - Oud) ÷ Oud) × 100</code>
                    <p className="text-sm mt-2">Voorbeeld: Van 80 naar 100 = 25% stijging</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Praktische toepassingen */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Praktische toepassingen</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">🛒 Winkelen</h4>
                  <p className="text-sm text-muted-foreground">
                    Bereken kortingen tijdens de sale. Een jas van €120 met 30% korting = €84.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">💼 Zakelijk</h4>
                  <p className="text-sm text-muted-foreground">
                    Bereken marges en winstpercentages. Koop voor €50, verkoop voor €75 = 50% marge.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">📈 Salaris</h4>
                  <p className="text-sm text-muted-foreground">
                    Bereken loonsverhogingen. €3.000 met 5% verhoging = €3.150.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">🏦 Renteberekening</h4>
                  <p className="text-sm text-muted-foreground">
                    Bereken spaarrente. €10.000 tegen 2% = €200 rente per jaar.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ad before FAQ */}
          <InlineAd slot="procent-before-faq" />

          {/* FAQ Section */}
          <FAQSection items={procentFAQ} title="Veelgestelde vragen over percentages" />

          {/* Related Tools */}
          <RelatedTools currentTool="Procent Calculator" />

          {/* Feedback */}
          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Procent Calculator" />
          </div>
        </div>

        <StickyAd slot="procent-sidebar-1" />
      </div>
    </div>
  );
}
