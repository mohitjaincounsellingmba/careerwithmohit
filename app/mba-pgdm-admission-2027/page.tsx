import { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Phone, ChevronDown, CheckCircle2 } from 'lucide-react';
import MbaPgdmClient from '@/components/MbaPgdmClient';
import MbaPgdmLeadForm from '@/components/MbaPgdmLeadForm';
import { MBA_PGDM_COLLEGES_2027 } from '@/data/mbaPgdmColleges2027';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/mba-pgdm-admission-2027';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA & PGDM Admission 2027: Top Colleges, Fees & Cutoffs | CareerWithMohit',
  description:
    'Compare top AICTE & AIU approved PGDM and MBA colleges in Delhi NCR, Pune, Mumbai, and Bangalore for 2027 admission. Get fee structures, cutoffs, and free counselling.',
  keywords: [
    'PGDM admission 2027 India',
    'MBA admission 2027 Pan India',
    'top PGDM colleges in India 2027',
    'MBA admission Delhi NCR 2027',
    'MBA admission Pune 2027',
    'MBA admission Bangalore 2027',
    'MBA admission Mumbai 2027',
    'best Pan India PGDM colleges',
    'AICTE approved PGDM MBA colleges India',
    'Pan India business schools ranking',
    'direct admission in MBA colleges India'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA & PGDM Admission 2027: Top Colleges & Fees | CareerWithMohit',
    description:
      'Compare premier PGDM/MBA institutes across Delhi NCR, Pune, Mumbai, and Bangalore. Get fee breakdowns, accreditation details, and 1-on-1 counseling with Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA & PGDM Admission 2027: Top Colleges List',
    description:
      'Compare AICTE & AIU approved PGDM/MBA colleges across major business hubs. Free counselling by Mohit Jain.',
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
      name: 'MBA & PGDM Admission 2027 | Top Colleges, Fees & Cutoffs | CareerWithMohit',
      description:
        'Compare top AICTE & AIU approved PGDM & MBA colleges in Delhi NCR, Pune, Mumbai, and Bangalore. Find fees, accreditations, and get FREE expert counselling.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'MBA / PGDM Admission 2027', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Top PGDM & MBA Colleges 2027',
      description: 'List of top AICTE approved PGDM and MBA institutes across India.',
      url: PAGE_URL,
      numberOfItems: MBA_PGDM_COLLEGES_2027.length,
      itemListElement: MBA_PGDM_COLLEGES_2027.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: c.name,
        url: PAGE_URL,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between MBA and PGDM in Delhi NCR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MBA is a degree course offered by universities (like GGSIPU or DU), while PGDM is a diploma course offered by autonomous AICTE approved institutes. PGDM programs accredited by AIU (Association of Indian Universities) are legally equivalent to MBA degrees and offer more updated, industry-ready curricula.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the top PGDM colleges in Delhi NCR for 2027 admission?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Top AICTE approved PGDM colleges include NDIM Delhi (Tughlakabad), FOSTIIMA Business School (Dwarka), FIIB (Vasant Vihar), IILM (Lodhi Road), JIMS (Kalkaji), MERI (Janakpuri), NDIIT (Kalkaji), Delhi School of Business (Pitampura), EMPI (Chattarpur), IMM (Qutab), Maharaja Agrasen (Rohini), and Apeejay ASM (Dwarka).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the average fee for a PGDM in Delhi NCR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PGDM fee structures in Delhi NCR range from ₹4.5 Lakhs (MAIMS Rohini / MERI Janakpuri) to ₹12.9 Lakhs (IILM Lodhi Road) for the full 2-year program. The average fee for a top NBA-accredited B-School is around ₹8.5 to ₹11 Lakhs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which entrance exams are accepted for PGDM Admission 2027 in Delhi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most PGDM colleges accept CAT, XAT, MAT, CMAT, ATMA, and GMAT scores. Scores are followed by Group Discussion (GD), Personal Interview (PI), and past academic score evaluation.',
          },
        },
      ],
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'What is the difference between MBA and PGDM in Delhi NCR?',
    a: 'MBA is a degree course awarded by universities, whereas PGDM (Post Graduate Diploma in Management) is offered by autonomous institutes approved by AICTE. When a PGDM institute holds AIU (Association of Indian Universities) equivalence, the diploma is legally identical to an MBA degree, with the added benefit of a corporate-oriented, frequently updated syllabus.',
  },
  {
    q: 'Are all these 12 PGDM colleges AICTE approved?',
    a: 'Yes, all 12 institutions listed on this portal (including NDIM, FOSTIIMA, FIIB, IILM, JIMS, MERI, NDIIT, DSB, EMPI, IMM, MAIMS, and ASM Apeejay) are approved by AICTE (All India Council for Technical Education), Government of India.',
  },
  {
    q: 'What is the average PGDM fee structure in Delhi NCR for 2027?',
    a: 'Fees range from ₹4.50 Lakhs (MAIMS Rohini / MERI Janakpuri) up to ₹12.90 Lakhs (IILM Lodhi Road) for the 2-year full-time program. Most institutes offer convenient semester installment plans and educational bank loan support.',
  },
  {
    q: 'Which entrance exams are required for PGDM 2027 admissions?',
    a: 'AICTE-approved B-schools accept CAT, XAT, MAT, CMAT, and ATMA scores. Candidates with valid entrance scores are called for GD-PI (Group Discussion & Personal Interview) rounds.',
  },
  {
    q: 'Can I get direct admission in PGDM colleges in Delhi?',
    a: 'Yes, many institutes reserve seats under Management Quota / Executive Sponsorship categories or consider overall profile (Graduation marks, Work Experience, MAT/CMAT scores) for direct GD-PI shortlisting.',
  },
  {
    q: 'Why choose Delhi NCR for PGDM education?',
    a: 'Delhi NCR is the corporate hub of North India, hosting headquarters of Fortune 500 companies, MNCs, and thriving startups. Studying in Delhi provides unparalleled internship opportunities, corporate guest lectures, and high placement packages.',
  },
];

export default function MbaPgdmAdmission2027Page() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        .hero-bg {
          background: linear-gradient(135deg, #090d16 0%, #111827 50%, #090d16 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle 800px at 50% -200px, rgba(79, 70, 229, 0.25) 0%, transparent 80%);
        }
        .hero-grid {
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          position: absolute;
          inset: 0;
        }
        .glow-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%);
          filter: blur(40px);
          border-radius: 50%;
        }
        .stat-card {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .cta-strip {
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #4f46e5 100%);
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .premium-card {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 24px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .premium-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 40px -10px rgba(15, 23, 42, 0.08);
        }
      `}</style>

      <div className="page-font">
        {/* ── HERO ── */}
        <section className="hero-bg py-24 md:py-36 relative">
          <div className="hero-grid" />
          <div className="glow-orb -top-20 -left-20" />
          <div className="glow-orb top-40 -right-20" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full mb-8 backdrop-blur-md shadow-inner">
              <BadgeCheck size={14} className="text-indigo-400" />
              AICTE Approved B-Schools · Delhi NCR 2027 Directory
            </span>

            <h1 className="display-font text-5xl md:text-8xl font-black text-white leading-none tracking-tight mb-8">
              Compare MBA &amp; PGDM
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Admission 2027
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium mb-12">
              Compare top AICTE-approved PGDM &amp; MBA business schools side-by-side. Inspect detailed 2-year fee structures, campus locations, NBA/AIU accreditations, and get direct expert counselling.
            </p>

            {/* Hero Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { num: `${MBA_PGDM_COLLEGES_2027.length}`, label: 'B-Schools Listed' },
                { num: '₹4.50L', label: 'Starting Total Fee' },
                { num: '100%', label: 'AICTE Approved' },
              ].map((s) => (
                <div key={s.label} className="stat-card px-6 py-6 text-center">
                  <p className="display-font text-2xl md:text-3xl font-black text-white">{s.num}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <div className="cta-strip py-4.5 text-center text-white shadow-lg relative z-25">
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-2.5 font-bold text-sm hover:underline underline-offset-4 tracking-wider uppercase transition-all"
          >
            <Phone size={15} />
            Connect with Mohit Jain directly for PGDM 2027 Counselling · Call +91 95600 20771
          </a>
        </div>

        {/* ── LEAD CAPTURE FORM ── */}
        <section className="px-6 py-10 bg-[#f8f7f4] relative z-10 -mt-6">
          <MbaPgdmLeadForm />
        </section>

        {/* ── WHY PURSUE PGDM IN DELHI NCR ── */}
        <section className="bg-white py-20 md:py-28 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <span className="block text-center text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">
              Capital Advantage
            </span>
            <h2 className="display-font text-4xl md:text-5xl font-black text-[#0f172a] mb-4 text-center">
              Why pursue PGDM in Delhi NCR for 2027?
            </h2>
            <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto font-medium">
              Delhi NCR is India&apos;s premier corporate hub, offering PGDM aspirants unmatched corporate access, industrial mentorship, and high-paying placement drives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '📜', title: 'AIU MBA Equivalence', desc: 'Top PGDM diplomas from NBA-accredited institutes are recognized by AIU as equivalent to an MBA degree, qualifying you for PhDs and PSU recruitment.' },
                { icon: '🏙️', title: 'Delhi Corporate Hub', desc: 'Direct access to Corporate HQ offices in Cyber City Gurgaon, Noida Expressway, and Central Delhi for live projects and winter internships.' },
                { icon: '🚀', title: 'Dual Specialization', desc: 'Combine major/minor streams such as FinTech + Marketing or Business Analytics + HR to double your campus placement prospects.' },
                { icon: '💼', title: 'Top-Tier Recruiters', desc: 'Participate in placement drives visited by Deloitte, KPMG, EY, Amazon, ICICI Bank, Wipro, and Accenture on campus.' },
                { icon: '🏆', title: 'NBA & ACBSP Accreditations', desc: 'Evaluate institutions holding international and national accreditations like NBA, SAQS, and ACBSP (USA) for academic quality.' },
                { icon: '📊', title: 'High ROI & Installments', desc: 'Options starting at ₹4.5 Lakhs total fee with semester installment plans, educational bank loans, and merit scholarships.' },
              ].map((item) => (
                <div key={item.title} className="premium-card p-8 flex flex-col gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="font-black text-[#0f172a] text-lg tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE CLIENT SECTION ── */}
        <div className="border-t border-gray-100">
          <MbaPgdmClient />
        </div>

        {/* ── STATIC COMPARISON TABLE ── */}
        <section className="bg-white py-20 md:py-28 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <span className="block text-center text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">
              Quick Matrix
            </span>
            <h2 className="display-font text-4xl md:text-5xl font-black text-[#0f172a] mb-4 text-center">
              Pan India B-School Comparison Matrix
            </h2>
            <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto font-medium">
              A comprehensive overview of 2-year total fees, campus locations, and government approval badges.
            </p>

            <div className="overflow-x-auto border-[5px] border-[#0f172a] rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] bg-white">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#0f172a] text-white font-bold text-xs uppercase tracking-widest border-b-[4px] border-[#0f172a]">
                    <th className="px-6 py-5">B-School Name</th>
                    <th className="px-6 py-5">Campus Location</th>
                    <th className="px-6 py-5">Total 2-Yr Fee</th>
                    <th className="px-6 py-5 text-center">Accreditation</th>
                    <th className="px-6 py-5 text-center">Highlight Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100 font-medium text-gray-700 text-sm">
                  {MBA_PGDM_COLLEGES_2027.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#0f172a]">{c.name}</td>
                      <td className="px-6 py-5 text-xs text-gray-600">{c.location}</td>
                      <td className="px-6 py-5 font-black text-emerald-700">{c.fee}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                          {c.grade}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-200">
                          {c.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── ADMISSION & ELIGIBILITY GUIDE SECTION ── */}
        <section className="bg-[#f8f7f4] py-20 md:py-28 border-t border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-8 text-center uppercase tracking-tight">
              PGDM Admission Process &amp; Eligibility 2027
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 font-medium text-sm md:text-base space-y-6">
              <p>
                Pursuing a PGDM in Delhi NCR requires passing entrance exams, profile screening, and clearing personal interviews. Below is the step-by-step admission roadmap for the 2027 batch:
              </p>

              <div className="bg-white border-l-[8px] border-indigo-600 p-6 rounded-r-2xl shadow-xs">
                <h3 className="font-black text-[#0f172a] text-lg mb-2">1. Basic Academic Eligibility</h3>
                <p className="text-sm leading-relaxed">
                  Candidates must hold a Bachelor&apos;s Degree in any discipline from a UGC-recognized university with a minimum of <strong>50% aggregate marks</strong> (45% for reserved category students). Final year graduation students are also eligible to apply provisionally.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-xs">
                  <h4 className="font-black text-[#0f172a] text-base mb-2">Accepted Entrance Exams</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-500">
                    PGDM institutes accept scores from CAT, XAT, MAT, CMAT, ATMA, and GMAT exams. Higher percentiles qualify candidates for merit scholarships and fee waivers.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-xs">
                  <h4 className="font-black text-[#0f172a] text-base mb-2">GD-PI Selection Process</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-500">
                    Shortlisted candidates are called for Group Discussion (GD), Extempore / Written Ability Test (WAT), and Personal Interview (PI) rounds conducted on-campus or online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="bg-white py-20 md:py-28 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-3 text-center uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-center mb-16 font-medium">
              Common questions about PGDM &amp; MBA admissions in Delhi NCR for 2027.
            </p>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="group bg-[#f8f7f4] rounded-2xl border border-gray-200 shadow-xs overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="text-indigo-600 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-200/60 pt-4 bg-white">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="bg-[#090d16] py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="display-font text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Need help shortlisting your PGDM B-School?
            </h2>
            <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
              Book a free 1-on-1 career call with Mohit Jain. Get honest fee reviews, GD-PI call estimates, and direct admission guidance.
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20counselling%20for%20MBA%2FPGDM%20Admission%202027%20in%20Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg px-12 py-4.5 rounded-2xl hover:opacity-95 transition-all shadow-xl shadow-indigo-900/40 transform hover:-translate-y-0.5 border border-indigo-400/30"
            >
              Get Free PGDM Counselling Now →
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
