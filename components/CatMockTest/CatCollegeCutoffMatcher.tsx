'use client';

import React, { useState, useMemo } from 'react';
import { Target, Search, Building2, MapPin, IndianRupee, TrendingUp, CheckCircle, MessageCircle, Filter, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CatCollegeData {
  name: string;
  slug?: string;
  city: string;
  state: string;
  tier: '99+ %ile' | '95-98 %ile' | '90-94 %ile' | '80-89 %ile' | '70-79 %ile';
  category: 'IIMs' | 'Top Non-IIMs' | 'IITs' | 'Premier PGDM';
  cutoffPercentile: string;
  sectionalCutoff: string;
  fees: string;
  avgPackage: string;
  highestPackage: string;
  specializations: string;
  isFormDiscountAvailable?: boolean;
}

const CAT_COLLEGES_DATA: CatCollegeData[] = [
  {
    name: 'IIM Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    tier: '99+ %ile',
    category: 'IIMs',
    cutoffPercentile: '99.5+ %ile',
    sectionalCutoff: 'VARC 80 / DILR 75 / QA 75',
    fees: '₹25.00 Lakhs',
    avgPackage: '₹34.45 LPA',
    highestPackage: '₹1.15 Cr',
    specializations: 'PGP (MBA), PGP-FABM'
  },
  {
    name: 'IIM Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: '99+ %ile',
    category: 'IIMs',
    cutoffPercentile: '99.2+ %ile',
    sectionalCutoff: 'VARC 80 / DILR 75 / QA 75',
    fees: '₹24.50 Lakhs',
    avgPackage: '₹35.31 LPA',
    highestPackage: '₹1.10 Cr',
    specializations: 'MBA, MBA-BA (Business Analytics)'
  },
  {
    name: 'IIM Calcutta',
    city: 'Kolkata',
    state: 'West Bengal',
    tier: '99+ %ile',
    category: 'IIMs',
    cutoffPercentile: '99.0+ %ile',
    sectionalCutoff: 'VARC 75 / DILR 75 / QA 80',
    fees: '₹27.00 Lakhs',
    avgPackage: '₹35.07 LPA',
    highestPackage: '₹1.20 Cr',
    specializations: 'MBA (Finance powerhouse), PGPEX-VLM'
  },
  {
    name: 'FMS Delhi (Faculty of Management Studies)',
    city: 'New Delhi',
    state: 'Delhi NCR',
    tier: '99+ %ile',
    category: 'Top Non-IIMs',
    cutoffPercentile: '98.8+ %ile',
    sectionalCutoff: 'VARC Weighted (40%) / DILR (30%) / QA (30%)',
    fees: '₹2.00 Lakhs',
    avgPackage: '₹34.10 LPA',
    highestPackage: '₹1.23 Cr',
    specializations: 'MBA Core (Highest ROI in Asia)'
  },
  {
    name: 'IIM Lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    tier: '99+ %ile',
    category: 'IIMs',
    cutoffPercentile: '98.5+ %ile',
    sectionalCutoff: 'VARC 85 / DILR 85 / QA 85',
    fees: '₹20.75 Lakhs',
    avgPackage: '₹32.20 LPA',
    highestPackage: '₹1.00 Cr',
    specializations: 'PGP, PGP-ABM, PGP-SM'
  },
  {
    name: 'IIM Kozhikode',
    city: 'Kozhikode',
    state: 'Kerala',
    tier: '95-98 %ile',
    category: 'IIMs',
    cutoffPercentile: '97.5+ %ile',
    sectionalCutoff: 'VARC 75 / DILR 75 / QA 75',
    fees: '₹20.50 Lakhs',
    avgPackage: '₹31.02 LPA',
    highestPackage: '₹67.0 LPA',
    specializations: 'PGP, PGP-Finance, PGP-LSM'
  },
  {
    name: 'IIM Indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    tier: '95-98 %ile',
    category: 'IIMs',
    cutoffPercentile: '97.0+ %ile',
    sectionalCutoff: 'VARC 80 / DILR 80 / QA 80',
    fees: '₹21.00 Lakhs',
    avgPackage: '₹30.21 LPA',
    highestPackage: '₹1.14 Cr',
    specializations: 'PGP, PGP-HRM'
  },
  {
    name: 'SPJIMR Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '95-98 %ile',
    category: 'Top Non-IIMs',
    cutoffPercentile: '85+ Profile / 95+ Score',
    sectionalCutoff: 'VARC 75 / DILR 75 / QA 75',
    fees: '₹22.50 Lakhs',
    avgPackage: '₹33.00 LPA',
    highestPackage: '₹81.0 LPA',
    specializations: 'PGDM Marketing, Finance, Ops, Information Mgmt'
  },
  {
    name: 'MDI Gurgaon',
    city: 'Gurgaon',
    state: 'Delhi NCR',
    tier: '95-98 %ile',
    category: 'Top Non-IIMs',
    cutoffPercentile: '95.0+ %ile',
    sectionalCutoff: 'Overall score driven',
    fees: '₹24.00 Lakhs',
    avgPackage: '₹27.67 LPA',
    highestPackage: '₹60.0 LPA',
    specializations: 'PGDM Core, PGDM-HRM, PGDM-IB'
  },
  {
    name: 'SJMSOM, IIT Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '95-98 %ile',
    category: 'IITs',
    cutoffPercentile: '98.5+ %ile',
    sectionalCutoff: 'VARC 75 / DILR 75 / QA 75',
    fees: '₹14.00 Lakhs',
    avgPackage: '₹28.88 LPA',
    highestPackage: '₹54.0 LPA',
    specializations: 'MBA (Engineering graduates preference)'
  },
  {
    name: 'DMS, IIT Delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    tier: '95-98 %ile',
    category: 'IITs',
    cutoffPercentile: '97.5+ %ile',
    sectionalCutoff: 'VARC 70 / DILR 70 / QA 70',
    fees: '₹12.00 Lakhs',
    avgPackage: '₹25.82 LPA',
    highestPackage: '₹41.1 LPA',
    specializations: 'MBA Full-Time, MBA Telecom'
  },
  {
    name: 'IIM Shillong',
    city: 'Shillong',
    state: 'Meghalaya',
    tier: '95-98 %ile',
    category: 'IIMs',
    cutoffPercentile: '94.0+ %ile',
    sectionalCutoff: 'VARC 75 / DILR 75 / QA 75',
    fees: '₹15.00 Lakhs',
    avgPackage: '₹26.10 LPA',
    highestPackage: '₹71.3 LPA',
    specializations: 'PGP Core'
  },
  {
    name: 'IIM Udaipur (CAP)',
    city: 'Udaipur',
    state: 'Rajasthan',
    tier: '90-94 %ile',
    category: 'IIMs',
    cutoffPercentile: '92.0+ %ile (CAP 94+)',
    sectionalCutoff: 'VARC 70 / DILR 70 / QA 70',
    fees: '₹18.00 Lakhs',
    avgPackage: '₹20.30 LPA',
    highestPackage: '₹36.0 LPA',
    specializations: 'MBA Core, MBA-GSCM, MBA-DEM'
  },
  {
    name: 'IIM Ranchi (CAP)',
    city: 'Ranchi',
    state: 'Jharkhand',
    tier: '90-94 %ile',
    category: 'IIMs',
    cutoffPercentile: '92.0+ %ile',
    sectionalCutoff: 'VARC 70 / DILR 70 / QA 70',
    fees: '₹17.50 Lakhs',
    avgPackage: '₹18.69 LPA',
    highestPackage: '₹37.8 LPA',
    specializations: 'MBA, MBA-HR, MBA-BA'
  },
  {
    name: 'IIM Trichy (CAP)',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    tier: '90-94 %ile',
    category: 'IIMs',
    cutoffPercentile: '92.0+ %ile',
    sectionalCutoff: 'VARC 70 / DILR 70 / QA 70',
    fees: '₹19.50 Lakhs',
    avgPackage: '₹19.43 LPA',
    highestPackage: '₹41.6 LPA',
    specializations: 'PGPM, PGPM-HR'
  },
  {
    name: 'IIM Bodh Gaya (Baby IIM)',
    slug: 'iim-bodh-gaya',
    city: 'Bodh Gaya',
    state: 'Bihar',
    tier: '80-89 %ile',
    category: 'IIMs',
    cutoffPercentile: '88.0+ %ile',
    sectionalCutoff: 'VARC 70 / DILR 70 / QA 70',
    fees: '₹16.00 Lakhs',
    avgPackage: '₹14.96 LPA',
    highestPackage: '₹48.5 LPA',
    specializations: 'MBA Core, MBA-DBM, MBA-HHM'
  },
  {
    name: 'IIM Jammu (Baby IIM)',
    city: 'Jammu',
    state: 'J&K',
    tier: '80-89 %ile',
    category: 'IIMs',
    cutoffPercentile: '88.0+ %ile',
    sectionalCutoff: 'VARC 70 / DILR 70 / QA 70',
    fees: '₹17.00 Lakhs',
    avgPackage: '₹15.20 LPA',
    highestPackage: '₹32.0 LPA',
    specializations: 'MBA Core, MBA-HA&HM'
  },
  {
    name: 'FORE School of Management',
    slug: 'fore-school-delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    tier: '80-89 %ile',
    category: 'Premier PGDM',
    cutoffPercentile: '85.0+ %ile',
    sectionalCutoff: 'Overall score based',
    fees: '₹17.90 Lakhs',
    avgPackage: '₹15.10 LPA',
    highestPackage: '₹30.0 LPA',
    specializations: 'PGDM Core, International Business, Financial Mgmt, Big Data',
    isFormDiscountAvailable: true
  },
  {
    name: 'LBSIM (Lal Bahadur Shastri Institute of Management)',
    slug: 'lbsim-delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    tier: '80-89 %ile',
    category: 'Premier PGDM',
    cutoffPercentile: '83.0+ %ile',
    sectionalCutoff: 'Overall score based',
    fees: '₹15.50 Lakhs',
    avgPackage: '₹12.24 LPA',
    highestPackage: '₹24.7 LPA',
    specializations: 'PGDM General, Financial Management, Research & Business Analytics',
    isFormDiscountAvailable: true
  },
  {
    name: 'GIM Goa (Goa Institute of Management)',
    slug: 'gim-goa',
    city: 'Goa',
    state: 'Goa',
    tier: '80-89 %ile',
    category: 'Premier PGDM',
    cutoffPercentile: '88.0+ %ile',
    sectionalCutoff: 'Overall score based',
    fees: '₹19.50 Lakhs',
    avgPackage: '₹14.87 LPA',
    highestPackage: '₹55.0 LPA',
    specializations: 'PGDM Core, Healthcare (HCM), Big Data Analytics (BDA), BFSI',
    isFormDiscountAvailable: true
  },
  {
    name: 'TAPMI Manipal',
    city: 'Manipal',
    state: 'Karnataka',
    tier: '80-89 %ile',
    category: 'Premier PGDM',
    cutoffPercentile: '85.0+ %ile',
    sectionalCutoff: 'Overall score based',
    fees: '₹18.00 Lakhs',
    avgPackage: '₹13.80 LPA',
    highestPackage: '₹24.8 LPA',
    specializations: 'MBA Core, MBA-BKFS, MBA-HR, MBA-Marketing'
  },
  {
    name: 'BIMTECH Greater Noida',
    slug: 'bimtech-greater-noida',
    city: 'Greater Noida',
    state: 'Delhi NCR',
    tier: '70-79 %ile',
    category: 'Premier PGDM',
    cutoffPercentile: '75 - 80 %ile',
    sectionalCutoff: 'Overall score based',
    fees: '₹14.00 Lakhs',
    avgPackage: '₹11.25 LPA',
    highestPackage: '₹24.0 LPA',
    specializations: 'PGDM Core, International Business, Insurance Business, Retail',
    isFormDiscountAvailable: true
  }
];

export function CatCollegeCutoffMatcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredColleges = useMemo(() => {
    return CAT_COLLEGES_DATA.filter((clg) => {
      const matchesSearch =
        clg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clg.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clg.specializations.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = selectedTier === 'all' || clg.tier === selectedTier;
      const matchesCategory = selectedCategory === 'all' || clg.category === selectedCategory;

      return matchesSearch && matchesTier && matchesCategory;
    });
  }, [searchQuery, selectedTier, selectedCategory]);

  return (
    <div className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8 my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-4 border-foreground">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent text-foreground px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border-2 border-foreground">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span>IIMs & Top Non-IIMs Admissions Matrix</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground flex items-center gap-3">
            Top B-Schools Accepting CAT 2026/27 Scores
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-medium mt-1">
            Check expected general category CAT percentiles, sectional cutoffs, fees, and audited average CTC across 20 IIMs and premier non-IIM institutions.
          </p>
        </div>

        <Link
          href="/mba-application-form-discount"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Save ₹5,000 on Forms</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search IIM, FMS, SPJIMR, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary"
          />
        </div>

        {/* Tier Filter */}
        <div>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full py-2.5 px-4 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary"
          >
            <option value="all">All Percentile Tiers (99.9%ile to 70%ile)</option>
            <option value="99+ %ile">99+ %ile (IIM A/B/C, FMS Delhi, IIM L)</option>
            <option value="95-98 %ile">95-98 %ile (IIM K/I/S, SPJIMR, MDI, IITs)</option>
            <option value="90-94 %ile">90-94 %ile (New IIMs: Udaipur, Trichy, Ranchi)</option>
            <option value="80-89 %ile">80-89 %ile (Baby IIMs, FORE, LBSIM, GIM, TAPMI)</option>
            <option value="70-79 %ile">70-79 %ile (BIMTECH, KJ Somaiya, Welingkar)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2.5 px-4 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary"
          >
            <option value="all">All Institution Types</option>
            <option value="IIMs">IIMs (BLACKI, New & Baby IIMs)</option>
            <option value="Top Non-IIMs">Top Non-IIMs (FMS, SPJIMR, MDI)</option>
            <option value="IITs">IITs (IIT Bombay, IIT Delhi)</option>
            <option value="Premier PGDM">Premier Private PGDM Institutes</option>
          </select>
        </div>
      </div>

      {/* College Table */}
      <div className="overflow-x-auto border-4 border-foreground rounded-2xl bg-white">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead className="bg-foreground text-white uppercase text-xs font-black tracking-wider">
            <tr>
              <th className="p-4 border-r border-white/20">Institute & Category</th>
              <th className="p-4 border-r border-white/20 text-center">Cutoff & Sectionals</th>
              <th className="p-4 border-r border-white/20 text-center">Total 2-Yr Fee</th>
              <th className="p-4 border-r border-white/20 text-center">Avg Placement CTC</th>
              <th className="p-4 text-center">Admissions 2027 Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-200 text-sm font-semibold">
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-bold">
                  No institutes found matching your filter. Try adjusting your search query or percentile tier.
                </td>
              </tr>
            ) : (
              filteredColleges.map((col, idx) => (
                <tr key={idx} className={`hover:bg-amber-50/40 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50/60' : 'bg-white'}`}>
                  {/* Name & Location */}
                  <td className="p-4 border-r-2 border-slate-200">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {col.slug ? (
                          <Link href={`/colleges/${col.slug}`} className="font-extrabold text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                            <span>{col.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" />
                          </Link>
                        ) : (
                          <p className="font-extrabold text-foreground">{col.name}</p>
                        )}
                        <span className="bg-slate-900 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                          {col.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          {col.city}, {col.state}
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 italic line-clamp-1">{col.specializations}</span>
                      </div>
                      {col.isFormDiscountAvailable && (
                        <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-emerald-300">
                          ⚡ Form Discount Available
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Cutoff */}
                  <td className="p-4 border-r-2 border-slate-200 text-center">
                    <span className="inline-block bg-primary/10 text-primary font-black px-3 py-1 rounded-lg text-xs border border-primary/30">
                      {col.cutoffPercentile}
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">{col.sectionalCutoff}</p>
                  </td>

                  {/* Fee */}
                  <td className="p-4 border-r-2 border-slate-200 text-center font-bold text-slate-900">
                    {col.fees}
                  </td>

                  {/* Placement CTC */}
                  <td className="p-4 border-r-2 border-slate-200 text-center">
                    <p className="font-black text-emerald-600 text-base">{col.avgPackage}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Highest: {col.highestPackage}</p>
                  </td>

                  {/* CTA Action */}
                  <td className="p-4 text-center">
                    <a
                      href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20targeting%20${encodeURIComponent(col.name)}%20via%20CAT%202026%2F2027.%20Please%20guide%20me%20on%20my%20profile%20evaluation%20and%20GD-PI%20preparation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Profile Evaluation</span>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Insight Box */}
      <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-extrabold text-sm uppercase text-amber-950 flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Need Profile Evaluation for IIM Shortlisting (CS Score)?</span>
          </p>
          <p className="text-xs text-amber-900 font-medium">
            Mohit Jain (IIM-B & FMS Certified) evaluates your Composite Score (10th, 12th, graduation %, work experience, gender/academic diversity, and CAT score).
          </p>
        </div>

        <a
          href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20a%20free%201-on-1%20profile%20evaluation%20for%20IIMs%20and%20top%20MBA%202027%20admissions."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-foreground hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0"
        >
          Book 1-on-1 Profile Call (Free)
        </a>
      </div>
    </div>
  );
}
