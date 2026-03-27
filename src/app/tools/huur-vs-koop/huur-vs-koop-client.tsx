"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Home, TrendingUp, RotateCcw, ArrowRight, Building } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface HuurKoopResultaat {
  type: "huur" | "koop";
  maandlasten: number;
  totaalKostenJaren: number;
  eigenVermogenEind: number;
  nettoVermogenVerschil: number;
}

const huurKoopFAQ = [
  {
    question: "Is kopen altijd voordeliger dan huren?",
    answer: "Niet perse. De afweging hangt af van de huizenmarkt, hypotheekrente, je verwachte woonduur, en persoonlijke voorkeuren. Kopen kan duur zijn bij hoge huizenprijzen en lage rente.",
  },
  {
    question: "Wat zijn de bijkomende kosten bij kopen?",
    answer: "Naast de hypotheek betaal je overdrachtsbelasting (2% voor 2026), notariskosten, makelaarskosten, taxatiekosten, en advieskosten. Reken op ongeveer 5-6% van de koopsom.",
  },
  {
    question: "Hoe lang moet ik ergens wonen om kopen rendabel te maken?",
    answer: "Vuistregel: minimaal 5-7 jaar. Bij kortere periodes wegen de transactiekosten vaak niet op tegen de voordelen van kopen.",
  },
  {
    question: "Wat is het effect van huurstijgingen?",
    answer: "De huurprijs kan jaarlijks stijgen (vaak gekoppeld aan inflatie + 1-2%). Bij kopen zijn je maandlasten grotendeels vast, behalve als je rentevaste periode afloopt.",
  },
  {
    question: "Moet ik NHG nemen?",
    answer: "NHG (Nationale Hypotheek Garantie) is aan te raden als je lening onder de NHG-grens ligt (€435.000 in 2026). Het biedt zekerheid en een lagere rente.",
  },
  {
    question: "Wat gebeurt er met mijn huur als ik ga kopen?",
    answer: "Als je huurwoning opzegt, kun je deze vaak niet meer terugkrijgen. Bedenk goed of je definitief wilt stoppen met huren of tijdelijk wilt huren voor je koopt.",
  },
];

export function HuurVsKoopCalculatorClient() {
  const [woningWaarde, setWoningWaarde] = useState("350000");
  const [maandhuur, setMaandhuur] = useState("1200");
  const [hypotheekRente, setHypotheekRente] = useState("3.8");
  const [looptijd, setLooptijd] = useState("10");
  const [eigenVermogen, setEigenVermogen] = useState("50000");
  const [huurstijging, setHuurstijging] = useState("3");
  const [resultaat, setResultaat] = useState<{ huur: HuurKoopResultaat; koop: HuurKoopResultaat; verschil: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const waarde = parseFloat(woningWaarde);
    const huur = parseFloat(maandhuur);
    const rente = parseFloat(hypotheekRente) / 100;
    const jaren = parseInt(looptijd);
    const vermogen = parseFloat(eigenVermogen);
    const hstijging = parseFloat(huurstijging) / 100;

    if (isNaN(waarde) || isNaN(huur) || isNaN(rente) || isNaN(jaren) || 
        waarde <= 0 || huur <= 0 || jaren <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Bijkomende kosten kopen (~5.5%)
    const bijkomendeKosten = waarde * 0.055;
    const lening = waarde - vermogen;
    const rentePerMaand = rente / 12;
    const maanden = jaren * 12;

    // Hypotheek maandlasten (annuïteit)
    const maandhypotheek = lening * (rentePerMaand * Math.pow(1 + rentePerMaand, maanden)) / 
                          (Math.pow(1 + rentePerMaand, maanden) - 1);

    // Koop kosten
    let totaleKoopKosten = bijkomendeKosten;
    let renteBetaald = 0;
    let restantSchuld = lening;
    for (let i = 0; i < maanden; i++) {
      const renteMaand = restantSchuld * rentePerMaand;
      const aflossingMaand = maandhypotheek - renteMaand;
      renteBetaald += renteMaand;
      restantSchuld -= aflossingMaand;
    }

    // Huisprijsstijging (gemiddeld 3% per jaar)
    const huisStijging = 0.03;
    const toekomstigeWaarde = waarde * Math.pow(1 + huisStijging, jaren);
    const restSchuld = restantSchuld;
    const eigenVermogenKoop = toekomstigeWaarde - restSchuld;

    // Huur kosten
    let totaleHuurKosten = 0;
    let huidigeHuur = huur;
    for (let i = 0; i < jaren; i++) {
      totaleHuurKosten += huidigeHuur * 12;
      huidigeHuur *= (1 + hstijging);
    }

    // Beleggingsrendement op spaargeld (als alternatief)
    const spaarRendement = 0.03;
    const belegdVermogen = vermogen * Math.pow(1 + spaarRendement, jaren);
    const belegdBijkost = Math.max(0, bijkomendeKosten - vermogen) * Math.pow(1 + spaarRendement, jaren);

    // Netto positie vergelijking
    const koopNetto = eigenVermogenKoop - belegdVermogen - belegdBijkost;
    const huurNetto = -totaleHuurKosten;

    const verschil = koopNetto - huurNetto;

    setResultaat({
      koop: {
        type: "koop",
        maandlasten: Math.round(maandhypotheek * 100) / 100,
        totaalKostenJaren: Math.round((maandhypotheek * maanden + bijkomendeKosten) * 100) / 100,
        eigenVermogenEind: Math.round(eigenVermogenKoop * 100) / 100,
        nettoVermogenVerschil: Math.round(koopNetto * 100) / 100,
      },
      huur: {
        type: "huur",
        maandlasten: Math.round(huur * 100) / 100,
        totaalKostenJaren: Math.round(totaleHuurKosten * 100) / 100,
        eigenVermogenEind: Math.round(belegdVermogen * 100) / 100,
        nettoVermogenVerschil: Math.round(huurNetto * 100) / 100,
      },
      verschil: Math.round(verschil * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [woningWaarde, maandhuur, hypotheekRente, looptijd, eigenVermogen, huurstijging]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setWoningWaarde("350000");
    setMaandhuur("1200");
    setHypotheekRente("3.8");
    setLooptijd("10");
    setEigenVermogen("50000");
    setHuurstijging("3");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Huis: €${woningWaarde} | Huur: €${maandhuur}/mnd | Koop: €${formatBedrag(resultaat.koop.maandlasten)}/mnd | Verschil: €${formatBedrag(Math.abs(resultaat.verschil))}`
    : "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                <Home className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="HuurVsKoopCalculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Huur vs Koop Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vergelijk de kosten van huren en kopen en ontdek 
              wat financieel voordeliger is voor jou.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Woning Gegevens</h2>
              
              {/* Woningwaarde */}
              <div className="mb-4">
                <label htmlFor="waarde" className="block text-sm font-medium mb-2">
                  Woningwaarde (€)
                </label>
                <input
                  id="waarde"
                  type="text"
                  inputMode="decimal"
                  value={woningWaarde}
                  onChange={(e) => setWoningWaarde(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Maandhuur */}
              <div className="mb-4">
                <label htmlFor="huur" className="block text-sm font-medium mb-2">
                  Maandhuur (€)
                </label>
                <input
                  id="huur"
                  type="text"
                  inputMode="decimal"
                  value={maandhuur}
                  onChange={(e) => setMaandhuur(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Eigen vermogen */}
              <div className="mb-4">
                <label htmlFor="vermogen" className="block text-sm font-medium mb-2">
                  Eigen vermogen (€)
                </label>
                <input
                  id="vermogen"
                  type="text"
                  inputMode="decimal"
                  value={eigenVermogen}
                  onChange={(e) => setEigenVermogen(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Hypotheekrente */}
              <div className="mb-4">
                <label htmlFor="rente" className="block text-sm font-medium mb-2">
                  Hypotheekrente (%)
                </label>
                <input
                  id="rente"
                  type="number"
                  step="0.1"
                  value={hypotheekRente}
                  onChange={(e) => setHypotheekRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
              </div>

              {/* Looptijd */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Periode
                  </span>
                </label>
                <div className="flex gap-2">
                  {["5", "10", "15", "20"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLooptijd(l)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        looptijd === l ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {l} jaar
                    </button>
                  ))}
                </div>
              </div>

              {/* Huurstijging */}
              <div className="mb-6">
                <label htmlFor="hstijging" className="block text-sm font-medium mb-2">
                  Verwachte huurstijging (%/jaar)
                </label>
                <div className="flex gap-2">
                  {["2", "3", "4", "5"].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHuurstijging(h)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        huurstijging === h ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {h}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="Huur vs Koop Calculator" 
                    result={resultText}
                    url="/tools/huur-vs-koop"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Vergelijking</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Koop */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        Kopen
                      </h3>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        € {formatBedrag(resultaat.koop.maandlasten)}
                        <span className="text-sm font-normal text-muted-foreground"> /maand</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        <div>Eigen vermogen eind: <strong>€ {formatBedrag(resultaat.koop.eigenVermogenEind)}</strong></div>
                      </div>
                    </div>

                    {/* Huren */}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Huren
                      </h3>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.huur.maandlasten)}
                        <span className="text-sm font-normal text-muted-foreground"> /maand start</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        <div>Totaal kosten: <strong>€ {formatBedrag(resultaat.huur.totaalKostenJaren)}</strong></div>
                      </div>
                    </div>

                    {/* Advies */}
                    <div className={`p-4 rounded-xl ${
                      resultaat.verschil > 0 
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-amber-500/10 border border-amber-500/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className={`w-4 h-4 ${resultaat.verschil > 0 ? 'text-green-500' : 'text-amber-500'}`} />
                        <span className="font-medium">
                          {resultaat.verschil > 0 ? 'Kopen is voordeliger' : 'Huren kan voordeliger zijn'}
                        </span>
                      </div>
                      <p className="text-2xl font-bold">
                        € {formatBedrag(Math.abs(resultaat.verschil))}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {resultaat.verschil > 0 
                          ? 'Na ' + looptijd + ' jaar heb je meer vermogen bij kopen'
                          : 'Huren + beleggen kan netto positief uitpakken'}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te vergelijken</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Kopen of Huren: Wat is Beter?</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                De keuze tussen <strong>huren en kopen</strong> is één van de grootste financiële beslissingen 
                in je leven. Met onze <strong>huur vs koop calculator</strong> vergelijk je de kosten en 
                ontdek je wat in jouw situatie voordeliger is.
              </p>
              <p className="mb-4">
                Bij <strong>kopen</strong> investeer je in eigen vermogen en kun je profiteren van 
                waardestijging van je woning. Je hebt echter te maken met bijkomende kosten, 
                onderhoudsverplichtingen en minder flexibiliteit.
              </p>
              <p>
                Bij <strong>huren</strong> heb je meer flexibiliteit en geen onderhoudskosten. 
                Je huur kan echter stijgen en je bouwt geen eigen vermogen op in een woning.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={huurKoopFAQ} title="Veelgestelde vragen over huren vs kopen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/hypotheek-vergelijker" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek Vergelijk</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
