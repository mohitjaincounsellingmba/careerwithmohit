'use client';

import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-448JRKP87B';
const ADS_ID = 'AW-18052249575';

export function DeferredAnalytics() {
  useEffect(() => {
    // Stub gtag immediately so events queued before load don't fail
    if (typeof window !== 'undefined') {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      if (!win.gtag) {
        win.gtag = function () {
          win.dataLayer.push(arguments);
        };
        win.gtag('js', new Date());
      }
    }

    let isLoaded = false;
    let timerId: NodeJS.Timeout;

    const loadAnalyticsScript = () => {
      if (isLoaded) return;
      isLoaded = true;
      cleanup();

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      script.onload = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('config', GA_ID, {
            send_page_view: false, // AnalyticsTracker handles pageview
          });
          (window as any).gtag('config', ADS_ID);
        }
      };
      document.head.appendChild(script);
    };

    const cleanup = () => {
      window.removeEventListener('scroll', loadAnalyticsScript);
      window.removeEventListener('touchstart', loadAnalyticsScript);
      window.removeEventListener('mousemove', loadAnalyticsScript);
      window.removeEventListener('click', loadAnalyticsScript);
      window.removeEventListener('keydown', loadAnalyticsScript);
      clearTimeout(timerId);
    };

    // Load immediately on user interaction
    window.addEventListener('scroll', loadAnalyticsScript, { passive: true, once: true });
    window.addEventListener('touchstart', loadAnalyticsScript, { passive: true, once: true });
    window.addEventListener('mousemove', loadAnalyticsScript, { passive: true, once: true });
    window.addEventListener('click', loadAnalyticsScript, { passive: true, once: true });
    window.addEventListener('keydown', loadAnalyticsScript, { passive: true, once: true });

    // Fallback: load after 3.5s idle if user hasn't interacted
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          timerId = setTimeout(loadAnalyticsScript, 3500);
        },
        { timeout: 5000 }
      );
    } else {
      timerId = setTimeout(loadAnalyticsScript, 3500);
    }

    return cleanup;
  }, []);

  return null;
}
