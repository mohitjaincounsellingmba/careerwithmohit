"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MapPin,
  Calendar,
  Award,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Building2,
  ShieldCheck,
  Target,
  BookOpen,
  Users,
  Star,
  ArrowUpRight,
  Layers,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { College } from "@/lib/colleges";
import { JsonLd } from "./JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";

function getRegionFromLocation(location: string): string {
  const loc = location.toLowerCase();
  if (loc.includes("delhi")) return "Delhi";
  if (loc.includes("noida") || loc.includes("greater noida") || loc.includes("ghaziabad")) return "Uttar Pradesh";
  if (loc.includes("gurgaon") || loc.includes("faridabad")) return "Haryana";
  if (loc.includes("bangalore") || loc.includes("bengaluru")) return "Karnataka";
  if (loc.includes("mumbai") || loc.includes("pune") || loc.includes("navi mumbai")) return "Maharashtra";
  if (loc.includes("jaipur") || loc.includes("kota")) return "Rajasthan";
  if (loc.includes("dehradun") || loc.includes("roorkee")) return "Uttarakhand";
  if (loc.includes("kolkata")) return "West Bengal";
  if (loc.includes("ahmedabad")) return "Gujarat";
  if (loc.includes("chandigarh")) return "Chandigarh";
  if (loc.includes("hyderabad")) return "Telangana";
  if (loc.includes("chennai")) return "Tamil Nadu";
  return "India";
}

// Parse programs from markdown content like "- **MBA**: General Management | 2 Years | ₹15.0 Lakhs"
function parsePrograms(content: string, courses: string[]) {
  const programs: { name: string; specialization: string; duration: string; fees: string }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    // Match: - **MBA**: General Management | 2 Years | ₹15 Lakhs
    const match = line.match(/^\s*[-*]\s+\*\*(.+?)\*\*\s*:?\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(₹.+)/);
    if (match) {
      programs.push({
        name: match[1].trim(),
        specialization: match[2].trim(),
        duration: match[3].trim(),
        fees: match[4].trim(),
      });
    }
  }
  // Fallback: create entries from courses array if no parsed programs
  if (programs.length === 0) {
    courses.forEach((c) => programs.push({ name: c, specialization: "—", duration: "2 Years", fees: "Contact Admissions" }));
  }
  return programs;
}

// Specialization lookup per category / course type
const SPEC_MAP: Record<string, string[]> = {
  Management: [
    "Marketing Management",
    "Financial Management",
    "Human Resource Management (HRM)",
    "Operations & Supply Chain Management",
    "Business Analytics & Data Science",
    "Digital Marketing & E-Commerce",
    "International Business",
    "Information Technology (IT) & Systems",
    "Entrepreneurship & Family Business",
    "FinTech (Financial Technology)",
    "Agri-Business Management",
    "Healthcare & Hospital Management",
    "Retail & Consumer Management",
    "Banking & Financial Services (BFSI)",
    "Rural Management",
    "Logistics & Port Management",
  ],
  Engineering: [
    "Computer Science & Engineering (CSE)",
    "Artificial Intelligence (AI) & Machine Learning (ML)",
    "Data Science & Analytics",
    "Electronics & Communication Engineering (ECE)",
    "Cyber Security & Forensics",
    "Information Technology (IT)",
    "Mechanical Engineering (Robotics & Automation)",
    "Electrical & Electronics Engineering (EEE)",
    "Civil Engineering (Smart Infrastructure)",
    "Cloud Computing & DevOps",
    "Internet of Things (IoT)",
    "Biotechnology & Bioinformatics",
    "Aerospace & Aeronautical Engineering",
    "VLSI Design & Embedded Systems",
    "Mechatronics Engineering",
    "Renewable & Sustainable Energy",
  ],
  "UG Courses": [
    "BBA - Finance / Marketing / HR",
    "BCA - Cloud / AI / Mobile Apps",
    "B.Com - Accounts / Applied Economics",
    "B.Com (Hons) - Professional (ACCA / CMA)",
    "B.Sc - Computer Science / IT / Biotech",
    "B.A - Psychology / Economics / Journalism",
    "B.Pharm - Pharmaceutical Sciences",
    "B.Arch - Architecture & Design",
    "LL.B - BA / BBA Integrated Law",
    "BHM - Hotel & Hospitality Management",
    "Design - UX/UI / Fashion / Interior",
  ],
};

// Extract "About" section from markdown
function extractAbout(content: string): string {
  const sections = content.split(/###\s+/);
  const about = sections.find((s) => s.toLowerCase().startsWith("about"));
  if (about) return about.replace(/^about.+\n/i, "").trim();
  // Fallback: return first paragraph
  const firstPara = content.split("\n\n").find((p) => p.trim() && !p.startsWith("#") && !p.startsWith("-"));
  return firstPara?.trim() || "";
}

export function CollegeDetailClient({ college }: { college: College }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const addressRegion = getRegionFromLocation(college.location);

  const getNumericalValue = (val: string) => {
    const match = val.match(/₹?([\d.]+)\s*(?:LPA|L)/i);
    return match ? parseFloat(match[1]) : 0;
  };

  const highVal = getNumericalValue(college.highest_placement || "0");
  const avgVal = getNumericalValue(college.avg_placement || "0");
  const lowVal = getNumericalValue(college.lowest_placement || (avgVal * 0.6).toFixed(1) + " LPA");
  const displayLow = college.lowest_placement || (avgVal * 0.6).toFixed(1) + " LPA";
  const avgPercent = highVal > 0 ? Math.min((avgVal / highVal) * 100, 100) : 0;
  const lowPercent = highVal > 0 ? Math.min((getNumericalValue(displayLow) / highVal) * 100, 100) : 0;

  const programs = useMemo(() => parsePrograms(college.content, college.courses), [college.content, college.courses]);
  const aboutText = useMemo(() => extractAbout(college.content), [college.content]);
  const specializations = SPEC_MAP[college.category] || [];

  const collegeSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: college.name,
    description: `Detailed profile of ${college.name} located in ${college.location}.`,
    url: `https://www.careerwithmohit.online/colleges/${college.slug}`,
    logo: "https://www.careerwithmohit.online/logo.webp",
    address: { "@type": "PostalAddress", addressLocality: college.location, addressRegion: addressRegion, addressCountry: "IN" },
    foundingDate: college.established.toString(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Courses Offered at " + college.name,
      itemListElement: college.courses.map((course) => ({ "@type": "Course", name: course, provider: { "@type": "EducationalOrganization", name: college.name } })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `What are the fees at ${college.name}?`, acceptedAnswer: { "@type": "Answer", text: `Fees at ${college.name} are approximately ${college.fees}.` } },
      { "@type": "Question", name: `What is the average placement at ${college.name}?`, acceptedAnswer: { "@type": "Answer", text: `Average placement: ${college.avg_placement}, Highest: ${college.highest_placement}.` } },
    ],
  };

  const tabs = ["Overview", "Programs & Fees", "Placements", "Admissions"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <JsonLd data={collegeSchema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumbs */}
      <div className="bg-white pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center pb-12 pt-8">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-slate-100 rounded-[2rem] shadow-inner border border-slate-100 flex items-center justify-center p-6 flex-shrink-0">
              <GraduationCap className="w-full h-full text-blue-600" aria-label={`${college.name} Logo`} />
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                  {college.ownership} {college.type}
                </span>
                <span className="flex items-center bg-amber-50 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-amber-100/50">
                  <Award className="w-3.5 h-3.5 mr-2" />
                  {college.ranking}
                </span>
                <span className="flex items-center bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-emerald-100/50">
                  <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                  Verified 2026
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tighter italic">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-500 font-bold text-sm">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" />{college.location}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500" />Est. {college.established}</span>
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-purple-500" />{college.category}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
              >
                Apply Now
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-10 no-scrollbar border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-5 px-1 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-4 ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-900"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col lg:flex-row gap-12">
        
        {/* Left Content */}
        <div className="flex-grow space-y-10 min-w-0">

          {/* Quick Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Annual Fee", value: college.fees, icon: <IndianRupee className="w-5 h-5" />, color: "blue" },
              { label: "Avg. Package", value: college.avg_placement, icon: <TrendingUp className="w-5 h-5" />, color: "emerald" },
              { label: "Highest Package", value: college.highest_placement || "N/A", icon: <Star className="w-5 h-5" />, color: "amber" },
              { label: "Entrance Exam", value: (college.exams || [])[0] || "Direct", icon: <Target className="w-5 h-5" />, color: "purple" },
            ].map((stat) => (
              <div key={stat.label} className={`bg-white rounded-3xl border p-6 shadow-sm border-slate-100 hover:shadow-lg transition-all`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  stat.color === "blue" ? "bg-blue-50 text-blue-600"
                  : stat.color === "emerald" ? "bg-emerald-50 text-emerald-600"
                  : stat.color === "amber" ? "bg-amber-50 text-amber-600"
                  : "bg-purple-50 text-purple-600"
                }`}>
                  {stat.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</div>
                <div className="text-lg font-black text-slate-900 leading-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* ── ABOUT SECTION ── */}
          {(activeTab === "Overview" || activeTab === "Programs & Fees") && aboutText && (
            <Section id="about" icon={<BookOpen className="w-5 h-5 text-blue-500" />} title="About the Institute">
              <p className="text-slate-600 font-medium leading-relaxed text-base">{aboutText}</p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Location", value: college.location },
                  { label: "Established", value: college.established.toString() },
                  { label: "Type", value: `${college.ownership} ${college.type}` },
                  { label: "Category", value: college.category },
                  { label: "Ranking", value: college.ranking },
                  { label: "Exams Accepted", value: (college.exams || []).join(", ") || "Direct" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
                    <div className="text-sm font-black text-slate-800">{item.value}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ── PROGRAMS & FEES ── */}
          {(activeTab === "Overview" || activeTab === "Programs & Fees") && (
            <Section id="programs" icon={<Layers className="w-5 h-5 text-violet-500" />} title="Programs & Fees">
              <div className="space-y-4">
                {programs.map((prog, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 hover:border-blue-200 hover:shadow-lg transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-900 mb-1">{prog.name}</h3>
                          <p className="text-sm text-slate-500 font-medium">{prog.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Duration</div>
                          <div className="text-sm font-black text-slate-800">{prog.duration}</div>
                        </div>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="text-center">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Total Fees</div>
                          <div className="text-sm font-black text-blue-600">{prog.fees}</div>
                        </div>
                        <Link href="/inquiry" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all">
                          Apply
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ── SPECIALIZATIONS ── */}
          {(activeTab === "Overview" || activeTab === "Programs & Fees") && specializations.length > 0 && (
            <Section id="specializations" icon={<Sparkles className="w-5 h-5 text-amber-500" />} title="Specializations Offered">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {specializations.map((spec) => (
                  <div key={spec} className="flex items-center gap-3 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-4 hover:border-amber-200 hover:shadow-md transition-all group">
                    <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-xs font-black text-slate-700 leading-tight">{spec}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-4">
                * Specialization availability may vary. Contact admissions for the latest list.
              </p>
            </Section>
          )}

          {/* ── PLACEMENTS ── */}
          {(activeTab === "Overview" || activeTab === "Placements") && (
            <Section id="placements" icon={<BarChart3 className="w-5 h-5 text-emerald-500" />} title="Placement Statistics">
              {/* Package Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Lowest Package", value: displayLow, color: "slate", percent: lowPercent },
                  { label: "Average Package", value: college.avg_placement, color: "blue", percent: avgPercent },
                  { label: "Highest Package", value: college.highest_placement || "N/A", color: "emerald", percent: 100 },
                ].map((pkg) => (
                  <div key={pkg.label} className={`rounded-3xl p-6 text-center border ${
                    pkg.color === "emerald" ? "bg-emerald-50 border-emerald-100"
                    : pkg.color === "blue" ? "bg-blue-50 border-blue-100"
                    : "bg-slate-50 border-slate-100"
                  }`}>
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
                      pkg.color === "emerald" ? "text-emerald-500" : pkg.color === "blue" ? "text-blue-500" : "text-slate-400"
                    }`}>{pkg.label}</div>
                    <div className={`text-xl font-black ${
                      pkg.color === "emerald" ? "text-emerald-800" : pkg.color === "blue" ? "text-blue-800" : "text-slate-800"
                    }`}>{pkg.value}</div>
                  </div>
                ))}
              </div>

              {/* Visual Meter */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8">
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Package Distribution</div>
                <div className="relative pt-2 pb-16">
                  <div className="h-5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-slate-300 rounded-full transition-all duration-1000" style={{ width: `${lowPercent}%` }} />
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${Math.max(avgPercent - lowPercent, 0)}%` }} />
                    <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${Math.max(100 - avgPercent, 0)}%` }} />
                  </div>
                  {/* Labels */}
                  <div className="absolute bottom-0 left-0 flex flex-col items-start" style={{ left: `${lowPercent}%`, transform: "translateX(-50%)" }}>
                    <div className="w-0.5 h-6 bg-slate-300 mx-auto mb-1" />
                    <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">Min · {displayLow}</span>
                  </div>
                  <div className="absolute bottom-0" style={{ left: `${avgPercent}%`, transform: "translateX(-50%)" }}>
                    <div className="w-0.5 h-6 bg-blue-500 mx-auto mb-1" />
                    <span className="text-[10px] font-black text-blue-600 whitespace-nowrap">Avg · {college.avg_placement}</span>
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <div className="w-0.5 h-6 bg-emerald-500 mx-auto mb-1" />
                    <span className="text-[10px] font-black text-emerald-600 whitespace-nowrap">Max · {college.highest_placement}</span>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* ── TOP RECRUITERS ── */}
          {(activeTab === "Overview" || activeTab === "Placements") && college.top_recruiters && college.top_recruiters.length > 0 && (
            <Section id="recruiters" icon={<Building2 className="w-5 h-5 text-indigo-500" />} title="Top Recruiters">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {college.top_recruiters.map((rec) => (
                  <div key={rec} className="flex items-center justify-center p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg hover:bg-indigo-50/30 transition-all text-[11px] font-black uppercase tracking-tight text-slate-700 text-center min-h-[64px]">
                    {rec}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ── ADMISSIONS TAB ── */}
          {activeTab === "Admissions" && (
            <Section id="admissions" icon={<Target className="w-5 h-5 text-purple-500" />} title="Admission Process">
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-100 rounded-3xl p-6">
                  <h3 className="text-sm font-black uppercase tracking-wide text-purple-700 mb-4">Accepted Entrance Exams</h3>
                  <div className="flex flex-wrap gap-3">
                    {(college.exams || []).map((exam) => (
                      <span key={exam} className="px-5 py-2.5 bg-white border border-purple-200 text-purple-700 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
                {[
                  { step: "01", title: "Qualify Entrance Exam", desc: `Score well in ${(college.exams || []).join(" / ") || "the required exam"}.` },
                  { step: "02", title: "Fill Application Form", desc: "Apply through the official portal or get help from our counsellors." },
                  { step: "03", title: "Group Discussion & Interview", desc: "Attend GD/PI rounds shortlisted by the institute." },
                  { step: "04", title: "Merit List & Offer Letter", desc: "Receive your offer letter and complete fee payment." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-6 bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-md transition-all">
                    <div className="text-3xl font-black text-slate-100 flex-shrink-0 w-10">{s.step}</div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 mb-1">{s.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>

        {/* Right Sidebar */}
        <div className="lg:w-[360px] flex-shrink-0 space-y-6">
          {/* CTA Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-700" />
            <h3 className="text-2xl font-black uppercase tracking-tight mb-3 leading-tight italic relative z-10">
              Get Personalized <br /><span className="text-blue-400">Admission Guidance</span>
            </h3>
            <p className="text-slate-400 mb-8 font-medium relative z-10 text-sm leading-relaxed">
              Connect with Mohit Jain&apos;s expert team for fee structure, scholarship, and seat availability.
            </p>
            <div className="space-y-3 relative z-10">
              <Link href="/inquiry" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] py-4 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-blue-900">
                Get Expert Advice
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/inquiry" className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] py-4 px-6 rounded-2xl border border-white/10 transition-all flex items-center justify-center">
                WhatsApp Now
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4 relative z-10">
              {[
                { icon: <CheckCircle2 className="text-emerald-500 w-4 h-4" />, label: "Verified Fee Breakdowns" },
                { icon: <CheckCircle2 className="text-emerald-500 w-4 h-4" />, label: "Management Seat Guidance" },
                { icon: <CheckCircle2 className="text-emerald-500 w-4 h-4" />, label: "Zero Service Charge" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Quick Info</h4>
            <div className="space-y-3">
              {[
                { label: "Total Fee", value: college.fees },
                { label: "Avg Package", value: college.avg_placement },
                { label: "Highest Package", value: college.highest_placement || "N/A" },
                { label: "Established", value: college.established.toString() },
                { label: "Category", value: college.category },
                { label: "Ownership", value: college.ownership },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-xs font-bold text-slate-400">{item.label}</span>
                  <span className="text-xs font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-all">
                Official Website
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">{title}</h2>
      </div>
      {children}
    </div>
  );
}
