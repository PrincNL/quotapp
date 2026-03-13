"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, RotateCcw, Briefcase } from "lucide-react";

interface DateResult {
  dagen: number;
  weken: number;
  maanden: number;
  jaren: number;
  werkdagen: number;
  weekenden: number;
}

export function DatumCalculatorClient() {
  const [datum1, setDatum1] = useState("");
  const [datum2, setDatum2] = useState("");
  const [resultaat, setResultaat] = useState<DateResult | null>(null);
  const [exclusiefWeekend, setExclusiefWeekend] = useState(false);

  // Live calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [datum1, datum2, exclusiefWeekend]);

  const bereken = useCallback(() => {
    if (!datum1 || !datum2) {
      setResultaat(null);
      return;
    }

    const d1 = new Date(datum1);
    const d2 = new Date(datum2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setResultaat(null);
      return;
    }

    // Ensure d1 is earlier
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;

    // Calculate days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const dagen = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate working days
    let werkdagen = 0;
    let weekenden = 0;
    const current = new Date(start);
    
    while (current <= end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekenden++;
      } else {
        werkdagen++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Adjust for exclusive counting
    const finalDagen = exclusiefWeekend ? werkdagen : dagen;

    setResultaat({
      dagen: finalDagen,
      weken: Math.round((finalDagen / 7) * 10) / 10,
      maanden: Math.round((finalDagen / 30.44) * 10) / 10,
      jaren: Math.round((finalDagen / 365.25) * 10) / 10,
      werkdagen,
      weekenden,
    });
  }, [datum1, datum2, exclusiefWeekend]);

  const reset = () => {
    setDatum1("");
    setDatum2("");
    setExclusiefWeekend(false);
    setResultaat(null);
  };

  const setToday = (setter: (date: string) => void) => {
    const today = new Date().toISOString().split("T")[0];
    setter(today);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Datum Calculator</h1>
        <p className="text-muted-foreground">Bereken het verschil tussen twee datums.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="space-y-5">
          {/* Date 1 */}
          <div>
            <label htmlFor="datum1" className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4" />
              Eerste datum
            </label>
            <div className="flex gap-2">
              <input
                id="datum1"
                type="date"
                value={datum1}
                onChange={(e) => setDatum1(e.target.value)}
                className="flex-1 px-4 py-3 input"
              />
              <button
                onClick={() => setToday(setDatum1)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                Vandaag
              </button>
            </div>
          </div>

          {/* Date 2 */}
          <div>
            <label htmlFor="datum2" className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4" />
              Tweede datum
            </label>
            <div className="flex gap-2">
              <input
                id="datum2"
                type="date"
                value={datum2}
                onChange={(e) => setDatum2(e.target.value)}
                className="flex-1 px-4 py-3 input"
              />
              <button
                onClick={() => setToday(setDatum2)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                Vandaag
              </button>
            </div>
          </div>

          {/* Toggle */}
          <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={exclusiefWeekend}
              onChange={(e) => setExclusiefWeekend(e.target.checked)}
              className="w-4 h-4"
            />
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">Alleen werkdagen tellen (exclusief weekend)</span>
            </div>
          </label>

          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Result */}
          <AnimatePresence mode="wait">
            {resultaat ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-3"
              >
                <motion.div
                  className="p-5 bg-[hsl(var(--calc-result-bg))] rounded-xl border-2 border-[hsl(var(--calc-highlight))] text-center"
                >
                  <p className="text-sm text-muted-foreground mb-1">
                    {exclusiefWeekend ? "Werkdagen" : "Dagen"}
                  </p>
                  <p className="text-5xl font-bold text-[hsl(var(--calc-result-text))]">
                    {resultaat.dagen}
                  </p>
                </motion.div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Weken</p>
                    <p className="text-xl font-bold">{resultaat.weken}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Maanden</p>
                    <p className="text-xl font-bold">{resultaat.maanden}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Jaren</p>
                    <p className="text-xl font-bold">{resultaat.jaren}</p>
                  </div>
                </div>

                {!exclusiefWeekend && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[hsl(var(--success-muted))] rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Werkdagen</p>
                      <p className="text-xl font-bold text-[hsl(var(--success))]">{resultaat.werkdagen}</p>
                    </div>
                    <div className="p-3 bg-[hsl(var(--warning-muted))] rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Weekenddagen</p>
                      <p className="text-xl font-bold text-[hsl(var(--warning))]">{resultaat.weekenden}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground py-8 border-2 border-dashed border-border rounded-xl"
              >
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Selecteer twee datums</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
