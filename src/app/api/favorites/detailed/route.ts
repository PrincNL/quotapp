import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function getUserId(request: Request): string {
  const cookie = request.headers.get("cookie");
  if (cookie) {
    const match = cookie.match(/userId=([^;]+)/);
    if (match) return match[1];
  }
  return "anonymous";
}

export async function GET(request: Request) {
  try {
    const userId = getUserId(request);
    
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { quote: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}
