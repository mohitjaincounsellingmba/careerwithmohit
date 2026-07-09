import { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Phone, ChevronDown } from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';
import OnlineDegreeLeadForm from '@/components/OnlineDegreeLeadForm';
import { COLLEGES } from '@/data/onlineColleges';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/online-degree-certification';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Top Online Degrees & Certifications 2026 | UGC Approved Universities | CareerWithMohit',
  description:
    'Compare 34+ UGC-DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling. Starting at ₹62,200.',
  keywords: [
    'online MBA 2026',
    'online PGDM 2026',
    'Jaipuria Institute of Management online PGDM',
    'UGC approved online universities India',
    'online degree India 2026',
    'online BBA admission 2026',
    'distance education India UGC',
    'online MCA colleges India',
    'UGC DEB approved universities',
    'best online university India',
    'online MBA fees India',
    'NAAC A+ online university',
    'NAAC A++ online degree',
    'online BCA admission',
    'cheapest online MBA India',
    'online degree working professionals',
    'Amity University online MBA',
    'Chandigarh University online',
    'LPU online degree',
    'Jain University online MBA',
    'NMIMS online MBA',
    'SRM online degree',
    'online degree vs regular degree India',
    'UGC recognized online degree',
    'WES approved online degree India',
    'online MBA placement India',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Top Online Degrees & Certifications 2026 | UGC Approved | CareerWithMohit',
    description:
      'Compare 34+ UGC-DEB approved online universities. Fees from ₹62,200. MBA, MCA, BBA, BCA programs. Free expert counselling by Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-online-degree.png`,
        width: 1200,
        height: 630,
        alt: 'Top Online Degrees & Certifications 2026 India – UGC Approved Universities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Online Degrees & Certifications 2026 | UGC Approved',
    description:
      'Compare 34+ UGC-DEB approved online universities in India. Fees starting ₹62,200. Free counselling by Mohit Jain.',
    images: [`${BASE_URL}/og-online-degree.png`],
    creator: '@careerwithmohit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

// ── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Top Online Degrees & Certifications 2026 | UGC Approved Universities | CareerWithMohit',
      description:
        'Compare 34+ UGC-DEB approved online universities in India. Find fees, NAAC grades, programs and get FREE expert counselling.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Online Degrees & Certifications', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Top UGC Approved Online Universities India 2026',
      description: 'List of top UGC-DEB approved online universities offering MBA, MCA, BBA, BCA programs in India.',
      url: PAGE_URL,
      numberOfItems: COLLEGES.length,
      itemListElement: COLLEGES.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: c.name,
        url: c.slug ? `${BASE_URL}/blog/${c.slug}` : PAGE_URL,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is an online degree from Indian universities valid?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Online degrees from UGC-DEB approved universities are fully valid and equivalent to regular degrees as per UGC regulations 2020. They are recognized by employers, government bodies, and for higher education.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the fee for an online MBA in India in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Online MBA fees in India range from ₹62,200 (Andhra University) to ₹2,20,000 (SASTRA University) in 2026. The average fee for a reputed UGC-approved online MBA is around ₹1,00,000–₹1,80,000 for 2 years.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which is the best online university in India for MBA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best online universities for MBA in India in 2026 include Amity University Online (WES approved), LPU Online (NAAC A++), Chandigarh University Online (QS Ranked), Jain University Online (NAAC A++), and NMIMS Online (Top-5 B-school brand).',
          },
        },
        {
          '@type': 'Question',
          name: 'Are UGC-DEB approved online degrees accepted for government jobs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, UGC-DEB approved online degrees are accepted for most government jobs and PSU recruitment. As per the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations 2020, these degrees hold equivalent status.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I do an online MBA while working?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Online MBA programs are specifically designed for working professionals. Most universities offer flexible weekend batches, recorded lectures, and self-paced modules so you can complete your degree without leaving your job.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between online degree and distance education?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Online degrees (UGC-DEB mode) involve live/recorded digital classes with an LMS platform, while distance education (ODL mode) traditionally uses printed study material and in-person contact sessions. Both are UGC-recognized, but online degrees offer more interactive learning.',
          },
        },
      ],
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'Is an online degree from Indian universities valid?',
    a: 'Yes. Online degrees from UGC-DEB approved universities are fully valid and equivalent to regular degrees as per UGC regulations 2020. They are recognized by employers, government bodies, and for higher education and PSU jobs.',
  },
  {
    q: 'What is the fee for an online MBA in India in 2026?',
    a: 'Online MBA fees in India range from ₹62,200 (Andhra University) to ₹2,20,000 (SASTRA University) in 2026. The average fee for a reputed UGC-approved online MBA is around ₹1–1.8 Lakhs for 2 years.',
  },
  {
    q: 'Which is the best online university in India for MBA?',
    a: 'Top picks include Amity University Online (WES approved), LPU Online (NAAC A++), Chandigarh University (QS Ranked), Jain Univ Online (NAAC A++), and NMIMS Online (Top-5 B-school brand). Best choice depends on your budget and career goals.',
  },
  {
    q: 'Are UGC-DEB approved degrees accepted for government jobs?',
    a: 'Yes. As per UGC (ODL & Online Programmes) Regulations 2020, UGC-DEB approved online degrees hold equivalent status and are accepted for most government jobs, PSU recruitment, and higher education admissions.',
  },
  {
    q: 'Can I pursue an online MBA while working a full-time job?',
    a: 'Absolutely. Online MBA programs are built for working professionals — most universities offer weekend batches, recorded lectures, and self-paced modules so you can complete your degree without quitting your job.',
  },
  {
    q: 'What is the difference between online and distance education?',
    a: 'Online degrees (UGC-DEB mode) use live/recorded digital classes on an LMS platform. Distance education (ODL mode) traditionally uses printed study material with physical contact sessions. Both are UGC-recognized; online is more interactive.',
  },
];

export default function OnlineDegreePage() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        .hero-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);
        }
        .hero-grid {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          position: absolute;
          inset: 0;
        }
        .stat-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }
        .cta-strip {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
      `}</style>

      <div className="page-font">

        {/* ── HERO ── */}
        <section className="hero-bg py-24 md:py-36 relative">
          <div className="hero-grid" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <BadgeCheck size={14} className="text-indigo-400" />
              UGC-DEB Approved Universities · 2026 Edition
            </span>
            <h1 className="display-font text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Online Degrees
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                &amp; Certifications
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Compare India&apos;s top online universities on fees, accreditation, and programs.
              Search, filter, and make the smartest choice for your career in 2026.
            </p>

            {/* Quick Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto relative z-20">
              {[
                { name: 'Online MBA', slug: 'online-mba' },
                { name: 'Online BBA', slug: 'online-bba' },
                { name: 'Online MCA', slug: 'online-mca' },
                { name: 'Online BCA', slug: 'online-bca' },
                { name: 'Online B.Com', slug: 'online-bcom' },
                { name: 'Online M.Com', slug: 'online-mcom' }
              ].map((link) => (
                <Link
                  key={link.slug}
                  href={`/online-degree-certification/${link.slug}`}
                  className="bg-white/10 hover:bg-indigo-600 hover:border-indigo-500 text-white border border-white/20 rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { num: `${COLLEGES.length}+`, label: 'Universities' },
                { num: '₹62K', label: 'Starting Fee' },
                { num: '100%', label: 'UGC Approved' },
              ].map((s) => (
                <div key={s.label} className="stat-card px-4 py-5">
                  <p className="display-font text-2xl font-black text-white">{s.num}</p>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <div className="cta-strip py-4 text-center text-white">
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-2 transition-all"
          >
            <Phone size={15} />
            Talk to a free counsellor · Call +91 95600 20771
          </a>
        </div>

        {/* ── LEAD CAPTURE FORM ── */}
        <section className="px-6 py-8 bg-[#f8f7f4]">
          <OnlineDegreeLeadForm />
        </section>

        {/* ── WHY CHOOSE ONLINE — SEO H2 SECTION ── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-3 text-center">
              Why Choose an Online Degree in 2026?
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Online education has transformed — UGC-DEB approval means these degrees carry the same weight as a regular degree, at a fraction of the cost.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🎓', title: 'UGC-DEB Valid Degree', desc: 'Fully recognized by UGC, government bodies, and employers. Valid for PSU jobs and higher studies.' },
                { icon: '💸', title: 'Fees from ₹62,200', desc: 'Save up to 10x vs regular MBA costs. No relocation, no hostel — study from home.' },
                { icon: '🌐', title: 'WES Approved Options', desc: 'Universities like Amity, Jain, LPU, D.Y.Patil offer WES-recognized degrees for Canada/USA jobs.' },
                { icon: '⏰', title: 'Study While Working', desc: 'Weekend batches, live + recorded lectures. Complete your PG degree without pausing your career.' },
                { icon: '🏆', title: 'NAAC A++ Universities', desc: 'Choose from LPU, Jain, SRM, Parul, Guru Kashi — all NAAC A++ at online-friendly fees.' },
                { icon: '📊', title: 'Placement Support', desc: 'Top universities offer dedicated placement cells, internship portals, and industry mentorships.' },
              ].map((item) => (
                <div key={item.title} className="bg-[#f8f7f4] rounded-2xl p-6 border border-gray-100">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-black text-[#0f172a] mb-2 text-base">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE CLIENT SECTION ── */}
        <OnlineDegreeClient />

        {/* ── STATIC COMPARISON TABLE FOR SEO ── */}
        <section className="bg-white py-16 md:py-20 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-4 text-center">
              Top UGC-Approved Online Universities Comparison (2026)
            </h2>
            <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Below is the comprehensive comparison of top-rated online degrees on fees, duration, NAAC accreditation grades, and UGC-DEB recognition status.
            </p>
            <div className="overflow-x-auto border-[4px] border-[#0f172a] rounded-2xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#0f172a] text-white font-bold text-xs uppercase tracking-widest border-b-[4px] border-[#0f172a]">
                    <th className="px-6 py-4">University Name</th>
                    <th className="px-6 py-4 text-center">NAAC Grade</th>
                    <th className="px-6 py-4">Approx. Fees (2 Years)</th>
                    <th className="px-6 py-4">Top Programs</th>
                    <th className="px-6 py-4 text-center">UGC Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100 font-medium text-gray-700 text-sm">
                  {[
                    { name: 'Amity University Online', grade: 'A+ Rated', fee: '₹1.99 Lakhs', programs: 'MBA, BBA, MCA, BCA, B.Com', status: 'UGC-DEB Approved' },
                    { name: 'Jain University Online', grade: 'A++ Rated', fee: '₹1.96 Lakhs', programs: 'MBA, BBA, MCA, BCA, M.Com', status: 'UGC-DEB Approved' },
                    { name: 'LPU Online', grade: 'A++ Rated', fee: '₹1.61 Lakhs', programs: 'MBA, BBA, MCA, BCA, M.Sc', status: 'UGC-DEB Approved' },
                    { name: 'Chandigarh University Online', grade: 'A+ Rated', fee: '₹1.65 Lakhs', programs: 'MBA, BBA, MCA, BCA, B.Com', status: 'UGC-DEB Approved' },
                    { name: 'Manipal University Jaipur Online', grade: 'A+ Rated', fee: '₹1.75 Lakhs', programs: 'MBA, BBA, MCA, BCA, B.Com', status: 'UGC-DEB Approved' },
                    { name: 'NMIMS Online', grade: 'A+ Rated', fee: '₹2.00 Lakhs', programs: 'MBA, BBA, B.Com, Diploma', status: 'UGC-DEB Approved' },
                    { name: 'Andhra University Online', grade: 'A Rated', fee: '₹62,200', programs: 'MBA, MCA, B.Com, BA', status: 'UGC-DEB Approved' },
                    { name: 'SRM University Online', grade: 'A++ Rated', fee: '₹1.00 Lakhs', programs: 'MBA, MCA, BBA, BCA', status: 'UGC-DEB Approved' },
                    { name: 'D.Y Patil University Online (Pune)', grade: 'A++ Rated', fee: '₹1.89 Lakhs', programs: 'MBA, BBA, MCA, BCA, B.Sc', status: 'UGC-DEB Approved' },
                    { name: 'Galgotias University Online', grade: 'A+ Rated', fee: '₹90,000', programs: 'MBA, MCA, BBA, BCA', status: 'UGC-DEB Approved' }
                  ].map((univ, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#0f172a]">{univ.name}</td>
                      <td className="px-6 py-4 text-center"><span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">{univ.grade}</span></td>
                      <td className="px-6 py-4 font-bold text-green-700">{univ.fee}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500">{univ.programs}</td>
                      <td className="px-6 py-4 text-center"><span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">{univ.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── UGC VALIDITY & REGULATIONS INFO SECTION ── */}
        <section className="bg-[#f8f7f4] py-16 md:py-20 border-t border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-6 text-center">
              Are Online Degrees Valid for Government Jobs &amp; Abroad?
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 font-medium text-sm md:text-base space-y-6">
              <p>
                A common question students ask is: <strong>&quot;Is an online degree recognized by employers and government bodies in India?&quot;</strong> The short answer is <strong>Yes</strong>, provided it is from a university approved by the UGC-DEB.
              </p>
              <div className="bg-white border-l-[8px] border-indigo-500 p-6 rounded-r-2xl shadow-sm">
                <h3 className="font-black text-[#0f172a] text-lg mb-2">UGC Notification on Equivalence</h3>
                <p className="text-sm leading-relaxed">
                  As per the <strong>UGC Regulations 2020</strong> published in the Gazette of India, degrees acquired through Open and Distance Learning (ODL) and Online modes are treated as <strong>equivalent to corresponding degrees</strong> offered through conventional physical classrooms.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                  <h4 className="font-black text-[#0f172a] mb-2">Government &amp; PSU Jobs Eligibility</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-500">
                    Students holding UGC-DEB approved online degrees are eligible to sit for UPSC, bank exams (SBI, IBPS), SSC CGL, and other state/central government recruitment examinations. They also hold equivalent eligibility for public sector units (PSUs).
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                  <h4 className="font-black text-[#0f172a] mb-2">Global Validity &amp; WES Approval</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-500">
                    If you are planning to immigrate (e.g. to Canada under Express Entry) or pursue higher education abroad, choosing a WES-approved online university like Amity, Jain, or LPU is critical. The World Education Services (WES) evaluates these credentials as equivalent to a physical Canadian/US degree.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW TO CHOOSE SECTION ── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-3 text-center">
              How to Choose the Right Online University?
            </h2>
            <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
              With {COLLEGES.length}+ options, the right choice depends on your goals, budget, and career field. Here&apos;s a simple guide:
            </p>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Check UGC-DEB Approval First', desc: 'Always verify that the university appears on the UGC-DEB approved list. This is non-negotiable for degree validity.' },
                { step: '02', title: 'Compare NAAC Grade & Accreditation', desc: 'Prefer NAAC A++ or A+ universities. Higher grades indicate better academic quality, infrastructure, and outcomes.' },
                { step: '03', title: 'Match Programs to Your Career Goal', desc: 'MBA for management, MCA for tech careers, BBA/BCA for undergrads. Pick a university strong in your specialization.' },
                { step: '04', title: 'Evaluate Total Fee vs. Brand Value', desc: 'A ₹1L fee from SRM NAAC A++ may beat a ₹2L fee from a lesser brand. Compare ROI, not just sticker price.' },
                { step: '05', title: 'Consider WES Approval for Global Careers', desc: 'If you plan to work or study abroad (Canada, USA, UAE), prioritize WES-approved universities like Amity, LPU, D.Y.Patil, Manipal Jaipur.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 items-start bg-[#f8f7f4] rounded-2xl p-5 border border-gray-100">
                  <span className="display-font text-3xl font-black text-indigo-200 shrink-0 leading-none">{item.step}</span>
                  <div>
                    <h3 className="font-black text-[#0f172a] text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION (targets FAQ rich result) ── */}
        <section className="bg-[#f8f7f4] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-3 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Everything you need to know about online degrees in India.
            </p>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="bg-[#0f172a] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="display-font text-3xl md:text-4xl font-black text-white mb-4">
              Not sure which university to pick?
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              Get a free 1-on-1 call with Mohit Jain and find the right program based on your goals + budget.
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20online%20degrees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-indigo-900/40"
            >
              Get Free Counselling →
            </a>
          </div>
        </section>

      </div>

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
