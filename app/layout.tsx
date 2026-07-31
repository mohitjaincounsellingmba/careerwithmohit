import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";
import dynamic from 'next/dynamic';

const InquiryPopup = dynamic(() => import('@/components/InquiryPopup').then(mod => mod.InquiryPopup));
const BotInquiryPopup = dynamic(() => import('@/components/BotInquiryPopup').then(mod => mod.BotInquiryPopup));

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.careerwithmohit.online"),
  title: {
    default: "Mohit Jain | Career Counselling & MBA / PGDM Admissions Expert 2027",
    template: "%s | CareerWithMohit",
  },
  description: "Expert career guidance, MBA & PGDM admissions consulting, and interview prep by Mohit Jain. Uncompromised strategies for CAT 2027, MBA 2027 & degree admissions.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "career counselling", "MBA admissions 2027", "PGDM admission 2027", "B.Tech admissions 2027", "Engineering colleges Delhi NCR",
    "CAT 2027 preparation", "Direct MBA admission 2027", "MBA specializations 2027", "ROI MBA colleges",
    "Pune", "Delhi NCR", "Noida", "Gurgaon", "Mumbai", "Bangalore", "Jaipur",
    "interview prep", "career roadmap 2027",
    "BBA admission guidance 2027", "BCA college guide 2027", "online mba programs india 2027",
    "best career counsellor in india", "top pgdm colleges delhi", "admission consultancy", "degree admission 2027"
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
    title: "Mohit Jain | Career Counselling & MBA / PGDM Admissions Expert 2027",
    description: "Expert career guidance and MBA / PGDM admissions consulting for top-tier B-schools & 2027 admissions.",
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
    title: "Mohit Jain | Career Counselling & MBA / PGDM Admissions Expert 2027",
    description: "Expert career guidance and MBA / PGDM admissions consulting for top-tier B-schools & 2027 admissions.",
    images: ["/og-image.webp"],
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
  other: {
    "google-adsense-account": "ca-pub-4699585931687069"
  }
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
    "areaServed": [
      "Delhi", "Noida", "Gurgaon", "Pune", "Mumbai", "Bangalore", "Jaipur"
    ],
    "priceRange": "$$"
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
      </head>
      <body
        className={`${outfit.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <InquiryPopup />
        <BotInquiryPopup />
        <main className="flex-grow pb-24 md:pb-32">
          {children}
        </main>
        <Footer />
        {/* Combined Google Analytics and Ads Tag */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-448JRKP87B"}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics-ads" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-448JRKP87B"}');
            gtag('config', 'AW-18052249575');
          `}
        </Script>
      </body>
    </html>
  );
}
