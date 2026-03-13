"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, Menu, X, Percent, Home, Hash, Type, Calendar, Scale, Banknote } from "lucide-react";

const tools = [
  { name: "BTW Calculator", href: "/tools/btw", icon: Calculator },
  { name: "Hypotheek", href: "/tools/hypotheek", icon: Banknote },
  { name: "Procent", href: "/tools/procent", icon: Percent },
  { name: "IBAN Check", href: "/tools/iban", icon: Hash },
  { name: "Tekst Tools", href: "/tools/tekst", icon: Type },
  { name: "Valuta", href: "/tools/valuta", icon: Banknote },
  { name: "Datum", href: "/tools/datum", icon: Calendar },
  { name: "BMI", href: "/tools/bmi", icon: Scale },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Calculator className="w-6 h-6" />
            QuotApp.nl
          </Link>

          <!-- Desktop Menu -->
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-200 transition">
              <Home className="w-5 h-5" />
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="hover:text-blue-200 transition text-sm"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          <!-- Mobile Menu Button -->
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <!-- Mobile Menu -->
        {isOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <Link href="/" className="block py-2 hover:text-blue-200" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
