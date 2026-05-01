'use client';

import { useState } from 'react';

import { BUDGET_OPTIONS, COURSE_OPTIONS } from '@/lib/constants';

export function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    preferredLocation: '',
    budget: '',
    course: ''
  });

  // v3.0 - Activepieces Webhook Only (Clean & Direct)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location,
      source: `Direct Inquiry (${formData.course})`,
      budget: formData.budget,
      preferredLocation: formData.preferredLocation,
      course: formData.course,
      timestamp: new Date().toISOString()
    };

    // 1. Direct Activepieces Webhook Call (Dedicated for Inquiry Form)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
      }

      // 2. Clear state and show success
      setStatus('success');
      setFormData({
        name: '',
        number: '',
        email: '',
        location: '',
        preferredLocation: '',
        budget: '',
        course: ''
      });
    } catch (e) {
      console.error('Activepieces Webhook Error:', e);
      setStatus('error');
      alert('Form submission failed. Please check your connection or try again later.');
    }
  };
  if (status === 'success') {
    return (
      <div className="bg-green-50 border-4 border-foreground p-8 rounded-xl text-center">
        <h3 className="text-3xl font-black text-foreground mb-4 uppercase italic">Success!</h3>
        <p className="text-xl font-medium text-gray-700 mb-6">Your inquiry has been received. Our team will contact you shortly.</p>
        <div className="pt-6 border-t-2 border-green-200">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">While you wait...</p>
          <a
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-foreground px-6 py-3 rounded-md font-bold border-2 border-foreground hover:bg-white transition-all hover:scale-105"
          >
            Share your experience on Google
          </a>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="bg-primary text-white border-4 border-foreground px-8 py-4 text-xl font-black uppercase hover:bg-blue-600 transition-all hover:scale-105 active:translate-y-1 mt-8"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-8 border-foreground p-8 md:p-12 rounded-xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Name */}
        <div className="space-y-3">
          <label htmlFor="name" className="block text-xl font-black uppercase tracking-tight text-foreground">Name</label>
          <input
            id="name"
            name="name"
            required
            aria-required="true"
            type="text"
            autoComplete="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Number */}
        <div className="space-y-3">
          <label htmlFor="number" className="block text-xl font-black uppercase tracking-tight text-foreground">Phone Number</label>
          <input
            id="number"
            name="number"
            required
            aria-required="true"
            type="tel"
            autoComplete="tel"
            placeholder="WhatsApp Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label htmlFor="email" className="block text-xl font-black uppercase tracking-tight text-foreground">Email Address</label>
          <input
            id="email"
            name="email"
            required
            aria-required="true"
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label htmlFor="location" className="block text-xl font-black uppercase tracking-tight text-foreground">Current Location</label>
          <input
            id="location"
            name="location"
            required
            aria-required="true"
            type="text"
            placeholder="e.g. New Delhi"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Preferred Location */}
        <div className="space-y-3">
          <label htmlFor="preferredLocation" className="block text-xl font-black uppercase tracking-tight text-foreground">Preferred Study Location</label>
          <input
            id="preferredLocation"
            name="preferredLocation"
            required
            aria-required="true"
            type="text"
            placeholder="e.g. Bangalore, Mumbai"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <label htmlFor="budget" className="block text-xl font-black uppercase tracking-tight text-foreground">Budget Range</label>
          <select
            id="budget"
            name="budget"
            required
            aria-required="true"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md appearance-none"
          >
            <option value="" disabled>Select Budget</option>
            {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Course - Full Width on small, 2 col on large handled by parent grid */}
        <div className="space-y-3 md:col-span-2">
          <label htmlFor="course" className="block text-xl font-black uppercase tracking-tight text-foreground">Course Interest</label>
          <select
            id="course"
            name="course"
            required
            aria-required="true"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md appearance-none"
          >
            <option value="" disabled>Select Course</option>
            {COURSE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-20 bg-primary text-white border-8 border-foreground text-2xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
      >
        {status === 'submitting' ? 'Processing...' : 'Submit Inquiry'}
      </button>
      <div className="mt-4 text-center">
        <span className="text-[10px] font-black uppercase text-slate-300">System v2.1 (Fail-Silent Mode Active)</span>
      </div>
    </form>
  );
}
