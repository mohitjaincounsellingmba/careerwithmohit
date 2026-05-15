import { Metadata } from 'next';
import { BadgeCheck, Phone, ChevronDown, Globe, Plane, Award, Building2, Star } from 'lucide-react';
import AbroadEducationClient from '@/components/AbroadEducationClient';
import { ABROAD_COLLEGES } from '@/data/abroadColleges';


const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/abroad-education';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Top Global MBA & Study Abroad 2026 | UK, USA, Canada, Australia | CareerWithMohit',
  description:
    'Explore and compare 380+ top global programs and universities abroad (UK, USA, Canada, Australia, New Zealand, Ireland, Germany, Dubai) for 2026. Find fees, accreditations, and get free expert admission assistance.',
  keywords: [
    'study abroad 2026',
    'study abroad consultants',
    'global MBA online 2026',
    'MBA in UK from India',
    'MBA in USA online fees',
    'study in Canada 2026',
    'study in Germany free',
    'study in Ireland 2026',
    'study in New Zealand',
    'WES approved degrees India',
    'AACSB accredited MBA online',
    'study in Australia 2026',
    'study in Dubai 2026',
    'best abroad education consultant',
    'international MBA for Indian students',
    'abroad admission assistance',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Mohit Jain', url: BASE_URL }],
  publisher: 'CareerWithMohit',
  openGraph: {
    title: 'Top Global MBA & Study Abroad 2026 | Study in UK, USA, Canada, Australia',
    description:
      'Compare 380+ top international universities. Fees, accreditations (AACSB, WES), and global programs. Get free counselling by Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-abroad-education.png`,
        width: 1200,
        height: 630,
        alt: 'Top Global MBA & Study Abroad 2026 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Global MBA & Study Abroad 2026',
    description:
      'Compare 380+ global universities in UK, USA, Canada, Australia & more. Fees, WES/AACSB approvals. Free counselling by Mohit Jain.',
    images: [`${BASE_URL}/og-abroad-education.png`],
    creator: '@careerwithmohit',
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
      name: 'Top Global MBA & Study Abroad 2026 | Study in UK, USA, Canada, Australia',
      description:
        'Explore and compare 380+ top global MBA programs and universities abroad for 2026. Find fees, accreditations, and get free expert counselling.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Abroad Education', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Top Global Universities for Indian Students 2026',
      description: 'List of top global universities offering MBA and other programs in UK, USA, Canada, Australia, Ireland, Germany, and New Zealand.',
      url: PAGE_URL,
      numberOfItems: ABROAD_COLLEGES.length,
      itemListElement: ABROAD_COLLEGES.map((college, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: college.name,
        url: PAGE_URL,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are online global MBAs recognized in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Global MBAs from accredited international universities (AACSB, WES, UK Privy Council) are highly valued by global MNCs and recognized for international career mobility. If offered via Indian partners like upGrad/Coursera, they are also recognized by AIU in many cases.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the cost of a global MBA for Indian students?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An online global MBA typically costs between ₹1.8 Lakhs to ₹12 Lakhs, depending on the university and accreditation. This is significantly more affordable than on-campus programs which can cost ₹50 Lakhs+.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is WES approval important for a global degree?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, WES (World Education Services) approval is crucial if you plan to move to Canada or the USA for work or further studies. It ensures your degree is recognized as equivalent to local standards.',
          },
        },
      ],
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'Are online global MBAs recognized by top employers?',
    a: 'Absolutely. Top global recruiters like McKinsey, BCG, Amazon, and Google prioritize candidates from AACSB and triple-crown accredited institutions. An online degree from a reputed global university carries significant weight.',
  },
  {
    q: 'Can I settle abroad after an online global MBA?',
    a: 'While the degree itself doesn\'t grant a visa, having a WES or Privy Council recognized degree significantly boosts your CRS points (for Canada) and eligibility for Skilled Worker Visas (in UK/USA).',
  },
  {
    q: 'Do I need to take IELTS or GMAT for these programs?',
    a: 'Many online global MBA programs have a simplified admission process that may waive IELTS/GMAT based on your professional experience or previous education in English.',
  },
];

export default function AbroadEducationPage() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        .hero-bg {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,211,153,0.15) 0%, transparent 70%);
        }
        .hero-grid {
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          position: absolute;
          inset: 0;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
        }
        .cta-strip {
          background: linear-gradient(90deg, #059669, #10b981);
        }
      `}</style>

      <div className="page-font">

        {/* ── HERO ── */}
        <section className="hero-bg py-24 md:py-36 relative">
          <div className="hero-grid" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-10 backdrop-blur-md">
              <Globe size={14} />
              Global MBA & International Admissions · 2026
            </span>
            <h1 className="display-font text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8">
              Study Abroad
              <br />
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Admissions 2026
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium mb-12">
              Earn a world-class degree from top universities in the UK, USA, Canada, Australia, New Zealand, Ireland, Germany, and Dubai. 
              Globally recognized, WES-approved, and career-transforming.
            </p>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { num: '380+', label: 'Global Univ' },
                { num: '₹1.8L', label: 'Starting Fee' },
                { num: '100%', label: 'WES Approved' },
                { num: 'AACSB', label: 'Accredited' },
              ].map((s) => (
                <div key={s.label} className="stat-card px-6 py-6 group hover:bg-white/10 transition-colors cursor-default">
                  <p className="display-font text-3xl font-black text-white mb-1">{s.num}</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <div className="cta-strip py-5 text-center text-white shadow-lg relative z-20">
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-3 font-bold text-sm md:text-base hover:scale-105 transition-all tracking-wide"
          >
            <Phone size={18} className="animate-pulse" />
            Talk to an International Admission Expert · +91 95600 20771
          </a>
        </div>

        {/* ── WHY STUDY ABROAD ── */}
        <section className="bg-white py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="display-font text-4xl md:text-5xl font-black text-[#0f172a] mb-6">
                Why a Global Degree in 2026?
              </h2>
              <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-8" />
              <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                The future of work is global. A degree from an international university doesn&apos;t just add a name to your resume — it opens doors to worldwide opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { icon: <Globe className="text-emerald-500" />, title: 'WES & Privy Council Recognition', desc: 'Degrees are fully valid for Canadian PR (WES) and UK Skilled Worker Visas. Global recognition guaranteed.' },
                { icon: <Award className="text-blue-500" />, title: 'AACSB Triple Crown Status', desc: 'Study from the top 5% of business schools worldwide. Gold standard in global management education.' },
                { icon: <Plane className="text-teal-500" />, title: 'International Immigration', desc: 'Boost your CRS points and eligibility for settling in UK, USA, Canada, Australia, or Germany with a recognized degree.' },
                { icon: <Building2 className="text-indigo-500" />, title: 'Top Global MNC Network', desc: 'Connect with alumni working at Google, Amazon, McKinsey, and Goldman Sachs across the globe.' },
                { icon: <Star className="text-amber-500" />, title: 'Silicon Valley Curriculum', desc: 'Learn cutting-edge business strategy and AI integration from professors in the heart of global innovation.' },
                { icon: <BadgeCheck className="text-rose-500" />, title: '90% Cost Saving', desc: 'Get the same degree as on-campus students at a fraction of the cost. No relocation or living expenses.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#f8f7f4] rounded-[32px] p-10 border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300">
                  <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-black text-[#0f172a] mb-4 text-xl">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE CLIENT SECTION ── */}
        <AbroadEducationClient />

        {/* ── ADMISSION PROCESS ── */}
        <section className="bg-white py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="display-font text-4xl md:text-5xl font-black text-[#0f172a] mb-6 text-center">
              Your Journey to a Global Degree
            </h2>
            <p className="text-gray-500 text-center mb-16 text-lg">
              Our streamlined process ensures you get from application to enrollment in less than 2 weeks.
            </p>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Free Global Profile Assessment', desc: 'Our experts evaluate your academic background and career goals to suggest the best countries and universities.' },
                { step: '02', title: 'Compare Fees & Accreditations', desc: 'Filter through 380+ options based on your budget and whether you need WES/AACSB recognition.' },
                { step: '03', title: 'Direct Merit-Based Admission', desc: 'Many of our partner universities offer simplified admissions based on your profile, often waiving GMAT/IELTS/GRE.' },
                { step: '04', title: 'Financial Aid & Education Loans', desc: 'We help you secure 0% EMI options and education loans to make your global dream affordable.' },
                { step: '05', title: 'Enrollment & Global Networking', desc: 'Get your student ID, access the global LMS, and start networking with peers from 50+ countries.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-8 items-start bg-[#f8f7f4] rounded-[32px] p-8 border border-gray-100 hover:border-emerald-200 transition-colors">
                  <span className="display-font text-5xl font-black text-emerald-100 shrink-0 leading-none">{item.step}</span>
                  <div>
                    <h3 className="font-black text-[#0f172a] text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="bg-[#f8f7f4] py-20 md:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="display-font text-4xl md:text-5xl font-black text-[#0f172a] mb-6 text-center">
              Global Education FAQs
            </h2>
            <p className="text-gray-500 text-center mb-16 font-medium">
              Everything you need to know about pursuing an international degree from India.
            </p>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer list-none font-black text-[#0f172a] text-base md:text-lg">
                    <span>{item.q}</span>
                    <ChevronDown size={20} className="text-emerald-500 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-8 pb-8 text-gray-500 text-sm md:text-base leading-relaxed border-t border-gray-50 pt-6 font-medium">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="bg-[#064e3b] py-24 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Globe className="w-full h-full text-white" />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="display-font text-4xl md:text-7xl font-black text-white mb-8">
              Start Your Global Story Today
            </h2>
            <p className="text-emerald-100/70 mb-12 text-xl md:text-2xl font-medium">
              Don&apos;t limit your career to one country. Get the global edge with Mohit Jain&apos;s expert admission guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20global%20MBA%20options"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#064e3b] font-black text-lg px-12 py-5 rounded-3xl hover:bg-emerald-50 transition-all shadow-2xl uppercase tracking-widest"
              >
                Get Free Counselling
              </a>
              <a
                href="#explore"
                className="inline-block bg-emerald-500 text-white font-black text-lg px-12 py-5 rounded-3xl hover:bg-emerald-600 transition-all shadow-2xl uppercase tracking-widest"
              >
                Explore Universities
              </a>
            </div>
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
