import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quote = await prisma.quote.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ success: true, likes: quote.likes });
  } catch (error) {
    console.error("Failed to like quote:", error);
    return NextResponse.json(
      { error: "Failed to like quote" },
      { status: 500 }
    );
  }
}
