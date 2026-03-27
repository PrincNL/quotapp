"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingDown, RotateCcw, Info, DollarSign } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface InflatieResultaat {
  jaar: number;
  prijsniveau: number;
  koopkracht: number;
  waardeVerlies: number;
}

const inflatieFAQ = [
  {
    question: "Wat is inflatie?",
    answer: "Inflatie is de stijging van het algemene prijsniveau van goederen en diensten. Bij inflatie kun je met hetzelfde geld minder kopen - je koopkracht neemt af.",
  },
  {
    question: "Wat is een normaal inflatiepercentage?",
    answer: "De Europese Centrale Bank streeft naar een inflatie van 2% per jaar. Historisch gezien was de inflatie in Nederland gemiddeld zo'n 2-3% per jaar.",
  },
  {
    question: "Hoe bereken je inflatie?",
    answer: "Inflatie wordt berekend met de formule: nieuw bedrag = oud bedrag × (1 + inflatiepercentage)^jaren. Dit heet exponentiële groei.",
  },
  {
    question: "Wat is het verschil tussen inflatie en prijsstijging?",
    answer: "Inflatie verwijst naar de algemene stijging van het prijsniveau in de economie. Prijsstijging kan per product verschillen. Sommige producten worden duurder, andere goedkoper.",
  },
  {
    question: "Hoe bescherm ik mijn spaargeld tegen inflatie?",
    answer: "Manieren om inflatie te bestrijden zijn: beleggen in aandelen of indexfondsen, investeren in vastgoed, of het kopen van inflatoire obligaties (TIPS).",
  },
  {
    question: "Wat is stagflatie?",
    answer: "Stagflatie is een situatie van stagnatie (lage groei) gecombineerd met inflatie. Dit is ongunstig omdat je spaargeld minder waard wordt terwijl de economie ook niet groeit.",
  },
];

export function InflatieCalculatorClient() {
  const [bedrag, setBedrag] = useState("10000");
  const [inflatie, setInflatie] = useState("2.5");
  const [jaren, setJaren] = useState("10");
  const [resultaat, setResultaat] = useState<InflatieResultaat[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const startBedrag = parseFloat(bedrag);
    const inflatiePct = parseFloat(inflatie) / 100;
    const looptijd = parseInt(jaren);

    if (isNaN(startBedrag) || isNaN(inflatiePct) || isNaN(looptijd) || 
        startBedrag <= 0 || inflatiePct < 0 || looptijd <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const resultaten: InflatieResultaat[] = [];
    
    for (let i = 0; i <= looptijd; i++) {
      const prijsniveau = Math.pow(1 + inflatiePct, i);
      const koopkracht = startBedrag / prijsniveau;
      const waardeVerlies = startBedrag - koopkracht;
      
      resultaten.push({
        jaar: i,
        prijsniveau: Math.round(prijsniveau * 1000) / 1000,
        koopkracht: Math.round(koopkracht * 100) / 100,
        waardeVerlies: Math.round(waardeVerlies * 100) / 100,
      });
    }

    setResultaat(resultaten);
    setTimeout(() => setIsCalculating(false), 150);
  }, [bedrag, inflatie, jaren]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setBedrag("10000");
    setInflatie("2.5");
    setJaren("10");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const eindResultaat = resultaat ? resultaat[resultaat.length - 1] : null;
  const totaalWaardeVerlies = eindResultaat ? eindResultaat.waardeVerlies : 0;
  const percentageWaardeVerlies = resultaat ? ((1 - 1/Math.pow(1 + parseFloat(inflatie)/100, parseInt(jaren))) * 100) : 0;

  const resultText = resultaat
    ? `Start: €${bedrag} | Inflatie: ${inflatie}% | ${jaren} jaar | Koopkracht: €${formatBedrag(eindResultaat?.koopkracht || 0)} | Verlies: €${formatBedrag(totaalWaardeVerlies)}`
    : "";

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
                <TrendingDown className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="InflatieCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Inflatie Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken het effect van inflatie op je spaargeld en 
              ontdek hoeveel koopkracht je verliest.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Inflatie Gegevens</h2>
              
              {/* Startbedrag */}
              <div className="mb-4">
                <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Startbedrag (€)
                  </span>
                </label>
                <input
                  id="bedrag"
                  type="text"
                  inputMode="decimal"
                  value={bedrag}
                  onChange={(e) => setBedrag(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["1000", "10000", "50000", "100000"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedrag(b)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        bedrag === b ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inflatiepercentage */}
              <div className="mb-4">
                <label htmlFor="inflatie" className="block text-sm font-medium mb-2">
                  Inflatiepercentage (%)
                </label>
                <input
                  id="inflatie"
                  type="number"
                  step="0.1"
                  value={inflatie}
                  onChange={(e) => setInflatie(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["1.5", "2", "2.5", "3", "4"].map((i) => (
                    <button
                      key={i}
                      onClick={() => setInflatie(i)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        inflatie === i ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {i}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Looptijd */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Periode (jaren)</label>
                <div className="flex gap-2">
                  {["5", "10", "15", "20", "30"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setJaren(j)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        jaren === j ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j} {j === "1" ? "jaar" : "jaar"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="Inflatie Calculator" 
                    result={resultText}
                    url="/tools/inflatie-calculator"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Koopkracht verlies */}
                    <motion.div 
                      className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Koopkracht over {jaren} jaar</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        € {formatBedrag(eindResultaat?.koopkracht || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Van €{parseFloat(bedrag).toLocaleString("nl-NL")}
                      </p>
                    </motion.div>

                    {/* Waarde verlies */}
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Waardevermindering</p>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        € {formatBedrag(totaalWaardeVerlies)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ({Math.round(percentageWaardeVerlies * 10) / 10}% van je spaargeld)
                      </p>
                    </div>

                    {/* Overzicht per jaar */}
                    <div className="max-h-64 overflow-y-auto space-y-1">
                      <p className="text-sm font-medium mb-2">Koopkracht per jaar</p>
                      {resultaat.filter((_, i) => i % Math.ceil(resultaat.length / 5) === 0 || i === resultaat.length - 1).map((r) => (
                        <div key={r.jaar} className="flex justify-between text-sm p-2 bg-muted rounded">
                          <span>Jaar {r.jaar}</span>
                          <span>€ {formatBedrag(r.koopkracht)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Info */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Wet van de grote getallen</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Een inflatie van {inflatie}% klinkt weinig, maar over {jaren} jaar 
                        ben je {Math.round(percentageWaardeVerlies)}% koopkracht kwijt!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Inflatie en Koopkracht</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>inflatie calculator</strong> bereken je eenvoudig hoeveel koopkracht je 
                spaargeld verliest door inflatie. Inflatie is de stille verwoester van vermogen - 
                zonder dat je het doorhebt wordt je geld minder waard.
              </p>
              <p className="mb-4">
                Een inflatie van slechts 2-3% per jaar lijkt weinig, maar over 20-30 jaar 
                kan dit flink oplopen. Je €10.000 is over 20 jaar bij 3% inflatie nog maar 
                €5.500 waard in koopkracht.
              </p>
              <p>
                Door te beleggen in aandelen, vastgoed of andere bezittingen kun je de inflatie 
                vaak compenseren of zelfs overtreffen. Vraag advies aan een financieel planner 
                als je wilt weten wat de beste strategie is voor jou.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={inflatieFAQ} title="Veelgestelde vragen over inflatie" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/spaarrente-vergelijker" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Spaarrente</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
