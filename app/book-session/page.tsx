import type { Metadata } from 'next';
import { BookSessionClient } from '@/components/BookSessionClient';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Book Free 1-on-1 MBA Counselling with Mohit Jain (Google Meet)",
  description: "Schedule a free 30-min 1-on-1 video counselling session with Mohit Jain (IIM-B & FMS certified). Live B-school cutoffs, direct admission & profile evaluation.",
  keywords: [
    "book face to face MBA counselling",
    "google meet MBA counselling",
    "free 1 on 1 video counselling Mohit Jain",
    "direct MBA admission google meet",
    "CAT strategy video call",
    "face to face career counselling",
    "Mohit Jain counselling",
    "MBA admission consultation",
    "MBA college shortlisting video call",
    "PGDM admission guidance Google Meet"
  ],
  alternates: {
    canonical: "/book-session/",
  },
  openGraph: {
    title: "Book Free Face-to-Face Video Counselling on Google Meet | CareerWithMohit",
    description: "Schedule your free 30-minute 1-on-1 face-to-face MBA & career counselling video session with Mohit Jain on Google Meet.",
    url: "/book-session/",
    siteName: "CareerWithMohit",
    type: "website",
    images: [
      {
        url: "https://careerwithmohit.online/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Book Free Face-to-Face MBA Counselling Session - Mohit Jain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Free Face-to-Face Video Counselling on Google Meet | CareerWithMohit",
    description: "Schedule your free 30-minute 1-on-1 face-to-face MBA & career counselling video session with Mohit Jain on Google Meet.",
    images: ["https://careerwithmohit.online/og-image.webp"],
  },
};

export default function BookSessionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://careerwithmohit.online/book-session/#service",
        "name": "Free 1-on-1 MBA & Career Counselling Session",
        "provider": {
          "@type": "Person",
          "name": "Mohit Jain",
          "jobTitle": "Chief MBA Admissions Strategist & Mentor",
          "url": "https://careerwithmohit.online/about"
        },
        "description": "30-minute free online face-to-face counselling session with mentor Mohit Jain on Google Meet for MBA/PGDM college selection, cutoff strategy, fee ROI audit, and profile review.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "serviceType": "Educational Consultation & MBA Admission Advisory",
        "areaServed": "India",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://careerwithmohit.online/book-session/",
          "servicePhone": "+919560020771"
        }
      },
      {
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
            "name": "Book Free Session",
            "item": "https://careerwithmohit.online/book-session/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this 1-on-1 video counselling call really 100% free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free! The 30-minute Google Meet consultation is 100% free for students and parents. There are zero hidden charges, no credit card required, and no aggressive sales pitches."
            }
          },
          {
            "@type": "Question",
            "name": "How will I receive the Google Meet video link?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As soon as you pick your preferred slot, a Google Meet link is automatically created and emailed to you along with a Google Calendar invite. You will also receive a confirmation on WhatsApp."
            }
          },
          {
            "@type": "Question",
            "name": "Can my parents join the video call with me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely yes! In fact, we strongly encourage parents to attend so everyone is aligned on college choices, tuition fees, educational loans, hostel safety, and placement ROI."
            }
          },
          {
            "@type": "Question",
            "name": "My score is low or I haven't taken CAT yet. Can I still book?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! A huge number of students we mentor have average scores (50–85 percentile) or are planning non-CAT exams like CMAT, MAT, ATMA, NMAT, or institutional direct admissions."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <JsonLd data={serviceSchema} />
      <BookSessionClient calendlyUrl="https://calendly.com/careerwithmohit-jain" />
    </main>
  );
}
