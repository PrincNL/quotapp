"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, RefreshCw } from "lucide-react";

const quotes = [
  { text: "Rekenen is de taal waarmee het universum is geschreven.", author: "Galileo Galilei" },
  { text: "Wiskunde is de muziek van de rede.", author: "James Joseph Sylvester" },
  { text: "Goede beslissingen komen uit ervaring. Ervaring komt uit slechte beslissingen.", author: "Mark Twain" },
  { text: "Tijd is geld, maar geld koopt geen tijd.", author: "Benjamin Franklin" },
  { text: "Het beste moment om te investeren was 20 jaar geleden. Het tweede beste moment is nu.", author: "Chinese wijsheid" },
  { text: "Eenvoud is de ultieme verfijning.", author: "Leonardo da Vinci" },
  { text: "Succes is de som van kleine inspanningen, herhaald dag in dag uit.", author: "Robert Collier" },
  { text: "Meet wat meetbaar is, en maak meetbaar wat niet meetbaar is.", author: "Galileo Galilei" },
  { text: "De beste investering die je ooit kunt doen, is in jezelf.", author: "Warren Buffett" },
  { text: "Kennis is macht, maar toepassing van die kennis is winst.", author: "Roger Staubach" },
  { text: "Sparen is een gewoonte, geen bestemming.", author: "Dave Ramsey" },
  { text: "Wie niet waagt, die niet wint - maar wie slim waagt, wint meer.", author: "Nederlands spreekwoord" },
];

export function QuoteOfTheDay() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Generate a deterministic index based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setQuoteIndex(dayOfYear % quotes.length);
  }, []);

  const refreshQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsVisible(true);
    }, 300);
  };

  const currentQuote = quotes[quoteIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10 p-6 mb-8"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Quote className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-lg md:text-xl font-medium text-foreground mb-2 leading-relaxed">
                  "{currentQuote.text}"
                </blockquote>
                <cite className="text-sm text-muted-foreground not-italic">
                  — {currentQuote.author}
                </cite>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button
          onClick={refreshQuote}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-primary/10 transition-colors group"
          aria-label="Nieuwe quote"
          title="Nieuwe quote"
        >
          <RefreshCw className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </motion.div>
  );
}
