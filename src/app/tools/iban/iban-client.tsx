"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash, Check, X, Copy, RotateCcw, Info } from "lucide-react";
import { useRecentTools } from "@/hooks/use-tool-storage";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { FeedbackForm } from "@/components/feedback-form";
import { StickyAd } from "@/components/ad-components";

interface ValidationResult {
  valid: boolean;
  message: string;
  formatted?: string;
  country?: string;
}

const countryNames: Record<string, string> = {
  NL: "Nederland",
  BE: "België",
  DE: "Duitsland",
  FR: "Frankrijk",
  GB: "Verenigd Koninkrijk",
  US: "Verenigde Staten",
};

export function IBANCheckerClient() {
  const [iban, setIban] = useState("");
  const [resultaat, setResultaat] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const { recordToolUsage } = useRecentTools();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (iban.trim().length >= 10) {
        validate();
      } else {
        setResultaat(null);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [iban]);

  useEffect(() => {
    if (resultaat?.valid) {
      recordToolUsage("IBAN");
    }
  }, [resultaat, recordToolUsage]);

  const validateIBAN = (iban: string): boolean => {
    const clean = iban.replace(/\s/g, "").toUpperCase();
    if (clean.length < 15 || clean.length > 34) return false;
    const rearranged = clean.slice(4) + clean.slice(0, 4);
    let numeric = "";
    for (const char of rearranged) {
      if (/[A-Z]/.test(char)) {
        numeric += (char.charCodeAt(0) - 55).toString();
      } else {
        numeric += char;
      }
    }
    let remainder = "";
    for (const digit of numeric) {
      remainder += digit;
      if (remainder.length > 9) {
        remainder = (parseInt(remainder) % 97).toString();
      }
    }
    return parseInt(remainder) % 97 === 1;
  };

  const validate = useCallback(() => {
    const clean = iban.replace(/\s/g, "");
    if (clean.length === 0) {
      setResultaat(null);
      return;
    }
    const isValid = validateIBAN(iban);
    const country = clean.slice(0, 2);
    if (isValid) {
      const formatted = clean.replace(/(.{4})/g, "$1 ").trim();
      setResultaat({
        valid: true,
        message: "Dit is een geldig IBAN nummer",
        formatted,
        country: countryNames[country] || country,
      });
    } else {
      setResultaat({
        valid: false,
        message: clean.length < 15 
          ? "IBAN is te kort (minimaal 15 tekens)" 
          : "Dit is geen geldig IBAN nummer",
      });
    }
  }, [iban]);

  const copyToClipboard = () => {
    if (resultaat?.formatted) {
      navigator.clipboard.writeText(resultaat.formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setIban("");
    setResultaat(null);
  };

  const resultText = resultaat?.valid
    ? `IBAN: ${resultaat.formatted} - ${resultaat.country}`
    : resultaat?.message || "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                <Hash className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="IBAN" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">IBAN Checker</h1>
            <p className="text-muted-foreground">Controleer of een IBAN nummer geldig is.</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-6">
              <label htmlFor="iban" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Hash className="w-4 h-4" />
                IBAN nummer
              </label>
              <input
                id="iban"
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value.toUpperCase())}
                placeholder="NL91 ABNA 0417 1643 00"
                className="w-full px-4 py-3 input text-lg tracking-wide"
                maxLength={34}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Spaties zijn optioneel - de check gebeurt automatisch
              </p>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Wissen
              </button>
              
              {resultaat?.valid && (
                <ShareResult 
                  toolName="IBAN Checker" 
                  result={resultText}
                  url="/tools/iban"
                />
              )}
            </div>

            <AnimatePresence mode="wait">
              {resultaat && (
                <motion.div
                  key={resultaat.valid ? "valid" : "invalid"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-5 rounded-xl ${
                    resultaat.valid
                      ? "bg-[hsl(var(--success-muted))] border-2 border-[hsl(var(--success))]"
                      : "bg-[hsl(var(--error-muted))] border-2 border-[hsl(var(--error))]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {resultaat.valid ? (
                        <Check className="w-6 h-6 text-[hsl(var(--success))]" />
                      ) : (
                        <X className="w-6 h-6 text-[hsl(var(--error))]" />
                      )}
                    </motion.div>

                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          resultaat.valid
                            ? "text-[hsl(var(--success))]"
                            : "text-[hsl(var(--error))]"
                        }`}
                      >
                        {resultaat.message}
                      </p>

                      {resultaat.valid && resultaat.formatted && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                            <code className="text-lg font-mono">{resultaat.formatted}</code>
                            <button
                              onClick={copyToClipboard}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              aria-label="Kopieer IBAN"
                            >
                              <AnimatePresence mode="wait">
                                {copied ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <Check className="w-5 h-5 text-[hsl(var(--success))]" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="copy"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <Copy className="w-5 h-5" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </button>
                          </div>

                          {resultaat.country && (
                            <p className="text-sm text-muted-foreground">
                              Land: {resultaat.country}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    Een IBAN bestaat uit maximaal 34 alfanumerieke tekens:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>2 letters: landcode (bijv. NL)</li>
                    <li>2 cijfers: controlegetal</li>
                    <li>Maximaal 30 tekens: rekeningnummer</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feedback */}
          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="IBAN Checker" />
          </div>
        </div>

        <StickyAd slot="sidebar-ad-iban" />
      </div>
    </div>
  );
}
