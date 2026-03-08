'use client';

import { useState } from 'react';

const BUDGET_OPTIONS = [
  '0-5 lacs',
  '5 to 10 lacs',
  '10 lacs and above'
];

const COURSE_OPTIONS = [
  'MBA',
  'PGDM',
  'BBA',
  'BCA',
  'BTech',
  'Online MBA',
  'Abroad Education'
];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Generate WhatsApp message
    const message = `*New Inquiry from careerwithmohit.com*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.number}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Current Location:* ${formData.location}%0A` +
      `*Preferred Location:* ${formData.preferredLocation}%0A` +
      `*Budget:* ${formData.budget}%0A` +
      `*Course:* ${formData.course}`;

    const whatsappUrl = `https://wa.me/919560020771?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
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
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border-8 border-foreground p-12 text-center rounded-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-4xl font-black text-foreground mb-4 uppercase italic">Success!</h2>
        <p className="text-xl font-bold text-gray-800 mb-8">
          Thank you for reaching out. Our career experts will contact you shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="bg-primary text-white border-4 border-foreground px-8 py-4 text-xl font-black uppercase hover:bg-blue-600 transition-all hover:scale-105 active:translate-y-1"
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
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Name</label>
          <input
            required
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Number */}
        <div className="space-y-3">
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Phone Number</label>
          <input
            required
            type="tel"
            placeholder="WhatsApp Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Email Address</label>
          <input
            required
            type="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Current Location</label>
          <input
            required
            type="text"
            placeholder="e.g. New Delhi"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Preferred Location */}
        <div className="space-y-3">
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Preferred Study Location</label>
          <input
            required
            type="text"
            placeholder="e.g. Bangalore, Mumbai"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            className="w-full h-16 bg-gray-50 border-4 border-foreground px-6 text-lg font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Budget Range</label>
          <select
            required
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
          <label className="block text-xl font-black uppercase tracking-tight text-foreground">Course Interest</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSE_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData({ ...formData, course: opt })}
                className={`h-14 border-4 border-foreground px-4 text-sm font-black uppercase transition-all rounded-md ${
                  formData.course === opt 
                    ? 'bg-accent text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-20 bg-primary text-white border-8 border-foreground text-2xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
      >
        {status === 'submitting' ? 'Processing...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
