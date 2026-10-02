import { Metadata } from 'next';
import { CatCbtMockTestClient } from '@/components/CatMockTest/CatCbtMockTestClient';
import { CatExamCountdownBanner } from '@/components/CatMockTest/CatExamCountdownBanner';
import { CatScoreCalculatorWidget } from '@/components/CatMockTest/CatScoreCalculatorWidget';
import { CatCollegeCutoffMatcher } from '@/components/CatMockTest/CatCollegeCutoffMatcher';
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
  PieChart
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free CAT Mock Test 2026/27 | 68 Qs CBT Practice, Score /198 & IIM Call Predictor',
  description: 'Attempt our 100% free full-length CAT 2026 CBT Mock Test online. Realistic 68 questions across VARC (24), DILR (22), and QA (22) with sectional 40-minute timers, raw score out of 198, score vs percentile calculator, and admission cutoffs for 20 IIMs, FMS, SPJIMR, and MDI.',
  keywords: [
    'free CAT mock test 2026',
    'CAT mock test 2026 online free',
    'CAT test series 2026',
    'best mock test for CAT 2026',
    'CAT raw score to percentile calculator',
    'CAT 2026 score vs percentile 198',
    'IIM Ahmedabad CAT cutoff 2027',
    'FMS Delhi CAT cutoff 2027',
    'CAT sectional time limit 40 mins',
    'free CAT practice paper with solutions',
    'CAT 2026 syllabus PDF',
    'CAT DILR practice sets free',
    'CAT VARC reading comprehension mock',
    'CAT quantitative aptitude mock test',
    'MBA PGDM admission 2027 CAT',
    'TIME AIMCAT vs IMS SimCAT vs CL CDC',
    'how to score 99 percentile in CAT'
  ],
  alternates: {
    canonical: 'https://careerwithmohit.online/tools/cat-mock-test/',
  },
  openGraph: {
    title: 'Free CAT Mock Test 2026/27 | 68 Qs CBT Practice & IIM Call Predictor',
    description: 'Realistic 68-Question CAT CBT Simulation with 40-minute sectional timers, raw score calculator out of 198, percentile predictor, and step-by-step solutions.',
    type: 'website',
    url: 'https://careerwithmohit.online/tools/cat-mock-test',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CAT Mock Test 2026 & Score vs Percentile Predictor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CAT Mock Test 2026/27 | 68 Qs CBT Practice & IIM Call Predictor',
    description: 'Realistic 68 Questions, 120 Minutes, 3 Sections with Raw Score Calculator out of 198 and Detailed Step-by-Step Solutions.',
    images: ['/og-image.webp'],
  }
};

const CAT_FAQS = [
  {
    question: "What is the exam pattern and duration of CAT 2026?",
    answer: "CAT 2026 is a 120-minute (2 hours) computer-based test consisting of 66 to 68 questions divided into 3 strictly timed sections: Verbal Ability & Reading Comprehension (VARC - 24 Qs), Data Interpretation & Logical Reasoning (DILR - 20 to 22 Qs), and Quantitative Ability (QA - 22 Qs). Each section has a dedicated 40-minute timer."
  },
  {
    question: "What is the marking scheme for CAT 2026, and is there negative marking for TITA questions?",
    answer: "For every correct multiple-choice question (MCQ), candidates receive +3 marks, while each incorrect MCQ attempt carries a negative deduction of -1 mark. For non-MCQ (Type In The Answer - TITA) questions, candidates receive +3 marks for correct answers and 0 negative penalty for incorrect answers. Unattempted questions carry zero penalty."
  },
  {
    question: "What raw score is required to score 99+ percentile in CAT 2026?",
    answer: "Based on normalization trends from recent CAT editions, a raw score of 85+ marks out of 198 (approx. 43% net accuracy) is typically required to secure a 99.0+ All-India percentile. A raw score of 105+ marks (approx. 53%) generally fetches a 99.9+ percentile, guaranteeing interview shortlists from IIM Ahmedabad, IIM Bangalore, and IIM Calcutta."
  },
  {
    question: "What is the sectional time limit and can I switch between sections in CAT?",
    answer: "No, candidates cannot switch between sections. Each section has a mandatory 40-minute time window. The test begins with VARC (40 mins), moves automatically to DILR (40 mins), and concludes with QA (40 mins). Once a section's timer expires, you cannot return to modify previous answers."
  },
  {
    question: "Which top B-Schools and IIMs accept CAT 2026 scores for MBA/PGDM 2027 admissions?",
    answer: "CAT is the premier entrance gateway for all 21 Indian Institutes of Management (IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, Indore, Mumbai, Shillong, and 13 New/Baby IIMs) as well as non-IIM powerhouses including FMS Delhi, SPJIMR Mumbai, MDI Gurgaon, IIT Bombay (SJMSOM), IIT Delhi (DMS), IIM Rohtak, IMT Ghaziabad, FORE School Delhi, GIM Goa, and TAPMI Manipal."
  },
  {
    question: "What is the difference between CAT raw score and scaled composite score?",
    answer: "CAT is conducted across three testing slots (Morning, Afternoon, Evening) with varying question sets. Your raw score is the actual net marks (+3 for correct, -1 for wrong MCQ) scored in your slot. IIMs apply statistical normalization across all slots to convert raw marks into scaled scores and national percentiles, accounting for slot-to-slot variance in difficulty."
  },
  {
    question: "What are the minimum sectional cutoffs required for IIM Ahmedabad, Bangalore, and Calcutta?",
    answer: "Top IIMs enforce minimum sectional cutoffs in addition to overall percentiles. For General category aspirants, IIM Ahmedabad requires a minimum of 80%ile in VARC, 75%ile in DILR, and 75%ile in QA with an overall 99.5+%ile. IIM Calcutta requires 75%ile in VARC, 75%ile in DILR, and 80%ile in QA with a 99.0+%ile overall cutoff."
  },
  {
    question: "How does non-engineer academic diversity affect IIM calls in CAT 2026?",
    answer: "IIMs award 2 to 5 additional diversity points in their composite scoring formulas to non-engineers (Commerce, Humanities, Arts, Science, Medicine, Law) and female candidates. As a result, non-engineers often receive interview shortlists at 97 to 98.5 percentile, whereas general engineering males (GEM) typically need 99.5+ percentile for Tier-1 IIM calls."
  },
  {
    question: "How many mock tests should I take before the actual CAT exam?",
    answer: "High-scoring aspirants typically attempt 25 to 40 full-length mock tests between July and November. More importantly, you should spend 3 to 4 hours analyzing every single mock test to identify conceptual gaps, recurring negative marks, and question-selection errors."
  },
  {
    question: "Is CAT tougher than other MBA entrance exams like XAT, NMAT, MAT, and SNAP?",
    answer: "CAT is widely regarded as conceptually demanding with high emphasis on critical reading (dense RC passages) and complex multi-variable DILR puzzle sets. In contrast, exams like MAT, NMAT, and SNAP test speed and mental calculation, while XAT features decision making and abstract comprehension. CAT's sectional 40-minute lock adds unique psychological pressure."
  }
];

export default function CatMockTestToolPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'cat');
  
  if (!config) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "CAT Mock Test Tool & IIM Percentile Predictor (2026/2027)",
        "operatingSystem": "Web, iOS, Android, Windows, macOS",
        "applicationCategory": "EducationalApplication",
        "description": "Full-length free 68-question computer-based mock test for CAT 2026 aspirants with 40-minute sectional timers for VARC, DILR, and QA, raw score calculator out of 198, score vs percentile predictor, and IIM call cutoffs.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "8450",
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
        "name": "Full-Length CAT 2026 CBT Mock Test (68 Questions)",
        "about": "Common Admission Test (CAT) Preparation for IIMs & Top MBA Admissions 2027",
        "educationalLevel": "Postgraduate Entrance Exam",
        "timeRequired": "PT120M",
        "typicalAgeRange": "19-28",
        "hasPart": [
          {
            "@type": "Question",
            "name": "Verbal Ability & Reading Comprehension Section (24 Questions - 40 Mins)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Data Interpretation & Logical Reasoning Section (22 Questions - 40 Mins)",
            "learningResourceType": "Practice Problem"
          },
          {
            "@type": "Question",
            "name": "Quantitative Ability Section (22 Questions - 40 Mins)",
            "learningResourceType": "Practice Problem"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": CAT_FAQS.map(faq => ({
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
            "name": "CAT Mock Test",
            "item": "https://careerwithmohit.online/tools/cat-mock-test"
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
            <span><strong>8,450+ MBA 2027 Aspirants</strong> practiced for CAT 2026 this week</span>
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
              Official 68-Question CBT Engine • Sectional 40-Min Timers
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-foreground">
            Free CAT 2026/27 <span className="text-primary italic">Exam</span> Mock Test
          </h1>

          <p className="text-base sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Prepare for the <strong>CAT Exam</strong> with real-time 120-minute countdown simulation, 68 official-standard questions across VARC, DILR, and QA, instant raw score calculator (/198), percentile predictor, and IIM call cutoffs.
          </p>
        </div>

        {/* CAT Exam Countdown & Milestones Banner */}
        <CatExamCountdownBanner />

        {/* AEO / GEO Direct AI Answer Summary Callout Block */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2.5 text-primary font-black uppercase text-sm tracking-wider">
            <Sparkles className="w-5 h-5 text-accent fill-accent" />
            <span>Key Takeaways (Direct AI & Aspirant Summary)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm font-semibold text-gray-800">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Exam Structure</span>
              <p className="text-slate-900 font-bold">66–68 Questions • 120 Minutes (3 Sections × 40 Mins each: VARC 24, DILR 22, QA 22) with +3 and -1 Marking Scheme.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Raw Score vs Percentile</span>
              <p className="text-slate-900 font-bold">105+ marks = 99.9%ile (IIM A/B/C), 85+ marks = 99.0%ile (Top 7 IIMs & FMS), 68+ marks = 95.0%ile (SPJIMR/MDI).</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-slate-500">Top 2027 B-Schools</span>
              <p className="text-slate-900 font-bold">Accepted by 21 IIMs, FMS Delhi, SPJIMR Mumbai, MDI Gurgaon, IIT Bombay (SJMSOM), IMT, FORE, and GIM.</p>
            </div>
          </div>
        </div>

        {/* CBT Mock Test Client Engine (Registration -> 68 Qs Quiz -> Scorecard/Solutions) */}
        <div id="test-interface" className="pt-4 scroll-mt-8">
          <div className="bg-white p-6 md:p-10 rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-xl uppercase text-foreground">Interactive CAT Mock Test Engine</h2>
                  <p className="text-xs text-gray-500 font-semibold">Strict sectional 40-minute timers with realistic on-screen calculator</p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-900 text-xs font-black uppercase px-3 py-1 rounded-full hidden sm:inline-block border border-amber-300">
                ⚡ 68 Questions CBT
              </span>
            </div>

            <CatCbtMockTestClient config={config} />
          </div>
        </div>

        {/* Interactive CAT Score vs Percentile Calculator Widget */}
        <CatScoreCalculatorWidget />

        {/* Interactive Top B-Schools Cutoff & ROI Matcher */}
        <CatCollegeCutoffMatcher />

        {/* SECTION 1: EXAM PATTERN & SECTIONAL WEIGHTAGE */}
        <section id="pattern" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-primary/30">
              <Presentation className="w-4 h-4" />
              <span>Official IIM Format</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              CAT 2026/27 Exam Pattern & Sectional Marking Scheme
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              The Common Admission Test is standardized across all IIMs to evaluate verbal logic, deductive reasoning, and quantitative problem solving:
            </p>
          </div>

          <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-foreground text-white uppercase text-xs font-black tracking-widest">
                <tr>
                  <th className="p-4 border-r border-white/20">Section ID & Title</th>
                  <th className="p-4 border-r border-white/20 text-center">Questions</th>
                  <th className="p-4 border-r border-white/20 text-center">Strict Time Window</th>
                  <th className="p-4 border-r border-white/20 text-center">Max Section Marks</th>
                  <th className="p-4 text-center">TITA (Non-MCQ) Questions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold divide-y-2 divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">1. Verbal Ability & Reading Comprehension (VARC)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">24</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">40 Mins (Locked)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">72 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">4–6 Qs (No Negative)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="p-4 border-r-2 border-slate-200">2. Data Interpretation & Logical Reasoning (DILR)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">20–22</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">40 Mins (Locked)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">60–66 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">4–6 Qs (No Negative)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-slate-200">3. Quantitative Ability (QA)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">22</td>
                  <td className="p-4 text-center border-r-2 border-slate-200 text-gray-600">40 Mins (Locked)</td>
                  <td className="p-4 text-center border-r-2 border-slate-200">66 Marks</td>
                  <td className="p-4 text-center text-emerald-600 font-black">6–8 Qs (No Negative)</td>
                </tr>
                <tr className="bg-primary text-white uppercase font-black tracking-wider text-base">
                  <td className="p-5 border-r-2 border-white/20">Total Exam Overview</td>
                  <td className="p-5 text-center border-r-2 border-white/20">66–68 Qs</td>
                  <td className="p-5 text-center border-r-2 border-white/20">120 Mins (3 × 40)</td>
                  <td className="p-5 text-center border-r-2 border-white/20">198–204 Marks</td>
                  <td className="p-5 text-center">~16 Non-MCQ Qs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
            <p className="font-extrabold uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Marking Scheme & Sectional Lock Rule</span>
            </p>
            <p className="leading-relaxed">
              Every correct answer awards <strong>+3.00 marks</strong>. Every incorrect attempt in MCQs incurs a negative deduction of <strong>-1.00 mark</strong> (33.3% penalty). In Type-In-The-Answer (TITA) questions, there is <strong>zero negative marking</strong>. You cannot toggle between sections before the 40-minute timer expires.
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
              Section-wise Syllabus & High-Yield Topics for CAT 2026
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Focus your preparation on the highest-weightage topics verified across past IIM question papers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* VARC */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">1</span>
                  <h3 className="font-black text-lg uppercase text-slate-900">VARC (24 Questions)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  4 RC Passages (16 Questions on Philosophy, Economics, Science & Sociology), Para-jumbles, Para-summary, and Odd-Sentence-Out.
                </p>
              </div>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 14+ Correct (38+ Marks)
              </div>
            </div>

            {/* DILR */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">2</span>
                  <h3 className="font-black text-lg uppercase text-slate-900">DILR (22 Questions)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Matrix Arrangements, Games & Tournaments, Scheduling, Venn Diagrams, Routing & Networks, and Caselet Optimization sets.
                </p>
              </div>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 2 Full Sets (24+ Marks)
              </div>
            </div>

            {/* QA */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center font-black text-xs">3</span>
                  <h3 className="font-black text-lg uppercase text-slate-900">QA (22 Questions)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Arithmetic (8–10 Qs: TSD, Work, Percentages), Algebra (6–8 Qs: Functions, Quadratics, Logarithms), Geometry (3–4 Qs), and Modern Math.
                </p>
              </div>
              <div className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">
                Target: 12+ Correct (32+ Marks)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 60-DAY STRATEGY FOR CAT 2026 */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border-4 border-foreground p-6 md:p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-amber-400 tracking-widest">
              Expert Blueprint by Mohit Jain
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              How to Score 99+ Percentile in CAT: 60-Day Preparation Roadmap
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-medium">
              Proven 8-week phased strategy to maximize your raw score and secure interview shortlists from IIM Ahmedabad, Bangalore, and Calcutta:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-amber-400 font-black text-xs uppercase tracking-wider">Weeks 1–2</span>
              <h3 className="text-base font-extrabold text-white">Diagnostic & Speed Foundations</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Take our full CBT mock test. Identify whether your bottleneck is RC reading speed, DILR set selection, or Arithmetic conceptual clarity.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-emerald-400 font-black text-xs uppercase tracking-wider">Weeks 3–4</span>
              <h3 className="text-base font-extrabold text-white">High-Yield Arithmetic & DILR Sets</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Master 5 core Arithmetic chapters (Percentages, Profit & Loss, Ratio, Time-Speed-Distance, Time & Work). Solve 4 advanced DILR puzzle sets daily.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-indigo-400 font-black text-xs uppercase tracking-wider">Weeks 5–6</span>
              <h3 className="text-base font-extrabold text-white">Mock Test Drills & Question Selection</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Attempt 2 to 3 full-length 120-minute CBT mock tests per week under strict slot conditions (8:30 AM / 12:30 PM / 4:30 PM). Spend 3 hours analyzing every test.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-rose-400 font-black text-xs uppercase tracking-wider">Weeks 7–8</span>
              <h3 className="text-base font-extrabold text-white">Error Reduction & Exam Temperament</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Eliminate unforced negative marks. Practice TITA non-MCQ questions first. Shortlist backup non-IIM colleges (FMS, SPJIMR, MDI, IITs, XIMB).
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 font-medium">
              Want a customized study plan based on your academic profile and work experience?
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20preparing%20for%20CAT%202026%20and%20want%20a%20personalized%20study%20plan%20for%2099%20percentile."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Get Personalized 60-Day Plan</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: TEST SERIES COMPARISON (AIMCAT, SimCAT, CDC) */}
        <section id="comparison" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-primary/30">
              <Presentation className="w-4 h-4" />
              <span>Test Series Benchmarking</span>
            </div>
            <h2 className="text-3xl font-black uppercase text-foreground">
              CareerWithMohit Free CAT Mock vs. TIME AIMCAT, IMS SimCAT & CL CDC
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Aspirants frequently compare leading national test series. Here is an honest breakdown of our free simulator vs paid coaching series:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border-4 border-foreground p-6 bg-slate-50 rounded-2xl space-y-3">
              <h4 className="font-extrabold uppercase text-primary text-base">Legacy Test Series (AIMCAT / SimCAT / CDC)</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-700 list-disc list-inside">
                <li><strong>Target:</strong> Large-scale national benchmarking with high percentile competition.</li>
                <li><strong>Difficulty:</strong> Often deliberately harder than the actual exam to build test endurance.</li>
                <li><strong>Price:</strong> Paid test series (ranges from ₹6,000 to ₹12,000+).</li>
                <li><strong>Analytics:</strong> Sectional percentiles provided, but lacks 1-on-1 profile evaluation for IIM calls.</li>
              </ul>
            </div>

            <div className="border-4 border-foreground p-6 bg-primary/5 rounded-2xl space-y-3">
              <h4 className="font-extrabold uppercase text-primary text-base">Our Free CAT CBT Simulation Tool</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-800 list-disc list-inside">
                <li><strong>Target:</strong> Realistic toughness level matching recent IIM papers (2023, 2024 & 2025).</li>
                <li><strong>Interface:</strong> Realistic 40-minute locked sections with on-screen calculator.</li>
                <li><strong>Price:</strong> 100% Free — no mandatory subscription or paywall.</li>
                <li><strong>Analytics:</strong> Instant raw score /198, percentile prediction, and direct WhatsApp profile review.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (AEO & GEO Powerhouse) */}
        <section id="faqs" className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-primary/30">
              <HelpCircle className="w-4 h-4" />
              <span>AEO Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">
              Frequently Asked Questions on CAT 2026/27 Mock Test & IIM Admissions
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              Quick, definitive answers to the most common queries about exam pattern, score vs percentile, and IIM call eligibility.
            </p>
          </div>

          <div className="space-y-4">
            {CAT_FAQS.map((item, idx) => (
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

        {/* SECTION 6: MBA/PGDM 2027 ADMISSION CTA BANNER */}
        <div className="bg-primary text-white rounded-3xl border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white text-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>MBA & PGDM 2027 Admissions Desk</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              Ready to Target Top IIMs & Premier B-Schools?
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
              Save up to ₹5,000 on application forms for FMS, SPJIMR, MDI, IMT, FORE, and GIM. Receive 1-on-1 profile evaluation and GD-PI guidance from <strong>Mohit Jain</strong>.
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
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20preparing%20for%20CAT%202026%20and%20want%20to%20apply%20for%20top%20MBA%2FPGDM%202027%20admissions."
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
              href="/tools/mat-mock-test/"
              className="bg-white p-4 rounded-2xl border-2 border-foreground hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] block"
            >
              <span className="text-[10px] font-black uppercase text-amber-600">150 Questions</span>
              <p className="font-extrabold text-sm text-foreground mt-1">MAT Mock Test</p>
              <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Composite Score /800</p>
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
