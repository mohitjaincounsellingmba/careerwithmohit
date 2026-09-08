'use client';

import { useState } from 'react';
import { MBA_PGDM_COLLEGES_2027 } from '@/data/mbaPgdmColleges2027';
import { Send, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitLead } from '@/lib/leads';

export default function MbaPgdmLeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    specialization: 'PGDM General / Dual Spec.',
    budget: '₹8L – ₹12L',
    college: 'Not Sure / Help Me Choose',
  });

  const specializations = [
    'PGDM General / Dual Spec.',
    'PGDM Marketing & Digital Media',
    'PGDM Finance & FinTech',
    'PGDM Business Analytics & Big Data',
    'PGDM International Business',
    'PGDM Human Resource Management',
    'PGDM Operations & Supply Chain',
  ];

  const budgets = [
    'Under ₹6L (High ROI)',
    '₹6L – ₹9L',
    '₹9L – ₹12L',
    'Above ₹12L',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location,
      source: `MBA/PGDM Admission 2027 Page Form (${formData.specialization})`,
      course: `PGDM 2027 - ${formData.specialization}`,
      budget: formData.budget,
      details: {
        preferredCollege: formData.college,
      },
      timestamp: new Date().toISOString(),
    };

    const result = await submitLead(leadPayload);

    if (result.success) {
      setStatus('success');
      setFormData({
        name: '',
        number: '',
        email: '',
        location: '',
        specialization: 'PGDM General / Dual Spec.',
        budget: '₹8L – ₹12L',
        college: 'Not Sure / Help Me Choose',
      });
    } else {
      console.error('Lead Capture Form Error:', result.error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 md:p-10 max-w-4xl mx-auto my-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/5 rounded-full -ml-12 -mb-12 blur-3xl pointer-events-none" />

      {status === 'success' ? (
        <div className="text-center py-10 px-4">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 size={36} className="text-emerald-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Admission Request Received!
          </h3>
          <p className="text-slate-600 font-normal text-sm sm:text-base max-w-lg mx-auto mb-8">
            We are compiling the PGDM 2027 fee structures, GD-PI shortlists, and placement reports for top institutes matching your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setStatus('idle')}
              className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Submit Another Request
            </button>
            <a
              href="tel:+919560020771"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
            >
              <PhoneCall size={16} />
              Call Expert Counsellor Now
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              ⚡ Free 1-on-1 Profile &amp; Admission Evaluation 2027
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get Fee Brochures &amp; GD-PI Call Predictor
            </h2>
            <p className="text-slate-500 text-sm font-normal mt-2 leading-relaxed">
              Compare AICTE &amp; AIU approved PGDM B-Schools. Receive cutoff alerts, fee discounts, and direct seat booking guidance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Mohit Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  WhatsApp Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  placeholder="e.g. mohit@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Current City / State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  City / State *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Delhi NCR, Jaipur, Patna"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Program Specialization */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  PGDM Specialization
                </label>
                <select
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Fee Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Budget (2 Years)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                >
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target College */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target B-School
                </label>
                <select
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Not Sure / Help Me Choose">Not Sure / Help Me Choose</option>
                  {MBA_PGDM_COLLEGES_2027.map((c) => (
                    <option key={c.universitySlug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm font-semibold">
                <AlertCircle size={18} className="shrink-0" />
                <span>An error occurred while submitting your request. Please try again or call us directly.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white font-extrabold text-sm sm:text-base py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {status === 'submitting' ? (
                <span>Sending Request...</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Get PGDM 2027 Fee Brochures &amp; Shortlist →</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 font-normal">
              🔒 100% Privacy Guaranteed. Free counseling from verified PGDM admission advisors.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
