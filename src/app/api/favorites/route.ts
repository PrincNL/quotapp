import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Simple session-based user ID from cookie or header
function getUserId(request: Request): string {
  // In production, this should use proper auth
  // For now, use a simple cookie-based approach
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
      select: { quoteId: true },
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

export async function POST(request: Request) {
  try {
    const userId = getUserId(request);
    const { quoteId } = await request.json();

    await prisma.favorite.create({
      data: { quoteId, userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = getUserId(request);
    const { quoteId } = await request.json();

    await prisma.favorite.deleteMany({
      where: { quoteId, userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
