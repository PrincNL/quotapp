"use client";

import { motion } from "framer-motion";
import { Clock, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRecentTools, useFavorites } from "@/hooks/use-tool-storage";

const toolInfo: Record<string, { href: string; color: string; icon: string }> = {
  "BTW": { href: "/tools/btw", color: "bg-blue-500", icon: "Calculator" },
  "Hypotheek": { href: "/tools/hypotheek", color: "bg-green-500", icon: "Banknote" },
  "Procent": { href: "/tools/procent", color: "bg-purple-500", icon: "Percent" },
  "IBAN": { href: "/tools/iban", color: "bg-orange-500", icon: "Hash" },
  "Tekst": { href: "/tools/tekst", color: "bg-pink-500", icon: "Type" },
  "Valuta": { href: "/tools/valuta", color: "bg-indigo-500", icon: "TrendingUp" },
  "Datum": { href: "/tools/datum", color: "bg-teal-500", icon: "Calendar" },
  "BMI": { href: "/tools/bmi", color: "bg-red-500", icon: "Scale" },
};

export function RecentlyUsed() {
  const { recentTools, isLoaded } = useRecentTools();

  if (!isLoaded || recentTools.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Recent gebruikt</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {recentTools.slice(0, 5).map((tool) => {
          const info = toolInfo[tool.tool];
          if (!info) return null;
          
          return (
            <Link
              key={tool.tool}
              href={info.href}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <span className="text-sm font-medium">{tool.tool}</span>
              <span className="text-xs opacity-60">{tool.count}x</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export function FavoriteTools() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded || favorites.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-lg font-semibold">Favorieten</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {favorites.map((tool) => {
          const info = toolInfo[tool];
          if (!info) return null;
          
          return (
            <Link
              key={tool}
              href={info.href}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-all duration-200"
            >
              <Star className="w-3 h-3 fill-current" />
              <span className="text-sm font-medium">{tool}</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export function ToolStats() {
  const { recentTools, isLoaded } = useRecentTools();

  if (!isLoaded || recentTools.length === 0) return null;

  const totalUses = recentTools.reduce((acc, tool) => acc + tool.count, 0);
  const mostUsed = recentTools[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="grid grid-cols-2 gap-4 mb-8"
    >
      <div className="card-glass p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Totaal gebruik</span>
        </div>
        <p className="text-2xl font-bold">{totalUses}</p>
      </div>
      
      <div className="card-glass p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-muted-foreground">Meest gebruikt</span>
        </div>
        <p className="text-lg font-bold">{mostUsed?.tool || "-"}</p>
        <p className="text-xs text-muted-foreground">{mostUsed?.count}x gebruikt</p>
      </div>
    </motion.div>
  );
}
