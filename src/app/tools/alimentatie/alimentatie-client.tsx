"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Euro, Heart, RotateCcw, Info } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import Link from "next/link";

export function AlimentatieCalculatorClient() {
  const [inkomenBetaler, setInkomenBetaler] = useState("50000");
  const [inkomenOntvanger, setInkomenOntvanger] = useState("25000");
  const [kinderen, setKinderen] = useState("1");
  const [huwelijksduur, setHuwelijksduur] = useState("10");
  const [resultaat, setResultaat] = useState<{
    partneralimentatie: number;
    kinderalimentatie: number;
    totaal: number;
  } | null>(null);

  const bereken = useCallback(() => {
    const inkomenB = parseFloat(inkomenBetaler) || 0;
    const inkomenO = parseFloat(inkomenOntvanger) || 0;
    const kinderCount = parseInt(kinderen) || 0;
    const duur = parseInt(huwelijksduur) || 0;
    
    if (inkomenB <= 0) {
      setResultaat(null);
      return;
    }

    // Vereenvoudigde alimentatie berekening (indicatief)
    // Bron: Rechtspraak richtlijnen
    
    // Partneralimentatie: ~30% van het verschil, max 5 jaar per 5 jaar huwelijk
    const verschil = inkomenB - inkomenO;
    let partneralimentatie = 0;
    
    if (verschil > 0 && duur > 0) {
      // Maximale duur: 1 jaar per 3 jaar huwelijk, max 12 jaar
      const maxDuur = Math.min(12, Math.ceil(duur / 3));
      partneralimentatie = Math.round((verschil * 0.30) / 12); // Per maand
    }

    // Kinderalimentatie: obv Tremanormen (vereenvoudigd)
    const kinderFactor = [0, 0, 0.15, 0.25, 0.32, 0.38, 0.43, 0.47, 0.50, 0.53, 0.55];
    const factor = kinderFactor[Math.min(kinderCount, 10)] || 0.55;
    const kinderalimentatie = Math.round(inkomenB * factor / 12);

    setResultaat({
      partneralimentatie: Math.max(0, partneralimentatie),
      kinderalimentatie: Math.max(0, kinderalimentatie),
      totaal: Math.max(0, partneralimentatie + kinderalimentatie),
    });
  }, [inkomenBetaler, inkomenOntvanger, kinderen, huwelijksduur]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const formatBedrag = (value: number) => value.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg">
                <Heart className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Alimentatie" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Alimentatie Calculator</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken een indicatieve partner- en kinderalimentatie. 
              Gebaseerd op richtlijnen van Rechtspraak.
            </p>
          </motion.div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Disclaimer:</strong> Deze calculator geeft een indicatie op basis van standaard richtlijnen. 
                De werkelijke alimentatie wordt bepaald door de rechter en kan afwijken. 
                Raadpleeg een advocaat voor definitief advies.
              </p>
            </div>
          </div>

          <motion.div className="grid md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Inkomen Gegevens</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bruto inkomen betaler (€ / jaar)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={inkomenBetaler} 
                    onChange={(e) => setInkomenBetaler(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bruto inkomen ontvanger (€ / jaar)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={inkomenOntvanger}
                    onChange={(e) => setInkomenOntvanger(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Aantal kinderen</label>
                <input type="number" min="0" max="10" value={kinderen}
                  onChange={(e) => setKinderen(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
                <div className="flex gap-2 mt-2">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <button key={k} onClick={() => setKinderen(String(k))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${kinderen === String(k) ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      {k === 0 ? "Geen" : k}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Huwelijksduur (jaren)</label>
                <input type="number" min="0" max="50" value={huwelijksduur}
                  onChange={(e) => setHuwelijksduur(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
              </div>

              <button onClick={() => { setInkomenBetaler("50000"); setInkomenOntvanger("25000"); setKinderen("1"); setHuwelijksduur("10"); setResultaat(null); }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-4">Indicatief Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4">
                    <motion.div className="p-6 bg-pink-500/10 border-2 border-pink-500/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Totale alimentatie (per maand)</p>
                      <p className="text-3xl font-bold text-pink-600">€ {formatBedrag(resultaat.totaal)}</p>
                    </motion.div>

                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Users className="w-4 h-4" /> Partneralimentatie
                        </span>
                        <span className="font-medium">€ {formatBedrag(resultaat.partneralimentatie)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Users className="w-4 h-4" /> Kinderalimentatie
                        </span>
                        <span className="font-medium">€ {formatBedrag(resultaat.kinderalimentatie)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      * Indicatie gebaseerd op standaard richtlijnen. 
                      Raadpleeg een advocaat voor definitief advies.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12">
                    <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <InlineAd slot={AD_SLOTS.toolInline} />

          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Alimentatie</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                <strong>Alimentatie</strong> is een bijdrage in de kosten van levensonderhoud na een scheiding. 
                Er zijn twee soorten: partneralimentatie en kinderalimentatie.
              </p>
              <h3 className="text-lg font-semibold mb-2">Partneralimentatie</h3>
              <p className="mb-4">
                Partneralimentatie wordt betaald aan de ex-partner en is bedoeld om een periode van financiële 
                aanpassing te overbruggen. De duur is afhankelijk van de huwelijksduur: 
                1 jaar alimentatie per 3 jaar huwelijk, met een maximum van 12 jaar.
              </p>
              <h3 className="text-lg font-semibold mb-2">Kinderalimentatie</h3>
              <p className="mb-4">
                Kinderalimentatie wordt betaald voor de verzorging en opvoeding van de kinderen. 
                Deze is niet aftrekbaar voor de betaler en niet belastbaar voor de ontvanger. 
                De hoogte wordt bepaald op basis van de Tremamethode.
              </p>
              <p>
                Gebruik onze <strong>alimentatie calculator</strong> voor een eerste indicatie. 
                Voor definitieve berekeningen raden we aan om een advocaat of mediator in te schakelen.
              </p>
            </div>
          </div>
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
