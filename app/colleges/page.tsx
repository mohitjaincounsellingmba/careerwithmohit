import Link from "next/link";
import { getAllColleges } from "@/lib/colleges";
import { getSortedPostsData } from "@/lib/markdown";
import { CollegesClient } from "@/components/CollegesClient";
import { JsonLd } from "@/components/JsonLd";
import { ChevronDown } from "lucide-react";

export const metadata = {
  title: "Top Colleges in India 2026: Compare Fees, Placements & Admission (MBA, B.Tech, BBA)",
  description: "Compare 200+ top colleges in India for 2026 admission. Verified fee structures, 2025 placement reports, NIRF rankings, and cutoffs for MBA, B.Tech, BBA & BCA. Get direct admission guidance for students in Delhi NCR, Bangalore, Pune, Mumbai & more.",
  keywords: [
    'top MBA colleges India 2026', 'best PGDM colleges India', 'MBA fees comparison',
    'MBA placement reports 2026', 'B-school cutoffs', 'direct MBA admission 2026',
    'top engineering colleges India 2026', 'best B.Tech colleges India',
    'B.Tech admission 2026', 'B.Tech fees structure', 'JEE Main colleges',
    'top BBA colleges India 2026', 'best BBA colleges Delhi NCR',
    'BCA colleges India 2026', 'BCA admission fees placement',
    'NIRF ranking 2026 colleges', 'college fees comparison India',
    'top colleges Delhi NCR', 'best colleges Bangalore 2026',
    'top colleges Pune 2026', 'MBA colleges Mumbai', 'engineering colleges Noida Greater Noida',
    'low fees high placement colleges India', 'CAT CMAT MAT accepting colleges',
    'direct admission MBA B.Tech 2026', 'best ROI MBA colleges India',
  ],
  alternates: {
    canonical: '/colleges',
  },
  openGraph: {
    title: 'Top Colleges in India 2026: Compare Fees, Placements & Admission',
    description: 'Explore verified data on 200+ top colleges for MBA, B.Tech, BBA & BCA. Compare fees, placements, rankings & cutoffs for 2026.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/colleges',
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
    "name": "Top Colleges in India 2026 – MBA, B.Tech, BBA, BCA",
    "description": "Comprehensive directory of 200+ top colleges in India covering MBA, PGDM, B.Tech, BBA, and BCA programs with fees, placement data, and admission details for 2026.",
    "url": "https://www.careerwithmohit.online/colleges",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": colleges.length,
      "itemListElement": colleges.slice(0, 50).map((college, index) => ({
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
        "name": "Which are the best MBA colleges in India for 2026 admission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top MBA colleges in India for 2026 include IIM Ahmedabad, Bangalore, Calcutta, FMS Delhi, XLRI, SPJIMR, and MDI Gurgaon. Based on 2025 placement records, these institutes reported average packages between ₹18 LPA and ₹35+ LPA. For direct admission queries in top private universities, consult our expert desk."
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
        "name": "Can I get direct MBA admission without CAT/XAT score in 2026?",
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
      <CollegesClient colleges={colleges} trendingBlogs={trendingBlogs} />

      {/* SEO Content Section — Ultra Premium & Semantic */}
      <section className="bg-white px-6 py-32 sm:px-12 border-t-8 border-foreground overflow-hidden relative">
        {/* Abstract Deco */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full -mr-32 -mt-32 border-4 border-slate-100" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              <div className="mb-14">
                <span className="bg-primary text-white px-5 py-2 text-sm font-black uppercase tracking-widest -rotate-1 inline-block border-4 border-foreground mb-6">
                  2026 Expert Intel
                </span>
                <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.95] mb-10">
                  India&apos;s Most Reliable <br />
                  <span className="text-primary italic">College Directory 2026</span>
                </h2>
                <div className="w-40 h-4 bg-accent mb-12 -ml-2" />
                
                <div className="space-y-8 text-xl text-slate-700 leading-relaxed font-bold italic">
                  <p>
                    Navigating the 2026 academic landscape requires more than just a list of names. It requires **Uncompromised Data**. At CareerWithMohit, we provide a curated directory of **200+ top colleges in India** spanning across MBA, PGDM, B.Tech, BBA, and BCA disciplines. 
                  </p>
                  <p>
                    Whether you are targeting the core placements of **IIT Delhi and IIM Ahmedabad**, or seeking high-ROI private universities in **Delhi NCR, Bangalore, or Pune**, our platform delivers verified insights on fee structures, 2025 placement audits, and NIRF rankings.
                  </p>
                </div>
              </div>

              {/* City Selection Guide */}
              <div className="bg-slate-50 border-8 border-foreground p-10 sm:p-14 mb-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                <h3 className="text-3xl font-black uppercase mb-10 text-foreground flex items-center gap-4">
                  <span className="block w-4 h-12 bg-primary" />
                  City-Specific Selection Guide
                </h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { city: "Delhi NCR", link: "/blog/best-mba-colleges-in-delhi-2026" },
                    { city: "Bangalore", link: "/blog/best-mba-colleges-in-bangalore-2026" },
                    { city: "Pune", link: "/blog/best-mba-colleges-in-pune-2026" },
                    { city: "Jaipur", link: "/blog/best-mba-colleges-in-jaipur-2026" },
                    { city: "Mumbai", link: "/blog/best-mba-colleges-in-mumbai-2026" },
                    { city: "Noida & GZ", link: "/blog/best-mba-colleges-in-noida-ghaziabad-2026" }
                  ].map((item, i) => (
                    <Link key={i} href={item.link} className="flex items-center group">
                      <div className="w-12 h-12 flex items-center justify-center border-4 border-foreground font-black group-hover:bg-primary group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="ml-4 text-lg font-black uppercase border-b-4 border-transparent group-hover:border-primary transition-all">
                        Best Colleges in {item.city} &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion — Taxila Style */}
              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase mb-10 text-foreground">Admission FAQ Search</h3>
                {[
                  {
                    q: "Which are the best MBA colleges in India for 2026 admission?",
                    a: "The top MBA colleges include IIMs (Ahmedabad, Bangalore, Calcutta), FMS Delhi, XLRI, SPJIMR, and MDI Gurgaon. Based on 2025 audits, these institutes reported average packages ranging from ₹18 LPA to ₹35+ LPA."
                  },
                  {
                    q: "How can I compare B.Tech college fees and placement packages?",
                    a: "Focus on NIRF Engineering rankings and 2025 placement data. Gov colleges (IITs/NITs) offer fees around ₹2-8 Lakhs, while top private institutes (VIT, SRM, BML Munjal) range from ₹10-20 Lakhs with strong industry ties."
                  },
                  {
                    q: "Can I get direct MBA admission without CAT/XAT score?",
                    a: "Yes, many AICTE-approved PGDM institutes and private universities offer direct MBA admission based on graduation marks or scores from MAT, CMAT, and ATMA. This is ideal for those seeking high ROI without competitive scores."
                  }
                ].map((item, index) => (
                  <details key={index} className="group border-4 border-foreground bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                    <summary className="flex items-center justify-between px-8 py-6 cursor-pointer hover:bg-slate-50 transition-colors">
                      <span className="text-lg font-black uppercase italic tracking-tight">{item.q}</span>
                      <ChevronDown className="w-6 h-6 text-foreground group-open:rotate-180 transition-transform duration-300 stroke-[3px]" />
                    </summary>
                    <div className="px-10 py-8 text-lg font-bold text-slate-600 bg-slate-50 border-t-4 border-foreground leading-relaxed italic">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Sticky Counselor Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <div className="border-[8px] border-foreground bg-accent p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="text-3xl font-black uppercase leading-none mb-4 italic">Admission <br />Strategy</h4>
                <div className="h-2 w-20 bg-primary mb-8" />
                <p className="text-lg font-bold text-foreground/80 leading-snug mb-10 italic">
                  Don&apos;t settle for a mediocre college. Get a personalized roadmap to India&apos;s top-tier campuses.
                </p>
                
                <div className="space-y-6">
                  <Link href="/inquiry" className="block w-full text-center py-5 bg-foreground text-white font-black uppercase tracking-widest border-4 border-foreground hover:bg-primary transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                    Get Free Intel &rarr;
                  </Link>
                  <a href="https://wa.me/919560020771" className="block w-full text-center py-5 bg-white text-foreground font-black uppercase tracking-widest border-4 border-foreground hover:bg-slate-50 transition-all">
                    WhatsApp Expert
                  </a>
                </div>
                
                <div className="mt-12 flex items-center justify-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-foreground bg-slate-200" />)}
                  </div>
                  <span className="text-xs font-black uppercase tracking-tighter">15k+ Students Guided</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
