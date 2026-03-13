import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

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

    const quotes = await prisma.quote.findMany({
      where,
      orderBy: { likes: "desc" },
      take: 50,
    });

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
