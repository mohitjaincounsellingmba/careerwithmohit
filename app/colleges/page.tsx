import { getAllColleges } from "@/lib/colleges";
import { CollegesClient } from "@/components/CollegesClient";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Top Colleges in India 2026 – MBA, B.Tech, BBA, BCA | Fees, Placements, Rankings",
  description: "Compare 200+ top MBA colleges, best engineering colleges, BBA & BCA institutes in India. Check fees structure, placement reports, NIRF ranking, cutoffs, and admission process for 2026. Find colleges in Delhi NCR, Bangalore, Pune, Mumbai, Jaipur & more.",
  keywords: [
    'top MBA colleges India 2026', 'best PGDM colleges India', 'MBA fees comparison',
    'MBA placement reports 2026', 'B-school cutoffs', 'MBA college ranking India',
    'top engineering colleges India 2026', 'best B.Tech colleges India',
    'B.Tech admission 2026', 'B.Tech fees structure', 'JEE Main colleges',
    'top BBA colleges India 2026', 'best BBA colleges Delhi NCR',
    'BCA colleges India 2026', 'BCA admission fees placement',
    'NIRF ranking 2026 colleges', 'college fees comparison India',
    'top colleges Delhi NCR', 'best colleges Bangalore 2026',
    'top colleges Pune 2026', 'MBA colleges Mumbai',
    'engineering colleges Noida Greater Noida', 'private MBA colleges under 10 lakhs',
    'low fees high placement colleges India', 'CAT CMAT MAT accepting colleges',
    'direct admission MBA B.Tech 2026', 'college placement report 2026',
    'best ROI MBA colleges India', 'top PGDM colleges Delhi NCR',
  ],
  alternates: {
    canonical: '/colleges',
  },
  openGraph: {
    title: 'Top Colleges in India 2026 – MBA, B.Tech, BBA, BCA | Fees, Placements, Rankings',
    description: 'Compare 200+ top colleges across MBA, B.Tech, BBA & BCA streams. Check fees, placements, NIRF rankings & cutoffs for 2026 admission.',
    type: 'website',
  },
};

export default function CollegesPage() {
  const colleges = getAllColleges();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Top Colleges in India 2026 – MBA, B.Tech, BBA, BCA",
    "description": "Comprehensive directory of 200+ top colleges in India covering MBA, PGDM, B.Tech, BBA, and BCA programs with fees, placement data, and admission details.",
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
        "name": "Which are the best MBA colleges in India 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best MBA colleges in India for 2026 include IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi, XLRI Jamshedpur, SPJIMR Mumbai, MDI Gurgaon, IIT Delhi, IIFT Delhi, and SIBM Pune. These institutes are ranked based on NIRF rankings, placement records (average packages ranging from ₹18 LPA to ₹35+ LPA), faculty quality, and industry connections."
        }
      },
      {
        "@type": "Question",
        "name": "How to compare B.Tech college fees and placements in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To compare B.Tech colleges, check NIRF Engineering rankings, total fees (ranging from ₹2 Lakhs at government colleges to ₹15+ Lakhs at private institutes), average placement packages, highest packages, top recruiting companies, and accepted entrance exams like JEE Main, JEE Advanced, KCET, and COMEDK. Use our college comparison tool to compare up to 3 colleges side by side."
        }
      },
      {
        "@type": "Question",
        "name": "What entrance exams are accepted for MBA admission 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Major entrance exams for MBA admission 2026 include CAT (for IIMs and top B-schools), XAT (for XLRI and associated colleges), CMAT (for AICTE-approved colleges), MAT (accepted by 600+ colleges), NMAT (for NMIMS), SNAP (for Symbiosis institutes), GMAT (for ISB and international programs), and CUET PG (for central universities). Each exam has different patterns, difficulty levels, and accepting institutes."
        }
      },
      {
        "@type": "Question",
        "name": "Which are the best low-fee MBA colleges with high ROI in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best low-fee MBA colleges with high ROI include FMS Delhi (₹2.32 Lakhs, avg placement ₹34 LPA), JBIMS Mumbai (₹7 Lakhs, avg ₹26 LPA), TISS Mumbai (under ₹2 Lakhs), PUMBA Pune, and various government colleges under IPU Delhi. These institutes offer excellent placement records at a fraction of the cost of private B-schools."
        }
      },
      {
        "@type": "Question",
        "name": "What are the top engineering colleges in Delhi NCR, Bangalore, and Pune?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top engineering colleges by city: Delhi NCR — IIT Delhi, DTU, NSUT, IGDTUW, IIIT Delhi, NIT Delhi, MAIT, BPIT; Bangalore — IISc, RVCE, BMS College of Engineering, PES University, MSRIT, BMSCE, Christ University; Pune — COEP, VIT Pune, PICT, MIT-WPU, Symbiosis Institute of Technology, Cummins College. These are ranked by NIRF, placement records, and industry reputation."
        }
      },
      {
        "@type": "Question",
        "name": "Which are the top BBA and BCA colleges in India for 2026 admissions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top BBA colleges include Christ University Bangalore, NMIMS Mumbai, Symbiosis Pune, Amity University, and various Delhi University colleges. Top BCA colleges include Christ University, Chandigarh University, Amity University, and Jain University. Admission is through entrance exams like CUET, SET, NPAT, and individual university tests. Fees range from ₹1 Lakh to ₹15 Lakhs depending on the institute."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />
      <CollegesClient colleges={colleges} />

      {/* Server-rendered SEO content for crawlers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl border-4 border-foreground p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            Top Colleges in India 2026 — Compare Fees, Placements & Admissions
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Explore our comprehensive directory of <strong>200+ top colleges in India</strong> for 2026 admissions. Whether you&apos;re searching for the <strong>best MBA colleges</strong>, <strong>top engineering colleges for B.Tech</strong>, or <strong>leading BBA and BCA institutes</strong>, we provide verified data on fee structures, placement reports, NIRF rankings, entrance exam cutoffs, and admission processes. Compare colleges across <strong>Delhi NCR, Bangalore, Pune, Mumbai, Kolkata, Jaipur, and Dehradun</strong> to make an informed decision. Our database covers IIMs, IITs, NITs, top private universities, and AICTE-approved PGDM institutes — all with real placement data and expert reviews by Mohit Jain.
          </p>

          <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <details className="group border-4 border-foreground rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 bg-slate-50 font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                <span>Which are the best MBA colleges in India 2026?</span>
                <span className="text-2xl font-black group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 py-4 text-slate-600 leading-relaxed">
                The best MBA colleges in India for 2026 include <strong>IIM Ahmedabad</strong>, <strong>IIM Bangalore</strong>, <strong>IIM Calcutta</strong>, <strong>FMS Delhi</strong>, <strong>XLRI Jamshedpur</strong>, <strong>SPJIMR Mumbai</strong>, <strong>MDI Gurgaon</strong>, <strong>IIT Delhi</strong>, <strong>IIFT Delhi</strong>, and <strong>SIBM Pune</strong>. These institutes are ranked based on NIRF rankings, placement records (average packages ranging from ₹18 LPA to ₹35+ LPA), faculty quality, and industry connections.
              </div>
            </details>

            <details className="group border-4 border-foreground rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 bg-slate-50 font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                <span>How to compare B.Tech college fees and placements?</span>
                <span className="text-2xl font-black group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 py-4 text-slate-600 leading-relaxed">
                To compare B.Tech colleges, check <strong>NIRF Engineering rankings</strong>, total fees (ranging from ₹2 Lakhs at government colleges to ₹15+ Lakhs at private institutes), average placement packages, highest packages, top recruiting companies, and accepted entrance exams like <strong>JEE Main, JEE Advanced, KCET, and COMEDK</strong>. Use our college comparison tool to compare up to 3 colleges side by side.
              </div>
            </details>

            <details className="group border-4 border-foreground rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 bg-slate-50 font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                <span>What entrance exams are accepted for MBA admission 2026?</span>
                <span className="text-2xl font-black group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 py-4 text-slate-600 leading-relaxed">
                Major entrance exams for MBA admission 2026 include <strong>CAT</strong> (for IIMs and top B-schools), <strong>XAT</strong> (for XLRI and associated colleges), <strong>CMAT</strong> (for AICTE-approved colleges), <strong>MAT</strong> (accepted by 600+ colleges), <strong>NMAT</strong> (for NMIMS), <strong>SNAP</strong> (for Symbiosis institutes), <strong>GMAT</strong> (for ISB and international programs), and <strong>CUET PG</strong> (for central universities).
              </div>
            </details>

            <details className="group border-4 border-foreground rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 bg-slate-50 font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                <span>Which are the best low-fee MBA colleges with high ROI in India?</span>
                <span className="text-2xl font-black group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 py-4 text-slate-600 leading-relaxed">
                The best low-fee MBA colleges with high ROI include <strong>FMS Delhi</strong> (₹2.32 Lakhs, avg placement ₹34 LPA), <strong>JBIMS Mumbai</strong> (₹7 Lakhs, avg ₹26 LPA), <strong>TISS Mumbai</strong> (under ₹2 Lakhs), <strong>PUMBA Pune</strong>, and various government colleges under IPU Delhi. These institutes offer excellent placement records at a fraction of the cost of private B-schools.
              </div>
            </details>

            <details className="group border-4 border-foreground rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 bg-slate-50 font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                <span>Top engineering colleges in Delhi NCR, Bangalore, and Pune?</span>
                <span className="text-2xl font-black group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 py-4 text-slate-600 leading-relaxed">
                <strong>Delhi NCR</strong> — IIT Delhi, DTU, NSUT, IGDTUW, IIIT Delhi, NIT Delhi, MAIT, BPIT. <strong>Bangalore</strong> — IISc, RVCE, BMS College of Engineering, PES University, MSRIT, BMSCE, Christ University. <strong>Pune</strong> — COEP, VIT Pune, PICT, MIT-WPU, Symbiosis Institute of Technology, Cummins College. These are ranked by NIRF, placement records, and industry reputation.
              </div>
            </details>

            <details className="group border-4 border-foreground rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 bg-slate-50 font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                <span>Top BBA and BCA colleges in India for 2026 admissions?</span>
                <span className="text-2xl font-black group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 py-4 text-slate-600 leading-relaxed">
                Top BBA colleges include <strong>Christ University Bangalore</strong>, <strong>NMIMS Mumbai</strong>, <strong>Symbiosis Pune</strong>, <strong>Amity University</strong>, and various Delhi University colleges. Top BCA colleges include Christ University, Chandigarh University, Amity University, and Jain University. Admission is through entrance exams like CUET, SET, NPAT, and individual university tests. Fees range from ₹1 Lakh to ₹15 Lakhs.
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
