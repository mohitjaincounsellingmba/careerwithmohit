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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!otpSent) {
      setOtpSent(true);
      alert(`OTP sent successfully to ${formData.phone}. For this demo, please use OTP: 1234`);
      return;
    }

    if (otp !== '1234') {
      alert('Invalid OTP. Please enter 1234.');
      return;
    }

    if (formData.name && formData.email && formData.phone) {
      setIsSubmitting(true);
      try {
        // Switch to direct webhook submission (matching JeeCalculator for reliability)
        await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            number: formData.phone,
            email: formData.email,
            location: formData.location,
            source: 'MHCET Mock Test',
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

        {otpSent && (
          <div className="bg-gray-50 border-4 border-foreground p-4 mb-4">
            <label className="block text-sm font-black uppercase mb-2">Enter OTP</label>
            <input
              type="text"
              required={otpSent}
              className="w-full border-4 border-foreground p-3 focus:outline-none focus:ring-4 focus:ring-primary/20 font-bold text-center tracking-widest text-2xl"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="----"
              maxLength={4}
            />
            <p className="text-xs font-bold text-gray-500 mt-2">OTP sent to {formData.phone}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 text-xl font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : !otpSent ? 'Get OTP' : 'Verify & Start Mock Test'}
        </button>
      </form>
    </div>
  );
}
