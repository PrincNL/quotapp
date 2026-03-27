"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Receipt, Euro, TrendingUp, RotateCcw, Info } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import Link from "next/link";

export function AftrekpostenCalculatorClient() {
  const [inkomen, setInkomen] = useState("55000");
  const [hypotheekRente, setHypotheekRente] = useState("8000");
  const [giften, setGiften] = useState("500");
  const [donaties, setDonaties] = useState("100");
  const [reiskosten, setReiskosten] = useState("1500");

  const calculate = () => {
    const ink = parseFloat(inkomen) || 0;
    const hyp = parseFloat(hypotheekRente) || 0;
    const gif = parseFloat(giften) || 0;
    const don = parseFloat(donaties) || 0;
    const reis = parseFloat(reiskosten) || 0;

    // Belastbaar inkomen
    const belastingInkomen = ink;
    
    // Hypotheekrente (37% aftrekbaar in 2026)
    const hypAftrek = Math.round(hyp * 0.37);
    
    // Giften (anno 2026: 1% drempel, max 10% van inkomen boven drempel)
    const drempel = ink * 0.01;
    const gifAftrek = gif > drempel ? Math.min(gif - drempel, ink * 0.10) : 0;
    const gifBelastingVoordeel = Math.round(gifAftrek * 0.37);
    
    // Donaties (max €1.250 zonder drempel)
    const donAftrek = Math.min(don, 1250);
    
    // Reiskosten (€0.23 per km, max 30 km enkele reis)
    const reiskostenAftrek = reis * 0.23;
    
    // Totaal aftrekposten
    const totaalAftrek = hypAftrek + gifAftrek + donAftrek + reiskostenAftrek;
    
    // Belastingvoordeel (gemiddelde 37%)
    const belastingVoordeel = Math.round(totaalAftrek * 0.37);
    
    return { hypAftrek, gifAftrek, gifBelastingVoordeel, donAftrek, reiskostenAftrek, totaalAftrek, belastingVoordeel, drempel };
  };

  const resultaat = calculate();

  const formatBedrag = (value: number) => value.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Receipt className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Aftrekposten" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Aftrekposten Calculator</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken welke aftrekposten je kunt opgeven bij je belastingaangifte en hoeveel belastingvoordeel dit oplevert.
            </p>
          </motion.div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                <strong>Let op:</strong> De percentages zijn indicatief voor 2026. 
                Raadpleeg de Belastingdienst of een accountant voor definitieve berekeningen.
              </p>
            </div>
          </div>

          <motion.div className="grid md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Jouw Gegevens</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bruto jaarinkomen (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={inkomen}
                    onChange={(e) => setInkomen(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Hypotheekrente (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={hypotheekRente}
                    onChange={(e) => setHypotheekRente(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">37% aftrekbaar in 2026</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Giften aan goede doelen (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={giften}
                    onChange={(e) => setGiften(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Drempel: 1% van inkomen (€{formatBedrag(resultaat.drempel)})</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Periodieke giften (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={donaties}
                    onChange={(e) => setDonaties(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Max €1.250, volledig aftrekbaar</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2"> zakelijke reiskosten (€)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={reiskosten}
                    onChange={(e) => setReiskosten(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">€0,23 per km, max 30 km enkele reis</p>
              </div>

              <button onClick={() => { setInkomen("55000"); setHypotheekRente("8000"); setGiften("500"); setDonaties("100"); setReiskosten("1500"); }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-4">Resultaat</h2>
              
              <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Belastingvoordeel</p>
                  <p className="text-3xl font-bold text-emerald-600">€ {formatBedrag(resultaat.belastingVoordeel)}</p>
                  <p className="text-xs text-muted-foreground mt-1">per jaar</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Hypotheekrente aftrek</span>
                    <span className="font-medium text-emerald-600">€ {formatBedrag(resultaat.hypAftrek)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Giften aftrek</span>
                    <span className="font-medium text-emerald-600">€ {formatBedrag(resultaat.gifAftrek)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Periodieke giften</span>
                    <span className="font-medium text-emerald-600">€ {formatBedrag(resultaat.donAftrek)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Reiskosten</span>
                    <span className="font-medium text-emerald-600">€ {formatBedrag(resultaat.reiskostenAftrek)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-emerald-500/10 rounded-lg">
                    <span className="font-medium">Totaal aftrekbaar</span>
                    <span className="font-bold text-emerald-600">€ {formatBedrag(resultaat.totaalAftrek)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <InlineAd slot={AD_SLOTS.toolInline} />

          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Belasting Aftrekposten 2026</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                In Nederland kun je diverse kosten aftrekken van je inkomen bij de belastingaangifte. 
                Dit verlaagt je belastbaar inkomen en dus je belasting.
              </p>
              <h3 className="text-lg font-semibold mb-2">Veelvoorkomende Aftrekposten</h3>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li><strong>Hypotheekrente</strong> - 37% aftrekbaar (2026)</li>
                <li><strong>Giften</strong> - Boven 1% drempel, max 10% van inkomen</li>
                <li><strong>Periodieke giften</strong> - Max €1.250 volledig aftrekbaar</li>
                <li><strong>Zakelijke reiskosten</strong> - €0,23 per km</li>
                <li><strong>Studiekosten</strong> - Voor bepaalde opleidingen</li>
              </ul>
              <p>
                Gebruik onze <strong>aftrekposten calculator</strong> voor een indicatie van je belastingvoordeel. 
                Raadpleeg de Belastingdienst of een accountant voor definitieve berekeningen.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
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
