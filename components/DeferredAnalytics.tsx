'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-448JRKP87B';
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18052249575';

export function DeferredAnalytics() {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const enableAnalytics = () => {
      setLoadAnalytics(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', enableAnalytics);
      window.removeEventListener('touchstart', enableAnalytics);
      window.removeEventListener('click', enableAnalytics);
      window.removeEventListener('keydown', enableAnalytics);
      clearTimeout(timeoutId);
    };

    // Load immediately on first interaction
    window.addEventListener('scroll', enableAnalytics, { passive: true, once: true });
    window.addEventListener('touchstart', enableAnalytics, { passive: true, once: true });
    window.addEventListener('click', enableAnalytics, { passive: true, once: true });
    window.addEventListener('keydown', enableAnalytics, { passive: true, once: true });

    // Fallback: If no interaction, load during idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          timeoutId = setTimeout(enableAnalytics, 3500);
        },
        { timeout: 5000 }
      );
    } else {
      timeoutId = setTimeout(enableAnalytics, 4000);
    }

    return cleanup;
  }, []);

  if (!loadAnalytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_location: window.location.href,
              page_path: window.location.pathname,
              page_title: document.title
            });
            gtag('config', '${ADS_ID}');
          `,
        }}
      />
    </>
  );
}

