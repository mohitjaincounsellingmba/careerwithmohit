'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, CheckCircle2, ShieldAlert, ArrowUpRight, MessageCircle } from 'lucide-react';

interface CalendlyBookingWidgetProps {
  url?: string;
  className?: string;
}

export function CalendlyBookingWidget({
  url = 'https://calendly.com/careerwithmohit-jain/30min',
  className = '',
}: CalendlyBookingWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasScriptError, setHasScriptError] = useState(false);

  // Format URL with optimal embed parameters matching site branding
  const embedUrl = `${url}?hide_landing_page_details=0&hide_gdpr_banner=1&primary_color=2563eb`;

  useEffect(() => {
    // Add Calendly CSS link if not already present
    const cssId = 'calendly-widget-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Add Calendly JS script if not already present
    const scriptId = 'calendly-widget-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const handleLoaded = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasScriptError(true);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = handleLoaded;
      script.onerror = handleError;
      document.body.appendChild(script);
    } else {
      // Script already loaded or loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Failsafe timer: dismiss loading skeleton after 3.5s in case iframe loads silently
    const failsafe = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div className={`relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden ${className}`}>
      {/* Top Session Guarantee Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">Live Calendar Open</span>
          <span className="text-blue-300 hidden sm:inline">•</span>
          <span className="text-blue-200 hidden sm:inline">Select your preferred date & time below</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            30 Mins
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-blue-400" />
            Google Meet
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            100% Free
          </span>
        </div>
      </div>

      {/* Loading Skeleton Indicator */}
      {isLoading && (
        <div className="absolute inset-x-0 top-14 bottom-0 bg-slate-50/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-10 transition-opacity duration-300">
          <div className="relative flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl border-2 border-blue-600 border-t-transparent animate-spin" />
            <Calendar className="w-6 h-6 text-blue-600 absolute" />
          </div>
          <p className="text-sm font-bold text-slate-800">Connecting to Mohit's Live Schedule...</p>
          <p className="text-xs text-slate-500 mt-1">Fetching real-time available time slots</p>
        </div>
      )}

      {/* Script blocked fallback (e.g. strict Brave shield or adblocker) */}
      {hasScriptError && (
        <div className="p-8 text-center bg-amber-50/70 border-b border-amber-200">
          <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <h4 className="font-bold text-slate-900 mb-1">Calendar script blocked by your browser</h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
            If your browser has strict tracker protection enabled, you can open Mohit's calendar directly in a new tab or reach out via WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              <span>Open Calendar on Calendly</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20book%20a%20free%201-on-1%20counselling%20session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Calendly Inline Embed Element */}
      <div 
        className="calendly-inline-widget w-full"
        data-url={embedUrl}
        style={{ minWidth: '320px', height: '720px' }}
      />

      {/* Post-embed Helper Notes */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Calendar invites with Google Meet video link will be sent to your email instantly.</span>
        </div>
        <a
          href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20urgent%20MBA%20counselling%20today"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold shrink-0 hover:underline"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Need an urgent call today? Message on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
