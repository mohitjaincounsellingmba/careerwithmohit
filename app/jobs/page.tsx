import { Briefcase, MapPin, ExternalLink, Calendar, Building2, Search, Clock, ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Premium Job Opportunities 2026 | CareerWithMohit",
  description: "Explore the latest full-time job opportunities in Tech, Sales, and Marketing. Hand-picked roles with verified referral links for 2026 career growth.",
  keywords: ["jobs 2026", "software engineer roles India", "inside sales jobs", "social media strategy jobs", "OptimHire jobs", "career opportunities"],
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
    title: "Backend Developer",
    company: "OptimHire",
    location: "Fully Remote",
    type: "Full-time",
    experience: "1-15 Years",
    salary: "₹1.1Cr - ₹1.5Cr/Year",
    description: "Build robust, scalable services and design server-side applications for millions of users. Work with cutting-edge cloud infrastructures and collaborate with cross-functional teams.",
    skills: "Python, Java, Node.js, Go, AWS, Docker, Kubernetes, CI/CD",
    link: "https://optimhire.com/developers/jv/309466?ref_code=mohit-jain",
    accent: "bg-indigo-600",
    postedDate: "New",
    isPremium: true
  },
  {
    id: 2,
    title: "Social Media Strategist",
    company: "Talknlock",
    location: "Jaipur, RJ",
    type: "Full-time",
    experience: "2-3 Years",
    salary: "₹4L - ₹6L/Year",
    description: "Lead digital marketing and content strategy initiatives. Focus on social media strategy, analytics, and growing brand presence across platforms.",
    skills: "Digital Marketing, Content Strategy, Social Media Strategy, Analytics",
    link: "https://optimhire.com/developers/jv/309539?ref_code=mohit-jain",
    accent: "bg-pink-500",
    postedDate: "New",
    isPremium: false
  },
  {
    id: 3,
    title: "Inside Sales Consultant",
    company: "Zopsmart",
    location: "Noida, UP",
    type: "Full-time",
    experience: "4 Years",
    salary: "₹12.5L - ₹16.6L/Year",
    description: "Drive B2B sales through cold calling, lead generation, and relationship building. High-intent role for experienced sales professionals.",
    skills: "Inside Sales, Cold Calling, Lead Generation, B2B Sales",
    link: "https://optimhire.com/developers/jv/309537?ref_code=mohit-jain",
    accent: "bg-emerald-600",
    postedDate: "New",
    isPremium: true
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "B-Informative IT Services",
    location: "Bengaluru, KA",
    type: "Full-time",
    experience: "3-5 Years",
    salary: "₹10L - ₹12L/Year",
    description: "Develop end-to-end solutions using .NET Core and React. Work on microservices architecture and mobile development with React-Native.",
    skills: ".NET Core, React, React-Native, Typescript, Microservices",
    link: "https://optimhire.com/developers/jv/309523?ref_code=mohit-jain",
    accent: "bg-blue-600",
    postedDate: "New",
    isPremium: false
  },
  {
    id: 5,
    title: "Data Scientist / Sr. ML Engineer",
    company: "Ithena Technologies",
    location: "Pune, MH",
    type: "Onsite",
    experience: "6-7 Years",
    salary: "₹15L - ₹20L/Year",
    description: "Build ML models and scalable data pipelines (ETL/ELT). Deploy solutions in Azure/AWS/Databricks cloud environments.",
    skills: "Python, Machine Learning, ETL/ELT, Azure, AWS, Databricks",
    link: "https://optimhire.com/developers/jv/309514?ref_code=mohit-jain",
    accent: "bg-purple-600",
    postedDate: "New",
    isPremium: true
  },
  {
    id: 6,
    title: "WordPress Developer",
    company: "Allegiance Group",
    location: "Fully Remote",
    type: "Remote",
    experience: "5-6 Years",
    salary: "₹38L - ₹51L/Year",
    description: "Collaborative remote WordPress development. Work with tech leads to build complex, responsive websites using Gutenberg and ACF.",
    skills: "WordPress, Gutenberg, ACF, Responsive HTML, SASS, Git",
    link: "https://optimhire.com/developers/jv/309546?ref_code=mohit-jain",
    accent: "bg-orange-600",
    postedDate: "New",
    isPremium: true
  },
  {
    id: 7,
    title: "Business Development Executive (SaaS)",
    company: "Rannkly",
    location: "Noida, UP",
    type: "Onsite",
    experience: "0-3 Years",
    salary: "₹4L - ₹18L/Year",
    description: "Build relationships and close deals for a reputation management SaaS platform. Performance-driven role with high incentive potential.",
    skills: "SaaS Sales, B2B Sales, CRM, Relationship Building, Closing Deals",
    link: "https://optimhire.com/developers/jv/309513?ref_code=mohit-jain",
    accent: "bg-emerald-600",
    postedDate: "New",
    isPremium: true
  },
  {
    id: 8,
    title: "Senior Analyst (Data Scientist)",
    company: "B-Informative IT Services",
    location: "Bengaluru, KA",
    type: "Onsite",
    experience: "3-5+ Years",
    salary: "₹14L - ₹16L/Year",
    description: "Apply statistical programming and time-series forecasting to solve business questions. High level of cognitive engineering involved.",
    skills: "Python, SQL, Hadoop, Scala, Time-series Forecasting, AI",
    link: "https://optimhire.com/developers/jv/309522?ref_code=mohit-jain",
    accent: "bg-amber-600",
    postedDate: "New",
    isPremium: false
  },
  {
    id: 9,
    title: "Power BI Developer",
    company: "B-Informative IT Services",
    location: "Bengaluru, KA",
    type: "Onsite",
    experience: "5+ Years",
    salary: "₹14L - ₹17L/Year",
    description: "Develop visual reports and KPI scorecards. Implement row-level security and complex DAX queries for business analytics.",
    skills: "Power BI, DAX, SSAS, SSRS, SQL, Tableau, Data Analytics",
    link: "https://optimhire.com/developers/jv/309545?ref_code=mohit-jain",
    accent: "bg-sky-600",
    postedDate: "New",
    isPremium: false
  },
  {
    id: 10,
    title: "Social Media Marketing Executive",
    company: "Talknlock",
    location: "Jaipur, RJ",
    type: "Onsite",
    experience: "1-2 Years",
    salary: "₹3.5L - ₹4.5L/Year",
    description: "Manage social media platforms with a performance focus. Execute content calendars and track audience engagement metrics.",
    skills: "Instagram, LinkedIn, Meta Business Suite, Canva, Content Writing",
    link: "https://optimhire.com/developers/jv/309540?ref_code=mohit-jain",
    accent: "bg-rose-500",
    postedDate: "New",
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
              <TrendingUp className="w-4 h-4 text-indigo-400" /> Live Referral Roles
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-black uppercase tracking-tighter text-[#18181b] leading-[0.85] mb-6">
              Verified<br />
              <span className="text-indigo-600 stroke-text">Jobs.</span>
            </h1>
            <p className="max-w-xl text-xl font-bold text-gray-600 leading-snug border-l-8 border-indigo-600 pl-6 py-2">
              Curated premium job roles with direct referral links. Applied and verified from OptimHire partnership for 2026.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="bg-[#18181b] p-6 text-white text-center border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]">
               <span className="block text-5xl font-black">{JOBS.length}</span>
               <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mt-2 block">Active Listings</span>
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
                    High Priority
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
                      <Clock className="w-3.5 h-3.5" /> {job.postedDate}
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
                  Apply via OptimHire <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
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
            Ready to Elevate<br/> Your Career?
          </h2>
          <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto text-indigo-100">
            Get personalized career mentorship and access to high-impact roles through our referral network.
          </p>
          <Link href="/inquiry" className="inline-flex items-center gap-4 bg-yellow-300 text-[#18181b] border-[6px] border-[#18181b] px-12 py-6 text-3xl font-black uppercase tracking-widest shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] transition-all active:translate-y-2 active:shadow-none">
            Book Counselling <ExternalLink className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </div>
  );
}
