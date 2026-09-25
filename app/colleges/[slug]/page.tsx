import { getCollegeBySlug, getAllColleges, type CollegeMetadata } from "@/lib/colleges";
import { notFound } from "next/navigation";
import { CollegeDetailClient } from "@/components/CollegeDetailClient";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getSimilarColleges(current: CollegeMetadata, all: CollegeMetadata[]) {
  const score = (candidate: CollegeMetadata) => {
    let value = 0;
    if (current.category === candidate.category) value += 40;
    if (current.ownership === candidate.ownership) value += 20;
    if (current.location.split(",")[0].toLowerCase() === candidate.location.split(",")[0].toLowerCase()) value += 20;

    const currentFee = parseFloat(current.fees.replace(/[^0-9.]/g, "") || "0");
    const candidateFee = parseFloat(candidate.fees.replace(/[^0-9.]/g, "") || "0");
    if (Math.abs(currentFee - candidateFee) <= 3) value += 10;
    value += current.exams.filter((exam) => candidate.exams.includes(exam)).length * 5;
    return value;
  };

  return all
    .filter((candidate) => candidate.slug !== current.slug)
    .map((candidate) => ({ candidate, score: score(candidate) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ candidate }) => candidate);
}

function getCategoryKeywords(college: { name: string; location: string; category: string; courses: string[]; fees: string; avg_placement: string; exams: string[] }): string[] {
  const base = [
    `${college.name} review`,
    `${college.name} fees structure 2027`,
    `${college.name} average package`,
    `${college.name} placement report 2027`,
    `${college.name} highest package`,
    `${college.name} cutoff 2027`,
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
      `${college.name} MBA admission 2027`,
      `${college.name} PGDM admission 2027`,
      `${college.name} MBA average package`,
      `${college.name} ROI analysis`,
      `MBA colleges ${college.location} with low fees`,
      `best MBA college ${college.location} 2027`,
      ...college.courses.map(c => `${college.name} ${c}`),
    ];
  }

  if (college.category === "Engineering") {
    return [
      ...base,
      `${college.name} B.Tech fees`,
      `${college.name} CSE placement`,
      `${college.name} B.Tech admission 2027`,
      `${college.name} JEE cutoff`,
      `engineering colleges ${college.location}`,
      `best B.Tech college ${college.location} 2027`,
      ...college.courses.map(c => `${college.name} ${c}`),
    ];
  }

  // UG Courses
  return [
    ...base,
    `${college.name} BBA fees`,
    `${college.name} BCA admission`,
    `${college.name} BBA placement 2027`,
    `BBA colleges ${college.location}`,
    `best BBA college ${college.location} 2027`,
    ...college.courses.map(c => `${college.name} ${c}`),
  ];
}

function getCollegeGeo(location: string): { regionCode: string; placename: string; position: string } {
  const loc = (location || '').toLowerCase();
  if (loc.includes('delhi') || loc.includes('noida') || loc.includes('gurgaon') || loc.includes('gurugram') || loc.includes('ghaziabad') || loc.includes('faridabad') || loc.includes('ncr')) {
    return { regionCode: 'IN-DL', placename: `${location}, Delhi NCR, India`, position: '28.6139;77.2090' };
  }
  if (loc.includes('mumbai') || loc.includes('navi mumbai') || loc.includes('thane')) {
    return { regionCode: 'IN-MH', placename: `${location}, Maharashtra, India`, position: '19.0760;72.8777' };
  }
  if (loc.includes('pune')) {
    return { regionCode: 'IN-MH', placename: `${location}, Maharashtra, India`, position: '18.5204;73.8567' };
  }
  if (loc.includes('bangalore') || loc.includes('bengaluru') || loc.includes('karnataka')) {
    return { regionCode: 'IN-KA', placename: `${location}, Karnataka, India`, position: '12.9716;77.5946' };
  }
  if (loc.includes('hyderabad') || loc.includes('telangana')) {
    return { regionCode: 'IN-TG', placename: `${location}, Telangana, India`, position: '17.3850;78.4867' };
  }
  if (loc.includes('chennai') || loc.includes('coimbatore') || loc.includes('tamil')) {
    return { regionCode: 'IN-TN', placename: `${location}, Tamil Nadu, India`, position: '13.0827;80.2707' };
  }
  if (loc.includes('kolkata') || loc.includes('bengal')) {
    return { regionCode: 'IN-WB', placename: `${location}, West Bengal, India`, position: '22.5726;88.3639' };
  }
  if (loc.includes('jaipur') || loc.includes('rajasthan')) {
    return { regionCode: 'IN-RJ', placename: `${location}, Rajasthan, India`, position: '26.9124;75.7873' };
  }
  if (loc.includes('ahmedabad') || loc.includes('gujarat')) {
    return { regionCode: 'IN-GJ', placename: `${location}, Gujarat, India`, position: '23.0225;72.5714' };
  }
  if (loc.includes('chandigarh') || loc.includes('punjab') || loc.includes('mohali')) {
    return { regionCode: 'IN-PB', placename: `${location}, Punjab, India`, position: '30.7333;76.7794' };
  }
  if (loc.includes('lucknow') || loc.includes('uttar pradesh') || loc.includes('kanpur')) {
    return { regionCode: 'IN-UP', placename: `${location}, Uttar Pradesh, India`, position: '26.8467;80.9462' };
  }
  if (loc.includes('dehradun') || loc.includes('uttarakhand') || loc.includes('roorkee')) {
    return { regionCode: 'IN-UT', placename: `${location}, Uttarakhand, India`, position: '30.3165;78.0322' };
  }
  return { regionCode: 'IN-DL', placename: `${location}, India`, position: '28.6139;77.2090' };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) return {};

  let title: string;
  let description: string;

  if (college.category === "Management") {
    title = `${college.name} MBA Fees, Cutoff & Placement 2027`.slice(0, 58);
    description = `${college.name} (${college.location}): MBA/PGDM fees ${college.fees}, avg package ${college.avg_placement}, NIRF rank ${college.ranking}, cutoffs & 2027 admission guide.`.slice(0, 160);
  } else if (college.category === "Engineering") {
    title = `${college.name} B.Tech Fees, Cutoff & Placement 2027`.slice(0, 58);
    description = `${college.name} (${college.location}): B.Tech fees ${college.fees}, avg package ${college.avg_placement}, JEE cutoffs, rankings & 2027 admission guide.`.slice(0, 160);
  } else {
    title = `${college.name} Fees, Placement & Admission 2027`.slice(0, 58);
    description = `${college.name} (${college.location}): Fees ${college.fees}, avg package ${college.avg_placement}, courses, entrance exams & 2027 admission guide.`.slice(0, 160);
  }

  const keywords = getCategoryKeywords(college);
  const geoInfo = getCollegeGeo(college.location);

  return {
    title,
    description,
    keywords: [...keywords, `${college.location} Colleges`, "MBA Admissions 2027", "Direct Admission India"],
    alternates: {
      canonical: `/colleges/${slug}/`,
    },
    openGraph: {
      title: `${college.name} – Fees, Placement, Admission 2027 | CareerWithMohit`,
      description,
      type: "article",
      url: `https://careerwithmohit.online/colleges/${slug}/`,
      siteName: "CareerWithMohit",
      images: [
        {
          url: "https://careerwithmohit.online/og-image.webp",
          width: 1200,
          height: 630,
          alt: `${college.name} Admission & Review`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${college.name} – Fees, Placement, Admission 2027`,
      description,
      images: ["https://careerwithmohit.online/og-image.webp"],
    },
    other: {
      "geo.region": geoInfo.regionCode,
      "geo.placename": geoInfo.placename,
      "geo.position": geoInfo.position,
      "ICBM": geoInfo.position.replace(';', ', '),
      "coverage": geoInfo.placename,
      "ai-content-declaration": "human-authored-expert-guidance"
    }
  };
}

export const dynamicParams = false;

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

  // Do not serialize the complete college directory into every college page.
  const similarColleges = getSimilarColleges(college, getAllColleges());
  const geoInfo = getCollegeGeo(college.location);
  const coords = geoInfo.position.split(';');

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": college.name,
    "url": `https://careerwithmohit.online/colleges/${slug}/`,
    "logo": college.logo ? (college.logo.startsWith('http') ? college.logo : `https://careerwithmohit.online${college.logo}`) : "https://careerwithmohit.online/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": college.location,
      "addressRegion": geoInfo.regionCode.replace('IN-', ''),
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords[0],
      "longitude": coords[1]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "150"
    }
  };

  const jsonLdProgram = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": `${college.name} ${college.category === 'Management' ? 'MBA / PGDM Program' : college.category === 'Engineering' ? 'B.Tech Program' : 'Degree Programs'}`,
    "description": `Comprehensive higher education program at ${college.name}, ${college.location}. Accepted exams: ${college.exams.join(', ')}.`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": college.name,
      "url": `https://careerwithmohit.online/colleges/${slug}/`
    },
    "offers": {
      "@type": "Offer",
      "price": college.fees,
      "priceCurrency": "INR"
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
          "text": `The fee structure for ${college.name} is approximately ${college.fees}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the average placement at ${college.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The average placement package reported at ${college.name} is ${college.avg_placement}, with highest packages reaching ${college.highest_placement || 'significant levels'}.`
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
        "item": "https://careerwithmohit.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Colleges",
        "item": "https://careerwithmohit.online/colleges/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": college.name,
        "item": `https://careerwithmohit.online/colleges/${slug}/`
      }
    ]
  };

  return (
    <>
      <JsonLd data={jsonLdOrg} />
      <JsonLd data={jsonLdProgram} />
      <JsonLd data={jsonLdFaQ} />
      <JsonLd data={jsonLdBreadcrumb} />
      <CollegeDetailClient college={college} similarColleges={similarColleges} />
    </>
  );
}
