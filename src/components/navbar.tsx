"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const menuVariants = {
  closed: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  open: { 
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Calculator className="w-6 h-6" />
            </motion.div>
            <span>QuotApp.nl</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              <Home className="w-4 h-4" />
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
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={isOpen}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden overflow-hidden border-t border-primary-foreground/10"
            >
              <motion.div 
                className="py-4 space-y-1"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05 }
                  }
                }}
              >
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                </motion.div>
                
                {tools.map((tool, index) => (
                  <motion.div key={tool.name} variants={itemVariants}>
                    <Link
                      href={tool.href}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <tool.icon className="w-5 h-5" />
                      <div>
                        <span className="font-medium">{tool.name}</span>
                        <p className="text-xs text-primary-foreground/70">{tool.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="px-4 pt-4 border-t border-primary-foreground/10 mt-4">
                  <ThemeToggle />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
