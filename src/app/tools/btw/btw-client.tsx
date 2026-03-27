"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, RotateCcw, Info, Heart, Share2, Printer, Download, BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import { useRecentTools } from "@/hooks/use-tool-storage";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { FeedbackForm } from "@/components/feedback-form";
import { StickyAd, InlineAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import Link from "next/link";

interface Resultaat {
  excl: number;
  btw: number;
  incl: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const btwFAQ = [
  {
    question: "Hoe werkt de BTW calculator?",
    answer: "Vul het bedrag in, kies het BTW percentage (21%, 9% of 0%), en klik op berekenen. De calculator toont automatisch het bedrag exclusief BTW, het BTW bedrag, en het totaal inclusief BTW. Je kunt kiezen of je wilt berekenen van exclusief naar inclusief, of andersom.",
  },
  {
    question: "Wat is het hoge BTW tarief in Nederland?",
    answer: "Het hoge BTW tarief in Nederland is 21%. Dit tarief geldt voor de meeste producten en diensten. Het wordt ook wel het standaardtarief genoemd.",
  },
  {
    question: "Wat is het lage BTW tarief in Nederland?",
    answer: "Het lage BTW tarief in Nederland is 9%. Dit geldt voor onder andere eten en drinken (niet-alcoholisch), boeken, tijdschriften, kranten, en arbeid voor woningonderhoud en -renovatie.",
  },
  {
    question: "Hoe reken ik BTW uit een totaalbedrag?",
    answer: "Selecteer 'Incl. BTW → Excl. BTW' in de calculator, vul het totaalbedrag in, en kies het juiste percentage. De calculator toont het exclusieve bedrag en het BTW bedrag. Bij 21% BTW deel je het totaal door 1,21. Bij 9% BTW deel je door 1,09.",
  },
  {
    question: "Welke producten hebben 0% BTW?",
    answer: "0% BTW geldt voor bepaalde goederen en diensten zoals: export van goederen naar landen buiten de EU, onderwijs door erkende instellingen, gezondheidszorg door erkende zorgverleners, en financiële diensten zoals verzekeringen en bankdiensten.",
  },
  {
    question: "Hoe bereken ik BTW bij een korting?",
    answer: "Bereken eerst het bedrag na korting, en bereken dan de BTW over dat lager bedrag. Als een artikel van €100 (exclusief) €20 korting krijgt, bereken je 21% BTW over €80 = €16,80. Het totaalbedrag is dan €96,80.",
  },
];

export function BTWCalculatorClient() {
  const [bedrag, setBedrag] = useState("");
  const [btwType, setBtwType] = useState<21 | 9 | 0>(21);
  const [mode, setMode] = useState<"excl" | "incl">("excl");
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { recordToolUsage } = useRecentTools();

  // Live calculation with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bedrag, btwType, mode]);

  // Record usage when result is shown
  useEffect(() => {
    if (resultaat) {
      recordToolUsage("BTW");
    }
  }, [resultaat, recordToolUsage]);

  const bereken = useCallback(() => {
    const bedragNum = parseFloat(bedrag.replace(",", "."));
    if (isNaN(bedragNum) || bedragNum < 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    let excl: number, btw: number, incl: number;

    if (mode === "excl") {
      excl = bedragNum;
      btw = bedragNum * (btwType / 100);
      incl = excl + btw;
    } else {
      incl = bedragNum;
      excl = incl / (1 + btwType / 100);
      btw = incl - excl;
    }

    setResultaat({
      excl: Math.round(excl * 100) / 100,
      btw: Math.round(btw * 100) / 100,
      incl: Math.round(incl * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [bedrag, btwType, mode]);

  const reset = () => {
    setBedrag("");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toFixed(2).replace(".", ",");
  };

  const resultText = resultaat
    ? `Excl. BTW: €${formatBedrag(resultaat.excl)} | BTW (${btwType}%): €${formatBedrag(resultaat.btw)} | Incl. BTW: €${formatBedrag(resultaat.incl)}`
    : "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* TOP BANNER AD - New placement for tool pages */}
      <ToolTopBannerAd slot={AD_SLOTS.toolTop} />
      
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="BTW" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              BTW Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken BTW over elk bedrag. Ondersteunt 21%, 9% en 0%. 
              Directe berekening van exclusief naar inclusief BTW en vice versa.
              <span className="sr-only">
                Gratis online BTW calculator voor Nederlandse ondernemers.
              </span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Input Section */}
            <motion.div 
              className="md:col-span-2 card"
              variants={fadeInUp}
            >
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-6" role="group" aria-label="Berekeningsmodus">
                {[
                  { key: "excl", label: "Excl. → Incl.", desc: "Bedrag exclusief BTW naar inclusief BTW" },
                  { key: "incl", label: "Incl. → Excl.", desc: "Bedrag inclusief BTW naar exclusief BTW" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => {
                      setMode(m.key as "excl" | "incl");
                      setResultaat(null);
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      mode === m.key
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    aria-pressed={mode === m.key}
                    title={m.desc}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
                  {mode === "excl" ? "Bedrag exclusief BTW" : "Bedrag inclusief BTW"}
                  <span className="sr-only"> in euro's</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="bedrag"
                    type="text"
                    inputMode="decimal"
                    value={bedrag}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.,]/g, "");
                      setBedrag(value);
                    }}
                    placeholder="0,00"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                    aria-describedby="bedrag-hint"
                  />
                </div>
                <p id="bedrag-hint" className="text-xs text-muted-foreground mt-1">
                  Gebruik een komma of punt voor decimalen
                </p>
              </div>

              {/* BTW Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">BTW Percentage</label>
                <div className="flex gap-2" role="radiogroup" aria-label="BTW percentage">
                  {[21, 9, 0].map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => setBtwType(percentage as 21 | 9 | 0)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        btwType === percentage
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      role="radio"
                      aria-checked={btwType === percentage}
                    >
                      {percentage}%
                    </button>
                  ))}
                </div>
                <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    {btwType === 21 && "Hoog tarief (standaard voor de meeste producten en diensten)"}
                    {btwType === 9 && "Laag tarief (eten, boeken, arbeid voor woningonderhoud)"}
                    {btwType === 0 && "Vrijgesteld (export, onderwijs, gezondheidszorg)"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  aria-label="Reset calculator"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="BTW Calculator" 
                    result={resultText}
                    url="/tools/btw"
                  />
                )}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div 
              className="card"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-bold mb-4">Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Exclusief */}
                    <motion.div 
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        mode === "incl" 
                          ? "bg-[hsl(var(--calc-result-bg))] border-[hsl(var(--calc-highlight))] result-highlight" 
                          : "bg-muted border-transparent"
                      }`}
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-sm text-muted-foreground">Exclusief BTW</p>
                      <p className="text-2xl font-bold">€ {formatBedrag(resultaat.excl)}</p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* BTW */}
                    <motion.div 
                      className="p-4 bg-[hsl(var(--warning-muted))] rounded-lg"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.15, delay: 0.05 }}
                    >
                      <p className="text-sm text-muted-foreground">BTW ({btwType}%)</p>
                      <p className="text-xl font-bold text-[hsl(var(--warning))]">€ {formatBedrag(resultaat.btw)}</p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Inclusief */}
                    <motion.div 
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        mode === "excl" 
                          ? "bg-[hsl(var(--calc-result-bg))] border-[hsl(var(--calc-highlight))] result-highlight" 
                          : "bg-muted border-transparent"
                      }`}
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.15, delay: 0.1 }}
                    >
                      <p className="text-sm text-muted-foreground">Inclusief BTW</p>
                      <p className="text-2xl font-bold">€ {formatBedrag(resultaat.incl)}</p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                    >
                      <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    </motion.div>
                    <p>Vul een bedrag in om te berekenen</p>
                    <p className="text-sm mt-1">De berekening gebeurt automatisch</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Ad after result */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content Section - Uitgebreid */}
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Wat is BTW Calculator */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold">Wat is de BTW Calculator?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De <strong>BTW Calculator</strong> is een handige online tool waarmee je moeiteloos 
                  <strong> btw berekenen</strong> kunt over elk bedrag. Of je nu wilt weten hoeveel 
                  <strong> 21% btw</strong> is over een productprijs, of je wilt de <strong>9% btw</strong> 
                  berekenen voor voedingsmiddelen - onze calculator doet het werk voor je.
                </p>
                <p>
                  De tool is speciaal ontwikkeld voor Nederlandse ondernemers, boekhouders, en iedereen 
                  die regelmatig met btw-berekeningen te maken heeft. Je kunt eenvoudig schakelen tussen 
                  alle gangbare btw-tarieven in Nederland: 21% (hoog tarief), 9% (laag tarief) en 0% (vrijgesteld).
                </p>
              </div>
            </div>

            {/* Waarom gebruiken */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Waarom deze BTW Calculator gebruiken?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Direct resultaat</h3>
                  <p className="text-sm text-muted-foreground">
                    De berekening gebeurt automatisch terwijl je typt. Geen wachttijden, geen pagina-herladingen.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Alle tarieven</h3>
                  <p className="text-sm text-muted-foreground">
                    Ondersteunt alle Nederlandse btw-tarieven: 21%, 9% en 0%.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Bidirectioneel</h3>
                  <p className="text-sm text-muted-foreground">
                    Reken van exclusief naar inclusief btw, of juist andersom.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ 100% Privé</h3>
                  <p className="text-sm text-muted-foreground">
                    Alle berekeningen gebeuren in je browser. Geen data wordt opgeslagen.
                  </p>
                </div>
              </div>
            </div>

            {/* Voorbeelden */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Calculator className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-xl font-bold">Voorbeelden van BTW berekeningen</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Voorbeeld 1: Laptop kopen (21% BTW)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Je koopt een laptop voor €1.000 exclusief BTW. Wat betaal je inclusief?
                  </p>
                  <div className="text-sm bg-muted p-3 rounded">
                    <p>€1.000 × 1,21 = <strong>€1.210</strong> (inclusief €210 btw)</p>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Voorbeeld 2: Restaurant bezoek (9% BTW)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    De rekening in het restaurant is €32,70 inclusief BTW. Wat is de prijs exclusief?
                  </p>
                  <div className="text-sm bg-muted p-3 rounded">
                    <p>€32,70 ÷ 1,09 = <strong>€30,00</strong> (€2,70 btw)</p>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Voorbeeld 3: Factuur maken</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Je levert diensten voor €500. Hoe ziet je factuur eruit?
                  </p>
                  <div className="text-sm bg-muted p-3 rounded">
                    <p>€500,00 (exclusief)</p>
                    <p>€105,00 (21% btw)</p>
                    <p><strong>€605,00</strong> (inclusief)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Uitleg hoe het werkt */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Hoe werkt BTW berekenen?</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  <strong>BTW (Belasting Toegevoegde Waarde)</strong> is een belasting die wordt geheven 
                  op goederen en diensten. In Nederland zijn er drie btw-tarieven:
                </p>
                
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>
                    <strong>21% btw (hoog tarief):</strong> Dit is het standaardtarief voor de meeste 
                    producten en diensten. Denk aan elektronica, kleding, meubels, en professionele diensten.
                  </li>
                  <li>
                    <strong>9% btw (laag tarief):</strong> Dit tarief geldt voor eerste levensbehoeften 
                    zoals eten en drinken, boeken, kranten, en arbeid voor woningonderhoud.
                  </li>
                  <li>
                    <strong>0% btw:</strong> Voor specifieke situaties zoals export buiten de EU, 
                    onderwijs, en gezondheidszorg.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">Formules voor btw berekenen</h3>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="mb-2"><strong>Exclusief → Inclusief (21%):</strong></p>
                  <p className="font-mono text-sm">Bedrag × 1,21 = Totaal inclusief btw</p>
                </div>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="mb-2"><strong>Inclusief → Exclusief (21%):</strong></p>
                  <p className="font-mono text-sm">Bedrag ÷ 1,21 = Bedrag exclusief btw</p>
                </div>
                <p>
                  Met onze calculator hoef je deze berekeningen niet zelf te doen. Vul simpelweg het 
                  bedrag in en kies het juiste btw-percentage. De tool berekent automatisch alle waarden 
                  en toont een duidelijk overzicht.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ad after result - lazy loaded */}
          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          {/* Ad before FAQ */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* FAQ Section */}
          <FAQSection items={btwFAQ} title="Veelgestelde vragen over BTW berekenen" />

          {/* Related Tools */}
          <RelatedTools currentTool="BTW Calculator" />

          {/* Feedback */}
          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="BTW Calculator" />
          </div>

          {/* BOTTOM AD - New for tool pages */}
          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        {/* Sticky Ad Sidebar */}
        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
