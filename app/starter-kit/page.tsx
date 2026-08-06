import React from 'react';
import { Metadata } from 'next';
import StarterKitForm from './StarterKitForm';
import { BookOpen, Target, GraduationCap, ArrowRight, Download, CheckCircle2, Building2, MapPin, Wallet, TrendingUp, ExternalLink } from 'lucide-react';
import { TOP_TIER_MBA_COLLEGES } from '@/data/topTierMbaColleges';

export const metadata: Metadata = {
  title: 'Free CAT & MBA Entrance Exam Starter Kit 2026-27 | Download Now',
  description: 'Download the ultimate starter kit for CAT, NMAT, XAT, SNAP, and MAT preparation. Includes syllabus, preparation strategy, and essential resources.',
};

export default function StarterKitPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-indigo-100 text-indigo-700 font-semibold text-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
              100% Free Resources
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Master Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">MBA Entrance</span> Exams
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Download our comprehensive starter kit tailored for CAT, NMAT, XAT, SNAP, and MAT. Everything you need to kickstart your preparation in one place.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Complete Syllabus & Pattern</h3>
                  <p className="text-gray-600 mt-1">Detailed breakdown of topics and weightage for all major exams.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Preparation Strategy</h3>
                  <p className="text-gray-600 mt-1">Month-by-month study plan crafted by top percentilers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Previous Year Analysis</h3>
                  <p className="text-gray-600 mt-1">Understand the trends and difficulty levels to optimize your attempts.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="User avatar" className="w-full h-full" />
                  </div>
                ))}
              </div>
              <p>Trusted by 5,000+ aspirants</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-500 to-purple-600"></div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Starter Kit</h2>
                <p className="text-gray-600 text-sm">Fill in your details below to unlock the free download instantly.</p>
              </div>

              <StarterKitForm />
            </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-20 mb-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Tier MBA Colleges Placement Data</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Compare average packages, highest packages, fees, and cutoffs to set your targets right.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden backdrop-blur-xl mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="py-5 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-500" /> Institute</div>
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
                {TOP_TIER_MBA_COLLEGES.slice(0, 15).map((college, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${college.isIim ? 'bg-gradient-to-br from-indigo-100 to-indigo-50 border-indigo-200/50' : 'bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200/50'}`}>
                          <span className={`font-bold text-xs ${college.isIim ? 'text-indigo-700' : 'text-purple-700'}`}>
                            {college.isIim ? 'IIM' : college.name.substring(0, 3).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors">{college.name}</span>
                          <a 
                            href={college.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1 mt-0.5"
                          >
                            Official Website <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {college.location}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200">
                        {college.fees}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 font-semibold">
                      {college.cutoff}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
                        {college.avg_placement}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 font-semibold">
                      {college.highest_placement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
             <a href="/top-tier-mba-colleges" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
               View Complete List of Top MBA Colleges &rarr;
             </a>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
