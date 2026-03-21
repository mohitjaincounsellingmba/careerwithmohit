import { Briefcase, MapPin, ExternalLink, Calendar, Building2, Search, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Latest Finance & Tech Internships 2026 | CareerWithMohit",
  description: "Explore the latest Work From Home Finance and Tech internships in India for 2026. Curated opportunities in Financial Analysis, IB, SaaS Marketing, and Software Engineering.",
  keywords: ["finance internships work from home 2026", "tech internships India", "online finance internship India", "WFH internships", "investment banking internship online"],
  alternates: {
    canonical: "/internships",
  },
};

type Internship = {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    duration: string;
    stipend: string;
    description: string;
    skills: string;
    link: string;
    accent: string;
    lastDate: string;
    isPremium?: boolean;
};

const INTERNSHIPS: Internship[] = [
  {
    id: 1,
    title: "Data & Systems Internship",
    company: "Atavishaala",
    location: "Remote / WFH",
    type: "Part Time",
    duration: "3 Months",
    stipend: "Unpaid",
    description: "Build scalable data systems for an Agri-Tech startup. Focus on farmer onboarding, procurement tracking, and automated payments.",
    skills: "Google Sheets, Data Structures, No-code Tools",
    link: "https://unstop.com/internships/data-systems-internship-atavishaala-1663132",
    accent: "bg-indigo-500",
    lastDate: "Apr 02, 2026",
    isPremium: false
  },
  {
    id: 2,
    title: "Marketing Internship",
    company: "TALENTIZE",
    location: "Remote / WFH",
    type: "Part Time",
    duration: "2 Months",
    stipend: "₹5,000 - ₹10,000/mo",
    description: "Execute marketing campaigns and conduct research. Support social media profiles and LinkedIn growth strategies.",
    skills: "Digital Marketing, Content Marketing, Research",
    link: "https://unstop.com/internships/marketing-internship-talentize-1663221",
    accent: "bg-pink-500",
    lastDate: "Apr 02, 2026",
    isPremium: true
  },
  {
    id: 3,
    title: "Business Growth Internship",
    company: "Zynvixs Pvt. Ltd.",
    location: "Remote / WFH",
    type: "Full Time",
    duration: "3 Months",
    stipend: "Unpaid (Cert. included)",
    description: "Expand customer base and revenue through strategic lead generation and client servicing for high-impact growth.",
    skills: "Business Development, Lead Gen, Communication",
    link: "https://unstop.com/internships/business-growth-internship-zynvixs-pvt-ltd-1662217",
    accent: "bg-emerald-500",
    lastDate: "Apr 01, 2026",
    isPremium: false
  },
  {
    id: 4,
    title: "Campus Ambassador",
    company: "TripFlow Technologies",
    location: "Remote / WFH",
    type: "Part Time",
    duration: "2-3 Months",
    stipend: "Performance-Based",
    description: "Represent TripFlow on campus to build brand awareness and drive user registrations through community engagement.",
    skills: "Brand Strategy, Public Speaking, Marketing",
    link: "https://unstop.com/internships/campus-ambassador-internship-tripflow-technologies-pvt-ltd-1663150",
    accent: "bg-blue-600",
    lastDate: "Apr 02, 2026",
    isPremium: false
  },
  {
    id: 5,
    title: "Marketing & Ops Associate",
    company: "Lit Labs",
    location: "Remote / WFH",
    type: "Part Time",
    duration: "3 Months",
    stipend: "Unpaid",
    description: "Handle marketing operations and coordinate campaign tasks. Manage data analysis to optimize marketing performance.",
    skills: "Operations, Data Analysis, Marketing Sync",
    link: "https://unstop.com/internships/marketing-and-operations-associate-internship-lit-labs-1661161",
    accent: "bg-purple-500",
    lastDate: "Mar 31, 2026",
    isPremium: false
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "Solid Performers",
    location: "Remote / WFH",
    type: "Full Time",
    duration: "3-6 Months",
    stipend: "₹15,000 - ₹25,000/mo",
    description: "Develop full-stack web applications using PHP and MySQL. focus on debugging and system performance optimization.",
    skills: "PHP, MySQL, Web Dev, Debugging",
    link: "https://unstop.com/internships/full-stack-developer-internship-solid-performers-private-limited-1661253",
    accent: "bg-red-600",
    lastDate: "Mar 31, 2026",
    isPremium: true
  },
  {
    id: 7,
    title: "Web Designer Internship",
    company: "Kisan Udyog",
    location: "Remote / WFH",
    type: "Part Time",
    duration: "3-6 Months",
    stipend: "₹20,000 - ₹25,000/mo",
    description: "Create user-centric web designs, wireframes, and graphical assets for various digital platforms and apps.",
    skills: "UI/UX, Adobe Suite, CSS, Wireframing",
    link: "https://unstop.com/internships/web-designer-internship-kisan-udyog-1662492",
    accent: "bg-orange-500",
    lastDate: "Apr 02, 2026",
    isPremium: true
  },
  {
    id: 8,
    title: "Business Development",
    company: "Collegegyan",
    location: "Remote / WFH",
    type: "Full Time",
    duration: "2-3 Months",
    stipend: "₹5,000 - ₹15,000/mo",
    description: "Identify potential leads and qualify prospects for educational products using modern CRM tools.",
    skills: "CRM Software, Sales, Customer Service",
    link: "https://unstop.com/internships/business-development-internship-collegegyan-1662704",
    accent: "bg-amber-500",
    lastDate: "Apr 02, 2026",
    isPremium: false
  },
  {
    id: 9,
    title: "Creative Marketing",
    company: "Visamo",
    location: "Remote / WFH",
    type: "Full Time",
    duration: "2-3 Months",
    stipend: "₹10,000/mo",
    description: "Design creative social media content and marketing materials using Canva and data-driven analysis.",
    skills: "Canva, Creative Thinking, Excel",
    link: "https://unstop.com/internships/creative-marketing-internship-visamo-1662697",
    accent: "bg-rose-600",
    lastDate: "Apr 02, 2026",
    isPremium: false
  },
  {
    id: 10,
    title: "Data Analyst Internship",
    company: "Research Engine",
    location: "Remote / WFH",
    type: "Full Time",
    duration: "3-6 Months",
    stipend: "₹12,000 - ₹15,000/mo",
    description: "Perform data analysis and visualization using Python, SQL, and Tableau to solve complex research questions.",
    skills: "Python, SQL, Tableau, Visualization",
    link: "https://unstop.com/internships/data-analyst-internship-research-engine-1663145",
    accent: "bg-sky-500",
    lastDate: "Apr 02, 2026",
    isPremium: true
  }
];

export default function InternshipsPage() {
  return (
    <div className="w-full bg-[#f4f4f5] min-h-screen selection:bg-rose-500 selection:text-white">
      {/* Structural Brutalist Hero */}
      <section className="bg-white border-b-[12px] border-[#18181b] pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 bg-[#18181b] text-white px-5 py-2 mb-8 uppercase tracking-widest text-xs font-black shadow-[6px_6px_0px_0px_rgba(244,63,94,1)]">
              <TrendingUp className="w-4 h-4 text-rose-500" /> Live Opportunities
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-black uppercase tracking-tighter text-[#18181b] leading-[0.85] mb-6">
              Intern<br />
              <span className="text-rose-500 stroke-text">Ships.</span>
            </h1>
            <p className="max-w-xl text-xl font-bold text-gray-600 leading-snug border-l-8 border-rose-500 pl-6 py-2">
              Curated premium roles spanning Finance, Venture Capital, and Tech. Sourced for absolute excellence. Apply before the deadline.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="bg-[#18181b] p-6 text-white text-center border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(244,63,94,1)]">
               <span className="block text-5xl font-black">{INTERNSHIPS.length}</span>
               <span className="text-xs uppercase tracking-widest text-rose-400 font-bold mt-2 block">Open Roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Grid Showcase */}
      <section className="py-24 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {INTERNSHIPS.length > 0 ? (
              INTERNSHIPS.map((job) => (
                <div 
                  key={job.id} 
                  className={`bg-white border-[6px] border-[#18181b] p-8 lg:p-10 relative flex flex-col h-full transition-all duration-300 hover:-translate-y-2 group shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:shadow-[16px_16px_0px_0px_rgba(244,63,94,1)] ${job.isPremium ? 'border-dashed' : ''}`}
                >
                  {/* Premium Banner */}
                  {job.isPremium && (
                    <div className="absolute -top-5 -right-5 bg-rose-500 text-white px-6 py-2 border-4 border-[#18181b] shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] font-black uppercase tracking-widest text-sm rotate-3 z-10">
                      Premium Role
                    </div>
                  )}

                  {/* Aesthetic Top Area */}
                  <div className="flex items-start justify-between mb-8 pb-8 border-b-4 border-[#18181b]">
                    <div className={`w-16 h-16 ${job.accent} border-4 border-[#18181b] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] group-hover:rotate-12 transition-transform duration-500 flex-shrink-0`}>
                      <Briefcase className="text-white w-8 h-8" />
                    </div>
                    
                    {/* Deadline UI */}
                    <div className="flex flex-col items-end gap-2 text-right">
                      <div className="inline-flex items-center gap-1.5 bg-yellow-300 border-2 border-[#18181b] px-3 py-1 font-black text-xs uppercase tracking-widest text-[#18181b] shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                        <Clock className="w-3.5 h-3.5 animate-pulse" /> Apply by {job.lastDate}
                      </div>
                      <span className="inline-block bg-[#18181b] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-[#18181b]">
                        {job.type} • {job.duration}
                      </span>
                    </div>
                  </div>

                  {/* Main Identity */}
                  <div className="flex-grow">
                    <h3 className="text-3xl md:text-4xl font-black text-[#18181b] uppercase mb-3 leading-[1.1] tracking-tight group-hover:text-rose-500 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-700">
                      <Building2 className="w-6 h-6 text-gray-400" />
                      {job.company}
                    </div>
                    
                    {/* Stipend and Loc */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <div className="inline-flex font-black items-center bg-[#18181b] text-white px-4 py-1.5 uppercase text-sm border-2 border-[#18181b] shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
                         💰 Stipend: {job.stipend}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-black text-gray-500 uppercase tracking-widest mt-2 sm:mt-0">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        {job.location}
                      </div>
                    </div>

                    <p className="font-bold text-gray-600 mb-8 leading-relaxed text-lg bg-gray-100 p-5 border-l-8 border-gray-300">
                      "{job.description}"
                    </p>

                    {/* Aesthetic Skill Tags */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.split(', ').map((skill: string) => (
                          <span key={skill} className="bg-white border-2 border-[#18181b] text-[#18181b] shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] text-xs font-black px-3 py-1.5 uppercase tracking-widest">
                            # {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brutal CTA */}
                  <a 
                    href={job.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 block w-full text-center bg-rose-500 text-white border-4 border-[#18181b] py-5 text-xl font-black uppercase tracking-widest hover:bg-[#18181b] transition-colors flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(24,24,27,1)] active:translate-y-1 active:shadow-none"
                  >
                    Submit Application <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border-[6px] border-[#18181b] p-16 text-center shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
                <h3 className="text-4xl font-black uppercase mb-4">No Active Internships</h3>
                <p className="text-xl font-bold text-gray-600">We are currently curating the next batch of premium roles. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Massive CTA Footer */}
      <section className="bg-rose-500 text-white py-32 px-6 sm:px-12 border-t-[12px] border-[#18181b] relative overflow-hidden">
        {/* Huge background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
             <span className="text-[20rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap">GROW</span>
        </div>

        <div className="mx-auto max-w-5xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Want a Tier-1<br/> Profile Update?
          </h2>
          <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto text-rose-100">
            Learn the exact frameworks used by top students to land high-paying Product, IB, and SWE internships.
          </p>
          <Link href="/inquiry" className="inline-flex items-center gap-4 bg-yellow-300 text-[#18181b] border-[6px] border-[#18181b] px-12 py-6 text-3xl font-black uppercase tracking-widest shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] transition-all active:translate-y-2 active:shadow-none">
            Get Career Roadmap <ExternalLink className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </div>
  );
}
