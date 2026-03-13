"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Type, 
  Clock, 
  Hash, 
  AlignLeft, 
  Copy, 
  Trash2, 
  Type as TypeIcon,
  Lowercase,
  Sparkles
} from "lucide-react";

interface TextStats {
  karakters: number;
  karaktersZonderSpaties: number;
  woorden: number;
  zinnen: number;
  paragrafen: number;
  leestijd: number;
  leestijdMinuten: number;
  gemiddeldeWoordLengte: number;
}

export function TekstToolsClient() {
  const [tekst, setTekst] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<TextStats>({
    karakters: 0,
    karaktersZonderSpaties: 0,
    woorden: 0,
    zinnen: 0,
    paragrafen: 0,
    leestijd: 0,
    leestijdMinuten: 0,
    gemiddeldeWoordLengte: 0,
  });

  // Calculate stats
  useEffect(() => {
    calculateStats();
  }, [tekst]);

  const calculateStats = useCallback(() => {
    const karakters = tekst.length;
    const karaktersZonderSpaties = tekst.replace(/\s/g, "").length;
    const woordenArray = tekst.trim() === "" ? [] : tekst.trim().split(/\s+/);
    const woorden = woordenArray.length;
    const zinnen = tekst.split(/[.!?]+/).filter(Boolean).length;
    const paragrafen = tekst.split(/\n\n+/).filter(Boolean).length;
    const leestijd = Math.ceil(woorden / 200); // 200 wpm
    const leestijdMinuten = Math.max(1, leestijd);
    const gemiddeldeWoordLengte = woorden > 0 
      ? Math.round((karaktersZonderSpaties / woorden) * 10) / 10 
      : 0;

    setStats({
      karakters,
      karaktersZonderSpaties,
      woorden,
      zinnen,
      paragrafen,
      leestijd,
      leestijdMinuten,
      gemiddeldeWoordLengte,
    });
  }, [tekst]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tekst);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setTekst("");
  };

  const convertToUpper = () => setTekst(tekst.toUpperCase());
  const convertToLower = () => setTekst(tekst.toLowerCase());
  const convertToTitle = () => {
    setTekst(
      tekst.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };
  const removeExtraSpaces = () => {
    setTekst(tekst.replace(/\s+/g, " ").trim());
  };

  const statItems = [
    { icon: Hash, label: "Karakters", value: stats.karakters, color: "text-primary" },
    { icon: TypeIcon, label: "Zonder spaties", value: stats.karaktersZonderSpaties, color: "text-muted-foreground" },
    { icon: AlignLeft, label: "Woorden", value: stats.woorden, color: "text-[hsl(var(--success))]" },
    { icon: Sparkles, label: "Zinnen", value: stats.zinnen, color: "text-[hsl(var(--info))]" },
    { icon: AlignLeft, label: "Paragrafen", value: stats.paragrafen, color: "text-[hsl(var(--warning))]" },
    { icon: Clock, label: "Leestijd", value: `~${stats.leestijdMinuten} min`, color: "text-[hsl(var(--calc-highlight))]" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Tekst Tools</h1>
        <p className="text-muted-foreground">Analyseer en bewerk je tekst.</p>
      </motion.div>

      <motion.div
        className="grid lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div className="card">
            <textarea
              value={tekst}
              onChange={(e) => setTekst(e.target.value)}
              placeholder="Plak of typ je tekst hier..."
              className="w-full h-64 p-4 input resize-none"
              aria-label="Tekst invoer"
            />

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <button
                onClick={convertToUpper}
                disabled={!tekst}
                className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <TypeIcon className="w-4 h-4" />
                HOOFDLETTERS
              </button>

              <button
                onClick={convertToLower}
                disabled={!tekst}
                className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <Lowercase className="w-4 h-4" />
                kleine letters
              </button>

              <button
                onClick={convertToTitle}
                disabled={!tekst}
                className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <Type className="w-4 h-4" />
                Hoofdletter Per Woord
              </button>

              <button
                onClick={removeExtraSpaces}
                disabled={!tekst}
                className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <AlignLeft className="w-4 h-4" />
                Spaties opruimen
              </button>

              <div className="flex-1" />

              <button
                onClick={copyToClipboard}
                disabled={!tekst}
                className="flex items-center gap-2 px-3 py-2 bg-[hsl(var(--info-muted))] text-[hsl(var(--info))] rounded-lg hover:bg-[hsl(var(--info-muted))]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Gekopieerd!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Kopiëren
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={clearText}
                disabled={!tekst}
                className="flex items-center gap-2 px-3 py-2 bg-[hsl(var(--error-muted))] text-[hsl(var(--error))] rounded-lg hover:bg-[hsl(var(--error-muted))]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Wissen
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div className="space-y-4">
          <motion.div className="card"
          >
            <h2 className="text-lg font-bold mb-4">Statistieken</h2>

            <div className="space-y-3">
              {statItems.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="font-bold">
                    {typeof stat.value === "number" 
                      ? stat.value.toLocaleString("nl-NL") 
                      : stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {stats.woorden > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-[hsl(var(--info-muted))] rounded-lg"
              >
                <p className="text-sm text-muted-foreground">
                  Gemiddelde woordlengte: <strong className="text-[hsl(var(--info))]">
                    {stats.gemiddeldeWoordLengte} tekens
                  </strong>
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
