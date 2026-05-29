'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: string;
  className?: string;
}

export function AdUnit({
  slot,
  style = { display: 'block' },
  format = 'auto',
  responsive = 'true',
  className = '',
}: AdUnitProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isDev = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isDev) return;

    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('Error loading Google AdSense:', err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [mounted, pathname, isDev]);

  if (!mounted) {
    // Prevent layout shift during SSR hydration
    return (
      <div 
        className={`w-full my-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl ${className}`} 
        style={{ ...style, minHeight: '120px' }} 
      />
    );
  }

  // Development Mock View
  if (isDev) {
    return (
      <div 
        className={`w-full my-8 p-6 bg-slate-50 border-4 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
        style={{ ...style, minHeight: '120px' }}
      >
        <span className="bg-primary text-white text-xs font-black uppercase px-3 py-1 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] tracking-widest mb-2">
          AdSense Placeholder (Dev Mode)
        </span>
        <p className="text-sm font-bold text-gray-500">
          Ad Slot ID: <span className="font-mono text-primary">{slot || 'Not Configured'}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          This placeholder is shown locally. In production, a live AdSense display ad will load here.
        </p>
      </div>
    );
  }

  // Production Google AdSense Element
  return (
    <div className={`w-full my-8 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4699585931687069"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
