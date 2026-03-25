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
  Download,
  ExternalLink,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Building2,
  Zap,
  ShieldCheck,
  Target
} from "lucide-react";
import Link from "next/link";
import { College } from "@/lib/colleges";
import { JsonLd } from "./JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";

function getRegionFromLocation(location: string): string {
  const loc = location.toLowerCase();
  if (loc.includes('delhi')) return 'Delhi';
  if (loc.includes('noida') || loc.includes('greater noida') || loc.includes('ghaziabad')) return 'Uttar Pradesh';
  if (loc.includes('gurgaon') || loc.includes('faridabad')) return 'Haryana';
  if (loc.includes('bangalore') || loc.includes('bengaluru')) return 'Karnataka';
  if (loc.includes('mumbai') || loc.includes('pune') || loc.includes('navi mumbai')) return 'Maharashtra';
  if (loc.includes('jaipur') || loc.includes('kota')) return 'Rajasthan';
  if (loc.includes('dehradun') || loc.includes('roorkee')) return 'Uttarakhand';
  if (loc.includes('kolkata')) return 'West Bengal';
  if (loc.includes('ahmedabad')) return 'Gujarat';
  if (loc.includes('chandigarh')) return 'Chandigarh';
  if (loc.includes('hyderabad')) return 'Telangana';
  if (loc.includes('chennai')) return 'Tamil Nadu';
  return 'India';
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
  const avgPercent = highVal > 0 ? (avgVal / highVal) * 100 : 0;
  const lowPercent = highVal > 0 ? (getNumericalValue(displayLow) / highVal) * 100 : 0;

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
      "addressRegion": addressRegion,
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the fees at ${college.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The fees at ${college.name}, ${college.location} are approximately ${college.fees}. The college offers ${college.courses.join(', ')} programs. For exact fee breakdowns and scholarship details, check the official website or contact our counsellors.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the average placement package at ${college.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The average placement package at ${college.name} is ${college.avg_placement}. The highest placement package recorded is ${college.highest_placement}. The college has a strong track record of placements with top companies across sectors.`
        }
      },
      {
        "@type": "Question",
        "name": `How to get admission in ${college.name} for 2026?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Admission to ${college.name} requires qualifying entrance exams: ${college.exams.join(', ')}. The college is a ${college.ownership} ${college.type.toLowerCase()} established in ${college.established}. It is ranked ${college.ranking}. Apply through the official website or get expert guidance from CareerWithMohit.`
        }
      },
      {
        "@type": "Question",
        "name": `Is ${college.name} a good college?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${college.name} is a ${college.ownership} ${college.type.toLowerCase()} located in ${college.location}, established in ${college.established}. It is ranked ${college.ranking}, with an average placement of ${college.avg_placement} and fees of approximately ${college.fees}. It offers ${college.courses.join(', ')} programs and accepts ${college.exams.join(', ')} scores.`
        }
      }
    ]
  };

  const tabs = ["Overview", "Courses & Fees", "Placements", "Admissions"];

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
      <JsonLd data={faqSchema} />
      
      <div className="bg-white pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center pb-12 pt-8">
            <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] shadow-inner border border-slate-100 flex items-center justify-center p-6 flex-shrink-0">
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
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tighter italic">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-slate-500 font-bold text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {college.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  Established {college.established}
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  Verified for 2026
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/inquiry"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-12 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
              >
                Apply for Admission
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-10 mt-4 no-scrollbar border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-5 px-1 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-4 relative ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-900"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12">
        <div className="flex-grow space-y-12 lg:max-w-[calc(100%-400px)]">
          
          {/* Enhanced Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              label="Annual Fee" 
              value={college.fees} 
              icon={<IndianRupee className="text-blue-600" />}
              color="blue"
              active={activeTab === 'Courses & Fees'}
            />
            <MetricCard 
              label="Avg. Placement" 
              value={college.avg_placement} 
              icon={<Briefcase className="text-emerald-600" />}
              color="emerald"
              active={activeTab === 'Placements'}
            />
            <MetricCard 
              label="Entrance Exam" 
              value={college.exams[0] || "Direct"} 
              icon={<Target className="text-purple-600" />}
              color="purple"
              active={activeTab === 'Admissions'}
            />
          </div>

          {/* Placement Meter Section (New) */}
          {activeTab === 'Placements' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-12 shadow-xl shadow-slate-200/50 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2 italic">Placement Metrics</h2>
                    <p className="text-slate-500 font-medium">Visual distribution of the 2024-25 placement packages.</p>
                 </div>
                 <div className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Highest Package</span>
                    <span className="text-2xl font-black text-emerald-900">{college.highest_placement}</span>
                 </div>
              </div>

              <div className="relative pt-10 pb-20 px-4">
                 <div className="h-4 bg-slate-100 rounded-full relative overflow-hidden flex">
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${lowPercent}%` }} />
                    <div className="h-full bg-emerald-500 border-l-2 border-white/20 transition-all duration-1000" style={{ width: `${avgPercent - lowPercent}%` }} />
                 </div>
                 
                 <div className="absolute top-0 left-0 flex flex-col items-center" style={{ left: `${lowPercent}%` }}>
                    <div className="w-1 h-32 bg-slate-200 absolute top-4" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Min</span>
                    <span className="text-xs font-black text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">{displayLow}</span>
                 </div>

                 <div className="absolute top-0 flex flex-col items-center" style={{ left: `${avgPercent}%` }}>
                    <div className="w-1 h-32 bg-blue-500 absolute top-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-1">Avg</span>
                    <span className="text-xs font-black text-white bg-blue-600 px-4 py-2 rounded-lg shadow-xl">{college.avg_placement}</span>
                 </div>

                 <div className="absolute top-0 right-4 flex flex-col items-center">
                    <div className="w-1 h-32 bg-slate-200 absolute top-4" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Max</span>
                    <span className="text-xs font-black text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">{college.highest_placement}</span>
                 </div>
              </div>

              {college.top_recruiters && (
                <div className="pt-8 border-t border-slate-50">
                   <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-blue-500" />
                      Our Top Hiring Partners
                   </h3>
                   <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {college.top_recruiters.map(rec => (
                        <div key={rec} className="flex items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all font-black text-[10px] uppercase text-slate-600 text-center tracking-tighter">
                          {rec}
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          )}

          {/* Main Content Block */}
          <div className="bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-16 shadow-2xl shadow-slate-200/50 min-h-[500px]">
            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic
              prose-h2:text-4xl prose-h2:text-slate-900 prose-h2:border-none prose-h2:pb-0 prose-h2:mt-16
              prose-h3:text-xl prose-h3:text-blue-600 prose-h3:mt-10
              prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-medium
              prose-li:text-slate-600 prose-li:font-medium
              prose-strong:text-slate-900 prose-strong:font-black
              prose-table:border-none prose-table:shadow-xl prose-table:shadow-slate-100 prose-table:rounded-3xl prose-table:overflow-hidden
              prose-th:bg-slate-900 prose-th:text-white prose-th:font-black prose-th:uppercase prose-th:tracking-widest prose-th:p-4
              prose-td:p-4 prose-td:font-bold prose-td:text-slate-700">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => {
                    const isExternal = props.href?.startsWith('http');
                    const className = "text-blue-600 hover:text-white hover:bg-blue-600 font-black decoration-blue-200 decoration-4 underline-offset-8 transition-all p-1 -m-1 rounded";
                    if (isExternal) return <a {...props} target="_blank" rel="noopener noreferrer" className={className}>{props.children}</a>;
                    return <Link href={props.href || "#"} className={className}>{props.children}</Link>;
                  }
                }}
              >
                {displayContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="lg:w-[380px] flex-shrink-0 space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl sticky top-28 overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-700" />
            
            <h3 className="text-3xl font-black uppercase tracking-tight mb-6 leading-none italic relative z-10">
              Personalized <br /> <span className="text-blue-400">Admission</span> Path
            </h3>
            <p className="text-slate-400 mb-12 font-medium relative z-10 leading-relaxed">
              Skip the confusion. Connect with Mohit Jain&apos;s expert counsellors for end-to-end guidance.
            </p>

            <div className="space-y-4 relative z-10">
              <Link
                href="/inquiry"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] py-5 px-6 rounded-2xl flex items-center justify-center transition-all group/btn shadow-lg shadow-blue-900"
              >
                Get Expert Advice
                <ChevronRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/inquiry"
                className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] py-5 px-6 rounded-2xl border border-white/10 transition-all flex items-center justify-center"
              >
                Whatsapp Now
              </Link>
            </div>

            <div className="mt-12 pt-10 border-t border-white/5 space-y-6 relative z-10">
              {[
                { icon: <CheckCircle2 className="text-emerald-500" />, label: "Verified Fee Breakdowns" },
                { icon: <CheckCircle2 className="text-emerald-500" />, label: "Management Seat Guidance" },
                { icon: <CheckCircle2 className="text-emerald-500" />, label: "Zero Service Charge" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, color, active }: { label: string, value: string, icon: React.ReactNode, color: string, active: boolean }) {
  const colors: Record<string, string> = {
    blue: "border-blue-100 bg-blue-50/30 text-blue-600",
    emerald: "border-emerald-100 bg-emerald-50/30 text-emerald-600",
    purple: "border-purple-100 bg-purple-50/30 text-purple-600"
  };

  return (
    <div className={`bg-white p-8 rounded-[2.5rem] border transition-all duration-500 ${active ? `${colors[color]} ring-4 ring-${color}-100/50 border-${color}-200` : "border-slate-100 shadow-xl shadow-slate-200/50"}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-inherit bg-white`}>
        {icon}
      </div>
      <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{label}</div>
      <div className={`text-2xl font-black tracking-tighter leading-tight ${active ? "text-slate-900" : "text-slate-800"}`}>{value}</div>
    </div>
  );
}
