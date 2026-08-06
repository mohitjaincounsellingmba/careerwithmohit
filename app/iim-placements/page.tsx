import React from 'react';
import Head from 'next/head';
import { TOP_TIER_MBA_COLLEGES } from '../../data/topTierMbaColleges';
import { MapPin, TrendingUp, Wallet, GraduationCap, Building2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function IIMPlacementsPage() {
  const iimColleges = TOP_TIER_MBA_COLLEGES.filter(college => college.isIim);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Head>
        <title>All IIM Placements Data 2026-27 | CareerWithMohit</title>
        <meta name="description" content="Complete placement data, average packages, highest packages, fees, and cutoffs for all Indian Institutes of Management (IIMs)." />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Updated for 2026-27 Admissions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            IIM Placements <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Master Data</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive placement statistics, fees, and cutoffs for all {iimColleges.length} Indian Institutes of Management. Compare average packages and make data-driven decisions for your MBA journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        
        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-500" /> Institute</div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Location</div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-purple-500" /> Fees</div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-orange-500" /> Cutoff</div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> Avg Placement</div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    Highest Placement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {iimColleges.map((iim, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200/50 flex-shrink-0">
                          <span className="text-blue-700 font-bold text-sm">IIM</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">{iim.name}</span>
                          <a 
                            href={iim.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 mt-0.5"
                          >
                            Official Website <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {iim.location}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200">
                        {iim.fees}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 font-semibold">
                      {iim.cutoff}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
                        {iim.avg_placement}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 font-semibold">
                      {iim.highest_placement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Want to Crack These Top IIMs?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Download our free MBA Starter Kit with the latest syllabus, previous year papers, and GDPI preparation strategies.
            </p>
            <Link 
              href="/starter-kit" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-700 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Get Free MBA Starter Kit
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
