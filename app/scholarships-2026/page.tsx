import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Award, GraduationCap, Globe2, HeartHandshake, BookOpen, HandCoins, Building2, Landmark, MoveRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: '/scholarships-2026',
  },
  title: 'Top Scholarships 2026 | National & International Funding',
  description: 'Explore the complete list of 2026 scholarships for Indian students. Find merit-based, means-based, MBA, engineering, and study abroad scholarships.',
};

const CATEGORIES = [
  {
    title: 'For Class 12 Passed',
    desc: 'Undergraduate scholarships for Engineering, Medical, and Commerce aspirants.',
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    color: 'bg-blue-50',
    borderColor: 'border-blue-300',
    tags: ['UG Degrees', 'B.Tech', 'BBA'],
  },
  {
    title: 'For Graduation & PG',
    desc: 'Funding for higher education including Management (MBA), Tech, and Arts.',
    icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
    color: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    tags: ['MBA/PGDM', 'M.Tech', 'Masters'],
  },
  {
    title: 'For Girls / Women',
    desc: 'Special scholarship schemes aiming to empower female education across India.',
    icon: <Award className="w-8 h-8 text-pink-600" />,
    color: 'bg-pink-50',
    borderColor: 'border-pink-300',
    tags: ['Women in STEM', 'Single Girl Child'],
  },
  {
    title: 'Merit & Means Based',
    desc: 'Financial assistance for meritorious students from economically weaker sections.',
    icon: <HandCoins className="w-8 h-8 text-amber-600" />,
    color: 'bg-amber-50',
    borderColor: 'border-amber-300',
    tags: ['EWS', 'High Scorers', 'Income based'],
  },
  {
    title: 'Government Schemes (NSP)',
    desc: 'Central and State government funded National Scholarships Portal (NSP) schemes.',
    icon: <Landmark className="w-8 h-8 text-indigo-600" />,
    color: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    tags: ['Central Govt', 'State Govt', 'Minority'],
  },
  {
    title: 'Study Abroad',
    desc: 'International scholarships for pursuing education in US, UK, Canada, Australia.',
    icon: <Globe2 className="w-8 h-8 text-cyan-600" />,
    color: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    tags: ['Ivy League', 'Chevening', 'Erasmus'],
  },
];

const SCHOLARSHIPS = [
  {
    name: 'National Scholarship Portal (NSP) - Central Schemes',
    award: 'Variable (Govt Funded)',
    eligibility: 'All Indian students (SC/ST/OBC/Minority/General)',
    deadline: 'Multiple Deadlines',
    category: 'Government',
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Reliance Foundation Undergraduate Scholarships',
    award: 'Up to INR 2 Lakhs',
    eligibility: 'Class 12 Passed (Min 60%)',
    deadline: 'October 2025',
    category: 'Merit-cum-Means',
    applyLink: 'https://www.scholarships.reliancefoundation.org/',
  },
  {
    name: 'HDFC Bank Parivartan ECSS Programme',
    award: 'Up to INR 75,000',
    eligibility: 'UG / PG Students',
    deadline: 'September 2025',
    category: 'Means-Based',
    applyLink: 'https://www.buddy4study.com/page/hdfc-bank-parivartan-ecss-programme',
  },
  {
    name: 'SBI Asha Scholarship Program',
    award: 'Up to INR 5,00,000',
    eligibility: 'MBA / PGDM Students (Top IIMs/IITs)',
    deadline: 'November 2025',
    category: 'Management',
    applyLink: 'https://www.buddy4study.com/page/sbi-asha-scholarship-program',
  },
  {
    name: 'Kotak Kanya Scholarship',
    award: 'Up to INR 1.5 Lakhs/year',
    eligibility: 'Girls pursuing professional grad courses',
    deadline: 'August 2025',
    category: 'For Women',
    applyLink: 'https://www.buddy4study.com/page/kotak-kanya-scholarship',
  },
  {
    name: 'Tata Trust Medical and Healthcare Scholarship',
    award: 'Variable (Covers Tuition)',
    eligibility: 'MBBS / Healthcare students',
    deadline: 'December 2025',
    category: 'Medical',
    applyLink: 'https://www.tatatrusts.org/our-work/individual-grants-initiative/education-grants',
  },
  {
    name: 'Chevening Scholarships (UK)',
    award: 'Fully Funded',
    eligibility: 'Graduates looking for Masters in UK',
    deadline: 'November 2025',
    category: 'Study Abroad',
    applyLink: 'https://www.chevening.org/',
  },
];

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-body pb-20">
      {/* Hero Section */}
      <div className="bg-foreground text-white border-b-8 border-amber-400 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Award className="w-64 h-64 rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <Breadcrumbs />
          </div>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Top Scholarships <br />
              <span className="text-amber-400">For 2026</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-300 leading-tight border-l-[12px] border-amber-400 pl-6 max-w-2xl">
              India's most comprehensive scholarship directory. Find funding for UG, PG, Management, and Study Abroad programs.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                href="/services" 
                className="bg-amber-400 text-foreground border-4 border-amber-400 px-8 py-4 font-black uppercase hover:bg-transparent hover:text-amber-400 transition-all flex items-center gap-2 group text-sm md:text-base"
              >
                Get Admission Guidance <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex items-center gap-4 mb-10">
          <Building2 className="w-10 h-10 text-foreground" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Browse by Category
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <div 
              key={i}
              className={`${cat.color} border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300 group`}
            >
              <div className={`w-16 h-16 bg-white border-4 border-foreground rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-black uppercase mb-3 line-clamp-1">{cat.title}</h3>
              <p className="font-bold text-slate-600 mb-6 text-sm leading-relaxed">{cat.desc}</p>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag, j) => (
                  <span key={j} className="bg-white border-2 border-foreground px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Scholarships List */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-10 border-l-[12px] border-amber-400 pl-6">
          Featured Scholarships 2026
        </h2>
        
        <div className="bg-white border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-foreground text-white uppercase text-xs font-black tracking-widest">
                <tr>
                  <th className="p-6 border-r border-white/20">Scholarship Name</th>
                  <th className="p-6 border-r border-white/20">Category</th>
                  <th className="p-6 border-r border-white/20">Award</th>
                  <th className="p-6 border-r border-white/20">Eligibility</th>
                  <th className="p-6 border-r border-white/20">Expected Deadline</th>
                  <th className="p-6">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {SCHOLARSHIPS.map((schol, i) => (
                  <tr key={i} className={`border-b-4 border-foreground hover:bg-slate-50 transition-colors ${i === SCHOLARSHIPS.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="p-6 border-r-4 border-foreground font-black text-base max-w-[300px]">
                      {schol.name}
                    </td>
                    <td className="p-6 border-r-4 border-foreground">
                      <span className="bg-amber-100 text-amber-800 border-2 border-amber-300 px-3 py-1 text-[10px] uppercase tracking-widest">
                        {schol.category}
                      </span>
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-emerald-600 font-black">
                      {schol.award}
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-slate-600">
                      {schol.eligibility}
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-rose-600 font-black">
                      {schol.deadline}
                    </td>
                    <td className="p-6">
                      <a 
                        href={schol.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-foreground text-white border-2 border-foreground px-4 py-2 text-xs font-black uppercase hover:bg-white hover:text-foreground transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                      >
                        Apply Here <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-amber-400 border-[8px] border-foreground p-8 md:p-16 relative overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute -right-20 -top-20 opacity-20 rotate-12">
            <HeartHandshake className="w-96 h-96" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
              Need Help Finding The Right Scholarship?
            </h2>
            <p className="text-lg font-bold text-amber-900 mb-10 max-w-xl">
              Don't let finances stop you from achieving your dream career. Book a session with Mohit Jain to identify the best scholarships, education loans, and fee waivers for your profile.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/services" 
                className="bg-foreground text-white border-4 border-foreground px-8 py-5 text-lg font-black uppercase hover:bg-white hover:text-foreground transition-all flex items-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] group"
              >
                Book Counselling Session <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
