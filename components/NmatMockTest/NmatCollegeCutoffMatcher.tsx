'use client';

import React, { useState, useMemo } from 'react';
import { Target, Search, Building2, MapPin, IndianRupee, TrendingUp, CheckCircle, MessageCircle, Filter, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface NmatCollegeData {
  name: string;
  slug?: string;
  city: string;
  state: string;
  tier: '230+ Scaled' | '215-229 Scaled' | '200-214 Scaled' | '180-199 Scaled' | '160-179 Scaled';
  category: 'NMIMS Campuses' | 'Top Non-NMIMS' | 'Premier PGDM' | 'Emerging MBA';
  cutoffScore: string;
  sectionalCutoff: string;
  fees: string;
  avgPackage: string;
  highestPackage: string;
  specializations: string;
  isFormDiscountAvailable?: boolean;
}

const NMAT_COLLEGES_DATA: NmatCollegeData[] = [
  {
    name: 'NMIMS Mumbai (School of Business Management)',
    slug: 'nmims-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '230+ Scaled',
    category: 'NMIMS Campuses',
    cutoffScore: '232+ Scaled',
    sectionalCutoff: 'Lang 76 / Quant 74 / Logic 76',
    fees: '₹24.00 Lakhs',
    avgPackage: '₹26.63 LPA',
    highestPackage: '₹67.8 LPA',
    specializations: 'MBA Core, MBA HR, MBA Business Analytics'
  },
  {
    name: 'NMIMS Bengaluru',
    slug: 'nmims-bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: '215-229 Scaled',
    category: 'NMIMS Campuses',
    cutoffScore: '222+ Scaled',
    sectionalCutoff: 'Lang 70 / Quant 68 / Logic 70',
    fees: '₹20.00 Lakhs',
    avgPackage: '₹14.00 LPA',
    highestPackage: '₹19.7 LPA',
    specializations: 'MBA Core, Executive MBA'
  },
  {
    name: 'NMIMS Hyderabad',
    slug: 'nmims-hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    tier: '215-229 Scaled',
    category: 'NMIMS Campuses',
    cutoffScore: '218+ Scaled',
    sectionalCutoff: 'Lang 68 / Quant 66 / Logic 68',
    fees: '₹19.50 Lakhs',
    avgPackage: '₹13.01 LPA',
    highestPackage: '₹28.0 LPA',
    specializations: 'MBA Full-Time, MBA-Analytics'
  },
  {
    name: 'NMIMS Navi Mumbai',
    slug: 'nmims-navi-mumbai',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    tier: '215-229 Scaled',
    category: 'NMIMS Campuses',
    cutoffScore: '215+ Scaled',
    sectionalCutoff: 'Lang 65 / Quant 65 / Logic 65',
    fees: '₹19.50 Lakhs',
    avgPackage: '₹13.60 LPA',
    highestPackage: '₹25.0 LPA',
    specializations: 'MBA Core (Finance, Mktg, Ops)'
  },
  {
    name: 'NMIMS Indore',
    slug: 'nmims-indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    tier: '200-214 Scaled',
    category: 'NMIMS Campuses',
    cutoffScore: '205+ Scaled',
    sectionalCutoff: 'Lang 62 / Quant 62 / Logic 62',
    fees: '₹16.50 Lakhs',
    avgPackage: '₹12.50 LPA',
    highestPackage: '₹21.1 LPA',
    specializations: 'MBA Core Program'
  },
  {
    name: 'XIM University (XIMB), Bhubaneswar',
    slug: 'xim-university-bhubaneswar',
    city: 'Bhubaneswar',
    state: 'Odisha',
    tier: '215-229 Scaled',
    category: 'Top Non-NMIMS',
    cutoffScore: '215+ Scaled',
    sectionalCutoff: 'Overall score driven',
    fees: '₹20.50 Lakhs',
    avgPackage: '₹16.64 LPA',
    highestPackage: '₹71.5 LPA',
    specializations: 'MBA-HRM (Human Resource Management), MBA-RM'
  },
  {
    name: 'K J Somaiya Institute of Management',
    slug: 'kj-somaiya-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '215-229 Scaled',
    category: 'Top Non-NMIMS',
    cutoffScore: '222+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹20.90 Lakhs',
    avgPackage: '₹12.32 LPA',
    highestPackage: '₹25.9 LPA',
    specializations: 'MBA Core, MBA Healthcare, MBA Sports Management',
    isFormDiscountAvailable: true
  },
  {
    name: 'TAPMI Manipal',
    slug: 'tapmi-manipal',
    city: 'Manipal',
    state: 'Karnataka',
    tier: '200-214 Scaled',
    category: 'Top Non-NMIMS',
    cutoffScore: '210+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹18.00 Lakhs',
    avgPackage: '₹13.80 LPA',
    highestPackage: '₹24.8 LPA',
    specializations: 'MBA Core, MBA-BKFS, MBA-HR, MBA-Marketing'
  },
  {
    name: 'SDA Bocconi Asia Center',
    slug: 'sda-bocconi-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '200-214 Scaled',
    category: 'Top Non-NMIMS',
    cutoffScore: '200+ Scaled',
    sectionalCutoff: 'Profile + NMAT Score',
    fees: '₹20.40 Lakhs',
    avgPackage: '₹15.01 LPA',
    highestPackage: '₹39.2 LPA',
    specializations: 'International Master in Business (IMB - Milan exchange)',
    isFormDiscountAvailable: true
  },
  {
    name: 'SPJIMR Mumbai (GMP)',
    slug: 'spjimr-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '215-229 Scaled',
    category: 'Top Non-NMIMS',
    cutoffScore: '220+ Scaled',
    sectionalCutoff: 'Profile-based shortlisting',
    fees: '₹22.00 Lakhs',
    avgPackage: '₹24.00 LPA',
    highestPackage: '₹55.0 LPA',
    specializations: 'Global Management Program (GMP with US/EU partner schools)'
  },
  {
    name: 'Great Lakes Institute of Management',
    slug: 'great-lakes-chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    tier: '200-214 Scaled',
    category: 'Top Non-NMIMS',
    cutoffScore: '210+ Scaled',
    sectionalCutoff: 'Work ex preferred',
    fees: '₹19.90 Lakhs',
    avgPackage: '₹18.10 LPA',
    highestPackage: '₹39.3 LPA',
    specializations: 'PGPM (1-Year flaghsip for candidates with 2+ yrs experience)'
  },
  {
    name: 'Welingkar Institute of Management (WeSchool)',
    slug: 'welingkar-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: '200-214 Scaled',
    category: 'Premier PGDM',
    cutoffScore: '200+ Scaled',
    sectionalCutoff: 'Overall score driven',
    fees: '₹15.00 Lakhs',
    avgPackage: '₹12.56 LPA',
    highestPackage: '₹25.4 LPA',
    specializations: 'PGDM Core, E-Biz, Business Design, Healthcare, Retail',
    isFormDiscountAvailable: true
  },
  {
    name: 'SOIL Institute of Management',
    slug: 'soil-gurgaon',
    city: 'Gurgaon',
    state: 'Delhi NCR',
    tier: '180-199 Scaled',
    category: 'Premier PGDM',
    cutoffScore: '185+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹15.30 Lakhs',
    avgPackage: '₹11.50 LPA',
    highestPackage: '₹19.3 LPA',
    specializations: 'PGPM Business Leadership, PGDM Business Design',
    isFormDiscountAvailable: true
  },
  {
    name: 'ISBR Business School',
    slug: 'isbr-bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: '160-179 Scaled',
    category: 'Premier PGDM',
    cutoffScore: '170+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹10.50 Lakhs',
    avgPackage: '₹8.50 LPA',
    highestPackage: '₹16.0 LPA',
    specializations: 'PGDM (Marketing, Finance, HR, Business Analytics)',
    isFormDiscountAvailable: true
  },
  {
    name: 'Alliance University (School of Business)',
    slug: 'alliance-university-bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: '180-199 Scaled',
    category: 'Premier PGDM',
    cutoffScore: '180+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹15.00 Lakhs',
    avgPackage: '₹8.80 LPA',
    highestPackage: '₹26.1 LPA',
    specializations: 'MBA (Marketing, Finance, Operations, International Business)',
    isFormDiscountAvailable: true
  },
  {
    name: 'BML Munjal University (Hero Group)',
    slug: 'bml-munjal-gurgaon',
    city: 'Gurgaon',
    state: 'Delhi NCR',
    tier: '160-179 Scaled',
    category: 'Emerging MBA',
    cutoffScore: '175+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹13.50 Lakhs',
    avgPackage: '₹9.22 LPA',
    highestPackage: '₹31.5 LPA',
    specializations: 'MBA (Mentored by Imperial College London)',
    isFormDiscountAvailable: true
  },
  {
    name: 'Bennett University (Times Group)',
    slug: 'bennett-university-greater-noida',
    city: 'Greater Noida',
    state: 'Delhi NCR',
    tier: '160-179 Scaled',
    category: 'Emerging MBA',
    cutoffScore: '170+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹11.95 Lakhs',
    avgPackage: '₹8.25 LPA',
    highestPackage: '₹20.7 LPA',
    specializations: 'MBA (FinTech, Media Management, Business Analytics)',
    isFormDiscountAvailable: true
  },
  {
    name: 'Shiv Nadar University',
    slug: 'shiv-nadar-university',
    city: 'Greater Noida',
    state: 'Delhi NCR',
    tier: '180-199 Scaled',
    category: 'Premier PGDM',
    cutoffScore: '180+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹12.50 Lakhs',
    avgPackage: '₹10.40 LPA',
    highestPackage: '₹22.0 LPA',
    specializations: 'MBA (Global Business, Data Analytics & Digital)'
  },
  {
    name: 'UPES Dehradun (School of Business)',
    slug: 'upes-dehradun',
    city: 'Dehradun',
    state: 'Uttarakhand',
    tier: '160-179 Scaled',
    category: 'Emerging MBA',
    cutoffScore: '165+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹16.50 Lakhs',
    avgPackage: '₹8.66 LPA',
    highestPackage: '₹30.0 LPA',
    specializations: 'MBA Oil & Gas, Aviation, Logistics, Digital Business',
    isFormDiscountAvailable: true
  },
  {
    name: 'ITM Business School',
    slug: 'itm-navi-mumbai',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    tier: '160-179 Scaled',
    category: 'Emerging MBA',
    cutoffScore: '160+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹12.45 Lakhs',
    avgPackage: '₹8.65 LPA',
    highestPackage: '₹21.0 LPA',
    specializations: 'PGDM iConnect (Marketing, FinTech, Digital Marketing)',
    isFormDiscountAvailable: true
  },
  {
    name: 'Jindal Global Business School (OP Jindal)',
    slug: 'jindal-global-business-school',
    city: 'Sonipat',
    state: 'Delhi NCR',
    tier: '160-179 Scaled',
    category: 'Emerging MBA',
    cutoffScore: '170+ Scaled',
    sectionalCutoff: 'Overall score based',
    fees: '₹16.00 Lakhs',
    avgPackage: '₹8.90 LPA',
    highestPackage: '₹23.0 LPA',
    specializations: 'MBA (International collaborations, Analytics & Strategy)',
    isFormDiscountAvailable: true
  }
];

export function NmatCollegeCutoffMatcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredColleges = useMemo(() => {
    return NMAT_COLLEGES_DATA.filter((clg) => {
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
            <span>NMIMS & NMAT B-Schools Admissions Matrix</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground flex items-center gap-3">
            Top B-Schools Accepting NMAT 2026/27 Scores
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-medium mt-1">
            Compare expected NMAT scaled score cutoffs, sectional minimums, 2-year total fees, and audited placement packages across NMIMS campuses and top partner institutes.
          </p>
        </div>

        <Link
          href="/mba-application-form-discount/"
          className="inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
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
            placeholder="Search NMIMS, XIMB, K J Somaiya, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-600"
          />
        </div>

        {/* Tier Filter */}
        <div>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full py-2.5 px-4 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-600"
          >
            <option value="all">All Scaled Score Tiers (240+ to 160)</option>
            <option value="230+ Scaled">230+ Scaled (NMIMS Mumbai Core MBA)</option>
            <option value="215-229 Scaled">215-229 Scaled (NMIMS Bng/Hyd, XIMB, Somaiya, SPJIMR)</option>
            <option value="200-214 Scaled">200-214 Scaled (TAPMI, Bocconi, Welingkar, GLIM)</option>
            <option value="180-199 Scaled">180-199 Scaled (SOIL, Alliance, Shiv Nadar)</option>
            <option value="160-179 Scaled">160-179 Scaled (ISBR, BML Munjal, Bennett, ITM, UPES)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2.5 px-4 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-600"
          >
            <option value="all">All Institution Categories</option>
            <option value="NMIMS Campuses">NMIMS Campuses (Mumbai, Bng, Hyd, Navi, Indore)</option>
            <option value="Top Non-NMIMS">Top Non-NMIMS (XIMB, Somaiya, TAPMI, Bocconi)</option>
            <option value="Premier PGDM">Premier PGDM (Welingkar, SOIL, Alliance)</option>
            <option value="Emerging MBA">Emerging Universities (Bennett, BML, ITM, UPES)</option>
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
                  No institutes found matching your filter. Try adjusting your search query or score tier.
                </td>
              </tr>
            ) : (
              filteredColleges.map((col, idx) => (
                <tr key={idx} className={`hover:bg-rose-50/40 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50/60' : 'bg-white'}`}>
                  {/* Name & Location */}
                  <td className="p-4 border-r-2 border-slate-200">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {col.slug ? (
                          <Link href={`/colleges/${col.slug}`} className="font-extrabold text-foreground hover:text-rose-600 transition-colors flex items-center gap-1.5">
                            <span>{col.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-rose-600 shrink-0" />
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
                    <span className="inline-block bg-rose-50 text-rose-700 font-black px-3 py-1 rounded-lg text-xs border border-rose-300">
                      {col.cutoffScore}
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
                      href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20targeting%20${encodeURIComponent(col.name)}%20via%20NMAT%202026%2F2027.%20Please%20guide%20me%20on%20my%20profile%20evaluation%20and%20NMIMS%20CD-PI%20preparation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Profile Call</span>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Insight Box */}
      <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-extrabold text-sm uppercase text-rose-950 flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>Need NMIMS Case Discussion & Personal Interview (CD-PI) Guidance?</span>
          </p>
          <p className="text-xs text-rose-900 font-medium">
            Mohit Jain provides structured profile evaluation, mock interviews, and case analysis drills to convert calls for NMIMS Mumbai, Bengaluru, and XIMB.
          </p>
        </div>

        <a
          href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20a%20free%201-on-1%20profile%20evaluation%20for%20NMIMS%20and%20top%20NMAT%20MBA%202027%20admissions."
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
