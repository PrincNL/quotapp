"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Euro, TrendingUp, Users, RotateCcw } from "lucide-react";

interface Resultaat {
  maxHypotheek: number;
  maandlasten: number;
  totaalInkomen: number;
  maandlastenNetto: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function HypotheekCalculatorClient() {
  const [inkomen, setInkomen] = useState("");
  const [partnerInkomen, setPartnerInkomen] = useState("");
  const [rente, setRente] = useState("3.5");
  const [looptijd, setLooptijd] = useState(30);
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Live calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [inkomen, partnerInkomen, rente, looptijd]);

  const bereken = useCallback(() => {
    const inkomenNum = parseFloat(inkomen) || 0;
    const partnerNum = parseFloat(partnerInkomen) || 0;
    const totaalInkomen = inkomenNum + partnerNum;
    
    if (totaalInkomen <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Max 4.5x jaarinkomen (conservatieve schatting)
    const maxHypotheek = totaalInkomen * 4.5;
    
    // Maandlasten berekenen (annuïteitenhypotheek)
    const maandRente = parseFloat(rente) / 100 / 12;
    const aantalMaanden = looptijd * 12;
    
    let maandlasten = 0;
    if (maandRente > 0) {
      maandlasten = maxHypotheek * (maandRente * Math.pow(1 + maandRente, aantalMaanden)) / (Math.pow(1 + maandRente, aantalMaanden) - 1);
    } else {
      maandlasten = maxHypotheek / aantalMaanden;
    }

    // Geschatte netto maandlasten (ruwe schatting: ~65% van bruto)
    const maandlastenNetto = maandlasten * 0.65;

    setResultaat({
      maxHypotheek: Math.round(maxHypotheek),
      maandlasten: Math.round(maandlasten),
      totaalInkomen: Math.round(totaalInkomen),
      maandlastenNetto: Math.round(maandlastenNetto),
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [inkomen, partnerInkomen, rente, looptijd]);

  const reset = () => {
    setInkomen("");
    setPartnerInkomen("");
    setRente("3.5");
    setLooptijd(30);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Hypotheek Calculator</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Bereken je maximale hypotheek en maandlasten op basis van je inkomen.
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Input Section */}
        <motion.div className="card" variants={fadeInUp}>
          <div className="space-y-5">
            <div>
              <label htmlFor="inkomen" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Users className="w-4 h-4" />
                Jouw bruto jaarinkomen
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <input
                  id="inkomen"
                  type="number"
                  value={inkomen}
                  onChange={(e) => setInkomen(e.target.value)}
                  placeholder="45000"
                  className="w-full pl-10 pr-4 py-3 input"
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="partner" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Users className="w-4 h-4" />
                Partner bruto jaarinkomen <span className="text-muted-foreground">(optioneel)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <input
                  id="partner"
                  type="number"
                  value={partnerInkomen}
                  onChange={(e) => setPartnerInkomen(e.target.value)}
                  placeholder="35000"
                  className="w-full pl-10 pr-4 py-3 input"
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rente" className="flex items-center gap-2 text-sm font-medium mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Rente
                </label>
                <div className="relative">
                  <input
                    id="rente"
                    type="number"
                    step="0.1"
                    value={rente}
                    onChange={(e) => setRente(e.target.value)}
                    className="w-full pl-4 pr-8 py-3 input"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="looptijd" className="text-sm font-medium mb-2 block">Looptijd</label>
                <select
                  id="looptijd"
                  value={looptijd}
                  onChange={(e) => setLooptijd(parseInt(e.target.value))}
                  className="w-full px-4 py-3 input"
                >
                  {[10, 15, 20, 25, 30].map((jaren) => (
                    <option key={jaren} value={jaren}>{jaren} jaar</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div className="card" variants={fadeInUp}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Home className="w-5 h-5" />
            Resultaat
          </h2>

          <AnimatePresence mode="wait">
            {resultaat ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <motion.div
                  className="p-5 bg-[hsl(var(--calc-result-bg))] rounded-xl border-2 border-[hsl(var(--calc-highlight))]"
                  animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                >
                  <p className="text-sm text-muted-foreground mb-1">Maximale hypotheek</p>
                  <p className="text-3xl font-bold text-[hsl(var(--calc-result-text))]">
                    € {formatBedrag(resultaat.maxHypotheek)}
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className="p-4 bg-[hsl(var(--info-muted))] rounded-lg"
                    animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ delay: 0.05 }}
                  >
                    <p className="text-xs text-muted-foreground mb-1">Bruto maandlasten</p>
                    <p className="text-xl font-bold text-[hsl(var(--info))]">
                      € {formatBedrag(resultaat.maandlasten)}
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-[hsl(var(--success-muted))] rounded-lg"
                    animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-xs text-muted-foreground mb-1">Geschat netto per maand</p>
                    <p className="text-xl font-bold text-[hsl(var(--success))]">
                      € {formatBedrag(resultaat.maandlastenNetto)}
                    </p>
                  </motion.div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Totaal inkomen: <strong>€ {formatBedrag(resultaat.totaalInkomen)}</strong>
                  </p>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  * Dit is een indicatie. Voor een exacte berekening neem contact op met een hypotheekadviseur.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground py-12"
              >
                <Home className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Vul je inkomen in om te beginnen</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
