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
  TrendingUp 
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

// Dynamic import voor Framer Motion - vermindert initial JS bundle
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);
const MotionSpan = dynamic(
  () => import("framer-motion").then((mod) => ({ default: (props: any) => <mod.motion.span {...props} /> })),
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

// Lightweight mobile menu animation - CSS only voor betere performance
const mobileMenuStyles = {
  closed: {
    opacity: 0,
    maxHeight: 0,
    overflow: "hidden" as const,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  open: { 
    opacity: 1,
    maxHeight: 600,
    overflow: "hidden" as const,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg" role="navigation" aria-label="Hoofdnavigatie">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity"
            aria-label="QuotApp.nl - Terug naar home"
          >
            <MotionDiv
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center justify-center"
            >
              <Calculator className="w-6 h-6" aria-hidden="true" />
            </MotionDiv>
            <span>QuotApp.nl</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">Home</span>
            </Link>
            
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-sm"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button - CSS animation voor betere FID */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className={`inline-block w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu - CSS transitions voor betere performance */}
        <div 
          id="mobile-menu"
          className={`lg:hidden border-t border-primary-foreground/10 transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="py-4 space-y-1">
            <div>
              <Link 
                href="/" 
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                <span>Home</span>
              </Link>
            </div>
            
            {tools.map((tool) => (
              <div key={tool.name}>
                <Link
                  href={tool.href}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <tool.icon className="w-5 h-5" aria-hidden="true" />
                  <div>
                    <span className="font-medium">{tool.name}</span>
                    <p className="text-xs text-primary-foreground/70">{tool.description}</p>
                  </div>
                </Link>
              </div>
            ))}
            
            <div className="px-4 pt-4 border-t border-primary-foreground/10 mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
