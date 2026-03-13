"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Quote, Search, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg group-hover:shadow-violet-500/25 transition-all">
            <Quote className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            QuotApp
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Explore</span>
          </Link>
          
          <Link
            href="/create"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">Create</span>
          </Link>
          
          <Link
            href="/favorites"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden md:inline">Favorites</span>
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
