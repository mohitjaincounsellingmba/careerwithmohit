"use client";

import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Users, Bell, BookOpen, MessageCircle } from 'lucide-react';
import { COMMUNITY_CONFIG } from '@/data/communityLinks';

export default function StudentCommunitySection() {
  const { stats, telegram, whatsapp } = COMMUNITY_CONFIG;

  return (
    <section 
      id="student-community"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0A192F] to-slate-950 text-white px-6 py-20 sm:px-12 sm:py-24 border-t border-b border-blue-900/40"
      aria-label="Student Communities"
    >
      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Student Community Hub</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-300 font-bold">{stats.totalMembers} Aspirants</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Join the Official <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">Student Communities</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
            Connect with MBA 2027 &amp; college aspirants across India. Get daily entrance exam practice questions, verified cutoff sheets, and direct guidance from <strong className="text-white">Mohit Jain</strong>.
          </p>
        </div>

        {/* Communities Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* WHATSAPP COMMUNITY CARD */}
          <div className="relative group flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-slate-900/80 to-slate-950 p-7 sm:p-9 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/60 hover:-translate-y-1 hover:shadow-emerald-950/30">
            {/* Top Badge & Platform Icon */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                    {/* Official WhatsApp SVG icon */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      Interactive Community
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      WhatsApp Community
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{whatsapp.memberCount}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm font-normal leading-relaxed mb-6">
                {whatsapp.description}
              </p>

              {/* Highlights checklist */}
              <div className="space-y-3 pt-2 mb-8">
                {whatsapp.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <a 
                href={whatsapp.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base py-3.5 px-6 transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2.5 active:scale-98"
                aria-label="Join WhatsApp Community"
              >
                <span>{whatsapp.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={whatsapp.directCounsellorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm py-3.5 px-4 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                title="Direct question for Mohit Jain"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Ask Question</span>
              </a>
            </div>
          </div>

          {/* TELEGRAM CHANNEL CARD */}
          <div className="relative group flex flex-col justify-between rounded-3xl border border-sky-500/30 bg-gradient-to-b from-sky-950/40 via-slate-900/80 to-slate-950 p-7 sm:p-9 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-sky-400/60 hover:-translate-y-1 hover:shadow-sky-950/30">
            {/* Top Badge & Platform Icon */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
                    {/* Official Telegram SVG icon */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-sky-400">
                      Resource &amp; Alerts Hub
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      Telegram Channel
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>{telegram.memberCount}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm font-normal leading-relaxed mb-6">
                {telegram.description}
              </p>

              {/* Highlights checklist */}
              <div className="space-y-3 pt-2 mb-8">
                {telegram.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <a 
                href={telegram.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base py-3.5 px-6 transition-all shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2.5 active:scale-98"
                aria-label="Join Telegram Channel"
              >
                <span>{telegram.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/community"
                className="w-full sm:w-auto shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm py-3.5 px-4 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Explore Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Trust & Moderation Ribbon */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict Zero-Spam Policy • Managed &amp; Verified Admissions Mentors</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Free PDF Materials
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-amber-400" /> Live Cutoff Alerts
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
