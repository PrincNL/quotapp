"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, RotateCcw, Info } from "lucide-react";

interface BMIRange {
  min: number;
  max: number;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

const bmiRanges: BMIRange[] = [
  { min: 0, max: 18.5, label: "Ondergewicht", color: "#3b82f6", bgColor: "hsl(var(--info-muted))", description: "Je hebt een lager gewicht dan normaal voor je lengte." },
  { min: 18.5, max: 25, label: "Gezond gewicht", color: "#22c55e", bgColor: "hsl(var(--success-muted))", description: "Je hebt een gezond gewicht voor je lengte." },
  { min: 25, max: 30, label: "Overgewicht", color: "#f59e0b", bgColor: "hsl(var(--warning-muted))", description: "Je hebt een hoger gewicht dan normaal voor je lengte." },
  { min: 30, max: 100, label: "Obesitas", color: "#ef4444", bgColor: "hsl(var(--error-muted))", description: "Je hebt een significant hoger gewicht dan normaal." },
];

export function BMICalculatorClient() {
  const [lengte, setLengte] = useState("");
  const [gewicht, setGewicht] = useState("");
  const [resultaat, setResultaat] = useState<{ bmi: number; range: BMIRange } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Live calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [lengte, gewicht]);

  const bereken = useCallback(() => {
    const lengteM = parseFloat(lengte.replace(",", ".")) / 100; // cm to m
    const gewichtKg = parseFloat(gewicht.replace(",", "."));

    if (isNaN(lengteM) || isNaN(gewichtKg) || lengteM <= 0 || gewichtKg <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const bmi = gewichtKg / (lengteM * lengteM);
    const range = bmiRanges.find(r => bmi >= r.min && bmi < r.max) || bmiRanges[3];

    setResultaat({
      bmi: Math.round(bmi * 10) / 10,
      range,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [lengte, gewicht]);

  const reset = () => {
    setLengte("");
    setGewicht("");
    setResultaat(null);
  };

  // Calculate gauge position (0-100%)
  const getGaugePosition = (bmi: number) => {
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 15) / 25) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">BMI Calculator</h1>
        <p className="text-muted-foreground">Bereken je Body Mass Index en check of je een gezond gewicht hebt.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="lengte" className="flex items-center gap-2 text-sm font-medium mb-2">
              <Scale className="w-4 h-4" />
              Lengte (cm)
            </label>
            <input
              id="lengte"
              type="text"
              inputMode="decimal"
              value={lengte}
              onChange={(e) => setLengte(e.target.value.replace(/[^0-9.,]/g, ""))}
              placeholder="175"
              className="w-full px-4 py-3 input"
            />
          </div>

          <div>
            <label htmlFor="gewicht" className="flex items-center gap-2 text-sm font-medium mb-2">
              <Scale className="w-4 h-4" />
              Gewicht (kg)
            </label>
            <input
              id="gewicht"
              type="text"
              inputMode="decimal"
              value={gewicht}
              onChange={(e) => setGewicht(e.target.value.replace(/[^0-9.,]/g, ""))}
              placeholder="70"
              className="w-full px-4 py-3 input"
            />
          </div>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <AnimatePresence mode="wait">
          {resultaat ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* BMI Display */}
              <motion.div
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: resultaat.range.bgColor }}
                animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
              >
                <p className="text-sm text-muted-foreground mb-1">Je BMI</p>
                <p className="text-5xl font-bold" style={{ color: resultaat.range.color }}>
                  {resultaat.bmi}
                </p>
                <p className="font-medium mt-2" style={{ color: resultaat.range.color }}>
                  {resultaat.range.label}
                </p>
              </motion.div>

              {/* Gauge */}
              <div className="relative">
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div className="flex-1 bg-blue-500" />
                    <div className="flex-1 bg-green-500" />
                    <div className="flex-1 bg-yellow-500" />
                    <div className="flex-1 bg-red-500" />
                  </div>
                </div>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
                  initial={{ left: "0%" }}
                  animate={{ left: `${getGaugePosition(resultaat.bmi)}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="w-4 h-4 bg-foreground rounded-full -translate-x-1/2 border-2 border-background shadow-lg" />
                </motion.div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-muted rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{resultaat.range.description}</p>
                </div>
              </motion.div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {bmiRanges.map((range) => (
                  <div key={range.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: range.color }} />
                    <span className="text-muted-foreground">
                      {range.min}-{range.max === 100 ? "+" : range.max}: {range.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground py-12 border-2 border-dashed border-border rounded-xl"
            >
              <Scale className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Vul je lengte en gewicht in</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
