import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Zap,
  Briefcase,
  TrendingUp,
  Users,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Flame,
  Check,
  Compass,
  FileText,
  Calculator,
  Laptop
} from 'lucide-react';
import { JsonLd } from "@/components/JsonLd";
import { FounderFaq } from '@/components/FounderFaq';

export const metadata: Metadata = {
  title: "About Mohit Jain | Founder & Chief MBA Admissions Strategist",
  description: "Meet Mohit Jain — Founder of CareerWithMohit, IIM Bangalore & FMS Delhi certified in Digital Marketing. Uncompromised, ROI-first career guidance and MBA admissions consulting.",
  keywords: [
    "Mohit Jain", "about Mohit Jain", "CareerWithMohit founder", "expert career counsellor India",
    "iim bangalore and fms delhi certified in digital marketing", "IIM Bangalore certified in digital marketing",
    "FMS Delhi certified in digital marketing", "IIM Bangalore certified", "FMS Delhi certified",
    "digital marketing certified career strategist", "MBA admission consultant Delhi NCR",
    "MBA career counselling Delhi NCR", "best MBA career counsellor Pune", "direct MBA admission guide"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Mohit Jain | Founder & Chief MBA Admissions Strategist",
    description: "Learn about Mohit Jain's journey from Accenture & Doubtnut to IIM Bangalore & FMS Delhi digital marketing certifications and building India's student-first admissions advisory.",
    type: "profile",
    url: "/about",
    siteName: "CareerWithMohit",
    images: [
      {
        url: "https://www.careerwithmohit.online/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohit Jain - Founder & Chief MBA Admissions Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mohit Jain | Founder & Chief MBA Admissions Strategist",
    description: "Learn about Mohit Jain's journey from Accenture & Doubtnut to IIM Bangalore & FMS Delhi digital marketing certifications and uncompromised career guidance.",
    images: ["https://www.careerwithmohit.online/og-image.webp"],
  },
};

const STATS = [
  { value: "6+ Years", label: "Admissions Consulting", note: "Pan-India track record" },
  { value: "5,000+", label: "Students Mentored", note: "1-on-1 & workshops" },
  { value: "98.4%", label: "Conversion Rate", note: "In dream/target B-schools" },
  { value: "₹28 LPA", label: "Top Placement", note: "Mentored alumni outcome" },
];

const CREDENTIALS = [
  {
    institution: "IIM Bangalore",
    title: "Digital Marketing & Strategy",
    badge: "Executive Credential",
    desc: "Advanced executive certification in digital marketing, consumer behaviour, performance strategy, and growth analytics from India's #1 business school.",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50"
  },
  {
    institution: "FMS Delhi",
    title: "Digital Marketing & Management",
    badge: "Executive Credential",
    desc: "Executive certification in digital marketing strategy, brand architecture, competitive positioning, and consumer acquisition from Faculty of Management Studies (FMS Delhi).",
    color: "bg-red-600",
    textColor: "text-red-700",
    bgLight: "bg-red-50"
  },
  {
    institution: "Six Sigma Institute",
    title: "Six Sigma Yellow & White Belt",
    badge: "Process Quality Certified",
    desc: "Operational frameworks applied directly to streamline application screening, profile optimization, and GD-PI performance.",
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    bgLight: "bg-emerald-50"
  },
  {
    institution: "Quantitative Analytics",
    title: "Business Analytics & Advanced Excel",
    badge: "Data Modeling Expert",
    desc: "Quantitative predictive modeling for accurate CAT score-to-percentile forecasting, cut-off simulations, and B-school ROI.",
    color: "bg-amber-600",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50"
  },
];

const ADVISORY_PRINCIPLES = [
  {
    number: "01",
    title: "ROI Over Brand Hype",
    description: "A business degree is an investment. We calculate actual net tuition, cost of living, and verifiable median CTC—not brochure inflated averages. Never pay 25 lakhs for a 7 LPA outcome.",
    icon: TrendingUp
  },
  {
    number: "02",
    title: "Zero College Commission Bias",
    description: "Most consultancies push colleges that pay them the biggest referral checks. CareerWithMohit operates on uncompromised integrity—our allegiance is 100% with the student.",
    icon: ShieldCheck
  },
  {
    number: "03",
    title: "Data-Driven Shortlisting",
    description: "We eliminate guesswork with mathematical 3-tier mapping: Dream, Target, and Safe colleges backed by real category percentiles, sectional cutoffs, and profile weights.",
    icon: Zap
  },
  {
    number: "04",
    title: "Holistic Profile Engineering",
    description: "Scores are only half the battle. We help students craft narrative CVs, articulate gap years convincingly, complete high-impact micro-credentials, and master GD-PI-WAT rounds.",
    icon: Sparkles
  },
  {
    number: "05",
    title: "Long-Term Career Architecture",
    description: "We don't just ask 'Where can you get in?' We ask 'Where do you want to be 5 years post-MBA?' Matching specializations (Fintech, Analytics, Supply Chain) with hiring trends.",
    icon: Compass
  }
];

const TIMELINE = [
  {
    year: "2018 - 2020",
    badge: "Early Industry Grounding",
    title: "Financial & Digital Strategy Roots",
    description: "Gained hands-on strategic exposure across corporate and financial environments including Portfolio Management at Aditya Birla, growth marketing at Eye Wear Labs, and Finladder.",
    icon: Briefcase,
    color: "bg-indigo-500"
  },
  {
    year: "2020 - 2022",
    badge: "Corporate Operations & EdTech",
    title: "Accenture (Client: Amazon) & Doubtnut",
    description: "Managed mission-critical workflow logistics and operational metrics for global giant Amazon at Accenture. Led business development and expansion initiatives at Doubtnut (one of India's biggest EdTech platforms).",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    year: "2022 - 2023",
    badge: "Executive Certifications",
    title: "IIM Bangalore & FMS Delhi Certifications",
    description: "Earned prestigious credentials from IIM Bangalore and FMS Delhi certified in Digital Marketing & Strategic Management, coupled with Six Sigma Yellow/White Belts and Business Analytics credentials.",
    icon: Award,
    color: "bg-emerald-500"
  },
  {
    year: "2023 - Present",
    badge: "The Founder Era",
    title: "Building CareerWithMohit Ecosystem",
    description: "Founded CareerWithMohit to bring radical transparency to higher education. Developed free national entrance test simulators (CAT/XAT/NMAT/SNAP), ROI calculators, and guided 5,000+ students across India into premier management institutions.",
    icon: Flame,
    color: "bg-primary-brand"
  }
];

const ECOSYSTEM_TOOLS = [
  {
    name: "Free National Mock Simulators",
    desc: "Full-length mock tests with real exam timers and instant analytics for CAT, XAT, NMAT, SNAP, MAT, ATMA, CMAT, and IELTS.",
    href: "/cat-mock-test",
    icon: Laptop,
    cta: "Take Free Test"
  },
  {
    name: "CAT Score-to-Percentile Tool",
    desc: "Normalized scaled score calculator mapping VARC, DILR, and QA raw scores to expected percentile brackets.",
    href: "/tools/cat-score-calculator",
    icon: Calculator,
    cta: "Calculate Score"
  },
  {
    name: "B-School ROI & Fee Matrix",
    desc: "Compare tuition fees vs median placement salaries across 650+ verified AICTE and UGC institutions.",
    href: "/tools/mba-roi-calculator",
    icon: TrendingUp,
    cta: "Check ROI"
  },
  {
    name: "Direct Admission & Cutoff Directory",
    desc: "In-depth cutoff archives, quota details, and admission requirements categorized by 8 major regional hubs.",
    href: "/colleges",
    icon: FileText,
    cta: "Browse Directory"
  }
];

const MENTORSHIP_PROGRAMS = [
  {
    title: "1-on-1 Profile Strategy & College Shortlisting",
    desc: "Comprehensive evaluation of 10th/12th/Grad scores, work-ex, and entrance scores to create a foolproof 3-tier Dream, Target & Safe B-school roadmap.",
    features: ["Personalized 60-min strategy call", "3-Tier B-School Shortlist matrix", "Sectional cutoff analysis & plan", "Direct WhatsApp access for doubts"]
  },
  {
    title: "GD-PI-WAT Interview Mastery Bootcamp",
    desc: "Rigorous personal interview training, case discussion frameworks, and Written Ability Test evaluations with direct feedback from Mohit Jain.",
    features: ["Live 1-on-1 mock interviews", "Extempore & Case GD frameworks", "SOP & Personal essay review", "Current affairs & business news dossiers"]
  },
  {
    title: "Direct Admission & Institutional Quota Advisory",
    desc: "Transparent guidance for candidates targeting direct admission / institutional merit seats in top AICTE-approved and private university business schools.",
    features: ["Verified seat availability guidance", "Transparent fee structure verification", "Application timeline monitoring", "Zero middlemen or commission bias"]
  }
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://www.careerwithmohit.online/#person-mohit-jain",
      "name": "Mohit Jain",
      "image": "https://www.careerwithmohit.online/og-image.webp",
      "description": "Founder of CareerWithMohit, Chief Career Counsellor & MBA Admissions Strategist, IIM Bangalore and FMS Delhi certified in Digital Marketing.",
      "jobTitle": "Founder & Chief Admissions Strategist",
      "url": "https://www.careerwithmohit.online/about",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "CareerWithMohit",
        "url": "https://www.careerwithmohit.online"
      },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "IIM Bangalore" },
        { "@type": "CollegeOrUniversity", "name": "Faculty of Management Studies (FMS Delhi)" }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Digital Marketing & Strategy Certification",
          "recognizedBy": { "@type": "EducationalOrganization", "name": "IIM Bangalore" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Digital Marketing & Management Certification",
          "recognizedBy": { "@type": "EducationalOrganization", "name": "Faculty of Management Studies (FMS Delhi)" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Six Sigma Yellow & White Belt",
          "credentialCategory": "Professional Certificate"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Business Analytics & Quantitative Modeling",
          "credentialCategory": "Professional Certificate"
        }
      ],
      "knowsAbout": [
        "Digital Marketing & Strategy",
        "MBA Admissions 2027",
        "PGDM Admissions 2027",
        "Direct MBA Admission Guidance",
        "CAT Score to Percentile Mapping",
        "XAT 2027 Preparation Strategy",
        "NMAT & SNAP Selection",
        "GD-PI-WAT Interview Mentorship",
        "B-School ROI & Fee Analysis",
        "Six Sigma Quality Frameworks"
      ],
      "sameAs": [
        "https://wa.me/919560020771",
        "https://www.youtube.com/@careerwithmohit",
        "https://www.linkedin.com/in/mohit-jain-career-counsellor",
        "https://www.instagram.com/careerwithmohit"
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".founder-letter", ".founder-stats", ".founder-principles"]
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <JsonLd data={aboutSchema} />

      {/* Hero: Founder Profile Header - Modern EdTech Style */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#123058] text-white py-20 md:py-28 px-4 sm:px-8 lg:px-12 border-b border-blue-900/40">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-blue-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/15 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Top Live Availability Banner */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Accepting 2027 Admissions Profiles
            </span>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs sm:text-sm font-medium backdrop-blur-md">
              Founder &amp; Lead Strategist
            </span>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
              🎓 IIM Bangalore &amp; FMS Delhi Certified
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <br />
                <span className="text-amber-300">
                  Mohit Jain.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-normal text-blue-100/90 leading-relaxed">
                I help ambitious students and young professionals navigate <span className="text-white font-semibold underline decoration-amber-400 decoration-2 underline-offset-4">MBA, PGDM, and degree admissions</span> with radical honesty, zero commission bias, and real data.
              </p>

              <p className="text-blue-200/80 text-base sm:text-lg leading-relaxed font-normal">
                Over the past 6+ years, I’ve worked with over 5,000 students across India to bridge the gap between entrance exam percentiles, true college ROI, and corporate recruitment reality.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20would%20like%20to%20discuss%20my%20MBA%20admission%20profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-base px-7 py-3.5 transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
                  <span>WhatsApp Direct</span>
                </a>

                <Link
                  href="/inquiry"
                  className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 active:scale-95 text-white font-bold text-base px-7 py-3.5 transition-all backdrop-blur-sm flex items-center gap-2.5 group"
                >
                  <span>Book 1-on-1 Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Right Card / Founder Identity Badge */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/15">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl sm:text-3xl shrink-0 shadow-lg shadow-blue-900/40">
                    MJ
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Mohit Jain</h2>
                    <p className="text-xs sm:text-sm font-medium text-blue-200 uppercase tracking-wider">Chief Mentor &amp; Founder</p>
                    <p className="text-xs font-semibold text-amber-300 mt-1">CareerWithMohit.online</p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-6 text-sm text-blue-100">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />
                    <span>IIM Bangalore Certified in Digital Marketing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />
                    <span>FMS Delhi Certified in Digital Marketing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />
                    <span>Six Sigma Yellow &amp; White Belt Professional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />
                    <span>Ex-Accenture (Amazon Operations) &amp; Doubtnut</span>
                  </div>
                </div>

                <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center">
                  <span className="text-xs font-medium uppercase tracking-wider text-blue-200 block mb-1">Direct Advisory Line</span>
                  <a href="tel:+919560020771" className="font-display text-xl sm:text-2xl font-extrabold text-white hover:text-amber-300 transition-colors flex items-center justify-center gap-2">
                    <PhoneCall className="w-5 h-5 text-amber-300" strokeWidth={2.5} />
                    +91 95600 20771
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-10 border-t border-white/15 founder-stats">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 text-center transition-all hover:bg-white/10"
              >
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="font-bold text-xs sm:text-sm uppercase tracking-wider text-blue-200 mt-1.5">
                  {stat.label}
                </div>
                <div className="text-xs font-normal text-blue-300/70 mt-0.5">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The Founder's Letter: Origin & Philosophy */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
              Personal Manifesto
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Why I Built <span className="text-blue-600">CareerWithMohit</span>
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal founder-letter">
            
            <p className="font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
              "India’s higher education counselling system is fundamentally broken. Thousands of capable students waste years of effort and lakhs of rupees because they trust biased recommendations."
            </p>

            <p>
              When I began my journey in education and corporate strategy, I noticed a troubling pattern: traditional admission agencies rarely recommend colleges based on what is best for the student’s career. Instead, they steer candidates toward whichever private institution pays them the highest student referral bounty.
            </p>

            <p>
              Having worked at <strong>Accenture handling Amazon operational metrics</strong>, scaling business growth at <strong>Doubtnut</strong>, and completing executive management programs at <strong>IIM Bangalore</strong> and <strong>FMS Delhi</strong> certified in Digital Marketing &amp; Strategy, I realized that true career advancement is an engineering discipline. It requires hard data, realistic percentile analysis, genuine return on investment (ROI), and thorough interview preparation.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-6 text-slate-900 font-medium">
              <span className="font-bold uppercase tracking-wider text-xs block text-amber-800 mb-1">My Personal Commitment:</span>
              "I built CareerWithMohit to be the antidote to commercial admission racket. Every mock test, cutoff tool, and counselling session on this platform is built with one benchmark in mind: Would I recommend this to my own younger sibling?"
            </div>

            <p>
              Whether you are scoring 99 percentile in CAT aiming for top IIMs, or seeking genuine direct admission in an AICTE-approved B-school with a 75 percentile in MAT, you deserve unvarnished truth, realistic shortlists, and high-touch mentorship.
            </p>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-display font-extrabold text-xl text-slate-900">Mohit Jain</div>
                <div className="text-sm font-medium text-slate-500">Founder &amp; Chief Admissions Strategist</div>
                <div className="text-xs font-semibold text-blue-600 mt-0.5">IIM Bangalore &amp; FMS Delhi Certified in Digital Marketing</div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/mohit-jain-career-counsellor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 text-white px-3.5 py-1.5 text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@careerwithmohit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-3.5 py-1.5 text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/919560020771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-3.5 py-1.5 text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Advisory Principles: The 5 Rules */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-slate-50 border-b border-slate-200 founder-principles">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-3xl mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
              The Standard
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              The 5 Uncompromising Rules I Advise By
            </h2>
            <p className="text-base sm:text-lg font-normal text-slate-600 mt-3">
              These guiding principles govern every 1-on-1 strategy call, college shortlist, and recommendation we issue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVISORY_PRINCIPLES.map((principle, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-blue-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl font-extrabold text-slate-300">
                      {principle.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                      <principle.icon className="w-6 h-6" strokeWidth={2.2} />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                    {principle.title}
                  </h3>
                  <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Direct Consultation Tile */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-7 flex flex-col justify-between shadow-xl">
              <div>
                <span className="inline-block bg-white/10 text-amber-300 font-semibold text-xs uppercase px-3 py-1 rounded-full mb-4 border border-white/15">
                  1-on-1 Access
                </span>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-3">
                  Have a specific profile dilemma?
                </h3>
                <p className="text-blue-100/80 font-normal text-sm sm:text-base leading-relaxed">
                  Let’s review your academic background, exam scores, and budget to build your custom B-school shortlist.
                </p>
              </div>

              <Link
                href="/inquiry"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm uppercase px-6 py-3 rounded-xl transition-all text-center"
              >
                Apply for Mentorship
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Verified Institutional Credentials */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
              Academic &amp; Professional Rigor
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Institutional Credentials
            </h2>
            <p className="text-base sm:text-lg font-normal text-slate-600 mt-3">
              Strategic counsel backed by executive training from India's premier management institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {CREDENTIALS.map((cred, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between hover:border-blue-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="inline-block font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md bg-slate-900 text-white">
                      {cred.institution}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {cred.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {cred.title}
                  </h3>

                  <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed mb-6">
                    {cred.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Verified Credential
                  </span>
                  <span>Direct Application in Advisory</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The Journey: Visual Career Timeline */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
              Evolution
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              The Founder's Journey
            </h2>
            <p className="text-base sm:text-lg font-normal text-slate-600 mt-3">
              From corporate operations and EdTech growth to architecting an uncompromised student advisory ecosystem.
            </p>
          </div>

          <div className="relative border-l-2 border-blue-300 pl-6 sm:pl-10 ml-4 sm:ml-8 space-y-10">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-[37px] sm:-left-[53px] top-1 w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <item.icon className="w-4 h-4" strokeWidth={2.5} />
                </div>

                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:translate-x-1.5 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-slate-900 text-white font-bold text-xs px-2.5 py-0.5 rounded-md">
                      {item.year}
                    </span>
                    <span className="bg-blue-50 text-blue-700 font-semibold text-xs px-2.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Free Ecosystem Built for Students */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
                Free Student Tools
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                What We Built For You
              </h2>
            </div>
            <p className="text-base sm:text-lg font-normal text-slate-600 max-w-md">
              High-utility preparation tools and calculators available 100% free with zero paywalls.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ECOSYSTEM_TOOLS.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-blue-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-4">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>

                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase text-blue-600 hover:text-blue-800 transition-colors border-t border-slate-100 pt-4"
                >
                  <span>{tool.cta}</span> <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Founder Mentorship Programs */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
              How We Work Together
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Founder Mentorship Programs
            </h2>
            <p className="text-base sm:text-lg font-normal text-slate-600 mt-3">
              Direct, high-impact consulting programs customized to your target business school tier.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {MENTORSHIP_PROGRAMS.map((prog, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-blue-300"
              >
                <div>
                  <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase px-3 py-1 rounded-md mb-4">
                    Program {idx + 1}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {prog.title}
                  </h3>
                  <p className="text-slate-600 font-normal text-sm sm:text-base mb-6 leading-relaxed">
                    {prog.desc}
                  </p>

                  <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-4">
                    {prog.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/inquiry"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm tracking-wide text-center py-3 rounded-xl transition-all shadow-md block"
                >
                  Apply For Program
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive FAQ: "Ask Mohit Directly" */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-xs mb-3">
              Candid Answers
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg font-normal text-slate-600 mt-3">
              Direct, transparent answers from Mohit Jain on profile assessments, admissions, and ROI.
            </p>
          </div>

          <FounderFaq />

        </div>
      </section>

      {/* Final High-Conversion Founder CTA */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#123058] text-white py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden border-t border-blue-900/40">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-7">
          
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md">
            Let's Engineer Your MBA Career
          </span>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Ready To Stop Guessing &amp; <br />
            <span className="text-amber-300">Start Strategizing?</span>
          </h2>

          <p className="text-lg sm:text-xl font-normal text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Don't leave your MBA or degree admission to chance or biased agents. Book a 1-on-1 strategy call with Mohit Jain and get an uncompromised roadmap.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20would%20like%20to%20discuss%20my%20MBA%20admission%20profile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-base sm:text-lg px-8 py-3.5 transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2.5"
            >
              <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              href="/inquiry"
              className="w-full sm:w-auto rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-base sm:text-lg px-8 py-3.5 transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2.5 group"
            >
              <span>Book 1-on-1 Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="pt-6 text-xs sm:text-sm font-medium text-blue-200/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-amber-300" /> Direct: +91 95600 20771
            </span>
            <span>•</span>
            <span>📍 Serving Delhi NCR, Pune, Mumbai, Bangalore &amp; Pan-India</span>
            <span>•</span>
            <span>⚡ 100% Unbiased Advisory</span>
          </div>

        </div>
      </section>

    </div>
  );
}
