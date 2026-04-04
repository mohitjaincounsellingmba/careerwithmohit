'use client';

import { useState } from 'react';
import { ExamConfig } from '@/lib/mock-test-data';

export interface GenericStudentInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  targetExam: string;
  selectedSet: number;
}

interface GenericRegistrationFormProps {
  config: ExamConfig;
  onRegister: (info: GenericStudentInfo) => void;
}

export function GenericRegistrationForm({ config, onRegister }: GenericRegistrationFormProps) {
  const [formData, setFormData] = useState<GenericStudentInfo>({
    name: '',
    email: '',
    phone: '',
    location: '',
    targetExam: config.name,
    selectedSet: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (formData.name && formData.email && formData.phone) {
      setIsSubmitting(true);
      try {
        await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            number: formData.phone,
            email: formData.email,
            location: formData.location,
            source: `${config.name} Mock Test`,
            targetExam: formData.targetExam,
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.error('Lead submission failed:', error);
      } finally {
        setIsSubmitting(false);
        onRegister(formData);
      }
    }
  };

  return (
    <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black uppercase mb-6 text-primary">{config.name} Registration</h2>
      <p className="mb-8 text-gray-600 font-medium">Register for free to attempt the {config.name} full-length mock test.</p>
      
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
              placeholder="City, State"
            />
          </div>
          <div>
            <label className="block text-sm font-black uppercase mb-2">Select Mock Test Set</label>
            <select
              className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold"
              value={formData.selectedSet}
              onChange={(e) => setFormData({ ...formData, selectedSet: parseInt(e.target.value) })}
            >
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {config.name} - Paper Set {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 text-xl font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Start Mock Test Now'}
        </button>
      </form>
    </div>
  );
}
