import { createHash } from "node:crypto";

export type AnalyticsPayload = Record<string, unknown>;

export function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function trackServerEvent(event: string, payload: AnalyticsPayload = {}) {
  try {
    console.info("[analytics]", JSON.stringify({
      event,
      payload,
      at: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("[analytics:error]", error);
  }
}
