import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ClientWidgets } from "@/components/ClientWidgets";
import { DeferredAnalytics } from "@/components/DeferredAnalytics";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://careerwithmohit.online"),
  title: {
    default: "Mohit Jain | Career Counselling & MBA Admissions Expert 2027",
    template: "%s | CareerWithMohit",
  },
  description: "Expert career guidance, MBA/PGDM admissions consulting, and interview prep by Mohit Jain. Proven strategies for CAT, XAT, NMAT & top university admissions.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" }
    ],
    apple: "/favicon.png",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "fE7d3H-B_zJ8-nS9u2G5v-Xk4m-L0p3Q1W2E4R5T6Y7",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "B6D0F55359D960CA2DE85C38481A08D1",
    }
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://careerwithmohit.online/",
    siteName: "CareerWithMohit",
    title: "Mohit Jain | Career Counselling & MBA Admissions Expert 2027",
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
    title: "Mohit Jain | Career Counselling & MBA Admissions Expert 2027",
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
    "google-adsense-account": "ca-pub-4699585931687069",
    "geo.region": "IN-DL",
    "geo.placename": "Delhi NCR, India",
    "geo.position": "28.6139;77.2090",
    "ICBM": "28.6139, 77.2090",
    "coverage": "Pan India, Delhi NCR, Mumbai, Pune, Bangalore, Hyderabad, Jaipur, Kolkata, Chennai, Ahmedabad",
    "distribution": "Global",
    "rating": "General",
    "ai-content-declaration": "human-authored-expert-guidance"
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
    "@id": "https://careerwithmohit.online/#person-mohit-jain",
    "name": "Mohit Jain",
    "url": "https://careerwithmohit.online/about/",
    "image": "https://careerwithmohit.online/logo.webp",
    "jobTitle": "Chief Career Counsellor & MBA Admissions Strategist",
    "description": "Expert career mentor and MBA admissions consultant with credentials from IIM Bangalore and FMS Delhi. Guiding students for CAT 2026, XAT 2027, top-tier B-schools, and direct admissions.",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "CareerWithMohit",
      "url": "https://careerwithmohit.online"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "IIM Bangalore"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Faculty of Management Studies (FMS), Delhi"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Digital Marketing & Strategy Certification",
        "credentialCategory": "Professional Certificate",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "IIM Bangalore"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Strategic Marketing Certification",
        "credentialCategory": "Professional Certificate",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Faculty of Management Studies (FMS Delhi)"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Business Analytics & Six Sigma Yellow Belt",
        "credentialCategory": "Professional Certificate"
      }
    ],
    "knowsAbout": [
      "MBA Admissions 2027",
      "PGDM Admissions 2027",
      "CAT 2026 Preparation & Mock Tests",
      "XAT 2027 Exam Strategy",
      "NMAT by GMAC & SNAP Admissions",
      "GD-PI-WAT Mentorship",
      "B-School ROI & Placement Analysis",
      "Direct MBA Admissions in Delhi NCR, Pune, Bangalore",
      "B.Tech & BBA Admissions Guidance",
      "Online MBA Degree Evaluations"
    ],
    "sameAs": [
      "https://wa.me/919560020771",
      "https://www.youtube.com/@careerwithmohit",
      "https://www.linkedin.com/in/mohit-jain-career-counsellor",
      "https://www.instagram.com/careerwithmohit"
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": "https://careerwithmohit.online/#organization",
    "name": "CareerWithMohit",
    "alternateName": "Career with Mohit Admissions Consulting",
    "url": "https://careerwithmohit.online",
    "logo": "https://careerwithmohit.online/logo.webp",
    "image": "https://careerwithmohit.online/og-image.webp",
    "telephone": "+91-9560020771",
    "founder": {
      "@type": "Person",
      "name": "Mohit Jain"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi NCR",
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "areaServed": [
      "Delhi NCR", "Noida", "Gurgaon", "Pune", "Mumbai", "Bangalore", "Hyderabad", "Jaipur", "Kolkata", "Chennai", "Ahmedabad", "Chandigarh", "Pan India"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9560020771",
      "contactType": "Admissions & Career Advisory",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "IN"
    },
    "knowsAbout": [
      "MBA & PGDM Admissions 2027",
      "Entrance Exam Free Mock Tests",
      "College Cutoffs and Placement Analytics",
      "Profile Assessment and GDPI Training"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "CareerWithMohit Services & Admission Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MBA / PGDM Admissions Consulting 2027",
            "description": "Strategic profile evaluation, B-school selection, direct admission guidance, and GDPI mentorship."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free National Entrance Exam Mock Test Portal",
            "description": "Full-length free practice mock tests with live timers for CAT, XAT, NMAT, SNAP, MAT, ATMA, and CMAT."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "College Cutoff & Percentile Calculator Tools",
            "description": "Interactive tools for CAT score-to-percentile conversion, XAT calculators, and B.Tech college prediction."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "GD-PI-WAT Interview Preparation Bootcamp",
            "description": "1-on-1 mock interviews, case analysis, SOP review, and personal mentoring by Mohit Jain."
          }
        }
      ]
    },
    "priceRange": "$$"
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://careerwithmohit.online/#website",
    "name": "CareerWithMohit",
    "alternateName": "Career with Mohit Admissions & Career Counselling",
    "url": "https://careerwithmohit.online",
    "publisher": {
      "@id": "https://careerwithmohit.online/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://careerwithmohit.online/search/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-IN"
  };

  const speakableData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CareerWithMohit Career Counselling & MBA Admissions",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "h1",
        "h2",
        ".speakable-summary",
        "#ai-fast-facts"
      ]
    },
    "url": "https://careerwithmohit.online"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('cwm_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://api.counterapi.dev" />
        <link rel="alternate" type="application/rss+xml" title="CareerWithMohit Blog" href="/feed.xml" />
        <link rel="author" href="https://careerwithmohit.online/about/" />
        <link rel="help" href="/llms.txt" />
        <JsonLd data={personData} />
        <JsonLd data={organizationData} />
        <JsonLd data={websiteData} />
        <JsonLd data={speakableData} />
      </head>
      <body
        className={`${outfit.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200`}
      >
        <AnalyticsTracker />
        <DeferredAnalytics />
        <Header />
        <ClientWidgets />
        <main className="flex-grow pb-24 md:pb-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
