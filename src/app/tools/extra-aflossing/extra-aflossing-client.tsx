"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingDown, RotateCcw, ArrowRight, DollarSign } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface ExtraAflossingResultaat {
  origineleMaandlasten: number;
  origineleLooptijd: number;
  origineleRente: number;
  nieuweMaandlasten: number;
  nieuweLooptijd: number;
  maandlastVerlaging: number;
  looptijdVerkorting: number;
  renteBesparing: number;
}

const extraAflossingFAQ = [
  {
    question: "Wat is extra aflossen?",
    answer: "Extra aflossen is wanneer je meer betaalt dan de normale maandlasten. Dit vermindert je openstaande schuld sneller, waardoor je minder rente betaalt.",
  },
  {
    question: "Kan ik altijd extra aflossen op mijn hypotheek?",
    answer: "Bij de meeste hypotheken kun je jaarlijks 10-20% van het oorspronkelijke bedrag boetevrij aflossen. Voor bedragen daarboven betaal je soms een boete.",
  },
  {
    question: "Wat is het verschil tussen lineair en annuïteit aflossen?",
    answer: "Bij lineair los je elke maand een vast bedrag af. Bij annuïteit zijn je maandlasten vast, maar het aflossingsdeel groeit over tijd. Extra aflossen werkt bij beide systemen.",
  },
  {
    question: "Is het verstandig om extra af te lossen?",
    answer: "Dat hangt af van je situatie. Vaak is het slim als je weinig schulden hebt en een goed inkomen. Als je een hypotheek met lage rente hebt, kun je soms beter beleggen.",
  },
  {
    question: "Moet ik belasting betalen over rentebesparing?",
    answer: "Over rentebesparing hoef je geen belasting te betalen. Het is gewoon minder kosten. Let wel op bij hypotheekrenteaftrek - minder rente betekent minder aftrek.",
  },
  {
    question: "Wat is beter: lagere maandlasten of kortere looptijd?",
    answer: "Als je huidige maandlasten prima zijn, kies dan voor kortere looptijd. Als je financieel last hebt van de lasten, kies voor lagere maandlasten.",
  },
];

export function ExtraAflossingCalculatorClient() {
  const [leningBedrag, setLeningBedrag] = useState("200000");
  const [rentePercentage, setRentePercentage] = useState("4.5");
  const [looptijd, setLooptijd] = useState("360");
  const [extraMaand, setExtraMaand] = useState("200");
  const [resultaat, setResultaat] = useState<ExtraAflossingResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const bedrag = parseFloat(leningBedrag);
    const rente = parseFloat(rentePercentage) / 100;
    const origLooptijd = parseInt(looptijd);
    const extra = parseFloat(extraMaand);

    if (isNaN(bedrag) || isNaN(rente) || isNaN(origLooptijd) || isNaN(extra) ||
        bedrag <= 0 || rente < 0 || origLooptijd <= 0 || extra < 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const rentePerMaand = rente / 12;
    const origineleMaandlasten = bedrag * (rentePerMaand * Math.pow(1 + rentePerMaand, origLooptijd)) / 
                                  (Math.pow(1 + rentePerMaand, origLooptijd) - 1);

    // Originele situatie - totale rente
    let totaalRenteOrig = 0;
    let restantOrig = bedrag;
    for (let i = 0; i < origLooptijd; i++) {
      totaalRenteOrig += restantOrig * rentePerMaand;
      restantOrig = restantOrig * (1 + rentePerMaand) - origineleMaandlasten;
    }

    // Nieuwe situatie - met extra aflossing
    let totaalRenteNieuw = 0;
    let restantNieuw = bedrag;
    let maandTeller = 0;
    const maxMaanden = origLooptijd * 2; // Veiligheidsgrens
    
    while (restantNieuw > 0 && maandTeller < maxMaanden) {
      const renteMaand = restantNieuw * rentePerMaand;
      totaalRenteNieuw += renteMaand;
      
      let betaling = origineleMaandlasten + extra;
      if (betaling > restantNieuw + renteMaand) {
        betaling = restantNieuw + renteMaand;
      }
      
      restantNieuw = restantNieuw + renteMaand - betaling;
      maandTeller++;
    }

    const nieuweLooptijd = maandTeller;

    // Maandlast bij tussentijdse berekening (nieuwe lagere lasten)
    const nieuweMaandlasten = Math.min(origineleMaandlasten, restantNieuw > 0 ? 
      restantNieuw * (rentePerMaand * Math.pow(1 + rentePerMaand, nieuweLooptijd)) / 
      (Math.pow(1 + rentePerMaand, nieuweLooptijd) - 1) : 0);

    setResultaat({
      origineleMaandlasten: Math.round(origineleMaandlasten * 100) / 100,
      origineleLooptijd: origLooptijd,
      origineleRente: Math.round(totaalRenteOrig * 100) / 100,
      nieuweMaandlasten: Math.round(nieuweMaandlasten * 100) / 100,
      nieuweLooptijd: nieuweLooptijd,
      maandlastVerlaging: Math.round((origineleMaandlasten - nieuweMaandlasten) * 100) / 100,
      looptijdVerkorting: origLooptijd - nieuweLooptijd,
      renteBesparing: Math.round((totaalRenteOrig - totaalRenteNieuw) * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [leningBedrag, rentePercentage, looptijd, extraMaand]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setLeningBedrag("200000");
    setRentePercentage("4.5");
    setLooptijd("360");
    setExtraMaand("200");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Lening: €${leningBedrag} | Extra: €${extraMaand}/mnd | Rente besparing: €${formatBedrag(resultaat.renteBesparing)} | Looptijd: -${resultaat.looptijdVerkorting} maanden`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-lg">
                <TrendingDown className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="ExtraAflossingCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Extra Aflossing Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken hoeveel je bespaart door extra af te lossen 
              op je lening of hypotheek.
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
              <h2 className="text-lg font-bold mb-4">Lening Gegevens</h2>
              
              {/* Leningbedrag */}
              <div className="mb-4">
                <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
                  Leningbedrag (€)
                </label>
                <input
                  id="bedrag"
                  type="text"
                  inputMode="decimal"
                  value={leningBedrag}
                  onChange={(e) => setLeningBedrag(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Rente */}
              <div className="mb-4">
                <label htmlFor="rente" className="block text-sm font-medium mb-2">
                  Rente (%)
                </label>
                <input
                  id="rente"
                  type="number"
                  step="0.1"
                  value={rentePercentage}
                  onChange={(e) => setRentePercentage(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Looptijd */}
              <div className="mb-4">
                <label htmlFor="looptijd" className="block text-sm font-medium mb-2">
                  Looptijd (maanden)
                </label>
                <input
                  id="looptijd"
                  type="number"
                  value={looptijd}
                  onChange={(e) => setLooptijd(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Extra Maand */}
              <div className="mb-6">
                <label htmlFor="extra" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Extra aflossing per maand (€)
                  </span>
                </label>
                <input
                  id="extra"
                  type="text"
                  inputMode="decimal"
                  value={extraMaand}
                  onChange={(e) => setExtraMaand(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["100", "200", "500", "1000"].map((e) => (
                    <button
                      key={e}
                      onClick={() => setExtraMaand(e)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        extraMaand === e ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{e}
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
                    toolName="Extra Aflossing Calculator" 
                    result={resultText}
                    url="/tools/extra-aflossing"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Voordeel Extra Aflossing</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Rente Besparing */}
                    <motion.div 
                      className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Rente besparing</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.renteBesparing)}
                      </p>
                    </motion.div>

                    {/* Looptijd Verkorting */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Looptijd verkorting</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {resultaat.looptijdVerkorting} maanden
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}({Math.round(resultaat.looptijdVerkorting / 12 * 10) / 10} jaar)
                        </span>
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Originele looptijd</span>
                        <span className="font-medium">{resultaat.origineleLooptijd} maanden</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Nieuwe looptijd</span>
                        <span className="font-medium">{resultaat.nieuweLooptijd} maanden</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale rente (zonder extra)</span>
                        <span className="font-medium text-red-500">€ {formatBedrag(resultaat.origineleRente)}</span>
                      </div>
                    </div>

                    {/* Advies */}
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <p className="text-sm font-medium mb-1">💡 Tip</p>
                      <p className="text-sm text-muted-foreground">
                        Door €{extraMaand} extra per maand af te lossen, bespaar je €{formatBedrag(resultaat.renteBesparing)} 
                        aan rente en ben je {Math.round(resultaat.looptijdVerkorting / 30)} maanden eerder klaar!
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
            <h2 className="text-xl font-bold mb-4">Alles over Extra Aflossing</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>extra aflossing calculator</strong> bereken je eenvoudig wat het voordeel is 
                van extra aflossen op je lening of hypotheek. Zie direct hoeveel rente je bespaart en 
                hoeveel sneller je schuldvrij bent.
              </p>
              <p className="mb-4">
                <strong>Extra aflossen</strong> is een van de beste investeringen die je kunt maken. 
                De rente die je bespaart is gegarandeerd rendement, zonder risico van beleggen.
              </p>
              <p>
                Check wel altijd de voorwaarden van je lening of hypotheek. Sommige leningen hebben 
                boetevrije drempels, anderen rekenen kosten voor extra aflossingen.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={extraAflossingFAQ} title="Veelgestelde vragen over extra aflossing" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
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
