"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Target,
  Sparkles,
  Calculator,
  Video,
  Laptop,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Award
} from "lucide-react";

export function PortalQuickTools() {
  const tools = [
    {
      id: "colleges",
      title: "770+ Colleges Directory",
      badge: "Verified 2027",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Building2,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      description: "Search MBA, PGDM, B.Tech & BBA colleges across India. Compare fees, verified 2025-26 placement audits, and cutoff percentiles.",
      features: ["NIRF & Placement Audits", "Delhi NCR, Pune & Bangalore Hubs", "Budget & Cutoff Filters"],
      cta: "Explore 770+ Colleges",
      href: "/colleges",
      highlight: false,
      accentBorder: "hover:border-blue-400",
    },
    {
      id: "mocks",
      title: "Free Full CBT Mock Tests",
      badge: "50+ Tests Live",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: Target,
      iconColor: "text-rose-600 bg-rose-50 border-rose-200",
      description: "Practice simulated computer-based tests for CAT, XAT, NMAT, SNAP, MAT & GMAT with real timers and instant scorecards.",
      features: ["Live Countdown Timers", "Sectional +3/-1 Scoring", "Instant Percentile Prediction"],
      cta: "Start Free Practice",
      href: "/mock-tests",
      highlight: true,
      accentBorder: "hover:border-rose-400",
    },
    {
      id: "discounts",
      title: "MBA Form Combo Discounts",
      badge: "Save ₹5,000+",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold animate-pulse",
      icon: Percent,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      description: "Build custom application bundles for 55+ top AICTE/UGC approved business schools and slash your application fee costs.",
      features: ["55+ Top B-Schools Covered", "Instant Voucher Application", "Direct Institutional Verification"],
      cta: "Calculate Savings",
      href: "/mba-application-form-discount",
      highlight: false,
      accentBorder: "hover:border-emerald-400",
    },
    {
      id: "calculators",
      title: "Entrance Score Calculators",
      badge: "AI Powered",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Calculator,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
      description: "Convert raw test responses into normalized percentile bands and calculate your realistic chances at Tier-1 & Tier-2 colleges.",
      features: ["CAT Score to %ile Matrix", "Sept MAT Checker & Composite", "JEE Main & MHCET Predictors"],
      cta: "Predict Percentile",
      href: "/tools/cat-score-calculator",
      highlight: false,
      accentBorder: "hover:border-amber-400",
    },
    {
      id: "mentorship",
      title: "1-on-1 Video Counselling",
      badge: "Google Meet",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      icon: Video,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
      description: "Schedule a free 30-minute face-to-face video consultation directly with Mohit Jain (certified by IIM Bangalore & FMS Delhi).",
      features: ["Profile Strength Audit", "Personalized B-School Shortlist", "GD-PI & Direct Admissions Strategy"],
      cta: "Book Free Slot",
      href: "/book-session",
      highlight: false,
      accentBorder: "hover:border-indigo-400",
    },
    {
      id: "online",
      title: "UGC Online Degree Hub",
      badge: "40+ Universities",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      icon: Laptop,
      iconColor: "text-cyan-600 bg-cyan-50 border-cyan-200",
      description: "Compare 100% legal UGC-DEB entitled online MBA, MCA, BBA and Data Science degrees with NAAC A++ accreditations.",
      features: ["UPSC & Govt Job Equivalent", "WES Approved for Canada/USA", "EMI from ₹3,500/Month"],
      cta: "Compare Degrees",
      href: "/online-degree-certification",
      highlight: false,
      accentBorder: "hover:border-cyan-400",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-6 sm:px-12 border-b border-slate-200 content-auto">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 gap-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Integrated Educational Ecosystem
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Everything You Need for <span className="text-blue-600">Admissions 2027</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
              Powerful discovery tools, verified intelligence, free CBT practice simulators, and personalized expert mentoring in one unified portal.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group self-start md:self-auto"
          >
            <span>View All 20+ Free Tools</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className={`group relative rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between ${tool.accentBorder}`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform ${tool.iconColor}`}>
                      <Icon className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wide ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm font-normal text-slate-600 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                    {tool.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <Link
                  href={tool.href}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-blue-500/20"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
