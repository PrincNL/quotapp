import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const params = typeof body?.params === "object" && body?.params ? body.params : {};

    if (!name) {
      return NextResponse.json({ ok: false, error: "Missing event name" }, { status: 400 });
    }

    await trackServerEvent(name, params as Record<string, unknown>);
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
