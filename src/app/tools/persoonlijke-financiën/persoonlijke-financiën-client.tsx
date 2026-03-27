"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Plus, Minus, Trash2, PieChart, BarChart3, Download, BookOpen, Calculator, Target, AlertCircle } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface Inkomst {
  id: string;
  naam: string;
  bedrag: number;
  frequentie: "maandelijks" | "jaarlijks" | "eenmalig";
}

interface Uitgave {
  id: string;
  naam: string;
  bedrag: number;
  frequentie: "maandelijks" | "jaarlijks" | "eenmalig";
  categorie: string;
}

interface Resultaat {
  totaalInkomsten: number;
  totaalUitgaven: number;
  saldo: number;
  besparingsRate: number;
  categorieën: { naam: string; bedrag: number; percentage: number }[];
}

const categorieën = [
  "Wonen",
  "Vervoer",
  "Verzekeringen",
  "Eten & Drinken",
  "Abonnementen",
  "Kleding",
  "Vrije tijd",
  "Gezondheid",
  "Schulden",
  "Overig",
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const financienFAQ = [
  {
    question: "Hoe beheer ik mijn persoonlijke financiën?",
    answer: "Begin met het in kaart brengen van al je inkomsten en uitgaven. Noteer vaste lasten, variabele kosten en onverwachte uitgaven. Een financieel dashboard helpt je om overzicht te houden en bewuste keuzes te maken.",
  },
  {
    question: "Wat is een goede besparingsratio?",
    answer: "Een vuistregel is om minimaal 10-20% van je inkomen te sparen. Ideaal is 20-30%. Hoe hoger je besparingsratio, hoe sneller je financiële doelen bereikt.",
  },
  {
    question: "Hoe categoriseer ik mijn uitgaven?",
    answer: "Groepeer uitgaven in logische categorieën zoals wonen, vervoer, eten, abonnementen, etc. Dit geeft inzicht in waar je geld naartoe gaat en waar je kunt besparen.",
  },
  {
    question: "Moet ik elk bedrag bijhouden?",
    answer: "Focus op de grote posten en vaste lasten. Kleine variaties zijn minder belangrijk voor het overzicht. Maak een onderscheid tussen vaste en variabele kosten.",
  },
];

export function PersoonlijkeFinancienClient() {
  // Inkomsten
  const [inkomsten, setInkomsten] = useState<Inkomst[]>([
    { id: "1", naam: "Nettoloon", bedrag: 3000, frequentie: "maandelijks" },
  ]);

  const [nieuweInkomen, setNieuweInkomen] = useState({ naam: "", bedrag: "", frequentie: "maandelijks" as const });

  // Uitgaven
  const [uitgaven, setUitgaven] = useState<Uitgave[]>([
    { id: "1", naam: "Huur", bedrag: 1200, frequentie: "maandelijks", categorie: "Wonen" },
    { id: "2", naam: "Boodschappen", bedrag: 400, frequentie: "maandelijks", categorie: "Eten & Drinken" },
    { id: "3", naam: "Zorgverzekering", bedrag: 150, frequentie: "maandelijks", categorie: "Verzekeringen" },
    { id: "4", naam: "Auto (brandstof)", bedrag: 200, frequentie: "maandelijks", categorie: "Vervoer" },
  ]);

  const [nieuweUitgave, setNieuweUitgave] = useState({ naam: "", bedrag: "", frequentie: "maandelijks" as const, categorie: "Overig" });
  const [actiefTab, setActiefTab] = useState<"inkomsten" | "uitgaven">("uitgaven");

  // Berekeningen
  const resultaat = useMemo((): Resultaat => {
    // Converteer naar maandelijkse bedragen
    const totaalInkomsten = inkomsten.reduce((sum, item) => {
      let maandbedrag = item.bedrag;
      if (item.frequentie === "jaarlijks") maandbedrag = item.bedrag / 12;
      if (item.frequentie === "eenmalig") maandbedrag = 0;
      return sum + maandbedrag;
    }, 0);

    const totaalUitgaven = uitgaven.reduce((sum, item) => {
      let maandbedrag = item.bedrag;
      if (item.frequentie === "jaarlijks") maandbedrag = item.bedrag / 12;
      if (item.frequentie === "eenmalig") maandbedrag = 0;
      return sum + maandbedrag;
    }, 0);

    const saldo = totaalInkomsten - totaalUitgaven;
    const besparingsRate = totaalInkomsten > 0 ? (saldo / totaalInkomsten) * 100 : 0;

    // Categoriseer uitgaven
    const categorieMap = new Map<string, number>();
    uitgaven.forEach((item) => {
      let maandbedrag = item.bedrag;
      if (item.frequentie === "jaarlijks") maandbedrag = item.bedrag / 12;
      if (item.frequentie === "eenmalig") maandbedrag = 0;
      const huidig = categorieMap.get(item.categorie) || 0;
      categorieMap.set(item.categorie, huidig + maandbedrag);
    });

    const categorieën = Array.from(categorieMap.entries())
      .map(([naam, bedrag]) => ({
        naam,
        bedrag,
        percentage: totaalUitgaven > 0 ? (bedrag / totaalUitgaven) * 100 : 0,
      }))
      .sort((a, b) => b.bedrag - a.bedrag);

    return {
      totaalInkomsten,
      totaalUitgaven,
      saldo,
      besparingsRate,
      categorieën,
    };
  }, [inkomsten, uitgaven]);

  const addInkomen = () => {
    if (!nieuweInkomen.naam || !nieuweInkomen.bedrag) return;
    setInkomsten([
      ...inkomsten,
      {
        id: Date.now().toString(),
        naam: nieuweInkomen.naam,
        bedrag: parseFloat(nieuweInkomen.bedrag),
        frequentie: nieuweInkomen.frequentie,
      },
    ]);
    setNieuweInkomen({ naam: "", bedrag: "", frequentie: "maandelijks" });
  };

  const removeInkomen = (id: string) => {
    setInkomsten(inkomsten.filter((i) => i.id !== id));
  };

  const addUitgave = () => {
    if (!nieuweUitgave.naam || !nieuweUitgave.bedrag) return;
    setUitgaven([
      ...uitgaven,
      {
        id: Date.now().toString(),
        naam: nieuweUitgave.naam,
        bedrag: parseFloat(nieuweUitgave.bedrag),
        frequentie: nieuweUitgave.frequentie,
        categorie: nieuweUitgave.categorie,
      },
    ]);
    setNieuweUitgave({ naam: "", bedrag: "", frequentie: "maandelijks", categorie: "Overig" });
  };

  const removeUitgave = (id: string) => {
    setUitgaven(uitgaven.filter((u) => u.id !== id));
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500",
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
      "bg-orange-500", "bg-cyan-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ToolTopBannerAd slot={AD_SLOTS.toolTop} />
      
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <Wallet className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Persoonlijke Financiën" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Persoonlijk Financiën Dashboard
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Houd overzicht van al je inkomsten en uitgaven. Zie direct je financiële situatie en besparingspotentieel.
            </p>
          </motion.div>

          {/* Samenvatting */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card bg-green-500/10 border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Inkomsten</span>
              </div>
              <p className="text-2xl font-bold text-green-600">€ {formatBedrag(resultaat.totaalInkomsten)}</p>
              <p className="text-xs text-muted-foreground">per maand</p>
            </div>

            <div className="card bg-red-500/10 border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-muted-foreground">Uitgaven</span>
              </div>
              <p className="text-2xl font-bold text-red-600">€ {formatBedrag(resultaat.totaalUitgaven)}</p>
              <p className="text-xs text-muted-foreground">per maand</p>
            </div>

            <div className={`card border-2 ${resultaat.saldo >= 0 ? "bg-blue-500/10 border-blue-500/30" : "bg-red-500/10 border-red-500/30"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className={`w-4 h-4 ${resultaat.saldo >= 0 ? "text-blue-600" : "text-red-600"}`} />
                <span className="text-sm text-muted-foreground">Saldo</span>
              </div>
              <p className={`text-2xl font-bold ${resultaat.saldo >= 0 ? "text-blue-600" : "text-red-600"}`}>
                € {formatBedrag(resultaat.saldo)}
              </p>
              <p className="text-xs text-muted-foreground">per maand</p>
            </div>

            <div className={`card ${resultaat.besparingsRate >= 10 ? "bg-green-500/10 border-green-500/30" : "bg-yellow-500/10 border-yellow-500/30"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className={`w-4 h-4 ${resultaat.besparingsRate >= 10 ? "text-green-600" : "text-yellow-600"}`} />
                <span className="text-sm text-muted-foreground">Besparingsrate</span>
              </div>
              <p className={`text-2xl font-bold ${resultaat.besparingsRate >= 10 ? "text-green-600" : "text-yellow-600"}`}>
                {resultaat.besparingsRate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                {resultaat.besparingsRate >= 20 ? "💪 Uitstekend!" : resultaat.besparingsRate >= 10 ? "✓ Goed" : "⚠️ Omhoog"}
              </p>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiefTab("uitgaven")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                actiefTab === "uitgaven"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Uitgaven
            </button>
            <button
              onClick={() => setActiefTab("inkomsten")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                actiefTab === "inkomsten"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Inkomsten
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Uitgaven Lijst */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Uitgaven
              </h2>

              <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
                {uitgaven.map((uitgave) => (
                  <div key={uitgave.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{uitgave.naam}</p>
                      <p className="text-xs text-muted-foreground">{uitgave.categorie} • {uitgave.frequentie}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-red-600">€ {formatBedrag(uitgave.bedrag)}</span>
                      <button
                        onClick={() => removeUitgave(uitgave.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nieuwe uitgave toevoegen */}
              {actiefTab === "uitgaven" && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Uitgave toevoegen
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Naam (bijv. Boodschappen)"
                      value={nieuweUitgave.naam}
                      onChange={(e) => setNieuweUitgave({ ...nieuweUitgave, naam: e.target.value })}
                      className="w-full px-4 py-2 input"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Bedrag"
                        value={nieuweUitgave.bedrag}
                        onChange={(e) => setNieuweUitgave({ ...nieuweUitgave, bedrag: e.target.value })}
                        className="px-4 py-2 input"
                      />
                      <select
                        value={nieuweUitgave.categorie}
                        onChange={(e) => setNieuweUitgave({ ...nieuweUitgave, categorie: e.target.value })}
                        className="px-4 py-2 input"
                      >
                        {categorieën.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <select
                      value={nieuweUitgave.frequentie}
                      onChange={(e) => setNieuweUitgave({ ...nieuweUitgave, frequentie: e.target.value as any })}
                      className="w-full px-4 py-2 input"
                    >
                      <option value="maandelijks">Maandelijks</option>
                      <option value="jaarlijks">Jaarlijks</option>
                    </select>
                    <button
                      onClick={addUitgave}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Toevoegen
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Inkomsten Lijst */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Inkomsten
              </h2>

              <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
                {inkomsten.map((inkomen) => (
                  <div key={inkomen.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{inkomen.naam}</p>
                      <p className="text-xs text-muted-foreground">{inkomen.frequentie}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-green-600">€ {formatBedrag(inkomen.bedrag)}</span>
                      <button
                        onClick={() => removeInkomen(inkomen.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nieuwe inkomen toevoegen */}
              {actiefTab === "inkomsten" && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Inkomen toevoegen
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Naam (bijv. Salaris)"
                      value={nieuweInkomen.naam}
                      onChange={(e) => setNieuweInkomen({ ...nieuweInkomen, naam: e.target.value })}
                      className="w-full px-4 py-2 input"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Bedrag"
                        value={nieuweInkomen.bedrag}
                        onChange={(e) => setNieuweInkomen({ ...nieuweInkomen, bedrag: e.target.value })}
                        className="px-4 py-2 input"
                      />
                      <select
                        value={nieuweInkomen.frequentie}
                        onChange={(e) => setNieuweInkomen({ ...nieuweInkomen, frequentie: e.target.value as any })}
                        className="px-4 py-2 input"
                      >
                        <option value="maandelijks">Maandelijks</option>
                        <option value="jaarlijks">Jaarlijks</option>
                      </select>
                    </div>
                    <button
                      onClick={addInkomen}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Toevoegen
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Categorie Pie Chart */}
          {resultaat.categorieën.length > 0 && (
            <motion.div 
              className="mt-8 card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Uitgaven per Categorie
              </h2>

              <div className="space-y-4">
                {resultaat.categorieën.map((cat, index) => (
                  <div key={cat.naam}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{cat.naam}</span>
                      <span>€ {formatBedrag(cat.bedrag)} ({cat.percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getCategoryColor(index)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning als negatief */}
              {resultaat.saldo < 0 && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-600">Let op: Negatief saldo!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Je geeft meer uit dan je verdient. Overweeg om uitgaven te verlagen of extra inkomsten te zoeken.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          {/* SEO Content */}
          <motion.div 
            className="mt-12 card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold">Financieel Overzicht Houden</h2>
            </div>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Het bijhouden van je <strong>persoonlijke financiën</strong> is de basis voor financiële rust 
                en het behalen van je financiële doelen. Door bewust om te gaan met geld, kun je slimmere 
                beslissingen nemen en onnodige uitgaven identificeren.
              </p>
              <p>
                Gebruik dit dashboard om maandelijks je inkomsten en uitgaven te monitoren. 
                Door dit consistent bij te houden, krijg je inzicht in je financiële patronen 
                en kun je tijdig bijsturen.
              </p>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={financienFAQ} title="Veelgestelde vragen over persoonlijke financiën" />

          <RelatedTools currentTool="Persoonlijke Financiën" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Persoonlijke Financiën Dashboard" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
