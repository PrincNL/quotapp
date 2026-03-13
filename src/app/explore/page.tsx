import { prisma } from "@/lib/db";
import { QuoteCard } from "@/components/quote-card";
import { Search, Filter, Loader2 } from "lucide-react";
import { categories } from "@/lib/data";
import { Suspense } from "react";

async function getQuotes(category: string, search: string) {
  const where: any = {};
  
  if (category && category !== "all") {
    where.category = category.toLowerCase();
  }
  
  if (search) {
    where.OR = [
      { text: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.quote.findMany({
    where,
    orderBy: { likes: "desc" },
    take: 50,
  });
}

async function QuotesGrid({ category, search }: { category: string; search: string }) {
  const quotes = await getQuotes(category, search);
  
  if (quotes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No quotes found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quotes.map((quote) => (
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
  );
}

export default async function ExplorePage(props: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category || "all";
  const search = searchParams.search || "";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Quotes</h1>
        <p className="text-muted-foreground">
          Browse through our collection of inspiring quotes
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 space-y-4">
        <form className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            name="search"
            placeholder="Search quotes, authors, or topics..."
            defaultValue={search}
            className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </form>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by:</span>
          
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white`
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Results */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <QuotesGrid category={category} search={search} />
      </Suspense>
    </div>
  );
}
