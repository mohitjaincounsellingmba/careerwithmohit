import type { Metadata } from "next";
import { CuetUgPageContent } from "./CuetUgPageContent";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "CUET UG 2026 Score Calculator & Percentile Predictor | NTA Pattern | CareerWithMohit",
  description: "Free NTA CUET UG 2026 score calculator. Calculate CUET UG raw score, predict percentile, and compare CUET 2026 Marks vs Percentile for DU and BHU admissions.",
  keywords: [
    "CUET UG 2026 Score Calculator",
    "CUET Score Predictor 2026",
    "Calculate CUET UG Raw Score",
    "CUET 2026 Marks vs Percentile Calculator",
    "NTA CUET UG Score Calculator",
    "CUET Percentile Predictor 2026",
    "How to calculate CUET UG score 2026",
    "CUET marks vs percentile for DU",
    "What is a safe score for BHU in CUET 2026?",
    "CUET 2026 expected cut-off for top universities"
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/calculator/cuet-ug-2026',
  },
  openGraph: {
    title: "NTA CUET UG 2026 Score Calculator & Predictor | CareerWithMohit",
    description: "Calculate your CUET UG raw score instantly. Predict percentile and check admission chances for top central universities like DU and BHU.",
    type: "website",
    url: "https://www.careerwithmohit.online/calculator/cuet-ug-2026",
    siteName: "CareerWithMohit",
    locale: "en_IN",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "CUET UG Score Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CUET UG 2026 Score Calculator & Predictor",
    description: "Calculate your CUET UG raw score and predict DU/BHU admission percentiles.",
    images: ["/og-image.webp"],
  },
};

export default function CuetUgCalculatorPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CUET UG Score & Percentile Calculator",
    "url": "https://www.careerwithmohit.online/calculator/cuet-ug-2026",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <CuetUgPageContent />
    </>
  );
}
