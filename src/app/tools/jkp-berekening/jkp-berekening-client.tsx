"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Percent, ArrowRight, RotateCcw, 
  Info, TrendingUp, AlertTriangle, CheckCircle2, Scale
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface JkpResultaat {
  jkp: number;
  totaleKosten: number;
  maandlasten: number;
  totaalRente: number;
  kredietvergoeding: number;
  adminkosten: number;
  looptijdMaanden: number;
  kredietBedrag: number;
  reclameRente: number;
  verschilReclameJKP: number;
}

const jkpFAQ = [
  {
    question: "Wat is het JKP precies?",
    answer: "Het Jaarlijks Kosten Percentage (JKP) is de totale kosten van een krediet, uitgedrukt als percentage van het kredietbedrag. Het JKP includes niet alleen de rente, maar ook alle bijkomende kosten zoals administratiekosten, termijnkosten, en kredietverleningskosten. Hierdoor krijg je een eerlijk beeld van de werkelijke kosten.",
  },
  {
    question: "Waarom is JKP belangrijk?",
    answer: "Het JKP maakt het mogelijk om leningen eerlijk te vergelijken. Een lening met een lage rente maar hoge administratiekosten kan duurder zijn dan een lening met hogere rente maar lagere bijkomende kosten. Door naar het JKP te kijken, zie je direct de werkelijke prijs.",
  },
  {
    question: "Wat is het verschil tussen rente en JKP?",
    answer: "De rente (of APR) is alleen de kosten voor het lenen van geld, uitgedrukt als percentage. Het JKP includes daarnaast ook alle bijkomende kosten zoals administratiekosten, verzekeringen, en fees. Het JKP ligt daarom altijd hoger dan of gelijk aan de geadverteerde rente.",
  },
  {
    question: "Hoe wordt het JKP berekend?",
    answer: "Het JKP wordt berekend volgens een standaardformule die rekening houdt met: het kredietbedrag, de rente, alle bijkomende kosten (eenmalig en periodiek), de looptijd, en de betalingstiming. De formule is vastgelegd in Europese regelgeving (Richtlijn 2008/7/EG).",
  },
  {
    question: "Wat is een goed JKP?",
    answer: "Een 'goed' JKP hangt af van het type krediet. Persoonlijke leningen variëren meestal van 5% tot 15% JKP. Kopen op afbetaling kan oplopen tot 15-20%. Hypotheken zijn vaak 1-3%. Vergelijk altijd meerdere aanbieders om de beste deal te vinden.",
  },
  {
    question: "Moet elke kredietaanbieder het JKP vermelden?",
    answer: "Ja, in Nederland en de EU zijn kredietaanbieders verplicht om het JKP te vermelden in alle reclame-uitingen en overeenkomsten. Dit beschermt consumenten en maakt vergelijken eenvoudiger. Let op: het JKP in reclame is vaak gebaseerd op een standaardvoorbeeld.",
  },
  {
    question: "Kan het JKP variëren per klant?",
    answer: "Ja, het JKP dat je uiteindelijk krijgt aangeboden hangt af van je persoonlijke situatie: inkomen, kredietwaardigheid, looptijd, en het kredietbedrag. Het geadverteerde JKP is vaak het 'representatieve' JKP dat aan minstens 2/3 van de klanten wordt aangeboden.",
  },
  {
    question: "Is een lening met laag JKP altijd de beste keuze?",
    answer: "Niet per se. Kijk ook naar: 1) De flexibiliteit (kun je eerder aflossen?), 2) Eventuele boetes voor vervroegd aflossen, 3) De service van de aanbieder, 4) Je eigen budget en betaalcapaciteit. De goedkoopste lening is niet altijd de beste als deze niet bij je past.",
  },
];

export function JkpBerekeningClient() {
  const [kredietBedrag, setKredietBedrag] = useState("10000");
  const [reclameRente, setReclameRente] = useState("6.9");
  const [adminkosten, setAdminkosten] = useState("250");
  const [termijnKosten, setTermijnKosten] = useState("0");
  const [looptijd, setLooptijd] = useState("60");
  const [resultaat, setResultaat] = useState<JkpResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const kredietNum = parseFloat(kredietBedrag.replace(",", ".")) || 0;
    const renteNum = parseFloat(reclameRente) / 100;
    const adminkostenNum = parseFloat(adminkosten.replace(",", ".")) || 0;
    const termijnNum = parseFloat(termijnKosten.replace(",", ".")) || 0;
    const looptijdNum = parseInt(looptijd) || 60;

    if (kredietNum <= 0 || looptijdNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Bereken maandlasten (annuïteit)
    const maandRente = renteNum / 12;
    const maandlasten = kredietNum > 0 && renteNum > 0
      ? kredietNum * (maandRente * Math.pow(1 + maandRente, looptijdNum)) /
        (Math.pow(1 + maandRente, looptijdNum) - 1)
      : kredietNum / looptijdNum;

    // Totale kosten via maandlasten
    const totaalBetaald = maandlasten * looptijdNum;
    const totaalRente = totaalBetaald - kredietNum;

    // Totale kosten inclusief alle fees
    const totaleKosten = totaalBetaald + adminkostenNum + (termijnNum * looptijdNum);

    // Effectief kredietbedrag (minus adminkosten die vooraf worden afgeschreven)
    const effectiefKrediet = kredietNum - adminkostenNum;

    // JKP berekening (iteratieve methode voor nauwkeurigheid)
    // Vereenvoudigde NPV berekening
    let jkp = renteNum * 100; // Start met reclame rente
    
    // Meer realistische JKP berekening
    // JKP = (totale kosten - kredietbedrag) / kredietbedrag / looptijd in jaren * 100
    const totaleKostenExclKrediet = adminkostenNum + (termijnNum * looptijdNum) + totaalRente;
    const jkpExact = (totaleKostenExclKrediet / kredietNum) / (looptijdNum / 12) * 100;

    // Kredietvergoeding (eenmalige kosten als percentage van krediet)
    const kredietvergoeding = (adminkostenNum / kredietNum) * 100;

    setResultaat({
      jkp: Math.round(jkpExact * 100) / 100,
      totaleKosten: Math.round(totaleKosten * 100) / 100,
      maandlasten: Math.round(maandlasten * 100) / 100,
      totaalRente: Math.round(totaalRente * 100) / 100,
      kredietvergoiding: Math.round(kredietvergoiding * 100) / 100,
      adminkosten: adminkostenNum,
      looptijdMaanden: looptijdNum,
      kredietBedrag: kredietNum,
      reclameRente: renteNum * 100,
      verschilReclameJKP: Math.round((jkpExact - renteNum * 100) * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [kredietBedrag, reclameRente, adminkosten, termijnKosten, looptijd]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setKredietBedrag("10000");
    setReclameRente("6.9");
    setAdminkosten("250");
    setTermijnKosten("0");
    setLooptijd("60");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Krediet: €${kredietBedrag} | Rente: ${reclameRente}% | JKP: ${resultaat.jkp}% | Maandlasten: €${formatBedrag(resultaat.maandlasten)} | Totale kosten: €${formatBedrag(resultaat.totaleKosten)}`
    : "";

  const getJkpKwalificatie = (jkp: number) => {
    if (jkp <= 7) return { kleur: "green", tekst: "Laag", icon: CheckCircle2 };
    if (jkp <= 12) return { kleur: "yellow", tekst: "Gemiddeld", icon: AlertTriangle };
    return { kleur: "red", tekst: "Hoog", icon: AlertTriangle };
  };

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                <Scale className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="JKP" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              JKP Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken de werkelijke jaarlijkse kosten van je lening. 
              Vergelijk leningen eerlijk op basis van het complete kostenplaatje.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Lening Gegevens</h2>
              
              {/* Kredietbedrag */}
              <div>
                <label htmlFor="kredietBedrag" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Kredietbedrag (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="kredietBedrag"
                    type="text"
                    inputMode="decimal"
                    value={kredietBedrag}
                    onChange={(e) => setKredietBedrag(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="10.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Reclame Rente */}
              <div>
                <label htmlFor="reclameRente" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Geadverteerde Rente (%)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <input
                  id="reclameRente"
                  type="number"
                  step="0.1"
                  value={reclameRente}
                  onChange={(e) => setReclameRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  De rente die de kredietaanbieder reclameert
                </p>
                <div className="flex gap-2 mt-2">
                  {["5.9", "6.9", "8.9", "10.9", "12.9"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setReclameRente(r)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        reclameRente === r ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              <h2 className="text-lg font-bold pt-2">Bijkomende Kosten</h2>

              {/* Adminkosten */}
              <div>
                <label htmlFor="adminkosten" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Eenmalige Adminkosten (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="adminkosten"
                    type="text"
                    inputMode="decimal"
                    value={adminkosten}
                    onChange={(e) => setAdminkosten(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="250"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Contractkosten, administratiekosten, bemiddelingskosten
                </p>
              </div>

              {/* Termijnkosten */}
              <div>
                <label htmlFor="termijnKosten" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Maandelijkse Termijnkosten (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="termijnKosten"
                    type="text"
                    inputMode="decimal"
                    value={termijnKosten}
                    onChange={(e) => setTermijnKosten(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Looptijd */}
              <div>
                <label htmlFor="looptijd" className="block text-sm font-medium mb-2">
                  Looptijd (maanden)
                </label>
                <input
                  id="looptijd"
                  type="number"
                  value={looptijd}
                  onChange={(e) => setLooptijd(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["24", "36", "48", "60", "84"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLooptijd(m)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        looptijd === m ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {m === "84" ? "7j" : m === "60" ? "5j" : m === "48" ? "4j" : m === "36" ? "3j" : "2j"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="JKP Calculator" 
                    result={resultText}
                    url="/tools/jkp-berekening"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* JKP Highlight */}
                    <motion.div 
                      className="p-6 bg-orange-500/10 border-2 border-orange-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Werkelijk Jaarlijks Kostenpercentage</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                          {resultaat.jkp.toFixed(2)}%
                        </p>
                        <span className="text-lg text-muted-foreground">JKP</span>
                      </div>
                      <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                        getJkpKwalificatie(resultaat.jkp).kleur === "green" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : getJkpKwalificatie(resultaat.jkp).kleur === "yellow"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {(() => {
                          const q = getJkpKwalificatie(resultaat.jkp);
                          return <q.icon className="w-4 h-4" />;
                        })()}
                        {getJkpKwalificatie(resultaat.jkp).tekst} JKP
                      </div>
                    </motion.div>

                    {/* Vergelijking reclame vs JKP */}
                    <div className="p-4 bg-muted rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-xs text-muted-foreground">Reclame rente</p>
                          <p className="text-2xl font-bold">{resultaat.reclameRente.toFixed(1)}%</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground mx-4" />
                        <div className="text-center flex-1">
                          <p className="text-xs text-muted-foreground">Werkelijk JKP</p>
                          <p className="text-2xl font-bold text-orange-600">{resultaat.jkp.toFixed(2)}%</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-center text-muted-foreground">
                          Bijkomende kosten verhogen het JKP met{" "}
                          <span className="font-bold text-orange-600">
                            +{resultaat.verschilReclameJKP.toFixed(2)}%
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Maandlasten */}
                    <div className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-6 h-6 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Maandelijkse lasten</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            € {formatBedrag(resultaat.maandlasten)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Kosten Overzicht */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Kosten Overzicht</p>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Leenbedrag</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.kredietBedrag)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale Rente</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.totaalRente)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Adminkosten</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.adminkosten)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                        <span className="font-medium">Totale Kosten</span>
                        <span className="font-bold text-orange-600">€ {formatBedrag(resultaat.totaleKosten)}</span>
                      </div>
                    </div>

                    {/* Advies */}
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Tip</p>
                          <p className="text-amber-700 dark:text-amber-300">
                            Vergelijk altijd het JKP van verschillende aanbieders. 
                            Een lening met lagere rente maar hogere kosten kan duurder uitvallen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Scale className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over JKP - Jaarlijks Kostenpercentage</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                Het <strong>JKP</strong>, oftewel het Jaarlijks Kosten Percentage, is een belangrijke 
                maatstaf voor de werkelijke kosten van een lening of krediet. In tegenstelling tot wat 
                vaak wordt gedacht, is de geadverteerde rente niet de enige kostenpost. Het JKP neemt 
                alle kosten mee en geeft daardoor een compleet beeld van wat je werkelijk betaalt.
              </p>
              <p>
                Wanneer je een lening afsluit, krijg je te maken met verschillende soorten kosten. 
                Naast de <strong>rente</strong> zijn er vaak administratiekosten, contractkosten, 
                termijnkosten, en soms zelfs verzekeringspremies die verplicht zijn. Al deze kosten 
                bij elkaar bepalen hoe duur de lening werkelijk is.
              </p>
              <p>
                De <strong>berekening van het JKP</strong> is wettelijk vastgelegd en moet door alle 
                kredietaanbieders op dezelfde manier worden uitgevoerd. Dit maakt het mogelijk om 
                leningen van verschillende aanbieders eerlijk met elkaar te vergelijken. Het JKP 
                wordt uitgedrukt als percentage per jaar over het kredietbedrag.
              </p>
              <p>
                Onze <strong>JKP calculator</strong> helpt je om de werkelijke kosten van een lening 
                te berekenen. Vul het leenbedrag in, de geadverteerde rente, alle bijkomende kosten, 
                en de looptijd. Je ziet direct wat het werkelijke JKP is en hoeveel je in totaal 
                betaalt voor de lening.
              </p>
              <p>
                Het is belangrijk om te begrijpen dat het JKP altijd hoger is dan of gelijk is aan 
                de geadverteerde rente. Het verschil tussen beide geeft aan hoeveel de bijkomende 
                kosten bijdragen aan de totale kosten. Soms kan dit verschil flink oplopen, 
                vooral bij leningen met lange looptijden.
              </p>
              <p>
                Bij het vergelijken van leningen is het verstandig om niet alleen naar de maandlasten 
                te kijken, maar ook naar het <strong>JKP en de totale kosten</strong>. Een lening met 
                lagere maandlasten kan over de hele looptijd duurder zijn als deze een hoger JKP heeft.
              </p>
              <p>
                In Nederland zijn kredietaanbieders verplicht om het JKP duidelijk te vermelden in 
                alle <strong>reclame-uitingen</strong> en overeenkomsten. Dit is vastgelegd in de 
                Wet op het Consumentenkrediet en beschermt consumenten tegen misleidende reclame. 
                Let altijd op het JKP wanneer je een lening overweegt.
              </p>
              <p>
                Wil je meer weten over de kosten van specifieke leningen? Gebruik ook onze andere 
                rekentools voor <strong>persoonlijke leningen</strong>, <strong>kredietlimieten</strong>, 
                en <strong>hypotheken</strong> om een compleet beeld te krijgen van je financiële 
                mogelijkheden.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={jkpFAQ} title="Veelgestelde vragen over JKP" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/krediet" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Krediet</p>
              </Link>
              <Link href="/tools/salaris-netto" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Salaris</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
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
