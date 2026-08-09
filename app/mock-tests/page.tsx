import React from 'react';
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
import { JsonLd } from '@/components/JsonLd';
import { getSortedPostsData } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Free Mock Test Series 2026-2027: 50+ Practice Papers',
  description: 'Practice 100% free online mock tests for CAT 2026, XAT 2027, SNAP 2026, NMAT 2026, CMAT 2027, ATMA 2026, GMAT Focus, JEE Main, NEET, and SSC Govt Exams. Simulate real exam conditions with instant AI score analysis and percentile predictions.',
  keywords: [
    'free mock test series 2026', 'cat mock test 2026', 'xat mock test 2027', 'snap mock test 2026',
    'nmat mock test 2026', 'cmat mock test 2027', 'atma mock test 2026', 'free online test series 2027', 
    'jee main mock test online', 'neet ug practice papers', 'gmat focus edition free mock', 
    'ipu cet mock test online', 'ssc cgl tier 1 mock test free', 'best online test series india',
    'mba mock test 2026', 'pgdm entrance exam mock test 2027'
  ],
  alternates: {
    canonical: '/mock-tests',
  },
  openGraph: {
    title: 'Free Mock Test Series 2026-2027: 50+ Practice Papers',
    description: 'Practice 100% free online mock tests for CAT 2026, XAT 2027, SNAP 2026, NMAT 2026, CMAT 2027, ATMA 2026, GMAT Focus, and JEE/NEET.',
    url: 'https://www.careerwithmohit.online/mock-tests',
    type: 'website',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: 'https://www.careerwithmohit.online/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Mock Test Hub 2026-2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mock Test Series 2026-2027 - 50+ Online Practice Papers | CareerWithMohit',
    description: 'Practice 100% free online mock tests for CAT 2026, XAT 2027, SNAP 2026, NMAT 2026, CMAT 2027, and ATMA 2026.',
    images: ['/og-image.webp'],
  },
};

const categories: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  isHub?: boolean;
  exams: {
    name: string;
    slug: string;
    guideSlug?: string;
    tag?: string;
    tagColor?: string;
    desc: string;
  }[];
}[] = [
  {
    title: "MBA & Management",
    description: "Ace top B-school entrances with our specialized test series.",
    icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
    color: "from-orange-50 to-white",
    borderColor: "border-orange-200",
    exams: [
      { name: "CAT 2026", slug: "/tools/cat-mock-test", guideSlug: "/blog/free-cat-mock-test-2026", tag: "Hot", tagColor: "bg-red-500", desc: "For IIMs & FMS" },
      { name: "XAT 2027", slug: "/tools/mock-test/xat", guideSlug: "/blog/free-xat-mock-test-2026", tag: "Expert", tagColor: "bg-primary", desc: "For XLRI & SPJIMR" },
      { name: "SNAP 2026", slug: "/tools/mock-test/snap", guideSlug: "/blog/free-snap-mock-test-2026", tag: "Speed", tagColor: "bg-purple-600", desc: "For SIBM & SCMHRD" },
      { name: "NMAT 2026", slug: "/tools/nmat-mock-test", guideSlug: "/blog/free-nmat-mock-test-2026-nmims-prep", tag: "New", tagColor: "bg-blue-500", desc: "For NMIMS & SPJIMR" },
      { name: "CMAT 2027", slug: "/tools/mock-test/cmat", tag: "National", tagColor: "bg-amber-500", desc: "For JBIMS & GIM Goa" },
      { name: "ATMA 2026", slug: "/tools/atma-mock-test", guideSlug: "/blog/free-atma-mock-test-2026", tag: "Latest", tagColor: "bg-emerald-500", desc: "For JBIMS & PUMBA" },
      { name: "GMAT Focus", slug: "/tools/mock-test/gmat", guideSlug: "/blog/free-gmat-mock-test-2026", desc: "For ISB & Global MBA" },
      { name: "MHCET MBA", slug: "/tools/mhcet-mock-test", guideSlug: "/blog/free-mhcet-mock-test-2026", desc: "For JBIMS & SIMSREE" },
    ]
  },
  {
    title: "Engineering (B.Tech)",
    description: "Crack IIT JEE and other top engineering exams with timed mocks.",
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    color: "from-blue-50 to-white",
    borderColor: "border-blue-200",
    exams: [
      { name: "JEE Main", slug: "/tools/jee-main-mock-test", guideSlug: "/blog/free-jee-main-mock-test-2026", desc: "For NITs & IIITs" },
      { name: "JEE Advanced", slug: "/tools/jee-advanced-mock-test", guideSlug: "/blog/free-jee-advanced-mock-test-2026", tag: "Expert", tagColor: "bg-primary", desc: "For IITs" },
      { name: "BITSAT 2027", slug: "/tools/bitsat-mock-test", guideSlug: "/blog/free-bitsat-mock-test-2026", desc: "For BITS Pilani" },
      { name: "VITEEE 2027", slug: "/tools/mock-test/viteee", guideSlug: "/blog/free-viteee-mock-test-2026", desc: "For VIT Vellore" },
      { name: "SRMJEEE 2027", slug: "/tools/mock-test/srmjee", guideSlug: "/blog/free-srmjeee-mock-test-2026", desc: "For SRM University" },
    ]
  },
  {
    title: "Medical & Others",
    description: "Specialized tests for Medical, Law and other professional courses.",
    icon: <Stethoscope className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-50 to-white",
    borderColor: "border-emerald-200",
    exams: [
      { name: "NEET UG", slug: "/tools/mock-test/neet", guideSlug: "/blog/free-neet-mock-test-2026", tag: "Crucial", tagColor: "bg-emerald-600", desc: "For MBBS/BDS" },
      { name: "CLAT 2027", slug: "/tools/mock-test/clat", guideSlug: "/blog/free-clat-mock-test-2026", desc: "For NLUs" },
      { name: "CUET UG", slug: "/tools/mock-test/cuet-ug", guideSlug: "/blog/free-cuet-ug-general-test-mock-test-2026", desc: "For Central Universities" },
      { name: "IPU CET (UG)", slug: "/tools/mock-test/ipu-cet-ug", guideSlug: "/blog/free-ipu-cet-ug-mock-test-2026", tag: "Delhi", tagColor: "bg-orange-500", desc: "For BBA, BCA, B.Com" },
      { name: "IPU CET (PG)", slug: "/tools/mock-test/ipu-cet-pg", guideSlug: "/blog/free-ipu-cet-pg-mock-test-2026", desc: "For MBA, MCA, Law" },
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
      { name: "SSC CGL", slug: "/tools/mock-test/ssc-cgl", guideSlug: "/blog/free-ssc-cgl-mock-test-2026", desc: "Income Tax, CBI" },
      { name: "IBPS PO", slug: "/tools/mock-test/ibps-po", guideSlug: "/blog/free-ibps-po-mock-test-2026", desc: "Banking Career" },
      { name: "UPSC CSE", slug: "/tools/mock-test/upsc-cse", guideSlug: "/blog/free-upsc-cse-prelims-mock-test-2026", desc: "Civil Services" },
      { name: "Visit Hub", slug: "/tools/govt-exams-mock-test", desc: "All Govt Exams Hub" },
    ]
  },
  {
    title: "Abroad Education",
    description: "Prepare for global universities with specialized IELTS, TOEFL, SAT and GRE mocks.",
    icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-50 to-white",
    borderColor: "border-indigo-200",
    exams: [
      { name: "IELTS Academic", slug: "/tools/mock-test/ielts", guideSlug: "/blog/free-ielts-academic-mock-test-2026", tag: "Band 7+", tagColor: "bg-indigo-500", desc: "For Study Abroad" },
      { name: "Duolingo English Test", slug: "/tools/mock-test/duolingo", guideSlug: "/blog/free-duolingo-mock-test-2026", tag: "120+", tagColor: "bg-emerald-500", desc: "Adaptive Test Prep" },
      { name: "Digital SAT", slug: "/tools/mock-test/sat", guideSlug: "/blog/free-digital-sat-mock-test-2026", tag: "1400+", tagColor: "bg-blue-600", desc: "For US Undergrad" },
      { name: "TOEFL iBT", slug: "/tools/mock-test/toefl", guideSlug: "/blog/free-toefl-ibt-mock-test-2026", desc: "English Proficiency" },
      { name: "GRE General", slug: "/tools/mock-test/gre", guideSlug: "/blog/free-gre-mock-test-2026", tag: "320+", tagColor: "bg-purple-600", desc: "For MS & Global MBA" },
    ]
  }
];

export default function MockTestHubPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mock Tests",
        "item": "https://www.careerwithmohit.online/mock-tests"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the mock tests on CareerWithMohit free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all mock tests on CareerWithMohit are 100% free to access. There are no hidden fees or charges for attempting any of the practice papers."
        }
      },
      {
        "@type": "Question",
        "name": "Which exams are covered in the Mock Test Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Mock Test Hub covers a wide range of exams including MBA Entrances (CAT, XAT, NMAT, SNAP, GMAT, ATMA, MHCET), B.Tech Entrances (JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE), Medical (NEET UG), Law (CLAT), Central Universities (CUET UG & PG), Study Abroad (IELTS, TOEFL, Duolingo, GRE, SAT), and Government Exams (SSC CGL, IBPS PO, UPSC CSE, RBI Grade B, etc.)."
        }
      },
      {
        "@type": "Question",
        "name": "Do these mock tests mimic actual exam conditions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our mock tests simulate actual exam interfaces, feature timed sections where applicable, and are designed based on the latest 2027 exam patterns to provide an authentic testing experience."
        }
      },
      {
        "@type": "Question",
        "name": "Do I get score analysis after taking a test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Immediately upon submitting a test, you receive detailed performance analytics, including section-wise score breakdown, accuracy rates, and percentile predictions."
        }
      }
    ]
  };

  // Fetch blogs dynamically to build linking section
  const allPosts = getSortedPostsData();
  const mockTestBlogs = allPosts.filter(post => 
    post.slug.includes('mock-test') || 
    post.category === 'Exams' || 
    post.title.toLowerCase().includes('mock test')
  );

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Hero Section */}
        <div className="relative mb-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tight text-foreground leading-none">
            Mock Test <span className="text-primary italic">Hub</span> 2027
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
              <span className="font-bold uppercase text-sm">Latest 2027 Patterns</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {categories.map((category, idx) => (
            <section key={idx} className={`p-8 md:p-10 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform`}>
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
                  <div 
                    key={eIdx}
                    className="relative bg-slate-50 p-6 border-2 border-gray-200 hover:border-foreground hover:bg-white transition-all overflow-hidden flex flex-col justify-between"
                  >
                    {exam.tag && (
                      <span className={`absolute top-0 right-0 ${exam.tagColor} text-white text-[10px] font-black uppercase px-3 py-1 italic tracking-widest`}>
                        {exam.tag}
                      </span>
                    )}
                    <div>
                      <h3 className="font-black text-lg mb-1 text-foreground">
                        {exam.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-tight mb-4">{exam.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200/50">
                      <Link 
                        href={exam.slug}
                        className="inline-flex items-center gap-1.5 bg-foreground text-white px-3 py-1.5 text-xs font-black uppercase hover:bg-primary transition-colors border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                      >
                        Start Test <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      </Link>
                      {exam.guideSlug && (
                        <Link 
                          href={exam.guideSlug}
                          className="inline-flex items-center gap-1.5 bg-white text-foreground border-2 border-foreground px-3 py-1.5 text-xs font-black uppercase hover:bg-accent transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                        >
                          Prep Guide <BookOpen className="w-3.5 h-3.5 text-primary" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Resources & Support */}
        <div className="bg-foreground text-white p-12 border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(255,110,64,0.3)] relative overflow-hidden">
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

        {/* Dynamic Mock Test Blog Guides Section */}
        <section id="mock-test-guides" className="mt-24 mb-24">
          <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4 text-foreground">
            <BookOpen className="w-10 h-10 text-primary animate-pulse" /> Strategy & Preparation Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestBlogs.slice(0, 6).map((post, idx) => (
              <article key={idx} className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <span className="bg-accent text-foreground px-3 py-1 text-xs font-black uppercase border-2 border-foreground inline-block mb-4">
                    {post.category || 'Exam Prep'}
                  </span>
                  <h3 className="text-2xl font-black uppercase mb-4 leading-tight hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 font-bold text-sm mb-6 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-black uppercase text-sm text-primary hover:gap-4 transition-all border-t-2 border-foreground pt-4">
                  Read Full Strategy <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
          {mockTestBlogs.length > 6 && (
            <div className="mt-12 text-center">
              <Link 
                href="/blog" 
                className="inline-flex h-16 items-center justify-center bg-white border-4 border-foreground px-8 text-lg font-black text-foreground transition-all hover:bg-accent hover:translate-x-1 hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase active:shadow-none active:translate-x-0 active:translate-y-0"
              >
                View All Guides ({mockTestBlogs.length})
              </Link>
            </div>
          )}
        </section>

        {/* Popular Search Topics & Resources (SEO section) */}
        <section id="popular-searches" className="mt-24 bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" /> Frequently Searched Free Mock Tests & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2 text-sm">MBA Mocks</h4>
              <ul className="space-y-1.5 text-xs font-bold text-gray-500 uppercase tracking-tight">
                <li><Link href="/tools/cat-mock-test" className="hover:text-primary">→ Free CAT mock test 2027</Link></li>
                <li><Link href="/tools/nmat-mock-test" className="hover:text-primary">→ NMIMS NMAT practice paper</Link></li>
                <li><Link href="/tools/mock-test/xat" className="hover:text-primary">→ XAT decision making mock</Link></li>
                <li><Link href="/tools/mock-test/snap" className="hover:text-primary">→ SNAP SIBM Pune test series</Link></li>
                <li><Link href="/tools/mhcet-mock-test" className="hover:text-primary">→ MAH MBA CET online prep</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2 text-sm">Engineering & Medical</h4>
              <ul className="space-y-1.5 text-xs font-bold text-gray-500 uppercase tracking-tight">
                <li><Link href="/tools/jee-main-mock-test" className="hover:text-primary">→ IIT JEE Main mock test free</Link></li>
                <li><Link href="/tools/jee-advanced-mock-test" className="hover:text-primary">→ JEE Advanced paper simulation</Link></li>
                <li><Link href="/tools/bitsat-mock-test" className="hover:text-primary">→ BITSAT Pilani practice test</Link></li>
                <li><Link href="/tools/mock-test/neet" className="hover:text-primary">→ NEET UG biology physics chemistry</Link></li>
                <li><Link href="/tools/mock-test/viteee" className="hover:text-primary">→ VITEEE Vellore entrance mock</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2 text-sm">Study Abroad</h4>
              <ul className="space-y-1.5 text-xs font-bold text-gray-500 uppercase tracking-tight">
                <li><Link href="/tools/mock-test/ielts" className="hover:text-primary">→ IELTS academic practice test</Link></li>
                <li><Link href="/tools/mock-test/sat" className="hover:text-primary">→ Digital SAT reading math prep</Link></li>
                <li><Link href="/tools/mock-test/gre" className="hover:text-primary">→ GRE general test practice free</Link></li>
                <li><Link href="/tools/mock-test/toefl" className="hover:text-primary">→ TOEFL listening reading mock</Link></li>
                <li><Link href="/tools/mock-test/duolingo" className="hover:text-primary">→ Duolingo English test online</Link></li>
              </ul>
            </div>
            <div className="space-y-3 col-span-1 md:col-span-2 lg:col-span-3">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2 text-sm">Government Job Exams</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-xs font-bold text-gray-500 uppercase tracking-tight">
                <li><Link href="/tools/mock-test/ssc-cgl" className="hover:text-primary">→ SSC CGL Tier 1 free mock series</Link></li>
                <li><Link href="/tools/mock-test/ibps-po" className="hover:text-primary">→ IBPS bank PO prelims practice</Link></li>
                <li><Link href="/tools/mock-test/upsc-cse" className="hover:text-primary">→ UPSC Prelims GS Paper mock test</Link></li>
                <li><Link href="/tools/govt-exams-mock-test" className="hover:text-primary">→ 30+ Govt Exams practice hub</Link></li>
              </ul>
            </div>
          </div>
        </section>

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
