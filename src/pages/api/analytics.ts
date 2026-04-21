import type { NextApiRequest, NextApiResponse } from "next";
import { trackServerEvent } from "@/lib/analytics";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const params = typeof req.body?.params === "object" && req.body?.params ? req.body.params : {};

    if (!name) {
      return res.status(400).json({ ok: false, error: "Missing event name" });
    }

    await trackServerEvent(name, params as Record<string, unknown>);
    return res.status(202).json({ ok: true });
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid payload" });
  }
}
