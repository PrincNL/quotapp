"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Car, RotateCcw, TrendingDown, Smartphone, Laptop } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface AfschrijvingResultaat {
  jaar: number;
  boekwaardeBegin: number;
  afschrijving: number;
  boekwaardeEind: number;
  cumulatief: number;
}

const afschrijvingFAQ = [
  {
    question: "Wat is afschrijving?",
    answer: "Afschrijving is de jaarlijkse waardevermindering van een bedrijfsmiddel. Je spreekt ook wel van depreciatie of waardeverlies over tijd.",
  },
  {
    question: "Wanneer gebruik je lineaire afschrijving?",
    answer: "Lineaire afschrijving gebruik je als de waardevermindering gelijkmatig is over de jaren. Je schrijft elk jaar een vast bedrag af.",
  },
  {
    question: "Wanneer gebruik je degressieve afschrijving?",
    answer: "Degressieve afschrijving gebruik je als een activa sneller waarde verliest in het begin (zoals auto's en computers). Je schrijft een vast percentage van de boekwaarde af.",
  },
  {
    question: "Hoeveel jaar schrijf je een auto af?",
    answer: "Voor personenauto's is de fiscale afschrijvingstermijn 5 jaar (20% per jaar). Voor bestelauto's 4 jaar (25%). Bij zakelijk gebruik van een auto tellen de bijtelling en BPM ook mee.",
  },
  {
    question: "Wat is restwaarde?",
    answer: "De restwaarde is de geschatte waarde aan het einde van de afschrijvingstermijn. Dit is het bedrag waarvoor je het goed nog kunt verkopen.",
  },
  {
    question: "Moet ik als particulier afschrijven?",
    answer: "Nee, particulieren hoeven niet af te schrijven. Afschrijving is vooral relevant voor ondernemers en bedrijven voor de belastingaangifte.",
  },
];

export function DepecitatieCalculatorClient() {
  const [aankoopprijs, setAankoopprijs] = useState("25000");
  const [restwaarde, setRestwaarde] = useState("5000");
  const [hoedanigheid, setHoedanigheid] = useState("5");
  const [methode, setMethode] = useState<"lineair" | "degressief">("lineair");
  const [resultaat, setResultaat] = useState<AfschrijvingResultaat[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const aankoop = parseFloat(aankoopprijs);
    const rest = parseFloat(restwaarde);
    const jaren = parseInt(hoedanigheid);

    if (isNaN(aankoop) || isNaN(rest) || isNaN(jaren) || 
        aankoop <= 0 || rest < 0 || jaren <= 0 || rest >= aankoop) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const resultaten: AfschrijvingResultaat[] = [];
    let boekwaarde = aankoop;
    let cumulatief = 0;

    if (methode === "lineair") {
      const jaarlijksBedrag = (aankoop - rest) / jaren;
      
      for (let i = 1; i <= jaren; i++) {
        const afschrijving = Math.min(jaarlijksBedrag, boekwaarde - rest);
        cumulatief += afschrijving;
        boekwaarde -= afschrijving;
        
        resultaten.push({
          jaar: i,
          boekwaardeBegin: Math.round((boekwaarde + afschrijving) * 100) / 100,
          afschrijving: Math.round(afschrijving * 100) / 100,
          boekwaardeEind: Math.round(Math.max(boekwaarde, rest) * 100) / 100,
          cumulatief: Math.round(cumulatief * 100) / 100,
        });
      }
    } else {
      // Degressief (vast percentage van boekwaarde)
      const percentage = 2 / jaren * 100; // Boekhoudkundig dubbel
      let resterendeJaren = jaren;
      
      for (let i = 1; i <= jaren; i++) {
        const afschrijving = Math.min(boekwaarde * (percentage / 100), boekwaarde - rest);
        cumulatief += afschrijving;
        boekwaarde -= afschrijving;
        
        resultaten.push({
          jaar: i,
          boekwaardeBegin: Math.round((boekwaarde + afschrijving) * 100) / 100,
          afschrijving: Math.round(afschrijving * 100) / 100,
          boekwaardeEind: Math.round(Math.max(boekwaarde, rest) * 100) / 100,
          cumulatief: Math.round(cumulatief * 100) / 100,
        });
        
        if (boekwaarde <= rest) break;
      }
    }

    setResultaat(resultaten);
    setTimeout(() => setIsCalculating(false), 150);
  }, [aankoopprijs, restwaarde, hoedanigheid, methode]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setAankoopprijs("25000");
    setRestwaarde("5000");
    setHoedanigheid("5");
    setMethode("lineair");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const presets = [
    { label: "Auto", icon: Car, prijs: "25000", rest: "5000", jaren: "5" },
    { label: "Computer", icon: Laptop, prijs: "1500", rest: "100", jaren: "3" },
    { label: "Telefoon", icon: Smartphone, prijs: "1000", rest: "100", jaren: "2" },
  ];

  const resultText = resultaat
    ? `Aankoop: €${aankoopprijs} | Restwaarde: €${restwaarde} | ${hoedanigheid} jaar | Methode: ${methode}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="DeprecitatieCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Afschrijving Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken de afschrijving van auto's, apparaten en 
              andere bedrijfsmiddelen over de tijd.
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
              <h2 className="text-lg font-bold mb-4">Afschrijving Gegevens</h2>

              {/* Presets */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Snelle keuze</label>
                <div className="grid grid-cols-3 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setAankoopprijs(p.prijs);
                        setRestwaarde(p.rest);
                        setHoedanigheid(p.jaren);
                      }}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <p.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Aankoopprijs */}
              <div className="mb-4">
                <label htmlFor="aankoop" className="block text-sm font-medium mb-2">
                  Aankoopprijs (€)
                </label>
                <input
                  id="aankoop"
                  type="text"
                  inputMode="decimal"
                  value={aankoopprijs}
                  onChange={(e) => setAankoopprijs(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Restwaarde */}
              <div className="mb-4">
                <label htmlFor="rest" className="block text-sm font-medium mb-2">
                  Restwaarde (€)
                </label>
                <input
                  id="rest"
                  type="text"
                  inputMode="decimal"
                  value={restwaarde}
                  onChange={(e) => setRestwaarde(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Hoedanigheid */}
              <div className="mb-4">
                <label htmlFor="jaren" className="block text-sm font-medium mb-2">
                  Afschrijvingstermijn (jaren)
                </label>
                <input
                  id="jaren"
                  type="number"
                  value={hoedanigheid}
                  onChange={(e) => setHoedanigheid(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Methode */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    Afschrijvingsmethode
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMethode("lineair")}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                      methode === "lineair" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    Lineair
                  </button>
                  <button
                    onClick={() => setMethode("degressief")}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                      methode === "degressief" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    Degressief
                  </button>
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
                    toolName="Afschrijving Calculator" 
                    result={resultText}
                    url="/tools/deprecitatie-calculator"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Afschrijving Overzicht</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Jaar</th>
                            <th className="text-right py-2">Boekwaarde</th>
                            <th className="text-right py-2">Afschrijving</th>
                            <th className="text-right py-2">Cumulatief</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultaat.map((r) => (
                            <tr key={r.jaar} className="border-b border-muted">
                              <td className="py-2">{r.jaar}</td>
                              <td className="text-right">€ {formatBedrag(r.boekwaardeBegin)}</td>
                              <td className="text-right text-red-500">-€ {formatBedrag(r.afschrijving)}</td>
                              <td className="text-right">€ {formatBedrag(r.cumulatief)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totaal */}
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Aankoopprijs</span>
                        <span className="font-medium">€ {parseFloat(aankoopprijs).toLocaleString("nl-NL")}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Totale afschrijving</span>
                        <span className="font-medium text-red-500">
                          -€ {formatBedrag(resultaat[resultaat.length - 1]?.cumulatief || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Restwaarde</span>
                        <span>€ {parseFloat(restwaarde).toLocaleString("nl-NL")}</span>
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
            <h2 className="text-xl font-bold mb-4">Alles over Afschrijving</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>afschrijving calculator</strong> bereken je eenvoudig hoeveel waarde 
                je bedrijfsmiddelen verliezen over tijd. Geschikt voor auto's, computers, machines 
                en andere investeringen.
              </p>
              <p className="mb-4">
                Bij <strong>lineaire afschrijving</strong> trek je elk jaar een vast bedrag af van de 
                aankoopprijs minus de restwaarde. Dit is de eenvoudigste methode en vaak gebruikt voor 
                administratiedoeleinden.
              </p>
              <p>
                Bij <strong>degressieve afschrijving</strong> schrijf je een vast percentage van de 
                boekwaarde af. Dit realistischer voor activa die sneller verouderen, zoals computers 
                en telefoons.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={afschrijvingFAQ} title="Veelgestelde vragen over afschrijving" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/inflatie" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Inflatie</p>
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
