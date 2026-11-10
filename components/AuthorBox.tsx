import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Calendar, CheckCircle, ExternalLink, BookOpen, MessageSquare } from 'lucide-react';

interface AuthorBoxProps {
  author?: string;
  publishDate: string;
  lastUpdated?: string;
  sources?: string[];
  category?: string;
}

export function AuthorBox({
  author = 'Mohit Jain',
  publishDate,
  lastUpdated,
  sources,
  category,
}: AuthorBoxProps) {
  const formattedPublish = publishDate
    ? new Date(publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '2026';
    
  const formattedUpdated = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'November 2026 (Academic Cycle 2026-2027)';

  const defaultSources = [
    'Official University / Institute Admission Prospectus & Fee Circulars',
    'National Institutional Ranking Framework (NIRF) Statutory Filings',
    'AICTE & UGC Regulatory Norms on Approvals, Cutoffs & Fee Refunds',
    'Primary Student Placement Audit & Verifiable RTI Disclosures',
  ];

  const displaySources = sources && sources.length > 0 ? sources : defaultSources;

  return (
    <div className="my-16 border-4 border-foreground bg-white rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* HEADER BADGE */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-2 border-gray-100">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Verified Editorial Analysis • E-E-A-T Certified</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Last Updated: <strong className="text-foreground">{formattedUpdated}</strong></span>
        </div>
      </div>

      {/* AUTHOR BIO & CREDENTIALS */}
      <div className="pt-6 flex flex-col md:flex-row items-start gap-6">
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary text-white border-4 border-foreground flex items-center justify-center font-display font-black text-2xl sm:text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            MJ
          </div>
          <div className="absolute -bottom-2 -right-2 bg-accent text-foreground p-1 rounded-full border-2 border-foreground" title="Verified Education Counselor">
            <CheckCircle className="w-4 h-4 text-foreground fill-accent" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
              {author}
            </h3>
            <span className="bg-secondary/15 text-secondary text-xs px-2.5 py-0.5 rounded font-black uppercase border border-secondary/30">
              Lead Admissions Strategist
            </span>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
            Mohit Jain is a veteran education consultant and higher-education strategist with over <strong>10+ years of domain experience</strong>. He has mentored over 5,000+ candidates across India navigating competitive entrance exams (CAT, XAT, CUET, JEE), institutional admissions, NIRF audit evaluations, and regulatory fee refund disputes.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <a
              href="https://www.linkedin.com/in/mohitjaincounselling/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:text-secondary underline"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="https://www.instagram.com/careerwithmohit.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:text-secondary underline"
            >
              <span>Instagram @careerwithmohit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-gray-300">•</span>
            <Link href="/about/" className="text-primary hover:text-secondary underline">
              About CareerWithMohit
            </Link>
          </div>
        </div>
      </div>

      {/* FACT CHECK & VERIFIED SOURCES SECTION */}
      <div className="mt-8 pt-6 border-t-2 border-gray-100 bg-slate-50/80 rounded-xl p-5 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-black uppercase tracking-wider text-foreground">
            Fact-Checking & Primary Regulatory Sources
          </h4>
        </div>
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          Every fee structure, cutoff percentile, and eligibility threshold published on CareerWithMohit is independently cross-checked against primary institutional and government sources:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
          {displaySources.map((source, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-primary font-black mt-0.5">✓</span>
              <span className="font-medium">{source}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ADMISSIONS STRATEGY CTA */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-accent/20 border-2 border-foreground rounded-xl p-4 sm:p-5">
        <div>
          <h5 className="font-display font-black text-sm uppercase text-foreground">
            Have questions about fees, cutoffs, or refund eligibility?
          </h5>
          <p className="text-xs text-slate-600">
            Get an unbiased, zero-commission evaluation of your college options directly from Mohit Jain.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/inquiry/"
            className="px-4 py-2 bg-primary text-white text-xs font-black uppercase rounded-lg border-2 border-foreground hover:bg-secondary transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Book Free Audit
          </Link>
          <a
            href="https://wa.me/919560020771"
            className="px-4 py-2 bg-white text-foreground text-xs font-black uppercase rounded-lg border-2 border-foreground hover:bg-slate-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

