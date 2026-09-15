import Link from "next/link";
import { Suspense } from "react";
import { getAllColleges } from "@/lib/colleges";
import { getSortedPostsData } from "@/lib/markdown";
import { CollegesClient } from "@/components/CollegesClient";
import { JsonLd } from "@/components/JsonLd";
import { ChevronDown } from "lucide-react";

export const metadata = {
  title: "Top MBA, PGDM, B.Tech & M.Tech Colleges in India by State 2027: Fees, Cutoffs & Placements | Shiksha Format",
  description: "Compare 770+ top MBA, PGDM, B.Tech & M.Tech colleges and universities across all Indian states for 2027 admission. Verified fee structures, placement audits, JEE/CAT cutoffs, and NIRF rankings for Maharashtra, Delhi NCR, Karnataka, Tamil Nadu, Telangana & more.",
  keywords: [
    'top MBA colleges India 2027', 'best PGDM colleges India 2027', 'MBA colleges by state India',
    'top engineering colleges India 2027', 'best B.Tech colleges India by state', 'best M.Tech colleges India',
    'IIT colleges India fees placements', 'NIT colleges cutoffs JEE Main', 'IIIT colleges ranking India',
    'B.Tech colleges Maharashtra Mumbai Pune', 'B.Tech colleges Karnataka Bangalore', 'B.Tech colleges Tamil Nadu Chennai',
    'B.Tech colleges Telangana Hyderabad', 'B.Tech colleges Delhi NCR', 'B.Tech colleges Uttar Pradesh Kanpur',
    'MBA colleges Maharashtra', 'MBA colleges Delhi NCR', 'MBA colleges Bangalore Karnataka',
    'MBA fees comparison India', 'B.Tech fees comparison India', 'B-school cutoffs CAT XAT MAT CMAT',
    'JEE Advanced cutoff 2027', 'direct admission engineering MBA 2027'
  ],
  alternates: {
    canonical: '/colleges',
  },
  openGraph: {
    title: 'Top MBA, PGDM & B.Tech Colleges in India by State 2027: Verified Fees & Placements',
    description: 'Explore verified data on 770+ top colleges across all Indian states for MBA, PGDM, B.Tech & M.Tech. Compare fees, placements, rankings & cutoffs for 2027.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/colleges',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: 'https://www.careerwithmohit.online/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Top Colleges in India by State 2027 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top MBA, PGDM & B.Tech Colleges in India by State 2027',
    description: 'Explore verified data on 770+ top colleges across all Indian states for MBA, PGDM & B.Tech. Compare fees & placements.',
    images: ['https://www.careerwithmohit.online/og-image.webp'],
  },
};

export default function CollegesPage() {
  const colleges = getAllColleges();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Colleges",
        "item": "https://www.careerwithmohit.online/colleges"
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Top MBA & PGDM Colleges in India by State 2027",
    "description": "Comprehensive directory of 700+ top MBA, PGDM, B.Tech, and BBA colleges in India covering all Indian states with fees, placement data, and admission details for 2027.",
    "url": "https://www.careerwithmohit.online/colleges",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": colleges.length,
      "itemListElement": colleges.map((college, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": college.name,
        "url": `https://www.careerwithmohit.online/colleges/${college.slug}`,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which are the best MBA colleges in India for 2027 admission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top MBA colleges in India for 2027 include IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, Indore, FMS Delhi, XLRI, SPJIMR, and MDI Gurgaon. Based on 2025 placement records, these institutes reported average packages between ₹18 LPA and ₹35+ LPA. For direct admission queries in top private universities, consult our expert desk."
        }
      },
      {
        "@type": "Question",
        "name": "How can I compare B.Tech college fees and placement packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To compare B.Tech colleges, focus on NIRF Engineering rankings and 2025 placement audits. Government colleges like IITs/NITs offer high ROI with fees around ₹2-8 Lakhs, while top private institutes like VIT, SRM, and BML Munjal range from ₹10-20 Lakhs with strong industry ties."
        }
      },
      {
        "@type": "Question",
        "name": "What are the top BBA and BCA colleges in Delhi NCR and Bangalore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For BBA and BCA, Christ University (Bangalore), NMIMS (Mumbai), Symbiosis (Pune), and Amity (Noida) are leading choices. These programs focus on corporate readiness with fees ranging from ₹1.5 Lakhs to ₹5 Lakhs per year. Admission typically involves entrance tests like CUET or SET."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get direct MBA admission without CAT/XAT score in 2027?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many AICTE-approved PGDM institutes and private universities offer direct MBA admission based on graduation marks, personal interviews, or other entrance scores like MAT, CMAT, and ATMA. Contact our admission counselors for a list of verified ROI-focused colleges for direct admission."
        }
      }
    ]
  };

  const trendingBlogs = getSortedPostsData().slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />
      <Suspense fallback={<div className="text-center py-8">Loading colleges…</div>}>
        <CollegesClient colleges={colleges} trendingBlogs={trendingBlogs} />
      </Suspense>
      {/* SEO & Regional Selection Guide Section — Modern EdTech Aesthetic */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/80 overflow-hidden relative">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                  2027 Comprehensive Guide
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  India&apos;s Pan-India MBA Directory{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    By State & City (Shiksha Format)
                  </span>
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6" />
                
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    Navigating the 2027 academic admissions landscape requires more than just a list of names. It requires <strong>Uncompromised, Audited Data</strong>. At CareerWithMohit, we provide a curated directory of <strong>700+ top colleges in India</strong> spanning MBA, PGDM, B.Tech, BBA, and BCA disciplines across all 28 states and Union Territories.
                  </p>
                  <p>
                    Whether you are targeting premier campuses like <strong>IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi</strong>, or seeking verified high-ROI private business schools like <strong>GIM Goa, Great Lakes Chennai, XLRI, SPJIMR, SIBM Pune, TAPMI, or BIMTECH</strong>, our platform delivers audited insights on tuition fee structures, 2025–2026 placement packages, cutoffs, and state NIRF rankings.
                  </p>
                </div>
              </div>

              {/* State & City Selection Guide */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    State & City MBA Selection Guide
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Explore top B-schools and universities tailored by India&apos;s primary regional education hubs
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
                      className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-3.5"
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
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Key insights regarding admissions, entrance tests, and fee structures
                  </p>
                </div>
                {[
                  {
                    q: "Which are the best MBA colleges in India for 2027 admission?",
                    a: "The top MBA colleges include IIMs (Ahmedabad, Bangalore, Calcutta), FMS Delhi, XLRI, SPJIMR, and MDI Gurgaon. Based on placement audits, these institutes reported average packages ranging from ₹18 LPA to ₹35+ LPA. For top private options with verified ROI, explore BIMTECH, FORE, and TAPMI."
                  },
                  {
                    q: "How can I compare B.Tech college fees and placement packages?",
                    a: "Focus on NIRF Engineering rankings and verified placement reports. Government colleges (IITs/NITs) offer superior ROI with fees around ₹2-8 Lakhs, while top private institutes (VIT, SRM, BML Munjal) range from ₹10-20 Lakhs with specialized industry tracks."
                  },
                  {
                    q: "Can I get direct MBA admission without CAT/XAT score?",
                    a: "Yes, many AICTE-approved PGDM institutes and private universities offer direct MBA admission based on graduation marks or scores from MAT, CMAT, and ATMA. This is ideal for applicants seeking strong ROI without competitive national cutoffs."
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
