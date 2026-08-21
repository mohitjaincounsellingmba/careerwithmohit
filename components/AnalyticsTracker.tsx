"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    // Detect blog post slug from pathname
    let blogSlug = null;
    if (pathname.startsWith("/posts/")) {
      blogSlug = pathname.replace("/posts/", "").replace(/\/$/, "");
    }

    const sendPing = (type = "pageview") => {
      const payload = {
        type,
        path: pathname,
        blogSlug,
        title: typeof document !== "undefined" ? document.title : "",
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

    // Immediate pageview ping
    sendPing("pageview");

    // Heartbeat ping every 30s
    const interval = setInterval(() => {
      sendPing("heartbeat");
    }, 30000);

    return () => clearInterval(interval);
  }, [pathname]);

  // Click tracking listener for CTAs
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
        const clickPayload = {
          type: "cta_click",
          path: window.location.pathname,
          clickElement: text || id || href,
          href,
          timestamp: new Date().toISOString(),
        };

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
