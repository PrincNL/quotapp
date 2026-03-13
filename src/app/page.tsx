import { prisma } from "@/lib/db";
import { QuoteCard } from "@/components/quote-card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

async function getDailyQuote() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let dailyQuote = await prisma.quote.findFirst({
      where: {
        isDaily: true,
        dailyDate: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });
    
    if (!dailyQuote) {
      const quotes = await prisma.quote.findMany();
      if (quotes.length > 0) {
        dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await prisma.quote.update({
          where: { id: dailyQuote.id },
          data: { isDaily: true, dailyDate: today },
        });
      }
    }
    
    return dailyQuote;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

async function getPopularQuotes() {
  try {
    return prisma.quote.findMany({
      orderBy: { likes: "desc" },
      take: 6,
    });
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

async function seedQuotesIfEmpty() {
  try {
    const count = await prisma.quote.count();
    if (count === 0) {
      const { sampleQuotes } = await import("@/lib/data");
      await prisma.quote.createMany({
        data: sampleQuotes.map((q) => ({
          ...q,
          tags: [q.category],
        })),
      });
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  await seedQuotesIfEmpty();
  
  const dailyQuote = await getDailyQuote();
  const popularQuotes = await getPopularQuotes();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Discover Wisdom Daily
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Curated collection of inspiring quotes. Save your favorites, create beautiful images, and share wisdom with the world.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/explore">
            <Button size="lg" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Explore Quotes
            </Button>
          </Link>
          
          <Link href="/create">
            <Button size="lg" variant="outline" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Create Quote
            </Button>
          </Link>
        </div>
      </section>

      {/* Daily Quote */}
      {dailyQuote && (
        <section className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-center">Quote of the Day</h2>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>
          
          <QuoteCard
            id={dailyQuote.id}
            text={dailyQuote.text}
            author={dailyQuote.author}
            category={dailyQuote.category}
            initialLikes={dailyQuote.likes}
          />
        </section>
      )}

      {/* Popular Quotes */}
      {popularQuotes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold">Most Loved</h2>
            </div>
            
            <Link href="/explore" className="text-primary hover:underline">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                id={quote.id}
                text={quote.text}
                author={quote.author}
                category={quote.category}
                initialLikes={quote.likes}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Motivation", color: "from-orange-500 to-red-500", icon: "🔥" },
            { name: "Wisdom", color: "from-blue-500 to-cyan-500", icon: "🧠" },
            { name: "Success", color: "from-green-500 to-emerald-500", icon: "🏆" },
            { name: "Love", color: "from-pink-500 to-rose-500", icon: "❤️" },
            { name: "Happiness", color: "from-yellow-400 to-orange-500", icon: "😊" },
            { name: "Life", color: "from-violet-500 to-purple-500", icon: "🌟" },
            { name: "Humor", color: "from-teal-400 to-green-500", icon: "😄" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/explore?category=${cat.name.toLowerCase()}`}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.color} p-0.5 transition-transform hover:scale-105`}
            >
              <div className="rounded-[11px] bg-card p-6 text-center">
                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
