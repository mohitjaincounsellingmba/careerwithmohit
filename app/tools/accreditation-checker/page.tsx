import React from 'react';
import { AccreditationChecker } from '@/components/AccreditationChecker';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, CheckCircle, Info, ExternalLink, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accreditation & Approval Checker 2024-25 | AICTE, UGC, AIU, BCI, COA & PCI Auditor',
  description: 'Instantly verify AICTE, UGC, AIU, BCI (Law), COA (Architecture), PCI (Pharmacy) and NAAC accreditation for all degree programs. Check approved campus lists with validity 2024-25.',
  keywords: 'AIU approved PGDM list, AICTE approval checker, BCI approved law colleges, COA architecture list, PCI pharmacy approved colleges, UGC approved universities, NAAC grade lookup',
};

export default function AccreditationCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
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
                Don't let your investment go to waste. Verify if your college is actually approved for government jobs and higher AIU/PhD studies. Our auditor maps thousands of campuses against the latest regulatory data for 2024-25.
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
                <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
                What is AIU Equivalence?
              </h2>
              <div className="prose prose-blue text-gray-600 font-medium leading-relaxed">
                <p>
                  PGDM (Post Graduate Diploma in Management) is offered by autonomous bodies. To make it equivalent to an MBA degree for government jobs and higher studies like PhD, the Association of Indian Universities (AIU) must grant it "equivalence".
                </p>
                <p className="mt-4 font-bold text-gray-900">
                  Benefits of AIU Approval:
                </p>
                <ul className="mt-4 space-y-3 list-none p-0">
                  <li className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span>Eligible for UPSC/Bank Exams & Govt Jobs</span>
                  </li>
                  <li className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span>Eligible for PhD/Doctorate Admissions</span>
                  </li>
                  <li className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span>Recognized for Higher Studies in Foreign Universities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <Info className="h-12 w-12 text-primary mb-8" />
              <h3 className="text-3xl font-black mb-6 leading-tight">Expert Consultation</h3>
              <p className="text-gray-400 mb-8 font-medium text-lg leading-relaxed">
                Confused between two campuses? Get a deep audit report on placement validity and accreditation cycles before paying your admission fee.
              </p>
              <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-black hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-xl w-fit">
                Book Profile Audit
              </button>
            </div>
          </div>

          <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <h3 className="text-4xl font-black mb-4">Official Database Links</h3>
                <p className="text-blue-100 font-medium text-lg">Cross-verify your college code directly on official portal dumps.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "AICTE Portal", url: "https://www.aicte-india.org" },
                  { name: "UGC List", url: "https://www.ugc.gov.in" },
                  { name: "AIU Equivalence", url: "https://www.aiu.ac.in" }
                ].map((link, j) => (
                  <a 
                    key={j} 
                    href={link.url} 
                    target="_blank" 
                    className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 hover:bg-white text-blue-900 font-black hover:text-blue-600 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
                  >
                    {link.name} <ExternalLink size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
