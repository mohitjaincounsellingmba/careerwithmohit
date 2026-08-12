import React from 'react';
import { AccreditationChecker } from '@/components/AccreditationChecker';
import { ShieldCheck, CheckCircle, Info, ExternalLink, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Accreditation & Approval Checker 2026-2027 | AICTE, UGC, AIU, BCI & NAAC Auditor | CareerWithMohit',
  description: 'Instantly verify AICTE, UGC, AIU, BCI (Law), COA (Architecture), PCI (Pharmacy) and NAAC accreditation for all degree programs. Check approved campus lists with validity 2026-2027.',
  keywords: [
    'AIU approved PGDM list', 'AICTE approval checker', 'BCI approved law colleges', 
    'COA architecture list', 'PCI pharmacy approved colleges', 'UGC approved universities', 'NAAC grade lookup'
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/accreditation-checker',
  },
  openGraph: {
    title: 'Accreditation & Approval Checker | CareerWithMohit',
    description: 'Instantly verify AICTE, UGC, AIU, and NAAC accreditation for universities & colleges across India.',
    url: 'https://www.careerwithmohit.online/tools/accreditation-checker',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Accreditation Checker Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accreditation & Approval Checker | CareerWithMohit',
    description: 'Verify AICTE, UGC, AIU, and NAAC accreditation for universities & colleges across India.',
    images: ['/og-image.webp'],
  },
};

export default function AccreditationCheckerPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "College Accreditation & Regulatory Approval Checker",
    "url": "https://www.careerwithmohit.online/tools/accreditation-checker",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is AIU equivalence important for PGDM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Association of Indian Universities (AIU) equivalence grants PGDM diplomas equal status to a university MBA degree, qualifying graduates for PhD programs and government PSU recruitments."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between UGC and AICTE approval?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UGC approves universities and degree-granting institutions, while AICTE approves technical and management institutions offering diplomas (like PGDM) and engineering programs."
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 font-sans -mt-8">
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* SEO Optimized Content Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-top-12 duration-1000">
        <div className="bg-white rounded-[3rem] p-10 sm:p-20 shadow-2xl relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest mb-10 border-2 border-blue-100 shadow-sm">
               <ShieldCheck className="h-5 w-5 fill-blue-600/10" />
               Academic Trust Protocol
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-10 leading-[1.05] tracking-tight">
              Accreditation <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Reality Check</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
              Don&apos;t let your investment go to waste. Verify if your college is actually approved for government jobs and higher AIU/PhD studies. Our auditor maps thousands of campuses against the latest regulatory data for 2026-2027.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "AIU Valid", value: "PGDM-MBA" },
                { label: "AICTE List", value: "B.Tech/Mgmt" },
                { label: "UGC Approved", value: "Degree/Univ" },
                { label: "NAAC Audit", value: "Quality Rank" }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50/80 backdrop-blur-sm p-5 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all hover:scale-105 group">
                  <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1 group-hover:text-blue-700">{stat.label}</div>
                  <div className="text-lg font-black text-gray-900 leading-tight">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 mb-24">
         <AccreditationChecker />
      </section>

      {/* Detailed Knowledge Section for SEO */}
      <section className="max-w-5xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
               <span className="h-8 w-2 bg-blue-600 rounded-full inline-block"></span>
               Why Verification Matters
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Thousands of students take admission in unapproved standalone campuses or distance/online formats that lack UGC-DEB/AICTE clearances. This makes degrees ineligible for PSU jobs, UPSC, state exams, and overseas visa evaluations (WES).
            </p>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
               <div className="font-black text-amber-900 mb-1 flex items-center gap-2">
                 <Info className="h-4 w-4" /> Crucial Tip:
               </div>
               <p className="text-xs text-amber-800 font-bold leading-relaxed">
                 Autonomous colleges offering PGDM must have AICTE approval plus AIU Equivalence if you plan to do a PhD or apply for government jobs later.
               </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
               <span className="h-8 w-2 bg-indigo-600 rounded-full inline-block"></span>
               Regulatory Bodies Covered
            </h2>
            <ul className="space-y-4 font-bold text-gray-700">
              <li className="flex items-center gap-3">
                 <CheckCircle className="h-5 w-5 text-emerald-500" />
                 <span><strong>UGC:</strong> University Grants Commission for all universities</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle className="h-5 w-5 text-emerald-500" />
                 <span><strong>AICTE:</strong> Engineering, Architecture & Management</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle className="h-5 w-5 text-emerald-500" />
                 <span><strong>AIU:</strong> MBA Equivalence for PGDM Programs</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle className="h-5 w-5 text-emerald-500" />
                 <span><strong>NAAC / NBA:</strong> Quality & Tier Assessment (A++, A+, A)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
