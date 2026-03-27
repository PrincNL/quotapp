"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, GraduationCap, TrendingUp, RotateCcw, Info, Calendar } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface PensioenResultaat {
  brutoMaand: number;
  nettoMaand: number;
  aowLeeftijd: number;
  eigenBijdrage: number;
  totaalOpgebouwd: number;
  gewenstNetto: number;
  gatPensioen: number;
}

const pensioenFAQ = [
  {
    question: "Op welke leeftijd ga ik met pensioen?",
    answer: "De AOW-leeftijd is in 2026 gestegen naar 67 jaar en 3 maanden. Dit kan de komende jaren nog veranderen afhankelijk van de levensverwachting.",
  },
  {
    question: "Hoeveel pensioen heb ik nodig?",
    answer: "Vuistregel is om 70-80% van je laatste salaris aan te houden voor een comfortabel pensioen. Dit is inclusief AOW en eventuele andere inkomsten.",
  },
  {
    question: "Wat is het verschil tussen brutopensioen en nettopensioen?",
    answer: "Brutopensioen is het volledige bedrag voor belasting. Nettopensioen is wat je netto ontvangt na aftrek van belasting. Over pensioen betaal je vaak lagere belasting dan over loon.",
  },
  {
    question: "Hoe bouw ik extra pensioen op?",
    answer: "Je kunt extra pensioen opbouwen via een lijfrente, bankspaarrekening, of verzekeringsproduct. De premie is vaak aftrekbaar van de belasting.",
  },
  {
    question: "Wat is de hoogte van de AOW?",
    answer: "De volledige AOW voor een alleenstaande is ongeveer €1.650 bruto per maand (2026, voorlopig). Voor partners samen is dit lager per persoon.",
  },
  {
    question: "Moet ik belasting betalen over mijn pensioen?",
    answer: "Ja, pensioenuitkeringen worden belast als inkomen. Er geldt echter een lagere heffing dan bij loon, en je hebt vaak recht op extra heffingskortingen.",
  },
];

export function PensioenCalculatorClient() {
  const [huidigInkomen, setHuidigInkomen] = useState("50000");
  const [leeftijd, setLeeftijd] = useState("35");
  const [pensioenLeeftijd, setPensioenLeeftijd] = useState("68");
  const [opgebouwdPensioen, setOpgebouwdPensioen] = useState("50000");
  const [gewenstNetto, setGewenstNetto] = useState("2500");
  const [resultaat, setResultaat] = useState<PensioenResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const inkomen = parseFloat(huidigInkomen);
    const huidigeLeeftijd = parseInt(leeftijd);
    const pLeeftijd = parseInt(pensioenLeeftijd);
    const opgebouwd = parseFloat(opgebouwdPensioen) || 0;
    const gewenst = parseFloat(gewenstNetto);

    if (isNaN(inkomen) || isNaN(huidigeLeeftijd) || isNaN(pLeeftijd) || 
        inkomen <= 0 || huidigeLeeftijd <= 0 || pLeeftijd <= huidigeLeeftijd) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Vereenvoudigde pensioenberekening
    const werkJaren = pLeeftijd - huidigeLeeftijd;
    const dienstjaarPerJaar = inkomen * 0.015; // 1.5% ouderdomsuitkering per dienstjaar
    const verwachtPensioen = opgebouwd + (dienstjaarPerJaar * werkJaren);
    
    // AOW (geschatte volledige AOW 2026)
    const aowMaand = 1650; // Brutopensioen AOW
    
    // Totaal bruto pensioen per maand
    const brutoMaand = (verwachtPensioen / 12) + aowMaand;
    
    // Schatting netto (vereenvoudigd)
    const nettoMaand = brutoMaand * 0.75; // Gemiddelde 75% netto na belasting
    
    // Benodigde eigen bijdrage (lijfrente etc) om gat te dichten
    const gewenstBruto = gewenst / 0.75;
    const gatPensioen = Math.max(0, gewenstBruto - brutoMaand);
    
    // Jaarlijkse premie om gat te dichten (vereenvoudigd)
    const eigenBijdrage = (gatPensioen * 12 * 0.4); // 40% effect na belasting

    setResultaat({
      brutoMaand: Math.round(brutoMaand * 100) / 100,
      nettoMaand: Math.round(nettoMaand * 100) / 100,
      aowLeeftijd: 67 + 3, // 2026: AOW 67 jaar en 3 maanden
      eigenBijdrage: Math.round(eigenBijdrage * 100) / 100,
      totaalOpgebouwd: Math.round(verwachtPensioen * 100) / 100,
      gewenstNetto: gewenst,
      gatPensioen: Math.round(gatPensioen * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [huidigInkomen, leeftijd, pensioenLeeftijd, opgebouwdPensioen, gewenstNetto]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setHuidigInkomen("50000");
    setLeeftijd("35");
    setPensioenLeeftijd("68");
    setOpgebouwdPensioen("50000");
    setGewenstNetto("2500");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Inkomen: €${huidigInkomen} | Verwacht pensioen: €${formatBedrag(resultaat.nettoMaand)}/mnd | Gat: €${formatBedrag(resultaat.gatPensioen)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <GraduationCap className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="PensioenCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Pensioen Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je verwachte pensioenuitkering en ontdek 
              of je genoeg spaart voor je droompensioen.
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
              <h2 className="text-lg font-bold mb-4">Pensioen Gegevens</h2>
              
              {/* Huidig Inkomen */}
              <div className="mb-4">
                <label htmlFor="inkomen" className="block text-sm font-medium mb-2">
                  Jaarlijks bruto inkomen (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="inkomen"
                    type="text"
                    inputMode="decimal"
                    value={huidigInkomen}
                    onChange={(e) => setHuidigInkomen(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Leeftijd */}
              <div className="mb-4">
                <label htmlFor="leeftijd" className="block text-sm font-medium mb-2">
                  Huidige leeftijd
                </label>
                <input
                  id="leeftijd"
                  type="number"
                  value={leeftijd}
                  onChange={(e) => setLeeftijd(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Pensioenleeftijd */}
              <div className="mb-4">
                <label htmlFor="pLeeftijd" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Gewenste pensioenleeftijd
                  </span>
                </label>
                <div className="flex gap-2">
                  {["65", "67", "68", "70"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setPensioenLeeftijd(l)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        pensioenLeeftijd === l ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {l} jaar
                    </button>
                  ))}
                </div>
              </div>

              {/* Opgebouwd Pensioen */}
              <div className="mb-4">
                <label htmlFor="opgebouwd" className="block text-sm font-medium mb-2">
                  Reeds opgebouwd pensioen (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="opgebouwd"
                    type="text"
                    inputMode="decimal"
                    value={opgebouwdPensioen}
                    onChange={(e) => setOpgebouwdPensioen(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="50000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Controleer dit in je pensioenoverzicht
                </p>
              </div>

              {/* Gewenst Netto */}
              <div className="mb-6">
                <label htmlFor="gewenst" className="block text-sm font-medium mb-2">
                  Gewenst netto pensioen per maand (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="gewenst"
                    type="text"
                    inputMode="decimal"
                    value={gewenstNetto}
                    onChange={(e) => setGewenstNetto(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
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
                    toolName="Pensioen Calculator" 
                    result={resultText}
                    url="/tools/pensioen-berekening"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Pensioen Prognose</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Verwacht Pensioen */}
                    <motion.div 
                      className="p-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Verwacht netto pensioen per maand</p>
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        € {formatBedrag(resultaat.nettoMaand)}
                      </p>
                    </motion.div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Bruto pensioen</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.brutoMaand)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">AOW (indicatief)</span>
                        <span className="font-medium">€ 1.650</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Pensioenopbouw (AOW+)</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.totaalOpgebouwd)}</span>
                      </div>
                    </div>

                    {/* Gat */}
                    {resultaat.gatPensioen > 0 && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-red-500" />
                          <span className="font-medium">Pensioengat</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                          € {formatBedrag(resultaat.gatPensioen)}/mnd
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Extra premie benodigd: € {formatBedrag(resultaat.eigenBijdrage)}/jaar
                        </p>
                      </div>
                    )}

                    {resultaat.gatPensioen <= 0 && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600 dark:text-green-400">
                            Je pensioen ziet er goed uit!
                          </span>
                        </div>
                      </div>
                    )}
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
            <h2 className="text-xl font-bold mb-4">Alles over Pensioen Berekenen</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>pensioen calculator</strong> krijg je een indicatie van wat je kunt verwachten 
                aan pensioenuitkeringen. Vul je huidige inkomen, leeftijd en reeds opgebouwd pensioen in voor 
                een persoonlijke prognose.
              </p>
              <p className="mb-4">
                Let op: dit is een indicatie. Je werkelijke pensioen hangt af van veel factoren zoals inflatie, 
                beleggingsrendementen, en veranderingen in pensioenregels. Raadpleeg je pensioenfonds of een 
                financieel adviseur voor een nauwkeurige berekening.
              </p>
              <p>
                Het is verstandig om je pensioen regelmatig te checken, zeker bij grote levensveranderingen zoals 
                een nieuwe baan, huwelijk, of kinderen.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={pensioenFAQ} title="Veelgestelde vragen over pensioen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/netto-bruto" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Netto/Bruto</p>
              </Link>
              <Link href="/tools/inflatie" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Inflatie</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
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
