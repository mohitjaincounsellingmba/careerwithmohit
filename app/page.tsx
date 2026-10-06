import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { College4SureScrollProgress } from "@/components/College4SureScrollProgress";
import { College4SureHero } from "@/components/College4SureHero";
import { College4SureStreamGrid } from "@/components/College4SureStreamGrid";
import { College4SureOffersBand } from "@/components/College4SureOffersBand";
import { College4SureCollegeGrid } from "@/components/College4SureCollegeGrid";
import { College4SureWhyGrid } from "@/components/College4SureWhyGrid";
import { College4SureReviewsMarquee } from "@/components/College4SureReviewsMarquee";
import { College4SureCtaBanner } from "@/components/College4SureCtaBanner";
import { College4SureSeoLinks } from "@/components/College4SureSeoLinks";
import { HomeCollegeExplorer } from "@/components/HomeCollegeExplorer";
import { HomeInquirySection } from "@/components/HomeInquirySection";
import { ExamTrackerSection } from "@/components/ExamTrackerSection";
import { InteractiveRoiCalculator } from "@/components/InteractiveRoiCalculator";
import HomeMockTestSlider from "@/components/HomeMockTestSlider";

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
  title: {
    absolute: "Top Colleges & MBA Admissions in India | CareerWithMohit",
  },
  description: "Compare 770+ verified colleges on fees and placements. Practice free CBT mock tests, track exam dates, and get 1-on-1 MBA guidance with Mohit Jain.",
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
    title: "Top Colleges & MBA Admissions in India | CareerWithMohit",
    description: "Compare 770+ verified colleges on fees and placements. Practice free CBT mock tests, track exam dates, and get 1-on-1 MBA guidance with Mohit Jain.",
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
    title: "Top Colleges & MBA Admissions in India | CareerWithMohit",
    description: "Compare 770+ verified colleges on fees and placements with 1-on-1 MBA guidance.",
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

      {/* 1. Hero Section with Search & Live Compare HUD */}
      <College4SureHero />

      {/* 2. Browse by Field & Stream ("Where to start") */}
      <College4SureStreamGrid />

      {/* 3. Application Fee Discounts & Combo Offers Band */}
      <div className="section-deferred">
        <College4SureOffersBand />
      </div>

      {/* 4. Top Ranked Colleges Grid ("Compare before you apply") */}
      <div className="section-deferred">
        <College4SureCollegeGrid />
      </div>

      {/* 5. Unified Pan-India Colleges & B-Schools Discovery Hub */}
      <div className="bg-white py-12 border-b border-[#061124]/10 section-deferred">
        <HomeCollegeExplorer />
      </div>

      {/* 6. Why Students Talk to Mohit Jain First ("Before you apply") */}
      <div className="section-deferred">
        <College4SureWhyGrid />
      </div>

      {/* 7. Live Interactive MBA ROI & Financial Payback Calculator */}
      <div className="section-deferred">
        <InteractiveRoiCalculator />
      </div>

      {/* 8. Free Full-Length CBT Mock Tests Radar */}
      <div className="section-deferred bg-white py-14 border-b border-[#061124]/10">
        <HomeMockTestSlider />
      </div>

      {/* 9. National Entrance Exam Radar & Deadline Tracker */}
      <div className="section-deferred bg-[#F1F5F9]/80 py-14 border-b border-[#061124]/10">
        <ExamTrackerSection />
      </div>


      {/* 11. Verified Student Reviews Marquee / Wall of Admits ("After the call") */}
      <div className="section-deferred">
        <College4SureReviewsMarquee />
      </div>

      {/* 12. Dedicated Student Inquiry & Profile Assessment Form */}
      <div id="inquiry-section" className="section-deferred bg-white py-16 border-b border-[#061124]/10">
        <HomeInquirySection />
      </div>

      {/* 13. Comprehensive MBA Admissions & College Guide (Authority SEO Text) */}
      <section className="bg-white py-16 border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span>Admissions 2027 Intelligence Guide</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#061124] tracking-tight leading-tight">
                Strategic Guidance for Top MBA Colleges &amp; Competitive Entrance Exams in India
              </h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Choosing the right business school is one of the most significant investments in your career. With over 770+ accredited institutions in India offering MBA and PGDM programs, candidates often struggle with confusing placement statistics, unverified average packages, and fluctuating cutoffs. <strong>CareerWithMohit</strong> provides transparent, data-driven admissions consulting and unbiased mentorship led by <strong>Mohit Jain</strong>, an alumnus with executive marketing and strategy credentials recognized by top business schools like the <strong>Indian Institute of Management (IIM Bangalore)</strong> and the Faculty of Management Studies (FMS Delhi).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2.5">
                  Top MBA Colleges in Delhi NCR, Pune, Mumbai &amp; Bangalore
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Explore leading management institutes across prime educational hubs including <strong>Delhi NCR</strong> (Noida, Greater Noida, Gurgaon), Pune, Mumbai, Bangalore, and Jaipur. We evaluate colleges based on faculty-to-student ratios, NIRF rankings, corporate recruiter networks, and specializations across Finance, Marketing, Business Analytics, HR, and Operations.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2.5">
                  Total Fees, Scholarships &amp; Real ROI Payback Analysis
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Understand true educational costs beyond brochure tuition. Our interactive comparison tools factor in hostel charges, mess fees, and mandatory security deposits against verified median CTC packages ranging from ₹8 <strong>Lakhs</strong> to ₹35+ <strong>Lakhs</strong> per annum, ensuring you select institutions offering a rapid 2 to 3-year return on investment (ROI).
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2.5">
                  Free Full-Length CBT Mock Test Engine (CAT, XAT, NMAT, SNAP)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Practice under real exam pressure with our 100% free Computer Based Test (CBT) simulator. Take simulated full-length <strong>mock test</strong> papers for CAT 2026, XAT 2027, NMAT, SNAP, MAT, and ATMA featuring sectional countdown timers, negative marking calculations, and detailed post-exam solution analytics.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2.5">
                  1-on-1 Profile Assessment &amp; MBA Form Combo Discounts
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Save up to ₹5,000+ on application fees across 55+ accredited institutions using our exclusive institutional form discounts. Book a personalized 1-on-1 Google Meet session with <strong>Mohit Jain</strong> to evaluate your profile (Dream, Target, Safe colleges) and craft winning GD-PI-WAT interview strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Frequently Asked Questions (FAQ) Interactive Section */}
      <section className="bg-[#F8FAFC] py-16 border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#061124] tracking-tight">
                Everything You Need to Know About Admissions &amp; Mock Tests
              </h2>
            </div>

            <div className="space-y-4">
              {HOME_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-sm transition-all open:shadow-md open:border-blue-400/50"
                >
                  <summary className="font-display font-bold text-base sm:text-lg text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-open:rotate-180 group-open:bg-blue-600 group-open:text-white transition-all shrink-0">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed pt-2 border-t border-slate-100">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. Final Cosmic Call-To-Action Banner */}
      <div className="section-deferred">
        <College4SureCtaBanner />
      </div>

      {/* 16. SEO City Hubs & Tools Footer Ribbon */}
      <div className="section-deferred">
        <College4SureSeoLinks />
      </div>
    </div>
  );
}
