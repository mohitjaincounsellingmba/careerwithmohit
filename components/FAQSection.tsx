"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { College } from "@/lib/colleges";

interface FAQItem {
  q: string;
  a: string;
}

function buildFAQs(college: College): FAQItem[] {
  const examList = (college.exams || []).join(", ") || "various entrance exams";
  const recruiterList = (college.top_recruiters || []).slice(0, 5).join(", ") || "leading companies";

  return [
    {
      q: `What is the fee structure of ${college.name} for 2025-26?`,
      a: `The total fee at ${college.name} is approximately ${college.fees}. This covers tuition and academic charges. Additional costs like hostel (~₹1.2–1.8L/year), transport, and examination fees may apply. We recommend contacting the admissions office for a complete fee breakup.`,
    },
    {
      q: `What entrance exams does ${college.name} accept?`,
      a: `${college.name} accepts scores from ${examList}. Candidates must qualify the relevant entrance test and then appear for Group Discussion (GD) and Personal Interview (PI) rounds. Some seats may also be available under management quota.`,
    },
    {
      q: `What is the average placement package at ${college.name}?`,
      a: `The average placement package at ${college.name} is ${college.avg_placement}${college.highest_placement ? ` with the highest package touching ${college.highest_placement}` : ""}. The college has an active placement cell that coordinates with top companies throughout the year.`,
    },
    {
      q: `Who are the top recruiters at ${college.name}?`,
      a: `${college.name} sees recruiters like ${recruiterList} visit campus regularly. The college also supports internships, live projects, and industry mentorship programs to enhance employability.`,
    },
    {
      q: `Is hostel facility available at ${college.name}?`,
      a: `Yes, ${college.name} provides separate hostel facilities for boys and girls with amenities like AC/Non-AC rooms, 24/7 security, canteen, and high-speed Wi-Fi. Hostel fees typically range from ₹1.2 to ₹1.8 Lakhs per year.`,
    },
    {
      q: `When does the admission process start for ${college.name}?`,
      a: `Admissions at ${college.name} typically begin in January-February with entrance exam registrations. GD/PI rounds are held between March and May. Offer letters are usually dispatched by June. We recommend applying early to secure a seat.`,
    },
    {
      q: `Is ${college.name} NAAC/NBA accredited?`,
      a: `${college.name} is a ${college.ownership} ${college.type} with ${college.ranking}. For the latest accreditation status (NAAC/NBA), we recommend verifying directly from the college's official website or the NAAC portal.`,
    },
    {
      q: `What specializations are available at ${college.name}?`,
      a: `${college.name} offers various programs in the ${college.category} stream including ${college.courses.join(", ")}. For specific specialization options, refer to the Programs & Fees section or contact the admissions team.`,
    },
  ];
}

export function FAQSection({ college }: { college: College }) {
  const faqs = buildFAQs(college);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      id="faq"
      className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-5 h-5 text-teal-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-teal-200 bg-teal-50/40 shadow-sm"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-sm font-black leading-snug transition-colors ${
                    isOpen ? "text-teal-700" : "text-slate-800"
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isOpen ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-teal-100 mb-4" />
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schema hint */}
      <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
        These FAQs are optimized for Google's FAQ rich results (Schema.org)
      </p>
    </div>
  );
}
