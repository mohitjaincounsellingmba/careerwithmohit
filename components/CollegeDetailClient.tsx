"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import {
  MapPin,
  Calendar,
  Award,
  IndianRupee,
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { College } from "@/lib/colleges";
import { JsonLd } from "./JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";

export function CollegeDetailClient({ college }: { college: College }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const collegeSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": college.name,
    "description": `Detailed profile of ${college.name} located in ${college.location}. Fee structure: ${college.fees}, Average Placement package: ${college.avg_placement}, Established in ${college.established}.`,
    "url": `https://www.careerwithmohit.online/colleges/${college.slug}`,
    "logo": "https://www.careerwithmohit.online/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": college.location,
      "addressRegion": "Maharashtra", // This could be made dynamic if added to college data
      "addressCountry": "IN"
    },
    "foundingDate": college.established.toString(),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Courses Offered at " + college.name,
      "itemListElement": college.courses.map(course => ({
        "@type": "Course",
        "name": course,
        "description": `${course} program at ${college.name}, ${college.location}`,
        "provider": {
          "@type": "EducationalOrganization",
          "name": college.name
        }
      }))
    }
  };

  const tabs = [
    "Overview",
    "Courses & Fees",
    "Placements",
    "Admissions"
  ];

  // Helper to get specific section content or full content for Overview
  const displayContent = useMemo(() => {
    if (activeTab === "Overview") return college.content;

    const sections = college.content.split('###');

    if (activeTab === "Courses & Fees") {
      const section = sections.find(s => s.toLowerCase().includes('courses'));
      return section ? `### ${section}` : "Information coming soon...";
    }

    if (activeTab === "Placements") {
      const section = sections.find(s => s.toLowerCase().includes('placements'));
      return section ? `### ${section}` : "Information coming soon...";
    }

    if (activeTab === "Admissions") {
      const section = sections.find(s => s.toLowerCase().includes('admission'));
      return section ? `### ${section}` : "Information coming soon...";
    }

    return college.content;
  }, [activeTab, college.content]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <JsonLd data={collegeSchema} />
      {/* Breadcrumbs for SEO and Navigation */}
      <div className="bg-white pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>

      {/* Premium Hero Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center pb-8 pt-6">
            <div className="w-24 h-24 sm:w-32 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center p-4 flex-shrink-0">
              <GraduationCap className="w-full h-full text-blue-600" aria-label={`${college.name} Logo`} />
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {college.ownership} Institute
                </span>
                <span className="flex items-center text-slate-500 text-sm font-semibold">
                  <Award className="w-4 h-4 mr-1 text-yellow-500" />
                  {college.ranking}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 leading-tight">
                {college.name}, {college.location}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                  {college.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-slate-400" />
                  Estd. {college.established}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/inquiry"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-12 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Functional Tabs */}
          <div className="flex overflow-x-auto gap-8 mt-4 no-scrollbar border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-bold whitespace-nowrap transition-all border-b-2 relative ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-slate-500 border-transparent hover:text-slate-900"}`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">

        {/* Left Column */}
        <div className="flex-grow space-y-8 lg:max-w-[calc(100%-400px)]">

          {/* Stats Grid - Always visible on Overview, or contextually on tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`bg-white p-6 rounded-2xl border transition-all ${activeTab === 'Courses & Fees' ? 'border-blue-500 ring-2 ring-blue-50/50' : 'border-slate-200 shadow-sm'}`}>
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <IndianRupee className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Fees</div>
              <div className="text-2xl font-black text-slate-900">{college.fees}</div>
            </div>

            <div className={`bg-white p-6 rounded-2xl border transition-all ${activeTab === 'Placements' ? 'border-green-500 ring-2 ring-green-50/50' : 'border-slate-200 shadow-sm'}`}>
              <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Avg Package</div>
              <div className="text-2xl font-black text-slate-900">{college.avg_placement}</div>
            </div>

            <div className={`bg-white p-6 rounded-2xl border transition-all ${activeTab === 'Admissions' ? 'border-purple-500 ring-2 ring-purple-50/50' : 'border-slate-200 shadow-sm'}`}>
              <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Entrance</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {(college.exams || []).map(exam => (
                  <span key={exam} className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Block */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm min-h-[400px]">
            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:border-b-4 prose-h2:border-slate-100 prose-h2:pb-4 prose-h2:mt-12
              prose-h3:text-xl prose-h3:text-blue-600 prose-h3:mt-8
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-li:text-slate-700 prose-li:font-medium
              prose-strong:text-slate-900 prose-strong:font-black
              prose-table:border prose-table:rounded-xl prose-table:overflow-hidden">
              <ReactMarkdown>{displayContent}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-[360px] flex-shrink-0 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl sticky top-28">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center">
              Direct Admission Assistance?
            </h3>
            <p className="text-slate-400 mb-8 font-medium">
              Join thousands of students who got their dream college via our expert counselling.
            </p>

            <div className="space-y-4">
              <Link
                href="/inquiry"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center transition-all group"
              >
                Inquire Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/919560020771"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-2xl border border-white/10 transition-all flex items-center justify-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Verified Fee Structure
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Management Quota Guidance
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                100% Admission Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
