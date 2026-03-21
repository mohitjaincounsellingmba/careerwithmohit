import { Briefcase, MapPin, ExternalLink, Calendar, Building2, Search, Clock, ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Premium Job Opportunities 2026 | CareerWithMohit",
  description: "Explore the latest full-time job opportunities in Finance, Tech, and Marketing for 2026. Hand-picked roles at India's top companies and startups.",
  keywords: ["jobs for freshers 2026", "finance jobs India", "tech jobs 2026", "software engineer roles", "marketing jobs India", "MBA jobs 2026"],
  alternates: {
    canonical: "/jobs",
  },
};

type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    experience: string;
    salary: string;
    description: string;
    skills: string;
    link: string;
    accent: string;
    postedDate: string;
    isPremium?: boolean;
};

const JOBS: Job[] = [
  {
    id: 1,
    title: "Investment Banking Associate",
    company: "Goldman Sachs",
    location: "Mumbai / Bangalore",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹18-25 LPA",
    description: "Join the investment banking division to work on complex M&A transactions and capital raising for global clients. Requires strong financial modeling skills.",
    skills: "Financial Modeling, Valuations, M&A, Pitch Books",
    link: "#",
    accent: "bg-blue-600",
    postedDate: "Mar 20, 2026",
    isPremium: true
  },
  {
    id: 2,
    title: "Product Manager (FinTech)",
    company: "Razorpay",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "2-5 Years",
    salary: "₹22-35 LPA",
    description: "Lead the product lifecycle for new payment solutions. Work closely with engineering and design to build world-class fintech products.",
    skills: "Product Roadmap, SQL, User Research, Agile",
    link: "#",
    accent: "bg-indigo-600",
    postedDate: "Mar 18, 2026",
    isPremium: true
  },
  {
    id: 3,
    title: "Software Engineer - Backend",
    company: "Zomato",
    location: "Gurgaon",
    type: "Full-time",
    experience: "0-2 Years",
    salary: "₹12-18 LPA",
    description: "Build scalable backend systems that power millions of orders. High ownership role for engineers who love solving architectural challenges.",
    skills: "Node.js, Go, PostgreSQL, Redis, System Design",
    link: "#",
    accent: "bg-red-600",
    postedDate: "Mar 21, 2026",
    isPremium: false
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "Nykaa",
    location: "Mumbai",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹10-15 LPA",
    description: "Drive brand growth through digital marketing and strategic partnerships. Experience in e-commerce marketing is a plus.",
    skills: "Growth Marketing, Performance Marketing, SEO, Analytics",
    link: "#",
    accent: "bg-pink-500",
    postedDate: "Mar 19, 2026",
    isPremium: false
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Flipkart",
    location: "Bangalore",
    type: "Full-time",
    experience: "0-2 Years",
    salary: "₹8-12 LPA",
    description: "Unlock insights from massive datasets to drive business decisions across logistics and customer experience.",
    skills: "Python, SQL, Tableau, Statistics",
    link: "#",
    accent: "bg-yellow-500",
    postedDate: "Mar 15, 2026",
    isPremium: false
  }
];

export default function JobsPage() {
  return (
    <div className="w-full bg-[#f4f4f5] min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Structural Brutalist Hero */}
      <section className="bg-white border-b-[12px] border-[#18181b] pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 bg-[#18181b] text-white px-5 py-2 mb-8 uppercase tracking-widest text-xs font-black shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]">
              <TrendingUp className="w-4 h-4 text-indigo-400" /> Hiring Now
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-black uppercase tracking-tighter text-[#18181b] leading-[0.85] mb-6">
              Full-Time<br />
              <span className="text-indigo-600 stroke-text">Jobs.</span>
            </h1>
            <p className="max-w-xl text-xl font-bold text-gray-600 leading-snug border-l-8 border-indigo-600 pl-6 py-2">
              Premium career opportunities across India's top-tier firms. Curated for ambitious professionals and fresh graduates.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="bg-[#18181b] p-6 text-white text-center border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]">
               <span className="block text-5xl font-black">{JOBS.length}</span>
               <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mt-2 block">Active Roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid Showcase */}
      <section className="py-24 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {JOBS.map((job) => (
              <div 
                key={job.id} 
                className={`bg-white border-[6px] border-[#18181b] p-8 lg:p-10 relative flex flex-col h-full transition-all duration-300 hover:-translate-y-2 group shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:shadow-[16px_16px_0px_0px_rgba(79,70,229,1)] ${job.isPremium ? 'border-dashed' : ''}`}
              >
                {/* Premium Banner */}
                {job.isPremium && (
                  <div className="absolute -top-5 -right-5 bg-indigo-600 text-white px-6 py-2 border-4 border-[#18181b] shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] font-black uppercase tracking-widest text-sm rotate-3 z-10">
                    High Intent Role
                  </div>
                )}

                {/* Aesthetic Top Area */}
                <div className="flex items-start justify-between mb-8 pb-8 border-b-4 border-[#18181b]">
                  <div className={`w-16 h-16 ${job.accent} border-4 border-[#18181b] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] group-hover:rotate-12 transition-transform duration-500 flex-shrink-0`}>
                    <Briefcase className="text-white w-8 h-8" />
                  </div>
                  
                  {/* Posted Date UI */}
                  <div className="flex flex-col items-end gap-2 text-right">
                    <div className="inline-flex items-center gap-1.5 bg-yellow-300 border-2 border-[#18181b] px-3 py-1 font-black text-xs uppercase tracking-widest text-[#18181b] shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                      <Clock className="w-3.5 h-3.5" /> Posted {job.postedDate}
                    </div>
                    <span className="inline-block bg-[#18181b] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-[#18181b]">
                      {job.type} • {job.experience} Exp
                    </span>
                  </div>
                </div>

                {/* Main Identity */}
                <div className="flex-grow">
                  <h3 className="text-3xl md:text-4xl font-black text-[#18181b] uppercase mb-3 leading-[1.1] tracking-tight group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-700">
                    <Building2 className="w-6 h-6 text-gray-400" />
                    {job.company}
                  </div>
                  
                  {/* Salary and Loc */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="inline-flex font-black items-center bg-[#18181b] text-white px-4 py-1.5 uppercase text-sm border-2 border-[#18181b] shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
                       <DollarSign className="w-4 h-4 mr-1" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-black text-gray-500 uppercase tracking-widest mt-2 sm:mt-0">
                      <MapPin className="w-4 h-4 text-indigo-500" />
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
                  className="mt-4 block w-full text-center bg-indigo-600 text-white border-4 border-[#18181b] py-5 text-xl font-black uppercase tracking-widest hover:bg-[#18181b] transition-colors flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(24,24,27,1)] active:translate-y-1 active:shadow-none"
                >
                  Apply to Role <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA Footer */}
      <section className="bg-indigo-600 text-white py-32 px-6 sm:px-12 border-t-[12px] border-[#18181b] relative overflow-hidden">
        {/* Huge background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
             <span className="text-[20rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap">CAREER</span>
        </div>

        <div className="mx-auto max-w-5xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Ready to Accelerate<br/> Your Growth?
          </h2>
          <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto text-indigo-100">
            Get personalized career guidance and access to exclusive hiring pipelines for top firms.
          </p>
          <Link href="/inquiry" className="inline-flex items-center gap-4 bg-yellow-300 text-[#18181b] border-[6px] border-[#18181b] px-12 py-6 text-3xl font-black uppercase tracking-widest shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] transition-all active:translate-y-2 active:shadow-none">
            Book Counselling <ExternalLink className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </div>
  );
}
