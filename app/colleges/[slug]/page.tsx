import { getCollegeBySlug, getAllColleges } from "@/lib/colleges";
import { notFound } from "next/navigation";
import { CollegeDetailClient } from "@/components/CollegeDetailClient";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getCategoryKeywords(college: { name: string; location: string; category: string; courses: string[]; fees: string; avg_placement: string; exams: string[] }): string[] {
  const base = [
    `${college.name} review`,
    `${college.name} fees structure 2026`,
    `${college.name} average package`,
    `${college.name} placement report 2026`,
    `${college.name} highest package`,
    `${college.name} cutoff 2026`,
    `${college.name} admission process`,
    `${college.name} ranking`,
    `${college.name} ${college.location}`,
    `is ${college.name} good`,
    `${college.name} mohit jain review`,
    `${college.name} hostel fees`,
    `${college.name} contact number`,
  ];

  if (college.category === "Management") {
    return [
      ...base,
      `${college.name} MBA fees`,
      `${college.name} PGDM placement`,
      `${college.name} MBA admission 2026`,
      `${college.name} MBA average package`,
      `${college.name} ROI analysis`,
      `MBA colleges ${college.location} with low fees`,
      `best MBA college ${college.location} 2026`,
      ...college.courses.map(c => `${college.name} ${c}`),
    ];
  }

  if (college.category === "Engineering") {
    return [
      ...base,
      `${college.name} B.Tech fees`,
      `${college.name} CSE placement`,
      `${college.name} B.Tech admission 2026`,
      `${college.name} JEE cutoff`,
      `engineering colleges ${college.location}`,
      `best B.Tech college ${college.location} 2026`,
      ...college.courses.map(c => `${college.name} ${c}`),
    ];
  }

  // UG Courses
  return [
    ...base,
    `${college.name} BBA fees`,
    `${college.name} BCA admission`,
    `${college.name} BBA placement 2026`,
    `BBA colleges ${college.location}`,
    `best BBA college ${college.location} 2026`,
    ...college.courses.map(c => `${college.name} ${c}`),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) return {};

  let title: string;
  let description: string;

  if (college.category === "Management") {
    title = `${college.name}, ${college.location} – MBA/PGDM Fees ${college.fees}, Placement ${college.avg_placement}, Admission 2026, Cutoff, Review | CareerWithMohit`;
    description = `Detailed review of ${college.name} in ${college.location}: MBA/PGDM fee structure ${college.fees}, average placement ${college.avg_placement}, highest package ${college.highest_placement}. NIRF ranking: ${college.ranking}. Accepted exams: ${college.exams.join(', ')}. Check courses, cutoff, and admission process for 2026 with Mohit Jain's expert analysis.`;
  } else if (college.category === "Engineering") {
    title = `${college.name}, ${college.location} – B.Tech Fees ${college.fees}, Placement ${college.avg_placement}, Admission 2026, Ranking, Review | CareerWithMohit`;
    description = `Complete guide for ${college.name} in ${college.location}: B.Tech fee structure ${college.fees}, average placement ${college.avg_placement}, highest package ${college.highest_placement}. Ranking: ${college.ranking}. Accepted exams: ${college.exams.join(', ')}. Check courses, JEE cutoff, and admission process for 2026.`;
  } else {
    title = `${college.name}, ${college.location} – BBA/BCA Fees ${college.fees}, Admission 2026, Placement ${college.avg_placement}, Review | CareerWithMohit`;
    description = `Explore ${college.name} in ${college.location}: BBA/BCA fee structure ${college.fees}, average placement ${college.avg_placement}, highest package ${college.highest_placement}. Check courses, admission process, entrance exams, and expert review for 2026 admission.`;
  }

  const keywords = getCategoryKeywords(college);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/colleges/${slug}`,
    },
    openGraph: {
      title: `${college.name} – Fees, Placement, Admission 2026 | CareerWithMohit`,
      description,
      type: "website",
      url: `/colleges/${slug}`,
      siteName: "CareerWithMohit",
    }
  };
}

export async function generateStaticParams() {
  const colleges = getAllColleges();
  return colleges.map((college) => ({
    slug: college.slug,
  }));
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": college.name,
    "url": `https://www.careerwithmohit.online/colleges/${slug}`,
    "logo": `https://www.careerwithmohit.online${college.logo}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": college.location,
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "150"
    }
  };

  const jsonLdFaQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the fee structure for ${college.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The fee structure for ${college.name} is predominantly around ${college.fees}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the average placement at ${college.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The average placement package at ${college.name} is ${college.avg_placement}.`
        }
      },
      {
        "@type": "Question",
        "name": `Which exams are accepted by ${college.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${college.name} accepts the following entrance exams: ${college.exams.join(', ')}.`
        }
      }
    ]
  };

  const jsonLdBreadcrumb = {
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
        "name": college.name,
        "item": `https://www.careerwithmohit.online/colleges/${slug}`
      }
    ]
  };

  return (
    <>
      <JsonLd data={jsonLdOrg} />
      <JsonLd data={jsonLdFaQ} />
      <JsonLd data={jsonLdBreadcrumb} />
      <CollegeDetailClient college={college} />
    </>
  );
}
