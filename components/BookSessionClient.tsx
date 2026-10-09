'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Video, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Star, 
  Users, 
  ArrowRight, 
  MessageCircle, 
  Target, 
  Building2, 
  HelpCircle, 
  Clock, 
  Laptop, 
  Check, 
  ChevronDown, 
  CalendarCheck, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Zap, 
  PhoneCall, 
  UserCheck, 
  BookOpen, 
  Layers, 
  XCircle, 
  Calculator, 
  Flame, 
  BadgeCheck, 
  HeartHandshake,
  Calendar,
  Lock,
  Compass,
  FileSpreadsheet,
  Coins,
  BadgePercent
} from 'lucide-react';
import { CalendlyBookingWidget } from '@/components/CalendlyBookingWidget';

interface BookSessionClientProps {
  calendlyUrl?: string;
}

const TOP_COLLEGES_MARQUEE = [
  { name: 'IIMs & Top IITs', badge: 'Tier 1 Elite', cutoff: '95%+ CAT' },
  { name: 'SIBM Pune & SCMHRD', badge: 'Symbiosis', cutoff: 'SNAP 97%+' },
  { name: 'NMIMS Mumbai', badge: 'Top Metro', cutoff: '235+ NMAT' },
  { name: 'Great Lakes Chennai / Gurgaon', badge: 'High ROI', cutoff: '80%+ CAT/XAT/CMAT' },
  { name: 'TAPMI Manipal', badge: 'Top Tier 2', cutoff: '85%+ CAT/XAT' },
  { name: 'FORE School Delhi', badge: 'Delhi NCR', cutoff: '85%+ CAT/XAT' },
  { name: 'BIMTECH Greater Noida', badge: 'NCR Hub', cutoff: '75%+ CAT/CMAT' },
  { name: 'GIM Goa', badge: 'Top PGDM', cutoff: '88%+ CAT/XAT' },
  { name: 'KJ Somaiya Mumbai', badge: 'Mumbai Hub', cutoff: '84%+ CAT/XAT/CMAT' },
  { name: 'Welingkar Mumbai / Bangalore', badge: 'High Intake', cutoff: '75%+ CMAT/ATMA/CAT' },
  { name: 'Jaipuria / NDIM / JIMS', badge: 'Best ROI < ₹12L', cutoff: '50-80%ile' },
  { name: 'Direct Institutional Quota', badge: '100% Official', cutoff: 'Profile Based' },
];

const AGENDA_TABS = [
  {
    id: 'profile',
    title: 'Profile & Cutoff Audit',
    icon: Target,
    badge: 'Min 00 - 08',
    headline: 'Realistic Academic & Category Scorecard Evaluation',
    desc: 'Mohit evaluates your 10th, 12th, graduation marks, work experience, and category/diversity points against past 5-year B-school selection criteria.',
    items: [
      { label: 'Past Academics Weightage', val: 'Evaluated for CAT/XAT/IIM composite score criteria' },
      { label: 'Work Experience Points', val: '0–36 months scaling analysis for top Tier-1 & Tier-2 B-Schools' },
      { label: 'Non-Engineer / Diversity Points', val: 'Gender & academic diversity advantage calculated live' },
      { label: 'Low Score Backups', val: 'High-ROI colleges accepting 50–85%ile or CMAT/MAT/ATMA' }
    ]
  },
  {
    id: 'shortlist',
    title: 'Dream / Target / Safe List',
    icon: Building2,
    badge: 'Min 08 - 16',
    headline: 'Customized College Shortlist for Your Exact Budget',
    desc: 'Get an unbiased list of colleges categorized into Dream, Realistic Target, and Safe Backups based on your budget (<₹10L, ₹10-15L, ₹15-25L) and preferred city.',
    items: [
      { label: 'Dream Colleges', val: 'Aspirational picks where high PI/GD scores can get you in' },
      { label: 'Realistic Target Colleges', val: 'High-probability colleges matching your current profile & percentile' },
      { label: 'Safe Backup Colleges', val: 'Guaranteed admission options with proven median placement packages' },
      { label: 'Location Preferences', val: 'Delhi NCR, Pune, Mumbai, Bangalore, Hyderabad & Tier-1 Metros' }
    ]
  },
  {
    id: 'roi',
    title: 'Tuition vs. Placement ROI',
    icon: TrendingUp,
    badge: 'Min 16 - 24',
    headline: 'Brochure Marketing vs. Real Median Salary Truth',
    desc: 'Live screen-share of verified placement records, hidden hostel/infrastructure charges, and actual median packages — separating real career ROI from glossy ads.',
    items: [
      { label: 'Real Median vs Average', val: 'Find out actual in-hand salary vs CTC inflated by signing bonuses' },
      { label: 'Total Course Cost Audit', val: 'Tuition + Hostel + Mess + Mandatory exam fee full breakdown' },
      { label: 'Batch Size Analysis', val: 'Colleges with 120 vs 600 batch size competition impact' },
      { label: 'Education Loan Guidance', val: 'Collateral-free SBI/HDFC/Axis student loan eligibility criteria' }
    ]
  },
  {
    id: 'quota',
    title: 'Direct Admission Truth',
    icon: ShieldCheck,
    badge: 'Min 24 - 30',
    headline: '100% Genuine Management Quota & Institutional Seat Matrix',
    desc: 'Unbiased facts on institutional rounds, management quota seat availability, official college receipt payments, and eligibility cutoffs without middlemen fraud.',
    items: [
      { label: 'Official Seat Matrix', val: 'Direct institutional seats authorized under state/college bylaws' },
      { label: 'Zero Middlemen Scams', val: 'Pay tuition fees directly to the college bank account only' },
      { label: 'Merit Scholarships', val: 'Score-based fee waivers (₹50,000 to ₹3,00,000) eligibility check' },
      { label: 'Application Deadlines', val: 'Priority calendar for closing round seats before dates expire' }
    ]
  }
];

const COMPARISON_ROWS = [
  {
    feature: 'College Cutoff & Profile Analysis',
    without: 'Outdated articles, generic score calculators & marketing blogs',
    withMohit: 'Live screen-share of past 5-year verified cutoff sheets & composite scores'
  },
  {
    feature: 'Placement Salary Transparency',
    without: 'Misled by "Highest CTC ₹45L" (often 1 overseas offer)',
    withMohit: 'Verified median salary audit, top 50% average, and batch size realities'
  },
  {
    feature: 'College Application Form Expenses',
    without: 'Applying randomly to 10+ colleges, wasting ₹20,000–₹25,000 in form fees',
    withMohit: 'Tailored 4-college shortlist (Dream/Target/Safe), saving ₹15,000+ in fees'
  },
  {
    feature: 'Direct Admission & Management Quota',
    without: 'Risking money with unauthorized brokers and fake commission agents',
    withMohit: '100% official institutional seat matrix with direct college receipt payments'
  },
  {
    feature: 'Parent & Loan Alignment',
    without: 'Parents left confused about ₹18L–₹25L fees & hidden hostel charges',
    withMohit: 'Parents warmly invited on Google Meet to discuss loans, ROI & hostel safety'
  },
  {
    feature: 'Consultation Charges',
    without: 'High paid counselling packages charging ₹5,000–₹15,000 upfront',
    withMohit: '100% Free 30-minute 1-on-1 video call on Google Meet'
  }
];

const SAMPLE_MATCH_DATABASE: Record<string, { tier: string; colleges: string[]; advice: string }> = {
  '90+': {
    tier: 'Tier 1 / Elite B-Schools',
    colleges: ['IIMs (Composite based)', 'SIBM Pune', 'NMIMS Mumbai', 'MICA', 'SPJIMR', 'IIT Bombay/Delhi'],
    advice: 'Focus heavily on GD-PI prep and academic diversity points. Target top 15 B-schools with ₹22L+ median packages.'
  },
  '75-90': {
    tier: 'Top Tier 2 & High ROI B-Schools',
    colleges: ['Great Lakes Chennai', 'TAPMI Manipal', 'FORE School Delhi', 'GIM Goa', 'BIMTECH', 'KJ Somaiya'],
    advice: 'High-probability match! You have strong chances of converting top ₹12L–₹16L median salary programs.'
  },
  '50-75': {
    tier: 'Strong Tier 2/3 & Regional Powerhouses',
    colleges: ['NDIM Delhi', 'Jaipuria Institute', 'Welingkar (Mumbai/BLR)', 'JIMS Rohini', 'IBS Hyderabad', 'PIBM Pune'],
    advice: 'Excellent ROI options available under ₹12-14 Lakhs total budget. Apply early before round 1 closes.'
  },
  'direct': {
    tier: 'Direct Institutional / Management Quota',
    colleges: ['Top Delhi NCR PGDM Colleges', 'Pune Reputed Institutes', 'Bangalore Top B-Schools', 'Online MBA Global'],
    advice: 'Ensure you apply through official college institutional quota only. Mohit will explain the seat matrix on video.'
  }
};

const TESTIMONIALS = [
  {
    name: 'Rahul Varma',
    college: 'Converted SIBM Pune (Batch 2025-27)',
    score: '98.2 SNAP %ile',
    quote: 'Mohit sir showed me real cutoffs on Google Meet screen-share. His GD-PI advice and honest feedback saved me from wasting money on 6 unnecessary college forms.',
    rating: 5,
    avatar: 'RV',
    badge: 'SNAP 98.2%'
  },
  {
    name: 'Ananya Deshmukh',
    college: 'Admitted to Great Lakes Chennai',
    score: '84.6 CAT %ile',
    quote: 'I had low CAT marks and was panicked. Mohit sir did a 1-on-1 call with me and my father, shortlisted Great Lakes and TAPMI, and guided our loan approval step by step.',
    rating: 5,
    avatar: 'AD',
    badge: 'CAT 84.6%'
  },
  {
    name: 'Karthik Nair',
    college: 'NMIMS Mumbai MBA',
    score: '242 NMAT Score',
    quote: 'No marketing pitches, no spam calls. Just pure data, fee breakdowns, and real placement reviews. The best 30 minutes I spent during my MBA admission journey.',
    rating: 5,
    avatar: 'KN',
    badge: 'NMAT 242'
  },
  {
    name: 'Shreya Sengupta',
    college: 'Admitted to BIMTECH Greater Noida',
    score: 'Direct Institutional Round',
    quote: 'Clarified the entire management quota process with complete transparency. We paid directly to the college official account with zero middlemen markup. Highly recommended!',
    rating: 5,
    avatar: 'SS',
    badge: 'Direct Admission'
  }
];

const FAQS = [
  {
    q: "Is this 1-on-1 video counselling call really 100% free?",
    a: "Yes, completely free! The 30-minute Google Meet consultation is 100% free for students and parents. There are zero hidden charges, no credit card required, and no aggressive sales pitches. Mohit Jain will evaluate your profile and give you transparent, honest guidance."
  },
  {
    q: "How will I receive the Google Meet video link?",
    a: "As soon as you choose your slot in Step 2, a Google Meet link is automatically generated and emailed to you along with a Google Calendar invite. You will also receive an instant confirmation and reminder on WhatsApp."
  },
  {
    q: "Can my parents join the video call with me?",
    a: "Absolutely yes! In fact, we strongly encourage parents to attend so everyone is aligned on college choices, tuition fee structures, hostel life, educational loans, and placement ROI. Parents can join from the same device or via their own phone/laptop."
  },
  {
    q: "My score is low or I haven't taken CAT yet. Can I still book?",
    a: "Yes! A huge number of students we mentor have average scores (50–85 percentile) or are planning non-CAT exams like CMAT, MAT, ATMA, NMAT, or institutional direct admissions. Mohit will show you high-ROI backup colleges where you can still secure strong placements."
  },
  {
    q: "Will Mohit share his screen during the call?",
    a: "Yes. Mohit will share his screen to show you real cutoff spreadsheets, genuine college placement reports, and official fee breakdowns so you can verify everything with your own eyes."
  },
  {
    q: "How does direct admission / management quota guidance work?",
    a: "Mohit provides 100% transparent guidance on official institutional quota seats, eligibility rules, and college-prescribed fee structures. We strictly warn students against unauthorized brokers and ensure all fees are paid directly to verified college bank accounts."
  },
  {
    q: "What if no available slots fit my college or work schedule?",
    a: "If you have an urgent college application deadline or cannot find an open slot that fits your schedule, message Mohit's team directly on WhatsApp at +91 95600 20771 and we will do our best to accommodate you today."
  },
  {
    q: "What documents or information should I keep handy?",
    a: "Just your estimated 10th, 12th, and graduation percentages, any entrance exam scores (or target exams), your approximate total budget, and any preferred colleges you want to ask about."
  }
];

export function BookSessionClient({
  calendlyUrl = 'https://calendly.com/careerwithmohit-jain'
}: BookSessionClientProps) {
  // Agenda tab state
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // Interactive Score Matcher States
  const [scoreRange, setScoreRange] = useState<string>('75-90');
  const [userBudget, setUserBudget] = useState<string>('₹10 - 15 Lakhs');

  const currentTab = AGENDA_TABS.find(t => t.id === activeTab) || AGENDA_TABS[0];
  const matchedData = SAMPLE_MATCH_DATABASE[scoreRange] || SAMPLE_MATCH_DATABASE['75-90'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-600 selection:text-white pb-24 relative overflow-hidden">
      
      {/* Subtle modern background gradient blobs & dot mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-100/60 via-blue-50/40 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-100/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-2/3 -left-40 w-96 h-96 bg-purple-100/40 rounded-full blur-[130px] pointer-events-none" />
      
      {/* 1. TOP ANNOUNCEMENT TICKER BANNER */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-700 text-white text-xs font-semibold py-2.5 px-4 shadow-sm border-b border-indigo-500/30 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-black border border-emerald-400/30 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse mr-1" />
              Live Slots Open
            </span>
            <span className="text-indigo-100 hidden sm:inline">
              100% Free 1-on-1 MBA &amp; PGDM 2027 Admissions Strategy Session with Mohit Jain
            </span>
            <span className="text-indigo-100 sm:hidden">
              Free 1-on-1 MBA Strategy Call on Google Meet
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>₹0 Fee • 30 Mins</span>
            </span>
            <span className="text-indigo-300 hidden md:inline">•</span>
            <a 
              href="#booking-engine" 
              className="text-white hover:text-amber-200 underline underline-offset-2 font-bold transition-colors"
            >
              Book Now &darr;
            </a>
          </div>
        </div>
      </div>

      {/* 2. SPLIT-SCREEN 2-COLUMN HERO SECTION */}
      <section className="relative pt-6 pb-14 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 font-semibold">Book Free 1-on-1 Session</span>
          </nav>

          {/* MAIN SPLIT-SCREEN GRID (50% Left & 50% Right on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" id="booking-engine">
            
            {/* LEFT COLUMN: Student Intent & Value Proposition (50% on Desktop / 6 Cols) */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold shadow-xs">
                <span className="text-amber-500">⚡</span>
                <span>100% Free • IIM-B &amp; FMS Certified Mentorship</span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.14]">
                  Avoid a <span className="bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">₹20 Lakh Career Mistake</span>. Book Your Free 1-on-1 MBA &amp; PGDM Strategy Session.
                </h1>
                <p className="mt-3.5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                  Connect directly with <strong className="text-slate-900 font-bold">Mohit Jain</strong> on a 1-on-1 Google Meet video call. Screen-share verified cutoffs, audit real median in-hand salaries, and build your customized <strong className="text-indigo-700 font-bold">Dream / Target / Safe</strong> shortlist — before you invest ₹15L–₹25L.
                </p>
              </div>

              {/* 4 Bullet Points with Light-Colored Icon Boxes */}
              <div className="space-y-3 pt-1">
                
                {/* 1. Profile & Cutoff Audit */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">📊</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Live Profile &amp; Cutoff Audit
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      10th, 12th, graduation marks, work experience &amp; category diversity score evaluation for IIMs and top B-schools.
                    </p>
                  </div>
                </div>

                {/* 2. Dream, Target & Safe Shortlist */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Dream, Target &amp; Safe Shortlist
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Custom 3-tier list tailored to your exact budget &amp; city preference to save <strong className="text-emerald-700 font-semibold">₹15,000+ in form fees</strong>.
                    </p>
                  </div>
                </div>

                {/* 3. Real Placement Salary Truth */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">💰</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Real Placement Salary Truth
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Actual median in-hand salary packages, batch size realities &amp; hidden charges vs. brochure marketing hype.
                    </p>
                  </div>
                </div>

                {/* 4. Parent-Friendly */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">👨‍👩‍👦</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Parent-Friendly Video Call
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Bring your parents to discuss collateral-free student loans, hostel safety &amp; fee installment schedules openly.
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Proof & Trust Strip */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">10,000+</span>
                    <span className="text-slate-500 font-medium">Aspirants Mentored</span>
                  </div>
                  <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-amber-500 text-sm">4.9 ★★★★★</span>
                    <span className="text-slate-500 font-medium">(1,450+ Verified Reviews)</span>
                  </div>
                </div>

                {/* Top Institutional Converts Showcase */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Top Institutional Converts Showcase:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['IIMs', 'SIBM Pune', 'NMIMS Mumbai', 'TAPMI', 'Great Lakes', 'BIMTECH', 'FORE School', 'GIM Goa'].map((college, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/70"
                      >
                        {college}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mentor Spotlight Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-blue-50/50 to-slate-50/70 border border-indigo-100 flex items-center gap-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md shrink-0">
                  MJ
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900">Mohit Jain</h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-extrabold">
                      <BadgeCheck className="w-3 h-3" />
                      <span>Verified Mentor</span>
                    </span>
                  </div>
                  <p className="text-xs text-indigo-900 font-medium mt-0.5">Chief MBA Admissions Strategist • IIM-B &amp; FMS Certified</p>
                  <p className="text-[11px] text-slate-600 mt-1 italic">
                    &ldquo;Zero broker bias, zero commission pressure. Pure data &amp; transparent facts for your career.&rdquo;
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: High-Graphics Multi-Step Interactive Form Card (50% on Desktop / 6 Cols) */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="sticky top-6">
                <CalendlyBookingWidget url={calendlyUrl} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. TOP TIER B-SCHOOL CONVERT LOGOS TICKER RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Colleges Converted by Mentored Aspirants:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
              {TOP_COLLEGES_MARQUEE.slice(0, 6).map((c, i) => (
                <div key={i} className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 transition-colors flex items-center gap-2">
                  <span>{c.name}</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60">{c.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE B-SCHOOL MATCH & SHORTLIST SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold mb-2">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                <span>Instant Profile Match Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                See What B-Schools You Can Target Right Now
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select your expected entrance percentile or direct quota preference to preview matches:
              </p>
            </div>

            <a
              href="#booking-engine"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 inline-flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Unlock Full 1-on-1 Matrix on Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Interactive Selectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Score Range Picker */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                1. Target Entrance Percentile / Score:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: '90+', label: '90%+ (CAT/XAT/SNAP)' },
                  { id: '75-90', label: '75–90%ile (Top Tier 2)' },
                  { id: '50-75', label: '50–75%ile (CMAT/MAT)' },
                  { id: 'direct', label: 'Direct / Institutional' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScoreRange(s.id)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                      scoreRange === s.id
                        ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-200'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range Picker */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                2. Preferred Budget (Fees + Living):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['Under ₹10 Lakhs', '₹10 - 15 Lakhs', '₹15 - 25 Lakhs', '₹25 Lakhs+'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setUserBudget(b)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                      userBudget === b
                        ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-200'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Matching Output Card */}
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 border border-indigo-200/80 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
                    Matching Tier
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    High Eligibility
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900">{matchedData.tier}</h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {matchedData.colleges.map((c, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md text-indigo-900 shadow-2xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-700 mt-2.5 border-t border-indigo-100 pt-2 leading-tight">
                💡 <strong>Mentor Strategy:</strong> {matchedData.advice}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STRUCTURED 30-MINUTE AGENDA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/60">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold mb-2">
                <Laptop className="w-3.5 h-3.5 text-indigo-600" />
                <span>What Happens On The Call</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Inside Your 30-Minute Google Meet Session
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
              Live Screen-Share Consultation
            </span>
          </div>

          {/* Agenda Tabs Switcher */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            {AGENDA_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-left text-xs font-bold transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 border-indigo-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                  <div className="truncate">
                    <div className="text-[10px] opacity-80">{tab.badge}</div>
                    <div className="truncate">{tab.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Preview Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-slate-50 to-blue-50/60 border border-indigo-100">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase text-indigo-900 bg-indigo-100 px-2.5 py-1 rounded-md border border-indigo-200">
                {currentTab.badge}: {currentTab.title}
              </span>
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Google Meet Screen-Share</span>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              {currentTab.headline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              {currentTab.desc}
            </p>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200/80 pt-4">
              {currentTab.items.map((it, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">{it.label}</strong>
                    <span className="text-[11px] text-slate-600">{it.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. COMPARISON MATRIX (Avoid Costly MBA Traps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Avoid Costly MBA Traps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why 90% of Aspirants Waste ₹20,000+ &amp; Pick The Wrong College
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            See the difference between relying on marketing agents vs. verified 1-on-1 data guidance
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-slate-600 w-1/3">
                    Decision Factor
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-rose-700 bg-rose-50/70 w-1/3">
                    ❌ Regular Way (Brokers &amp; Generic Blogs)
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-emerald-800 bg-emerald-50/70 w-1/3">
                    ✅ With Mohit Jain (Google Meet)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 align-top">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 bg-rose-50/30 align-top">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.without}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-900 bg-emerald-50/30 font-medium align-top">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.withMohit}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-700 font-semibold text-center sm:text-left">
              💡 <strong>Bottom Line:</strong> 30 minutes of honest guidance can save you ₹15,000+ in unnecessary form fees and prevent a ₹20 Lakh career mistake.
            </div>
            <a
              href="#booking-engine"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
            >
              Book Your Free Slot
            </a>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>Verified Student Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Real Stories From Real Aspirants
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Read how 30 minutes of honest guidance helped students secure admissions in top B-Schools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[10px] text-indigo-600 font-medium">{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Clear, honest answers to help you get the most out of your 1-on-1 session
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-all ${
                  isOpen ? 'border-indigo-500 shadow-sm ring-2 ring-indigo-100' : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <span className="font-bold text-xs sm:text-sm text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 border border-indigo-200/80 rounded-3xl shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Still wondering if this session is right for you?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-lg mx-auto leading-relaxed">
            There is zero financial commitment. It is 30 minutes of honest, expert advice to help you avoid making a ₹15L–₹25L college selection mistake.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#booking-engine"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-indigo-600/20 inline-flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Your Free Slot Now</span>
            </a>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20have%20a%20quick%20question%20before%20booking%20my%20session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. STICKY FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl">
        <div className="flex items-center gap-2.5 max-w-md mx-auto">
          <a
            href="#booking-engine"
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black text-center shadow-md shadow-indigo-600/25 flex items-center justify-center gap-1.5"
          >
            <Video className="w-4 h-4 text-amber-300" />
            <span>Book Free Google Meet</span>
          </a>
          <a
            href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20book%20a%20free%201-on-1%20counselling%20session"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-md"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
}
