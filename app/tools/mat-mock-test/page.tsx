import { Metadata } from 'next';
import { MatCbtMockTestClient } from '@/components/MatMockTest/MatCbtMockTestClient';
import { MatExamCountdownBanner } from '@/components/MatMockTest/MatExamCountdownBanner';
import { MatScoreCalculatorWidget } from '@/components/MatMockTest/MatScoreCalculatorWidget';
import { MatCollegeCutoffMatcher } from '@/components/MatMockTest/MatCollegeCutoffMatcher';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { 
  Clock, 
  Target, 
  Zap, 
  Presentation, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  Award, 
  TrendingUp, 
  Building2, 
  Sparkles, 
  FileText, 
  Share2, 
  MessageCircle, 
  Flame, 
  GraduationCap, 
  ShieldCheck,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free MAT Mock Test 2026/27 (Dec Exam) | 150 Qs CBT Practice & Score /800',
  description: 'Practice free full-length December MAT Mock Test 2026/2027. 150 official questions, 120-min CBT timer, instant composite score out of 800, score vs percentile calculator, and admission cutoffs for 600+ MBA/PGDM 2027 colleges (PUMBA, Welingkar, BIMTECH, XIME).',
  keywords: [
    'December MAT mock test 2026',
    'December MAT exam 2026',
    'free MAT mock test 2026 2027',
    'Dec MAT 2026 practice paper',
    'MAT mock test 150 questions online',
    'MAT composite score calculator 800',
    'MAT score vs percentile 2026 2027',
    'PUMBA Dec MAT cutoff 2027',
    'Welingkar Dec MAT cutoff 2027',
    'BIMTECH Greater Noida Dec MAT cutoff',
    'XIME Bangalore Dec MAT cutoff',
    'MAT CBT practice paper with solutions',
    'MBA PGDM admission 2027 MAT',
    'AIMA MAT syllabus 2026 2027',
    'MAT test series free online'
  ],
  alternates: {
    canonical: 'https://careerwithmohit.online/tools/mat-mock-test/',
  },
  openGraph: {
    title: 'Free MAT Mock Test 2026/27 (Dec Exam) | 150 Qs CBT Practice & Score /800',
    description: '150 Official Questions, 120 Minutes, 5 Timed Sections with Instant Scaled Composite Score out of 800, Percentile Predictor, and Step-by-Step Solutions.',
    type: 'website',
    url: 'https://careerwithmohit.online/tools/mat-mock-test',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'December MAT Mock Test & Score Calculator 2026-2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free MAT Mock Test 2026/27 (Dec Exam) | 150 Qs CBT Practice & Score /800',
    description: '150 Questions, 120 Minutes, 5 Sections with Composite Score Predictor out of 800 and Detailed Step-by-Step Solutions.',
    images: ['/og-image.webp'],
  }
};

const MAT_FAQS = [
  {
    question: "What is the structure of the December MAT 2026/2027 exam?",
    answer: "The December MAT exam consists of 150 multiple-choice questions divided across 5 sections: Language Comprehension (30), Intelligence & Critical Reasoning (30), Data Analysis & Sufficiency (30), Mathematical Skills (30), and Economic & Business Environment (30) with a total time duration of 120 minutes (2 hours)."
  },
  {
    question: "How is the MAT composite score calculated out of 800 in the December session?",
    answer: "MAT composite score is calculated using the first 4 core sections (Language, Intelligence, Data Analysis, and Math Skills) carrying 120 total raw marks. Each correct answer awards +1.00 mark and incorrect answers attract a penalty of -0.25 marks. This raw score is statistically scaled onto a standard composite scale ranging from 199 to 801 (out of 800)."
  },
  {
    question: "Does the Indian & Global Environment (GK) section count in the December MAT composite score?",
    answer: "No, AIMA does not add marks from the Economic & Business Environment (GK) section into the 800 composite score. It is reported separately on your scorecard. However, top B-schools (like Welingkar and BIMTECH) review your GK sectional score during GD-PI rounds."
  },
  {
    question: "Which top B-Schools accept December MAT scores for MBA & PGDM 2027 admissions?",
    answer: "Over 600+ AICTE-approved B-Schools accept December MAT scores for 2027 admissions, including PUMBA Pune (95+%ile), Welingkar Mumbai & Bengaluru (95+%ile), BIMTECH Greater Noida (90+%ile), XIME Bangalore (90+%ile), Jaipuria Institute of Management (85+%ile), JIMS Kalkaji/Rohini (85+%ile), NDIM New Delhi (80+%ile), Christ University, and SIES Mumbai."
  },
  {
    question: "What is considered a good MAT composite score for top MBA colleges in December MAT?",
    answer: "A composite score of 650+ (95+ percentile) is considered excellent for Tier-1 colleges like Welingkar Mumbai and PUMBA Pune. A score of 600+ (90+ percentile) ensures call shortlists for BIMTECH and XIME, while 520-590 (80-89 percentile) is safe for Jaipuria, JIMS, NDIM, and IPE Hyderabad."
  },
  {
    question: "Can I take MAT in both CBT (Computer-Based) and PBT (Paper-Based) modes in December?",
    answer: "Yes, AIMA allows candidates to appear for both PBT and CBT in the December testing cycle by paying an additional registration fee. Candidates can select up to 7 management institutes to receive their official scores directly."
  },
  {
    question: "Why is December MAT the most popular session for MBA 2027 aspirants?",
    answer: "December MAT takes place right after CAT, making it the primary backup and score-booster exam for aspirants aiming for top MBA and PGDM programs. Premier B-Schools evaluate December MAT scores for their main Round 1 and Round 2 admission shortlists."
  },
  {
    question: "Is December MAT easier than CAT, XAT, or CMAT?",
    answer: "Yes, MAT questions are generally moderate in difficulty compared to CAT and XAT. However, MAT is a high-speed exam requiring candidates to solve 150 questions in 120 minutes (approx. 48 seconds per question), making speed and accuracy crucial."
  }
];

export default function MatMockTestToolPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'mat');
  
  if (!config) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "December MAT Exam Mock Test Tool & Score Predictor (2026/2027)",
        "operatingSystem": "Web, iOS, Android, Windows, macOS",
        "applicationCategory": "EducationalApplication",
        "description": "Full-length free 150-question computer-based mock test for AIMA MAT (December, February, May, and September sessions) with scaled composite score out of 800, score vs percentile calculator, and MBA 2027 college cutoffs.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "4820",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Mohit Jain",
          "jobTitle": "Senior MBA Admissions Consultant",
          "url": "https://careerwithmohit.online/about"
        }
      },
      {
        "@type": "Quiz",
        "name": "Full-Length December MAT CBT Mock Test 2026/2027",
        "about": "Management Aptitude Test (MAT) Preparation for MBA & PGDM Admissions 2027",
        "educationalLevel": "Postgraduate Entrance Exam",
        "timeRequired": "PT120M",
        "typicalAgeRange": "19-28",
        "hasPart": [
          {
            "@type": "Question",
            "name": "Language Comprehension (30 Questions)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Intelligence & Critical Reasoning (30 Questions)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Data Analysis & Sufficiency (30 Questions)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Mathematical Skills (30 Questions)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Economic & Business Environment (30 Questions)",
            "learningResourceType": "Practice Problem"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": MAT_FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://careerwithmohit.online/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Free Mock Tests",
            "item": "https://careerwithmohit.online/mock-tests"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "December MAT Mock Test",
            "item": "https://careerwithmohit.online/tools/mat-mock-test"
          }
        ]
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Social Proof Live Ticker */}
        <div className="flex items-center justify-between bg-accent/30 border-2 border-foreground rounded-2xl px-4 py-2 text-xs font-bold text-foreground">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
            <span><strong>4,820+ MBA 2027 Aspirants</strong> practiced for December MAT this week</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-black uppercase">
              100% Free • No Login Barrier
            </span>
            <span className="text-gray-500">Updated for 2026/2027 Pattern</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase tracking-widest text-sm md:text-base text-foreground">
              Official 150-Question CBT Engine • Scaled Score /800
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-foreground">
            Free MAT 2026/27 <span className="text-primary italic">Exam</span> Mock Test
          </h1>

          <p className="text-base sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Prepare for the upcoming <strong>December MAT Exam</strong> with real-time 120-minute countdown simulation, 150 official-standard questions across 5 sections, instant composite score calculator (/800), and top MBA/PGDM 2027 college cutoffs.
          </p>
        </div>

        {/* December MAT Countdown & Milestones Banner */}
        <MatExamCountdownBanner />

        {/* AEO / GEO Direct AI Answer Summary Callout Block */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2.5 text-primary font-black uppercase text-sm tracking-wider">
            <Sparkles className="w-5 h-5 text-accent fill-accent" />
            <span>Key Takeaways (Direct AI & Aspirant Summary)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm font-semibold text-gray-800">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Exam Structure</span>
              <p className="text-slate-900 font-bold">150 Questions • 120 Minutes (5 Sections × 30 Qs) with +1.00 and -0.25 Marking Scheme.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Composite Score /800</span>
              <p className="text-slate-900 font-bold">Calculated from 4 core sections (120 marks). Scaled score ranges from 199 to 801 (800 max).</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Top 2027 B-Schools</span>
              <p className="text-slate-900 font-bold">Accepted by PUMBA Pune, Welingkar Mumbai (95+%ile), BIMTECH (90+), XIME, JIMS, and Jaipuria.</p>
            </div>
          </div>
        </div>

        {/* CBT Mock Test Client Engine (Registration -> 150 Qs Quiz -> Scorecard/Solutions) */}
        <div id="test-interface" className="pt-4 scroll-mt-8">
          <div className="bg-white p-6 md:p-10 rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-xl uppercase text-foreground">Interactive MAT Mock Test Engine</h2>
                  <p className="text-xs text-gray-500 font-semibold">Select your target testing window and start your free test</p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-900 text-xs font-black uppercase px-3 py-1 rounded-full hidden sm:inline-block border border-amber-300">
                ⚡ 150 Questions CBT
              </span>
            </div>

            <MatCbtMockTestClient config={config} />
          </div>
        </div>

        {/* Interactive MAT Score vs Percentile Calculator Widget */}
        <MatScoreCalculatorWidget />

        {/* Interactive Top B-Schools Cutoff & ROI Matcher */}
        <MatCollegeCutoffMatcher />

        {/* SECTION 1: EXAM PATTERN & SECTIONAL WEIGHTAGE */}
        <section id="pattern" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-primary/30">
              <Presentation className="w-4 h-4" />
              <span>Official AIMA Format</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              December MAT 2026/27 Exam Pattern & Marking Scheme
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              The Management Aptitude Test is standardized by AIMA to assess core managerial and analytical competencies. Below is the section-by-section breakdown:
            </p>
          </div>

          <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-foreground text-white uppercase text-xs font-black tracking-widest">
                <tr>
                  <th className="p-4 border-r border-white/20">Section ID & Title</th>
                  <th className="p-4 border-r border-white/20 text-center">Questions</th>
                  <th className="p-4 border-r border-white/20 text-center">Suggested Time</th>
                  <th className="p-4 border-r border-white/20 text-center">Raw Marks</th>
                  <th className="p-4 text-center">Counted in Composite /800?</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold divide-y-2 divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">1. Language Comprehension</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">25 Mins</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">✅ Yes</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="p-4 border-r-2 border-slate-200">2. Intelligence & Critical Reasoning</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">25 Mins</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">✅ Yes</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">3. Data Analysis & Sufficiency</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">30 Mins</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">✅ Yes</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="p-4 border-r-2 border-slate-200">4. Mathematical Skills</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">30 Mins</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">✅ Yes</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">
                    5. Economic & Business Environment (GK)
                  </td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">10 Mins</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">30 Marks</td>
                  <td className="p-4 text-center text-amber-600 font-black">⚠️ Reported Separately</td>
                </tr>
                <tr className="bg-primary text-white uppercase font-black tracking-wider text-base">
                  <td className="p-5 border-r-2 border-white/20">Total Exam Overview</td>
                  <td className="p-5 text-center border-r-2 border-white/20">150 Qs</td>
                  <td className="p-5 text-center border-r-2 border-white/20">120 Mins</td>
                  <td className="p-5 text-center border-r-2 border-white/20">150 Marks</td>
                  <td className="p-5 text-center">Composite /800</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
            <p className="font-extrabold uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Marking Scheme & Negative Penalty Rule</span>
            </p>
            <p className="leading-relaxed">
              Every correct question awards <strong>+1.00 mark</strong>. Every incorrect attempt results in a deduction of <strong>-0.25 marks</strong> (25% negative marking). Unattempted questions carry zero penalty. Because the GK section does not affect your 800 composite score, your speed and accuracy in the first 4 sections are the primary drivers of your national percentile.
            </p>
          </div>
        </section>

        {/* SECTION 2: SECTION-BY-SECTION SYLLABUS & HIGH-FREQUENCY TOPICS */}
        <section id="syllabus" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-300">
              <BookOpen className="w-4 h-4" />
              <span>Syllabus Breakdown</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              Section-wise Syllabus & High-Yield Topics for December MAT
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Focus your preparation on the highest-weightage question formats verified across past MAT question papers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lang */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">1</span>
                <h3 className="font-black text-lg uppercase text-slate-900">Language Comprehension</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                RC Passages (4-5 passages on business, society & economy), Para-jumbles, Sentence Correction, Vocabulary (Synonyms/Antonyms), Idioms, and Critical Fill in the Blanks.
              </p>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 22+ Correct in 25 Mins
              </div>
            </div>

            {/* Intelligence */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">2</span>
                <h3 className="font-black text-lg uppercase text-slate-900">Intelligence & Critical Reasoning</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Blood Relations, Coding-Decoding, Seating Arrangements, Direction Sense, Statement-Assumption, Syllogisms, Course of Action, and Cause & Effect deductions.
              </p>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 24+ Correct in 25 Mins
              </div>
            </div>

            {/* Data Analysis */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">3</span>
                <h3 className="font-black text-lg uppercase text-slate-900">Data Analysis & Sufficiency</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Bar Charts, Pie Charts, Line Graphs, Tables, Caselets, Data Sufficiency statements, and Venn Diagrams with quick ratio and percentage calculations.
              </p>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 20+ Correct in 30 Mins
              </div>
            </div>

            {/* Math Skills */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">4</span>
                <h3 className="font-black text-lg uppercase text-slate-900">Mathematical Skills</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Arithmetic (Percentages, Profit & Loss, Ratio, TSD, Time & Work), Algebra (Linear/Quadratic equations), Geometry, Mensuration, Number Systems, and Modern Math.
              </p>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 18+ Correct in 30 Mins
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 30-DAY STRATEGY FOR DECEMBER MAT */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border-4 border-foreground p-6 md:p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-amber-400 tracking-widest">
              Expert Blueprint by Mohit Jain
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              How to Score 650+ in December MAT Exam: 30-Day Strategy
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-medium">
              Proven 4-week roadmap to maximize your composite score and secure early admission into premier MBA/PGDM colleges:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-amber-400 font-black text-xs uppercase tracking-wider">Week 1</span>
              <h3 className="text-base font-extrabold text-white">Diagnostic & Speed Foundations</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Take our free full-length mock test to identify weak areas. Master Vedic math shortcuts, percentage tables, and reciprocal fractions (1/2 to 1/20).
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-emerald-400 font-black text-xs uppercase tracking-wider">Week 2</span>
              <h3 className="text-base font-extrabold text-white">Sectional Drills & High-Yield Quant</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Solve 40 Arithmetic questions daily. Practice 4 sets of DI tables and graphs. Build speed in coding-decoding and seating arrangements.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-indigo-400 font-black text-xs uppercase tracking-wider">Week 3</span>
              <h3 className="text-base font-extrabold text-white">Time Management & CBT Mocks</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Attempt 3 full-length 120-min CBT mock tests under strict exam conditions. Analyze errors and skip questions taking longer than 60 seconds.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-rose-400 font-black text-xs uppercase tracking-wider">Week 4</span>
              <h3 className="text-base font-extrabold text-white">Final Polish & College Shortlist</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Review mistakes, revise formula sheets, read current business GK, and shortlist target B-Schools for MBA/PGDM 2027 application rounds.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 font-medium">
              Want a customized study plan based on your background? Get in touch with Mohit Jain.
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20a%20personalized%20December%20MAT%20preparation%20study%20plan%20for%20MBA%202027."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Get Personalized 30-Day Plan</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (AEO & GEO Powerhouse) */}
        <section id="faqs" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-primary/30">
              <HelpCircle className="w-4 h-4" />
              <span>AEO Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              Frequently Asked Questions on December MAT 2026/27
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Quick, definitive answers to the most common queries about exam format, composite score calculation, and MBA admissions.
            </p>
          </div>

          <div className="space-y-4">
            {MAT_FAQS.map((item, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 open:bg-white open:border-foreground open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <summary className="font-extrabold text-base md:text-lg text-slate-900 flex items-center justify-between list-none">
                  <span className="flex items-center gap-3">
                    <span className="text-primary font-black">Q{idx + 1}.</span>
                    <span>{item.question}</span>
                  </span>
                  <span className="text-primary font-black text-xl group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-200 text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                  <strong className="text-slate-950 font-bold block mb-1">Direct Answer:</strong>
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* SECTION 5: MBA/PGDM 2027 ADMISSION CTA BANNER */}
        <div className="bg-primary text-white rounded-3xl border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white text-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>MBA & PGDM 2027 Admissions Desk</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              Ready to Secure Your Seat in a Top AICTE B-School?
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
              Save up to ₹5,000 on application forms, receive free GD-PI mock interview training, and get guaranteed profile shortlisting by <strong>Mohit Jain</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/mba-application-form-discount/"
              className="bg-white hover:bg-slate-100 text-foreground px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
            >
              Application Form Discounts
            </Link>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20preparing%20for%20December%20MAT%20and%20want%20to%20apply%20for%20MBA%2FPGDM%202027%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Mohit Jain</span>
            </a>
          </div>
        </div>

        {/* RELATED MOCK TESTS CAROUSEL / LINKS */}
        <div className="bg-slate-50 border-4 border-foreground rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span>More Free MBA Mock Tests & National Prep Tools</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/tools/cat-mock-test/"
              className="bg-white p-4 rounded-2xl border-2 border-foreground hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] block"
            >
              <span className="text-[10px] font-black uppercase text-amber-600">66 Questions</span>
              <p className="font-extrabold text-sm text-foreground mt-1">CAT 2026 Mock Test</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">IIMs & FMS Practice</p>
            </Link>

            <Link
              href="/tools/nmat-mock-test/"
              className="bg-white p-4 rounded-2xl border-2 border-foreground hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] block"
            >
              <span className="text-[10px] font-black uppercase text-blue-600">Adaptive Engine</span>
              <p className="font-extrabold text-sm text-foreground mt-1">NMAT 2026 Mock Test</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">NMIMS Cutoff Matcher</p>
            </Link>

            <Link
              href="/tools/gmat-mock-test/"
              className="bg-white p-4 rounded-2xl border-2 border-foreground hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] block"
            >
              <span className="text-[10px] font-black uppercase text-indigo-600">Focus Edition</span>
              <p className="font-extrabold text-sm text-foreground mt-1">GMAT Mock Test</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">ISB & Global B-Schools</p>
            </Link>

            <Link
              href="/tools/mhcet-mock-test/"
              className="bg-white p-4 rounded-2xl border-2 border-foreground hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] block"
            >
              <span className="text-[10px] font-black uppercase text-emerald-600">200 Questions</span>
              <p className="font-extrabold text-sm text-foreground mt-1">MAH MBA CET Mock</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">JBIMS & SIMSREE Cutoff</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
