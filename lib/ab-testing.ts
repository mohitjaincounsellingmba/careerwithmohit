"use client";

/**
 * A/B Testing Utility Module for CareerWithMohit Blog
 */

export interface ABTestConfig {
  id: string;
  variants: Record<string, {
    title?: string;
    description?: string;
    cta_title?: string;
    cta_description?: string;
    [key: string]: any;
  }>;
}

/**
 * Gets or assigns a sticky variant for a given experiment ID.
 * Defaults to 'A' during SSR / initial render to ensure hydration matching.
 */
export function getAssignedVariant(experimentId: string, availableVariants: string[] = ["A", "B"]): string {
  if (typeof window === "undefined" || !experimentId) {
    return availableVariants[0] || "A";
  }

  const storageKey = `cwm_ab_${experimentId}`;
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing && availableVariants.includes(existing)) {
      return existing;
    }

    // Pick a random variant deterministically split
    const randomIndex = Math.floor(Math.random() * availableVariants.length);
    const chosenVariant = availableVariants[randomIndex] || "A";
    localStorage.setItem(storageKey, chosenVariant);
    return chosenVariant;
  } catch (err) {
    return availableVariants[0] || "A";
  }
}

/**
 * Records exposure event to GA4 and Cloudflare Telemetry
 */
export function recordABExposure(experimentId: string, variant: string, slug: string) {
  if (typeof window === "undefined" || !experimentId) return;

  const sessionKey = `cwm_ab_exposed_${experimentId}_${variant}`;
  try {
    // Avoid spamming exposure events in the same browser session
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");
  } catch (e) {}

  // 1. Send to GA4
  if ((window as any).gtag) {
    try {
      (window as any).gtag("event", "ab_test_exposure", {
        experiment_id: experimentId,
        variant_id: variant,
        page_slug: slug,
      });
    } catch (err) {}
  }

  // 2. Send to Cloudflare edge analytics endpoint
  try {
    let sessionId = "";
    try { sessionId = localStorage.getItem("cwm_visitor_session_id") || ""; } catch (e) {}

    const payload = {
      sessionId,
      type: "ab_exposure",
      experimentId,
      variant,
      blogSlug: slug,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
    };

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (err) {}
}
