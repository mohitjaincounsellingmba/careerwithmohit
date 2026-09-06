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
    <div className="w-full bg-yellow-50/40 min-h-screen selection:bg-foreground selection:text-white">
      <JsonLd data={aboutSchema} />

      {/* Hero: Founder Profile Header */}
      <section className="bg-white border-b-8 border-foreground py-16 md:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Subtle geometric dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Top Live Availability Banner */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 font-black uppercase text-xs sm:text-sm px-4 py-1.5 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Accepting 2027 Admissions Profiles
            </span>
            <span className="inline-block bg-foreground text-white font-black uppercase text-xs sm:text-sm px-4 py-1.5 border-2 border-foreground">
              Founder & Lead Strategist
            </span>
            <span className="inline-block bg-blue-100 text-blue-900 font-black uppercase text-xs sm:text-sm px-4 py-1.5 border-2 border-foreground">
              IIM Bangalore & FMS Delhi Certified in Digital Marketing
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-foreground leading-[0.95]">
                Hi, I'm <br />
                <span className="inline-block bg-primary text-white px-5 py-2 mt-2 -rotate-1 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform">
                  Mohit Jain.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
                I help ambitious students and young professionals navigate <span className="bg-yellow-200 px-1 border-b-2 border-foreground">MBA, PGDM, and degree admissions</span> with radical honesty, zero commission bias, and real data.
              </p>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Over the past 6+ years, I’ve worked with over 5,000 students across India to bridge the gap between entrance exam percentiles, true college ROI, and corporate recruitment reality.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href="/inquiry"
                  className="bg-primary text-white font-black uppercase text-base sm:text-lg px-8 py-4 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3 group"
                >
                  Book 1-on-1 Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </Link>

                <a
                  href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20would%20like%20to%20discuss%20my%20MBA%20admission%20profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 text-white font-black uppercase text-base sm:text-lg px-6 py-4 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" strokeWidth={3} />
                  WhatsApp Direct
                </a>
              </div>
            </div>

            {/* Right Card / Founder Identity Badge */}
            <div className="lg:col-span-5">
              <div className="bg-yellow-300 border-8 border-foreground p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-foreground">
                  <div className="w-20 h-20 bg-foreground text-white rounded-none border-4 border-foreground flex items-center justify-center font-display font-black text-3xl shrink-0 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
                    MJ
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Mohit Jain</h2>
                    <p className="text-sm font-bold text-gray-800 uppercase">Chief Mentor & Founder</p>
                    <p className="text-xs font-black text-primary mt-1">CareerWithMohit.online</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-gray-900">
                    <Check className="w-5 h-5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>IIM Bangalore Certified in Digital Marketing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-bold text-gray-900">
                    <Check className="w-5 h-5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>FMS Delhi Certified in Digital Marketing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-bold text-gray-900">
                    <Check className="w-5 h-5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>Six Sigma Yellow & White Belt Professional</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-bold text-gray-900">
                    <Check className="w-5 h-5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>Ex-Accenture (Amazon Operations) & Doubtnut</span>
                  </div>
                </div>

                <div className="bg-white border-4 border-foreground p-4 text-center">
                  <span className="text-xs font-black uppercase text-gray-500 block mb-1">Direct Advisory Line</span>
                  <a href="tel:+919560020771" className="font-display text-2xl font-black text-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
                    <PhoneCall className="w-5 h-5 text-primary" strokeWidth={3} />
                    +91 95600 20771
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t-4 border-foreground founder-stats">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-muted border-4 border-foreground p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform"
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="font-black text-sm uppercase text-gray-900 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs font-bold text-gray-500 mt-0.5">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The Founder's Letter: Origin & Philosophy */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-amber-100 border-b-8 border-foreground">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
              Personal Manifesto
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              Why I Built <span className="bg-primary text-white px-3 py-1 -rotate-1 inline-block border-2 border-foreground">CareerWithMohit</span>
            </h2>
          </div>

          <div className="bg-white border-8 border-foreground p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-6 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium founder-letter">
            
            <p className="font-bold text-2xl sm:text-3xl text-foreground leading-snug">
              "India’s higher education counselling system is fundamentally broken. Thousands of capable students waste years of effort and lakhs of rupees because they trust biased recommendations."
            </p>

            <p>
              When I began my journey in education and corporate strategy, I noticed a troubling pattern: traditional admission agencies rarely recommend colleges based on what is best for the student’s career. Instead, they steer candidates toward whichever private institution pays them the highest student referral bounty.
            </p>

            <p>
              Having worked at <strong>Accenture handling Amazon operational metrics</strong>, scaling business growth at <strong>Doubtnut</strong>, and completing executive management programs at <strong>IIM Bangalore</strong> and <strong>FMS Delhi</strong> certified in Digital Marketing & Strategy, I realized that true career advancement is an engineering discipline. It requires hard data, realistic percentile analysis, genuine return on investment (ROI), and thorough interview preparation.
            </p>

            <div className="bg-yellow-200 border-4 border-foreground p-6 my-6 font-bold text-foreground">
              <span className="font-black uppercase text-sm block text-gray-700 mb-1">My Personal Commitment:</span>
              "I built CareerWithMohit to be the antidote to commercial admission racket. Every mock test, cutoff tool, and counselling session on this platform is built with one benchmark in mind: Would I recommend this to my own younger sibling?"
            </div>

            <p>
              Whether you are scoring 99 percentile in CAT aiming for top IIMs, or seeking genuine direct admission in an AICTE-approved B-school with a 75 percentile in MAT, you deserve unvarnished truth, realistic shortlists, and high-touch mentorship.
            </p>

            <div className="pt-6 border-t-4 border-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-display font-black text-2xl uppercase text-foreground">Mohit Jain</div>
                <div className="text-sm font-bold text-gray-600">Founder & Chief Admissions Strategist</div>
                <div className="text-xs font-bold text-primary">IIM Bangalore & FMS Delhi Certified in Digital Marketing</div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/mohit-jain-career-counsellor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-foreground text-white px-4 py-2 text-xs font-black uppercase hover:bg-primary transition-colors border-2 border-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@careerwithmohit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 text-xs font-black uppercase hover:bg-red-700 transition-colors border-2 border-foreground"
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/919560020771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-4 py-2 text-xs font-black uppercase hover:bg-emerald-700 transition-colors border-2 border-foreground"
                >
                  WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Advisory Principles: The 5 Rules */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b-8 border-foreground founder-principles">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
              The Standard
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              The 5 Uncompromising Rules I Advise By
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-700 mt-4">
              These guiding principles govern every 1-on-1 strategy call, college shortlist, and recommendation we issue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVISORY_PRINCIPLES.map((principle, idx) => (
              <div
                key={idx}
                className="bg-muted border-4 border-foreground p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-200 hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-4xl font-black text-foreground/40">
                      {principle.number}
                    </span>
                    <div className="w-12 h-12 bg-primary text-white border-2 border-foreground flex items-center justify-center">
                      <principle.icon className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-black text-foreground uppercase tracking-tight mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Direct Consultation Tile */}
            <div className="bg-foreground text-white border-4 border-foreground p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]">
              <div>
                <span className="inline-block bg-primary text-white font-black text-xs uppercase px-3 py-1 mb-4">
                  1-on-1 Access
                </span>
                <h3 className="font-display text-3xl font-black uppercase text-white tracking-tight mb-3">
                  Have a specific profile dilemma?
                </h3>
                <p className="text-gray-300 font-medium text-base leading-relaxed">
                  Let’s review your academic background, exam scores, and budget to build your custom B-school shortlist.
                </p>
              </div>

              <Link
                href="/inquiry"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase px-6 py-3 border-2 border-white hover:bg-white hover:text-primary transition-colors text-center"
              >
                Apply for Mentorship
                <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Verified Institutional Credentials */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-blue-50 border-b-8 border-foreground">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
              Academic & Professional Rigor
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              Institutional Credentials
            </h2>
            <p className="text-lg font-bold text-gray-700 mt-4">
              Strategic counsel backed by executive training from India's premier management institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CREDENTIALS.map((cred, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="inline-block font-black text-xs uppercase tracking-wider px-3 py-1 bg-foreground text-white">
                      {cred.institution}
                    </span>
                    <span className="text-xs font-bold uppercase text-gray-500 border border-gray-300 px-2 py-0.5">
                      {cred.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight mb-3">
                    {cred.title}
                  </h3>

                  <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed mb-6">
                    {cred.desc}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-foreground/10 flex items-center justify-between text-xs font-black uppercase text-gray-500">
                  <span className="flex items-center gap-1.5 text-emerald-700">
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
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b-8 border-foreground">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
              Evolution
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              The Founder's Journey
            </h2>
            <p className="text-lg font-bold text-gray-700 mt-4">
              From corporate operations and EdTech growth to architecting an uncompromised student advisory ecosystem.
            </p>
          </div>

          <div className="relative border-l-8 border-foreground pl-6 sm:pl-10 ml-4 sm:ml-8 space-y-12">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-[38px] sm:-left-[54px] top-1 w-10 h-10 bg-yellow-300 border-4 border-foreground flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <item.icon className="w-5 h-5 text-foreground" strokeWidth={2.5} />
                </div>

                <div className="bg-muted border-4 border-foreground p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 hover:translate-x-2 transition-all">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="bg-foreground text-white font-black text-xs uppercase px-3 py-1">
                      {item.year}
                    </span>
                    <span className="bg-white border-2 border-foreground text-foreground font-black text-xs uppercase px-2 py-0.5">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Free Ecosystem Built for Students */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-amber-50 border-b-8 border-foreground">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
                Free Student Tools
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
                What We Built For You
              </h2>
            </div>
            <p className="text-lg font-bold text-gray-700 max-w-md">
              High-utility preparation tools and calculators available 100% free with zero paywalls.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ECOSYSTEM_TOOLS.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-foreground p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:bg-yellow-200 transition-all"
              >
                <div>
                  <div className="w-12 h-12 bg-foreground text-white border-2 border-foreground flex items-center justify-center mb-4">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-black text-foreground uppercase tracking-tight mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>

                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-2 font-black text-xs uppercase text-primary hover:text-foreground transition-colors border-t-2 border-foreground/10 pt-4"
                >
                  {tool.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Founder Mentorship Programs */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white border-b-8 border-foreground">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
              How We Work Together
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              Founder Mentorship Programs
            </h2>
            <p className="text-lg font-bold text-gray-700 mt-4">
              Direct, high-impact consulting programs customized to your target business school tier.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {MENTORSHIP_PROGRAMS.map((prog, idx) => (
              <div
                key={idx}
                className="bg-muted border-4 border-foreground p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 transition-colors"
              >
                <div>
                  <div className="inline-block bg-foreground text-white text-xs font-black uppercase px-3 py-1 mb-4">
                    Program {idx + 1}
                  </div>
                  <h3 className="font-display text-2xl font-black text-foreground uppercase tracking-tight mb-3">
                    {prog.title}
                  </h3>
                  <p className="text-gray-700 font-medium text-base mb-6 leading-relaxed">
                    {prog.desc}
                  </p>

                  <ul className="space-y-2.5 mb-8 border-t-2 border-foreground/10 pt-4">
                    {prog.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm font-bold text-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/inquiry"
                  className="w-full bg-primary text-white font-black uppercase text-center py-3.5 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm block"
                >
                  Apply For Program
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive FAQ: "Ask Mohit Directly" */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-yellow-100 border-b-8 border-foreground">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-3">
              Candid Answers
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-bold text-gray-700 mt-4">
              Direct, transparent answers from Mohit Jain on profile assessments, admissions, and ROI.
            </p>
          </div>

          <FounderFaq />

        </div>
      </section>

      {/* Final High-Conversion Founder CTA */}
      <section className="bg-foreground text-white py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Background icon decoration */}
        <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
          <GraduationCap className="w-96 h-96 text-white" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          <span className="inline-block bg-primary text-white font-black uppercase tracking-widest text-xs sm:text-sm px-6 py-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rotate-1">
            Let's Engineer Your MBA Career
          </span>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
            Ready To Stop Guessing & <br />
            <span className="text-yellow-300">Start Strategizing?</span>
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don't leave your MBA or degree admission to chance or biased agents. Book a 1-on-1 strategy call with Mohit Jain and get an uncompromised roadmap.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/inquiry"
              className="w-full sm:w-auto bg-primary text-white font-black uppercase text-xl px-10 py-5 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3 group"
            >
              Book 1-on-1 Consultation
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>

            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20would%20like%20to%20discuss%20my%20MBA%20admission%20profile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-500 text-white font-black uppercase text-xl px-8 py-5 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <MessageSquare className="w-6 h-6" strokeWidth={3} />
              Chat on WhatsApp
            </a>
          </div>

          <div className="pt-8 text-sm font-bold text-gray-400 flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-primary" /> Direct: +91 95600 20771
            </span>
            <span>•</span>
            <span>📍 Serving Delhi NCR, Pune, Mumbai, Bangalore & Pan-India</span>
            <span>•</span>
            <span>⚡ 100% Unbiased Advisory</span>
          </div>

        </div>
      </section>

    </div>
  );
}
