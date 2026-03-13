"use client";

import { useState, useRef } from "react";
import { Quote, Heart, Share2, Download, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface QuoteCardProps {
  id: string;
  text: string;
  author: string;
  category: string;
  initialLikes?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  showActions?: boolean;
}

const gradients = [
  "from-violet-500 via-purple-500 to-fuchsia-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-pink-500 via-rose-500 to-red-500",
  "from-emerald-500 via-green-500 to-lime-500",
  "from-indigo-500 via-purple-500 to-pink-500",
];

export function QuoteCard({
  id,
  text,
  author,
  category,
  initialLikes = 0,
  isFavorite = false,
  onFavoriteToggle,
  showActions = true,
}: QuoteCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const gradient = gradients[id.charCodeAt(0) % gradients.length];

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);
    
    try {
      await fetch(`/api/quotes/${id}/like`, { method: "POST" });
    } catch (error) {
      console.error("Failed to like quote:", error);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`"${text}" — ${author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QuotApp - Inspiring Quote",
          text: `"${text}" — ${author}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share canceled");
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = `quotapp-${author.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-1`}
      >
        <div className="relative rounded-xl bg-card/95 backdrop-blur-sm p-6 md:p-8">
          <div className="absolute top-4 right-4 opacity-10">
            <Quote className="w-24 h-24" />
          </div>
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary capitalize">
              {category}
            </span>
            
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-foreground">
              "{text}"
            </blockquote>
            
            <cite className="block text-sm text-muted-foreground not-italic">
              — {author}
            </cite>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              {likes}
            </button>
            
            <button
              onClick={onFavoriteToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isFavorite
                  ? "bg-yellow-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-all"
              title="Copy text"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-all disabled:opacity-50"
              title="Download as image"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
