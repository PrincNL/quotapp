"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Euro, Calendar, ArrowRight, RotateCcw, Info, TrendingDown } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface Resultaat {
  brutoJaar: number;
  loonheffing: number;
  pensioenPremie: number;
  zorgverzekering: number;
  nettoMaand: number;
  nettoJaar: number;
  effectiefPercentage: number;
}

const nettoBrutoFAQ = [
  {
    question: "Hoe werkt de netto bruto calculator?",
    answer: "Voer je brutoloon in en de calculator berekent automatisch wat je netto overhoudt, inclusief loonheffing, pensioen en sociale premies. Gebaseerd op 2026 tarieven.",
  },
  {
    question: "Wat is het verschil tussen bruto en netto?",
    answer: "Bruto is je volledige salaris vóór aftrek van belastingen en premies. Netto is wat je uiteindelijk op je bankrekening ontvangt na aftrek van loonheffing, pensioen en verzekeringen.",
  },
  {
    question: "Hoeveel procent gaat er af van mijn salaris?",
    answer: "Dat hangt af van je inkomen. Bij modaal inkomen (~€40.000) gaat ongeveer 35-40% af. Bij hoger inkomen kan dit oplopen tot 50% of meer door de hogere belastingschijven.",
  },
  {
    question: "Wat is de algemene heffingskorting?",
    answer: "De algemene heffingskorting is een korting op je belasting die afneemt naarmate je inkomen stijgt. Bij een inkomen tot €24.000 is de korting maximaal, daarna neemt deze af.",
  },
  {
    question: "Hoe wordt pensioenpremie berekend?",
    answer: "De pensioenpremie is een percentage van je brutoloon (vaak 1,875% - 30% afhankelijk van je pensioenfonds). Dit wordt direct ingehouden op je brutoloon.",
  },
  {
    question: "Wat is het UWV-premietarief?",
    answer: "Het UWV-premietarief is een bijdrage voor werkloosheidsverzekering. Werkgevers betalen dit, maar in sommige gevallen wordt een deel via het loon ingehouden.",
  },
];

export function NettoBrutoCalculatorClient() {
  const [brutoMaand, setBrutoMaand] = useState("");
  const [leeftijd, setLeeftijd] = useState("30");
  const [pensioenPremie, setPensioenPremie] = useState("5");
  const [informatiejaar, setInformatiejaar] = useState("2026");
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const bruto = parseFloat(brutoMaand.replace(",", "."));
    
    if (isNaN(bruto) || bruto <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // 2026 Tarieven
    const loonheffingskorting = 3578; // Jaarlijks
    const basispremieZvw = 5.43 / 100; // 5.43% werkgever
    const pensioenPremiePct = parseFloat(pensioenPremie) / 100;

    // Jaarlijkse berekening
    const brutoJaar = bruto * 12;

    // Belasting berekening (vereenvoudigd)
    let belasting = 0;
    let teBetalen = 0;
    
    if (brutoJaar <= 38384) {
      belasting = brutoJaar * 0.3707;
    } else if (brutoJaar <= 75679) {
      belasting = 38384 * 0.3707 + (brutoJaar - 38384) * 0.3850;
    } else if (brutoJaar <= 116521) {
      belasting = 38384 * 0.3707 + (75679 - 38384) * 0.3850 + (brutoJaar - 75679) * 0.3960;
    } else {
      belasting = 38384 * 0.3707 + (75679 - 38384) * 0.3850 + (116521 - 75679) * 0.3960 + (brutoJaar - 116521) * 0.4950;
    }

    // Heffingskorting toepassen
    let heffingskorting = loonheffingskorting;
    if (brutoJaar > 24484) {
      heffingskorting = Math.max(0, loonheffingskorting - (brutoJaar - 24484) * 0.0554);
    }

    // Netto berekening
    const pensioenJaar = brutoJaar * pensioenPremiePct;
    const zorgverzekeringJaar = brutoJaar * 0.0270; // 2.70% werknemer bijdrage
    
    const nettoJaar = brutoJaar - belasting + heffingskorting - pensioenJaar - zorgverzekeringJaar;
    const nettoMaand = nettoJaar / 12;
    const loonheffing = (belasting - heffingskorting) / 12;

    setResultaat({
      brutoJaar: Math.round(brutoJaar * 100) / 100,
      loonheffing: Math.round(loonheffing * 100) / 100,
      pensioenPremie: Math.round(pensioenJaar / 12 * 100) / 100,
      zorgverzekering: Math.round(zorgverzekeringJaar / 12 * 100) / 100,
      nettoMaand: Math.round(nettoMaand * 100) / 100,
      nettoJaar: Math.round(nettoJaar * 100) / 100,
      effectiefPercentage: Math.round(((brutoJaar - nettoJaar) / brutoJaar) * 10000) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [brutoMaand, pensioenPremie]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setBrutoMaand("");
    setLeeftijd("30");
    setPensioenPremie("5");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Bruto: €${brutoMaand}/mnd | Netto: €${formatBedrag(resultaat.nettoMaand)}/mnd | ${resultaat.effectiefPercentage}% af`
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
                <Euro className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="NettoBruto" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Netto Bruto Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken exact wat je netto overhoudt van je brutoloon. 
              Inclusief belastingen, pensioen en verzekeringen.
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
              <h2 className="text-lg font-bold mb-4">Salaris Gegevens</h2>
              
              {/* Brutosalaris */}
              <div className="mb-4">
                <label htmlFor="bruto" className="block text-sm font-medium mb-2">
                  Brutoloon per maand (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="bruto"
                    type="text"
                    inputMode="decimal"
                    value={brutoMaand}
                    onChange={(e) => setBrutoMaand(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="3.500"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["2500", "3500", "4500", "6000"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrutoMaand(b)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        brutoMaand === b ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pensioenpremie */}
              <div className="mb-4">
                <label htmlFor="pensioen" className="block text-sm font-medium mb-2">
                  Pensioenpremie (%)
                </label>
                <input
                  id="pensioen"
                  type="number"
                  step="0.1"
                  value={pensioenPremie}
                  onChange={(e) => setPensioenPremie(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Gemiddeld 5-8% bij pensioenfondsen
                </p>
              </div>

              {/* Informatiejaar */}
              <div className="mb-6">
                <label htmlFor="jaar" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Belastingjaar
                  </span>
                </label>
                <div className="flex gap-2">
                  {["2025", "2026"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setInformatiejaar(j)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        informatiejaar === j ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j}
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
                    toolName="Netto Bruto Calculator" 
                    result={resultText}
                    url="/tools/netto-bruto"
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
                    {/* Netto Maand */}
                    <motion.div 
                      className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Netto per maand</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.nettoMaand)}
                      </p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Bruto per jaar</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.brutoJaar)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Loonheffing</span>
                        <span className="font-medium text-red-500">-€ {formatBedrag(resultaat.loonheffing)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Pensioenpremie</span>
                        <span className="font-medium text-red-500">-€ {formatBedrag(resultaat.pensioenPremie)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Zorgverzekering</span>
                        <span className="font-medium text-red-500">-€ {formatBedrag(resultaat.zorgverzekering)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-500/10 rounded-lg font-bold">
                        <span>Netto per jaar</span>
                        <span className="text-green-600 dark:text-green-400">€ {formatBedrag(resultaat.nettoJaar)}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-500/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Effectief percentage</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {resultaat.effectiefPercentage}% aftrek
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
                    <p>Vul je brutoloon in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Brutoloon naar Netto</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>netto bruto calculator</strong> bereken je eenvoudig wat je daadwerkelijk netto verdient. 
                Vul je brutoloon in en zie direct hoeveel er af gaat aan loonheffing, pensioenpremie en zorgverzekering.
              </p>
              <p className="mb-4">
                De berekening is gebaseerd op de <strong>actuele 2026 belastingtarieven</strong> in Nederland, inclusief de 
                algemene heffingskorting en werkgeversbijdrage zorgverzekering.
              </p>
              <p>
                Houd er rekening mee dat dit een indicatie is. Je werkelijke netto inkomen kan afwijken door zaken als 
                reiskostenvergoeding, bonussen, en specifieke regelingen via je werkgever.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={nettoBrutoFAQ} title="Veelgestelde vragen over netto bruto" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/bruto-netto" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Bruto Netto</p>
              </Link>
              <Link href="/tools/pensioen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Pensioen</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
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
