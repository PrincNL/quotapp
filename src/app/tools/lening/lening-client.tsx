"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Euro, Calendar, ArrowRight, RotateCcw, Info } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface Resultaat {
  maandlasten: number;
  totaalRente: number;
  totaalBedrag: number;
  rentePerMaand: number;
}

const leningFAQ = [
  {
    question: "Hoe werkt de lening calculator?",
    answer: "Vul het leenbedrag in, kies de rente (jaarlijks percentage), bepaal de looptijd in maanden, en zie direct je maandlasten. De calculator berekent ook de totale rente en het totaal te betalen bedrag.",
  },
  {
    question: "Wat is een persoonlijke lening?",
    answer: "Een persoonlijke lening is een lening waarbij je een vast bedrag leent en dit in vaste maandelijkse termijnen terugbetaalt. De rente staat vast gedurende de hele looptijd, net als je maandlasten.",
  },
  {
    question: "Hoeveel kan ik lenen?",
    answer: "Dat hangt af van je inkomen, vaste lasten, en kredietwaardigheid. Voor een indicatie: met een modaal inkomen kun je vaak €10.000 - €25.000 lenen. Bij een hoger inkomen is meer mogelijk.",
  },
  {
    question: "Wat is het verschil tussen annuïteit en lineair aflossen?",
    answer: "Bij annuïteit zijn je maandlasten elke maand gelijk (behalve rentevaste periode). Bij lineair los je elke maand hetzelfde bedrag aan aflossing, waardoor je rente en daarmee je lasten afnemen over tijd.",
  },
  {
    question: "Waar kan ik het beste een lening afsluiten?",
    answer: "Vergelijk altijd meerdere aanbieders. Banken bieden vaak de laagste rentes, maar kredietunies en online leners kunnen ook voordelig zijn. Let op de rente, looptijd, en eventuele extra kosten.",
  },
  {
    question: "Is lenen verstandig?",
    answer: "Dat hangt af van je situatie. Lenen voor een huis of auto kan verstandig zijn als je het kunt terugbetalen. Vermijd lenen voor consumptie of om schulden te consolideren zonder je uitgaven aan te passen.",
  },
];

export function LeningCalculatorClient() {
  const [bedrag, setBedrag] = useState("");
  const [rente, setRente] = useState("5.9");
  const [maanden, setMaanden] = useState("60");
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const bedragNum = parseFloat(bedrag.replace(",", "."));
    const renteNum = parseFloat(rente.replace(",", ".")) / 100;
    const maandenNum = parseInt(maanden);

    if (isNaN(bedragNum) || isNaN(renteNum) || isNaN(maandenNum) || 
        bedragNum <= 0 || renteNum < 0 || maandenNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Annuïteit berekening
    const rentePerMaand = renteNum / 12;
    const maandlasten = bedragNum * (rentePerMaand * Math.pow(1 + rentePerMaand, maandenNum)) / 
                        (Math.pow(1 + rentePerMaand, maandenNum) - 1);
    
    const totaalBedrag = maandlasten * maandenNum;
    const totaalRente = totaalBedrag - bedragNum;

    setResultaat({
      maandlasten: Math.round(maandlasten * 100) / 100,
      totaalRente: Math.round(totaalRente * 100) / 100,
      totaalBedrag: Math.round(totaalBedrag * 100) / 100,
      rentePerMaand: Math.round(rentePerMaand * 10000) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [bedrag, rente, maanden]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setBedrag("");
    setRente("5.9");
    setMaanden("60");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Leenbedrag: €${bedrag} | Rente: ${rente}% | Maandlasten: €${formatBedrag(resultaat.maandlasten)} | Totaal: €${formatBedrag(resultaat.totaalBedrag)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Euro className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Lening" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Lening Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken eenvoudig je maandelijkse leninglasten. 
              Vergelijk leningen en kies de beste optie voor jouw situatie.
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
              <h2 className="text-lg font-bold mb-4">Lening Details</h2>
              
              {/* Bedrag */}
              <div className="mb-4">
                <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
                  Leenbedrag (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="bedrag"
                    type="text"
                    inputMode="decimal"
                    value={bedrag}
                    onChange={(e) => setBedrag(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="10.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Rente */}
              <div className="mb-4">
                <label htmlFor="rente" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Rente (%)
                    <span className="text-xs text-muted-foreground">(jaarlijks)</span>
                  </span>
                </label>
                <input
                  id="rente"
                  type="number"
                  step="0.1"
                  value={rente}
                  onChange={(e) => setRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["4.9", "5.9", "7.9", "9.9"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRente(r)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        rente === r ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Looptijd */}
              <div className="mb-6">
                <label htmlFor="maanden" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Looptijd
                    <Calendar className="w-4 h-4" />
                  </span>
                </label>
                <input
                  id="maanden"
                  type="number"
                  value={maanden}
                  onChange={(e) => setMaanden(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["12", "24", "36", "60", "120"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMaanden(m)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        maanden === m ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {m === "120" ? "10j" : m === "60" ? "5j" : m === "36" ? "3j" : m === "24" ? "2j" : "1j"}
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
                    toolName="Lening Calculator" 
                    result={resultText}
                    url="/tools/lening"
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
                    {/* Maandlasten */}
                    <motion.div 
                      className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Maandelijkse lasten</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.maandlasten)}
                      </p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totaal rente</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.totaalRente)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totaal te betalen</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.totaalBedrag)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Maandrente</span>
                        <span className="font-medium">{resultaat.rentePerMaand.toFixed(4)}%</span>
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
          <InlineAd slot="lening-after-result" />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Leningen Berekenen</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>lening calculator</strong> bereken je snel en eenvoudig wat je maandelijks moet betalen 
                voor een persoonlijke lening, autofinanciering of andere lening. Vul simpelweg het bedrag in dat je wilt lenen, 
                de rente die je krijgt aangeboden, en de gewenste looptijd.
              </p>
              <p>
                De calculator gebruikt de standaard <strong>annuïteit formule</strong> waarbij je elke maand een vast bedrag betaalt 
                dat bestaat uit rente en aflossing. Aan het begin van de looptijd betaal je meer rente, aan het einde meer aflossing.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={leningFAQ} title="Veelgestelde vragen over leningen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <StickyAd slot="lening-sidebar" />
      </div>
    </div>
  );
}
