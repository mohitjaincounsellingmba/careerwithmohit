import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  BookOpen, 
  Bell, 
  FileText, 
  GraduationCap, 
  Award,
  HelpCircle
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { COMMUNITY_CONFIG } from '@/data/communityLinks';

export const metadata: Metadata = {
  title: "Student Community | Join WhatsApp & Telegram Groups for MBA & Admissions 2027",
  description: "Join India's active student community on Telegram and WhatsApp for CAT 2026, XAT 2027, NMAT, SNAP preparation, free formula PDFs, daily PYQs, and direct mentorship by Mohit Jain.",
  keywords: [
    "student community telegram",
    "MBA telegram group",
    "CAT preparation whatsapp group",
    "MBA admissions community 2027",
    "free cat study material telegram",
    "GDPI preparation group whatsapp",
    "Mohit Jain career counselling community"
  ],
  alternates: {
    canonical: "https://www.careerwithmohit.online/community",
  },
  openGraph: {
    title: "Student Community | Join WhatsApp & Telegram for MBA & Degree Prep",
    description: "Connect with 5,700+ aspirants. Download free formula books, daily entrance exam questions, and get cutoff intelligence.",
    url: "https://www.careerwithmohit.online/community",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "CareerWithMohit Student Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Community | Join WhatsApp & Telegram Groups",
    description: "Connect with 5,700+ aspirants for MBA 2027 admissions, daily quizzes, and cutoff alerts.",
    images: ["/og-image.webp"],
  },
};

const COMMUNITY_FAQS = [
  {
    q: "Is it completely free to join the Telegram and WhatsApp communities?",
    a: "Yes, 100% free forever. All daily exam questions, downloadable PDF formula compendiums, B-school cutoff alerts, and admissions updates are provided without any charge to support student prep."
  },
  {
    q: "What is the difference between the WhatsApp Community and Telegram Channel?",
    a: "The Telegram Channel acts as our central resource drop — hosting downloadable PDF notes, daily practice quizzes, formula books, and instant cutoff notifications. The WhatsApp Community allows peer discussions, GD-PI experience exchanges, and fast-track mentorship inquiries."
  },
  {
    q: "How do you protect members from spam and fake college agents?",
    a: "We follow a strict zero-tolerance policy against unauthorized promotions, fake college marketing agents, and irrelevant messages. All groups are moderated by Mohit Jain's team to ensure 100% academic focus."
  },
  {
    q: "Can I ask Mohit Jain specific questions about my MBA admission profile in the group?",
    a: "Yes! Mohit Jain frequently reviews profile queries in the group. You can also message him directly through the 1-on-1 WhatsApp advisory desk for confidential profile assessment (CAT/XAT score conversions and college shortlisting)."
  }
];

export default function CommunityPage() {
  const { stats, telegram, whatsapp } = COMMUNITY_CONFIG;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": COMMUNITY_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const communitySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CareerWithMohit Student Community Hub",
    "url": "https://www.careerwithmohit.online/community",
    "description": "Interactive WhatsApp and Telegram student network for MBA, PGDM, and degree college aspirants across India.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "CareerWithMohit",
      "url": "https://www.careerwithmohit.online"
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <JsonLd data={faqSchema} />
      <JsonLd data={communitySchema} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0D213F] to-[#122F55] text-white px-6 pt-12 pb-20 sm:px-12 sm:pt-16 sm:pb-28 border-b border-blue-900/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/15 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto max-w-5xl z-10">
          <div className="mb-6">
            <Breadcrumbs />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>5,700+ Active Aspirants</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-300 font-bold">100% Free &amp; Verified</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            India's Premier <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">Student Community</span> for MBA &amp; Higher Education
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Connect directly with ambitious students preparing for CAT, XAT, NMAT, SNAP, and B-school admissions 2027. Access daily practice question sets, official college cutoff releases, and 1-on-1 strategy sessions with <strong className="text-white">Mohit Jain</strong>.
          </p>

          {/* Quick Metrics */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-8 border-t border-white/15">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="font-display text-2xl sm:text-3xl font-black text-amber-300">{stats.totalMembers}</span>
              <p className="text-xs text-blue-200 mt-1">Community Members</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="font-display text-2xl sm:text-3xl font-black text-emerald-400">Daily</span>
              <p className="text-xs text-blue-200 mt-1">Quants &amp; VARC Quizzes</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="font-display text-2xl sm:text-3xl font-black text-sky-400">650+</span>
              <p className="text-xs text-blue-200 mt-1">B-Schools Tracked</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">₹0</span>
              <p className="text-xs text-blue-200 mt-1">Completely Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY CHANNELS SECTION */}
      <section className="px-6 py-16 sm:px-12 sm:py-20 -mt-8 relative z-20">
        <div className="mx-auto max-w-5xl space-y-8">
          
          {/* Card 1: WhatsApp Community */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z"/>
                  </svg>
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1">
                    WhatsApp Group
                  </span>
                  <h2 className="font-display text-2xl font-bold text-slate-900">
                    {whatsapp.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {whatsapp.memberCount}
                </span>
              </div>
            </div>

            <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
              {whatsapp.description}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {whatsapp.highlights.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsapp.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-8 py-3.5 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <span>{whatsapp.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={whatsapp.directCounsellorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-5 py-3.5 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Message Mohit Jain Directly</span>
              </a>
            </div>
          </div>

          {/* Card 2: Telegram Channel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 fill-current" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md mb-1">
                    Telegram Channel
                  </span>
                  <h2 className="font-display text-2xl font-bold text-slate-900">
                    {telegram.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-100/70 border border-sky-200 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  {telegram.memberCount}
                </span>
              </div>
            </div>

            <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
              {telegram.description}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {telegram.highlights.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={telegram.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-base px-8 py-3.5 transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                <span>{telegram.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={telegram.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 font-medium hover:text-slate-800"
              >
                Direct link: {telegram.channelUrl}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT YOU GET INSIDE BREAKDOWN */}
      <section className="px-6 py-16 sm:px-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Exclusive Value
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Everything Students Get Inside
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Curated materials and timely alerts so you never miss a deadline or score opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">CAT/XAT Formula PDFs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Handcrafted revision compendiums for Quants, Geometry, DILR puzzles, and High-Frequency Vocabulary sheets.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Instant Cutoff Alerts</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Be the first to receive released cutoffs for IIMs, XLRI, NMIMS, SIBM, SPJIMR, FMS, and top regional B-schools.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Real GD-PI Transcripts</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Word-for-word interview questions asked in recent rounds, GD hot topics, and WAT essay templates with tips.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Scholarship Updates</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Notifications on merit-based tuition fee waivers, direct quota applications, and corporate scholarship deadlines.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Free Mock Test Keys</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Detailed answer keys and sectional percentile estimators for our portal's 100% free simulated mock tests.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Verified Peer Network</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Zero spam, zero sponsored coaching hype. Pure academic peer sharing moderated by certified admission mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CODE OF CONDUCT / GUIDELINES */}
      <section className="px-6 py-14 sm:px-12 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl rounded-2xl border border-blue-200 bg-blue-50/60 p-6 sm:p-8">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-blue-950">
                Community Code of Conduct
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm mt-1.5 leading-relaxed">
                To preserve high academic standards, all members agree to maintain mutual respect, avoid promotional links, and refrain from commercial spam. Violators are removed immediately by our moderators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 py-16 sm:px-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Community FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {COMMUNITY_FAQS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BAR */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white px-6 py-12 sm:px-12 border-t border-blue-900/40 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Ready to Join 5,700+ Future MBA Leaders?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsapp.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-7 transition-all flex items-center justify-center gap-2"
            >
              <span>Join WhatsApp Group</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={telegram.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-7 transition-all flex items-center justify-center gap-2"
            >
              <span>Join Telegram Channel</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
