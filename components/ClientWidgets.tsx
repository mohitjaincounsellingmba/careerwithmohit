'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const InquiryPopup = dynamic(
  () => import('@/components/InquiryPopup').then((mod) => mod.InquiryPopup),
  { ssr: false }
);

const BotInquiryPopup = dynamic(
  () => import('@/components/BotInquiryPopup').then((mod) => mod.BotInquiryPopup),
  { ssr: false }
);

export function ClientWidgets() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay loading heavy popups until after the initial critical render & interaction
    let timeoutId: NodeJS.Timeout;

    const enableWidgets = () => {
      setShouldRender(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', enableWidgets);
      window.removeEventListener('touchstart', enableWidgets);
      window.removeEventListener('click', enableWidgets);
      window.removeEventListener('keydown', enableWidgets);
      clearTimeout(timeoutId);
    };

    // Trigger on any first user interaction
    window.addEventListener('scroll', enableWidgets, { passive: true, once: true });
    window.addEventListener('touchstart', enableWidgets, { passive: true, once: true });
    window.addEventListener('click', enableWidgets, { passive: true, once: true });
    window.addEventListener('keydown', enableWidgets, { passive: true, once: true });

    // Fallback: If no interaction, load after 4 seconds of idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          timeoutId = setTimeout(enableWidgets, 3500);
        },
        { timeout: 5000 }
      );
    } else {
      timeoutId = setTimeout(enableWidgets, 4000);
    }

    return cleanup;
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <InquiryPopup />
      <BotInquiryPopup />
    </>
  );
}
