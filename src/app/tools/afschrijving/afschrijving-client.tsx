"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Calendar, ArrowRight, RotateCcw, 
  Info, TrendingDown, BarChart3, Table, Download
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

type AfschrijvingsMethode = "lineair" | "degressief" | "som-jaren";

interface AfschrijvingRegel {
  jaar: number;
  boekwaardeBegin: number;
  afschrijving: number;
  cumulatief: number;
  boekwaardeEind: number;
}

interface AfschrijvingResultaat {
  methode: AfschrijvingsMethode;
  aanschafwaarde: number;
  restwaarde: number;
  afschrijfbareBedrag: number;
  totaleAfschrijving: number;
  schema: AfschrijvingRegel[];
  lineairPercentage: number;
  degressiefPercentage: number;
}

const afschrijvingFAQ = [
  {
    question: "Wat is afschrijving?",
    answer: "Afschrijving is de systematische verdeling van de aanschafkosten van een bedrijfsmiddel over de verwachte gebruiksduur. Het geeft aan hoe waardevermindering van activa (zoals machines, auto's, of computers) wordt verantwoord in de boekhouding.",
  },
  {
    question: "Welke afschrijvingsmethoden zijn er?",
    answer: "De meest gebruikte methoden zijn: 1) Lineaire afschrijving - elk jaar hetzelfde bedrag, 2) Degressieve afschrijving - hoog aan het begin, dalend over tijd, 3) Som-der-jaren methode - versnelde afschrijving gebaseerd op een breuk, 4) Productie-eenheden methode - gebaseerd op gebruik.",
  },
  {
    question: "Wat is de restwaarde?",
    answer: "De restwaarde (ook wel scarpwaarde of residuwaarde) is de geschatte waarde van een bedrijfsmiddel aan het einde van de gebruiksduur. Dit bedrag wordt niet afgeschreven, waardoor alleen het verschil tussen aanschafwaarde en restwaarde wordt verdeeld over de gebruiksduur.",
  },
  {
    question: "Hoe lang mag ik afschrijven?",
    answer: "De afschrijvingstermijn hangt af van de verwachte gebruiksduur van het bedrijfsmiddel. Richtlijnen: computers 3 jaar, auto's 5 jaar, machines 5-10 jaar, gebouwen 20-33 jaar. De Belastingdienst hanteert maximale afschrijvingstermijnen voor belastingdoeleinden.",
  },
  {
    question: "Is afschrijving aftrekbaar?",
    answer: "Afschrijving is een niet-cash kostenpost die de winst vermindert en daardoor de te betalen belasting verlaagt. Het is fiscaal aftrekbaar, maar er gelden regels over minimale en maximale afschrijvingstermijnen en restwaarden.",
  },
  {
    question: "Wat is het verschil tussen boekhoudkundige en fiscale afschrijving?",
    answer: "Boekhoudkundige afschrijving volgt de werkelijke waardevermindering volgens je eigen inschatting. Fiscale afschrijving volgt de regels van de Belastingdienst en bepaalt wat je zakelijk kunt aftrekken. Deze kunnen verschillen, wat leidt tot tijdelijke verschillen in de winst.",
  },
  {
    question: "Wanneer start ik met afschrijven?",
    answer: "Je begint met afschrijven op het moment dat het bedrijfsmiddel wordt gebruikt in je onderneming. Bij aankoop in de loop van het jaar schrijf je pro-rata af over de periode dat het bedrijfsmiddel in gebruik is geweest.",
  },
  {
    question: "Kan ik versneld afschrijven?",
    answer: "Ja, voor bepaalde bedrijfsmiddelen gelden fiscale faciliteiten voor versnelde afschrijving. Zo kun je voor investeringen in bepaalde sectoren of voor milieu-investeringen gebruik maken van de Milieu-investeringsaftrek (MIA) of Willekeurige afschrijving.",
  },
];

export function AfschrijvingCalculatorClient() {
  const [aanschafwaarde, setAanschafwaarde] = useState("25000");
  const [restwaarde, setRestwaarde] = useState("2500");
  const [gebruiksduur, setGebruiksduur] = useState("5");
  const [methode, setMethode] = useState<AfschrijvingsMethode>("lineair");
  const [resultaat, setResultaat] = useState<AfschrijvingResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const aanschafNum = parseFloat(aanschafwaarde.replace(",", ".")) || 0;
    const restwaardeNum = parseFloat(restwaarde.replace(",", ".")) || 0;
    const gebruiksduurNum = parseInt(gebruiksduur) || 5;

    if (aanschafNum <= 0 || gebruiksduurNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const afschrijfbaarBedrag = aanschafNum - restwaardeNum;
    const schema: AfschrijvingRegel[] = [];
    let boekwaarde = aanschafNum;
    let cumulatief = 0;
    let totaleAfschrijving = 0;

    if (methode === "lineair") {
      const lineairBedrag = afschrijfbaarBedrag / gebruiksduurNum;
      const lineairPercentage = (lineairBedrag / afschrijfbaarBedrag) * 100;

      for (let i = 1; i <= gebruiksduurNum; i++) {
        const afschrijving = lineairBedrag;
        cumulatief += afschrijving;
        boekwaarde = Math.max(restwaardeNum, aanschafNum - cumulatief);
        totaleAfschrijving += afschrijving;

        schema.push({
          jaar: i,
          boekwaardeBegin: Math.round((boekwaarde + afschrijving) * 100) / 100,
          afschrijving: Math.round(afschrijving * 100) / 100,
          cumulatief: Math.round(cumulatief * 100) / 100,
          boekwaardeEind: Math.round(boekwaarde * 100) / 100,
        });
      }

      setResultaat({
        methode,
        aanschafwaarde: aanschafNum,
        restwaarde: restwaardeNum,
        afschrijfbareBedrag,
        totaleAfschrijving,
        schema,
        lineairPercentage: Math.round(lineairPercentage * 100) / 100,
        degressiefPercentage: 0,
      });

    } else if (methode === "degressief") {
      // Double declining balance
      const degressiefPercentage = (100 / gebruiksduurNum) * 2;

      for (let i = 1; i <= gebruiksduurNum; i++) {
        let afschrijving = boekwaarde * (degressiefPercentage / 100);
        
        // Laatste jaar aanpassen zodat we niet onder restwaarde komen
        if (boekwaarde - afschrijving < restwaardeNum) {
          afschrijving = boekwaarde - restwaardeNum;
        }

        cumulatief += afschrijving;
        boekwaarde = Math.max(restwaardeNum, boekwaarde - afschrijving);
        totaleAfschrijving += afschrijving;

        schema.push({
          jaar: i,
          boekwaardeBegin: Math.round((boekwaarde + afschrijving) * 100) / 100,
          afschrijving: Math.round(afschrijving * 100) / 100,
          cumulatief: Math.round(cumulatief * 100) / 100,
          boekwaardeEind: Math.round(boekwaarde * 100) / 100,
        });
      }

      setResultaat({
        methode,
        aanschafwaarde: aanschafNum,
        restwaarde: restwaardeNum,
        afschrijfbareBedrag,
        totaleAfschrijving,
        schema,
        lineairPercentage: 0,
        degressiefPercentage: Math.round(degressiefPercentage * 100) / 100,
      });

    } else if (methode === "som-jaren") {
      // Sum of years digits
      const somJaren = (gebruiksduurNum * (gebruiksduurNum + 1)) / 2;

      for (let i = 1; i <= gebruiksduurNum; i++) {
        const teller = gebruiksduurNum - i + 1;
        const afschrijving = (teller / somJaren) * afschrijfbaarBedrag;
        
        cumulatief += afschrijving;
        boekwaarde = Math.max(restwaardeNum, aanschafNum - cumulatief);
        totaleAfschrijving += afschrijving;

        schema.push({
          jaar: i,
          boekwaardeBegin: Math.round((boekwaarde + afschrijving) * 100) / 100,
          afschrijving: Math.round(afschrijving * 100) / 100,
          cumulatief: Math.round(cumulatief * 100) / 100,
          boekwaardeEind: Math.round(boekwaarde * 100) / 100,
        });
      }

      setResultaat({
        methode,
        aanschafwaarde: aanschafNum,
        restwaarde: restwaardeNum,
        afschrijfbareBedrag,
        totaleAfschrijving,
        schema,
        lineairPercentage: 0,
        degressiefPercentage: 0,
      });
    }

    setTimeout(() => setIsCalculating(false), 150);
  }, [aanschafwaarde, restwaarde, gebruiksduur, methode]);

  useEffect(() => {
    bereken();
  }, [bereken]);

  const reset = () => {
    setAanschafwaarde("25000");
    setRestwaarde("2500");
    setGebruiksduur("5");
    setMethode("lineair");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Aanschaf: €${aanschafwaarde} | Restwaarde: €${restwaarde} | Jaren: ${gebruiksduur} | Methode: ${methode} | Totale afschrijving: €${formatBedrag(resultaat.totaleAfschrijving)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 text-white shadow-lg">
                <TrendingDown className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Afschrijving" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Afschrijving Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken de afschrijving van bedrijfsmiddelen met verschillende methoden. 
              Lineair, degressief, of som-der-jaren - vergelijk de methoden.
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
              <h2 className="text-lg font-bold">Bedrijfsmiddel Gegevens</h2>
              
              {/* Aanschafwaarde */}
              <div>
                <label htmlFor="aanschafwaarde" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Aanschafwaarde (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="aanschafwaarde"
                    type="text"
                    inputMode="decimal"
                    value={aanschafwaarde}
                    onChange={(e) => setAanschafwaarde(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="25.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Restwaarde */}
              <div>
                <label htmlFor="restwaarde" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Restwaarde (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="restwaarde"
                    type="text"
                    inputMode="decimal"
                    value={restwaarde}
                    onChange={(e) => setRestwaarde(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="2.500"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Waarde aan het einde van de gebruiksduur
                </p>
              </div>

              {/* Gebruiksduur */}
              <div>
                <label htmlFor="gebruiksduur" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Gebruiksduur (jaren)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <input
                  id="gebruiksduur"
                  type="number"
                  value={gebruiksduur}
                  onChange={(e) => setGebruiksduur(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["3", "5", "7", "10", "15", "20"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setGebruiksduur(j)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        gebruiksduur === j ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j} jaar
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              {/* Afschrijvingsmethode */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <span className="flex items-center gap-1">
                    Afschrijvingsmethode
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                    methode === "lineair" 
                      ? "bg-primary/10 border-primary" 
                      : "border-border hover:border-primary/50"
                  }`}>
                    <input
                      type="radio"
                      name="methode"
                      value="lineair"
                      checked={methode === "lineair"}
                      onChange={() => setMethode("lineair")}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium">Lineair</p>
                      <p className="text-xs text-muted-foreground">Zelfde bedrag per jaar</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                    methode === "degressief" 
                      ? "bg-primary/10 border-primary" 
                      : "border-border hover:border-primary/50"
                  }`}>
                    <input
                      type="radio"
                      name="methode"
                      value="degressief"
                      checked={methode === "degressief"}
                      onChange={() => setMethode("degressief")}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium">Degressief (Double Declining)</p>
                      <p className="text-xs text-muted-foreground">Hoog aan het begin, dalend</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                    methode === "som-jaren" 
                      ? "bg-primary/10 border-primary" 
                      : "border-border hover:border-primary/50"
                  }`}>
                    <input
                      type="radio"
                      name="methode"
                      value="som-jaren"
                      checked={methode === "som-jaren"}
                      onChange={() => setMethode("som-jaren")}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium">Som-der-Jaren</p>
                      <p className="text-xs text-muted-foreground">Versnelde afschrijving</p>
                    </div>
                  </label>
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
                    toolName="Afschrijving Calculator" 
                    result={resultText}
                    url="/tools/afschrijving"
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
                    {/* Jaarlijkse Afschrijving */}
                    <motion.div 
                      className="p-6 bg-slate-500/10 border-2 border-slate-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Jaarlijkse Afschrijving (gemiddeld)</p>
                      <p className="text-3xl font-bold text-slate-600 dark:text-slate-400">
                        € {formatBedrag(resultaat.afschrijfbareBedrag / parseInt(gebruiksduur))}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        over {gebruiksduur} jaar
                      </p>
                    </motion.div>

                    {/* Info */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 capitalize">
                            {methode === "som-jaren" ? "Som-der-Jaren" : methode} Methode
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            {methode === "lineair" && `${resultaat.lineairPercentage}% per jaar`}
                            {methode === "degressief" && `${resultaat.degressiefPercentage}% per jaar`}
                            {methode === "som-jaren" && "Progressieve afschrijving"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Overzicht */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Afschrijving Overzicht</p>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Aanschafwaarde</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.aanschafwaarde)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">- Restwaarde</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.restwaarde)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <span className="font-medium">Afschrijfbaar Bedrag</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.afschrijfbareBedrag)}</span>
                      </div>
                    </div>

                    {/* Afschrijvingsschema */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Afschrijvingsschema</p>
                        <Table className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="max-h-64 overflow-y-auto border border-border rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-muted sticky top-0">
                            <tr>
                              <th className="p-2 text-left font-medium">Jaar</th>
                              <th className="p-2 text-right font-medium">Boekwaarde</th>
                              <th className="p-2 text-right font-medium">Afschrijving</th>
                              <th className="p-2 text-right font-medium">Cumulatief</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultaat.schema.map((regel) => (
                              <tr key={regel.jaar} className="border-t border-border hover:bg-muted/50">
                                <td className="p-2 font-medium">{regel.jaar}</td>
                                <td className="p-2 text-right">€{formatBedrag(regel.boekwaardeBegin)}</td>
                                <td className="p-2 text-right text-red-500">-€{formatBedrag(regel.afschrijving)}</td>
                                <td className="p-2 text-right">€{formatBedrag(regel.boekwaardeEind)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                    <TrendingDown className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Afschrijving van Bedrijfsmiddelen</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                <strong>Afschrijving</strong> is een essentieel concept in de bedrijfsboekhouding 
                dat de waardevermindering van bedrijfsmiddelen over tijd weergeeft. Wanneer je als 
                ondernemer investeert in activa zoals machines, auto's, computers, of meubels, 
                verliezen deze items hun waarde door slijtage, veroudering, of gebruik.
              </p>
              <p>
                Het doel van afschrijving is om de <strong>aanschafkosten</strong> van een 
                bedrijfsmiddel systematisch te verdelen over de periode waarin het bedrijfsmiddel 
                wordt gebruikt. Dit geeft een realistischer beeld van de werkelijke kosten en 
                winst van je onderneming in elk boekjaar.
              </p>
              <p>
                De meest gebruikte <strong>afschrijvingsmethoden</strong> zijn lineair, degressief, 
                en som-der-jaren. Bij lineaire afschrijving schrijf je elk jaar hetzelfde bedrag af. 
                Bij degressieve afschrijving is de afschrijving aan het begin hoog en neemt af over tijd. 
                De som-der-jaren methode is een versnelde methode gebaseerd op een breuk.
              </p>
              <p>
                Onze <strong>afschrijving calculator</strong> helpt je om de afschrijving van je 
                bedrijfsmiddelen te berekenen. Vul de aanschafwaarde in, bepaal de restwaarde 
                (wat het bedrijfsmiddel na gebruik nog waard is), en kies de gebruiksduur. 
                Je ziet direct het afschrijvingsschema voor alle methoden.
              </p>
              <p>
                De <strong>restwaarde</strong> is het bedrag dat een bedrijfsmiddel naar verwachting 
                nog waard is aan het einde van de gebruiksduur. Dit kan de opbrengst zijn bij 
                verkoop, de sloopwaarde, of nul als het bedrijfsmiddel verwacht wordt totaal 
                waardeloos te worden.
              </p>
              <p>
                Voor <strong>fiscale afschrijving</strong> gelden er andere regels dan voor 
                administratieve afschrijving. De Belastingdienst hanteert maximale 
                afschrijvingstermijnen en soms kun je gebruik maken van speciale regelingen 
                zoals de Milieu-investeringsaftrek (MIA) of Willekeurige afschrijving.
              </p>
              <p>
                Bij het kiezen van een afschrijvingsmethode is het belangrijk om te kijken 
                naar de <strong>werkelijke waardevermindering</strong> van het bedrijfsmiddel. 
                Een auto verliest bijvoorbeeld vooral in het eerste jaar veel waarde, 
                terwijl een machine gelijkmatig slijt. Kies de methode die het beste 
                past bij het patroon van waardevermindering.
              </p>
              <p>
                Wil je meer weten over financiële planning voor je onderneming? Gebruik ook 
                onze tools voor <strong>omzetbelasting berekening</strong>, <strong>salaris 
                berekening</strong>, en <strong>pensioen planning</strong> voor een compleet 
                beeld van je ondernemersfinanciën.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={afschrijvingFAQ} title="Veelgestelde vragen over afschrijving" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/omzetbelasting" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Omzetbelasting</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/pensioen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Pensioen</p>
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
