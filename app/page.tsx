import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/JsonLd";
import { College4SureScrollProgress } from "@/components/College4SureScrollProgress";
import { College4SureTicker } from "@/components/College4SureTicker";
import { College4SureHero } from "@/components/College4SureHero";
import { College4SureStreamGrid } from "@/components/College4SureStreamGrid";
import { College4SureOffersBand } from "@/components/College4SureOffersBand";
import { College4SureCollegeGrid } from "@/components/College4SureCollegeGrid";
import { College4SureWhyGrid } from "@/components/College4SureWhyGrid";
import { College4SureVideoShowcase } from "@/components/College4SureVideoShowcase";
import { College4SureReviewsMarquee } from "@/components/College4SureReviewsMarquee";
import { College4SureCtaBanner } from "@/components/College4SureCtaBanner";
import { College4SureSeoLinks } from "@/components/College4SureSeoLinks";

const HomeCollegeExplorer = dynamic(
  () => import("@/components/HomeCollegeExplorer").then((mod) => mod.HomeCollegeExplorer),
  {
    loading: () => (
      <div className="mx-auto max-w-[1220px] px-6 py-16 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 rounded-xl mb-4" />
        <div className="h-6 w-96 bg-slate-200 rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-72 bg-slate-200 rounded-3xl" />
          ))}
        </div>
      </div>
    ),
  }
);

const HomeInquirySection = dynamic(
  () => import("@/components/HomeInquirySection").then((mod) => mod.HomeInquirySection),
  {
    loading: () => (
      <div className="mx-auto max-w-[1220px] px-6 py-16 animate-pulse">
        <div className="h-96 bg-slate-200 rounded-3xl" />
      </div>
    ),
  }
);

const ExamTrackerSection = dynamic(
  () => import("@/components/ExamTrackerSection").then((mod) => mod.ExamTrackerSection),
  {
    loading: () => (
      <div className="mx-auto max-w-[1220px] px-6 py-16 animate-pulse">
        <div className="h-80 bg-slate-200 rounded-2xl" />
      </div>
    ),
  }
);

const InteractiveRoiCalculator = dynamic(
  () => import("@/components/InteractiveRoiCalculator").then((mod) => mod.InteractiveRoiCalculator),
  {
    loading: () => (
      <div className="mx-auto max-w-[1220px] px-6 py-16 animate-pulse">
        <div className="h-96 bg-slate-800 rounded-3xl" />
      </div>
    ),
  }
);

const HomeMockTestSlider = dynamic(
  () => import("@/components/HomeMockTestSlider"),
  {
    loading: () => (
      <div className="mx-auto max-w-[1220px] px-6 py-16 animate-pulse">
        <div className="h-80 bg-slate-200 rounded-2xl" />
      </div>
    ),
  }
);

const HOME_FAQS = [
  {
    question: "How does Mohit Jain assist students with MBA & PGDM admissions 2027?",
    answer: "Mohit Jain (certified by IIM Bangalore & FMS Delhi) provides personalized 1-on-1 profile evaluation, B-school shortlist mapping (Dream, Target, Safe), application review, GD-PI-WAT interview training, and guidance on direct admission processes in top AICTE/UGC approved business schools across India.",
  },
  {
    question: "How do I compare colleges side by side on fees and placement rate?",
    answer: "Our interactive Live College Compare engine lets you compare any two institutions across verified placement percentages, highest CTC packages, average salaries, total 2-year course fees, and accepted entrance exams with transparent metric bars.",
  },
  {
    question: "How do I save money on MBA application forms with the Form Discount Tool?",
    answer: "CareerWithMohit offers an MBA Application Form Discount Calculator covering 55+ accredited business schools. By applying in curated combo bundles, candidates save up to ₹5,000+ on official application fees with verified institutional discount codes.",
  },
  {
    question: "Are UGC-DEB approved online degrees legally valid for UPSC, government jobs, and corporate promotions?",
    answer: "Yes, 100%. Under the UGC (ODL & Online Programmes) Regulations 2020 published in the Gazette of India, online degrees from UGC-DEB entitled universities are legally equivalent to conventional classroom degrees. Graduates are fully eligible for UPSC Civil Services, SSC CGL, IBPS Bank PO, State PSCs, and top MNC hiring.",
  },
  {
    question: "Which entrance exam mock tests are available for free on CareerWithMohit?",
    answer: "CareerWithMohit offers 100% free full-length simulated practice mock tests with live countdown timers and instant score breakdowns for CAT 2026, XAT 2027, NMAT 2026, SNAP 2026, MAT, ATMA, GMAT Focus Edition, and IELTS.",
  },
  {
    question: "How do I book a free 1-on-1 video counselling session?",
    answer: "You can schedule a free 30-minute 1-on-1 video call on Google Meet directly through our Calendly booking portal (/book-session) to evaluate your academic profile, budget, and target B-schools with Mohit Jain.",
  },
];

export const metadata: Metadata = {
  title: "Find Top Colleges, Exams & Admission Guidance in India | CareerWithMohit",
  description: "Compare 770+ verified colleges on fees, placement rate and package. Track 26 entrance exam deadlines, take free CBT mock tests, and book 1-on-1 admissions guidance with Mohit Jain.",
  keywords: [
    "education portal india", "college search portal", "career counsellor India", "MBA admission guidance 2027", "PGDM admission 2027", "B.Tech admission expert",
    "free cat mock test 2026", "free xat mock test 2027", "nmat practice test", "snap mock test", "mba form combo discounts",
    "best career counsellor Delhi NCR", "degree admission 2027", "Direct MBA admission 2027", "ROI MBA colleges",
    "online degree courses india 2027", "ugc deb approved online universities", "online mba colleges fees",
    "Noida", "Ghaziabad", "Pune", "Mumbai", "Bangalore", "Jaipur", "Delhi NCR"
  ],
  alternates: {
    canonical: "https://careerwithmohit.online/",
    languages: {
      "en-IN": "https://careerwithmohit.online/",
      "x-default": "https://careerwithmohit.online/",
    },
  },
  openGraph: {
    title: "Find Top Colleges, Exams & Admission Guidance in India | CareerWithMohit",
    description: "Compare 770+ verified colleges on fees, placement rate and package. Track 26 entrance exam deadlines, take free CBT mock tests, and book 1-on-1 admissions guidance with Mohit Jain.",
    url: "https://careerwithmohit.online/",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohit Jain Education & Admissions Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Top Colleges, Exams & Admission Guidance in India | CareerWithMohit",
    description: "770+ Verified Colleges, Free CBT Mock Tests, MBA Form Discounts & 1-on-1 Guidance.",
    images: ["/og-image.webp"],
  },
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
      <JsonLd data={faqSchema} />

      {/* Top Multi-Color Gradient Scroll Progress & Back to Top */}
      <College4SureScrollProgress />

      {/* 1. Live Marquee Ticker Bar with Live Dot */}
      <College4SureTicker />

      {/* 2. Hero Section with Highlighter Angle Marker, Search & Signature Live Compare Widget */}
      <College4SureHero />

      {/* 3. Browse by Field & Stream ("Where to start") */}
      <College4SureStreamGrid />

      {/* 4. Application Fee Discounts & Combo Offers Band */}
      <College4SureOffersBand />

      {/* 5. Top Ranked Colleges Grid ("Compare before you apply") */}
      <College4SureCollegeGrid />

      {/* 6. Unified Pan-India Colleges & B-Schools Discovery Hub */}
      <div className="bg-white py-12 border-b border-[#061124]/10">
        <HomeCollegeExplorer />
      </div>

      {/* 7. Why Students Talk to Mohit Jain First ("Before you apply") */}
      <College4SureWhyGrid />

      {/* 8. Live Interactive MBA ROI & Financial Payback Calculator */}
      <div className="section-deferred bg-[#061124] text-white py-16 border-b border-white/10">
        <InteractiveRoiCalculator />
      </div>

      {/* 9. Free Full-Length CBT Mock Tests Radar */}
      <div className="section-deferred bg-white py-14 border-b border-[#061124]/10">
        <HomeMockTestSlider />
      </div>

      {/* 10. National Entrance Exam Radar & Deadline Tracker */}
      <div className="section-deferred bg-[#F1F5F9]/80 py-14 border-b border-[#061124]/10">
        <ExamTrackerSection />
      </div>

      {/* 11. Video Mentorship & Strategy Masterclasses ("In their words") */}
      <College4SureVideoShowcase />

      {/* 12. Verified Student Reviews Marquee / Wall of Admits ("After the call") */}
      <College4SureReviewsMarquee />

      {/* 13. Dedicated Student Inquiry & Profile Assessment Form */}
      <div id="inquiry-section" className="section-deferred bg-white py-16 border-b border-[#061124]/10">
        <HomeInquirySection />
      </div>

      {/* 14. Final Cosmic Call-To-Action Banner */}
      <College4SureCtaBanner />

      {/* 15. SEO City Hubs & Tools Footer Ribbon */}
      <College4SureSeoLinks />
    </div>
  );
}
