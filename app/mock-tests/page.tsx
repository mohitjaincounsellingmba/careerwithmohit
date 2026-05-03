import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Zap, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  Stethoscope, 
  Gavel, 
  Building2,
  CheckCircle2,
  Clock,
  BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mock Test Hub 2026 - 50+ Free Online Practice Papers | CareerWithMohit',
  description: 'Practice 100% free online mock tests for CAT, XAT, GMAT, SNAP, JEE, NEET, NMAT, and Govt Exams. High-quality practice papers with AI analysis, percentile prediction, and official exam interfaces.',
  keywords: ['free mock test series 2026', 'cat mock test free', 'jee main mock test online', 'neet ug practice papers', 'gmat focus edition free mock', 'ipu cet mock test online', 'ssc cgl tier 1 mock test free'],
};

const categories = [
  {
    title: "MBA & Management",
    description: "Ace top B-school entrances with our specialized test series.",
    icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
    color: "from-orange-50 to-white",
    borderColor: "border-orange-200",
    exams: [
      { name: "CAT 2026", slug: "/tools/cat-mock-test", tag: "Hot", tagColor: "bg-red-500", desc: "For IIMs & FMS" },
      { name: "XAT 2026", slug: "/tools/mock-test/xat", tag: "Expert", tagColor: "bg-primary", desc: "For XLRI & SPJIMR" },
      { name: "GMAT Focus", slug: "/tools/mock-test/gmat", desc: "For ISB & Global MBA" },
      { name: "SNAP 2026-27", slug: "/tools/mock-test/snap", desc: "For SIBM & SCMHRD" },
      { name: "NMAT 2026", slug: "/tools/nmat-mock-test", tag: "New", tagColor: "bg-blue-500", desc: "For NMIMS & SPJIMR" },
      { name: "MHCET MBA", slug: "/tools/mhcet-mock-test", desc: "For JBIMS & SIMSREE" },
    ]
  },
  {
    title: "Engineering (B.Tech)",
    description: "Crack IIT JEE and other top engineering exams with timed mocks.",
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    color: "from-blue-50 to-white",
    borderColor: "border-blue-200",
    exams: [
      { name: "JEE Main", slug: "/tools/jee-main-mock-test", desc: "For NITs & IIITs" },
      { name: "JEE Advanced", slug: "/tools/jee-advanced-mock-test", tag: "Expert", tagColor: "bg-primary", desc: "For IITs" },
      { name: "BITSAT 2026", slug: "/tools/bitsat-mock-test", desc: "For BITS Pilani" },
      { name: "VITEEE 2026", slug: "/tools/mock-test/viteee", desc: "For VIT Vellore" },
      { name: "SRMJEEE 2026", slug: "/tools/mock-test/srmjee", desc: "For SRM University" },
    ]
  },
  {
    title: "Medical & Others",
    description: "Specialized tests for Medical, Law and other professional courses.",
    icon: <Stethoscope className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-50 to-white",
    borderColor: "border-emerald-200",
    exams: [
      { name: "NEET UG", slug: "/tools/mock-test/neet", tag: "Crucial", tagColor: "bg-emerald-600", desc: "For MBBS/BDS" },
      { name: "CLAT 2026", slug: "/tools/mock-test/clat", desc: "For NLUs" },
      { name: "CUET UG", slug: "/tools/mock-test/cuet-ug", desc: "For Central Universities" },
      { name: "IPU CET (UG)", slug: "/tools/mock-test/ipu-cet-ug", tag: "Delhi", tagColor: "bg-orange-500", desc: "For BBA, BCA, B.Com" },
      { name: "IPU CET (PG)", slug: "/tools/mock-test/ipu-cet-pg", desc: "For MBA, MCA, Law" },
    ]
  },
  {
    title: "Government Exams",
    description: "Comprehensive hub for SSC, Banking, Railways, and UPSC.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-600" />,
    color: "from-yellow-50 to-white",
    borderColor: "border-yellow-200",
    isHub: true,
    exams: [
      { name: "SSC CGL", slug: "/tools/mock-test/ssc-cgl", desc: "Income Tax, CBI" },
      { name: "IBPS PO", slug: "/tools/mock-test/ibps-po", desc: "Banking Career" },
      { name: "UPSC CSE", slug: "/tools/mock-test/upsc-cse", desc: "Civil Services" },
      { name: "Visit Hub", slug: "/tools/govt-exams-mock-test", tag: "30+ Exams", tagColor: "bg-foreground", desc: "All Govt Exams Hub" },
    ]
  }
];

export default function MockTestHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Hero Section */}
        <div className="relative mb-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tight text-foreground leading-none">
            Mock Test <span className="text-primary italic">Hub</span> 2026
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium mb-10">
            India&apos;s most comprehensive free mock test platform. Simulate real exam conditions, get instant analytics, and boost your preparation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-6 py-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-bold uppercase text-sm">100% Free Access</span>
            </div>
            <div className="bg-white px-6 py-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold uppercase text-sm">Instant Score Analysis</span>
            </div>
            <div className="bg-white px-6 py-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <Target className="w-5 h-5 text-emerald-500" />
              <span className="font-bold uppercase text-sm">Latest 2026 Patterns</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {categories.map((category, idx) => (
            <section key={idx} className={`p-8 md:p-10 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 border-2 border-foreground rounded-xl bg-slate-50`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase leading-tight">{category.title}</h2>
                  <p className="text-gray-500 font-bold text-sm italic">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.exams.map((exam, eIdx) => (
                  <Link 
                    key={eIdx}
                    href={exam.slug}
                    className="group relative bg-slate-50 p-6 border-2 border-gray-200 hover:border-primary hover:bg-white transition-all overflow-hidden"
                  >
                    {exam.tag && (
                      <span className={`absolute top-0 right-0 ${exam.tagColor} text-white text-[10px] font-black uppercase px-3 py-1 italic tracking-widest`}>
                        {exam.tag}
                      </span>
                    )}
                    <h3 className="font-black text-lg mb-1 group-hover:text-primary transition-colors flex items-center justify-between">
                      {exam.name}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">{exam.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Resources & Support */}
        <div className="bg-foreground text-white p-12 border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(var(--primary-rgb),0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <BookOpen className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">Previous Year Papers</h3>
              <p className="text-gray-400 font-medium mb-6">Download authentic question papers from the last 10 years for all major exams.</p>
              <Link href="/previous-year-papers" className="inline-flex items-center gap-2 text-primary font-black uppercase text-sm hover:gap-4 transition-all">
                Access PYQ Papers <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <BarChart3 className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">College Predictors</h3>
              <p className="text-gray-400 font-medium mb-6">Based on your mock test scores, see which top colleges you can realistically target.</p>
              <Link href="/colleges" className="inline-flex items-center gap-2 text-cyan-400 font-black uppercase text-sm hover:gap-4 transition-all">
                Explore Predictors <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <Clock className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">Timed Simulation</h3>
              <p className="text-gray-400 font-medium mb-6">Our interface mimics the actual exam software to get you comfortable with the real UI.</p>
              <Link href="/inquiry" className="inline-flex items-center gap-2 text-secondary font-black uppercase text-sm hover:gap-4 transition-all">
                Get Exam Guidance <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-20 text-center border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-black uppercase mb-4">Why use our Mock Tests?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "NCERT Based", sub: "For Medical/Eng" },
              { label: "AI Analytics", sub: "Deep Performance" },
              { label: "Zero Cost", sub: "Free Forever" },
              { label: "Expert Curated", sub: "Top Educators" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-black text-xl text-primary">{stat.label}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
