'use client';

import { useState } from 'react';

export function BacklinkRequestForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    collaborationType: 'link-exchange',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/backlink-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        websiteUrl: '',
        collaborationType: 'link-exchange',
        message: ''
      });
    } catch (e) {
      console.error('Backlink Request Error:', e);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border-4 border-foreground p-12 rounded-xl text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-4xl font-black text-foreground mb-6 uppercase italic tracking-tighter">Request Received!</h3>
        <p className="text-xl font-bold text-gray-700 mb-8 leading-tight">
          Your backlink collaboration request has been sent to Mohit's team. We'll review your site and get back to you within 48 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-primary text-white border-4 border-foreground px-10 py-5 text-xl font-black uppercase hover:bg-blue-600 transition-all hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-[10px] border-foreground p-8 md:p-16 rounded-2xl shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 relative z-10">
        {/* Name */}
        <div className="space-y-4">
          <label htmlFor="name" className="block text-xl font-black uppercase tracking-tight text-foreground italic">Full Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-18 bg-gray-50 border-4 border-foreground px-6 text-lg font-black focus:bg-white focus:outline-none focus:ring-8 focus:ring-primary/10 transition-all rounded-xl"
          />
        </div>

        {/* Email */}
        <div className="space-y-4">
          <label htmlFor="email" className="block text-xl font-black uppercase tracking-tight text-foreground italic">Work Email</label>
          <input
            id="email"
            required
            type="email"
            placeholder="john@website.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-18 bg-gray-50 border-4 border-foreground px-6 text-lg font-black focus:bg-white focus:outline-none focus:ring-8 focus:ring-primary/10 transition-all rounded-xl"
          />
        </div>

        {/* Website URL */}
        <div className="space-y-4 md:col-span-2">
          <label htmlFor="websiteUrl" className="block text-xl font-black uppercase tracking-tight text-foreground italic">Your Website URL (For Review)</label>
          <input
            id="websiteUrl"
            required
            type="url"
            placeholder="https://your-niche-site.com"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            className="w-full h-18 bg-gray-50 border-4 border-foreground px-6 text-lg font-black focus:bg-white focus:outline-none focus:ring-8 focus:ring-primary/10 transition-all rounded-xl"
          />
        </div>

        {/* Collaboration Type */}
        <div className="space-y-4 md:col-span-2">
          <label htmlFor="type" className="block text-xl font-black uppercase tracking-tight text-foreground italic">Collaboration Type</label>
          <select
            id="type"
            required
            value={formData.collaborationType}
            onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
            className="w-full h-18 bg-gray-50 border-4 border-foreground px-6 text-lg font-black focus:bg-white focus:outline-none focus:ring-8 focus:ring-primary/10 transition-all rounded-xl appearance-none"
          >
            <option value="link-exchange">Link Exchange (You link to us, we link to you)</option>
            <option value="guest-post">Guest Post (Write an article for us)</option>
            <option value="sponsored">Sponsored Post (Paid Placement)</option>
            <option value="other">Other / Custom Collaboration</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-4 md:col-span-2">
          <label htmlFor="message" className="block text-xl font-black uppercase tracking-tight text-foreground italic">Tell us about your proposal</label>
          <textarea
            id="message"
            required
            rows={4}
            placeholder="Hey Mohit, I have a career site with 50k monthly traffic. I'd love to exchange a do-follow link on your latest MBA blog..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-gray-50 border-4 border-foreground p-6 text-lg font-black focus:bg-white focus:outline-none focus:ring-8 focus:ring-primary/10 transition-all rounded-xl resize-none"
          />
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-24 bg-foreground text-white border-8 border-foreground text-3xl font-black uppercase tracking-tighter shadow-[12px_12px_0px_0px_rgba(30,41,59,0.3)] hover:bg-primary hover:text-white transition-all hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0 active:shadow-none"
      >
        {status === 'submitting' ? 'Transmitting Request...' : 'Apply for Backlink'}
      </button>

      <p className="mt-8 text-center text-sm font-black uppercase text-gray-400 tracking-[0.2em]">
        Verified by CareerWithMohit SEO Compliance Engine
      </p>
    </form>
  );
}
