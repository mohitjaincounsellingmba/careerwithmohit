'use client';

import React, { useState } from 'react';
import { CheckCircle2, Download, Loader2 } from 'lucide-react';

export default function StarterKitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    confirmation: '',
    exams: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      exams: checked 
        ? [...prev.exams, value] 
        : prev.exams.filter(exam => exam !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Extract source details from the current URL
    let sourceDetails = {};
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      sourceDetails = {
        page_source: 'Starter Kit Landing Page',
        page_url: window.location.href,
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
      };
    }
    
    try {
      await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...sourceDetails
        })
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600 mb-8">
          Thank you for providing your details. Your starter kit is ready for download.
        </p>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            alert("This is a demo download link.");
          }}
          className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg transition-colors shadow-lg shadow-indigo-200"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Starter Kit PDF
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-hidden text-gray-900"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            required
            value={formData.number}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-hidden text-gray-900"
            placeholder="+91 9876543210"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-hidden text-gray-900"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-hidden text-gray-900"
          placeholder="City, State"
        />
      </div>

      <div>
        <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-1">
          Kindly select your goal
        </label>
        <select
          id="confirmation"
          name="confirmation"
          required
          value={formData.confirmation}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-hidden text-gray-900 appearance-none"
        >
          <option value="" disabled>Select an option</option>
          <option value="Already taken admission">Already taken admission</option>
          <option value="Planning for 2027">Planning for 2027</option>
          <option value="Drop">Drop</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Which entrance exams are you preparing for? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['CAT', 'NMAT', 'XAT', 'SNAP', 'MAT'].map((exam) => (
            <label 
              key={exam}
              className={`flex items-center justify-center px-4 py-2.5 border rounded-xl cursor-pointer transition-all ${
                formData.exams.includes(exam) 
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-medium' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                name="exams"
                value={exam}
                checked={formData.exams.includes(exam)}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              {exam}
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || formData.exams.length === 0}
          className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-200"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Get Download Link'
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}
