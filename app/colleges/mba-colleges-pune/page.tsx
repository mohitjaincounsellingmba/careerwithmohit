import { Suspense } from "react";
import { getAllColleges } from "@/lib/colleges";
import { getSortedPostsData } from "@/lib/markdown";
import { MbaCollegesPuneClient } from "@/components/MbaCollegesPuneClient";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Top MBA Colleges in Pune 2027: Fees, Placements & Admission | CareerWithMohit",
  description: "Explore top MBA/PGDM colleges in Pune for 2027. Compare fees, 2025 placement statistics (SIBM, PUMBA, DY Patil), rankings, and accepted entrance exams (SNAP, MAH CET, CAT, CMAT). Get direct admission guidance.",
  keywords: [
    "top MBA colleges in pune 2027", "best pgdm colleges pune 2027", "sibm pune placement report",
    "pumba pune mba fees", "low fees high placement mba colleges pune", "direct mba admission in pune 2027",
    "mah cet colleges in pune 2027", "snap accepting colleges pune", "best mba placement colleges pune",
    "mba admission 2027", "pgdm admission 2027", "degree admission 2027"
  ],
  alternates: {
    canonical: "/colleges/mba-colleges-pune",
  },
  openGraph: {
    title: "Top MBA Colleges in Pune 2027: Fees, Placements & Admission",
    description: "Compare fee structures, average placements, rankings, and cutoffs for leading MBA/PGDM colleges in Pune. Get expert guidance for 2027 admission.",
    type: "website",
    url: "https://www.careerwithmohit.online/colleges/mba-colleges-pune",
  },
};

export default function MbaCollegesPunePage() {
  const allColleges = getAllColleges();

  // Filter colleges located in Pune that offer Management (MBA/PGDM)
  const puneMbaColleges = allColleges.filter((college) => {
    const locLower = college.location.toLowerCase();
    const isPune = locLower.includes("pune");
    const isManagement = 
      college.category === "Management" || 
      college.courses.some((course) => ["MBA", "PGDM"].includes(course));
    return isPune && isManagement;
  });

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "MBA Colleges in Pune",
        "item": "https://www.careerwithmohit.online/colleges/mba-colleges-pune"
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Top MBA Colleges in Pune 2027",
    "description": "Comprehensive directory of top MBA and PGDM colleges in Pune with fee structures, placement packages, accepted entrance exams, and rankings.",
    "url": "https://www.careerwithmohit.online/colleges/mba-colleges-pune",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": puneMbaColleges.length,
      "itemListElement": puneMbaColleges.map((college, index) => ({
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
        "name": "Which are the best MBA colleges in Pune with low fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PUMBA (Department of Management Sciences, Savitribai Phule Pune University) is the best high-ROI MBA college in Pune. Its fees are around ₹1.3 Lakhs for the entire course, with average placement packages hovering around ₹8.5 LPA. Other public or state-supported universities also offer low fee structures."
        }
      },
      {
        "@type": "Question",
        "name": "What are the top entrance exams accepted by Pune MBA colleges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The major entrance exams accepted are SNAP (for Symbiosis institutes like SIBM and SIDTM), MAH MBA CET (for Maharashtra state-level seats in PUMBA, COEP, etc.), and national-level tests like CAT, CMAT, MAT, and XAT for private pgdm colleges."
        }
      },
      {
        "@type": "Question",
        "name": "Is direct MBA admission possible in Pune colleges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many AICTE-approved PGDM institutes and private universities in Pune offer direct admission under management quota seats or based on national test scores (MAT, ATMA, CMAT) followed by personal interviews. Eligibility requires a minimum of 50% in graduation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average placement package at SIBM Pune?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SIBM Pune reported an outstanding average placement package of ₹28.1 LPA for its latest batch, with the highest package reaching ₹49+ LPA (and domestic/international peaks of ₹82 LPA), making it one of the premier business schools in India."
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
      <Suspense fallback={<div className="text-center py-20 text-lg font-bold">Loading Pune MBA Directory…</div>}>
        <MbaCollegesPuneClient colleges={puneMbaColleges} trendingBlogs={trendingBlogs} />
      </Suspense>
    </>
  );
}
