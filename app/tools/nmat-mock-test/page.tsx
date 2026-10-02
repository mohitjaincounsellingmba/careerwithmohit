import { Metadata } from 'next';
import { NmatCbtMockTestClient } from '@/components/NmatMockTest/NmatCbtMockTestClient';
import { NmatExamCountdownBanner } from '@/components/NmatMockTest/NmatExamCountdownBanner';
import { NmatScoreCalculatorWidget } from '@/components/NmatMockTest/NmatScoreCalculatorWidget';
import { NmatCollegeCutoffMatcher } from '@/components/NmatMockTest/NmatCollegeCutoffMatcher';
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
  Check,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free NMAT Mock Test 2026/27 | 108 Qs CBT Practice, Score /360 & NMIMS Call Predictor',
  description: 'Attempt our 100% free full-length NMAT 2026 CBT Mock Test online. Authentic 108 questions across Language Skills (36), Quantitative Skills (36), and Logical Reasoning (36) with sectional timers, scaled score calculator out of 360, zero negative marking, and cutoffs for NMIMS Mumbai, Bengaluru, XIMB, TAPMI, and SDA Bocconi.',
  keywords: [
    'free NMAT mock test 2026',
    'NMAT mock test 2026 online free',
    'NMAT test series 2026',
    'best mock test for NMAT 2026',
    'NMAT scaled score calculator 360',
    'NMAT score vs percentile 2026',
    'NMIMS Mumbai NMAT cutoff 2027',
    'NMIMS Bangalore NMAT cutoff 2027',
    'NMAT sectional time limit',
    'free NMAT practice paper with solutions',
    'NMAT 2026 syllabus PDF',
    'NMAT language skills practice test',
    'NMAT logical reasoning mock test free',
    'NMAT quantitative skills practice sets',
    'MBA PGDM admission 2027 NMAT',
    'GMAC NMAT official practice exam free',
    'how to score 240 in NMAT 2026'
  ],
  alternates: {
    canonical: 'https://careerwithmohit.online/tools/nmat-mock-test/',
  },
  openGraph: {
    title: 'Free NMAT Mock Test 2026/27 | 108 Qs CBT Practice & NMIMS Call Predictor',
    description: 'Realistic 108-Question NMAT CBT Simulation with sectional timers, scaled score calculator out of 360, zero negative marking, and step-by-step solutions.',
    type: 'website',
    url: 'https://careerwithmohit.online/tools/nmat-mock-test',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'NMAT Mock Test 2026 & Scaled Score Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NMAT Mock Test 2026/27 | 108 Qs CBT Practice & NMIMS Call Predictor',
    description: 'Realistic 108 Questions, 120 Minutes, 3 Sections with Scaled Score Calculator out of 360 and Detailed Step-by-Step Solutions.',
    images: ['/og-image.webp'],
  }
};

const NMAT_FAQS = [
  {
    question: "What is the exam pattern, duration, and section breakdown of NMAT 2026?",
    answer: "NMAT 2026 is a 120-minute (2 hours) computer-based test consisting of 108 multiple-choice questions divided across 3 sections: Language Skills (36 questions in 28 minutes), Quantitative Skills (36 questions in 52 minutes), and Logical Reasoning (36 questions in 40 minutes). Each section has a mandatory dedicated timer."
  },
  {
    question: "Is there negative marking in the NMAT 2026 exam?",
    answer: "No, NMAT has ZERO negative marking (+3 marks for correct, 0 penalty for incorrect or skipped answers). Because there is no penalty, candidates are strongly advised to attempt all 108 questions before each section's timer expires."
  },
  {
    question: "How is the NMAT scaled score calculated out of 360?",
    answer: "NMAT converts your raw marks in each section onto a standardized scale ranging from 40 to 120 marks per section using psychometric equating. The total scaled score is the sum of the three sectional scaled scores, ranging from 120 to 360 marks."
  },
  {
    question: "What scaled score is required for NMIMS Mumbai (Main Campus) MBA Core 2027 admissions?",
    answer: "Based on recent admission rounds, a composite scaled score of 232+ marks (approx. 98+ percentile) with balanced sectional scores (Language 76+, Quants 74+, Logic 76+) is required to secure an interview shortlist for the flagship MBA Core program at NMIMS Mumbai."
  },
  {
    question: "Can I choose the order of sections in NMAT?",
    answer: "Yes, NMAT allows candidates to choose their preferred order of sections at the start of the test. However, once an order is selected, you must complete each section within its allotted time limit and cannot toggle between sections."
  },
  {
    question: "Which top B-Schools and universities accept NMAT 2026 scores for MBA/PGDM 2027?",
    answer: "NMAT is accepted by NMIMS Mumbai, NMIMS Bengaluru, NMIMS Hyderabad, NMIMS Navi Mumbai, NMIMS Indore, XIM University (XIMB Bhubaneswar for HRM), K J Somaiya Institute of Management Mumbai, TAPMI Manipal, SDA Bocconi Asia Center Mumbai, SPJIMR Mumbai (Global Management Program), Great Lakes Chennai (PGPM), Welingkar Mumbai (WeSchool), SOIL Gurgaon, ISBR Bangalore, and Alliance University."
  },
  {
    question: "How many attempts are allowed for NMAT, and does NMIMS accept retake scores?",
    answer: "Candidates can attempt NMAT up to 3 times (1 main attempt + 2 retakes) during the 70-day testing window. However, NMIMS Mumbai strictly considers only the score of your FIRST attempt for its MBA Core and MBA HR admissions. Other partner institutes (like K J Somaiya, SDA Bocconi, and XIMB) accept the best of all attempts."
  },
  {
    question: "What is the selection process at NMIMS after the NMAT score is declared?",
    answer: "Candidates shortlisted based on NMAT scores must participate in Stage 2 selection, which includes a Watson Glaser Critical Thinking Appraisal test, Case Discussion (CD), and Personal Interview (PI). Final merit is prepared by combining NMAT score, CD-PI score, academic performance (10th/12th/Graduation), and work experience."
  },
  {
    question: "How does NMAT compare in difficulty to CAT and SNAP?",
    answer: "NMAT questions are conceptually moderate compared to the heavy mathematics and multi-step DILR sets in CAT. However, NMAT is a high-speed exam with tight sectional windows (e.g., 46 seconds per question in Language Skills). SNAP has shorter total duration (60 mins for 60 Qs with negative marking), whereas NMAT provides 120 minutes with zero negative penalty."
  },
  {
    question: "How many mock tests should I practice before taking NMAT 2026?",
    answer: "Aspirants should attempt at least 15 to 25 full-length 108-question CBT mock tests. Because of strict individual section timers, developing speed in mental arithmetic, quick grammar rules, and critical reasoning assumptions is vital to score 235+."
  }
];

export default function NmatMockTestToolPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'nmat');
  
  if (!config) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NMAT Mock Test Tool & NMIMS Score Predictor (2026/2027)",
        "operatingSystem": "Web, iOS, Android, Windows, macOS",
        "applicationCategory": "EducationalApplication",
        "description": "Full-length free 108-question computer-based mock test for NMAT 2026 aspirants with sectional timers for Language, Quants, and Logic, scaled score calculator out of 360, zero negative marking, and NMIMS Mumbai call cutoffs.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "8650",
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
        "name": "Full-Length NMAT 2026 CBT Mock Test (108 Questions)",
        "about": "NMAT by GMAC Preparation for NMIMS Mumbai & Top MBA/PGDM Admissions 2027",
        "educationalLevel": "Postgraduate Entrance Exam",
        "timeRequired": "PT120M",
        "typicalAgeRange": "19-28",
        "hasPart": [
          {
            "@type": "Question",
            "name": "Language Skills Section (36 Questions - 28 Mins)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Quantitative Skills Section (36 Questions - 52 Mins)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Logical Reasoning Section (36 Questions - 40 Mins)",
            "learningResourceType": "Practice Problem"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": NMAT_FAQS.map(faq => ({
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
            "name": "NMAT Mock Test",
            "item": "https://careerwithmohit.online/tools/nmat-mock-test"
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
            <span><strong>8,650+ MBA 2027 Aspirants</strong> practiced for NMAT 2026 this week</span>
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
              Official 108-Question CBT Engine • Scaled Score /360
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-foreground">
            Free NMAT 2026/27 <span className="text-rose-600 italic">Exam</span> Mock Test
          </h1>

          <p className="text-base sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Prepare for the <strong>NMAT by GMAC Exam</strong> with real-time 120-minute countdown simulation, 108 official-standard questions across Language, Quants, and Logic, instant scaled score calculator (/360), and NMIMS Mumbai admission cutoffs.
          </p>
        </div>

        {/* NMAT Exam Countdown & Milestones Banner */}
        <NmatExamCountdownBanner />

        {/* AEO / GEO Direct AI Answer Summary Callout Block */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2.5 text-rose-600 font-black uppercase text-sm tracking-wider">
            <Sparkles className="w-5 h-5 text-accent fill-accent" />
            <span>Key Takeaways (Direct AI & Aspirant Summary)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm font-semibold text-gray-800">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Exam Structure</span>
              <p className="text-slate-900 font-bold">108 Questions • 120 Minutes (Language 36 Qs / 28m, Quants 36 Qs / 52m, Logic 36 Qs / 40m) with 0 Negative Marking.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Scaled Score /360</span>
              <p className="text-slate-900 font-bold">232+ Scaled = NMIMS Mumbai Core MBA (98%ile), 220+ = NMIMS Bangalore/Hyderabad, 205+ = XIMB / TAPMI / Somaiya.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Top 2027 B-Schools</span>
              <p className="text-slate-900 font-bold">Accepted by 5 NMIMS Campuses, XIMB (HRM), K J Somaiya, SDA Bocconi, TAPMI, SPJIMR (GMP), and Welingkar.</p>
            </div>
          </div>
        </div>

        {/* CBT Mock Test Client Engine (Registration -> 108 Qs Quiz -> Scorecard/Solutions) */}
        <div id="test-interface" className="pt-4 scroll-mt-8">
          <div className="bg-white p-6 md:p-10 rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-xl uppercase text-foreground">Interactive NMAT Mock Test Engine</h2>
                  <p className="text-xs text-gray-500 font-semibold">Strict sectional timers with full question palette & solutions</p>
                </div>
              </div>
              <span className="bg-rose-100 text-rose-900 text-xs font-black uppercase px-3 py-1 rounded-full hidden sm:inline-block border border-rose-300">
                ⚡ 108 Questions CBT
              </span>
            </div>

            <NmatCbtMockTestClient config={config} />
          </div>
        </div>

        {/* Interactive NMAT Score vs Scaled Score Calculator Widget */}
        <NmatScoreCalculatorWidget />

        {/* Interactive Top B-Schools Cutoff & ROI Matcher */}
        <NmatCollegeCutoffMatcher />

        {/* SECTION 1: EXAM PATTERN & SECTIONAL WEIGHTAGE */}
        <section id="pattern" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-rose-200">
              <Presentation className="w-4 h-4" />
              <span>Official GMAC Format</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              NMAT 2026/27 Exam Pattern & Sectional Marking Scheme
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              The NMAT by GMAC exam is standardized to evaluate language proficiency, quantitative reasoning, and logical problem solving with equal question weightage:
            </p>
          </div>

          <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-foreground text-white uppercase text-xs font-black tracking-widest">
                <tr>
                  <th className="p-4 border-r border-white/20">Section ID & Title</th>
                  <th className="p-4 border-r border-white/20 text-center">Questions</th>
                  <th className="p-4 border-r border-white/20 text-center">Strict Time Window</th>
                  <th className="p-4 border-r border-white/20 text-center">Raw Marks</th>
                  <th className="p-4 text-center">Scaled Score Range</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold divide-y-2 divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">1. Language Skills</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">36</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">28 Mins (46s / Q)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">108 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">40 – 120 Scaled</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="p-4 border-r-2 border-slate-200">2. Quantitative Skills</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">36</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">52 Mins (86s / Q)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">108 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">40 – 120 Scaled</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">3. Logical Reasoning</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">36</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">40 Mins (66s / Q)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">108 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">40 – 120 Scaled</td>
                </tr>
                <tr className="bg-primary text-white uppercase font-black tracking-wider text-base">
                  <td className="p-5 border-r-2 border-white/20">Total Exam Overview</td>
                  <td className="p-5 text-center border-r-2 border-white/20">108 Qs</td>
                  <td className="p-5 text-center border-r-2 border-white/20">120 Mins (2 Hours)</td>
                  <td className="p-5 text-center border-r-2 border-white/20">324 Marks</td>
                  <td className="p-5 text-center">120 – 360 Total Scaled</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
            <p className="font-extrabold uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Zero Negative Marking & Section Lock Rule</span>
            </p>
            <p className="leading-relaxed">
              Every correct answer awards <strong>+3.00 raw marks</strong>. There is <strong>0 negative penalty</strong> for wrong or unattempted answers. You can choose the order of sections at the beginning of the exam, but once a section begins, you must complete it before the sectional timer runs out without switching back.
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
              Section-wise Syllabus & High-Yield Topics for NMAT 2026
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Focus your preparation on the highest-weightage topics verified across past GMAC NMAT question papers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Language */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-rose-600 text-white rounded-lg flex items-center justify-center font-black text-xs">1</span>
                  <h3 className="font-black text-lg uppercase text-slate-900">Language Skills (36 Qs)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  2 RC Passages (8 Qs), Vocabulary & Antonyms/Synonyms (8 Qs), Sentence Correction & Grammar (8 Qs), Para-jumbles (4 Qs), and Prepositions/Analogies (8 Qs).
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-md inline-block">
                Target: 26+ Correct (76+ Scaled Score)
              </div>
            </div>

            {/* Quants */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-rose-600 text-white rounded-lg flex items-center justify-center font-black text-xs">2</span>
                  <h3 className="font-black text-lg uppercase text-slate-900">Quantitative Skills (36 Qs)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Arithmetic (12 Qs: TSD, Work, Percentages, P&L), Data Interpretation (10 Qs: Tables, Bar Charts, Caselets), Modern Math (P&C, Probability - 6 Qs), and Algebra/Numbers (8 Qs).
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-md inline-block">
                Target: 25+ Correct (74+ Scaled Score)
              </div>
            </div>

            {/* Logic */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-rose-600 text-white rounded-lg flex items-center justify-center font-black text-xs">3</span>
                  <h3 className="font-black text-lg uppercase text-slate-900">Logical Reasoning (36 Qs)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Critical Reasoning (12 Qs: Statement-Assumption, Strong/Weak Arguments, Course of Action), Arrangements & Puzzles (10 Qs), Blood Relations, Coding & Series (14 Qs).
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-md inline-block">
                Target: 26+ Correct (76+ Scaled Score)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 45-DAY STRATEGY FOR NMAT 2026 */}
        <section className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl border-4 border-foreground p-6 md:p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-rose-400 tracking-widest">
              Expert Blueprint by Mohit Jain
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              How to Score 235+ in NMAT: 45-Day Preparation Roadmap
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-medium">
              Proven 6-week phased strategy to maximize your scaled score and secure interview shortlists for NMIMS Mumbai Core MBA:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-rose-400 font-black text-xs uppercase tracking-wider">Weeks 1–2</span>
              <h3 className="text-base font-extrabold text-white">Speed Foundations & Diagnostics</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Take our free full CBT mock test. Identify whether your bottleneck is Language speed (46s/Q), DI table calculations, or Critical Reasoning assumptions.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-emerald-400 font-black text-xs uppercase tracking-wider">Weeks 3–4</span>
              <h3 className="text-base font-extrabold text-white">High-Yield Quants & Critical Logic</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Solve 30 Arithmetic and Modern Math (P&C/Probability) problems daily. Master statement-assumption, syllogisms, and coding patterns.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-indigo-400 font-black text-xs uppercase tracking-wider">Week 5</span>
              <h3 className="text-base font-extrabold text-white">Mock Drills & Attempt Order</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Attempt 3 full-length 120-minute CBT mocks per week. Test different section orders (e.g. Logic first or Language first) to optimize stamina and focus.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-amber-400 font-black text-xs uppercase tracking-wider">Week 6</span>
              <h3 className="text-base font-extrabold text-white">Zero Guess Penalty Strategy</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Ensure zero unattempted questions in all 3 sections. Finalize backup non-NMIMS applications (XIMB, K J Somaiya, TAPMI, SDA Bocconi, Welingkar).
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 font-medium">
              Want a customized study plan based on your academic profile and target NMIMS campus?
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20preparing%20for%20NMAT%202026%20and%20want%20a%20personalized%20study%20plan%20for%20235%2B%20NMIMS%20Mumbai."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Get Personalized 45-Day Plan</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: TEST SERIES COMPARISON (CareerWithMohit vs Official GMAC) */}
        <section id="comparison" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-rose-200">
              <Presentation className="w-4 h-4" />
              <span>Test Series Benchmarking</span>
            </div>
            <h2 className="text-3xl font-black uppercase text-foreground">
              CareerWithMohit Free NMAT Mock vs. Paid Test Series
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Aspirants frequently evaluate different mock engines before taking the official exam. Here is an honest comparison:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border-4 border-foreground p-6 bg-slate-50 rounded-2xl space-y-3">
              <h4 className="font-extrabold uppercase text-slate-900 text-base">Commercial & Paid Test Series</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-700 list-disc list-inside">
                <li><strong>Price:</strong> Paid test series (₹3,000 to ₹7,000+ for 5-10 tests).</li>
                <li><strong>Format:</strong> Standard timed questions, but often lack 1-on-1 profile shortlisting for NMIMS.</li>
                <li><strong>Feedback:</strong> Generic score breakdowns without guidance for Stage 2 CD-PI and Watson Glaser tests.</li>
              </ul>
            </div>

            <div className="border-4 border-foreground p-6 bg-rose-50/40 rounded-2xl space-y-3">
              <h4 className="font-extrabold uppercase text-rose-700 text-base">Our Free NMAT CBT Simulation Engine</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-800 list-disc list-inside">
                <li><strong>Price:</strong> 100% Free — no login barrier or paywalls.</li>
                <li><strong>Interface:</strong> Official 108-question CBT engine with realistic 28m, 52m, and 40m timers.</li>
                <li><strong>Analytics:</strong> Instant scaled score calculation (/360), percentile, and WhatsApp profile review.</li>
                <li><strong>Admissions Support:</strong> Direct guidance from Mohit Jain for application discounts and CD-PI interview prep.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (AEO & GEO Powerhouse) */}
        <section id="faqs" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-rose-200">
              <HelpCircle className="w-4 h-4" />
              <span>AEO Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              Frequently Asked Questions on NMAT 2026/27 Mock Test & NMIMS Admissions
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Quick, definitive answers to the most common queries about exam format, score calculation, and NMIMS call shortlisting.
            </p>
          </div>

          <div className="space-y-4">
            {NMAT_FAQS.map((item, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 open:bg-white open:border-foreground open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <summary className="font-extrabold text-base md:text-lg text-slate-900 flex items-center justify-between list-none">
                  <span className="flex items-center gap-3">
                    <span className="text-rose-600 font-black">Q{idx + 1}.</span>
                    <span>{item.question}</span>
                  </span>
                  <span className="text-rose-600 font-black text-xl group-open:rotate-180 transition-transform">
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

        {/* SECTION 6: MBA/PGDM 2027 ADMISSION CTA BANNER */}
        <div className="bg-primary text-white rounded-3xl border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white text-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>MBA & PGDM 2027 Admissions Desk</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              Ready to Target NMIMS Mumbai & Top B-Schools?
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
              Save up to ₹5,000 on application forms for K J Somaiya, SDA Bocconi, TAPMI, Welingkar, and XIMB. Receive 1-on-1 profile evaluation and Stage-2 CD-PI mock interview guidance from <strong>Mohit Jain</strong>.
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
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20preparing%20for%20NMAT%202026%20and%20want%20to%20apply%20for%20NMIMS%20and%20top%20MBA%2FPGDM%202027%20admissions."
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
              <span className="text-[10px] font-black uppercase text-amber-600">68 Questions</span>
              <p className="font-extrabold text-sm text-foreground mt-1">CAT 2026 Mock Test</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">IIMs & FMS Practice</p>
            </Link>

            <Link
              href="/tools/mat-mock-test/"
              className="bg-white p-4 rounded-2xl border-2 border-foreground hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] block"
            >
              <span className="text-[10px] font-black uppercase text-amber-600">150 Questions</span>
              <p className="font-extrabold text-sm text-foreground mt-1">MAT Mock Test</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Composite Score /800</p>
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
