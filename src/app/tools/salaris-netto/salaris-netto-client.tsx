"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, ArrowRight, RotateCcw, 
  Info, Wallet, TrendingUp, Users, Home, Car
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface SalarisResultaat {
  brutoJaar: number;
  brutoMaand: number;
  nettoMaand: number;
  loonheffing: number;
  socialeVerzekeringen: number;
  pensioenPremie: number;
  verzekeringen: number;
  werkgeversbijdrage: number;
  totaleLasten: number;
  nettoloon: number;
  loonbelasting: number;
}

const belastingSchijven2026 = [
  { schijf: 1, van: 0, tot: 75518, percentage: 36.97 },
  { schijf: 2, van: 75518, tot: 999999, percentage: 49.50 },
];

const salarisFAQ = [
  {
    question: "Hoe wordt mijn netto salaris berekend?",
    answer: "Je netto salaris wordt berekend door van je bruto salaris de belastingen en premies af te trekken. Dit omvat: inkomstenbelasting (via de belasting schijven), premies volksverzekeringen (AOW, Anw, Wlz), werknemersverzekeringen (WW, WAO/WIA), en eventueel pensioenpremie en andere aftrekposten.",
  },
  {
    question: "Wat is het verschil tussen bruto en netto?",
    answer: "Bruto is het volledige bedrag dat je werkgever voor je betaalt, inclusief werkgeversbijdrage voor sociale verzekeringen. Netto is wat je uiteindelijk op je bankrekening ontvangt na aftrek van alle belastingen en premies. Je werkgever betaalt bruto, jij ontvangt netto.",
  },
  {
    question: "Wat zijn de belasting schijven in 2026?",
    answer: "In 2026 gelden de volgende belasting schijven: Schijf 1 (0-€75.518): 36,97%, Schijf 2 (€75.518-€1.000.000): 49,50%. Daarboven betaal je 49,50% plus een opslag van 1,5% voor elite-sporters of 4,5% voor anderen.",
  },
  {
    question: "Wat is de algemene heffingskorting?",
    answer: "De algemene heffingskorting is een belastingvermindering die voor iedereen geldt. In 2026 bedraagt deze maximaal €3.362 bij een inkomen tot €75.518. Bij hogere inkomens wordt de korting geleidelijk afgebouwd.",
  },
  {
    question: "Wat is de arbeidskorting?",
    answer: "De arbeidskorting is een korting op de belasting voor werkenden. In 2026 bedraagt deze maximaal €5.530 bij een inkomen van ongeveer €25.000. De korting neemt daarna geleidelijk af tot €0 bij een inkomen boven €140.000.",
  },
  {
    question: "Hoeveel pensioenpremie wordt ingehouden?",
    answer: "De pensioenpremie hangt af van je pensioenregeling. Veel werkgevers hanteren een premie van 30-35% van de pensioengrondslag, waarbij ongeveer tweederde voor rekening van de werkgever komt en eenderde voor de werknemer. Typisch is dit 3-5% van je bruto salaris.",
  },
  {
    question: "Wat is het minimumloon in 2026?",
    answer: "Het wettelijk minimumloon in Nederland wordt elk half jaar aangepast. Per 1 januari 2026 bedraagt het minimumloon voor volwassenen (21+) ongeveer €2.200 bruto per maand. Voor jongeren gelden lagere percentages.",
  },
  {
    question: "Waarom verschilt mijn netto salaris per maand?",
    answer: "Je netto salaris kan variëren door: 1) Onregelmatige toeslagen (overwerk, weekendwerk), 2) Maandelijkse verschillen in belasting (30%-regeling of vast), 3) Eenmalige uitkeringen, 4) Aanpassingen in voorlopige heffingskortingen. Je jaarlijkse totaal blijft wel gelijk.",
  },
];

export function SalarisNettoClient() {
  const [brutoJaar, setBrutoJaar] = useState("55000");
  const [pensioen, setPensioen] = useState("3");
  const [autoVanDeZaak, setAutoVanDeZaak] = useState(false);
  const [reiskosten, setReiskosten] = useState("0");
  const [resultaat, setResultaat] = useState<SalarisResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const brutoJaarNum = parseFloat(brutoJaar.replace(",", ".")) || 0;
    const pensioenNum = parseFloat(pensioen) / 100;
    const reiskostenNum = parseFloat(reiskosten.replace(",", ".")) || 0;

    if (brutoJaarNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Basis berekeningen
    const brutoMaand = brutoJaarNum / 12;
    
    // Premies volksverzekeringen (2026)
    const aowPremie = 17.90 / 100; // Werkgever + werknemer
    const anwPremie = 0.10 / 100;
    const wlzPremie = 9.65 / 100;
    const volksverzekeringen = brutoJaarNum * (aowPremie + anwPremie + wlzPremie);

    // Werkgeversbijdrage ( werkgeversdeel)
    const werkgeversPremies = brutoJaarNum * 0.06945; // Basis werkgeverslasten

    // Werknemersverzekeringen
    const wwPremie = 2.64 / 100;
    const whkPremie = 1.22 / 100;
    const werknemerVerzekeringen = brutoJaarNum * (wwPremie + whkPremie);

    // Pensioenpremie (werknemersdeel)
    const pensioenPremie = brutoJaarNum * pensioenNum;

    // Bereken belastbaar inkomen
    let belastbaarInkomen = brutoJaarNum - pensioenPremie - werknemerVerzekeringen;
    
    // Reiskosten (fiscaal)
    if (reiskostenNum > 0) {
      // Zakelijke kilometers (€0.23 per km is onbelast)
      // Reiskosten woon-werkverkeer boven €7,50 per week is belast
    }

    // Loonbelasting berekening (vereenvoudigd)
    let loonbelasting = 0;
    let restInkomen = belastbaarInkomen;
    
    for (const schijf of belastingSchijven2026) {
      if (restInkomen <= 0) break;
      const belastbaarInSchijf = Math.min(restInkomen, schijf.tot - schijf.van);
      if (belastbaarInSchijf > 0) {
        loonbelasting += belastbaarInSchijf * (schijf.percentage / 100);
        restInkomen -= belastbaarInSchijf;
      }
    }

    // Heffingskortingen (vereenvoudigd)
    const algemeneHeffingskorting = belastbaarInkomen <= 75518 
      ? 3362 * (belastbaarInkomen / 75518)
      : Math.max(0, 3362 - ((belastbaarInkomen - 75518) * 0.0545));
    
    const arbeidskorting = belastbaarInkomen <= 25000
      ? 5530 * (belastbaarInkomen / 25000)
      : belastbaarInkomen <= 140000
      ? 5530 * (1 - ((belastbaarInkomen - 25000) / 115000))
      : 0;

    // Finale berekening
    const totaleHeffingen = Math.max(0, loonbelasting - algemeneHeffingskorting - arbeidskorting);
    const loonheffing = Math.round(totaleHeffingen / 12);
    const socialeVerzekeringen = Math.round(volksverzekeringen / 12);
    const pensioenInhouding = Math.round(pensioenPremie / 12);
    const verzekeringenInhouding = Math.round(werknemerVerzekeringen / 12);

    // Auto van de zaak (bijtelling)
    let bijtelling = 0;
    if (autoVanDeZaak) {
      bijtelling = 22000 * 0.22; // 22% bijtelling over €22.000
    }

    // Netto per maand
    const totaleInhoudingen = loonheffing + socialeVerzekeringen + pensioenInhouding + verzekeringenInhouding;
    const nettoMaand = Math.max(0, Math.round(brutoMaand - totaleInhoudingen));

    setResultaat({
      brutoJaar: brutoJaarNum,
      brutoMaand: Math.round(brutoMaand),
      nettoMaand,
      loonheffing,
      socialeVerzekeringen,
      pensioenPremie: pensioenInhouding,
      verzekeringen: verzekeringenInhouding,
      werkgeversbijdrage: Math.round(werkgeversPremies / 12),
      totaleLasten: totaleInhoudingen,
      nettoloon: nettoMaand,
      loonbelasting: Math.round(totaleHeffingen),
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [brutoJaar, pensioen, autoVanDeZaak, reiskosten]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setBrutoJaar("55000");
    setPensioen("3");
    setAutoVanDeZaak(false);
    setReiskosten("0");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Bruto: €${brutoJaar}/jr | €${resultaat.brutoMaand}/mnd | Netto: €${formatBedrag(resultaat.nettoMaand)}/mnd | Loonheffing: €${formatBedrag(resultaat.loonheffing)}/mnd`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Wallet className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Salaris Netto" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Salaris Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken snel je netto salaris van bruto. 
              Zie precies wat je maandelijks overhoudt na aftrek van belastingen en premies.
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
              <h2 className="text-lg font-bold">Jouw Salaris</h2>
              
              {/* Bruto Jaarinkomen */}
              <div>
                <label htmlFor="brutoJaar" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Bruto Jaarinkomen (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="brutoJaar"
                    type="text"
                    inputMode="decimal"
                    value={brutoJaar}
                    onChange={(e) => setBrutoJaar(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="55.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Je volledige bruto jaarinkomen inclusief vakantiegeld en eindejaarsuitkering
                </p>
                <div className="flex gap-2 mt-2">
                  {["35000", "45000", "55000", "70000", "90000", "120000"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrutoJaar(b)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                        brutoJaar === b ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{parseInt(b).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pensioenpremie */}
              <div>
                <label htmlFor="pensioen" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Pensioenpremie (werknemer %)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <input
                  id="pensioen"
                  type="number"
                  step="0.5"
                  value={pensioen}
                  onChange={(e) => setPensioen(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Typisch 3-5% van je bruto salaris
                </p>
              </div>

              <hr className="border-border" />

              {/* Extra's */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Extra&apos;s</h3>
                
                {/* Auto van de zaak */}
                <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-muted-foreground" />
                    <span>Auto van de zaak</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoVanDeZaak}
                    onChange={(e) => setAutoVanDeZaak(e.target.checked)}
                    className="w-5 h-5 rounded border-input"
                  />
                </label>

                {/* Reiskosten */}
                <div>
                  <label htmlFor="reiskosten" className="block text-sm font-medium mb-2">
                    <span className="flex items-center gap-1">
                      Reiskosten woon-werk (€ per maand)
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      id="reiskosten"
                      type="text"
                      inputMode="decimal"
                      value={reiskosten}
                      onChange={(e) => setReiskosten(e.target.value.replace(/[^0-9.,]/g, ""))}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
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
                    toolName="Salaris Calculator" 
                    result={resultText}
                    url="/tools/salaris-netto"
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
                    {/* Netto Maand */}
                    <motion.div 
                      className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Netto per Maand</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.nettoMaand)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        € {formatBedrag(resultaat.nettoMaand * 12)} per jaar
                      </p>
                    </motion.div>

                    {/* Vergelijking */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Bruto</p>
                        <p className="text-lg font-bold">€ {resultaat.brutoMaand}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Netto</p>
                        <p className="text-lg font-bold text-green-600">€ {formatBedrag(resultaat.nettoMaand)}</p>
                      </div>
                    </div>

                    {/* Inhoudingen */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Maandelijkse Inhoudingen</p>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-red-500" />
                          <span className="text-muted-foreground">Loonheffing</span>
                        </div>
                        <span className="font-medium">- € {formatBedrag(resultaat.loonheffing)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-muted-foreground">Sociale Verzekeringen</span>
                        </div>
                        <span className="font-medium">- € {formatBedrag(resultaat.socialeVerzekeringen)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-purple-500" />
                          <span className="text-muted-foreground">Pensioen</span>
                        </div>
                        <span className="font-medium">- € {formatBedrag(resultaat.pensioenPremie)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-orange-500" />
                          <span className="text-muted-foreground">Verzekeringen</span>
                        </div>
                        <span className="font-medium">- € {formatBedrag(resultaat.verzekeringen)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-red-100 dark:bg-red-950/30 rounded-lg">
                        <span className="font-medium">Totaal Inhoudingen</span>
                        <span className="font-bold text-red-600">- € {formatBedrag(resultaat.totaleLasten)}</span>
                      </div>
                    </div>

                    {/* Werkgeverskosten */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Werkgeverskosten</p>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">per maand</p>
                        </div>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          € {formatBedrag(resultaat.brutoMaand + resultaat.werkgeversbijdrage)}
                        </p>
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
                    <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je salaris in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Brutoloon en Nettoloon</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                Het verschil tussen <strong>bruto en netto</strong> salaris is iets waar elke werkende 
                mee te maken krijgt. Je bruto salaris is het volledige bedrag dat je werkgever voor je 
                betaalt, inclusief alle werkgeversbijdragen voor sociale verzekeringen. Je netto salaris 
                is wat je uiteindelijk op je bankrekening ontvangt, na aftrek van alle belastingen en premies.
              </p>
              <p>
                In Nederland wordt je <strong>loonheffing</strong> berekend volgens een progressief 
                belastingstelsel. Dit betekent dat je meer belasting betaalt naarmate je meer verdient. 
                De belasting wordt ingedeeld in schijven, waarbij elke schijf een ander percentage 
                heeft. In 2026 zijn er twee hoofdschijven: 36,97% tot €75.518 en 49,50% daarboven.
              </p>
              <p>
                Naast de inkomstenbelasting betaal je ook <strong>premies voor sociale verzekeringen</strong>. 
                Deze omvatten de AOW (ouderdomsvoorziening), Anw (nabestaandenuitkering), en Wlz 
                (langdurige zorg). Deze premies worden samen met de loonheffing ingehouden op je 
                salaris en afgedragen aan de Belastingdienst.
              </p>
              <p>
                Onze <strong>bruto netto calculator</strong> helpt je om snel te berekenen wat je 
                netto salaris is. Vul je bruto jaarinkomen in, geef aan hoeveel pensioenpremie je 
                betaalt, en je ziet direct je maandelijkse netto inkomen en alle inhoudingen.
              </p>
              <p>
                <strong>Heffingskortingen</strong> kunnen je belastingdruk aanzienlijk verlagen. 
                De algemene heffingskorting en arbeidskorting worden automatisch toegepast bij 
                de berekening van je loonheffing. De arbeidskorting is specifiek bedoeld om 
                werken financieel aantrekkelijker te maken en kan oplopen tot €5.530 per jaar.
              </p>
              <p>
                Als je een <strong>auto van de zaak</strong> hebt, wordt dit beschouwd als een 
                loonbestanddeel. Je betaalt een bijtelling voor het privégebruik van de auto, 
                die wordt toegevoegd aan je brutoloon. Dit verhoogt zowel je loonheffing als 
                je inleg in de volksverzekeringen.
              </p>
              <p>
                <strong>Reiskosten</strong> woon-werkverkeer kunnen fiscaal worden vergoed. 
                Als je werkgever meer dan €7,50 per week aan reiskosten vergoedt, wordt dit 
                beschouwd als loon en moet je er belasting over betalen. Er zijn echter 
                onbelaste opties zoals een ov-abonnement of fietsvergoeding.
              </p>
              <p>
                Wil je een completer beeld van je financiële situatie? Gebruik ook onze andere 
                tools voor <strong>hypotheekberekening</strong>, <strong>pensioenplanning</strong>, 
                en <strong>sparen en beleggen</strong> om je financiële toekomst goed te plannen.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={salarisFAQ} title="Veelgestelde vragen over salaris" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/pensioen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Pensioen</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
              </Link>
              <Link href="/tools/afschrijving" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Afschrijving</p>
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
