import type { Metadata } from "next";
import { TopTierMbaClient } from "@/components/TopTierMbaClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TOP_TIER_MBA_COLLEGES } from "@/data/topTierMbaColleges";

export const metadata: Metadata = {
  title: "Top Tier MBA Colleges in India 2026: IIMs, NMAT, SNAP & XAT accepting colleges",
  description: "Compare India's top tier MBA colleges for 2026. Explore complete cutoffs, fee structures, and latest placement reports for all IIMs, SNAP (SIBM), NMAT (NMIMS), and XAT (XLRI) accepting colleges. Get profile strategy from Mohit Jain.",
  keywords: [
    "top tier mba colleges in india 2026",
    "all iim fees cut off placement",
    "nmat colleges fees and cutoff",
    "snap colleges list and placements",
    "xat accepting colleges list",
    "best business schools india",
    "mba career counselling 2026"
  ],
  alternates: {
    canonical: "/top-tier-mba-colleges"
  },
  openGraph: {
    title: "Top Tier MBA Colleges in India 2026: IIMs, NMAT, SNAP & XAT",
    description: "Compare verified fees, cutoffs, and placements for all IIMs and elite SNAP, NMAT, and XAT accepting business schools in India.",
    type: "website",
    url: "https://www.careerwithmohit.online/top-tier-mba-colleges"
  }
};

export default function TopTierMbaPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Tier MBA Colleges in India 2026",
    "description": "Comprehensive list of all 20 IIMs and premier business schools accepting NMAT, SNAP, and XAT with validated fees and placements.",
    "itemListElement": TOP_TIER_MBA_COLLEGES.map((college, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": college.name,
      "url": college.slug ? `https://www.careerwithmohit.online/${college.slug}` : college.website
    }))
  };

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
        "name": "Top Tier MBA Colleges",
        "item": "https://www.careerwithmohit.online/top-tier-mba-colleges"
      }
    ]
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
          "text": "The top tier includes IIM Ahmedabad, Bangalore, and Calcutta, along with elite private colleges like XLRI Jamshedpur, SPJIMR Mumbai, FMS Delhi, and MDI Gurgaon. Admission cutoffs range from 95 to 99.5+ CAT/XAT percentile."
        }
      },
      {
        "@type": "Question",
        "name": "What is the expected NMAT score for NMIMS Mumbai in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The expected cutoff for the flagship MBA program at NMIMS School of Business Management, Mumbai is a scaled score of 232+ in NMAT by GMAC, along with sectional cutoffs."
        }
      },
      {
        "@type": "Question",
        "name": "Which top MBA colleges accept the SNAP score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Symbiosis Institute of Business Management (SIBM) Pune and SCMHRD Pune are the premier institutes accepting SNAP, with expected cutoffs of 98.5+ percentile and 96+ percentile respectively."
        }
      },
      {
        "@type": "Question",
        "name": "What are the fees and average placement package for IIM Ahmedabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The total program fee for the PGP (MBA) at IIM Ahmedabad is approximately ₹26.5 Lakhs. The average placement package stands at ₹35.22 LPA, with the highest domestic package reaching ₹1.15 Crore."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <div className="bg-slate-50 border-b-8 border-foreground py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <div className="mt-12 max-w-4xl">
            <span className="bg-primary text-white border-4 border-foreground px-5 py-2 text-sm font-black uppercase tracking-widest inline-block -rotate-1 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              ELITE DIRECTORY 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Top Tier <br />
              <span className="text-primary italic underline decoration-[12px] underline-offset-4">MBA Colleges</span> <br />
              In India.
            </h1>
            <p className="text-xl font-bold text-slate-600 border-l-8 border-primary pl-6 mb-10 leading-relaxed">
              Explore the definitive list of all 20 IIMs, SNAP colleges, NMAT colleges, and XAT accepting business schools. Verify fee structures, exam cutoffs, and audited placement stats.
            </p>
          </div>
        </div>
      </div>

      <TopTierMbaClient />
    </div>
  );
}
