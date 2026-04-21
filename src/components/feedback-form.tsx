"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, Check, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

interface FeedbackFormProps {
  toolName: string;
}

export function FeedbackForm({ toolName }: FeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<"positive" | "negative" | null>(null);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const persistLocalFallback = () => {
    const feedbacks = JSON.parse(localStorage.getItem("quotapp_feedback") || "[]");
    feedbacks.push({
      tool: toolName,
      rating,
      feedback,
      date: new Date().toISOString(),
      source: "local-fallback",
    });
    localStorage.setItem("quotapp_feedback", JSON.stringify(feedbacks));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: toolName,
          rating,
          feedback,
          website: "",
        }),
      });

      if (!response.ok) {
        throw new Error("feedback_request_failed");
      }

      await trackEvent("tool_feedback_submit", { tool: toolName, rating });
    } catch {
      persistLocalFallback();
      await trackEvent("tool_feedback_fallback", { tool: toolName, rating });
    }

    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setIsOpen(false);
      setRating(null);
      setFeedback("");
    }, 2000);
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Feedback geven
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="card p-4 w-80"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Feedback</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-green-600 py-4"
              >
                <Check className="w-5 h-5" />
                <span>Bedankt voor je feedback!</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRating("positive")}
                    className={`flex-1 py-2 rounded-lg border transition-all ${
                      rating === "positive"
                        ? "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRating("negative")}
                    className={`flex-1 py-2 rounded-lg border transition-all ${
                      rating === "negative"
                        ? "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5 mx-auto" />
                  </button>
                </div>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Waarom deze beoordeling? (optioneel)"
                  className="w-full px-3 py-2 text-sm input resize-none"
                  rows={3}
                />

                <button
                  type="submit"
                  disabled={!rating || status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
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
                      Versturen
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
