"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, ArrowRightLeft, RotateCcw } from "lucide-react";

type CalcMode = "van" | "percentage" | "stijging";

interface ModeConfig {
  label: string;
  description: string;
  l1: string;
  l2: string;
  p1: string;
  p2: string;
}

const modes: Record<CalcMode, ModeConfig> = {
  van: {
    label: "X% van Y",
    description: "Bereken een percentage van een bedrag",
    l1: "Percentage (%)",
    l2: "Bedrag",
    p1: "20",
    p2: "100",
  },
  percentage: {
    label: "X is % van Y",
    description: "Bereken welk percentage een waarde is van het totaal",
    l1: "Deel",
    l2: "Totaal",
    p1: "25",
    p2: "100",
  },
  stijging: {
    label: "% stijging/daling",
    description: "Bereken het percentage verschil tussen twee waarden",
    l1: "Oude waarde",
    l2: "Nieuwe waarde",
    p1: "80",
    p2: "100",
  },
};

export function ProcentCalculatorClient() {
  const [mode, setMode] = useState<CalcMode>("van");
  const [waarde1, setWaarde1] = useState("");
  const [waarde2, setWaarde2] = useState("");
  const [resultaat, setResultaat] = useState<{ text: string; value: number } | null>(null);

  // Live calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 200);
    return () => clearTimeout(timer);
  }, [waarde1, waarde2, mode]);

  const bereken = useCallback(() => {
    const num1 = parseFloat(waarde1.replace(",", "."));
    const num2 = parseFloat(waarde2.replace(",", "."));

    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
      setResultaat(null);
      return;
    }

    switch (mode) {
      case "van": {
        const result = (num1 / 100) * num2;
        setResultaat({
          text: `${num1}% van ${num2} =`,
          value: result,
        });
        break;
      }
      case "percentage": {
        const result = (num1 / num2) * 100;
        setResultaat({
          text: `${num1} is ${result.toFixed(2).replace(".", ",")}% van ${num2}`,
          value: result,
        });
        break;
      }
      case "stijging": {
        const result = ((num2 - num1) / num1) * 100;
        const type = result >= 0 ? "stijging" : "daling";
        setResultaat({
          text: `Van ${num1} naar ${num2} = ${Math.abs(result).toFixed(2).replace(".", ",")}% ${type}`,
          value: result,
        });
        break;
      }
    }
  }, [waarde1, waarde2, mode]);

  const reset = () => {
    setWaarde1("");
    setWaarde2("");
    setResultaat(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Procent Calculator</h1>
        <p className="text-muted-foreground">Alle percentage berekeningen in één tool.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Mode Selection */}
        <div className="flex flex-wrap gap-2 mb-6" role="tablist">
          {(Object.keys(modes) as CalcMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setWaarde1("");
                setWaarde2("");
                setResultaat(null);
              }}
              className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                mode === m
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              role="tab"
              aria-selected={mode === m}
              title={modes[m].description}
            >
              {modes[m].label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">{modes[mode].description}</p>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="val1" className="block text-sm font-medium mb-2">
              {modes[mode].l1}
            </label>
            <input
              id="val1"
              type="text"
              inputMode="decimal"
              value={waarde1}
              onChange={(e) => setWaarde1(e.target.value.replace(/[^0-9.,]/g, ""))}
              placeholder={modes[mode].p1}
              className="w-full px-4 py-3 input"
            />
          </div>

          <div>
            <label htmlFor="val2" className="block text-sm font-medium mb-2">
              {modes[mode].l2}
            </label>
            <input
              id="val2"
              type="text"
              inputMode="decimal"
              value={waarde2}
              onChange={(e) => setWaarde2(e.target.value.replace(/[^0-9.,]/g, ""))}
              placeholder={modes[mode].p2}
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

        {/* Result */}
        <AnimatePresence mode="wait">
          {resultaat ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="p-6 bg-[hsl(var(--calc-result-bg))] rounded-xl border-2 border-[hsl(var(--calc-highlight))]"
            >
              <p className="text-sm text-muted-foreground mb-2">{resultaat.text}</p>
              {mode === "van" && (
                <p className="text-4xl font-bold text-[hsl(var(--calc-result-text))]">
                  {resultaat.value.toFixed(2).replace(".", ",")}
                </p>
              )}
              {mode === "percentage" && (
                <p className="text-4xl font-bold text-[hsl(var(--calc-result-text))]">
                  {resultaat.value.toFixed(2).replace(".", ",")}%
                </p>
              )}
              {mode === "stijging" && (
                <div className="flex items-center gap-3">
                  <p className={`text-4xl font-bold ${
                    resultaat.value >= 0 ? "text-[hsl(var(--success))]" : "text-[hsl(var(--error))]"
                  }`}>
                    {resultaat.value > 0 ? "+" : ""}
                    {resultaat.value.toFixed(2).replace(".", ",")}%
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {resultaat.value > 0 ? (
                      <span className="text-2xl">📈</span>
                    ) : resultaat.value < 0 ? (
                      <span className="text-2xl">📉</span>
                    ) : null}
                  </motion.div>
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
              <Percent className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>Vul beide velden in</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
