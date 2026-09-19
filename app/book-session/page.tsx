import type { Metadata } from 'next';
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
  FileCheck,
  Target,
  Building2,
  HelpCircle,
  Clock,
  Laptop,
  Check,
  ChevronDown,
  CalendarCheck,
  Award
} from 'lucide-react';
import { CalendlyBookingWidget } from '@/components/CalendlyBookingWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Book Free 1-on-1 MBA Counselling with Mohit Jain (Google Meet)",
  description: "Schedule a free 30-min 1-on-1 video counselling session with Mohit Jain (IIM-B certified). Live B-school cutoffs, direct admission & profile evaluation.",
  keywords: [
    "book face to face MBA counselling",
    "google meet MBA counselling",
    "free 1 on 1 video counselling Mohit Jain",
    "direct MBA admission google meet",
    "CAT strategy video call",
    "face to face career counselling",
    "Mohit Jain counselling",
    "MBA admission consultation"
  ],
  alternates: {
    canonical: "/book-session/",
  },
  openGraph: {
    title: "Book Free Face-to-Face Video Counselling on Google Meet | CareerWithMohit",
    description: "Schedule your free 30-minute 1-on-1 face-to-face MBA & career counselling video session with Mohit Jain on Google Meet.",
    url: "/book-session",
    siteName: "CareerWithMohit",
    type: "website",
    images: [
      {
        url: "https://careerwithmohit.online/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Book Free Face-to-Face MBA Counselling Session - Mohit Jain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Free Face-to-Face Video Counselling on Google Meet | CareerWithMohit",
    description: "Schedule your free 30-minute 1-on-1 face-to-face MBA & career counselling video session with Mohit Jain on Google Meet.",
    images: ["https://careerwithmohit.online/og-image.webp"],
  },
};

const AGENDA_ITEMS = [
  {
    step: "01",
    title: "Academic Profile Strength Audit",
    desc: "Detailed evaluation of your 10th, 12th, and graduation scores, work experience, and category/diversity points for realistic B-school eligibility.",
    icon: Target,
    badge: "Personalized"
  },
  {
    step: "02",
    title: "Dream, Target & Safe B-School Shortlist",
    desc: "Honest college recommendations tailored strictly to your target budget (Under ₹10L, ₹15L, ₹25L) and preferred location (Delhi NCR, Pune, Mumbai, Bangalore).",
    icon: Building2,
    badge: "Budget Matched"
  },
  {
    step: "03",
    title: "Fee vs. Real Placement ROI Check",
    desc: "Screen-share analysis comparing official tuition fees with verified median salary figures — separating real placement facts from brochure marketing.",
    icon: FileCheck,
    badge: "Verified Data"
  },
  {
    step: "04",
    title: "Direct Admission & Quota Transparency",
    desc: "100% genuine insights on management quota eligibility, institutional seats, application deadlines, and scholarship criteria.",
    icon: ShieldCheck,
    badge: "Unbiased"
  },
];

const PREPARATION_CHECKLIST = [
  "10th, 12th, and Graduation marks / CGPA",
  "Target exams you are planning (CAT / XAT / CMAT / NMAT / MAT)",
  "Your preferred total budget (e.g. Under ₹10L, ₹10-15L, ₹15-25L)",
  "Preferred locations (Delhi NCR, Pune, Mumbai, Bangalore, or Abroad)",
  "Specific colleges you have doubts about (e.g. SIBM, NMIMS, TAPMI, BIMTECH, Great Lakes)"
];

const FAQS = [
  {
    q: "Is this 1-on-1 counselling call really 100% free?",
    a: "Yes, completely free! The 30-minute Google Meet consultation is 100% free for students and parents. There are zero hidden charges, no credit card required, and no aggressive sales pitches. Mohit Jain will evaluate your profile and give you transparent, honest guidance."
  },
  {
    q: "How will I receive the Google Meet video link?",
    a: "As soon as you pick your preferred slot in Step 2, a Google Meet link is automatically created and emailed to you along with a Google Calendar invite. You'll also receive a friendly reminder with the joining link on WhatsApp."
  },
  {
    q: "Can my parents join the call with me?",
    a: "Absolutely yes! In fact, we strongly encourage parents to attend so everyone is aligned on college choices, fee structures, hostel life, and placement ROI. Parents can join from the same device or via their own phone/laptop."
  },
  {
    q: "My score is low or I haven't taken CAT yet. Can I still book?",
    a: "Yes! A huge number of students we mentor have average scores (50–85 percentile) or are planning non-CAT exams like CMAT, MAT, ATMA, or institutional direct admissions. Mohit will show you high-ROI backup colleges where you can still secure strong placements."
  },
  {
    q: "Will Mohit share his screen during the call?",
    a: "Yes. Mohit will share his screen to show you real cutoff spreadsheets, genuine college placement reports, and official fee breakdowns so you can verify everything with your own eyes."
  },
  {
    q: "What if no available slots fit my college or work schedule?",
    a: "If you have an urgent college application deadline or cannot find an open slot that fits your schedule, message Mohit's team directly on WhatsApp at +91 95600 20771 and we will do our best to accommodate you today."
  }
];

export default function BookSessionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Free 1-on-1 MBA & Career Counselling Session",
    "provider": {
      "@type": "Person",
      "name": "Mohit Jain",
      "jobTitle": "Chief MBA Admissions Strategist",
      "url": "https://careerwithmohit.online/about"
    },
    "description": "30-minute free online face-to-face counselling session with mentor Mohit Jain on Google Meet for MBA/PGDM college selection, cutoff strategy, and profile review.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "serviceType": "Educational Consultation"
  };

  return (
    <main className="min-h-screen bg-slate-50/70 pb-20">
      <JsonLd data={serviceSchema} />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0E2A47] to-[#0A192F] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-blue-200/70 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Free 1-on-1 Video Counselling</span>
          </nav>

          <div className="max-w-3xl">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Video className="w-3.5 h-3.5 text-amber-300" />
              <span>Face-to-Face Google Meet (30 Mins)</span>
              <span className="text-blue-300">•</span>
              <span className="text-emerald-300 font-bold">100% Free &amp; Unbiased</span>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-3">
              Book Your Free 1-on-1 <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300 bg-clip-text text-transparent">Face-to-Face Guidance</span> with Mohit Jain
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6">
              Connect directly on <strong className="text-white">Google Meet</strong>. Get an honest profile evaluation, live screen-shared cutoff audits, and a customized Dream/Target/Safe B-school shortlist for your budget — with zero sales pressure.
            </p>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-xs">
                <div className="text-lg sm:text-xl font-black text-amber-400">10,000+</div>
                <div className="text-[11px] text-slate-300 font-medium">Students Mentored</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-xs">
                <div className="text-lg sm:text-xl font-black text-emerald-400">Google Meet</div>
                <div className="text-[11px] text-slate-300 font-medium">1-on-1 Video Call</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-xs">
                <div className="text-lg sm:text-xl font-black text-blue-400">Live Screen</div>
                <div className="text-[11px] text-slate-300 font-medium">Cutoffs &amp; Fee Sheets</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-xs">
                <div className="text-lg sm:text-xl font-black text-purple-300">₹0 Free</div>
                <div className="text-[11px] text-slate-300 font-medium">No Sales Pressure</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Step Journey Strip: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center sm:text-left">
            How It Works in 3 Simple Steps:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900">Share What You Need</h2>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Choose your goal (MBA admission, college shortlist, or direct quota) and enter basic contact info.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900">Pick a Convenient Slot</h2>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Select a date and time on the live Google Meet calendar that fits your college or work schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900">Join Google Meet Video</h2>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Get your Meet link on email &amp; WhatsApp. Join 1-on-1 with Mohit Jain (parents welcome!).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mentor Profile & What You Get (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mentor Profile Snapshot */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-md shrink-0 ring-4 ring-blue-50">
                  MJ
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Mohit Jain</h3>
                    <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                      Verified Mentor
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">Chief MBA Admissions Strategist</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>IIM Bangalore &amp; FMS Certified</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Personally evaluated over 10,000+ student profiles for top B-Schools including Symbiosis, NMIMS, TAPMI, Great Lakes, FORE, BIMTECH, and Tier-1/2 institutes across India.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9 / 5.0</span>
                  <span className="text-slate-400 font-normal">(1,240+ reviews)</span>
                </div>
                <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center gap-1">
                  <span>Read Bio</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* What We Cover in 30 Minutes */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">What Happens On The Call</h3>
                  <p className="text-xs text-slate-500">Structured 30-minute agenda</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  100% Honest
                </span>
              </div>

              <div className="space-y-3">
                {AGENDA_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {item.step}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed pl-6">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-sm font-bold text-white">Keep These Handy (No Pressure):</h3>
              </div>
              <p className="text-[11px] text-slate-300 mb-3">
                Having these ready helps Mohit give you precise, instantaneous answers:
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                {PREPARATION_CHECKLIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instant WhatsApp Support */}
            <div className="bg-emerald-50 border border-emerald-200/90 rounded-3xl p-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-950">In a hurry for today?</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">Chat directly with Mohit&apos;s team on WhatsApp for urgent queries.</p>
              </div>
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20urgent%20MBA%20counselling%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Calendly Booking Experience (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <CalendlyBookingWidget url="https://calendly.com/careerwithmohit-jain/30min" />
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions: Clean Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Clear, honest answers to help you get the most out of your 1-on-1 session
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <details 
              key={idx} 
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 transition-all open:border-blue-300 open:shadow-xs"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-xs sm:text-sm text-slate-900 list-none select-none">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-10 text-center p-6 bg-blue-50/70 border border-blue-100 rounded-3xl">
          <h3 className="text-sm sm:text-base font-bold text-blue-950">
            Still wondering if this session is right for you?
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto">
            There is zero financial commitment. It is simply 30 minutes of honest, expert advice to help you avoid making costly college selection mistakes.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#booking-widget-container"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Your Free Slot Now</span>
            </a>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20have%20a%20question%20before%20booking%20my%20session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
