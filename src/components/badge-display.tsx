"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Target, Zap, Star, Trophy, Flame } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  condition: (stats: UserStats) => boolean;
}

interface UserStats {
  totalUses: number;
  uniqueTools: number;
  streak: number;
  favorites: number;
}

const badges: Badge[] = [
  {
    id: "first_use",
    name: "Eerste Stap",
    description: "Gebruik je eerste tool",
    icon: Zap,
    color: "text-yellow-500",
    condition: (stats) => stats.totalUses >= 1,
  },
  {
    id: "explorer",
    name: "Ontdekker",
    description: "Gebruik 3 verschillende tools",
    icon: Target,
    color: "text-blue-500",
    condition: (stats) => stats.uniqueTools >= 3,
  },
  {
    id: "power_user",
    name: "Power User",
    description: "Gebruik tools 10 keer",
    icon: Trophy,
    color: "text-purple-500",
    condition: (stats) => stats.totalUses >= 10,
  },
  {
    id: "master",
    name: "Meester",
    description: "Gebruik alle tools",
    icon: Award,
    color: "text-red-500",
    condition: (stats) => stats.uniqueTools >= 8,
  },
  {
    id: "collector",
    name: "Verzamelaar",
    description: "Sla 3 favorieten op",
    icon: Star,
    color: "text-pink-500",
    condition: (stats) => stats.favorites >= 3,
  },
  {
    id: "streak",
    name: "Doorzetter",
    description: "Gebruik tools 3 dagen achter elkaar",
    icon: Flame,
    color: "text-orange-500",
    condition: (stats) => stats.streak >= 3,
  },
];

export function BadgeDisplay() {
  const [stats, setStats] = useState<UserStats>({
    totalUses: 0,
    uniqueTools: 0,
    streak: 0,
    favorites: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const recentTools = JSON.parse(localStorage.getItem("quotapp_recent_tools") || "[]");
    const favorites = JSON.parse(localStorage.getItem("quotapp_favorites") || "[]");

    const totalUses = recentTools.reduce((acc: number, t: any) => acc + t.count, 0);
    const uniqueTools = new Set(recentTools.map((t: any) => t.tool)).size;

    setStats({
      totalUses,
      uniqueTools,
      streak: 0, // Would need daily tracking
      favorites: favorites.length,
    });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const unlockedBadges = badges.filter((badge) => badge.condition(stats));
  const lockedBadges = badges.filter((badge) => !badge.condition(stats));

  if (unlockedBadges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Jouw Badges</h2>
        <span className="text-sm text-muted-foreground">
          ({unlockedBadges.length}/{badges.length})
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {unlockedBadges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-3 bg-primary/5 rounded-xl border border-primary/20"
          >
            <div className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-2`}>
              <badge.icon className={`w-5 h-5 ${badge.color}`} />
            </div>
            <span className="text-xs font-medium text-center">{badge.name}</span>
          </motion.div>
        ))}

        {lockedBadges.slice(0, 6 - unlockedBadges.length).map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center p-3 bg-muted rounded-xl opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
              <badge.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-center text-muted-foreground">???</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
