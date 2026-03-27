"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Zap, Flame, RotateCcw, Info, TrendingDown, Building } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface Leverancier {
  naam: string;
  stroomKwh: number;
  gasM3: number;
  vast: number;
  kleur: string;
}

interface EnergieResultaat {
  leverancier: string;
  stroomJaar: number;
  gasJaar: number;
  vastJaar: number;
  totaalJaar: number;
  totaalMaand: number;
}

const leveranciers: Leverancier[] = [
  { naam: "Vattenfall", stroomKwh: 0.22, gasM3: 0.78, vast: 120, kleur: "yellow" },
  { naam: "Essent", stroomKwh: 0.23, gasM3: 0.80, vast: 110, kleur: "blue" },
  { naam: "Greenchoice", stroomKwh: 0.24, gasM3: 0.82, vast: 95, kleur: "green" },
  { naam: "EnergieDirect", stroomKwh: 0.21, gasM3: 0.76, vast: 130, kleur: "purple" },
  { naam: "Eneco", stroomKwh: 0.25, gasM3: 0.83, vast: 100, kleur: "teal" },
  { naam: "Budget Energie", stroomKwh: 0.20, gasM3: 0.75, vast: 140, kleur: "orange" },
];

const energieFAQ = [
  {
    question: "Hoeveel stroom verbruik ik gemiddeld?",
    answer: "Een gemiddeld Nederlands huishouden verbruikt ongeveer 2.500-3.500 kWh stroom per jaar. Dit hangt sterk af van het aantal personen en elektrische apparaten.",
  },
  {
    question: "Hoeveel gas verbruik ik gemiddeld?",
    answer: "Een gemiddeld Nederlands huishouden verbruikt ongeveer 1.200-1.500 m³ gas per jaar voor verwarming en warm water. Flatbewoners verbruiken vaak minder.",
  },
  {
    question: "Wat kost elektriciteit per kWh?",
    answer: "De stroomprijs varieert sterk per leverancier. In 2026 ligt de prijs gemiddeld rond €0,22-0,28 per kWh, inclusief belastingen en netwerkkosten.",
  },
  {
    question: "Hoe kan ik besparen op energiekosten?",
    answer: "Vergelijk leveranciers, isoleer je woning, gebruik LED-verlichting, en let op energielabels bij nieuwe apparaten. Zonnepanelen zijn ook een goede investering.",
  },
  {
    question: "Wat is het verschil tussen vast en variabel?",
    answer: "Bij vast tarief staat je prijs voor een bepaalde periode vast (vaak 1-3 jaar). Bij variabel verandert de prijs elke maand of kwartaal. Variabel kan voordelig zijn maar brengt onzekerheid.",
  },
  {
    question: "Wat is de hoogte van de energiebelasting?",
    answer: "De energiebelasting op stroom is ongeveer €0,12 per kWh. Op gas is dit ongeveer €0,40 per m³. Daarnaast betaal je ODE (Opslag Duurzame Energie).",
  },
];

export function EnergiekostenCalculatorClient() {
  const [stroomVerbruik, setStroomVerbruik] = useState("3000");
  const [gasVerbruik, setGasVerbruik] = useState("1200");
  const [aantalPersonen, setAantalPersonen] = useState("2");
  const [woningType, setWoningType] = useState("rijtjeshuis");
  const [resultaat, setResultaat] = useState<EnergieResultaat[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const stroom = parseFloat(stroomVerbruik);
    const gas = parseFloat(gasVerbruik);

    if (isNaN(stroom) || isNaN(gas) || stroom <= 0 || gas <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const resultaten: EnergieResultaat[] = leveranciers.map((lev) => {
      const stroomJaar = stroom * lev.stroomKwh;
      const gasJaar = gas * lev.gasM3;
      const vastJaar = lev.vast;
      const totaalJaar = stroomJaar + gasJaar + vastJaar;

      return {
        leverancier: lev.naam,
        stroomJaar: Math.round(stroomJaar * 100) / 100,
        gasJaar: Math.round(gasJaar * 100) / 100,
        vastJaar,
        totaalJaar: Math.round(totaalJaar * 100) / 100,
        totaalMaand: Math.round((totaalJaar / 12) * 100) / 100,
      };
    });

    resultaten.sort((a, b) => a.totaalJaar - b.totaalJaar);
    setResultaat(resultaten);

    setTimeout(() => setIsCalculating(false), 150);
  }, [stroomVerbruik, gasVerbruik]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setStroomVerbruik("3000");
    setGasVerbruik("1200");
    setAantalPersonen("2");
    setWoningType("rijtjeshuis");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const besparing = resultaat ? resultaat[resultaten.length - 1].totaalJaar - resultaat[0].totaalJaar : 0;

  const resultText = resultaat
    ? `Stroom: ${stroomVerbruik} kWh | Gas: ${gasVerbruik} m³ | Beste: ${resultaat[0]?.leverancier} €${formatBedrag(resultaat[0]?.totaalJaar)}/jaar`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                <Zap className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="EnergiekostenCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Energiekosten Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je jaarlijkse energiekosten en vergelijk 
              energieleveranciers om te besparen.
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
              <h2 className="text-lg font-bold mb-4">Energieverbruik</h2>
              
              {/* Stroom */}
              <div className="mb-4">
                <label htmlFor="stroom" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Stroomverbruik (kWh/jaar)
                  </span>
                </label>
                <input
                  id="stroom"
                  type="text"
                  inputMode="decimal"
                  value={stroomVerbruik}
                  onChange={(e) => setStroomVerbruik(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["2000", "3000", "4000", "5000"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStroomVerbruik(s)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        stroomVerbruik === s ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {s} kWh
                    </button>
                  ))}
                </div>
              </div>

              {/* Gas */}
              <div className="mb-4">
                <label htmlFor="gas" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    Gasverbruik (m³/jaar)
                  </span>
                </label>
                <input
                  id="gas"
                  type="text"
                  inputMode="decimal"
                  value={gasVerbruik}
                  onChange={(e) => setGasVerbruik(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["800", "1200", "1600", "2000"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGasVerbruik(g)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        gasVerbruik === g ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {g} m³
                    </button>
                  ))}
                </div>
              </div>

              {/* Woningtype */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Woningtype
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "flat", label: "Flat" },
                    { value: "rijtjeshuis", label: "Rijtjeshuis" },
                    { value: "tussenwoning", label: "Tussenwoning" },
                    { value: "vrijstaand", label: "Vrijstaand" },
                  ].map((w) => (
                    <button
                      key={w.value}
                      onClick={() => setWoningType(w.value)}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        woningType === w.value ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {w.label}
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
                    toolName="Energiekosten Calculator" 
                    result={resultText}
                    url="/tools/energiekosten"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Vergelijking Leveranciers</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {/* Besparing highlight */}
                    {besparing > 0 && (
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg mb-4">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-green-500" />
                          <span className="font-medium">Potentiële besparing</span>
                        </div>
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                          € {formatBedrag(besparing)}/jaar
                        </span>
                      </div>
                    )}

                    {resultaat.slice(0, 5).map((r, index) => (
                      <motion.div
                        key={r.leverancier}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          index === 0 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : 'bg-muted border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{r.leverancier}</span>
                            <div className="text-xs text-muted-foreground">
                              S: €{formatBedrag(r.stroomJaar)} | G: €{formatBedrag(r.gasJaar)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">€ {formatBedrag(r.totaalJaar)}</div>
                            <div className="text-xs text-muted-foreground">
                              €{formatBedrag(r.totaalMaand)}/mnd
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je verbruik in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Energiekosten</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>energiekosten calculator</strong> bereken je eenvoudig wat je jaarlijks kwijt bent 
                aan stroom en gas. Vul je verbruik in en vergelijk direct de tarieven van verschillende 
                <strong> energieleveranciers</strong>.
              </p>
              <p className="mb-4">
                De energiemarkt is volop in beweging. Door jaarlijks te vergelijken kun je honderden euros 
                besparen op je energierekening. Let niet alleen op de kWh-prijs, maar ook op de vaste kosten 
                en eventuele welkomstkortingen.
              </p>
              <p>
                Denk ook aan groene energie. Steeds meer leveranciers bieden 100% duurzame stroom uit 
                wind of zon aan voor vergelijkbare of lagere prijzen dan grijze stroom.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={energieFAQ} title="Veelgestelde vragen over energiekosten" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Alle Tools</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/inflatie" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Inflatie</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
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
