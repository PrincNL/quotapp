"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Euro, Sun, RotateCcw, Info } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import Link from "next/link";

export function VerlofCalculatorClient() {
  const [urenPerWeek, setUrenPerWeek] = useState("40");
  const [dagenPerWeek, setDagenPerWeek] = useState("5");
  const [maandSalaris, setMaandSalaris] = useState("3000");
  const [opgenomenDagen, setOpgenomenDagen] = useState("10");

  const calculate = () => {
    const uren = parseInt(urenPerWeek) || 40;
    const dagen = parseInt(dagenPerWeek) || 5;
    const salaris = parseFloat(maandSalaris) || 3000;
    const opgenomen = parseInt(opgenomenDagen) || 0;

    // Wettelijke vakantiedagen: 4x de arbeidsuren per week
    const wettelijkeDagen = Math.round((uren * 4) / 8); // Omzetten naar dagen van 8 uur
    const advDagen = 0; // ADV is cao-afhankelijk

    const resterendeDagen = Math.max(0, wettelijkeDagen + advDagen - opgenomen);
    const uurloon = salaris / (dagen * 4.33 * 8);
    const uitbetaling = Math.round(resterendeDagen * 8 * uurloon * 100) / 100;

    return { wettelijkeDagen, advDagen, resterendeDagen, uitbetaling, uurloon };
  };

  const resultaat = calculate();

  const formatBedrag = (value: number) => value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg">
                <Sun className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Verlof" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Verlof Calculator</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je wettelijke vakantiedagen en hoeveel je uitbetaald krijgt bij uitdiensttreding.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Werkgegevens</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Uren per week</label>
                <input type="number" value={urenPerWeek}
                  onChange={(e) => setUrenPerWeek(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Dagen per week</label>
                <input type="number" min="1" max="7" value={dagenPerWeek}
                  onChange={(e) => setDagenPerWeek(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Maandsalaris (bruto €)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input type="text" value={maandSalaris}
                    onChange={(e) => setMaandSalaris(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Opgenomen vakantiedagen (dit jaar)</label>
                <input type="number" min="0" value={opgenomenDagen}
                  onChange={(e) => setOpgenomenDagen(e.target.value)}
                  className="w-full px-4 py-4 text-lg input" />
              </div>

              <button onClick={() => { setUrenPerWeek("40"); setDagenPerWeek("5"); setMaandSalaris("3000"); setOpgenomenDagen("10"); }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-4">Resultaat</h2>
              
              <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="p-6 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Resterende vakantiedagen</p>
                  <p className="text-3xl font-bold text-yellow-600">{resultaat.resterendeDagen} dagen</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Wettelijke dagen</span>
                    <span className="font-medium">{resultaat.wettelijkeDagen} dagen</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Uurloon</span>
                    <span className="font-medium">€ {formatBedrag(resultaat.uurloon)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-yellow-500/10 rounded-lg">
                    <span className="text-muted-foreground">Uitbetaling bij uitdienst</span>
                    <span className="font-bold text-yellow-600">€ {formatBedrag(resultaat.uitbetaling)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <InlineAd slot={AD_SLOTS.toolInline} />

          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Vakantiedagen in Nederland</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                In Nederland hebben werknemers recht op <strong>wettelijke vakantiedagen</strong>. 
                Dit is 4 keer de overeengekomen arbeidsuren per week. 
                Bij een fulltime dienstverband (40 uur/week) is dit minimaal 20 dagen per jaar.
              </p>
              <p>
                Naast wettelijke dagen kunnen er <strong>ADV-dagen</strong> (arbeidsduurverkorting) gelden via de cao. 
                Vakantiedagen vervallen 6 maanden na het einde van het jaar waarin ze zijn opgebouwd.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Euro className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
            </div>
          </div>
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
