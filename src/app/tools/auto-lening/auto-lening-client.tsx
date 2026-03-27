"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Euro, Calendar, ArrowRight, RotateCcw } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import Link from "next/link";

export function AutoLeningCalculatorClient() {
  const [autoPrijs, setAutoPrijs] = useState("25000");
  const [aanbetaling, setAanbetaling] = useState("5000");
  const [rente, setRente] = useState("5.9");
  const [maanden, setMaanden] = useState("60");
  const [resultaat, setResultaat] = useState<{
    leningBedrag: number;
    maandlasten: number;
    totaalRente: number;
    totaalBedrag: number;
  } | null>(null);

  const bereken = useCallback(() => {
    const prijs = parseFloat(autoPrijs) || 0;
    const aanbet = parseFloat(aanbetaling) || 0;
    const renteJaar = (parseFloat(rente) || 0) / 100;
    const looptijd = parseInt(maanden) || 0;
    
    const leningBedrag = prijs - aanbet;
    
    if (leningBedrag <= 0 || looptijd <= 0) {
      setResultaat(null);
      return;
    }

    const rentePerMaand = renteJaar / 12;
    const maandlasten = leningBedrag * (rentePerMaand * Math.pow(1 + rentePerMaand, looptijd)) / 
                        (Math.pow(1 + rentePerMaand, looptijd) - 1);
    
    const totaalBedrag = maandlasten * looptijd;
    const totaalRente = totaalBedrag - leningBedrag;

    setResultaat({
      leningBedrag,
      maandlasten: Math.round(maandlasten * 100) / 100,
      totaalRente: Math.round(totaalRente * 100) / 100,
      totaalBedrag: Math.round(totaalBedrag * 100) / 100,
    });
  }, [autoPrijs, aanbetaling, rente, maanden]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const formatBedrag = (value: number) => value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <Car className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Auto Lening" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Auto Lening Calculator</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken eenvoudig de maandlasten voor je autofinanciering. 
              Vergelijk aanbieders en kies de beste optie.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Autogegevens</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Auto prijs (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={autoPrijs} onChange={(e) => setAutoPrijs(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
                <div className="flex gap-2 mt-2">
                  {[15000, 20000, 25000, 35000, 50000].map((p) => (
                    <button key={p} onClick={() => setAutoPrijs(String(p))}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${autoPrijs === String(p) ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      €{(p/1000)}k
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Aanbetaling (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={aanbetaling} onChange={(e) => setAanbetaling(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rente (% per jaar)</label>
                <input type="number" step="0.1" value={rente} onChange={(e) => setRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
                <div className="flex gap-2 mt-2">
                  {[4.9, 5.9, 6.9, 7.9].map((r) => (
                    <button key={r} onClick={() => setRente(String(r))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${rente === String(r) ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Looptijd (maanden)</label>
                <input type="number" value={maanden} onChange={(e) => setMaanden(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
                <div className="flex gap-2 mt-2">
                  {[24, 36, 48, 60, 72].map((m) => (
                    <button key={m} onClick={() => setMaanden(String(m))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${maanden === String(m) ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => { setAutoPrijs("25000"); setAanbetaling("5000"); setRente("5.9"); setMaanden("60"); setResultaat(null); }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-4">Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4">
                    <motion.div className="p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Maandlasten</p>
                      <p className="text-3xl font-bold text-blue-600">€ {formatBedrag(resultaat.maandlasten)}</p>
                    </motion.div>

                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Te lenen bedrag</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.leningBedrag)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale rente</span>
                        <span className="font-medium text-orange-500">€ {formatBedrag(resultaat.totaalRente)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-500/10 rounded-lg">
                        <span className="text-muted-foreground">Totaal te betalen</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.totaalBedrag)}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12">
                    <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <InlineAd slot={AD_SLOTS.toolInline} />

          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Auto Financieren in 2026</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Een <strong>auto lening</strong> of autofinanciering is een lening speciaal voor de aankoop van een voertuig. 
                Je kunt kiezen tussen verschillende vormen: persoonlijke lening, lease, of financiering via de dealer.
              </p>
              <h3 className="text-lg font-semibold mb-2">Waar op letten bij autofinanciering</h3>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Vergelijk rentes van minimaal 5 aanbieders</li>
                <li>Let op de looptijd - langer = lagere maandlasten maar meer rente</li>
                <li>Check of je boetevrij extra kunt aflossen</li>
                <li>Overweeg NHG (niet voor auto's, maar wel voor woningen)</li>
                <li>Vergelijk totale kosten, niet alleen de rente</li>
              </ul>
              <p>
                Met onze <strong>autofinanciering calculator</strong> bereken je snel wat je maandelijks betaalt 
                en wat de totale kosten zijn van je autolening.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
            </div>
          </div>
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
