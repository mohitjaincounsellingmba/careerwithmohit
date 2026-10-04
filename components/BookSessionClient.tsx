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
  CheckCircle, 
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
  Coins
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

const SESSION_DELIVERABLES = [
  {
    icon: Target,
    title: 'Profile & Composite Score Audit',
    badge: 'Min 00 - 08',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
    desc: 'Live calculation of your 10th, 12th, graduation marks, work experience, and gender/academic diversity weightage for IIMs & top B-schools.'
  },
  {
    icon: Building2,
    title: 'Dream / Target / Safe College List',
    badge: 'Min 08 - 16',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    desc: 'Get an unbiased 3-tier college shortlist customized to your exact percentile, preferred location (Delhi NCR, Pune, Mumbai, Bangalore) and budget.'
  },
  {
    icon: TrendingUp,
    title: 'Brochure vs. Real Placement ROI',
    badge: 'Min 16 - 24',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    desc: 'Screen-share verified median salaries, top 50% average in-hand packages, hidden hostel charges, and batch size realities before investing ₹15L–₹25L.'
  },
  {
    icon: ShieldCheck,
    title: '100% Official Direct Admission Matrix',
    badge: 'Min 24 - 30',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
    desc: 'Unbiased facts on institutional quota seats, official college receipt payments, merit scholarships, and closing date calendars with zero brokers.'
  }
];

const AGENDA_TABS = [
  {
    id: 'profile',
    title: 'Profile & Cutoff Audit',
    icon: Target,
    badge: 'Min 00-08',
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
    badge: 'Min 08-16',
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
    badge: 'Min 16-24',
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
    badge: 'Min 24-30',
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
  calendlyUrl = 'https://calendly.com/careerwithmohit-jain/30min'
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
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-blue-600 selection:text-white pb-24">
      
      {/* 1. TOP ANNOUNCEMENT TICKER BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs font-semibold py-2.5 px-4 shadow-inner border-b border-blue-600/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-black border border-emerald-400/30 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
              Live Slots Open
            </span>
            <span className="text-blue-100 hidden sm:inline">
              100% Free 1-on-1 MBA &amp; PGDM 2027 Admissions Consultation with Mohit Jain
            </span>
            <span className="text-blue-100 sm:hidden">
              Free 1-on-1 MBA Counselling on Google Meet
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>₹0 Fee • 30 Mins</span>
            </span>
            <span className="text-blue-300 hidden md:inline">•</span>
            <a 
              href="#booking-engine" 
              className="text-white hover:text-amber-200 underline underline-offset-2 font-bold transition-colors"
            >
              Book Now &darr;
            </a>
          </div>
        </div>
      </div>

      {/* 2. THE GRAND HERO BANNER - BOOK FREE COUNSELLING SESSION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pb-20 border-b border-slate-800 bg-[#060D1A]">
        
        {/* Luminous Glow Background Effects */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Decorative subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-blue-400 font-medium">Book Free 1-on-1 Counselling</span>
          </nav>

          {/* MAIN SUPER-BANNER CONTAINER */}
          <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-[#0B1528] border border-blue-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-12">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left 7 Columns: Core Message & Value Props */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold shadow-xs">
                    <Video className="w-3.5 h-3.5 text-amber-400" />
                    <span>Google Meet 1-on-1 Video Session</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Free &amp; Unbiased (₹0)</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
                    <span>MBA / PGDM 2027</span>
                  </div>
                </div>

                {/* Primary Headline */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    Book Your <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">Free 1-on-1 MBA Counselling</span> Session
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                    Connect directly with <strong className="text-white font-semibold">Mohit Jain</strong> (IIM-B &amp; FMS certified). Live screen-share past cutoffs, verify real median placement packages, and build your customized <strong className="text-amber-300 font-semibold">Dream / Target / Safe</strong> shortlist — before you invest ₹15L–₹25L.
                  </p>
                </div>

                {/* 4 Pillars Grid (What You Get on the Call) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Live Cutoff &amp; Profile Audit</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">10th, 12th, grad &amp; diversity points evaluated</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Budget-Optimized Shortlist</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Dream, Target &amp; Safe options for your budget</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Real Placement Salary Truth</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Actual median in-hand salary vs brochure hype</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">100% Official Quota Matrix</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Institutional rounds &amp; college receipt fees</p>
                    </div>
                  </div>
                </div>

                {/* Social Proof & Quick CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-slate-800">
                  <a
                    href="#booking-engine"
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-extrabold shadow-lg shadow-blue-600/30 inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Select Free Google Meet Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20book%20a%20free%201-on-1%20MBA%20counselling%20video%20session%20today."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>⚡ 1-Tap WhatsApp Booking</span>
                  </a>
                </div>

              </div>

              {/* Right 5 Columns: Mentor Spotlight Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                  
                  {/* Glowing ambient light */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Mentor Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white text-2xl font-black shadow-lg ring-4 ring-blue-500/20 shrink-0">
                      MJ
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-white">Mohit Jain</h3>
                        <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" />
                          <span>Verified Mentor</span>
                        </span>
                      </div>
                      <p className="text-xs text-blue-300 font-semibold mt-0.5">Chief MBA Admissions Mentor</p>
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mt-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>IIM-B &amp; FMS Alum Certified</span>
                      </div>
                    </div>
                  </div>

                  {/* Mentor Quote */}
                  <blockquote className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-amber-400/80 pl-3.5 py-1 mb-5">
                    &ldquo;Choosing an MBA college isn&apos;t just about shiny brochures. It&apos;s a ₹20 Lakh career decision. My goal is to give you and your parents 100% transparent data, real cutoffs, and genuine median salary figures so you can make the right choice.&rdquo;
                  </blockquote>

                  {/* Key Stats Strip */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-700/80">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                      <div className="text-lg font-black text-amber-400">10,000+</div>
                      <div className="text-[11px] text-slate-400">Aspirants Mentored</div>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                      <div className="text-lg font-black text-emerald-400">4.9 ★★★★★</div>
                      <div className="text-[11px] text-slate-400">1,450+ Verified Reviews</div>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                      <div className="text-lg font-black text-blue-400">₹15,000+</div>
                      <div className="text-[11px] text-slate-400">Avg. Saved on Form Fees</div>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                      <div className="text-lg font-black text-purple-400">₹0 Free</div>
                      <div className="text-[11px] text-slate-400">Zero Sales Pressure</div>
                    </div>
                  </div>

                  {/* Trust footer */}
                  <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Zero Spam • 100% Privacy</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Google Meet Encrypted</span>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* 3. TOP TIER B-SCHOOL CONVERT LOGOS RIBBON */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 overflow-hidden shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Colleges Converted by Mentored Aspirants:</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
                {TOP_COLLEGES_MARQUEE.slice(0, 6).map((c, i) => (
                  <div key={i} className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-2">
                    <span>{c.name}</span>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/50">{c.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE CORE BOOKING ENGINE SECTION (Step Form & Interactive Live Calendly) */}
      <section id="booking-engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-20">
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Booking Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Schedule Your Free 30-Minute Google Meet Call
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Step 1 takes only 20 seconds. Mohit will prepare your customized cutoff sheet and fee audit before the call begins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Agenda & Preparation Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Inside the Call: Tabbed Interactive Agenda */}
            <div className="bg-slate-800/80 rounded-3xl p-5 sm:p-6 border border-slate-700/80 shadow-lg">
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-blue-400" />
                    <span>What Happens On The Call</span>
                  </h3>
                  <p className="text-xs text-slate-400">Structured 30-minute agenda:</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Live Screen Share
                </span>
              </div>

              {/* Tabs Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-xl mb-4 border border-slate-700/60">
                {AGENDA_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{tab.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Preview Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-md">
                    {currentTab.badge}: {currentTab.title}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Live Screen Share</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white mb-1">
                  {currentTab.headline}
                </h4>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  {currentTab.desc}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 border-t border-slate-800 pt-3">
                  {currentTab.items.map((it, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200 font-semibold">{it.label}:</strong>{' '}
                        <span className="text-slate-400 text-[11px]">{it.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Parent Participation Highlight */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200">Parents are Warmly Encouraged to Join</h4>
                <p className="text-[11px] text-amber-100/80 mt-0.5 leading-relaxed">
                  MBA is a major ₹15L–₹25L family investment. Parents can join the Google Meet call to discuss collateral-free student loans, fee installments, hostel safety, and placement ROI together.
                </p>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700/80 shadow-md">
              <div className="flex items-center gap-2 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-xs font-bold text-white">Keep Handy for the Call:</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Estimated 10th, 12th, and Graduation marks / CGPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Target entrance exams (CAT / XAT / CMAT / NMAT / MAT / SNAP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Preferred total budget (Under ₹10L, ₹10-15L, ₹15-25L)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Specific colleges in mind (e.g. SIBM, NMIMS, TAPMI, Great Lakes)</span>
                </li>
              </ul>
            </div>

            {/* Urgent Same-Day WhatsApp Card */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-200">Have an Urgent Application Closing Today?</h4>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">Chat directly on WhatsApp to get an immediate priority video slot.</p>
              </div>
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20have%20an%20urgent%20MBA%20counselling%20query%20and%20need%20a%20slot%20today"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Calendly Booking Wizard (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <CalendlyBookingWidget url={calendlyUrl} />
            </div>
          </div>

        </div>

      </section>

      {/* 5. INTERACTIVE B-SCHOOL MATCH & SHORTLIST SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-2">
                  <Calculator className="w-3.5 h-3.5 text-amber-300" />
                  <span>Instant Match Preview Tool</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  See What B-Schools You Can Target Right Now
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Select your expected entrance percentile or direct quota preference:
                </p>
              </div>

              <a
                href="#booking-engine"
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Unlock Full 1-on-1 Matrix on Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Interactive Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Score Range Picker */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 backdrop-blur-sm">
                <label className="block text-xs font-bold text-blue-200 mb-2">
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
                          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Picker */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 backdrop-blur-sm">
                <label className="block text-xs font-bold text-blue-200 mb-2">
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
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Matching Output Card */}
              <div className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 border border-blue-400/40 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
                      Matching Tier
                    </span>
                    <span className="text-[11px] font-bold text-emerald-300">
                      High Eligibility
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">{matchedData.tier}</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {matchedData.colleges.map((c, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-white/15 px-2 py-0.5 rounded text-blue-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-200 mt-2.5 border-t border-white/10 pt-2 leading-tight">
                  💡 <strong>Mentor Strategy:</strong> {matchedData.advice}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. BEFORE VS. AFTER / WHY 90% MAKE MISTAKES (Comparison Table) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Avoid Costly MBA Traps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why 90% of Aspirants Waste ₹20,000+ &amp; Pick The Wrong College
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            See the difference between relying on marketing brokers vs. 1-on-1 verified data guidance
          </p>
        </div>

        <div className="bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/90">
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-slate-400 w-1/3">
                    Decision Factor
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-rose-400 bg-rose-950/40 w-1/3">
                    ❌ The Regular Way (Marketing Agents)
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-emerald-300 bg-emerald-950/50 w-1/3">
                    ✅ With Mohit Jain (Google Meet)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-white align-top">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-300 bg-rose-950/20 align-top">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.without}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-200 bg-emerald-950/30 font-medium align-top">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.withMohit}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-blue-200 font-semibold text-center sm:text-left">
              💡 <strong>Bottom Line:</strong> 30 minutes of honest guidance can save you ₹15,000+ in unnecessary form fees and prevent a ₹20 Lakh career mistake.
            </div>
            <a
              href="#booking-engine"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm shrink-0"
            >
              Book Your Free Slot
            </a>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold mb-2">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>Verified Student Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Real Stories From Real Aspirants
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Read how 30 minutes of honest guidance helped students secure admissions in top B-Schools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-700/60 pt-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-blue-400 font-medium">{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Clear, honest answers to help you get the most out of your 1-on-1 session
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`bg-slate-800/80 rounded-2xl border transition-all ${
                  isOpen ? 'border-blue-500 shadow-sm ring-2 ring-blue-500/20' : 'border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <span className="font-bold text-xs sm:text-sm text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 rounded-3xl shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Still wondering if this session is right for you?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-lg mx-auto leading-relaxed">
            There is zero financial commitment. It is 30 minutes of honest, expert advice to help you avoid making a ₹15L–₹25L college selection mistake.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#booking-engine"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-500/20 inline-flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Your Free Slot Now</span>
            </a>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20have%20a%20quick%20question%20before%20booking%20my%20session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. STICKY FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-2xl">
        <div className="flex items-center gap-2.5 max-w-md mx-auto">
          <a
            href="#booking-engine"
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black text-center shadow-md flex items-center justify-center gap-1.5"
          >
            <Video className="w-4 h-4 text-amber-300" />
            <span>Book Free Google Meet</span>
          </a>
          <a
            href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20book%20a%20free%201-on-1%20counselling%20session"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-md"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
}
