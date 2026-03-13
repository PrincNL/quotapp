"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowUpDown, RotateCcw, Info } from "lucide-react";

const rates: Record<string, { rate: number; name: string; symbol: string; flag: string }> = {
  EUR: { rate: 1, name: "Euro", symbol: "€", flag: "🇪🇺" },
  USD: { rate: 1.09, name: "Amerikaanse Dollar", symbol: "$", flag: "🇺🇸" },
  GBP: { rate: 0.83, name: "Britse Pond", symbol: "£", flag: "🇬🇧" },
  CHF: { rate: 0.94, name: "Zwitserse Frank", symbol: "Fr", flag: "🇨🇭" },
  JPY: { rate: 162.5, name: "Japanse Yen", symbol: "¥", flag: "🇯🇵" },
  CAD: { rate: 1.47, name: "Canadese Dollar", symbol: "C$", flag: "🇨🇦" },
  AUD: { rate: 1.65, name: "Australische Dollar", symbol: "A$", flag: "🇦🇺" },
  CNY: { rate: 7.82, name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
};

export function ValutaConverterClient() {
  const [bedrag, setBedrag] = useState("");
  const [van, setVan] = useState("EUR");
  const [naar, setNaar] = useState("USD");
  const [resultaat, setResultaat] = useState<{ value: number; rate: number } | null>(null);

  // Live conversion
  useEffect(() => {
    const timer = setTimeout(() => {
      convert();
    }, 200);
    return () => clearTimeout(timer);
  }, [bedrag, van, naar]);

  const convert = useCallback(() => {
    const num = parseFloat(bedrag.replace(",", "."));
    if (isNaN(num) || num <= 0) {
      setResultaat(null);
      return;
    }

    const inEUR = num / rates[van].rate;
    const result = inEUR * rates[naar].rate;
    const rate = rates[naar].rate / rates[van].rate;

    setResultaat({
      value: result,
      rate,
    });
  }, [bedrag, van, naar]);

  const swap = () => {
    setVan(naar);
    setNaar(van);
  };

  const reset = () => {
    setBedrag("");
    setResultaat(null);
  };

  const formatNumber = (value: number) => {
    return value.toFixed(2).replace(".", ",");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Valuta Converter</h1>
        <p className="text-muted-foreground">Zet bedragen om naar andere valuta.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="space-y-5">
          {/* Amount Input */}
          <div>
            <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
              Bedrag
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                {rates[van].symbol}
              </span>
              <input
                id="bedrag"
                type="text"
                inputMode="decimal"
                value={bedrag}
                onChange={(e) => setBedrag(e.target.value.replace(/[^0-9.,]/g, ""))}
                placeholder="100"
                className="w-full pl-12 pr-4 py-3 input text-lg"
              />
            </div>
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
            <div>
              <label htmlFor="van" className="block text-sm font-medium mb-2">Van</label>
              <select
                id="van"
                value={van}
                onChange={(e) => setVan(e.target.value)}
                className="w-full px-4 py-3 input"
              >
                {Object.entries(rates).map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.flag} {code} - {info.name}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              onClick={swap}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              aria-label="Wissel valuta"
            >
              <motion.div
                animate={{ rotate: van === "EUR" && naar === "USD" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpDown className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <div>
              <label htmlFor="naar" className="block text-sm font-medium mb-2">Naar</label>
              <select
                id="naar"
                value={naar}
                onChange={(e) => setNaar(e.target.value)}
                className="w-full px-4 py-3 input"
              >
                {Object.entries(rates).map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.flag} {code} - {info.name}
                  </option>
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

          {/* Result */}
          <AnimatePresence mode="wait">
            {resultaat ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 bg-[hsl(var(--calc-result-bg))] rounded-xl border-2 border-[hsl(var(--calc-highlight))]"
              >
                <p className="text-sm text-muted-foreground mb-1">
                  Wisselkoers: 1 {van} = {formatNumber(resultaat.rate)} {naar}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{rates[naar].flag}</span>
                  <p className="text-4xl font-bold text-[hsl(var(--calc-result-text))]">
                    {rates[naar].symbol} {formatNumber(resultaat.value)}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground py-8 border-2 border-dashed border-border rounded-xl"
              >
                <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Vul een bedrag in</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Wisselkoersen zijn indicatief en worden niet live geüpdatet. 
              Controleer altijd de actuele koers voor belangrijke transacties.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
