"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const persistLocalFallback = (value: string) => {
    const subscribers = JSON.parse(localStorage.getItem("quotapp_newsletter") || "[]");
    subscribers.push({ email: value, date: new Date().toISOString(), source: "local-fallback" });
    localStorage.setItem("quotapp_newsletter", JSON.stringify(subscribers));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes("@")) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, source: "homepage_newsletter", website: "" }),
      });

      if (!response.ok) {
        throw new Error("newsletter_request_failed");
      }

      await trackEvent("newsletter_signup_success", { placement: "homepage" });
    } catch {
      persistLocalFallback(normalizedEmail);
      await trackEvent("newsletter_signup_fallback", { placement: "homepage" });
    }

    setStatus("success");
    setEmail("");

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 p-6 md:p-8"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Handige tips in je inbox</h3>
            <p className="text-sm text-muted-foreground">Gratis rekentips en nieuwe tools</p>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-3 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl"
            >
              <Check className="w-5 h-5" />
              <span>Bedankt voor je inschrijving!</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                className="flex-1 px-4 py-3 rounded-xl input"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Inschrijven
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        
        <p className="text-xs text-muted-foreground mt-3">
          We sturen maximaal 1x per week een e-mail. Je kunt je altijd uitschrijven.
        </p>
      </div>
    </motion.div>
  );
}
