"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link2, Check, Twitter, Facebook, Linkedin, Printer, Download } from "lucide-react";

interface ShareResultProps {
  toolName: string;
  result: string;
  url: string;
}

export function ShareResult({ toolName, result, url }: ShareResultProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `Ik heb zojuist berekend met ${toolName}: ${result}`;
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-sky-500 hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-blue-700 hover:text-white",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${fullUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
        Deel resultaat
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50 p-4"
            >
              <p className="text-sm font-medium mb-3">Deel je resultaat</p>
              
              <div className="space-y-2">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${link.color}`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
                
                <hr className="my-2 border-border" />
                
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
                  <span className="text-sm">{copied ? "Gekopieerd!" : "Kopieer link"}</span>
                </button>
                
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span className="text-sm">Printen</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
