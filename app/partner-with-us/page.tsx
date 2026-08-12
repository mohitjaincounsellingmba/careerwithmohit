import { Metadata } from "next";
import { PartnerWithUsClient } from "@/components/PartnerWithUsClient";

export const metadata: Metadata = {
  title: "Partner With Us | College Admissions & Consultant Tie-Ups | CareerWithMohit",
  description: "Partner with CareerWithMohit to access 1L+ monthly student visitors, high-intent admission leads, co-counselling opportunities, and white-label education resources.",
  keywords: [
    "education partnership", "college admission tie up", "student lead generation",
    "mba admission leads", "education consultant partnership", "college marketing partner",
    "b-school promotion india", "student inquiry partner"
  ],
  alternates: {
    canonical: "https://www.careerwithmohit.online/partner-with-us",
  },
  openGraph: {
    title: "Partner With Us | College & Consultant Admissions Network | CareerWithMohit",
    description: "Join 200+ colleges and education consultants partnering with CareerWithMohit to scale quality student enrollments.",
    url: "https://www.careerwithmohit.online/partner-with-us",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "CareerWithMohit Strategic Partnership Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Us | College Admissions & Consultant Tie-Ups",
    description: "Join 200+ colleges and education consultants partnering with CareerWithMohit to scale quality student enrollments.",
    images: ["/og-image.webp"],
  },
};

export default function PartnerWithUsPage() {
  const partnershipSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Partner With Us - CareerWithMohit",
    "description": "Strategic partnership program for educational institutions, MBA colleges, and admission consultants.",
    "url": "https://www.careerwithmohit.online/partner-with-us",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "CareerWithMohit",
      "url": "https://www.careerwithmohit.online",
      "telephone": "+919560020771",
      "email": "info@careerwithmohit.online",
      "offers": {
        "@type": "Offer",
        "name": "Institutional Admission Lead & Promotion Partnership",
        "description": "Verified student inquiry generation and recruitment partnerships for universities and consulting agencies."
      }
    }
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
        "name": "Partner With Us",
        "item": "https://www.careerwithmohit.online/partner-with-us",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnershipSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PartnerWithUsClient />
    </>
  );
}
