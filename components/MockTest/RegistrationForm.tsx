'use client';

import { useState } from 'react';

export interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  targetExam: string;
}

interface RegistrationFormProps {
  onRegister: (info: StudentInfo) => void;
}

export function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [formData, setFormData] = useState<StudentInfo>({
    name: '',
    email: '',
    phone: '',
    location: '',
    targetExam: 'MAH-MBA-CET 2026'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      onRegister(formData);
    }
  };

  return (
    <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black uppercase mb-6 text-primary">Student Registration</h2>
      <p className="mb-8 text-gray-600 font-medium">Please enter your details to start the MAH-MBA-CET Mock Test.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-black uppercase mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-black uppercase mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-black uppercase mb-2">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-black uppercase mb-2">Location (City)</label>
            <input
              type="text"
              required
              className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Mumbai, Pune, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-black uppercase mb-2">Preparing For</label>
            <select
              className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold"
              value={formData.targetExam}
              onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
            >
              <option value="MAH-MBA-CET 2026">MAH-MBA-CET 2026</option>
              <option value="CAT 2025">CAT 2025 / 2026</option>
              <option value="SNAP 2025">SNAP 2025</option>
              <option value="CMAT 2026">CMAT 2026</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-4 text-xl font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Start Mock Test Now
        </button>
      </form>
    </div>
  );
}
