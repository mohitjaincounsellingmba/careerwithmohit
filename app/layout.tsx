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
  metadataBase: new URL("https://careerwithmohit.com"),
  title: {
    default: "Mohit Jain | Career Counselling & MBA Admissions Expert",
    template: "%s | CareerWithMohit",
  },
  description: "Expert career guidance, MBA admissions consulting, resume building, and interview prep by Mohit Jain. Uncompromised strategies for your professional success.",
  keywords: ["career counselling", "MBA admissions", "Pune", "Delhi NCR", "resume building", "interview prep"],
  authors: [{ name: "Mohit Jain" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://careerwithmohit.com",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CareerWithMohit",
    "url": "https://careerwithmohit.com",
    "logo": "https://careerwithmohit.com/logo.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9560020771",
      "contactType": "customer service"
    },
    "sameAs": [
      // Add social links here
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CareerWithMohit",
    "url": "https://careerwithmohit.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://careerwithmohit.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="CareerWithMohit Blog" href="/feed.xml" />
        <JsonLd data={organizationData} />
        <JsonLd data={websiteData} />
      </head>
      <body
        className={`${outfit.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <InquiryPopup />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
