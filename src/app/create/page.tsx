"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Share2, RefreshCw, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const gradients = [
  { name: "Sunset", value: "from-orange-500 via-pink-500 to-purple-500" },
  { name: "Ocean", value: "from-blue-500 via-cyan-500 to-teal-500" },
  { name: "Forest", value: "from-green-500 via-emerald-500 to-teal-500" },
  { name: "Berry", value: "from-purple-500 via-pink-500 to-rose-500" },
  { name: "Midnight", value: "from-slate-900 via-purple-900 to-slate-900" },
  { name: "Gold", value: "from-yellow-400 via-orange-500 to-red-500" },
];

const fonts = [
  { name: "Modern", value: "font-sans" },
  { name: "Serif", value: "font-serif" },
  { name: "Mono", value: "font-mono" },
];

export default function CreatePage() {
  const [text, setText] = useState("The best way to predict the future is to create it.");
  const [author, setAuthor] = useState("Peter Drucker");
  const [gradient, setGradient] = useState(gradients[0].value);
  const [font, setFont] = useState(fonts[0].value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!previewRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 3,
      });
      
      const link = document.createElement("a");
      link.download = `quotapp-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Quote",
          text: `"${text}" — ${author}`,
        });
      } catch (error) {
        console.log("Share canceled");
      }
    }
  };

  const randomize = () => {
    const randomQuotes = [
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
      { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
      { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
      { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
      { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    ];
    
    const random = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    setText(random.text);
    setAuthor(random.author);
    setGradient(gradients[Math.floor(Math.random() * gradients.length)].value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Create Quote Image</h1>
        <p className="text-muted-foreground">
          Design beautiful quote images to share on social media
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Quote Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Enter your quote..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter author name..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Background Style</label>
            <div className="grid grid-cols-3 gap-2">
              {gradients.map((g) => (
                <button
                  key={g.name}
                  onClick={() => setGradient(g.value)}
                  className={`h-12 rounded-lg bg-gradient-to-r ${g.value} transition-all ${
                    gradient === g.value ? "ring-2 ring-primary ring-offset-2" : "hover:scale-105"
                  }`}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Font Style</label>
            <div className="flex gap-2">
              {fonts.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setFont(f.value)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                    font === f.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  <span className={f.value}>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Image
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            
            <Button
              variant="ghost"
              onClick={randomize}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center justify-center">
          <div
            ref={previewRef}
            className={`w-full aspect-square max-w-md rounded-2xl bg-gradient-to-br ${gradient} p-8 flex flex-col justify-center items-center text-center text-white shadow-2xl`}
          >
            <div className={`text-2xl md:text-3xl font-bold leading-relaxed mb-6 ${font}`}>
              "{text}"
            </div>
            <div className="text-lg opacity-90">
              — {author}
            </div>
            
            <div className="mt-8 text-sm opacity-60">
              quotapp.nl
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
