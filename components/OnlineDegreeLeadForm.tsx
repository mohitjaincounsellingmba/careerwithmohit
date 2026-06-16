'use client';

import { useState } from 'react';
import { COLLEGES } from '@/data/onlineColleges';
import { Send, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OnlineDegreeLeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    program: 'Online MBA',
    budget: '₹1L – ₹1.5L',
    college: 'Not Sure / Help Me Choose',
  });

  const programs = [
    'Online MBA',
    'Online BBA',
    'Online MCA',
    'Online BCA',
    'Online B.Com',
    'Online M.Com',
    'Online MA',
    'Online B.Sc',
    'Executive MBA',
    'Short-Term Certification',
  ];

  const budgets = [
    'Under ₹1L',
    '₹1L – ₹1.5L',
    '₹1.5L – ₹2L',
    'Above ₹2L',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location,
      source: `Online Degree Page Form (${formData.program})`,
      course: formData.program,
      budget: formData.budget,
      details: {
        preferredUniversity: formData.college,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        throw new Error('Lead submission failed');
      }

      setStatus('success');
      setFormData({
        name: '',
        number: '',
        email: '',
        location: '',
        program: 'Online MBA',
        budget: '₹1L – ₹1.5L',
        college: 'Not Sure / Help Me Choose',
      });
    } catch (err) {
      console.error('Lead Capture Form Error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white border-[6px] border-[#0f172a] rounded-[2rem] p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] max-w-4xl mx-auto my-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-10 -mt-10 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/5 rounded-full -ml-8 -mb-8 blur-2xl" />

      {status === 'success' ? (
        <div className="text-center py-10 px-4">
          <div className="w-20 h-20 bg-green-50 border-4 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h3 className="display-font text-3xl font-black text-[#0f172a] mb-3 uppercase tracking-tight">
            Comparison Request Received!
          </h3>
          <p className="text-gray-600 font-medium text-base max-w-lg mx-auto mb-8">
            We are compiling the fee brochures, NAAC grading reports, and syllabus structures of top universities matching your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20just%20submitted%20the%20form%20for%20online%20degree%20counselling.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
            >
              <PhoneCall size={18} />
              Connect on WhatsApp Now
            </a>
            <button
              onClick={() => setStatus('idle')}
              className="text-[#0f172a] font-bold text-sm hover:underline"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8 relative z-10">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-100">
              Free Profile Evaluation &amp; Comparison
            </span>
            <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mt-4 mb-3 uppercase tracking-tight">
              Compare Fees &amp; Eligibility
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto font-medium">
              Fill in your details below to get instant fee structures, approvals, and syllabus details of 34+ UGC-DEB approved online universities.
            </p>
          </div>

          {status === 'error' && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl p-4 flex items-center gap-3 text-sm font-semibold">
              <AlertCircle size={18} className="shrink-0" />
              <span>Failed to submit. Please check your network or try connecting on WhatsApp directly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">WhatsApp Number</label>
                <input
                  required
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your City</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Delhi, Mumbai, Pune"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Program */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Program of Interest</label>
                <select
                  required
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none"
                >
                  {programs.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Budget (2 Years Fee)</label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none"
                >
                  {budgets.map((budg) => (
                    <option key={budg} value={budg}>
                      {budg}
                    </option>
                  ))}
                </select>
              </div>

              {/* University */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preferred University (Optional)</label>
                <select
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-[#f8f7f4] border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none"
                >
                  <option value="Not Sure / Help Me Choose">Not Sure / Help Me Choose</option>
                  {COLLEGES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} (NAAC {c.grade} · Fees {c.fee})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#0f172a] text-white hover:bg-indigo-600 transition-colors font-bold py-4 rounded-xl text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 cursor-pointer"
            >
              {status === 'submitting' ? (
                'Processing...'
              ) : (
                <>
                  <Send size={16} /> Compare Fees &amp; Get Counseling →
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
