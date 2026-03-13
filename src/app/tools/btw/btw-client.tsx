"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, RotateCcw, Info } from "lucide-react";

interface Resultaat {
  excl: number;
  btw: number;
  incl: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BTWCalculatorClient() {
  const [bedrag, setBedrag] = useState("");
  const [btwType, setBtwType] = useState<21 | 9 | 0>(21);
  const [mode, setMode] = useState<"excl" | "incl">("excl");
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Live calculation with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bedrag, btwType, mode]);

  const bereken = useCallback(() => {
    const bedragNum = parseFloat(bedrag.replace(",", "."));
    if (isNaN(bedragNum) || bedragNum < 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    let excl: number, btw: number, incl: number;

    if (mode === "excl") {
      excl = bedragNum;
      btw = bedragNum * (btwType / 100);
      incl = excl + btw;
    } else {
      incl = bedragNum;
      excl = incl / (1 + btwType / 100);
      btw = incl - excl;
    }

    setResultaat({
      excl: Math.round(excl * 100) / 100,
      btw: Math.round(btw * 100) / 100,
      incl: Math.round(incl * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [bedrag, btwType, mode]);

  const reset = () => {
    setBedrag("");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toFixed(2).replace(".", ",");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          BTW Calculator
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Bereken BTW over elk bedrag. Ondersteunt 21%, 9% en 0%.
          <span className="sr-only">
            Directe berekening van exclusief naar inclusief BTW en vice versa.
          </span>
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Input Section */}
        <motion.div 
          className="md:col-span-2 card"
          variants={fadeInUp}
        >
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6" role="group" aria-label="Berekeningsmodus">
            {[
              { key: "excl", label: "Excl. → Incl.", desc: "Bedrag exclusief BTW naar inclusief BTW" },
              { key: "incl", label: "Incl. → Excl.", desc: "Bedrag inclusief BTW naar exclusief BTW" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => {
                  setMode(m.key as "excl" | "incl");
                  setResultaat(null);
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  mode === m.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                aria-pressed={mode === m.key}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
              {mode === "excl" ? "Bedrag exclusief BTW" : "Bedrag inclusief BTW"}
              <span className="sr-only"> in euro's</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
              <input
                id="bedrag"
                type="text"
                inputMode="decimal"
                value={bedrag}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.,]/g, "");
                  setBedrag(value);
                }}
                placeholder="0,00"
                className="w-full pl-10 pr-4 py-4 text-lg input"
                aria-describedby="bedrag-hint"
              />
            </div>
            <p id="bedrag-hint" className="text-xs text-muted-foreground mt-1">
              Gebruik een komma of punt voor decimalen
            </p>
          </div>

          {/* BTW Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">BTW Percentage</label>
            <div className="flex gap-2" role="radiogroup" aria-label="BTW percentage">
              {[21, 9, 0].map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => setBtwType(percentage as 21 | 9 | 0)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    btwType === percentage
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  role="radio"
                  aria-checked={btwType === percentage}
                >
                  {percentage}%
                </button>
              ))}
            </div>
            <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                {btwType === 21 && "Hoog tarief (standaard voor de meeste producten en diensten)"}
                {btwType === 9 && "Laag tarief (eten, boeken, arbeid voor woningonderhoud)"}
                {btwType === 0 && "Vrijgesteld (export, onderwijs, gezondheidszorg)"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Reset calculator"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div 
          className="card"
          variants={fadeInUp}
        >
          <h2 className="text-lg font-bold mb-4">Resultaat</h2>
          
          <AnimatePresence mode="wait">
            {resultaat ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {/* Exclusief */}
                <motion.div 
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    mode === "incl" 
                      ? "bg-[hsl(var(--calc-result-bg))] border-[hsl(var(--calc-highlight))]" 
                      : "bg-muted border-transparent"
                  }`}
                  animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.15 }}
                >
                  <p className="text-sm text-muted-foreground">Exclusief BTW</p>
                  <p className="text-2xl font-bold">€ {formatBedrag(resultaat.excl)}</p>
                </motion.div>

                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* BTW */}
                <motion.div 
                  className="p-4 bg-[hsl(var(--warning-muted))] rounded-lg"
                  animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.15, delay: 0.05 }}
                >
                  <p className="text-sm text-muted-foreground">BTW ({btwType}%)</p>
                  <p className="text-xl font-bold text-[hsl(var(--warning))]">€ {formatBedrag(resultaat.btw)}</p>
                </motion.div>

                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Inclusief */}
                <motion.div 
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    mode === "excl" 
                      ? "bg-[hsl(var(--calc-result-bg))] border-[hsl(var(--calc-highlight))]" 
                      : "bg-muted border-transparent"
                  }`}
                  animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.15, delay: 0.1 }}
                >
                  <p className="text-sm text-muted-foreground">Inclusief BTW</p>
                  <p className="text-2xl font-bold">€ {formatBedrag(resultaat.incl)}</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground py-12"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                >
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                </motion.div>
                <p>Vul een bedrag in om te berekenen</p>
                <p className="text-sm mt-1">De berekening gebeurt automatisch</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* SEO Content */}
      <motion.div 
        className="mt-12 card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-4">Hoe werkt de BTW calculator?</h2>
        <div className="prose text-muted-foreground max-w-none">
          <p className="mb-4">
            Met deze BTW calculator kun je eenvoudig btw berekenen over elk bedrag. 
            Je kunt kiezen of je wilt berekenen van exclusief naar inclusief btw, 
            of juist andersom. De calculator ondersteunt alle Nederlandse btw-tarieven:
          </p>
          
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>21% btw</strong> - Het standaard btw-tarief voor de meeste producten en diensten</li>
            <li><strong>9% btw</strong> - Verlaagd tarief voor onder andere eten, boeken en arbeid</li>
            <li><strong>0% btw</strong> - Vrijgesteld, bijvoorbeeld voor export of onderwijs</li>
          </ul>
          
          <p>
            De calculator werkt direct in je browser en slaat geen gegevens op. 
            Handig voor ondernemers, boekhouders en iedereen die snel een btw-berekening wil maken!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
