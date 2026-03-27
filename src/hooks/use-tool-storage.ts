"use client";

import { useState, useEffect } from "react";

export interface ToolUsage {
  tool: string;
  timestamp: number;
  count: number;
}

const STORAGE_KEY = "quotapp_recent_tools";
const FAVORITES_KEY = "quotapp_favorites";

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<ToolUsage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentTools(parsed);
      } catch {
        setRecentTools([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const recordToolUsage = (toolName: string) => {
    setRecentTools((prev) => {
      const existing = prev.find((t) => t.tool === toolName);
      let updated: ToolUsage[];
      
      if (existing) {
        updated = [
          { ...existing, timestamp: Date.now(), count: existing.count + 1 },
          ...prev.filter((t) => t.tool !== toolName),
        ];
      } else {
        updated = [
          { tool: toolName, timestamp: Date.now(), count: 1 },
          ...prev.slice(0, 9),
        ];
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentTools = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentTools([]);
  };

  return { recentTools, recordToolUsage, clearRecentTools, isLoaded };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      } catch {
        setFavorites([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (toolName: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(toolName)
        ? prev.filter((t) => t !== toolName)
        : [...prev, toolName];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (toolName: string) => favorites.includes(toolName);

  const clearFavorites = () => {
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites([]);
  };

  return { favorites, toggleFavorite, isFavorite, clearFavorites, isLoaded };
}
