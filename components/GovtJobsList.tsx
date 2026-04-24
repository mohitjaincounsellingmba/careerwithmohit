'use client';

import Link from 'next/link';
import { GOVT_JOBS_DATA, GovtJob } from '@/data/govtJobs';
import { ExternalLink, Bell, FileText, CheckCircle } from 'lucide-react';

export function GovtJobsList() {
  const latestJobs = GOVT_JOBS_DATA.filter(j => j.category === 'Latest Job');
  const admitCards = GOVT_JOBS_DATA.filter(j => j.category === 'Admit Card');
  const results = GOVT_JOBS_DATA.filter(j => j.category === 'Result');

  const JobColumn = ({ title, data, icon: Icon, color, shadowColor }: { 
    title: string, 
    data: GovtJob[], 
    icon: any, 
    color: string,
    shadowColor: string 
  }) => (
    <div className={`flex flex-col rounded-xl border-4 border-foreground bg-white overflow-hidden shadow-[8px_8px_0px_0px_${shadowColor}] transition-all hover:translate-x-1 hover:-translate-y-1`}>
      <div className={`${color} p-6 border-b-4 border-foreground flex items-center justify-between`}>
        <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          <Icon className="w-6 h-6" />
          {title}
        </h3>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
          {data.length} New
        </span>
      </div>
      <div className="flex-1 p-2 space-y-1">
        {data.map((job) => (
          <Link 
            key={job.id} 
            href={job.link}
            prefetch={false}
            target={job.link.startsWith('http') ? '_blank' : '_self'}
            rel={job.link.startsWith('http') ? 'noopener noreferrer' : ''}
            className="flex items-center justify-between p-4 hover:bg-gray-50 group border-b border-gray-100 last:border-0 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {job.title}
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                {job.date}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t-2 border-gray-100">
        <button className="w-full py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors">
          View All {title}
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <JobColumn 
        title="Latest Jobs" 
        data={latestJobs} 
        icon={Bell} 
        color="bg-primary" 
        shadowColor="rgba(59,130,246,1)" 
      />
      <JobColumn 
        title="Admit Card" 
        data={admitCards} 
        icon={FileText} 
        color="bg-secondary" 
        shadowColor="rgba(245,158,11,1)" 
      />
      <JobColumn 
        title="Results" 
        data={results} 
        icon={CheckCircle} 
        color="bg-emerald-500" 
        shadowColor="rgba(16,185,129,1)" 
      />
    </div>
  );
}
