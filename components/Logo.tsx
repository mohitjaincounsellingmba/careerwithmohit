"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "header" | "footer" | "standalone" | "minimal" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showBadge?: boolean;
  asLink?: boolean;
  className?: string;
  badgeText?: string;
}

export function Logo({
  variant = "header",
  size = "md",
  showTagline = false,
  showBadge = false,
  asLink = true,
  className = "",
  badgeText = "2027",
}: LogoProps) {
  const isDark = variant === "footer";

  // Size mappings
  const sizeStyles = {
    sm: {
      icon: "w-7 h-7",
      text: "text-lg",
      withBadge: "text-[9px] px-1 py-0.2",
      tagline: "text-[9px]",
      gap: "gap-2",
    },
    md: {
      icon: "w-9 h-9 sm:w-10 sm:h-10",
      text: "text-xl sm:text-2xl",
      withBadge: "text-[10px] px-1.5 py-0.5",
      tagline: "text-[10px] sm:text-xs",
      gap: "gap-2.5 sm:gap-3",
    },
    lg: {
      icon: "w-11 h-11 sm:w-12 sm:h-12",
      text: "text-2xl sm:text-3xl",
      withBadge: "text-[11px] px-2 py-0.5",
      tagline: "text-xs sm:text-sm",
      gap: "gap-3 sm:gap-3.5",
    },
    xl: {
      icon: "w-14 h-14 sm:w-16 sm:h-16",
      text: "text-3xl sm:text-4xl",
      withBadge: "text-xs px-2.5 py-1",
      tagline: "text-sm sm:text-base",
      gap: "gap-4",
    },
  }[size];

  const content = (
    <div
      className={`group flex items-center ${sizeStyles.gap} select-none transition-all duration-300 ${className}`}
      aria-label="CareerWithMohit Logo"
    >
      {/* Modern Stylized Brand Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${
          sizeStyles.icon
        } ${
          isDark
            ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-blue-400/30"
            : "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md border border-blue-500/20"
        }`}
      >
        {/* Subtle inner gloss highlight */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/10 to-white/25 pointer-events-none" />

        {/* Vector Logomark: Stylized Graduation Cap + Upward Career Compass Arrow */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 transition-transform duration-300 group-hover:rotate-[-4deg]"
        >
          {/* Background Spark / Glow */}
          <path
            d="M20 3L22.2 13.8L33 16L22.2 18.2L20 29L17.8 18.2L7 16L17.8 13.8L20 3Z"
            fill="white"
            fillOpacity="0.18"
          />
          {/* Cap Diamond Top */}
          <path
            d="M20 8L34 15L20 22L6 15L20 8Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Cap Base Arch */}
          <path
            d="M12 18.5V25.5C12 28 15.5 30 20 30C24.5 30 28 28 28 25.5V18.5"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Upward Career Growth Arrow */}
          <path
            d="M20 26V14M20 14L16 18M20 14L24 18"
            stroke="#FDE047"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tassel Dot & Cord */}
          <circle cx="33" cy="18" r="1.5" fill="#FDE047" />
          <path
            d="M27 15.5L33 18"
            stroke="#FDE047"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Live Active Pulse Dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
        </span>
      </div>

      {/* Typographic Wordmark & Branding */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight leading-none">
          {/* "Career" */}
          <span
            className={`font-black font-display tracking-tight transition-colors ${
              sizeStyles.text
            } ${
              isDark
                ? "text-white group-hover:text-blue-100"
                : "text-slate-900 group-hover:text-slate-800"
            }`}
          >
            Career
          </span>

          {/* "With" - Modern Stylized Connector Badge */}
          <span
            className={`inline-flex items-center justify-center font-extrabold uppercase rounded font-display mx-1 sm:mx-1.5 transition-transform duration-300 group-hover:scale-105 ${
              sizeStyles.withBadge
            } ${
              isDark
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-blue-300/30"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
            }`}
            style={{ letterSpacing: "0.08em" }}
          >
            With
          </span>

          {/* "Mohit" - Gradient & Accent Typography */}
          <span
            className={`font-black font-display tracking-tight transition-all duration-300 ${
              sizeStyles.text
            } ${
              isDark
                ? "bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent group-hover:from-sky-300 group-hover:to-white"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-800"
            }`}
          >
            Mohit
          </span>

          {/* Optional Badge */}
          {showBadge && (
            <span
              className={`ml-2 hidden sm:inline-flex items-center font-bold px-1.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider ${
                isDark
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Subtitle / Tagline */}
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`font-bold tracking-[0.18em] uppercase ${sizeStyles.tagline} ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Admissions & 10x Career Hub
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        prefetch={false}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
        title="CareerWithMohit — Admissions & Career Counselling"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
