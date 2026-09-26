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
      className="absolute top-full left-0 right-0 z-50 bg-white border-t border-b border-slate-200/90 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-12 gap-5 min-h-[380px]">
          
          {/* LEFT COLUMN: Subcategories / Tabs (Shiksha style) */}
          <div className="col-span-3 border-r border-slate-200/90 pr-3 flex flex-col justify-start gap-0.5">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>{item.label} Explorer</span>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
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
                        ? "bg-blue-50 text-blue-700 font-bold shadow-xs ring-1 ring-blue-500/20"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/70 group-hover:text-blue-600"
                        }`}
                      />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive
                          ? "text-blue-600 translate-x-0.5"
                          : "text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Direct Link to Category Overview Hub */}
            <div className="mt-auto pt-3 border-t border-slate-100">
              <Link
                href={item.href}
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 flex items-center justify-between transition-colors group"
              >
                <span>Explore All {item.label} Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* MIDDLE COLUMN: Active Category Links Grid (Cities / Courses / Specializations) */}
          <div className="col-span-5 border-r border-slate-200/90 pr-5 pl-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {activeCategory.label}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-700 font-medium">
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
                      className="px-2.5 py-2 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors flex items-center justify-between gap-1.5 group text-left"
                    >
                      <span className="text-[12.5px] font-medium leading-snug group-hover:font-semibold line-clamp-1">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            link.badgeColor || "bg-blue-100/80 text-blue-800 border border-blue-200"
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
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Verified Cutoffs &amp; Placements 2026-27
              </span>
              <Link
                href="/colleges"
                onClick={onClose}
                className="font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>770+ Colleges Directory</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured Colleges & Quick Consultation Card (Shiksha Style) */}
          <div className="col-span-4 pl-1 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                <span className="text-xs font-bold text-slate-900 tracking-wider uppercase flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Featured Institutes
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 font-bold px-1.5 py-0.5 rounded">
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
                    className="p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all shadow-2xs hover:shadow-xs group flex flex-col gap-1 text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                        {col.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                          col.badgeColor || "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {col.badge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-slate-700">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        <span className="truncate">{col.location}</span>
                      </span>
                      {col.packageInfo && (
                        <span className="text-blue-700 font-bold shrink-0 ml-1">
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
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-md relative overflow-hidden flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
                      {item.promoBanner.badge || "Free 1-on-1"}
                    </span>
                    <span className="text-[11px] font-bold text-white truncate">
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
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-700 font-bold text-[11px] shrink-0 transition-colors shadow-xs whitespace-nowrap flex items-center gap-1"
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
