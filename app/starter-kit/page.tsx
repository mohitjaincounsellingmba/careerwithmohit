import React from 'react';
import { Metadata } from 'next';
import StarterKitForm from './StarterKitForm';
import StarterKitPlacementTable from './StarterKitPlacementTable';
import MBAInterviewProcessSection from './MBAInterviewProcessSection';
import { BookOpen, Target, GraduationCap, FileText, CheckCircle2, Download, Sparkles, Building2, ShieldCheck, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free MBA Preparation Kit & Campus Placement Interview Guide 2026-27 | Download PDF',
  description: 'Download 100% Free MBA Preparation Kit & Campus Placement Selection Guide 2026-27. Includes CAT, NMAT, XAT syllabuses, percentile cutoffs, Big 4 & BFSI interview Q&A, and GDPI strategies.',
  keywords: [
    'mba campus placement interview questions and answers',
    'mba placement selection process guide pdf',
    'free mba preparation kit',
    'free mba study material pdf download',
    'cat exam starter kit 2026',
    'ey deloitte consulting interview questions mba',
    'jp morgan icici bank mba interview questions',
    'cat syllabus pdf download',
    'xat nmat snap preparation strategy',
    'top mba colleges placement report pdf',
    'drcc approved private mba colleges list',
    'gdpi preparation topics pdf'
  ],
  alternates: {
    canonical: 'https://careerwithmohit.online/starter-kit',
  },
  openGraph: {
    title: 'Free MBA Preparation Kit & Campus Placement Interview Guide 2026-27 | Download PDF',
    description: 'Get free instant PDF access to MBA entrance exam syllabuses, percentile cutoffs, Big 4/BFSI placement selection rounds & real interview questions.',
    url: 'https://careerwithmohit.online/starter-kit',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: 'https://careerwithmohit.online/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Free MBA Preparation Kit & Campus Placement Selection Guide 2026-27',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free MBA Preparation Kit & Campus Placement Interview Guide 2026-27 | Download PDF',
    description: 'Instant PDF downloads: CAT/XAT/NMAT syllabus, percentile cutoffs, Big 4/BFSI placement selection rounds & interview questions.',
  },
};

export default function StarterKitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Free MBA Preparation Kit & Campus Placement Selection Guide 2026-27',
    description: 'Comprehensive MBA entrance exam preparation starter kit and campus placement selection process & interview questions guide for CAT, XAT, NMAT, SNAP, CMAT & MAT aspirants.',
    provider: {
      '@type': 'Organization',
      name: 'CareerWithMohit',
      url: 'https://careerwithmohit.online',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      category: 'Free Educational Resource',
    },
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: SEO Optimized Value Proposition & Lead Magnet Hook */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-indigo-100/90 text-indigo-700 font-extrabold text-xs uppercase tracking-wider border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              100% Free Complete MBA Kit (PDF Download)
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Free MBA Preparation Kit <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">& Campus Placement Guide</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Accelerate your preparation for <span className="font-bold text-gray-900">CAT, XAT, NMAT, SNAP & Campus Placements</span>. Download study guides, exam syllabuses, percentile cutoffs, Big 4 / BFSI interview questions, and GDPI strategies in one instant PDF kit.
            </p>

            {/* Feature Highlights Grid */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-3.5 bg-white/80 rounded-2xl border border-indigo-100/80 shadow-2xs hover:border-indigo-300 transition-all">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Campus Placement Selection Process & Questions (NEW)</h3>
                  <p className="text-gray-600 text-sm mt-0.5">Big 4 (EY, Deloitte, PwC), BFSI (JP Morgan, ICICI), FMCG & Tech rounds with real interview questions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 bg-white/80 rounded-2xl border border-indigo-100/80 shadow-2xs hover:border-indigo-300 transition-all">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Official Exam Syllabuses & Sectional Weightage</h3>
                  <p className="text-gray-600 text-sm mt-0.5">Detailed topic-wise breakdown for CAT, XAT, NMAT, SNAP & MAT.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 bg-white/80 rounded-2xl border border-purple-100/80 shadow-2xs hover:border-purple-300 transition-all">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">4 Percentile Cutoff Placement Master Reports</h3>
                  <p className="text-gray-600 text-sm mt-0.5">Tier 1 (90%+), Top Tier 2 (80-90%), Tier 3 (70-80%), & Accessible B-Schools.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 bg-white/80 rounded-2xl border border-emerald-100/80 shadow-2xs hover:border-emerald-300 transition-all">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">DRCC Bihar Credit Card & Sector Recruiter Stats</h3>
                  <p className="text-gray-600 text-sm mt-0.5">Approved private MBA colleges list and domain-wise salary distribution.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 bg-white/80 rounded-2xl border border-blue-100/80 shadow-2xs hover:border-blue-300 transition-all">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">100 Trending GDPI Topics & Strategy Guide</h3>
                  <p className="text-gray-600 text-sm mt-0.5">Crafted by IIM alumni to crack PI interviews and group discussions.</p>
                </div>
              </div>
            </div>

            {/* Trust Signals & Social Proof */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=mba_${i}&backgroundColor=e2e8f0`} alt="MBA Aspirant avatar" className="w-full h-full" />
                    </div>
                  ))}
                </div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">Trusted by 10,000+ MBA Aspirants</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-bold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Free · Verified PDFs</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Lead Capture Form */}
          <div className="relative lg:sticky lg:top-28">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2.5 bg-linear-to-r from-indigo-500 via-purple-600 to-pink-500"></div>
              
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <Download className="w-3.5 h-3.5" /> Instant Free PDF Access
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Download Free Preparation Kit</h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">Fill in your details to unlock instant download links for all study guides, placement PDFs & interview Q&A.</p>
              </div>

              <StarterKitForm />
            </div>
          </div>
        </div>

        {/* MBA Campus Placement Interview Questions & Complete Process Section */}
        <MBAInterviewProcessSection />

        {/* Placement Data Categorized by Percentile Tiers */}
        <StarterKitPlacementTable />

      </div>
    </main>
  );
}

