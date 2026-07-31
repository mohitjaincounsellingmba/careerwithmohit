'use client';

import { useState } from 'react';
import { ShieldCheck, GraduationCap, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { submitLead } from '@/lib/leads';

interface OnlineDegreeLeadBoxProps {
  courseName?: string;
  cityName?: string;
}

export function OnlineDegreeLeadBox({ courseName = "Online MBA / Online Degree", cityName }: OnlineDegreeLeadBoxProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    course: 'Online MBA',
    budget: '₹1.5L - ₹2.5L',
    location: cityName || '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location || 'Online Candidate',
      source: `Online Degree Blog Lead (${formData.course})`,
      budget: formData.budget,
      preferredLocation: 'Online / Distance',
      course: formData.course,
      message: `Lead generated from Online Degree Blog. City: ${formData.location || 'N/A'}. Budget: ${formData.budget}`,
      timestamp: new Date().toISOString()
    };

    const result = await submitLead(leadPayload);

    if (result.success) {
      setStatus('success');
      setFormData({
        name: '',
        number: '',
        email: '',
        course: 'Online MBA',
        budget: '₹1.5L - ₹2.5L',
        location: '',
        message: ''
      });
    } else {
      console.error('Lead Capture Form Error:', result.error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="my-12 bg-emerald-900 border-4 border-emerald-400 p-8 rounded-3xl text-center text-white shadow-2xl">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Inquiry Submitted!</h3>
        <p className="text-emerald-100 text-lg font-medium max-w-lg mx-auto mb-6">
          Thank you! Our expert counselor will reach out to you within 24 hours with official fee structures and UGC-DEB university comparison reports.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-white text-emerald-900 px-8 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs hover:bg-emerald-100 transition-all"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="my-14 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-4 border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.7)] relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 blur-3xl rounded-full -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Free Admission Assistance 2027
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-center md:text-left text-white mb-4 leading-tight">
          Get Free Online Degree Counsel & Fee Comparison
        </h3>

        <p className="text-slate-300 text-base sm:text-lg font-medium text-center md:text-left mb-8 max-w-2xl leading-relaxed">
          Compare UGC-DEB approved Online MBA, Executive MBA, BBA & BCA universities (Amity, Jain, Manipal, LPU, Chandigarh Univ) with zero-cost EMI plans.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-300 mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-13 bg-slate-800/80 border border-slate-700 px-4 rounded-xl text-white font-bold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-300 mb-2">WhatsApp Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full h-13 bg-slate-800/80 border border-slate-700 px-4 rounded-xl text-white font-bold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-300 mb-2">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-13 bg-slate-800/80 border border-slate-700 px-4 rounded-xl text-white font-bold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-300 mb-2">Target Course *</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full h-13 bg-slate-800/80 border border-slate-700 px-4 rounded-xl text-white font-bold focus:outline-none focus:border-blue-500 transition-all text-sm"
              >
                <option value="Online MBA">Online MBA</option>
                <option value="Executive MBA">Executive MBA</option>
                <option value="Online BBA">Online BBA</option>
                <option value="Online BCA">Online BCA</option>
                <option value="Online MCA">Online MCA</option>
                <option value="Distance Degree">Distance Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-300 mb-2">Your Location</label>
              <input
                type="text"
                placeholder="City / State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full h-13 bg-slate-800/80 border border-slate-700 px-4 rounded-xl text-white font-bold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {status === 'submitting' ? 'Submitting Inquiry...' : 'Get Free Online Degree Consultation'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-slate-400 font-bold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Confidential
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400" /> UGC-DEB Verified Universities
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            ★ 4.9/5 Rated Counselor
          </span>
        </div>
      </div>
    </div>
  );
}
