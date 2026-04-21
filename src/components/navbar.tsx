"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Calculator,
  Menu,
  X,
  Percent,
  Home,
  Hash,
  Type,
  Calendar,
  Scale,
  Banknote,
  TrendingUp,
  Sparkles,
  Grid3X3,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { TOTAL_TOOL_COUNT } from "@/lib/site-stats";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const tools = [
  { name: "BTW", href: "/tools/btw", icon: Calculator, description: "21% / 9% BTW berekenen" },
  { name: "Hypotheek", href: "/tools/hypotheek", icon: Banknote, description: "Maximale hypotheek & maandlasten" },
  { name: "Procent", href: "/tools/procent", icon: Percent, description: "Percentage berekeningen" },
  { name: "IBAN", href: "/tools/iban", icon: Hash, description: "IBAN nummer check" },
  { name: "Tekst", href: "/tools/tekst", icon: Type, description: "Woorden & karakters tellen" },
  { name: "Valuta", href: "/tools/valuta", icon: TrendingUp, description: "Valuta omrekenen" },
  { name: "Datum", href: "/tools/datum", icon: Calendar, description: "Dagen tussen datums" },
  { name: "BMI", href: "/tools/bmi", icon: Scale, description: "Body Mass Index" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border/60 bg-background/85 text-foreground shadow-sm backdrop-blur-xl"
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="container mx-auto px-4">
        <div className="flex min-h-18 items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-xl px-1 py-1 font-bold text-xl transition-opacity hover:opacity-90"
            aria-label="QuotApp.nl - Terug naar home"
            onClick={() => setIsOpen(false)}
          >
            <MotionDiv
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg"
            >
              <Calculator className="w-5 h-5" aria-hidden="true" />
            </MotionDiv>
            <div className="min-w-0">
              <span className="block truncate text-base sm:text-lg">QuotApp.nl</span>
              <span className="hidden text-xs font-medium text-muted-foreground sm:block">
                {TOTAL_TOOL_COUNT} gratis tools voor Nederland
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1 rounded-2xl border border-border/60 bg-card/80 p-1 text-card-foreground shadow-sm">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Home</span>
            </Link>
            <Link
              href="/tools"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Grid3X3 className="w-4 h-4" aria-hidden="true" />
              <span>Alle tools</span>
            </Link>
            {tools.slice(0, 4).map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {tool.name}
              </Link>
            ))}
            <Link
              href="/over-ons"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Over ons
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link
              href="/tools"
              className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Start berekenen
            </Link>

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-colors hover:bg-secondary lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[720px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-border/60 bg-card/95 p-3 text-card-foreground shadow-lg">
            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/tools"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                <Grid3X3 className="w-5 h-5 text-primary" aria-hidden="true" />
                <div>
                  <span className="font-medium">Alle tools</span>
                  <p className="text-xs text-muted-foreground">Bekijk het volledige overzicht</p>
                </div>
              </Link>
            </div>

            <div className="mt-3 grid gap-2 border-t border-border/60 pt-3">
              <Link
                href="/over-ons"
                className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">Over ons</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-muted-foreground">Wie we zijn en hoe QuotApp werkt</p>
                </div>
              </Link>
              <Link
                href="/contact"
                className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">Contact</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-muted-foreground">Feedback, vragen en verbetersuggesties</p>
                </div>
              </Link>
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <tool.icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{tool.name}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
              <ThemeToggle />
              <Link
                href="/tools"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Start berekenen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
