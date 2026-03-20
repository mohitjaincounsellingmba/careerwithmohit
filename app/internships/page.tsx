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
    id: 101, // New Premium One
    title: "Venture Capital Summer Analyst",
    company: "Peak XV Partners (Sequoia India)",
    location: "Bangalore / Remote",
    type: "Hybrid",
    duration: "3 Months",
    stipend: "₹50,000/mo",
    description: "Assist the investment team in deal sourcing, market sizing, and evaluating early-stage consumer tech startups. High visibility role.",
    skills: "Financial Modeling, Market Research, VC, Due Diligence",
    link: "#",
    accent: "bg-black",
    lastDate: "Mar 31, 2026",
    isPremium: true
  },
  {
    id: 102, // New Premium Two
    title: "SWE Intern (Frontend)",
    company: "Vercel",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹80,000/mo",
    description: "Work on Next.js core features and help improve the developer experience. Deep understanding of React and TypeScript is a must.",
    skills: "React, Next.js, TypeScript, Tailwnind CSS",
    link: "#",
    accent: "bg-blue-600",
    lastDate: "Apr 05, 2026",
    isPremium: true
  },
  {
    id: 1,
    title: "Chartered Accountancy (CA)",
    company: "Urban Property Spaces Mumbai",
    location: "Work From Home",
    type: "Remote",
    duration: "12 Months",
    stipend: "₹3,000 – ₹7,000/mo",
    description: "Hands-on CA internship covering GST filing, IT returns, invoice management, legal drafts, and payroll preparation. Great for CA aspirants.",
    skills: "GST, IT Returns, Invoicing, Legal Drafts, Payroll",
    link: "https://internshala.com/internship/detail/work-from-home-chartered-accountancy-ca-internship-at-urban-property-spaces-mumbai1772914306",
    accent: "bg-sky-500",
    lastDate: "Apr 12, 2026",
  },
  {
    id: 2,
    title: "Forex Trader Intern",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹5,000/mo",
    description: "Learn live Forex trading strategies and portfolio management. Exposure to global currency markets under professional mentorship.",
    skills: "Forex Trading, Stock Markets, Portfolio Management, Investment Banking",
    link: "https://internshala.com/internship/detail/work-from-home-forex-trader-internship-at-pipraiser1772870089",
    accent: "bg-emerald-500",
    lastDate: "Mar 28, 2026",
  },
  {
    id: 3,
    title: "Enterprise Risk Management",
    company: "Vogabe Advisors Pvt. Ltd.",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹5,000/mo",
    description: "Work on identifying, assessing, and mitigating enterprise-level risks. Requires MS-Excel and PowerPoint proficiency for presentations.",
    skills: "Risk Management, MS-Excel, MS-PowerPoint",
    link: "https://internshala.com/internship/detail/work-from-home-enterprise-risk-management-internship-at-vogabe-advisors-private-limited1773226108",
    accent: "bg-purple-500",
    lastDate: "Apr 15, 2026",
  },
  {
    id: 4,
    title: "Trading Intern",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹5,000 – ₹10,000/mo",
    description: "Practical equity and derivatives trading experience under live market conditions, with mentorship from experienced traders.",
    skills: "Stock Trading, Investment Banking, Portfolio Management",
    link: "https://internshala.com/internship/detail/work-from-home-trading-internship-at-pipraiser1772869996",
    accent: "bg-rose-500",
    lastDate: "Apr 02, 2026",
  },
  {
    id: 5,
    title: "Content Writer – Finance",
    company: "Sloth Desk",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹5,000 – ₹8,000/mo",
    description: "Write insightful finance and stock trading content for blog/social media. SEO-optimized articles on markets, investing, and personal finance.",
    skills: "Finance Writing, SEO, Copywriting",
    link: "https://internshala.com/internship/detail/work-from-home-part-time-content-writer-trading-finance-internship-at-sloth-desk1773320314",
    accent: "bg-orange-500",
    lastDate: "Apr 10, 2026",
  },
  {
    id: 7,
    title: "Financial Analyst Intern",
    company: "Zean Lithos Pvt. Ltd.",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹3,000/mo",
    description: "Build financial models, prepare reports, and analyze company data using Excel. Ideal for finance students seeking real-world exposure.",
    skills: "MS-Excel, Financial Modeling, Report Writing",
    link: "https://internshala.com/internship/detail/work-from-home-financial-analyst-internship-at-zean-lithos-and-company-private-limited1773344607",
    accent: "bg-indigo-500",
    lastDate: "Apr 20, 2026",
  },
  {
    id: 9,
    title: "Investment Banker Intern",
    company: "The Venture Guys",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹5,000/mo",
    description: "Assist in deal sourcing, financial due diligence, and pitch deck preparation for early-stage startup funding and M&A advisory.",
    skills: "Finance, MS-Excel, Financial Analysis",
    link: "https://internshala.com/internship/detail/work-from-home-investment-banker-internship-at-the-venture-guys1773313845",
    accent: "bg-amber-500",
    lastDate: "Mar 30, 2026",
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
            {INTERNSHIPS.map((job) => (
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
            ))}
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
