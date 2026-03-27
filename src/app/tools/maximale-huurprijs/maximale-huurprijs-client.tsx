"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Home, RotateCcw, CheckCircle, XCircle, Info } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface HuurResultaat {
  puntenTotaal: number;
  maximaleHuur: number;
  minimaleHuur: number;
  hurenBovenWAZ: boolean;
  huidigeHuur: number;
  verschil: number;
}

const puntWaarden = {
  woonoppervlakte: 0.75,  // per m²
  tuin: 15,               // per m² (max 100)
  energielabel: {
    "A": 40,
    "B": 32,
    "C": 24,
    "D": 16,
    "E": 8,
    "F": 0,
    "G": 0,
  },
  isolatie: 10,
  CVKetel: 10,
  zonnepanelen: 15,
  sanitair: 8,
  keuken: 12,
  kunststofKozijnen: 5,
  parkeerplaats: 10,
};

const huurFAQ = [
  {
    question: "Hoe wordt de maximale huurprijs berekend?",
    answer: "De maximale huur wordt berekend op basis van het woningwaarderingsstelsel (WWS). Voor elke kwaliteit van de woning krijg je punten. Hoe meer punten, hoe hoger de toegestane huur.",
  },
  {
    question: "Wat is het woningwaarderingsstelsel (WWS)?",
    answer: "Het WWS is een puntenstelsel waarmee de kwaliteit van een woning wordt beoordeeld. Punten worden gegeven voor zaken als oppervlakte, isolatie, en voorzieningen.",
  },
  {
    question: "Wat is het verschil tussen liberalisatie- en sociale huur?",
    answer: "Sociale huurwoningen hebben een maximale huur van €879,66 (2026). Woningen boven de liberalisatiegrens (€879,66 - €1.157,95) zijn middenhuur. Daarboven ben je in de vrije sector.",
  },
  {
    question: "Kan ik bezwaar maken tegen mijn huurprijs?",
    answer: "Ja, als je vindt dat je te veel huur betaalt kun je bezwaar maken bij de Huurcommissie. Die kan de maximale huurprijs vaststellen na een procedure.",
  },
  {
    question: "Wat is de WOZ-waarde?",
    answer: "WOZ staat voor Waardering Onroerende Zaken. De WOZ-waarde wordt door de gemeenten bepaald en is de geschatte marktwaarde van je woning. Je ontvangt jaarlijks de WOZ-beschikking.",
  },
  {
    question: "Geldt de huurprijscheck voor alle huurwoningen?",
    answer: "De regels gelden voor zelfstandige woningen. Onzelfstandige woningen (kamerverhuur) hebben andere regels. Ook studentenwoningen en woningen met huurcontracten van voor 1994 kunnen afwijken.",
  },
];

export function MaximaleHuurprijsCalculatorClient() {
  const [oppervlakte, setOppervlakte] = useState("75");
  const [energieLabel, setEnergieLabel] = useState("C");
  const [tuinOppervlakte, setTuinOppervlakte] = useState("20");
  const [huidigeHuur, setHuidigeHuur] = useState("850");
  const [hasCV, setHasCV] = useState(true);
  const [hasSanitair, setHasSanitair] = useState(true);
  const [hasKeuken, setHasKeuken] = useState(true);
  const [hasZonnepanelen, setHasZonnepanelen] = useState(false);
  const [resultaat, setResultaat] = useState<HuurResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const opp = parseFloat(oppervlakte) || 0;
    const tuin = parseFloat(tuinOppervlakte) || 0;
    const huur = parseFloat(huidigeHuur) || 0;

    setIsCalculating(true);

    // Punten berekenen
    let punten = 0;
    
    // Woonoppervlakte (per m² boven 30m²)
    punten += Math.max(0, opp - 30) * puntWaarden.woonoppervlakte;
    
    // Tuin (max 100m²)
    punten += Math.min(tuin, 100) * 0.75;
    
    // Energie label
    punten += puntWaarden.energielabel[energieLabel as keyof typeof puntWaarden.energielabel] || 0;
    
    // CV ketel
    if (hasCV) punten += puntWaarden.CVKetel;
    
    // Sanitair
    if (hasSanitair) punten += puntWaarden.sanitair;
    
    // Keuken
    if (hasKeuken) punten += puntWaarden.keuken;
    
    // Zonnepanelen
    if (hasZonnepanelen) punten += puntWaarden.zonnepanelen;

    // Maximale huur berekenen (per punt €5,73 in 2026)
    const puntWaarde = 5.73;
    let maximaleHuur = Math.round(punten * puntWaarde * 100) / 100;
    
    // Minimale huur (ongeveer 30% van maximale)
    const minimaleHuur = maximaleHuur * 0.30;

    // Grens liberalisatie 2026
    const grensSocialeHuur = 879.66;
    const grensLiberalisatie = 1157.95;

    setResultaat({
      puntenTotaal: Math.round(punten * 10) / 10,
      maximaleHuur,
      minimaleHuur: Math.round(minimaleHuur * 100) / 100,
      hurenBovenWAZ: maximaleHuur > grensLiberalisatie,
      huidigeHuur: huur,
      verschil: Math.round((maximaleHuur - huur) * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [oppervlakte, energieLabel, tuinOppervlakte, huidigeHuur, hasCV, hasSanitair, hasKeuken, hasZonnepanelen]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setOppervlakte("75");
    setEnergieLabel("C");
    setTuinOppervlakte("20");
    setHuidigeHuur("850");
    setHasCV(true);
    setHasSanitair(true);
    setHasKeuken(true);
    setHasZonnepanelen(false);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Woning: ${oppervlakte}m² | Label: ${energieLabel} | Punten: ${resultaat.puntenTotaal} | Max huur: €${formatBedrag(resultaat.maximaleHuur)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <Home className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="MaximaleHuurCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Maximale Huurprijs Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken de maximale toegestane huurprijs voor je woning 
              op basis van het woningwaarderingsstelsel.
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
              <h2 className="text-lg font-bold mb-4">Woning Gegevens</h2>
              
              {/* Oppervlakte */}
              <div className="mb-4">
                <label htmlFor="opp" className="block text-sm font-medium mb-2">
                  Woonoppervlakte (m²)
                </label>
                <input
                  id="opp"
                  type="number"
                  value={oppervlakte}
                  onChange={(e) => setOppervlakte(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Energie Label */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Energielabel</label>
                <div className="grid grid-cols-7 gap-1">
                  {["A", "B", "C", "D", "E", "F", "G"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setEnergieLabel(l)}
                      className={`py-2 rounded text-sm font-bold transition-all ${
                        energieLabel === l 
                          ? `bg-${l === "A" ? "green" : l === "B" ? "emerald" : l === "C" ? "lime" : l === "D" ? "yellow" : l === "E" ? "orange" : l === "F" ? "red" : "gray"}-500 text-white`
                          : "bg-secondary"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tuin */}
              <div className="mb-4">
                <label htmlFor="tuin" className="block text-sm font-medium mb-2">
                  Tuinoppervlakte (m²)
                </label>
                <input
                  id="tuin"
                  type="number"
                  value={tuinOppervlakte}
                  onChange={(e) => setTuinOppervlakte(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Voorzieningen */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Voorzieningen</label>
                <div className="space-y-2">
                  {[
                    { id: "cv", label: "CV-ketel", state: hasCV, set: setHasCV },
                    { id: "sanitair", label: "Modern sanitair", state: hasSanitair, set: setHasSanitair },
                    { id: "keuken", label: "Moderne keuken", state: hasKeuken, set: setHasKeuken },
                    { id: "zonnepanelen", label: "Zonnepanelen", state: hasZonnepanelen, set: setHasZonnepanelen },
                  ].map((item) => (
                    <label key={item.id} className="flex items-center gap-2 p-2 rounded bg-muted cursor-pointer hover:bg-muted/80">
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.set(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Huidige Huur */}
              <div className="mb-6">
                <label htmlFor="huur" className="block text-sm font-medium mb-2">
                  Huidige maandhuur (€)
                </label>
                <input
                  id="huur"
                  type="number"
                  value={huidigeHuur}
                  onChange={(e) => setHuidigeHuur(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
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
                    toolName="Maximale Huur Calculator" 
                    result={resultText}
                    url="/tools/maximale-huurprijs"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Huurprijs Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Punten */}
                    <motion.div 
                      className="p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Woningwaarderingspunten</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {resultaat.puntenTotaal} punten
                      </p>
                    </motion.div>

                    {/* Maximale Huur */}
                    <div className={`p-4 rounded-xl border ${
                      resultaat.verschil >= 0 
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <p className="text-sm text-muted-foreground mb-1">Maximale huurprijs</p>
                      <p className="text-2xl font-bold">
                        € {formatBedrag(resultaat.maximaleHuur)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Minimale huur: €{formatBedrag(resultaat.minimaleHuur)}
                      </p>
                    </div>

                    {/* Controle */}
                    {resultaat.huidigeHuur > 0 && (
                      <div className={`p-4 rounded-xl ${
                        resultaat.huidigeHuur <= resultaat.maximaleHuur
                          ? 'bg-green-500/10'
                          : 'bg-red-500/10'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {resultaat.huidigeHuur <= resultaat.maximaleHuur ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className="font-medium">
                            {resultaat.huidigeHuur <= resultaat.maximaleHuur 
                              ? 'Je huur is correct' 
                              : 'Te hoge huur!'}
                          </span>
                        </div>
                        {resultaat.huidigeHuur > resultaat.maximaleHuur && (
                          <p className="text-sm text-muted-foreground">
                            Je betaalt €{formatBedrag(Math.abs(resultaat.verschil))} te veel per maand. 
                            Je kunt bezwaar maken bij de Huurcommissie.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Info */}
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">Huursegmenten 2026</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Sociale huur: tot €879,66</div>
                        <div>Middenhuur: €879,66 - €1.157,95</div>
                        <div>Vrije sector: boven €1.157,95</div>
                      </div>
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
            <h2 className="text-xl font-bold mb-4">Alles over Maximale Huurprijs</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>maximale huurprijs calculator</strong> kun je checken of je niet te veel 
                huur betaalt. De calculator gebruikt het officiële <strong>woningwaarderingsstelsel</strong> 
                om de punten en maximale huur te berekenen.
              </p>
              <p className="mb-4">
                Het puntenstelsel houdt rekening met de oppervlakte van je woning, het energielabel, 
                de aanwezigheid van voorzieningen zoals CV en keuken, en extras zoals een tuin of 
                zonnepanelen.
              </p>
              <p>
                Als je huur boven de maximale toegestane prijs ligt, kun je via de 
                <strong> Huurcommissie</strong> een procedure starten om de huur te verlagen.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={huurFAQ} title="Veelgestelde vragen over huurprijs" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/huur-vs-koop" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Huur vs Koop</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/energiekosten" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Energiekosten</p>
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
