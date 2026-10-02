'use client';

import React, { useState, useMemo } from 'react';
import { Target, Search, Building2, MapPin, IndianRupee, TrendingUp, CheckCircle, MessageCircle, Filter, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CollegeData {
  name: string;
  slug?: string;
  city: string;
  state: string;
  tier: '95+ %ile' | '90-94 %ile' | '80-89 %ile' | '70-79 %ile' | '60-69 %ile';
  cutoffComposite: string;
  cutoffPercentile: string;
  fees: string;
  avgPackage: string;
  highestPackage: string;
  specializations: string;
  isFormDiscountAvailable?: boolean;
}

const MAT_COLLEGES_DATA: CollegeData[] = [
  {
    name: 'PUMBA (Dept of Management Sciences, Pune University)',
    slug: 'pumba-pune',
    city: 'Pune',
    state: 'Maharashtra',
    tier: '95+ %ile',
    cutoffComposite: '650+ / 800',
    cutoffPercentile: '95+ %ile (99+ in MAH CET)',
    fees: '₹1.35 Lakhs',
    avgPackage: '₹8.90 LPA',
    highestPackage: '₹18.0 LPA',
    specializations: 'Marketing, Finance, Systems, HR, Operations'
  },
  {
    name: 'Welingkar Institute of Management (WeSchool)',
    slug: 'welingkar-mumbai',
    city: 'Mumbai / Bengaluru',
    state: 'Maharashtra / Karnataka',
    tier: '95+ %ile',
    cutoffComposite: '650+ / 800',
    cutoffPercentile: '90 - 95+ %ile',
    fees: '₹14.00 Lakhs',
    avgPackage: '₹12.50 LPA',
    highestPackage: '₹25.4 LPA',
    specializations: 'PGDM Core, E-Biz, Business Design, Retail, Healthcare'
  },
  {
    name: 'BIMTECH (Birla Institute of Management Technology)',
    slug: 'bimtech-greater-noida',
    city: 'Greater Noida',
    state: 'Delhi NCR',
    tier: '90-94 %ile',
    cutoffComposite: '600+ / 800',
    cutoffPercentile: '90+ %ile',
    fees: '₹14.00 Lakhs',
    avgPackage: '₹11.25 LPA',
    highestPackage: '₹24.0 LPA',
    specializations: 'PGDM Core, International Business, Insurance Business, Retail',
    isFormDiscountAvailable: true
  },
  {
    name: 'XIME (Xavier Institute of Management & Entrepreneurship)',
    slug: 'xime-bangalore',
    city: 'Bangalore / Chennai / Kochi',
    state: 'Karnataka / TN / Kerala',
    tier: '90-94 %ile',
    cutoffComposite: '600+ / 800',
    cutoffPercentile: '85 - 90 %ile',
    fees: '₹12.00 Lakhs',
    avgPackage: '₹10.30 LPA',
    highestPackage: '₹20.0 LPA',
    specializations: 'PGDM Finance, Marketing, HR, Analytics, Operations',
    isFormDiscountAvailable: true
  },
  {
    name: 'Jaipuria Institute of Management',
    slug: 'jaipuria-institute-of-management-indore',
    city: 'Noida / Lucknow / Jaipur / Indore',
    state: 'Pan India',
    tier: '80-89 %ile',
    cutoffComposite: '550+ / 800',
    cutoffPercentile: '80 - 85 %ile',
    fees: '₹11.50 Lakhs',
    avgPackage: '₹8.90 LPA',
    highestPackage: '₹22.0 LPA',
    specializations: 'PGDM Core, Service Management, Marketing, Financial Services',
    isFormDiscountAvailable: true
  },
  {
    name: 'JIMS (Jagan Institute of Management Studies)',
    slug: 'jims-kalkaji-delhi',
    city: 'Rohini / Kalkaji (Delhi)',
    state: 'Delhi NCR',
    tier: '80-89 %ile',
    cutoffComposite: '550+ / 800',
    cutoffPercentile: '80 - 85 %ile',
    fees: '₹8.90 Lakhs',
    avgPackage: '₹8.10 LPA',
    highestPackage: '₹22.0 LPA',
    specializations: 'PGDM Core, International Business, Retail Management',
    isFormDiscountAvailable: true
  },
  {
    name: 'NDIM (New Delhi Institute of Management)',
    slug: 'ndim-delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    tier: '80-89 %ile',
    cutoffComposite: '520+ / 800',
    cutoffPercentile: '78 - 82 %ile',
    fees: '₹10.50 Lakhs',
    avgPackage: '₹8.50 LPA',
    highestPackage: '₹18.0 LPA',
    specializations: 'Dual Specialization in Marketing, Finance, HR, IT, Media',
    isFormDiscountAvailable: true
  },
  {
    name: 'Christ University Institute of Management',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: '80-89 %ile',
    cutoffComposite: '550+ / 800',
    cutoffPercentile: '80 - 85 %ile',
    fees: '₹9.50 Lakhs',
    avgPackage: '₹8.20 LPA',
    highestPackage: '₹15.0 LPA',
    specializations: 'MBA Finance, Marketing, Human Resource, Business Analytics'
  },
  {
    name: 'SIES College of Management Studies (SIESCOMS)',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    tier: '80-89 %ile',
    cutoffComposite: '550+ / 800',
    cutoffPercentile: '80 - 85 %ile',
    fees: '₹9.00 Lakhs',
    avgPackage: '₹8.50 LPA',
    highestPackage: '₹20.0 LPA',
    specializations: 'PGDM Core, Pharmaceutical Management, Biotech'
  },
  {
    name: 'IPE Hyderabad (Institute of Public Enterprise)',
    city: 'Hyderabad',
    state: 'Telangana',
    tier: '80-89 %ile',
    cutoffComposite: '520+ / 800',
    cutoffPercentile: '75 - 80 %ile',
    fees: '₹8.15 Lakhs',
    avgPackage: '₹7.50 LPA',
    highestPackage: '₹24.7 LPA',
    specializations: 'PGDM Banking & Financial Services, Marketing, International Business',
    isFormDiscountAvailable: true
  },
  {
    name: 'SSIM Hyderabad (Siva Sivani Institute of Management)',
    city: 'Hyderabad',
    state: 'Telangana',
    tier: '70-79 %ile',
    cutoffComposite: '480+ / 800',
    cutoffPercentile: '70 - 75 %ile',
    fees: '₹7.20 Lakhs',
    avgPackage: '₹6.80 LPA',
    highestPackage: '₹15.0 LPA',
    specializations: 'PGDM Triple Specialization, Business Analytics, Banking',
    isFormDiscountAvailable: true
  },
  {
    name: 'ITM Business School Navi Mumbai',
    city: 'Navi Mumbai / Chennai',
    state: 'Maharashtra / TN',
    tier: '70-79 %ile',
    cutoffComposite: '480+ / 800',
    cutoffPercentile: '70 - 75 %ile',
    fees: '₹12.00 Lakhs',
    avgPackage: '₹8.65 LPA',
    highestPackage: '₹21.0 LPA',
    specializations: 'Fintech, Marketing, Digital Marketing, Operations'
  },
  {
    name: 'Lexicon MILE (Management Institute of Leadership & Excellence)',
    city: 'Pune',
    state: 'Maharashtra',
    tier: '70-79 %ile',
    cutoffComposite: '450+ / 800',
    cutoffPercentile: '65 - 70 %ile',
    fees: '₹8.50 Lakhs',
    avgPackage: '₹7.80 LPA',
    highestPackage: '₹18.0 LPA',
    specializations: 'PGDM Research & Business Analytics, Marketing, Finance',
    isFormDiscountAvailable: true
  },
  {
    name: 'PIBM (Pune Institute of Business Management)',
    city: 'Pune',
    state: 'Maharashtra',
    tier: '70-79 %ile',
    cutoffComposite: '450+ / 800',
    cutoffPercentile: '65 - 70 %ile',
    fees: '₹8.95 Lakhs',
    avgPackage: '₹7.50 LPA',
    highestPackage: '₹17.0 LPA',
    specializations: 'PGDM Core, Project Management, FinTech, Applied Marketing',
    isFormDiscountAvailable: true
  },
  {
    name: 'FOSTIIMA Business School',
    city: 'New Delhi',
    state: 'Delhi NCR',
    tier: '70-79 %ile',
    cutoffComposite: '450+ / 800',
    cutoffPercentile: '65 - 70 %ile',
    fees: '₹8.95 Lakhs',
    avgPackage: '₹8.00 LPA',
    highestPackage: '₹25.0 LPA',
    specializations: 'PGDM Founded by IIM Ahmedabad Alumni',
    isFormDiscountAvailable: true
  },
  {
    name: 'SOIL Institute of Management',
    city: 'Gurgaon',
    state: 'Delhi NCR',
    tier: '80-89 %ile',
    cutoffComposite: '520+ / 800',
    cutoffPercentile: '75 - 80 %ile',
    fees: '₹15.00 Lakhs',
    avgPackage: '₹11.00 LPA',
    highestPackage: '₹19.5 LPA',
    specializations: '1-Year & 2-Year PGDM in Business Leadership, HR, Marketing'
  },
  {
    name: 'ISBR Business School',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: '70-79 %ile',
    cutoffComposite: '450+ / 800',
    cutoffPercentile: '65 - 70 %ile',
    fees: '₹8.50 Lakhs',
    avgPackage: '₹7.50 LPA',
    highestPackage: '₹14.0 LPA',
    specializations: 'PGDM International Business, Marketing, Data Science'
  }
];

export function MatCollegeCutoffMatcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredColleges = useMemo(() => {
    return MAT_COLLEGES_DATA.filter((clg) => {
      const matchesSearch =
        clg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clg.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clg.specializations.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = selectedTier === 'all' || clg.tier === selectedTier;

      let matchesRegion = true;
      if (selectedRegion === 'north') {
        matchesRegion = clg.state.includes('Delhi') || clg.state.includes('NCR') || clg.city.includes('Noida') || clg.city.includes('Gurgaon');
      } else if (selectedRegion === 'west') {
        matchesRegion = clg.state.includes('Maharashtra') || clg.city.includes('Pune') || clg.city.includes('Mumbai');
      } else if (selectedRegion === 'south') {
        matchesRegion = clg.state.includes('Karnataka') || clg.state.includes('Telangana') || clg.city.includes('Bangalore') || clg.city.includes('Hyderabad');
      }

      return matchesSearch && matchesTier && matchesRegion;
    });
  }, [searchQuery, selectedTier, selectedRegion]);

  return (
    <div className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8 my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-4 border-foreground">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent text-foreground px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border-2 border-foreground">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span>MBA & PGDM 2027 Admissions Cutoffs</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground flex items-center gap-3">
            Top B-Schools Accepting December MAT Scores
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-medium mt-1">
            Explore verified 2027 admission cutoffs, fees, realistic average packages, and discount application options for 600+ MAT accepting institutes.
          </p>
        </div>

        <Link
          href="/mba-application-form-discount/"
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
            placeholder="Search college, city, specialization..."
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
            <option value="all">All Percentile Tiers (100%ile to 60%ile)</option>
            <option value="95+ %ile">95+ %ile (650+ Composite: PUMBA, Welingkar)</option>
            <option value="90-94 %ile">90-94 %ile (600+ Composite: BIMTECH, XIME)</option>
            <option value="80-89 %ile">80-89 %ile (520-590: Jaipuria, JIMS, NDIM)</option>
            <option value="70-79 %ile">70-79 %ile (450-510: ITM, Lexicon, PIBM)</option>
          </select>
        </div>

        {/* Region Filter */}
        <div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full py-2.5 px-4 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary"
          >
            <option value="all">Pan-India Locations (All Regions)</option>
            <option value="north">Delhi NCR / North India (Noida, Gurgaon)</option>
            <option value="west">Maharashtra / West India (Mumbai, Pune)</option>
            <option value="south">South India (Bangalore, Hyderabad, Chennai)</option>
          </select>
        </div>
      </div>

      {/* College Table */}
      <div className="overflow-x-auto border-4 border-foreground rounded-2xl bg-white">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-foreground text-white uppercase text-xs font-black tracking-wider">
            <tr>
              <th className="p-4 border-r border-white/20">College & Location</th>
              <th className="p-4 border-r border-white/20 text-center">Expected Cutoff</th>
              <th className="p-4 border-r border-white/20 text-center">Total 2-Yr Fee</th>
              <th className="p-4 border-r border-white/20 text-center">Avg Package (CTC)</th>
              <th className="p-4 text-center">Admissions 2027 Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-200 text-sm font-semibold">
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-bold">
                  No colleges found matching your search filter. Try adjusting your search keywords or percentile tier.
                </td>
              </tr>
            ) : (
              filteredColleges.map((col, idx) => (
                <tr key={idx} className={`hover:bg-amber-50/40 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50/60' : 'bg-white'}`}>
                  {/* Name & Location */}
                  <td className="p-4 border-r-2 border-slate-200">
                    <div className="space-y-1">
                      {col.slug ? (
                        <Link href={`/colleges/${col.slug}`} className="font-extrabold text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                          <span>{col.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" />
                        </Link>
                      ) : (
                        <p className="font-extrabold text-foreground">{col.name}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          {col.city}
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
                      {col.cutoffComposite}
                    </span>
                    <p className="text-[11px] text-slate-500 font-bold mt-1">{col.cutoffPercentile}</p>
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
                      href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20interested%20in%20${encodeURIComponent(col.name)}%20via%20December%20MAT%202026%2F2027.%20Please%20guide%20me%20on%20cutoffs%2C%20GD-PI%2C%20and%20admission%20process.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Inquire / Apply</span>
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
            <span>Need Profile Evaluation for 2027 MBA Admissions?</span>
          </p>
          <p className="text-xs text-amber-900 font-medium">
            Mohit Jain offers free profile shortlisting based on your 10th, 12th, graduation %, work experience, and MAT mock score.
          </p>
        </div>

        <a
          href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20a%20free%201-on-1%20profile%20evaluation%20for%20MBA%2FPGDM%202027%20admissions."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-foreground hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0"
        >
          Book 1-on-1 Evaluation (Free)
        </a>
      </div>
    </div>
  );
}
