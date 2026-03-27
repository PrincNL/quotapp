"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Bookmark } from "lucide-react";
import { useFavorites } from "@/hooks/use-tool-storage";

interface FavoriteButtonProps {
  toolName: string;
  variant?: "default" | "icon" | "pill";
}

export function FavoriteButton({ toolName, variant = "default" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isLoaded) return null;

  const favorite = isFavorite(toolName);

  const handleClick = () => {
    toggleFavorite(toolName);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500);
  };

  if (variant === "icon") {
    return (
      <div className="relative">
        <button
          onClick={handleClick}
          className={`p-2 rounded-lg transition-all duration-200 ${
            favorite
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-muted-foreground hover:text-yellow-500"
          }`}
          aria-label={favorite ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
          title={favorite ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
        >
          <motion.div
            animate={favorite ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Star className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-xs rounded-full whitespace-nowrap"
            >
              {favorite ? "Toegevoegd!" : "Verwijderd"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
          favorite
            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        <Star className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
        <span className="text-sm font-medium">
          {favorite ? "Favoriet" : "Toevoegen"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        favorite
          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      <Star className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
      <span className="text-sm font-medium">
        {favorite ? "In favorieten" : "Toevoegen aan favorieten"}
      </span>
    </button>
  );
}
