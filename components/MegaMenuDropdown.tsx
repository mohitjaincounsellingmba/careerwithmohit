"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Award,
  MapPin,
  BookOpen,
  Layers,
  Target,
  Scale,
  MessageSquare,
  Calculator,
  Compass,
  Video,
  Cpu,
  Laptop,
  ShieldCheck,
  Globe,
  GraduationCap,
  CheckCircle2,
  Building2,
  Zap,
} from "lucide-react";
import { MegaMenuItem } from "@/data/megaMenuData";

// Icon mapping helper
const ICON_MAP: Record<string, any> = {
  Award,
  MapPin,
  BookOpen,
  Layers,
  Target,
  Scale,
  MessageSquare,
  Calculator,
  Compass,
  Video,
  Cpu,
  Laptop,
  ShieldCheck,
  Globe,
  GraduationCap,
  CheckCircle2,
};

interface MegaMenuDropdownProps {
  item: MegaMenuItem;
  onClose: () => void;
}

export function MegaMenuDropdown({ item, onClose }: MegaMenuDropdownProps) {
  // Default to the first category (usually "Top Ranked Colleges")
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    item.categories[0]?.id || ""
  );

  const activeCategory =
    item.categories.find((c) => c.id === activeCategoryId) || item.categories[0];

  return (
    <div 
      className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-[#0c1322] border-t border-b border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150 transition-colors duration-200"
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-12 gap-5 min-h-[380px]">
          
          {/* LEFT COLUMN: Subcategories / Tabs (Shiksha style) */}
          <div className="col-span-3 border-r border-slate-200/80 dark:border-slate-800/80 pr-3 flex flex-col justify-start gap-0.5">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>{item.label} Explorer</span>
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/50 dark:border-blue-800/40">
                2027 Admissions
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              {item.categories.map((cat) => {
                const isActive = cat.id === activeCategory.id;
                const Icon = cat.iconName && ICON_MAP[cat.iconName] ? ICON_MAP[cat.iconName] : Sparkles;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onMouseEnter={() => setActiveCategoryId(cat.id)}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? "bg-blue-50/90 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs ring-1 ring-blue-500/10 dark:ring-blue-500/20"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 group-hover:text-blue-500"
                        }`}
                      />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400 translate-x-0.5"
                          : "text-slate-300 dark:text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Direct Link to Category Overview Hub */}
            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={item.href}
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center justify-between transition-colors group"
              >
                <span>Explore All {item.label} Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* MIDDLE COLUMN: Active Category Links Grid (Cities / Courses / Specializations) */}
          <div className="col-span-5 border-r border-slate-200/80 dark:border-slate-800/80 pr-5 pl-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    {activeCategory.label}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-700 dark:text-slate-400 font-medium">
                  {activeCategory.links.length} Direct Options
                </span>
              </div>

              {/* 2-Column Responsive Links Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                {activeCategory.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  const linkProps = isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {};

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={onClose}
                      {...linkProps}
                      className="px-2.5 py-2 rounded-lg hover:bg-blue-50/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center justify-between gap-1.5 group text-left"
                    >
                      <span className="text-[12.5px] font-medium leading-snug group-hover:font-semibold line-clamp-1">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            link.badgeColor || "bg-blue-100/80 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Helper Sub-Footer */}
            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Verified Cutoffs &amp; Placements 2026-27
              </span>
              <Link
                href="/colleges"
                onClick={onClose}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>770+ Colleges Directory</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured Colleges & Quick Consultation Card (Shiksha Style) */}
          <div className="col-span-4 pl-1 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  Featured Institutes
                </span>
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold px-1.5 py-0.5 rounded">
                  Top Recommended
                </span>
              </div>

              {/* Featured Colleges List */}
              <div className="flex flex-col gap-2">
                {item.featuredColleges.map((col) => (
                  <Link
                    key={col.name}
                    href={col.href}
                    onClick={onClose}
                    className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-2xs hover:shadow-sm group flex flex-col gap-1 text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                        {col.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                          col.badgeColor || "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        }`}
                      >
                        {col.badge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-slate-700 dark:text-slate-400">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        <span className="truncate">{col.location}</span>
                      </span>
                      {col.packageInfo && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold shrink-0 ml-1">
                          {col.packageInfo.split("·")[0]}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Mentorship & Booking Card */}
            {item.promoBanner && (
              <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-md relative overflow-hidden flex items-center justify-between gap-3 border border-blue-500/20">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
                      {item.promoBanner.badge || "Free 1-on-1"}
                    </span>
                    <span className="text-[11px] font-bold text-slate-100 truncate">
                      {item.promoBanner.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-blue-100 line-clamp-1 leading-snug">
                    {item.promoBanner.subtitle}
                  </p>
                </div>
                <Link
                  href={item.promoBanner.ctaHref}
                  onClick={onClose}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shrink-0 transition-colors shadow-xs whitespace-nowrap flex items-center gap-1"
                >
                  <span>{item.promoBanner.ctaText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
