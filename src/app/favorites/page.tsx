"use client";

import { useState, useEffect } from "react";
import { QuoteCard } from "@/components/quote-card";
import { Heart, Loader2 } from "lucide-react";

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  likes: number;
}

interface Favorite {
  quoteId: string;
  quote: Quote;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites/detailed");
      const data = await res.json();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (quoteId: string) => {
    try {
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId }),
      });
      
      setFavorites((prev) => prev.filter((f) => f.quoteId !== quoteId));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-4xl font-bold">Your Favorites</h1>
        </div>
        <p className="text-muted-foreground">
          Your personal collection of inspiring quotes
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map(({ quote }) => (
            <QuoteCard
              key={quote.id}
              id={quote.id}
              text={quote.text}
              author={quote.author}
              category={quote.category}
              initialLikes={quote.likes}
              isFavorite={true}
              onFavoriteToggle={() => removeFavorite(quote.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground">
            Start exploring and save quotes that inspire you!
          </p>
        </div>
      )}
    </div>
  );
}
