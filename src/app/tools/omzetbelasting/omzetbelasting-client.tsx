"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, ArrowRight, RotateCcw, 
  Info, Receipt, Building, ShoppingCart, Percent, Check
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

type BtwTarief = 21 | 9 | 0;

interface OmzetbelastingResultaat {
  btwTarief: BtwTarief;
  bedragExclBtw: number;
  btwBedrag: number;
  bedragInclBtw: number;
  tariefPercentage: number;
}

const btwTarieven = [
  { percentage: 21, label: "21%", description: "Standaard tarief",适用: "Meeste goederen en diensten" },
  { percentage: 9, label: "9%", description: "Verlaagd tarief",适用: "Voedingsmiddelen, boeken, medicijnen" },
  { percentage: 0, label: "0%", description: "Nul tarief",适用: "Export, sommige diensten" },
];

const omzetbelastingFAQ = [
  {
    question: "Wat is omzetbelasting (BTW)?",
    answer: "Omzetbelasting, ook wel BTW (Belasting Toegevoegde Waarde) genoemd, is een belasting die wordt geheven over de toegevoegde waarde van goederen en diensten. Als ondernemer betaal je BTW over je inkoop en reken je BTW over je omzet. Je draagt de BTW af aan de Belastingdienst.",
  },
  {
    question: "Wat zijn de BTW-tarieven in Nederland?",
    answer: "In Nederland gelden drie BTW-tarieven: 21% (standaardtarief voor de meeste goederen en diensten), 9% (verlaagd tarief voor voedingsmiddelen, geneesmiddelen, kunst, boeken, en personenvervoer), en 0% (nultarief voor export en intracommunautaire leveringen).",
  },
  {
    question: "Wanneer moet ik BTW in rekening brengen?",
    answer: "Als je een onderneming hebt en goederen of diensten levert, moet je BTW in rekening brengen aan je afnemers. Dit geldt ook als je diensten verricht voor buitenlandse afnemers. Er zijn echter uitzonderingen voor kleine ondernemers en bepaalde sectoren.",
  },
  {
    question: "Hoe bereken ik BTW?",
    answer: "BTW berekenen kan op twee manieren: 1) BTW toevoegen aan een bedrag exclusief BTW: vermenigvuldig met 1,21 (voor 21%), 1,09 (voor 9%), of 1,00 (voor 0%). 2) BTW berekenen over een bedrag inclusief BTW: deel door 1,21 en vermenigvuldig met 0,21.",
  },
  {
    question: "Wat is het verschil tussen inclusief en exclusief BTW?",
    answer: "Exclusief BTW is het basisbedrag zonder BTW. Inclusief BTW is het bedrag inclusief BTW. Als ondernemer werk je meestal met bedragen exclusief BTW voor je administratie, maar aan klanten toon je de prijs inclusief BTW.",
  },
  {
    question: "Kan ik BTW terugvragen?",
    answer: "Ja, als ondernemer kun je de BTW die je hebt betaald over zakelijke inkopen (voorbedrag) aftrekken van de BTW die je in rekening brengt (achterbedrag). Dit heet BTW aftrekken of vooraftrek. Je betaalt alleen het verschil aan de Belastingdienst.",
  },
  {
    question: "Wanneer ben ik BTW-plichtig?",
    answer: "Je bent BTW-plichtig als je regelmatig en zelfstandig goederen of diensten levert met als doel winst te behalen. Dit geldt voor de meeste ondernemers, van zzp'ers tot BV's. Er zijn uitzonderingen voor bepaalde beroepen en organisaties.",
  },
  {
    question: "Wat is de Kleine Ondernemers Regeling (KOR)?",
    answer: "De KOR is een regeling voor ondernemers met weinig BTW-omzet. Als je jaarlijks minder dan €20.000 aan BTW zou moeten afdragen, kun je verzoeken om BTW-vrijstelling. Je rekent dan geen BTW aan klanten en betaalt geen BTW aan leveranciers.",
  },
];

export function OmzetbelastingCalculatorClient() {
  const [bedrag, setBedrag] = useState("1000");
  const [berekeningType, setBerekeningType] = useState<"excl" | "incl">("excl");
  const [btwTarief, setBtwTarief] = useState<BtwTarief>(21);
  const [resultaat, setResultaat] = useState<OmzetbelastingResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const bedragNum = parseFloat(bedrag.replace(",", ".")) || 0;
    const tariefPercentage = btwTarief;

    if (bedragNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    let bedragExclBtw: number;
    let btwBedrag: number;
    let bedragInclBtw: number;

    if (berekeningType === "excl") {
      // BTW toevoegen aan exclusief bedrag
      bedragExclBtw = bedragNum;
      btwBedrag = bedragNum * (tariefPercentage / 100);
      bedragInclBtw = bedragNum + btwBedrag;
    } else {
      // BTW berekenen over inclusief bedrag
      bedragInclBtw = bedragNum;
      bedragExclBtw = bedragNum / (1 + tariefPercentage / 100);
      btwBedrag = bedragInclBtw - bedragExclBtw;
    }

    setResultaat({
      btwTarief,
      bedragExclBtw: Math.round(bedragExclBtw * 100) / 100,
      btwBedrag: Math.round(btwBedrag * 100) / 100,
      bedragInclBtw: Math.round(bedragInclBtw * 100) / 100,
      tariefPercentage,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [bedrag, btwTarief, berekeningType]);

  useEffect(() => {
    bereken();
  }, [bereken]);

  const reset = () => {
    setBedrag("1000");
    setBerekeningType("excl");
    setBtwTarief(21);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Bedrag: €${bedrag} | ${berekeningType === "excl" ? "Exclusief" : "Inclusief"} BTW ${btwTarief}% | BTW: €${formatBedrag(resultaat.btwBedrag)} | Totaal: €${formatBedrag(berekeningType === "excl" ? resultaat.bedragInclBtw : resultaat.bedragExclBtw)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                <Receipt className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Omzetbelasting" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Omzetbelasting Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken BTW (omzetbelasting) snel en eenvoudig. 
              BTW toevoegen of berekenen over een bedrag inclusief BTW.
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
              <h2 className="text-lg font-bold">Berekening</h2>

              {/* Berekening Type */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Wat wil je berekenen?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBerekeningType("excl")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      berekeningType === "excl"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-5 h-5" />
                      <span className="font-medium">Exclusief BTW</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      BTW toevoegen aan basisbedrag
                    </p>
                  </button>

                  <button
                    onClick={() => setBerekeningType("incl")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      berekeningType === "incl"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="font-medium">Inclusief BTW</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      BTW berekenen uit totaalbedrag
                    </p>
                  </button>
                </div>
              </div>

              {/* Bedrag */}
              <div>
                <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
                  {berekeningType === "excl" ? "Bedrag exclusief BTW (€)" : "Bedrag inclusief BTW (€)"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="bedrag"
                    type="text"
                    inputMode="decimal"
                    value={bedrag}
                    onChange={(e) => setBedrag(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="1.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["100", "500", "1000", "5000", "10000"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedrag(b)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        bedrag === b ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{parseInt(b).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* BTW Tarief */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <span className="flex items-center gap-1">
                    BTW Tarief
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="space-y-2">
                  {btwTarieven.map((tarief) => (
                    <button
                      key={tarief.percentage}
                      onClick={() => setBtwTarief(tarief.percentage as BtwTarief)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                        btwTarief === tarief.percentage
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{tarief.label}</span>
                          <span className="text-sm text-muted-foreground">{tarief.description}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{tarief.适用}</p>
                      </div>
                      {btwTarief === tarief.percentage && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
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
                    toolName="Omzetbelasting Calculator" 
                    result={resultText}
                    url="/tools/omzetbelasting"
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
                    {/* Totaalbedrag */}
                    <motion.div 
                      className="p-6 bg-teal-500/10 border-2 border-teal-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">
                        {berekeningType === "excl" ? "Totaal (inclusief BTW)" : "Basisbedrag (exclusief BTW)"}
                      </p>
                      <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                        € {formatBedrag(berekeningType === "excl" ? resultaat.bedragInclBtw : resultaat.bedragExclBtw)}
                      </p>
                    </motion.div>

                    {/* Flow Visual */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <div className="text-center flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Exclusief BTW</p>
                        <p className="text-lg font-bold">€ {formatBedrag(resultaat.bedragExclBtw)}</p>
                      </div>
                      <div className="flex flex-col items-center px-4">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                          <Percent className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium mt-1">{resultaat.tariefPercentage}%</span>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Inclusief BTW</p>
                        <p className="text-lg font-bold">€ {formatBedrag(resultaat.bedragInclBtw)}</p>
                      </div>
                    </div>

                    {/* BTW Details */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Details</p>
                      
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Euro className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Basisbedrag</span>
                        </div>
                        <span className="font-medium">€ {formatBedrag(resultaat.bedragExclBtw)}</span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-teal-500" />
                          <span className="text-muted-foreground">BTW ({resultaat.tariefPercentage}%)</span>
                        </div>
                        <span className="font-bold text-teal-600">€ {formatBedrag(resultaat.btwBedrag)}</span>
                      </div>
                      
                      <div className="flex justify-between p-3 bg-teal-100 dark:bg-teal-950/30 rounded-lg">
                        <span className="font-medium">Totaal</span>
                        <span className="font-bold text-teal-600">€ {formatBedrag(resultaat.bedragInclBtw)}</span>
                      </div>
                    </div>

                    {/* Snelkoppelingen */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                        Snel omrekenen (21%)
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Excl → Incl (×1,21)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">€{(parseFloat(bedrag) * 1.21).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Incl → Excl (÷1,21)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">€{(parseFloat(bedrag) / 1.21).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Tip voor ondernemers</p>
                          <p className="text-amber-700 dark:text-amber-300">
                            Vergeet niet dat je als BTW-plichtige ondernemer de BTW kunt aftrekken 
                            van je zakelijke uitgaven. Reken altijd met bedragen exclusief BTW 
                            voor je administratie.
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
                    <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul een bedrag in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* BTW Tarieven Overzicht */}
          <div className="mt-8 card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary" />
              BTW Tarieven Overzicht
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">21%</span>
                  <span className="text-sm text-muted-foreground">Standaard</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Meeste goederen en diensten: elektronica, kleding, horeca, dienstverlening
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-green-600">9%</span>
                  <span className="text-sm text-muted-foreground">Verlaagd</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Voedingsmiddelen, water, geneesmiddelen, kunst, boeken, transport
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-blue-600">0%</span>
                  <span className="text-sm text-muted-foreground">Nul</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Export naar EU-landen, intracommunautaire leveringen, sommige diensten
                </p>
              </div>
            </div>
          </div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Omzetbelasting (BTW)</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                <strong>Omzetbelasting (BTW)</strong> is een van de belangrijkste belastingen 
                voor ondernemers in Nederland. Het is een belasting die wordt geheven over de 
                toegevoegde waarde van goederen en diensten. Als ondernemer ben je verplicht 
                om BTW in rekening te brengen bij je klanten en af te dragen aan de Belastingdienst.
              </p>
              <p>
                In Nederland gelden drie verschillende <strong>BTW-tarieven</strong>. Het standaardtarief 
                van 21% is van toepassing op de meeste goederen en diensten. Het verlaagde tarief 
                van 9% geldt voor essentiële producten zoals voedingsmiddelen, geneesmiddelen, 
                boeken, en personenvervoer. Het nultarief van 0% is van toepassing op export 
                en intracommunautaire leveringen.
              </p>
              <p>
                Onze <strong>BTW calculator</strong> helpt je om snel BTW te berekenen. Je kunt 
                kiezen of je BTW wilt toevoegen aan een bedrag exclusief BTW, of BTW wilt 
                berekenen over een bedrag inclusief BTW. Selecteer het juiste tarief en je 
                ziet direct het resultaat.
              </p>
              <p>
                Voor <strong>ondernemers</strong> is BTW een doorgeefluik. Je betaalt BTW over 
                je zakelijke inkopen (voorbedrag) en rekent BTW over je verkopen (achterbedrag). 
                Het verschil tussen deze twee bedragen lever je in aan de Belastingdienst. In 
                je administratie werk je altijd met bedragen exclusief BTW.
              </p>
              <p>
                Er zijn echter uitzonderingen en speciale regelingen. De <strong>Kleine 
                Ondernemers Regeling (KOR)</strong> is bedoeld voor ondernemers met een 
                kleine BTW-omzet. Als je jaarlijks minder dan €20.000 aan BTW zou moeten 
                afdragen, kun je vrijstelling aanvragen. Je rekent dan geen BTW aan klanten.
              </p>
              <p>
                <strong>Factureren met BTW</strong> vereist specifieke vermeldingen op je 
                facturen. Je moet de BTW verplicht apart vermelden, inclusief het BTW-bedrag 
                en het toepasselijke tarief. Voor intracommunautaire leveringen moet je ook 
                het BTW-nummer van je klant vermelden.
              </p>
              <p>
                Het <strong>aangifte doen van BTW</strong> gebeurt meestal maandelijks, 
                per kwartaal, of jaarlijks, afhankelijk van je omzet. Via de digitale 
                aangifte van de Belastingdienst dien je de voorbelasting en achterbelasting 
                in en betaal je het verschil of ontvang je terug.
              </p>
              <p>
                Wil je meer weten over financiële planning voor je onderneming? Gebruik ook 
                onze tools voor <strong>salaris berekening</strong>, <strong>afschrijving</strong>, 
                en <strong>pensioen planning</strong> voor een compleet beeld van je 
                ondernemersfinanciën.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={omzetbelastingFAQ} title="Veelgestelde vragen over omzetbelasting" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/afschrijving" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Afschrijving</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
              </Link>
              <Link href="/tools/salaris-netto" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Salaris</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
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
