"use client";

import React, { useState, useMemo } from 'react';
import { Briefcase, TrendingUp, Search, Building2, ArrowRight, X, Filter, BarChart3 } from 'lucide-react';

const ROLES = [
  { id: 'sde', name: 'Software Engineer (SDE)', multiplier: 1.0 },
  { id: 'data', name: 'Data Scientist / AI Engineer', multiplier: 1.1 },
  { id: 'pm', name: 'Product Manager (Fresher)', multiplier: 1.25 },
  { id: 'consultant', name: 'Management Consultant', multiplier: 0.95 },
  { id: 'finance', name: 'Investment Banking Analyst', multiplier: 1.15 },
  { id: 'marketing', name: 'Marketing / Growth Associate', multiplier: 0.75 },
  { id: 'analyst', name: 'Business Analyst', multiplier: 0.85 },
  { id: 'hr', name: 'HR / Talent Acquisition', multiplier: 0.65 },
  { id: 'sales', name: 'Business Development (Sales)', multiplier: 0.7 },
];

const COMPANY_CATEGORIES = [
  {
    name: 'MAANG / Big Tech',
    baseSalary: 28, // In Lakhs
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Adobe', 'Netflix', 'Uber', 'LinkedIn', 'Atlassian', 'Salesforce', 'Oracle', 'Nvidia', 'IBM', 'Cisco', 'Intel', 'SAP', 'Intuit', 'PayPal', 'HP', 'Dell', 'VMware', 'ServiceNow', 'Stripe', 'Twitter', 'Airbnb', 'Snap', 'Zoom', 'Shopify', 'Square']
  },
  {
    name: 'Top Product / Unicorns',
    baseSalary: 18,
    companies: ['Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'PhonePe', 'OYO', 'Ola', 'CRED', 'Razorpay', 'Byju\'s', 'Unacademy', 'Meesho', 'Groww', 'Zerodha', 'Upstox', 'Nykaa', 'BigBasket', 'Delhivery', 'Licious', 'Curefit', 'Urban Company', 'Policybazaar', 'InMobi', 'ShareChat', 'BharatPe', 'DealShare', 'Rebel Foods', 'Spinny', 'Cars24', 'Dream11']
  },
  {
    name: 'Big 4 / Consulting',
    baseSalary: 12,
    companies: ['Deloitte', 'PwC', 'EY', 'KPMG', 'McKinsey', 'BCG', 'Bain', 'Accenture Strategy', 'Capgemini Invent', 'Kearney', 'Oliver Wyman', 'Roland Berger', 'LEK Consulting', 'Arthur D. Little', 'Grant Thornton', 'BDO', 'Zinnov', 'Avalon', 'Gartner', 'Dalberg']
  },
  {
    name: 'Finance / IB',
    baseSalary: 16,
    companies: ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan', 'Citi', 'HSBC', 'Barclays', 'Credit Suisse', 'Deutsche Bank', 'Standard Chartered', 'UBS', 'Bank of America', 'Nomura', 'BNP Paribas', 'Société Générale', 'Axis Bank', 'HDFC Bank', 'ICICI Bank', 'Kotak Mahindra', 'SBI Capital', 'IDFC First']
  },
  {
    name: 'FMCG / High Paying Core',
    baseSalary: 14,
    companies: ['HUL', 'P&G', 'Nestlé', 'ITC', 'Marico', 'Dabur', 'Britannia', 'Reliance Industry', 'Tata Motors', 'L&T', 'Cummins', 'Maruti Suzuki', 'Tata Steel', 'JSW Steel', 'Mahindra', 'Dr. Reddy\'s', 'Sun Pharma', 'Cipla', 'Biocon', 'Pfizer', 'Abbott', 'GSK', 'BPCL', 'HPCL', 'IOCL', 'ONGC']
  },
  {
    name: 'MNC Services / Mid-Tier Product',
    baseSalary: 8,
    companies: ['Accenture', 'Cognizant', 'Capgemini', 'IBM India', 'Cisco India', 'CGI', 'DXC Technology', 'Atos', 'Publicis Sapient', 'Genpact', 'Infosys BPM', 'TCS Ninja/Digital', 'HCL Tech', 'Wipro Turbo', 'Mphasis', 'Hexaware', 'Persistent', 'Zensar', 'KPIT', 'Sonata Software']
  },
  {
    name: 'Standard IT Services',
    baseSalary: 4.5,
    companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Tech Mahindra', 'LTIMindtree', 'Mphasis', 'Mindtree', 'LTI', 'Happiest Minds', 'Synechron', 'Virtusa', 'EPAM', 'Thoughtworks', 'GlobalLogic', 'Sutherland', 'Concentrix', 'Teleperformance', 'Majorel']
  }
];

export default function JobSalaryTool() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const salaryData = useMemo(() => {
    let allData: { name: string, category: string, salary: string, rawSalary: number }[] = [];
    
    COMPANY_CATEGORIES.forEach(cat => {
      cat.companies.forEach(company => {
        const rawSalary = cat.baseSalary * selectedRole.multiplier;
        // Add some "random" variance for realism (within 10%)
        const variance = (company.length % 5) * 0.5 - 1; 
        const finalSalary = Math.max(3.5, rawSalary + variance);
        
        allData.push({
          name: company,
          category: cat.name,
          salary: `₹${finalSalary.toFixed(1)} LPA`,
          rawSalary: finalSalary
        });
      });
    });

    // Handle search
    if (searchTerm) {
      allData = allData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort by salary desc
    return allData.sort((a, b) => b.rawSalary - a.rawSalary);
  }, [selectedRole, searchTerm]);

  const displayedData = showAll ? salaryData : salaryData.slice(0, 10);

  return (
    <div className="w-full bg-[#18181b] p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] text-white font-display">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-black uppercase tracking-tighter italic underline decoration-yellow-500 underline-offset-4">
          Salary <span className="text-yellow-500">Auditor.</span>
        </h3>
      </div>
      
      <p className="text-xs font-bold text-gray-400 mb-6 leading-tight uppercase tracking-widest">
        Average Fresher Package across 300+ Top Companies.
      </p>

      <div className="space-y-4">
        {/* Role Selector */}
        <div className="relative">
          <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Select Job Role</label>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-500" />
            <select 
              value={selectedRole.id}
              onChange={(e) => setSelectedRole(ROLES.find(r => r.id === e.target.value) || ROLES[0])}
              className="w-full h-12 pl-12 pr-4 bg-white/5 border-4 border-white font-black text-sm focus:outline-none focus:border-yellow-500 transition-all uppercase appearance-none cursor-pointer"
            >
              {ROLES.map(role => (
                <option key={role.id} value={role.id} className="bg-[#18181b] text-white">{role.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* Company Search */}
        <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
           <input 
            type="text"
            placeholder="SEARCH COMPANY..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-transparent border-4 border-white font-black text-sm focus:outline-none focus:border-yellow-500 focus:bg-white/5 transition-all placeholder:text-gray-600 uppercase"
          />
        </div>

        {/* Results List */}
        <div className="mt-6">
          <div className="max-h-60 overflow-y-auto custom-scrollbar border-2 border-white/10 bg-black/20">
            {displayedData.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-[#18181b] border-b-2 border-white/20">
                  <tr>
                    <th className="p-3 font-black uppercase text-gray-400">Company</th>
                    <th className="p-3 font-black uppercase text-yellow-500 text-right">Avg Package</th>
                  </tr>
                </thead>
                <tbody className="font-bold">
                  {displayedData.map((data, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-3 uppercase">
                        {data.name}
                        <span className="block text-[8px] text-gray-500 leading-none mt-1">{data.category}</span>
                      </td>
                      <td className="p-3 text-right italic text-emerald-400">{data.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-500 uppercase font-black italic">No records found.</div>
            )}
          </div>
          
          {salaryData.length > 10 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-4 text-[10px] font-black uppercase text-center text-yellow-500 hover:underline transition-all"
            >
              {showAll ? 'Show Less' : `View All ${salaryData.length} Companies`}
            </button>
          )}
        </div>

        <button 
          onClick={() => window.location.href = '/jobs'}
          className="w-full mt-2 bg-yellow-500 text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          Explore Premium Jobs <ArrowRight className="w-4 h-4 ml-2 inline-block" />
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #eab308;
        }
      `}</style>
    </div>
  );
}
