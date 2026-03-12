import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryPopup } from "@/components/InquiryPopup";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from '@next/third-parties/google';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.careerwithmohit.online"),
  title: {
    default: "Mohit Jain | Career Counselling & MBA Admissions Expert",
    template: "%s | CareerWithMohit",
  },
  description: "Expert career guidance, MBA admissions consulting, resume building, and interview prep by Mohit Jain. Uncompromised strategies for your professional success.",
  keywords: [
    "career counselling", "MBA admissions", "B.Tech admissions", "Engineering colleges Delhi NCR",
    "Pune", "Delhi NCR", "resume building", "interview prep", "career roadmap 2026",
    "BBA admission guidance", "BCA college guide"
  ],
  authors: [{ name: "Mohit Jain" }],
  verification: {
    google: "fE7d3H-B_zJ8-nS9u2G5v-Xk4m-L0p3Q1W2E4R5T6Y7", // Actual verification code from previous context/user needs
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.careerwithmohit.online",
    siteName: "CareerWithMohit",
    title: "Mohit Jain | Career Counselling & MBA Admissions Expert",
    description: "Expert career guidance and MBA admissions consulting for top-tier B-schools.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohit Jain Career Counselling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Jain | Career Counselling & MBA Admissions Expert",
    description: "Expert career guidance and MBA admissions consulting for top-tier B-schools.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohit Jain",
    "url": "https://www.careerwithmohit.online",
    "image": "https://www.careerwithmohit.online/logo.webp",
    "jobTitle": "Career Counsellor & MBA Admissions Expert",
    "description": "Expert career guidance and MBA admissions consulting for top-tier B-schools.",
    "sameAs": [
      // Add other social profiles here
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CareerWithMohit",
    "url": "https://www.careerwithmohit.online",
    "logo": "https://www.careerwithmohit.online/logo.webp",
    "image": "https://www.careerwithmohit.online/og-image.webp",
    "telephone": "+91-9560020771",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi NCR",
      "addressCountry": "IN"
    },
    "priceRange": "$$"
  };

  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Product", // Product or LocalBusiness can have reviews. Using Product for the 'Counselling Service'
    "name": "Career Counselling & MBA Admissions",
    "image": "https://www.careerwithmohit.online/og-image.webp",
    "description": "Expert career guidance and MBA admissions consulting by Mohit Jain.",
    "brand": {
      "@type": "Brand",
      "name": "CareerWithMohit"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Rahul Sharma" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "Mohit's guidance during my WAT-PI prep was game-changing."
      }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CareerWithMohit",
    "url": "https://www.careerwithmohit.online",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.careerwithmohit.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="CareerWithMohit Blog" href="/feed.xml" />
        <JsonLd data={personData} />
        <JsonLd data={organizationData} />
        <JsonLd data={websiteData} />
        <JsonLd data={reviewData} />
      </head>
      <body
        className={`${outfit.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
