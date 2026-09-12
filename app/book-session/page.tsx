import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Star, 
  Users, 
  ArrowRight, 
  MessageCircle, 
  FileCheck,
  Target,
  Compass,
  Building2,
  HelpCircle
} from 'lucide-react';
import { CalendlyBookingWidget } from '@/components/CalendlyBookingWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Book Free 1-on-1 Face-to-Face Video Counselling with Mohit Jain (Google Meet)",
  description: "Schedule a free 30-minute 1-on-1 face-to-face video counselling session on Google Meet with Mohit Jain (IIM-B & FMS credentials). Live screen sharing of B-school cutoffs, direct admission guidance, and profile reviews.",
  keywords: [
    "book face to face MBA counselling",
    "google meet MBA counselling",
    "free 1 on 1 video counselling Mohit Jain",
    "direct MBA admission google meet",
    "CAT 2026 strategy video call",
    "face to face career counselling",
    "Mohit Jain counselling",
    "MBA admission consultation"
  ],
  alternates: {
    canonical: "/book-session",
  },
  openGraph: {
    title: "Book Free Face-to-Face Video Counselling on Google Meet | CareerWithMohit",
    description: "Schedule your free 30-minute 1-on-1 face-to-face MBA & career counselling video session with Mohit Jain on Google Meet.",
    url: "/book-session",
    siteName: "CareerWithMohit",
    type: "website",
    images: [
      {
        url: "https://www.careerwithmohit.online/og-image.webp",
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
    images: ["https://www.careerwithmohit.online/og-image.webp"],
  },
};

const AGENDA_ITEMS = [
  {
    title: "Profile Strength & Gap Analysis",
    desc: "Detailed audit of your 10th, 12th, graduation CGPA, work experience, and academic diversity points for IIMs & Tier-1/2 B-schools.",
    icon: Target,
    color: "text-blue-600 bg-blue-50 border-blue-200/80"
  },
  {
    title: "Dream, Target & Safe B-School Shortlist",
    desc: "Unbiased college recommendations based strictly on your budget, preferred city (Delhi NCR, Mumbai, Pune, Bangalore), and realistic cutoffs.",
    icon: Building2,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/80"
  },
  {
    title: "Exam & Percentile Target Matrix",
    desc: "Strategic percentile planning across CAT, XAT, NMAT, SNAP, CMAT & MAT — knowing exactly which exams give you the best ROI.",
    icon: Compass,
    color: "text-purple-600 bg-purple-50 border-purple-200/80"
  },
  {
    title: "Direct Admission & Quota Transparency",
    desc: "100% genuine insights on management quota, institutional seats, application deadlines, and scholarship eligibility criteria.",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/80"
  },
];

const PREPARATION_POINTS = [
  "Your 10th, 12th, and Graduation percentages / CGPA",
  "Target exams you are attempting (CAT / XAT / CMAT / SNAP / MAT)",
  "Budget preferences (e.g. Under ₹10L, ₹10-15L, ₹15-25L)",
  "Preferred locations (Delhi NCR, Pune, Mumbai, Bangalore, or Abroad)",
  "Any questions you have on specific colleges or direct admissions"
];

const FAQS = [
  {
    q: "Is this 1-on-1 counselling call really 100% free?",
    a: "Yes, this 30-minute consultation is completely free for students. There are zero hidden charges or pushy sales pitches. Mohit Jain will evaluate your profile and provide honest, transparent feedback."
  },
  {
    q: "How will we connect for the session?",
    a: "Once you pick a date and time slot below, a Google Meet video conference link will automatically be generated and emailed to you, along with a calendar invitation. You can join directly from your phone or laptop."
  },
  {
    q: "Can my parents join the call with me?",
    a: "Absolutely! We strongly encourage parents to join the counselling session so everyone is aligned on college choices, fee structures, ROI, and career outcomes."
  },
  {
    q: "What if none of the available slots fit my schedule?",
    a: "If you need an urgent session or cannot find a suitable slot, you can reach out directly on WhatsApp at +91 95600 20771, and our team will accommodate you."
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
      "url": "https://www.careerwithmohit.online/about"
    },
    "description": "30-minute free online counselling session with mentor Mohit Jain for MBA/PGDM college selection, CAT strategy, and profile review.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "serviceType": "Educational Consultation"
  };

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20">
      <JsonLd data={serviceSchema} />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0D2347] to-[#0A192F] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-blue-200/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Face-to-Face Video Counselling</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-5 backdrop-blur-sm">
              <Video className="w-3.5 h-3.5 text-amber-300" />
              <span>Face-to-Face Google Meet (30 Mins)</span>
              <span className="text-blue-300">•</span>
              <span className="text-emerald-300 font-bold">100% Free &amp; Unbiased</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Book Free 1-on-1 <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">Face-to-Face Video Counselling</span> with Mohit Jain
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
              Direct video consultation on <strong className="text-white">Google Meet</strong>. See live screen-shared cutoff audits, 
              personalized Dream/Target/Safe B-school shortlists, and genuine direct admission guidance without sales pressure.
            </p>

            {/* Credibility Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
                <div className="text-xl sm:text-2xl font-black text-amber-400">10,000+</div>
                <div className="text-[11px] text-slate-300 font-medium">Students Mentored</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">Google Meet</div>
                <div className="text-[11px] text-slate-300 font-medium">Face-to-Face Video</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
                <div className="text-xl sm:text-2xl font-black text-blue-400">Live Screen</div>
                <div className="text-[11px] text-slate-300 font-medium">Verified Cutoff Data</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
                <div className="text-xl sm:text-2xl font-black text-purple-400">₹0 Free</div>
                <div className="text-[11px] text-slate-300 font-medium">No Hidden Charges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Agenda & Mentor Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mentor Profile Snapshot */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0 ring-4 ring-blue-50">
                  MJ
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Mohit Jain</h3>
                  <p className="text-xs text-blue-600 font-semibold">Chief MBA Admissions &amp; Career Strategist</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>IIM Bangalore &amp; FMS Certified</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Former senior strategy advisor at leading EdTech companies. Personally evaluated 10,000+ candidate profiles for top B-Schools including Symbiosis, NMIMS, TAPMI, Great Lakes, FORE, BIMTECH, and Tier-1 institutes.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9 / 5.0</span>
                  <span className="text-slate-400 font-normal">(1,240+ reviews)</span>
                </div>
                <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center gap-1">
                  <span>Full Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* What We Will Cover in 30 Minutes */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">What Happens On The Call</h3>
                  <p className="text-xs text-slate-500">Structured 30-minute agenda</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {AGENDA_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all">
                      <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Keep These Ready For Best Results:</span>
              </h3>
              <ul className="space-y-2 text-xs text-blue-100/90">
                {PREPARATION_POINTS.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instant WhatsApp alternative */}
            <div className="bg-emerald-50 border border-emerald-200/90 rounded-3xl p-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-950">In a hurry for today?</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">Chat directly with Mohit on WhatsApp for urgent queries.</p>
              </div>
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20urgent%20MBA%20counselling%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-sm hover:shadow flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Calendly Inline Scheduling Widget (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <CalendlyBookingWidget url="https://calendly.com/careerwithmohit-jain/30min" />
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Everything you need to know about your 1-on-1 session
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
