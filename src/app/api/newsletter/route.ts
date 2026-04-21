import { NextResponse } from "next/server";
import { hashValue, trackServerEvent } from "@/lib/analytics";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body?.source === "string" ? body.source.trim() : "website";
    const website = typeof body?.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
    }

    await trackServerEvent("newsletter_signup", {
      source,
      emailHash: hashValue(email),
    });

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
