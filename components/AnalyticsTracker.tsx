"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    // Get or create persistent visitor session ID
    let sessionId = "";
    try {
      sessionId = localStorage.getItem("cwm_visitor_session_id") || "";
      if (!sessionId) {
        sessionId = "s_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem("cwm_visitor_session_id", sessionId);
      }
    } catch (e) {
      sessionId = "s_" + Math.random().toString(36).substring(2);
    }

    // Detect blog post slug from pathname
    let blogSlug = null;
    if (pathname.startsWith("/posts/")) {
      blogSlug = pathname.replace("/posts/", "").replace(/\/$/, "");
    }

    const title = typeof document !== "undefined" ? document.title : "";

    // 1. Sync with Google Analytics (GA4 Tag G-448JRKP87B)
    if (typeof window !== "undefined" && (window as any).gtag) {
      try {
        (window as any).gtag("event", "page_view", {
          page_path: pathname,
          page_title: title,
          send_to: "G-448JRKP87B",
        });
      } catch (err) {}
    }

    // 2. Ping Cloudflare Admin Live Telemetry Endpoint
    const sendPing = (type = "pageview") => {
      const payload = {
        sessionId,
        type,
        path: pathname,
        blogSlug,
        title,
        timestamp: new Date().toISOString(),
      };

      try {
        if (typeof navigator !== "undefined" && navigator.sendBeacon && type === "pageview") {
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
      } catch (e) {}
    };

    sendPing("pageview");

    // Send heartbeat every 20 seconds while user is active on the page
    const interval = setInterval(() => {
      sendPing("heartbeat");
    }, 20000);

    return () => clearInterval(interval);
  }, [pathname]);

  // Track CTA clicks (Book Counselling, Inquiry Popup, Calculator, WhatsApp Chat)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button']");
      if (!clickable) return;

      const text = clickable.textContent?.trim().slice(0, 50) || "";
      const href = (clickable as HTMLAnchorElement).href || "";
      const id = clickable.id || "";

      const isCta = /apply|book|counselling|whatsapp|inquiry|call|download|calculate|start/i.test(text + " " + href + " " + id);

      if (isCta) {
        let sessionId = "";
        try { sessionId = localStorage.getItem("cwm_visitor_session_id") || ""; } catch (err) {}

        const clickPayload = {
          sessionId,
          type: "cta_click",
          path: window.location.pathname,
          clickElement: text || id || href,
          href,
          timestamp: new Date().toISOString(),
        };

        // GA4 CTA Event Trigger
        if (typeof window !== "undefined" && (window as any).gtag) {
          try {
            (window as any).gtag("event", "cta_click", {
              event_category: "Engagement",
              event_label: text || href,
              value: 1,
            });
          } catch (err) {}
        }

        try {
          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(clickPayload)], { type: "application/json" });
            navigator.sendBeacon("/api/track", blob);
          } else {
            fetch("/api/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(clickPayload),
              keepalive: true,
            }).catch(() => {});
          }
        } catch (err) {}
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);

  return null;
}
