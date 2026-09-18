import Link from "next/link";
import { Suspense } from "react";
import { getAllColleges } from "@/lib/colleges";
import { getSortedPostsData } from "@/lib/markdown";
import { CollegesClient } from "@/components/CollegesClient";
import { JsonLd } from "@/components/JsonLd";
import { ChevronDown, Sparkles, MapPin, Building2, Award, IndianRupee, TrendingUp, Compass, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Top MBA, PGDM, B.Tech & UG Colleges in India 2027: Fees, Cutoffs, Placements & Search",
  description: "Search 770+ verified MBA, PGDM, B.Tech & BBA colleges across India. Compare fee structures, 2025-26 placement audits, CAT/JEE/CMAT cutoffs, and NIRF rankings by state (Delhi NCR, Mumbai, Pune, Bangalore, Hyderabad, Chennai, Kolkata). Get direct 1-on-1 guidance with Mohit Jain.",
  keywords: [
    'top MBA colleges India 2027', 'best PGDM colleges India 2027', 'MBA colleges by state India',
    'search colleges in India', 'college search engine India', 'compare MBA colleges fees placement',
    'top engineering colleges India 2027', 'best B.Tech colleges India by state', 'best M.Tech colleges India',
    'IIT colleges India fees placements', 'NIT colleges cutoffs JEE Main', 'IIIT colleges ranking India',
    'B.Tech colleges Maharashtra Mumbai Pune', 'B.Tech colleges Karnataka Bangalore', 'B.Tech colleges Tamil Nadu Chennai',
    'B.Tech colleges Telangana Hyderabad', 'B.Tech colleges Delhi NCR', 'B.Tech colleges Uttar Pradesh Kanpur',
    'MBA colleges Maharashtra', 'MBA colleges Delhi NCR', 'MBA colleges Bangalore Karnataka',
    'MBA fees comparison India', 'B.Tech fees comparison India', 'B-school cutoffs CAT XAT MAT CMAT',
    'JEE Advanced cutoff 2027', 'direct admission engineering MBA 2027', 'Mohit Jain career counseling'
  ],
  alternates: {
    canonical: '/colleges/',
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
    'geo.position': '28.6139;77.2090',
    'ICBM': '28.6139, 77.2090',
  },
  openGraph: {
    title: 'Top Colleges in India 2027: Search MBA, PGDM & B.Tech Fees, Cutoffs & Placements',
    description: 'Explore verified data on 770+ top colleges across all Indian states. Compare fees, placements, rankings & cutoffs for 2027 admissions with AI-powered search.',
    type: 'website',
    url: 'https://careerwithmohit.online/colleges',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: 'https://careerwithmohit.online/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Top Colleges in India 2027 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top MBA, PGDM & B.Tech Colleges in India 2027 | College Search Engine',
    description: 'Explore verified data on 770+ top colleges across India. Compare fees, rankings & placements.',
    images: ['https://careerwithmohit.online/og-image.webp'],
  },
};

export default function CollegesPage() {
  const colleges = getAllColleges();

  // 1. Google Sitelinks SearchAction Schema
  const websiteSearchSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CareerWithMohit College Search Portal",
    "url": "https://careerwithmohit.online/colleges",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://careerwithmohit.online/colleges?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://careerwithmohit.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Colleges Directory",
        "item": "https://careerwithmohit.online/colleges"
      }
    ]
  };

  // 3. CollectionPage & ItemList Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Top MBA, PGDM, B.Tech & UG Colleges in India 2027",
    "description": "Comprehensive pan-India directory of 770+ top colleges and universities covering all Indian states with fees, placement data, entrance cutoffs, and admission details for 2027.",
    "url": "https://careerwithmohit.online/colleges",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": colleges.length,
      "itemListElement": colleges.slice(0, 100).map((college, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": college.name,
        "url": `https://careerwithmohit.online/colleges/${college.slug}`,
      })),
    },
  };

  // 4. Educational Organization Schema
  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "CareerWithMohit College Advisory",
    "url": "https://careerwithmohit.online/colleges",
    "logo": "https://careerwithmohit.online/logo.webp",
    "description": "Pan-India college directory, MBA/PGDM & B.Tech admission counseling, cutoffs analysis, and ROI evaluation by IIM-B certified mentor Mohit Jain.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "founder": {
      "@type": "Person",
      "name": "Mohit Jain",
      "jobTitle": "Lead Admissions Mentor & Career Counselor",
      "alumniOf": "IIM Bangalore"
    }
  };

  // 5. High-Intent FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which are the best MBA and PGDM colleges in India for 2027 admission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top MBA and PGDM colleges in India for 2027 admission include IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi, XLRI Jamshedpur, SPJIMR Mumbai, MDI Gurgaon, SIBM Pune, IIFT Delhi, and JBIMS Mumbai. Among high-ROI autonomous institutes, leading options include GIM Goa, Great Lakes Chennai, TAPMI, FORE School of Management, BIMTECH, NDIM Delhi, and JIMS Rohini."
        }
      },
      {
        "@type": "Question",
        "name": "How does the CareerWithMohit college search engine work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our intelligent college search engine allows students to search across 770+ colleges using college names, acronyms (e.g. NDIM, IIMB, DTU, FMS, COEP, SIBM), state or city names (e.g. MBA in Pune, BTech in Bangalore), entrance exams (CAT, JEE Main, CMAT, XAT, MAT), or fee ranges with instant autocomplete suggestions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get direct MBA admission without CAT or XAT score in 2027?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, several AICTE-approved PGDM institutes and UGC-recognized universities offer direct MBA/PGDM admission based on graduation merit, profile evaluation, personal interviews, or alternative scores like MAT, CMAT, ATMA, and state CETs. Contact counselor Mohit Jain for verified direct admission options."
        }
      },
      {
        "@type": "Question",
        "name": "How to compare B.Tech college fees, JEE cutoffs, and placement packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When comparing B.Tech colleges, evaluate NIRF rankings, median vs highest placement packages, branch-wise CSE/AI cutoff trends, and total 4-year tuition fees. Government colleges (IITs, NITs, IIITs) provide ₹2L-₹10L fees with ₹12-25+ LPA average packages, while premier private institutes (BITS, VIT, RVCE, Thapar) provide specialized industry tracks."
        }
      },
      {
        "@type": "Question",
        "name": "Which MBA colleges offer the highest ROI (Return on Investment)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Colleges with exceptional ROI include FMS Delhi (₹2 Lakhs fee, ₹34 LPA avg CTC), JBIMS Mumbai (₹6 Lakhs fee, ₹28 LPA avg CTC), PUMBA Pune, SIMSREE Mumbai, and select AICTE institutes like NDIM Delhi, BIMTECH, and UBS Chandigarh where fees range between ₹7L-₹13L with average placements between ₹9L-₹16 LPA."
        }
      },
      {
        "@type": "Question",
        "name": "What are the accepted entrance exams for MBA and PGDM in Delhi NCR, Mumbai, and Bangalore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Colleges in Delhi NCR accept CAT, XAT, CMAT, MAT, GMAT, and CUET-PG. Mumbai & Maharashtra B-Schools accept MAH CET, CAT, XAT, and CMAT. Bangalore & Karnataka colleges accept CAT, XAT, MAT, CMAT, KMAT, and PGCET."
        }
      },
      {
        "@type": "Question",
        "name": "What are the top BBA and BCA colleges in India for 2027?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading BBA and BCA colleges include Christ University Bangalore, NMIMS ASMSOC Mumbai, Symbiosis Pune, Shaheed Sukhdev College (SSCBS Delhi University), Amity University Noida, and JIMS Rohini."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book free 1-on-1 college admission guidance with Mohit Jain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Students can book free 1-on-1 counseling by visiting our inquiry page (https://careerwithmohit.online/inquiry) or directly messaging on WhatsApp (+91 95600 20771) for personalized college shortlisting based on budget, percentile, and career goals."
        }
      }
    ]
  };

  const trendingBlogs = getSortedPostsData().slice(0, 4);

  return (
    <>
      <JsonLd data={websiteSearchSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={educationalOrgSchema} />
      <JsonLd data={faqSchema} />

      <Suspense fallback={<div className="text-center py-16 font-bold text-slate-600">Loading pan-India college directory…</div>}>
        <CollegesClient colleges={colleges} trendingBlogs={trendingBlogs} />
      </Suspense>

      {/* SEO & GEO (Generative Engine Optimization) Pan-India Knowledge Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/80 overflow-hidden relative">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-4 border border-blue-200/60">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>Pan-India Admission & Cutoffs Matrix 2027</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  India&apos;s Pan-India MBA & Engineering Directory{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    By State, City & Cutoff (Shiksha Format)
                  </span>
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6" />
                
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    Navigating the 2027 admissions landscape requires more than raw rankings. It demands <strong>Audited, Transparent, and Verified Data</strong>. At CareerWithMohit, our directory indexes <strong>770+ top colleges in India</strong> spanning MBA, PGDM, B.Tech, M.Tech, BBA, and BCA disciplines across all 28 states and Union Territories.
                  </p>
                  <p>
                    Whether you are targeting premier campuses like <strong>IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi</strong>, or seeking verified high-ROI private business schools like <strong>GIM Goa, Great Lakes Chennai, XLRI, SPJIMR, SIBM Pune, TAPMI, BIMTECH, NDIM, and JIMS</strong>, our platform delivers audited insights on tuition fee structures, 2025–2026 placement packages, cutoffs, and state NIRF rankings.
                  </p>
                </div>
              </div>

              {/* GEO Knowledge Matrix Table (AI & LLM Search Extractable) */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>2027 Key Regional Education Hubs Comparison Matrix</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Factual metrics on average fees, placements, and top accepted entrance exams across primary zones.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-200/80 text-slate-800 font-extrabold uppercase tracking-wider text-[11px]">
                        <th className="p-3 rounded-l-xl">Hub / Region</th>
                        <th className="p-3">Premier Campuses</th>
                        <th className="p-3">Fee Range</th>
                        <th className="p-3">Avg Placement</th>
                        <th className="p-3">Primary Exams</th>
                        <th className="p-3 rounded-r-xl">Direct Admission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Delhi NCR
                        </td>
                        <td className="p-3 text-slate-800">FMS, IIT-D, MDI, IIFT, FORE, BIMTECH, NDIM, JIMS</td>
                        <td className="p-3">₹7.5L - ₹24L</td>
                        <td className="p-3 font-bold text-emerald-700">₹9.5L - ₹26.7 LPA</td>
                        <td className="p-3">CAT, XAT, CMAT, MAT</td>
                        <td className="p-3 text-blue-600 font-bold">Available in Top PGDM</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Mumbai & Pune
                        </td>
                        <td className="p-3 text-slate-800">JBIMS, SPJIMR, SIBM Pune, SCMHRD, WeSchool, Somaiya</td>
                        <td className="p-3">₹6.5L - ₹22L</td>
                        <td className="p-3 font-bold text-emerald-700">₹10.5L - ₹32.0 LPA</td>
                        <td className="p-3">MAH CET, CAT, SNAP, XAT</td>
                        <td className="p-3 text-blue-600 font-bold">Institutional Seats</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Bangalore (Karnataka)
                        </td>
                        <td className="p-3 text-slate-800">IIM-B, TAPMI, JAGSoM, Christ, XIME, Alliance, RVCE</td>
                        <td className="p-3">₹8.0L - ₹21L</td>
                        <td className="p-3 font-bold text-emerald-700">₹9.0L - ₹35.0 LPA</td>
                        <td className="p-3">CAT, XAT, MAT, KCET</td>
                        <td className="p-3 text-blue-600 font-bold">Merit / Management Quota</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Hyderabad (Telangana)
                        </td>
                        <td className="p-3 text-slate-800">ISB, IBS Hyderabad, IPE, Woxsen, VJIM, IIIT-H</td>
                        <td className="p-3">₹7.0L - ₹18L</td>
                        <td className="p-3 font-bold text-emerald-700">₹8.5L - ₹28.0 LPA</td>
                        <td className="p-3">CAT, XAT, TS ICET, IBSAT</td>
                        <td className="p-3 text-blue-600 font-bold">Direct PGDM Interview</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Chennai & Tamil Nadu
                        </td>
                        <td className="p-3 text-slate-800">DoMS IIT-M, Great Lakes, LIBA, PSGIM, VIT Vellore</td>
                        <td className="p-3">₹6.0L - ₹20L</td>
                        <td className="p-3 font-bold text-emerald-700">₹8.0L - ₹21.0 LPA</td>
                        <td className="p-3">CAT, XAT, TANCET, MAT</td>
                        <td className="p-3 text-blue-600 font-bold">Profile-Based Admission</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Ahmedabad & Gujarat
                        </td>
                        <td className="p-3 text-slate-800">IIM-A, MICA, IRMA Anand, Nirma University, PDEU</td>
                        <td className="p-3">₹7.5L - ₹23L</td>
                        <td className="p-3 font-bold text-emerald-700">₹9.0L - ₹34.0 LPA</td>
                        <td className="p-3">CAT, XAT, MICAT, CMAT</td>
                        <td className="p-3 text-blue-600 font-bold">Corporate Sponsored Seats</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Kolkata & East India
                        </td>
                        <td className="p-3 text-slate-800">IIM-C, XLRI Jamshedpur, IMI Kolkata, Praxis, Globsyn</td>
                        <td className="p-3">₹6.5L - ₹25L</td>
                        <td className="p-3 font-bold text-emerald-700">₹8.5L - ₹32.0 LPA</td>
                        <td className="p-3">XAT, CAT, MAT, CMAT</td>
                        <td className="p-3 text-blue-600 font-bold">AICTE Verified Direct</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* State & City Selection Guide */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    State & Regional City MBA Hubs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Explore dedicated landing portals tailored by India&apos;s primary regional education centers
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { city: "Maharashtra (Mumbai & Pune)", link: "/colleges/mba-colleges-mumbai", sub: "IIM Mumbai, JBIMS, SPJIMR, SIBM, WeSchool, Somaiya" },
                    { city: "Delhi NCR (Delhi & Noida)", link: "/colleges/mba-colleges-delhi-ncr", sub: "FMS, DMS IIT-D, MDI, IIFT, FORE, BIMTECH, NDIM" },
                    { city: "Karnataka (Bangalore)", link: "/colleges/mba-colleges-bangalore", sub: "IIM-B, TAPMI, JAGSoM, Christ, XIME, Alliance, ISBR" },
                    { city: "Tamil Nadu (Chennai & Trichy)", link: "/colleges", sub: "DoMS IIT Madras, IIM Trichy, Great Lakes, LIBA, PSGIM" },
                    { city: "Telangana (Hyderabad)", link: "/colleges/mba-colleges-hyderabad", sub: "ISB, IBS Hyderabad, IPE, Woxsen, VJIM, SIBM-H" },
                    { city: "Gujarat (Ahmedabad & Anand)", link: "/colleges/mba-colleges-ahmedabad", sub: "IIM-A, MICA, IRMA Anand, Nirma, PDEU, EDII" },
                    { city: "West Bengal (Kolkata)", link: "/colleges/mba-colleges-kolkata", sub: "IIM Calcutta, VGSoM IIT Kharagpur, IMI, Praxis, Globsyn" },
                    { city: "Rajasthan (Jaipur & Udaipur)", link: "/colleges/mba-colleges-jaipur", sub: "IIM Udaipur, BITS Pilani, Jaipuria, Taxila, IIHMR" },
                    { city: "Kerala (Kochi & Kozhikode)", link: "/colleges", sub: "IIM Kozhikode, Rajagiri RCBS, SCMS Cochin" },
                    { city: "Madhya Pradesh (Indore)", link: "/colleges", sub: "IIM Indore, PIMR, IMS DAVV, SIBM Indore" },
                    { city: "Odisha (Bhubaneswar)", link: "/colleges", sub: "XIMB, IIM Sambalpur, KSOM KIIT, IMI Bhubaneswar" },
                    { city: "Goa (Sanquelim & Panaji)", link: "/colleges", sub: "Goa Institute of Management (GIM), Goa Business School" },
                    { city: "Punjab & Chandigarh", link: "/colleges", sub: "IIM Amritsar, UBS Panjab Univ, LMTSM Thapar, LPU" },
                    { city: "Jharkhand (Jamshedpur & Ranchi)", link: "/colleges", sub: "XLRI Jamshedpur, IIM Ranchi, XISS Ranchi, BIT Mesra" }
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      prefetch={false}
                      className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 font-extrabold text-blue-600 text-sm flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors block truncate">
                          MBA in {item.city} &rarr;
                        </span>
                        <span className="text-xs text-slate-500 truncate block">{item.sub}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Frequently Asked Questions (2027 Admissions)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Key insights regarding admissions, entrance tests, ROI analysis, and fee structures
                  </p>
                </div>
                {[
                  {
                    q: "Which are the best MBA and PGDM colleges in India for 2027 admission?",
                    a: "The top MBA and PGDM colleges include IIMs (Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode), FMS Delhi, XLRI Jamshedpur, SPJIMR Mumbai, and MDI Gurgaon with average packages ranging from ₹18 LPA to ₹35+ LPA. For verified high-ROI autonomous institutes, explore BIMTECH, FORE, TAPMI, GIM Goa, NDIM Delhi, and Great Lakes."
                  },
                  {
                    q: "How does the CareerWithMohit college search engine work?",
                    a: "Our search engine uses an intelligent multi-token and alias matching system. You can search by college abbreviations (like NDIM, IIMB, DTU, FMS, COEP), cities (MBA in Pune, BTech Bangalore), courses, or accepted entrance exams (CAT, JEE Main, CMAT, MAT) with instant live suggestions."
                  },
                  {
                    q: "How can I compare B.Tech college fees and placement packages?",
                    a: "Focus on NIRF Engineering rankings and verified placement reports. Government colleges (IITs/NITs) offer superior ROI with fees around ₹2-8 Lakhs, while top private institutes (VIT, SRM, RVCE, BML Munjal) range from ₹10-20 Lakhs with specialized industry tracks."
                  },
                  {
                    q: "Can I get direct MBA admission without CAT/XAT score in 2027?",
                    a: "Yes, many AICTE-approved PGDM institutes and private universities offer direct MBA admission based on graduation marks, profile assessment, or scores from MAT, CMAT, and ATMA. This is ideal for applicants seeking strong ROI without competitive national cutoffs."
                  },
                  {
                    q: "Which MBA colleges offer the highest Return on Investment (ROI)?",
                    a: "Colleges like FMS Delhi (₹2L fees, ₹34 LPA avg package) and JBIMS Mumbai (₹6L fees, ₹28 LPA avg package) offer extreme ROI. In the private domain, institutes like NDIM, BIMTECH, UBS Chandigarh, and JIMS provide excellent 1.2x to 1.5x ROI ratios."
                  },
                  {
                    q: "How can I book free 1-on-1 college counseling with Mohit Jain?",
                    a: "You can book a free 1-on-1 counseling session via our website's inquiry portal or by messaging Mohit Jain directly on WhatsApp (+91 95600 20771). You'll receive a tailored college shortlist based on your score, budget, and location preferences."
                  }
                ].map((item, index) => (
                  <details
                    key={index}
                    className="group border border-slate-200/90 rounded-2xl bg-white overflow-hidden hover:border-blue-300 transition-colors"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{item.q}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Sticky Counselor Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#123058] text-white p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  Direct Guidance
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Personalized College Admission Roadmap
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Don&apos;t settle for a mediocre campus. Get a personalized evaluation tailored to your budget, academic scores, and career ambitions.
                </p>
                
                <div className="space-y-3 pt-2">
                  <Link
                    href="/inquiry"
                    className="block w-full text-center py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Get Free Shortlist &rarr;
                  </Link>
                  <a
                    href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20need%20guidance%20for%20college%20shortlisting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    WhatsApp Mohit Jain
                  </a>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Certified Mentor (IIM-B)</span>
                  <span className="font-bold text-slate-200">5,000+ Guided</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
