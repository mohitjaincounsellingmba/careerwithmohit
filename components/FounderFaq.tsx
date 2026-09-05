'use client';

import { useState } from 'react';
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Profile & Admissions",
    question: "Can I get into a premier MBA/PGDM college with average graduation marks or a gap year?",
    answer: "Yes, absolutely. Business schools evaluate candidate profiles holistically. A strong entrance exam percentile (CAT, XAT, NMAT, SNAP, MAT), compelling narrative during GD-PI, and relevant micro-certifications or project work can effectively counterbalance academic gaps or past academic scores. In our 1-on-1 sessions, we engineer your profile story so gap years become evidence of intentional growth rather than a disadvantage."
  },
  {
    category: "Philosophy & Integrity",
    question: "How is CareerWithMohit different from traditional admission consultants?",
    answer: "Most commercial consultancies operate on institutional commission kickbacks, steering students to whichever private college pays them the highest bounty—irrespective of placements. At CareerWithMohit, our advice is 100% student-first and ROI-grounded. We evaluate colleges on real median CTC vs total cost, audited alumni outcomes, and brand equity. If a college isn't worth your investment, we will frankly tell you so."
  },
  {
    category: "Direct Admission & Quotas",
    question: "How does Direct Admission / Institutional Merit Quota work in top B-schools?",
    answer: "Reputed AICTE-approved and private university business schools reserve a percentage of seats for profile-based and institutional merit candidates. Candidates must meet minimum 50% graduation eligibility and possess valid scores in any recognized national entrance test (CAT/MAT/XAT/CMAT/ATMA). We guide candidates on genuine institutional rounds, application timelines, and transparent direct admission procedures without middlemen."
  },
  {
    category: "1-on-1 Mentorship",
    question: "What happens during a 1-on-1 Strategy Session with Mohit Jain?",
    answer: "In a dedicated strategy call, we dissect your full academic profile, budget, target work locations, and post-MBA aspirations. You receive an uncompromised Dream / Target / Safe B-school shortlist, personalized GD-PI preparation roadmap, fee ROI analysis, and direct application support throughout your admission cycle."
  },
  {
    category: "Free Student Ecosystem",
    question: "Are the mock test portals and cutoff calculators on the site really free?",
    answer: "Yes, 100% free with zero paywalls. We built full-length simulators for CAT, XAT, NMAT, SNAP, MAT, ATMA, CMAT, and IELTS with live countdown timers, detailed solutions, and score-to-percentile converters so every student has access to top-tier preparation tools regardless of financial background."
  }
];

export function FounderFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={`border-4 border-foreground transition-all duration-200 ${
              isOpen
                ? 'bg-yellow-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="space-y-1">
                {faq.category && (
                  <span className="inline-block text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-foreground text-white">
                    {faq.category}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight leading-snug">
                  {faq.question}
                </h3>
              </div>
              <div
                className={`p-2 border-2 border-foreground shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-primary text-white rotate-180' : 'bg-muted text-foreground'
                }`}
              >
                <ChevronDown className="w-5 h-5" strokeWidth={3} />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 border-t-2 border-dashed border-foreground/20 text-gray-800 text-lg leading-relaxed font-medium">
                <p>{faq.answer}</p>
                <div className="mt-4 pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Answered personally by Mohit Jain
                  </span>
                  <Link
                    href="/inquiry"
                    className="text-xs font-black uppercase text-primary hover:underline flex items-center gap-1"
                  >
                    Discuss your profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
