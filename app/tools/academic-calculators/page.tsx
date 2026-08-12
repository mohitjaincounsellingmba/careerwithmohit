import { Metadata } from "next";
import { AcademicCalculatorsClient } from "@/components/AcademicCalculatorsClient";

export const metadata: Metadata = {
  title: "Academic Calculators | Free CGPA to Percentage, SGPA to CGPA & Grade Converter | CareerWithMohit",
  description: "Free online academic calculators for CBSE & college students: Convert CGPA to percentage (9.5x / 10x), compute semester SGPA to CGPA with credits, and convert UGC letter grades to percentages accurately.",
  keywords: [
    "academic calculator", "cgpa to percentage calculator", "sgpa to cgpa calculator",
    "grade to percentage converter", "cbse cgpa converter", "college cgpa calculation",
    "semester credit calculator", "free student calculators 2027"
  ],
  alternates: {
    canonical: "https://www.careerwithmohit.online/tools/academic-calculators",
  },
  openGraph: {
    title: "Academic Calculators | CGPA to Percentage & SGPA Calculator | CareerWithMohit",
    description: "Free student calculators: Convert CGPA to percentage, compute SGPA to CGPA, and map university letter grades to percentages.",
    url: "https://www.careerwithmohit.online/tools/academic-calculators",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Academic Calculators Tool - CareerWithMohit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Calculators | CGPA to Percentage & SGPA Calculator",
    description: "Free student calculators: Convert CGPA to percentage, compute SGPA to CGPA, and map university letter grades to percentages.",
    images: ["/og-image.webp"],
  },
};

export default function AcademicCalculatorsPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Academic Calculators (CGPA, SGPA & Grade Converter)",
    "url": "https://www.careerwithmohit.online/tools/academic-calculators",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Free academic calculation suite for converting CGPA to percentage, SGPA to cumulative GPA, and mapping UGC letter grades."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is CGPA converted to percentage in CBSE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For CBSE and most Indian universities, multiply your CGPA by 9.5 to get the equivalent percentage (e.g., 8.0 CGPA × 9.5 = 76%)."
        }
      },
      {
        "@type": "Question",
        "name": "How to calculate CGPA from semester SGPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply each semester's SGPA by its total credit points, sum them across all semesters, and divide by the total cumulative credits."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://www.careerwithmohit.online/tools",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Academic Calculators",
        "item": "https://www.careerwithmohit.online/tools/academic-calculators",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AcademicCalculatorsClient />
    </>
  );
}
