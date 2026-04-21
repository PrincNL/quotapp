import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = typeof body?.tool === "string" ? body.tool.trim() : "";
    const rating = body?.rating === "positive" || body?.rating === "negative" ? body.rating : null;
    const feedback = typeof body?.feedback === "string" ? body.feedback.trim().slice(0, 1000) : "";
    const website = typeof body?.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    if (!tool || !rating) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    await trackServerEvent("tool_feedback", {
      tool,
      rating,
      feedbackLength: feedback.length,
      hasComment: feedback.length > 0,
    });

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
