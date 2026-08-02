import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, FileSpreadsheet, Image, Cpu, Calculator, 
  BookOpen, GraduationCap, Briefcase, Zap, Star, ArrowRight 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Tools Hub: Converters & Calculators',
  description: 'Access 20+ free tools: file converters (Word to PDF, PNG to JPG), entrance exam calculators (CAT, XAT, JEE, CUET), college predictors, resume analyzer, mock tests and more.',
  keywords: [
    'free tools online', 'file converter', 'cat score calculator', 'jee predictor',
    'resume analyzer', 'mock test free', 'word to pdf', 'college predictor',
    'online tools free', 'career tools', 'education tools india',
    'mba admission 2027', 'pgdm admission 2027', 'degree admission 2027'
  ],
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Online Tools Hub: Converters & Calculators',
    description: 'Access 20+ free tools: file converters, exam calculators, college predictors, and resume analyzer.',
    type: 'website',
    url: '/tools',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: 'https://www.careerwithmohit.online/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Free Online Tools Hub - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools Hub: Converters & Calculators',
    description: 'Access 20+ free tools: file converters, exam calculators, and college predictors.',
    images: ['https://www.careerwithmohit.online/og-image.webp'],
  },
};

const TOOL_CATEGORIES = [
  {
    id: 'file-converter',
    category: 'File Converters',
    badge: 'Free',
    badgeColor: 'bg-emerald-500',
    accentColor: 'bg-primary',
    icon: FileText,
    tools: [
      { name: 'Word to PDF', desc: 'Convert .docx files to PDF locally', href: '/tools/file-converter', badge: 'Free', color: 'text-blue-600' },
      { name: 'PDF to Excel CSV', desc: 'Extract PDF data to spreadsheet', href: '/tools/file-converter', badge: 'Free', color: 'text-emerald-600' },
      { name: 'PNG to JPG', desc: 'Convert PNG images to JPEG format', href: '/tools/file-converter', badge: 'Free', color: 'text-amber-600' },
      { name: 'JPG to PNG', desc: 'Convert JPEG images to PNG', href: '/tools/file-converter', badge: 'Free', color: 'text-rose-600' },
      { name: 'JSON to CSV', desc: 'Flatten JSON arrays to spreadsheet', href: '/tools/file-converter', badge: 'Free', color: 'text-violet-600' },
      { name: 'TXT to PDF', desc: 'Generate PDF from plain text files', href: '/tools/file-converter', badge: 'Free', color: 'text-cyan-600' },
    ]
  },
  {
    id: 'exam-calculators',
    category: 'Entrance Exam Calculators',
    badge: 'Popular',
    badgeColor: 'bg-accent',
    accentColor: 'bg-accent',
    icon: Calculator,
    tools: [
      { name: 'CAT 2026 Score Calculator', desc: 'Response sheet check & 2027 MBA percentile', href: '/tools/cat-score-calculator', badge: 'Popular', color: 'text-amber-600' },
      { name: 'MAT May 2027 Calculator', desc: 'Composite score (out of 800) & percentile', href: '/tools/mat-score-calculator', badge: 'New', color: 'text-green-600' },
      { name: 'XAT 2027 Calculator', desc: 'Get XAT score and percentile estimate', href: '/tools/xat-score-calculator-2027', badge: null, color: 'text-orange-600' },
      { name: 'JEE Main Predictor', desc: 'Predict rank based on JEE score', href: '/calculator/jee-main-2026', badge: null, color: 'text-red-600' },
      { name: 'CUET PG MBA Tool', desc: 'Estimate CUET PG MBA cutoff rank', href: '/calculator/cuet-pg-2026', badge: null, color: 'text-cyan-600' },
      { name: 'CUET UG Predictor', desc: 'CUET UG score to admission chances', href: '/calculator/cuet-ug-2026', badge: null, color: 'text-teal-600' },
      { name: 'MHCET MBA 2027', desc: 'Maharashtra MBA entrance calculator', href: '/calculator/mhcet-mba-2026', badge: null, color: 'text-pink-600' },
    ]
  },
  {
    id: 'college-predictors',
    category: 'College Predictors',
    badge: 'New',
    badgeColor: 'bg-secondary',
    accentColor: 'bg-secondary',
    icon: GraduationCap,
    tools: [
      { name: 'B.Tech College Predictor', desc: 'JEE rank to NIT/IIIT admission chances', href: '/tools/btech-college-predictor', badge: 'Hot', color: 'text-yellow-600' },
      { name: 'MBA College Predictor', desc: 'CAT/GMAT score to top B-school match', href: '/tools/cuet-pg-mba-predictor', badge: null, color: 'text-indigo-600' },
      { name: 'BBA College Generator', desc: 'Find best BBA colleges for your score', href: '/tools/academic-calculators', badge: null, color: 'text-purple-600' },
      { name: 'College Comparison', desc: 'Side-by-side comparison of top colleges', href: '/tools/college-comparison', badge: null, color: 'text-blue-600' },
      { name: 'Accreditation Checker', desc: 'Verify college NAAC/UGC recognition', href: '/tools/accreditation-checker', badge: null, color: 'text-green-600' },
    ]
  },
  {
    id: 'career-tools',
    category: 'Career & Resume Tools',
    badge: 'AI',
    badgeColor: 'bg-violet-500',
    accentColor: 'bg-violet-500',
    icon: Briefcase,
    tools: [
      { name: 'AI Resume Analyzer', desc: 'Score your resume with full ATS audit', href: '/tools/resume-analyzer', badge: 'AI', color: 'text-violet-600' },
      { name: 'AI Skills Gap Finder', desc: 'Identify missing skills for your dream job', href: '/tools/ai-skills', badge: 'AI', color: 'text-fuchsia-600' },
      { name: 'Career Roadmap Builder', desc: 'Build a customized 6-month career plan', href: '/calculator/career-roadmap', badge: 'New', color: 'text-blue-600' },
      { name: 'Salary Slip Generator', desc: 'Generate and print professional payslips instantly', href: '/tools/salary-slip-generator', badge: 'Free', color: 'text-emerald-600' },
      { name: 'Offer Letter Generator', desc: 'Create custom startup, corporate, or executive offer letters', href: '/tools/offer-letter-generator', badge: 'Free', color: 'text-indigo-600' },
      { name: 'Hashtag Generator', desc: 'Create trending hashtags for social content', href: '/tools/hashtag-generator', badge: null, color: 'text-pink-600' },
    ]
  },
  {
    id: 'mock-tests',
    category: 'Free Mock Tests',
    badge: 'Free',
    badgeColor: 'bg-rose-500',
    accentColor: 'bg-rose-500',
    icon: BookOpen,
    tools: [
      { name: 'CAT Mock Test 2027', desc: 'Full-length CAT exam simulation', href: '/tools/cat-mock-test', badge: 'Free', color: 'text-rose-600' },
      { name: 'JEE Main Mock Test', desc: 'Physics, Chemistry, Math – all sections', href: '/tools/jee-main-mock-test', badge: 'Free', color: 'text-orange-600' },
      { name: 'JEE Advanced Mock', desc: 'Advanced-level JEE practice papers', href: '/tools/jee-advanced-mock-test', badge: 'Free', color: 'text-red-600' },
      { name: 'MHCET Mock Test', desc: 'Maharashtra MBA entrance practice test', href: '/tools/mhcet-mock-test', badge: 'Free', color: 'text-amber-600' },
      { name: 'NMAT Mock Test', desc: 'Full NMAT exam preparation pack', href: '/tools/nmat-mock-test', badge: 'Free', color: 'text-blue-600' },
      { name: 'XAT Mock Test', desc: 'XAT full-length mock with analytics', href: '/tools/mock-test', badge: 'Free', color: 'text-cyan-600' },
    ]
  },
];

export default function ToolsHubPage() {
  return (
    <div className="bg-background">

      {/* Hero Section */}
      <div className="bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="tools-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tools-grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-3 border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-slate-400 border border-white/20 px-3 py-1">
                  20+ Free Tools
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                Free Online
                <br />
                <span className="text-primary italic">Tools Hub</span>
              </h1>
              <p className="text-slate-400 font-bold text-lg max-w-xl leading-relaxed">
                File converters, exam calculators, college predictors, AI career tools and mock tests — all in one place. Always free.
              </p>
            </div>

            {/* Featured Tool Card */}
            <Link 
              href="/tools/file-converter"
              className="bg-primary border-4 border-white p-8 text-white flex flex-col gap-4 max-w-xs w-full shrink-0 hover:scale-[1.03] transition-transform"
              style={{ boxShadow: '8px 8px 0px 0px rgba(255,255,255,0.2)' }}
            >
              <span className="text-[9px] font-black tracking-widest uppercase text-white/60">⭐ Featured Tool</span>
              <FileText className="w-10 h-10" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Free File Converter</h3>
                <p className="text-white/70 text-xs font-bold mt-1">Word to PDF, PNG to JPG, JSON to CSV & more — 100% local, no uploads</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                Try it Free <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* All Tool Categories */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 space-y-20">

        {TOOL_CATEGORIES.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-foreground">
                <div className={`p-3 border-4 border-foreground text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${category.accentColor}`}>
                  <CategoryIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{category.category}</h2>
                  <span className={`text-[9px] font-black tracking-widest uppercase text-white px-2 py-0.5 border-2 border-foreground ${category.badgeColor}`}>
                    {category.badge}
                  </span>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href}
                    className="group bg-white border-4 border-foreground p-6 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className={`text-base font-black uppercase tracking-tight leading-tight ${tool.color}`}>
                        {tool.name}
                      </h3>
                      {tool.badge && (
                        <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-foreground text-white border border-foreground shrink-0 ml-2">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed flex-1">{tool.desc}</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-foreground group-hover:gap-3 transition-all">
                      Use Tool <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-primary to-secondary border-4 border-foreground p-10 md:p-16 text-white text-center" style={{ boxShadow: '12px 12px 0px 0px rgba(0,0,0,1)' }}>
          <Star className="w-10 h-10 mx-auto mb-4 text-white/70" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
            Need Personal Guidance?
          </h2>
          <p className="font-bold text-white/80 max-w-xl mx-auto mb-8 text-base">
            Our tools give you the data. Mohit Jain gives you the strategy. Book a 1-on-1 expert session for MBA, B.Tech and career admissions.
          </p>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 font-black uppercase tracking-widest text-sm border-4 border-foreground hover:scale-105 transition-transform"
            style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}
          >
            Get Expert Counselling <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
