"use client";

import React, { useState, useMemo } from 'react';
import { Building2, MapPin, Wallet, GraduationCap, TrendingUp, ExternalLink, Award, Sparkles, Search, ArrowRight, Download, FileText, PieChart, CreditCard, X, Lock } from 'lucide-react';
import StarterKitForm from './StarterKitForm';

export interface PlacementCollege {
  name: string;
  location: string;
  fees: string;
  cutoff: string;
  avg_placement: string;
  highest_placement: string;
  website: string;
  isIim?: boolean;
  tierTag?: string;
}

export interface PercentileTier {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  activeTabStyle: string;
  description: string;
  downloadUrl: string;
  colleges: PlacementCollege[];
}

export const PLACEMENT_DATA_BY_PERCENTILE: PercentileTier[] = [
  {
    id: "tier-1",
    title: "90 Percentile & Above",
    subtitle: "Tier 1 B-Schools",
    badge: "90%+ CAT / XAT / NMAT / SNAP",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    borderColor: "border-amber-500",
    activeTabStyle: "bg-amber-600 text-white shadow-lg shadow-amber-600/20",
    description: "Premier management institutions offering world-class infrastructure, elite campus recruitment, and ₹25+ LPA average packages.",
    downloadUrl: "/downloads/mba-colleges-cutoff-90-plus.pdf",
    colleges: [
      {
        name: "IIM Ahmedabad",
        location: "Ahmedabad, Gujarat",
        fees: "₹26.5 Lakhs (Total)",
        cutoff: "99.5+ CAT %ile",
        avg_placement: "₹35.22 LPA",
        highest_placement: "₹1.15 Crore",
        website: "https://www.iima.ac.in",
        isIim: true
      },
      {
        name: "IIM Bangalore",
        location: "Bangalore, Karnataka",
        fees: "₹24.5 Lakhs (Total)",
        cutoff: "99.0+ CAT %ile",
        avg_placement: "₹33.50 LPA",
        highest_placement: "₹1.15 Crore",
        website: "https://www.iimb.ac.in",
        isIim: true
      },
      {
        name: "IIM Calcutta",
        location: "Kolkata, West Bengal",
        fees: "₹27.0 Lakhs (Total)",
        cutoff: "99.0+ CAT %ile",
        avg_placement: "₹35.07 LPA",
        highest_placement: "₹1.20 Crore",
        website: "https://www.iimcal.ac.in",
        isIim: true
      },
      {
        name: "FMS New Delhi",
        location: "New Delhi, Delhi",
        fees: "₹2.0 Lakhs (Total)",
        cutoff: "98.5+ CAT %ile",
        avg_placement: "₹34.10 LPA",
        highest_placement: "₹1.23 Crore",
        website: "https://fms.edu",
        isIim: false
      },
      {
        name: "XLRI Jamshedpur",
        location: "Jamshedpur, Jharkhand",
        fees: "₹25.0 Lakhs (Total)",
        cutoff: "95.0+ XAT %ile",
        avg_placement: "₹32.70 LPA",
        highest_placement: "₹1.10 Crore",
        website: "https://www.xlri.ac.in",
        isIim: false
      },
      {
        name: "SPJIMR Mumbai",
        location: "Mumbai, Maharashtra",
        fees: "₹23.0 Lakhs (Total)",
        cutoff: "95.0+ CAT / XAT %ile",
        avg_placement: "₹33.00 LPA",
        highest_placement: "₹77.8 LPA",
        website: "https://www.spjimr.org",
        isIim: false
      },
      {
        name: "IIM Lucknow",
        location: "Lucknow, Uttar Pradesh",
        fees: "₹20.7 Lakhs (Total)",
        cutoff: "98.0+ CAT %ile",
        avg_placement: "₹32.20 LPA",
        highest_placement: "₹65.0 LPA",
        website: "https://www.iiml.ac.in",
        isIim: true
      },
      {
        name: "IIM Kozhikode",
        location: "Kozhikode, Kerala",
        fees: "₹20.5 Lakhs (Total)",
        cutoff: "97.0+ CAT %ile",
        avg_placement: "₹31.02 LPA",
        highest_placement: "₹67.0 LPA",
        website: "https://www.iimk.ac.in",
        isIim: true
      },
      {
        name: "IIM Indore",
        location: "Indore, Madhya Pradesh",
        fees: "₹21.0 Lakhs (Total)",
        cutoff: "97.0+ CAT %ile",
        avg_placement: "₹30.21 LPA",
        highest_placement: "₹1.14 Crore",
        website: "https://www.iimidr.ac.in",
        isIim: true
      },
      {
        name: "MDI Gurgaon",
        location: "Gurgaon, Haryana",
        fees: "₹26.0 Lakhs (Total)",
        cutoff: "95.0+ CAT %ile",
        avg_placement: "₹27.67 LPA",
        highest_placement: "₹60.0 LPA",
        website: "https://www.mdi.ac.in",
        isIim: false
      },
      {
        name: "SIBM Pune",
        location: "Pune, Maharashtra",
        fees: "₹24.5 Lakhs (Total)",
        cutoff: "98.5+ SNAP %ile",
        avg_placement: "₹26.77 LPA",
        highest_placement: "₹49.0 LPA",
        website: "https://www.sibmpune.edu.in",
        isIim: false
      },
      {
        name: "NMIMS School of Business Management",
        location: "Mumbai, Maharashtra",
        fees: "₹28.0 Lakhs (Total)",
        cutoff: "232+ NMAT Score",
        avg_placement: "₹26.63 LPA",
        highest_placement: "₹67.8 LPA",
        website: "https://sbm.nmims.edu",
        isIim: false
      },
      {
        name: "IIFT New Delhi",
        location: "New Delhi, Delhi",
        fees: "₹21.8 Lakhs (Total)",
        cutoff: "95.0+ CAT %ile",
        avg_placement: "₹29.10 LPA",
        highest_placement: "₹85.4 LPA",
        website: "https://www.iift.ac.in",
        isIim: false
      },
      {
        name: "JBIMS Mumbai",
        location: "Mumbai, Maharashtra",
        fees: "₹7.0 Lakhs (Total)",
        cutoff: "99.9+ MAH-CET / CAT",
        avg_placement: "₹28.02 LPA",
        highest_placement: "₹35.7 LPA",
        website: "https://www.jbims.edu",
        isIim: false
      }
    ]
  },
  {
    id: "tier-2-top",
    title: "80 to 90 Percentile",
    subtitle: "Top Tier-2 B-Schools",
    badge: "80 - 90 CAT / XAT / NMAT / SNAP",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    borderColor: "border-indigo-500",
    activeTabStyle: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20",
    description: "Highly sought-after corporate destinations offering strong ROI, industry exposure, and ₹14 - ₹23 LPA average packages.",
    downloadUrl: "/downloads/mba-colleges-cutoff-80-to-90.pdf",
    colleges: [
      {
        name: "IIM Shillong",
        location: "Shillong, Meghalaya",
        fees: "₹19.1 Lakhs (Total)",
        cutoff: "90.0+ CAT %ile",
        avg_placement: "₹26.96 LPA",
        highest_placement: "₹71.3 LPA",
        website: "https://www.iimshillong.ac.in",
        isIim: true
      },
      {
        name: "SCMHRD Pune",
        location: "Pune, Maharashtra",
        fees: "₹23.8 Lakhs (Total)",
        cutoff: "88.0+ SNAP %ile",
        avg_placement: "₹23.71 LPA",
        highest_placement: "₹41.5 LPA",
        website: "https://www.scmhrd.edu",
        isIim: false
      },
      {
        name: "IIM Raipur",
        location: "Raipur, Chhattisgarh",
        fees: "₹18.0 Lakhs (Total)",
        cutoff: "88.0+ CAT %ile",
        avg_placement: "₹21.04 LPA",
        highest_placement: "₹67.6 LPA",
        website: "https://www.iimraipur.ac.in",
        isIim: true
      },
      {
        name: "IIM Trichy",
        location: "Tiruchirappalli, Tamil Nadu",
        fees: "₹19.5 Lakhs (Total)",
        cutoff: "88.0+ CAT %ile",
        avg_placement: "₹20.55 LPA",
        highest_placement: "₹41.6 LPA",
        website: "https://www.iimtrichy.ac.in",
        isIim: true
      },
      {
        name: "XIMB Bhubaneswar",
        location: "Bhubaneswar, Odisha",
        fees: "₹22.0 Lakhs (Total)",
        cutoff: "85.0+ XAT / CAT",
        avg_placement: "₹20.03 LPA",
        highest_placement: "₹71.5 LPA",
        website: "https://ximb.edu.in",
        isIim: false
      },
      {
        name: "IIM Udaipur",
        location: "Udaipur, Rajasthan",
        fees: "₹21.0 Lakhs (Total)",
        cutoff: "88.0+ CAT %ile",
        avg_placement: "₹20.02 LPA",
        highest_placement: "₹47.3 LPA",
        website: "https://www.iimu.ac.in",
        isIim: true
      },
      {
        name: "IIM Rohtak",
        location: "Rohtak, Haryana",
        fees: "₹17.9 Lakhs (Total)",
        cutoff: "88.0+ CAT %ile",
        avg_placement: "₹18.73 LPA",
        highest_placement: "₹48.2 LPA",
        website: "https://www.iimrohtak.ac.in",
        isIim: true
      },
      {
        name: "IIM Kashipur",
        location: "Kashipur, Uttarakhand",
        fees: "₹18.5 Lakhs (Total)",
        cutoff: "85.0+ CAT %ile",
        avg_placement: "₹18.11 LPA",
        highest_placement: "₹37.0 LPA",
        website: "https://www.iimkashipur.ac.in",
        isIim: true
      },
      {
        name: "IMT Ghaziabad",
        location: "Ghaziabad, Uttar Pradesh",
        fees: "₹21.5 Lakhs (Total)",
        cutoff: "85.0+ CAT / XAT",
        avg_placement: "₹17.35 LPA",
        highest_placement: "₹65.6 LPA",
        website: "https://www.imt.edu",
        isIim: false
      },
      {
        name: "IIM Ranchi",
        location: "Ranchi, Jharkhand",
        fees: "₹17.5 Lakhs (Total)",
        cutoff: "88.0+ CAT %ile",
        avg_placement: "₹17.30 LPA",
        highest_placement: "₹35.5 LPA",
        website: "https://www.iimranchi.ac.in",
        isIim: true
      },
      {
        name: "IMI Delhi",
        location: "New Delhi, Delhi",
        fees: "₹20.9 Lakhs (Total)",
        cutoff: "85.0+ CAT / XAT",
        avg_placement: "₹17.01 LPA",
        highest_placement: "₹50.0 LPA",
        website: "https://www.imi.edu",
        isIim: false
      },
      {
        name: "TAPMI Manipal",
        location: "Manipal, Karnataka",
        fees: "₹18.0 Lakhs (Total)",
        cutoff: "85.0+ CAT / XAT / NMAT",
        avg_placement: "₹15.70 LPA",
        highest_placement: "₹32.0 LPA",
        website: "https://www.tapmi.edu.in",
        isIim: false
      },
      {
        name: "Goa Institute of Management (GIM)",
        location: "Sanquelim, Goa",
        fees: "₹19.5 Lakhs (Total)",
        cutoff: "85.0+ XAT / CAT / CMAT",
        avg_placement: "₹15.00 LPA",
        highest_placement: "₹55.0 LPA",
        website: "https://www.gim.ac.in",
        isIim: false
      },
      {
        name: "FORE School of Management",
        location: "New Delhi, Delhi",
        fees: "₹18.6 Lakhs (Total)",
        cutoff: "82.0+ CAT / XAT",
        avg_placement: "₹14.50 LPA",
        highest_placement: "₹30.0 LPA",
        website: "https://www.fsm.ac.in",
        isIim: false
      },
      {
        name: "SIBM Bangalore",
        location: "Bangalore, Karnataka",
        fees: "₹19.0 Lakhs (Total)",
        cutoff: "85.0+ SNAP %ile",
        avg_placement: "₹13.48 LPA",
        highest_placement: "₹24.0 LPA",
        website: "https://www.sibmbangalore.edu.in",
        isIim: false
      }
    ]
  },
  {
    id: "tier-2-reputed",
    title: "70 to 80 Percentile",
    subtitle: "Reputed Tier-2/3 B-Schools",
    badge: "70 - 80 CAT / XAT / NMAT / CMAT",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    borderColor: "border-emerald-500",
    activeTabStyle: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20",
    description: "Solid choices offering AICTE/NBA recognized management degrees, reliable placement records, and ₹11 - ₹16 LPA average packages.",
    downloadUrl: "/downloads/mba-colleges-cutoff-70-to-80.pdf",
    colleges: [
      {
        name: "IIM Amritsar",
        location: "Amritsar, Punjab",
        fees: "₹16.0 Lakhs (Total)",
        cutoff: "80.0+ CAT %ile",
        avg_placement: "₹16.51 LPA",
        highest_placement: "₹36.25 LPA",
        website: "https://www.iimamritsar.ac.in",
        isIim: true
      },
      {
        name: "IIM Visakhapatnam",
        location: "Visakhapatnam, Andhra Pradesh",
        fees: "₹17.8 Lakhs (Total)",
        cutoff: "80.0+ CAT %ile",
        avg_placement: "₹16.62 LPA",
        highest_placement: "₹32.65 LPA",
        website: "https://www.iimv.ac.in",
        isIim: true
      },
      {
        name: "IIM Jammu",
        location: "Jammu, J&K",
        fees: "₹17.2 Lakhs (Total)",
        cutoff: "80.0+ CAT %ile",
        avg_placement: "₹16.43 LPA",
        highest_placement: "₹64.0 LPA",
        website: "https://www.iimj.ac.in",
        isIim: true
      },
      {
        name: "IIM Bodh Gaya",
        location: "Bodh Gaya, Bihar",
        fees: "₹17.0 Lakhs (Total)",
        cutoff: "80.0+ CAT %ile",
        avg_placement: "₹16.00 LPA",
        highest_placement: "₹48.58 LPA",
        website: "https://www.iimbg.ac.in",
        isIim: true
      },
      {
        name: "IRMA Anand",
        location: "Anand, Gujarat",
        fees: "₹16.8 Lakhs (Total)",
        cutoff: "78.0+ CAT / XAT",
        avg_placement: "₹15.50 LPA",
        highest_placement: "₹31.16 LPA",
        website: "https://www.irma.ac.in",
        isIim: false
      },
      {
        name: "SDA Bocconi Asia Center",
        location: "Mumbai, Maharashtra",
        fees: "₹19.4 Lakhs (Total)",
        cutoff: "75.0+ NMAT / CAT",
        avg_placement: "₹14.30 LPA",
        highest_placement: "₹36.28 LPA",
        website: "https://www.sdabocconiasiacenter.com",
        isIim: false
      },
      {
        name: "NMIMS Bangalore",
        location: "Bangalore, Karnataka",
        fees: "₹20.0 Lakhs (Total)",
        cutoff: "215+ NMAT Score",
        avg_placement: "₹14.00 LPA",
        highest_placement: "₹43.0 LPA",
        website: "https://www.nmimsbangalore.org",
        isIim: false
      },
      {
        name: "IFMR Graduate School of Business",
        location: "Sri City, Andhra Pradesh",
        fees: "₹14.5 Lakhs (Total)",
        cutoff: "75.0+ NMAT / CAT",
        avg_placement: "₹13.50 LPA",
        highest_placement: "₹22.9 LPA",
        website: "https://krea.edu.in/ifmrgsb/",
        isIim: false
      },
      {
        name: "K J Somaiya Institute of Management",
        location: "Mumbai, Maharashtra",
        fees: "₹20.8 Lakhs (Total)",
        cutoff: "78.0+ CAT / NMAT",
        avg_placement: "₹13.00 LPA",
        highest_placement: "₹25.96 LPA",
        website: "https://simsr.somaiya.edu",
        isIim: false
      },
      {
        name: "SIIB Pune",
        location: "Pune, Maharashtra",
        fees: "₹19.6 Lakhs (Total)",
        cutoff: "80.0+ SNAP %ile",
        avg_placement: "₹13.12 LPA",
        highest_placement: "₹39.0 LPA",
        website: "https://www.siib.ac.in",
        isIim: false
      },
      {
        name: "Welingkar Institute of Management (WeSchool)",
        location: "Mumbai, Maharashtra",
        fees: "₹14.0 Lakhs (Total)",
        cutoff: "75.0+ CAT / CMAT",
        avg_placement: "₹12.50 LPA",
        highest_placement: "₹24.0 LPA",
        website: "https://www.welingkar.org",
        isIim: false
      },
      {
        name: "LBSIM Delhi",
        location: "New Delhi, Delhi",
        fees: "₹15.5 Lakhs (Total)",
        cutoff: "78.0+ CAT / XAT",
        avg_placement: "₹12.40 LPA",
        highest_placement: "₹25.9 LPA",
        website: "https://www.lbsim.ac.in",
        isIim: false
      },
      {
        name: "LIBA Chennai",
        location: "Chennai, Tamil Nadu",
        fees: "₹17.0 Lakhs (Total)",
        cutoff: "75.0+ CAT / XAT",
        avg_placement: "₹11.50 LPA",
        highest_placement: "₹20.5 LPA",
        website: "https://liba.edu",
        isIim: false
      },
      {
        name: "BIMTECH Greater Noida",
        location: "Greater Noida, Uttar Pradesh",
        fees: "₹14.0 Lakhs (Total)",
        cutoff: "70.0+ CAT / CMAT",
        avg_placement: "₹11.00 LPA",
        highest_placement: "₹24.4 LPA",
        website: "https://www.bimtech.ac.in",
        isIim: false
      },
      {
        name: "Nirma University Institute of Management",
        location: "Ahmedabad, Gujarat",
        fees: "₹12.8 Lakhs (Total)",
        cutoff: "75.0+ CAT %ile",
        avg_placement: "₹12.20 LPA",
        highest_placement: "₹30.0 LPA",
        website: "https://management.nirmauni.ac.in",
        isIim: false
      }
    ]
  },
  {
    id: "tier-accessible",
    title: "Below 70 Percentile",
    subtitle: "Accessible MBA / PGDM Colleges",
    badge: "< 70 CAT / XAT / CMAT / MAT / ATMA",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    borderColor: "border-purple-500",
    activeTabStyle: "bg-purple-600 text-white shadow-lg shadow-purple-600/20",
    description: "Accessible B-Schools with pragmatic admission criteria, industry immersion, versatile specializations, and ₹7.5 - ₹12.5 LPA placement packages.",
    downloadUrl: "/downloads/mba-colleges-cutoff-below-70.pdf",
    colleges: [
      {
        name: "Jaipuria Institute of Management",
        location: "Noida / Lucknow / Jaipur",
        fees: "₹13.5 Lakhs (Total)",
        cutoff: "50 - 65 CAT / MAT / CMAT",
        avg_placement: "₹11.29 LPA",
        highest_placement: "₹22.0 LPA",
        website: "https://www.jaipuria.ac.in",
        isIim: false
      },
      {
        name: "SIDTM Pune",
        location: "Pune, Maharashtra",
        fees: "₹18.0 Lakhs (Total)",
        cutoff: "65 - 70 SNAP %ile",
        avg_placement: "₹12.78 LPA",
        highest_placement: "₹27.83 LPA",
        website: "https://www.sidtm.edu.in",
        isIim: false
      },
      {
        name: "SCIT Pune",
        location: "Pune, Maharashtra",
        fees: "₹16.5 Lakhs (Total)",
        cutoff: "65 - 70 SNAP %ile",
        avg_placement: "₹11.20 LPA",
        highest_placement: "₹30.0 LPA",
        website: "https://www.scit.edu",
        isIim: false
      },
      {
        name: "SIMS Pune",
        location: "Pune, Maharashtra",
        fees: "₹12.0 Lakhs (Total)",
        cutoff: "60 - 70 SNAP %ile",
        avg_placement: "₹11.00 LPA",
        highest_placement: "₹21.5 LPA",
        website: "https://www.sims.edu",
        isIim: false
      },
      {
        name: "SSBF Pune",
        location: "Pune, Maharashtra",
        fees: "₹17.0 Lakhs (Total)",
        cutoff: "60+ SNAP %ile",
        avg_placement: "₹11.00 LPA",
        highest_placement: "₹19.6 LPA",
        website: "https://www.ssbf.edu.in",
        isIim: false
      },
      {
        name: "New Delhi Institute of Management (NDIM)",
        location: "New Delhi, Delhi",
        fees: "₹11.5 Lakhs (Total)",
        cutoff: "55 - 65 CAT / MAT / CMAT",
        avg_placement: "₹9.50 LPA",
        highest_placement: "₹24.0 LPA",
        website: "https://www.ndimdelhi.org",
        isIim: false
      },
      {
        name: "FOSTIIMA Business School",
        location: "New Delhi, Delhi",
        fees: "₹11.5 Lakhs (Total)",
        cutoff: "50 - 65 CAT / MAT",
        avg_placement: "₹9.20 LPA",
        highest_placement: "₹25.0 LPA",
        website: "https://www.fostiima.org",
        isIim: false
      },
      {
        name: "SIBM Hyderabad",
        location: "Hyderabad, Telangana",
        fees: "₹15.5 Lakhs (Total)",
        cutoff: "55 - 60 SNAP %ile",
        avg_placement: "₹8.90 LPA",
        highest_placement: "₹15.0 LPA",
        website: "https://www.sibmhyderabad.edu.in",
        isIim: false
      },
      {
        name: "Balaji Institute of Modern Management (BIMM Pune)",
        location: "Pune, Maharashtra",
        fees: "₹11.9 Lakhs (Total)",
        cutoff: "50 - 65 CAT / MAT",
        avg_placement: "₹8.75 LPA",
        highest_placement: "₹21.58 LPA",
        website: "https://www.sbup.edu.in",
        isIim: false
      },
      {
        name: "Christ University School of Business",
        location: "Bangalore, Karnataka",
        fees: "₹9.5 Lakhs (Total)",
        cutoff: "60 - 70 CAT / MAT",
        avg_placement: "₹8.50 LPA",
        highest_placement: "₹21.4 LPA",
        website: "https://www.christuniversity.in",
        isIim: false
      },
      {
        name: "Alliance University School of Business",
        location: "Bangalore, Karnataka",
        fees: "₹15.0 Lakhs (Total)",
        cutoff: "50 - 65 CAT / MAT",
        avg_placement: "₹8.50 LPA",
        highest_placement: "₹16.7 LPA",
        website: "https://www.alliance.edu.in",
        isIim: false
      },
      {
        name: "UPES School of Business",
        location: "Dehradun, Uttarakhand",
        fees: "₹15.5 Lakhs (Total)",
        cutoff: "50 - 65 CAT / MAT",
        avg_placement: "₹8.12 LPA",
        highest_placement: "₹30.0 LPA",
        website: "https://www.upes.ac.in",
        isIim: false
      },
      {
        name: "Indus Business Academy (IBA)",
        location: "Bangalore, Karnataka",
        fees: "₹9.8 Lakhs (Total)",
        cutoff: "50 - 65 CAT / MAT",
        avg_placement: "₹7.80 LPA",
        highest_placement: "₹14.2 LPA",
        website: "https://www.iba.ac.in",
        isIim: false
      },
      {
        name: "Amity Business School",
        location: "Noida, Uttar Pradesh",
        fees: "₹14.0 Lakhs (Total)",
        cutoff: "Direct / 50+ CAT",
        avg_placement: "₹7.50 LPA",
        highest_placement: "₹15.0 LPA",
        website: "https://www.amity.edu",
        isIim: false
      }
    ]
  }
];

export default function StarterKitPlacementTable() {
  const [activeTierId, setActiveTierId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingPdf, setPendingPdf] = useState<{ url: string; title: string }>({ url: '', title: '' });

  const handleDownloadClick = (e: React.MouseEvent, pdfUrl: string, pdfTitle: string) => {
    e.preventDefault();
    const isSubmitted = typeof window !== 'undefined' && localStorage.getItem('starter_kit_submitted') === 'true';
    if (isSubmitted) {
      window.open(pdfUrl, '_blank');
    } else {
      setPendingPdf({ url: pdfUrl, title: pdfTitle });
      setModalOpen(true);
    }
  };

  const handleFormSuccessInModal = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('starter_kit_submitted', 'true');
    }
    setModalOpen(false);
    if (pendingPdf.url) {
      window.open(pendingPdf.url, '_blank');
    }
  };

  const activeTier = useMemo(() => {
    return PLACEMENT_DATA_BY_PERCENTILE.find(t => t.id === activeTierId);
  }, [activeTierId]);

  const displayedTiers = useMemo(() => {
    if (activeTierId === "all") {
      return PLACEMENT_DATA_BY_PERCENTILE;
    }
    return activeTier ? [activeTier] : PLACEMENT_DATA_BY_PERCENTILE;
  }, [activeTierId, activeTier]);

  return (
    <div id="placement-data" className="mt-20 mb-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MBA Placement Benchmark 2026-27</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Placement Data by <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Percentile Category</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Compare top B-Schools grouped by exam percentile cutoffs, course fees, average salaries, and official websites to target the right college for your score.
        </p>
      </div>

      {/* Category Selection Bar / Filter Tabs */}
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => setActiveTierId("all")}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTierId === "all"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <span>All Percentiles</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
              {PLACEMENT_DATA_BY_PERCENTILE.reduce((acc, t) => acc + t.colleges.length, 0)}
            </span>
          </button>

          {PLACEMENT_DATA_BY_PERCENTILE.map((tier) => {
            const isActive = activeTierId === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTierId(tier.id)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 text-center ${
                  isActive
                    ? tier.activeTabStyle
                    : "text-slate-700 bg-white/70 hover:bg-white hover:shadow-sm"
                }`}
              >
                <span>{tier.title}</span>
                <span className="text-[10px] opacity-85 font-medium">({tier.subtitle})</span>
              </button>
            );
          })}
        </div>

        {/* Search bar inside Placement Section */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search institute name or location in placement data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Render Tier Sections */}
      <div className="space-y-12">
        {displayedTiers.map((tier) => {
          const filteredColleges = tier.colleges.filter(c =>
            !searchQuery ||
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.cutoff.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredColleges.length === 0 && searchQuery) {
            return null;
          }

          return (
            <div
              key={tier.id}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
            >
              {/* Tier Header Banner */}
              <div className={`p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-indigo-50/30`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {tier.title}
                    </h3>
                    <span className="text-sm font-semibold text-slate-500">
                      ({tier.subtitle})
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium max-w-3xl">
                    {tier.description}
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center flex-wrap gap-2">
                  <button
                    onClick={(e) => handleDownloadClick(e, tier.downloadUrl, `${tier.title} (${tier.subtitle}) Report`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Tier PDF
                  </button>
                  <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-extrabold ${tier.badgeBg} ${tier.badgeText} border border-black/5`}>
                    <Award className="w-3.5 h-3.5 mr-1.5" />
                    {tier.badge}
                  </span>
                </div>
              </div>

              {/* Colleges Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-4 px-6 font-bold text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-indigo-500" /> Institute
                        </div>
                      </th>
                      <th className="py-4 px-6 font-bold text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-500" /> Location
                        </div>
                      </th>
                      <th className="py-4 px-6 font-bold text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-purple-500" /> Total Fees
                        </div>
                      </th>
                      <th className="py-4 px-6 font-bold text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-500" /> Cutoff
                        </div>
                      </th>
                      <th className="py-4 px-6 font-bold text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" /> Avg Placement
                        </div>
                      </th>
                      <th className="py-4 px-6 font-bold text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        Highest Placement
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredColleges.map((college, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-indigo-50/30 transition-colors group"
                      >
                        {/* College Name & Website */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border font-bold text-xs shadow-xs ${
                              college.isIim
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}>
                              {college.isIim ? 'IIM' : college.name.substring(0, 3).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors text-sm">
                                {college.name}
                              </span>
                              <a
                                href={college.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-0.5"
                              >
                                Official Website <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-600 font-semibold">
                          {college.location}
                        </td>

                        {/* Fees */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                            {college.fees}
                          </span>
                        </td>

                        {/* Cutoff */}
                        <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-700 font-bold">
                          {college.cutoff}
                        </td>

                        {/* Avg Placement */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200 shadow-2xs">
                            {college.avg_placement}
                          </span>
                        </td>

                        {/* Highest Placement */}
                        <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-700 font-bold">
                          {college.highest_placement}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Specialized Placement & Admission Reports */}
      <div className="mt-14 mb-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Specialized Placement & Admission Reports
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-1">
            Download verified reports on DRCC Bihar credit card approved private MBA colleges and sector-wise recruiter stats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: MBA Campus Placement Master Guide */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-700/50 relative overflow-hidden flex flex-col justify-between group hover:border-indigo-400/60 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                  <FileText className="w-6 h-6" />
                </span>
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                  ⭐ Master Guide
                </span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-200 transition-colors">
                MBA Placement Interview Q&A Guide
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Selection rounds, real interview questions, and prep frameworks for Big 4, BFSI, FMCG, and Tech Sales campus hiring.
              </p>
            </div>
            <button
              onClick={(e) => handleDownloadClick(e, "/downloads/mba-campus-placement-interview-guide.pdf", "MBA Campus Placement Selection Process & Questions")}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Guide (PDF)
            </button>
          </div>

          {/* Card 2: DRCC Private MBA Colleges List */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-800/40 relative overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                  <CreditCard className="w-6 h-6" />
                </span>
                <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-400/20">
                  DRCC Approved
                </span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-200 transition-colors">
                DRCC Private MBA Colleges List
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Verified directory of top private MBA & PGDM colleges in India accepting Bihar Student Credit Card (DRCC) scheme for 0% / low interest education loans.
              </p>
            </div>
            <button
              onClick={(e) => handleDownloadClick(e, "/downloads/drcc-private-mba-colleges-list.pdf", "DRCC Private MBA Colleges List")}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download DRCC List (PDF)
            </button>
          </div>

          {/* Card 3: Sector-Wise Recruiter Statistics */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-800/40 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">
                  <PieChart className="w-6 h-6" />
                </span>
                <span className="px-3 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-400/20">
                  Sector Insights
                </span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-200 transition-colors">
                Sector-Wise Recruiter Statistics
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Detailed domain-wise placement analysis covering Consulting, BFSI, IT/Analytics, Product Management, FMCG, and E-commerce hiring trends across top B-schools.
              </p>
            </div>
            <button
              onClick={(e) => handleDownloadClick(e, "/downloads/sector-wise-recruiter-statistics.pdf", "Sector-Wise Recruiter Statistics")}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Sector Stats (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA for full college directory */}
      <div className="mt-8 p-6 bg-linear-to-r from-slate-900 to-indigo-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h4 className="text-lg font-bold">Looking for 200+ Verified MBA / PGDM Colleges?</h4>
          <p className="text-xs text-slate-300 mt-1">Explore detailed reviews, cutoffs, ROI stats, campus galleries, and fee structures.</p>
        </div>
        <a
          href="/colleges"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md"
        >
          Explore All Colleges <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Inquiry Form Modal for PDF Downloads */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" /> Unlock PDF Download
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Submit Starter Kit Inquiry Form</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Please submit the quick inquiry form below to download <span className="font-bold text-indigo-600">{pendingPdf.title}</span> and unlock all PDF reports.
              </p>
            </div>

            <StarterKitForm
              formSource={`Starter Kit PDF Download - ${pendingPdf.title}`}
              onSuccessCallback={handleFormSuccessInModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
