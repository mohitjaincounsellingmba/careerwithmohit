'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Star, 
  Check, 
  X, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  HelpCircle, 
  Phone, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Smartphone,
  MessageCircle
} from 'lucide-react';
import { SellCoachingLeadForm } from '@/components/SellCoachingLeadForm';

interface SellCoachingInteractiveSectionProps {
  initialFaqOpenIndex?: number | null;
}

const FAQS = [
  {
    question: "How much does it cost to launch a branded coaching app with CareerWithMohit?",
    answer: "Unlike third-party marketplaces that charge 20% to 40% revenue share on every course sold, CareerWithMohit operates on a 0% commission model. You keep 100% of your course and test series earnings. We offer straightforward, transparent technology plans tailored to whether you are an individual teacher, YouTuber, or institute. Book a free demo to get a custom quote for your requirements."
  },
  {
    question: "How do you protect my video courses from piracy and screen recording?",
    answer: "Our apps use enterprise-grade anti-piracy DRM encryption. Screen recording, screenshots, and screen mirroring are completely blocked on Android and iOS devices. Additionally, dynamic student ID and phone number watermarks appear on screen during video playback to prevent external camera recording."
  },
  {
    question: "How long does it take to get my Android, iOS app, and web portal live?",
    answer: "Your turnkey branded app and web academy can go live in as little as 7 days. Our technical team handles everything from Google Play Store and Apple App Store setup to custom domain linking, payment gateway integration, and app branding with your logo and colors."
  },
  {
    question: "Do I need coding or technical knowledge to manage my app and courses?",
    answer: "Not at all! You get an intuitive, zero-code Admin Dashboard where you can upload recorded lectures, schedule live interactive classes, create AI mock tests, generate discount coupons, and track student fee payments with a single click."
  },
  {
    question: "Why should I choose a custom branded app over marketplaces like Udemy or Classplus?",
    answer: "With Course Marketplaces, you don't own your brand or your student database—they promote other teachers' courses to your students and take a large cut of your revenue. With CareerWithMohit, you own 100% of your brand identity, custom domain, and student contact list, with zero commission share."
  },
  {
    question: "Can I conduct live classes, AI mock tests, and receive automated GST payments?",
    answer: "Yes! Our platform includes built-in HD live streaming with real-time chat, AI-powered mock test series with automatic grading, and seamless UPI, Credit/Debit Card, and Netbanking payments with automated GST invoicing and fee receipts."
  }
];

const COMPARISON_DATA = [
  {
    feature: "Revenue Share / Commission",
    careerWithMohit: "0% Commission (Keep 100%)",
    marketplaces: "20% – 40% Commission",
    youtube: "30% Cut by YouTube",
    highlight: true
  },
  {
    feature: "App Name & Brand Ownership",
    careerWithMohit: "100% Your Brand & Logo",
    marketplaces: "Shared Marketplace Brand",
    youtube: "YouTube's Platform",
    highlight: true
  },
  {
    feature: "Video Anti-Piracy & DRM Security",
    careerWithMohit: "Enterprise DRM & Screen Block",
    marketplaces: "Basic Protection",
    youtube: "No DRM / Easily Downloadable",
    highlight: false
  },
  {
    feature: "Student Contact List Ownership",
    careerWithMohit: "100% Full Access & Exports",
    marketplaces: "Restricted / Locked Data",
    youtube: "No Email or Phone Access",
    highlight: true
  },
  {
    feature: "Automated GST Invoicing & UPI",
    careerWithMohit: "Direct to Your Bank Account",
    marketplaces: "Monthly Payouts (Delayed)",
    youtube: "Threshold Payouts",
    highlight: false
  },
  {
    feature: "AI Mock Tests & Live Classes",
    careerWithMohit: "All-in-One Integrated",
    marketplaces: "Extra Add-on Fees",
    youtube: "Not Available",
    highlight: false
  }
];

const CASE_STUDIES = [
  {
    name: "Apex MBA & CAT Academy",
    location: "New Delhi",
    role: "Coaching Institute Owner",
    growth: "+380% Online Revenue",
    quote: "We transitioned our physical classrooms in Delhi NCR to a branded Android & iOS app. Within 6 months, we enrolled over 4,200 online students across India with zero video piracy.",
    stats: "4,200+ Active Students"
  },
  {
    name: "Dr. Arvind Sharma",
    location: "Jaipur",
    role: "UPSC & Civil Services Educator",
    growth: "₹14+ Lakh Saved in Commission",
    quote: "Other LMS platforms wanted 30% of my hard-earned course fees. With CareerWithMohit, I own my student community, keep 100% of my earnings, and the app runs flawlessly.",
    stats: "18,000+ App Downloads"
  },
  {
    name: "CodeCraft With Priya",
    location: "Bangalore",
    role: "Tech YouTuber & Educator",
    growth: "4.8X Student Conversion",
    quote: "Moving my subscribers from YouTube memberships to my own branded iOS and Android app was the best decision. My students love the ad-free learning experience.",
    stats: "0% Commission Paid"
  }
];

export function SellCoachingInteractiveSection({ initialFaqOpenIndex = 0 }: SellCoachingInteractiveSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(initialFaqOpenIndex);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [dismissStickyBar, setDismissStickyBar] = useState(false);

  // Interactive Calculator State
  const [studentsCount, setStudentsCount] = useState<number>(500);
  const [courseFee, setCourseFee] = useState<number>(2500);

  // Calculations
  const totalAnnualRevenue = studentsCount * courseFee;
  const marketplaceCommissionLoss = Math.round(totalAnnualRevenue * 0.30); // 30% loss
  const careerWithMohitRevenue = totalAnnualRevenue; // 0% commission
  const annualSavings = marketplaceCommissionLoss;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* 1. INTERACTIVE 10X COACHING INCOME & ROI CALCULATOR */}
      <section className="bg-white px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent text-foreground px-4 py-1.5 font-black uppercase text-sm border-2 border-foreground mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Interactive ROI Calculator
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-6">
              See How Much <span className="text-primary italic">Extra Profit</span> You Earn
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-3xl mx-auto">
              Stop giving away 30% of your hard-earned tuition and course fees to marketplace platforms. Calculate your earnings on your own branded app.
            </p>
          </div>

          <div className="bg-white border-8 border-foreground rounded-3xl p-8 sm:p-12 shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Sliders Control Column */}
              <div className="space-y-8 bg-gray-50 p-8 rounded-2xl border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-black uppercase tracking-wide text-foreground flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" /> Active Students / Subscribers
                    </label>
                    <span className="bg-primary text-white font-black text-xl px-4 py-1 rounded-lg border-2 border-foreground">
                      {studentsCount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="5000" 
                    step="50"
                    value={studentsCount}
                    onChange={(e) => setStudentsCount(Number(e.target.value))}
                    className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary border-2 border-foreground"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
                    <span>50 Students</span>
                    <span>2,500 Students</span>
                    <span>5,000+ Students</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-black uppercase tracking-wide text-foreground flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-emerald-600" /> Average Course / Test Fee (₹)
                    </label>
                    <span className="bg-emerald-600 text-white font-black text-xl px-4 py-1 rounded-lg border-2 border-foreground">
                      {formatCurrency(courseFee)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="15000" 
                    step="250"
                    value={courseFee}
                    onChange={(e) => setCourseFee(Number(e.target.value))}
                    className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 border-2 border-foreground"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
                    <span>₹500 / course</span>
                    <span>₹7,500 / course</span>
                    <span>₹15,000 / course</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border-2 border-foreground text-center">
                  <p className="text-sm font-bold text-gray-600">
                    Total Gross Course Sales: <strong className="text-foreground font-black">{formatCurrency(totalAnnualRevenue)}</strong>
                  </p>
                </div>
              </div>

              {/* Comparison Results Column */}
              <div className="space-y-6">
                <div className="bg-rose-50 border-4 border-foreground p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-rose-700 bg-white px-2.5 py-1 rounded border border-rose-300">
                      Marketplace App (30% Cut)
                    </span>
                    <h3 className="text-2xl font-extrabold text-foreground mt-2">
                      {formatCurrency(totalAnnualRevenue - marketplaceCommissionLoss)}
                    </h3>
                    <p className="text-sm font-bold text-rose-600 mt-1">
                      You lose {formatCurrency(marketplaceCommissionLoss)} in commissions
                    </p>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-rose-200 border-2 border-foreground flex items-center justify-center text-rose-700 font-black text-xl">
                    -30%
                  </div>
                </div>

                <div className="bg-emerald-50 border-4 border-foreground p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] flex items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-300/20 rounded-full -mr-8 -mt-8 pointer-events-none" />
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-200 px-2.5 py-1 rounded border-2 border-foreground">
                      CareerWithMohit App (0% Cut)
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
                      {formatCurrency(careerWithMohitRevenue)}
                    </h3>
                    <p className="text-sm font-black text-emerald-700 mt-1 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> You keep 100% of your earnings
                    </p>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-emerald-400 border-2 border-foreground flex items-center justify-center text-foreground font-black text-xl">
                    100%
                  </div>
                </div>

                {/* Extra Profit Saved Badge */}
                <div className="bg-accent border-4 border-foreground p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
                  <p className="text-sm font-black uppercase tracking-widest text-foreground">
                    ⚡ Extra Profit In Your Pocket Every Year
                  </p>
                  <p className="text-4xl font-black text-foreground my-2">
                    +{formatCurrency(annualSavings)}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 w-full bg-foreground text-white hover:bg-white hover:text-foreground font-black py-4 px-6 rounded-xl border-4 border-foreground transition-all uppercase tracking-wider text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 cursor-pointer"
                  >
                    Claim 0% Commission Plan &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM COMPARISON TABLE (SEO & HIGH CONVERSION) */}
      <section className="bg-muted px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent text-foreground px-4 py-1.5 font-black uppercase text-sm border-2 border-foreground mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Platform Comparison
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-6">
              Why Educators <span className="text-primary italic">Switch to Us</span>
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-3xl mx-auto">
              See why over 50,000 teachers, tutors, and coaching institutes choose a custom branded app over generic marketplaces.
            </p>
          </div>

          <div className="overflow-x-auto bg-white border-8 border-foreground rounded-3xl shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-foreground text-white border-b-4 border-foreground">
                  <th className="p-6 text-lg sm:text-xl font-black uppercase tracking-wider min-w-[220px]">
                    Feature / Requirement
                  </th>
                  <th className="p-6 text-lg sm:text-xl font-black uppercase tracking-wider bg-primary text-white border-x-4 border-foreground min-w-[240px]">
                    ⭐ CareerWithMohit App
                  </th>
                  <th className="p-6 text-lg sm:text-xl font-black uppercase tracking-wider text-gray-300 min-w-[220px]">
                    Course Marketplaces
                  </th>
                  <th className="p-6 text-lg sm:text-xl font-black uppercase tracking-wider text-gray-300 min-w-[200px]">
                    YouTube Memberships
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-foreground font-bold">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={row.highlight ? "bg-amber-50/60 hover:bg-amber-100/70 transition-colors" : "hover:bg-gray-50 transition-colors"}
                  >
                    <td className="p-6 text-foreground font-black text-base sm:text-lg">
                      {row.feature}
                    </td>
                    <td className="p-6 bg-emerald-50 text-emerald-900 font-black text-base sm:text-lg border-x-4 border-foreground">
                      <div className="flex items-center gap-2">
                        <span className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </span>
                        <span>{row.careerWithMohit}</span>
                      </div>
                    </td>
                    <td className="p-6 text-gray-600 text-base">
                      <div className="flex items-center gap-2">
                        <span className="h-7 w-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                          <X className="h-4 w-4 stroke-[3]" />
                        </span>
                        <span>{row.marketplaces}</span>
                      </div>
                    </td>
                    <td className="p-6 text-gray-600 text-base">
                      <div className="flex items-center gap-2">
                        <span className="h-7 w-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
                          <X className="h-4 w-4 stroke-[3]" />
                        </span>
                        <span>{row.youtube}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 bg-accent text-foreground px-10 py-5 text-2xl font-black uppercase tracking-wider rounded-xl border-4 border-foreground hover:bg-white hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Start Building Your Branded App &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 3. SUCCESS STORIES / CASE STUDIES (SOCIAL PROOF) */}
      <section className="bg-white px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block bg-accent text-foreground px-4 py-1.5 font-black uppercase text-sm border-2 border-foreground mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Educator Case Studies
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-6">
              Proven Results By <span className="text-primary italic">Real Teachers</span>
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-3xl mx-auto">
              Read how educators across India scaled their digital coaching academies and multiplied their student enrollments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {CASE_STUDIES.map((study, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border-4 border-foreground p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs uppercase px-3 py-1 rounded-full border border-emerald-400">
                      {study.stats}
                    </span>
                    <span className="bg-accent text-foreground font-black text-xs uppercase px-3 py-1 rounded border border-foreground">
                      {study.growth}
                    </span>
                  </div>
                  <div className="flex gap-1 text-amber-500 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 font-bold leading-relaxed italic mb-8">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t-2 border-gray-100 pt-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-foreground uppercase">
                      {study.name}
                    </h3>
                    <p className="text-sm font-bold text-primary">
                      {study.role} • {study.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 border-4 border-foreground p-8 sm:p-12 rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-3xl font-black text-foreground uppercase">
                Ready to Become Our Next Success Story?
              </h3>
              <p className="text-gray-700 font-bold mt-2">
                Book a 1-on-1 personalized consultation and app demo with our coaching growth specialists.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex-shrink-0 bg-primary text-white hover:bg-white hover:text-foreground px-8 py-5 text-xl font-black uppercase rounded-xl border-4 border-foreground transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Book Strategy Call &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 4. SEO FREQUENTLY ASKED QUESTIONS (WITH ACCORDION & FAQ SCHEMA SUPPORT) */}
      <section className="bg-white px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent text-foreground px-4 py-1.5 font-black uppercase text-sm border-2 border-foreground mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Got Questions?
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-6">
              Frequently Asked <span className="text-primary italic">Questions</span>
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about launching your own branded coaching app, website, and digital academy.
            </p>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border-4 border-foreground rounded-2xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 font-display font-black text-xl sm:text-2xl text-foreground uppercase hover:bg-gray-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div className="h-10 w-10 rounded-xl bg-gray-100 border-2 border-foreground flex items-center justify-center flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-6 w-6 text-foreground stroke-[3]" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-foreground stroke-[3]" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-8 sm:px-8 pt-2 text-gray-700 font-bold text-lg leading-relaxed border-t-2 border-gray-100 bg-gray-50/50">
                      <p>{faq.answer}</p>
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center gap-2 text-primary hover:text-foreground font-black uppercase text-sm tracking-wider cursor-pointer"
                        >
                          Want to discuss this with our team? Book Free Demo &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg font-bold text-gray-600 mb-6">
              Have a custom requirement or need a live demonstration?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-accent text-foreground px-8 py-4 text-xl font-black uppercase tracking-wider rounded-xl border-4 border-foreground hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                Book Free Demo Now &rarr;
              </button>
              <a
                href="https://wa.me/919560020771?text=Hi%2C%20I%20visited%20sell-your-coaching-online%20and%20want%20to%20know%20more%20about%20building%20my%20branded%20coaching%20app."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-xl font-black uppercase tracking-wider rounded-xl border-4 border-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3"
              >
                <MessageCircle className="h-6 w-6" /> WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STICKY / FLOATING BOTTOM LEAD BAR (FOR UNSTOPPABLE CONVERSIONS) */}
      {showStickyBar && !dismissStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-foreground text-white border-t-4 border-accent shadow-[0px_-8px_24px_rgba(0,0,0,0.4)] animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="hidden md:inline-flex h-3 w-3 rounded-full bg-accent animate-ping" />
              <div>
                <p className="font-display font-black text-sm sm:text-base uppercase text-white">
                  ⚡ Launch Your Branded Coaching App in 7 Days
                </p>
                <p className="text-xs font-bold text-gray-300 hidden sm:block">
                  0% Revenue Share • 100% Brand Ownership • Anti-Piracy Security
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href="https://wa.me/919560020771?text=Hi%2C%20I%20am%20interested%20in%20launching%20my%20own%20branded%20coaching%20app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg border-2 border-white font-black text-sm uppercase transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-initial bg-accent text-foreground hover:bg-white px-5 py-2.5 rounded-lg border-2 border-white font-black text-sm uppercase transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
              >
                Book Free Demo
              </button>
              <button
                onClick={() => setDismissStickyBar(true)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors ml-1"
                aria-label="Dismiss banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL WINDOW FOR LEAD BOOKING */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground rounded-3xl bg-white">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-xl"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 stroke-[3px]" />
            </button>
            <div className="bg-white">
              <div className="bg-primary p-8 text-center border-b-8 border-foreground">
                <span className="inline-block bg-accent text-foreground px-4 py-1 font-black uppercase text-xs border-2 border-foreground mb-3">
                  0% Revenue Share • 7-Day Launch
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
                  Schedule Free Personal Demo
                </h2>
                <p className="text-blue-100 font-bold mt-2">
                  See our coaching app builder in action and get a custom roadmap to 10x your coaching income.
                </p>
              </div>
              <div className="p-4 md:p-8">
                <SellCoachingLeadForm onSuccess={() => setIsModalOpen(false)} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
}
