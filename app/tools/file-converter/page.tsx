import FileConverter from '@/components/FileConverter';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Free Online File Converter – Word to PDF, PNG to JPG, JSON to CSV | CareerWithMohit',
  description: 'Convert files instantly for free – Word to PDF, PDF to Excel, PNG to JPG, JPG to PNG, JSON to CSV, TXT to PDF. 100% private, runs locally in your browser. No uploads, no sign-up.',
  keywords: [
    'free file converter', 'word to pdf', 'pdf to excel', 'png to jpg', 'jpg to png',
    'json to csv', 'txt to pdf', 'online converter free', 'document converter',
    'image converter online free', 'secure file conversion', 'no upload converter'
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/file-converter',
  },
  openGraph: {
    title: 'Free Online File Converter | CareerWithMohit',
    description: 'Convert Word, PDF, PNG, JPG, JSON and TXT files instantly — 100% free & private. Files never leave your device.',
    url: 'https://www.careerwithmohit.online/tools/file-converter',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Free Online File Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online File Converter | CareerWithMohit',
    description: 'Convert Word, PDF, PNG, JPG, JSON and TXT files instantly in your browser.',
    images: ['/og-image.webp'],
  },
};

export default function FileConverterPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Online Client-Side File Converter",
    "url": "https://www.careerwithmohit.online/tools/file-converter",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Client-side private file converter supporting Word to PDF, image conversion, and data format transforms."
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <JsonLd data={softwareSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] border-2 border-foreground px-3 py-1 bg-accent text-white mb-4">
            Always Free · No Sign-Up Required
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Free Online <span className="text-primary italic">File Converter</span>
          </h1>
          <p className="text-slate-600 font-bold max-w-2xl mx-auto text-base md:text-lg">
            Convert documents, spreadsheets, and images directly in your browser. Zero uploads, zero privacy risk, zero cost — forever free.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <FileConverter />
      </div>
    </section>
  );
}
