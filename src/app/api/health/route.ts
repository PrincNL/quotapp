import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "quotapp",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV ?? "development",
      commit:
        process.env.SOURCE_COMMIT ??
        process.env.COOLIFY_BRANCH ??
        process.env.VERCEL_GIT_COMMIT_SHA ??
        null,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
