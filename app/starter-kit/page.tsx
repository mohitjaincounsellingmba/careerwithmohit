import React from 'react';
import { Metadata } from 'next';
import StarterKitForm from './StarterKitForm';
import { BookOpen, Target, GraduationCap, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
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
    </main>
  );
}
