"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export async function trackEvent(name: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }

    if (typeof fetch !== "undefined") {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, params }),
        keepalive: true,
      });
    }
  } catch {
    // Never block UX on analytics failures
  }
}
