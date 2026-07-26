'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/leads';

export function SellCoachingLeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    role: 'Teacher / Tutor'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const result = await submitLead({
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location,
      role: formData.role,
      source: 'TEACHER', // Requested by user
      timestamp: new Date().toISOString()
    });

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', number: '', email: '', location: '', role: 'Teacher / Tutor' });
      if (onSuccess) {
        onSuccess();
      }
    } else {
      console.error('Submission Error:', result.error);
      setStatus('error');
      alert('Submission failed. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border-8 border-foreground p-8 md:p-16 rounded-3xl text-center shadow-[12px_12px_0px_0px_rgba(34,197,94,1)]">
        <h3 className="text-4xl font-black text-foreground mb-4 uppercase italic">Demo Booked!</h3>
        <p className="text-xl font-medium text-gray-700 mb-8">
          Thank you. Our digital academy experts will contact you shortly via WhatsApp & call to set up your free demo.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-accent text-foreground px-8 py-4 text-xl font-black uppercase tracking-widest border-4 border-foreground hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto relative z-10 w-full text-left">
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase tracking-widest text-foreground">Your Full Name *</label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full bg-gray-50 border-4 border-foreground px-5 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all text-foreground" 
          placeholder="e.g. Mohit Jain"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase tracking-widest text-foreground">WhatsApp Number *</label>
        <input 
          required
          type="tel" 
          value={formData.number}
          onChange={(e) => setFormData({...formData, number: e.target.value})}
          className="w-full bg-gray-50 border-4 border-foreground px-5 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all text-foreground" 
          placeholder="e.g. +91 95600 20771"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase tracking-widest text-foreground">Email Address *</label>
        <input 
          required
          type="email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full bg-gray-50 border-4 border-foreground px-5 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all text-foreground" 
          placeholder="e.g. teacher@example.com"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase tracking-widest text-foreground">Location *</label>
        <input 
          required
          type="text" 
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="w-full bg-gray-50 border-4 border-foreground px-5 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all text-foreground" 
          placeholder="e.g. New Delhi"
        />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <label className="block text-sm font-black uppercase tracking-widest text-foreground">I am a / Current Role</label>
        <select 
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className="w-full bg-gray-50 border-4 border-foreground px-5 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all text-foreground cursor-pointer"
        >
          <option value="Teacher / Tutor">Teacher / Tutor (Offline or Online)</option>
          <option value="YouTuber / Content Creator">YouTuber / Content Creator</option>
          <option value="Coaching Center / Institute Owner">Coaching Center / Institute Owner</option>
          <option value="Author / Educator / Other">Author / Educator / Other</option>
        </select>
      </div>
      <div className="sm:col-span-2 mt-4 text-center">
        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-xl bg-accent px-8 py-5 text-2xl font-black text-foreground transition-all hover:scale-[1.02] hover:bg-white border-4 border-foreground text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase disabled:opacity-50 cursor-pointer"
        >
          {status === 'submitting' ? 'Processing...' : '⚡ Book Free Personal Demo Now'}
        </button>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-black uppercase tracking-wider text-gray-500">
          <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-300">
            🔒 100% Data Privacy
          </span>
          <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-300">
            ✅ Instant WhatsApp Alert
          </span>
          <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-300">
            ⚡ No Credit Card Required
          </span>
        </div>
      </div>
    </form>
  );
}
